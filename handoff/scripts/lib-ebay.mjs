// Shared eBay helpers for the handoff scripts.
// Loads credentials from ../../.env (repo root), mints access tokens from the
// refresh token, and wraps the REST calls we actually use.
//
// Why this exists: the eBay MCP's *write* tools (create inventory/offer) fail from
// the Claude Code client because it serialises the `body` object to a string. So all
// listing writes go through eBay REST here. See ../../RULES.md.

import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
// handoff/scripts/ -> repo root is two levels up.
dotenv.config({ path: resolve(__dirname, '../../.env') });

const {
  EBAY_CLIENT_ID,
  EBAY_CLIENT_SECRET,
  EBAY_USER_REFRESH_TOKEN,
  EBAY_ENVIRONMENT = 'production',
} = process.env;

export const IS_PROD = EBAY_ENVIRONMENT === 'production';
export const API = IS_PROD ? 'https://api.ebay.com' : 'https://api.sandbox.ebay.com';
export const MARKETPLACE_ID = process.env.EBAY_MARKETPLACE_ID || 'EBAY_GB';
// Content-Language must match the marketplace; GB listings require en-GB.
export const CONTENT_LANGUAGE = MARKETPLACE_ID === 'EBAY_GB' ? 'en-GB' : 'en-US';
export const SITE_ID = MARKETPLACE_ID === 'EBAY_GB' ? '3' : '0';

function assertEnv() {
  const missing = ['EBAY_CLIENT_ID', 'EBAY_CLIENT_SECRET', 'EBAY_USER_REFRESH_TOKEN'].filter(
    (k) => !process.env[k],
  );
  if (missing.length) {
    throw new Error(
      `Missing ${missing.join(', ')} in .env. If the refresh token looks truncated, make sure it is wrapped in double quotes (it contains '#'). See RULES.md.`,
    );
  }
}

let cachedToken = null;
let cachedExpiry = 0;

/**
 * Mint a user access token from the refresh token. Cached until ~2 min before expiry.
 * @param {string[]} scopes - OAuth scopes; must be a subset of what the refresh token was granted.
 */
export async function getAccessToken(scopes = ['https://api.ebay.com/oauth/api_scope']) {
  assertEnv();
  if (cachedToken && Date.now() < cachedExpiry) return cachedToken;

  const basic = Buffer.from(`${EBAY_CLIENT_ID}:${EBAY_CLIENT_SECRET}`).toString('base64');
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: EBAY_USER_REFRESH_TOKEN,
    scope: scopes.join(' '),
  });
  const res = await fetch(`${API}/identity/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Token refresh failed (${res.status}): ${JSON.stringify(json)}`);
  }
  cachedToken = json.access_token;
  cachedExpiry = Date.now() + (json.expires_in - 120) * 1000;
  return cachedToken;
}

/** Thin JSON REST wrapper for the Sell APIs. Throws with the eBay error body on failure. */
export async function ebayRest(path, { method = 'GET', token, body, extraHeaders } = {}) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Language': CONTENT_LANGUAGE,
    'Accept-Language': CONTENT_LANGUAGE,
    ...extraHeaders,
  };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) {
    const msg = data?.errors?.[0]?.message || text || res.statusText;
    const err = new Error(`${method} ${path} -> ${res.status}: ${msg}`);
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}

/**
 * Fetch the required item-specific (aspect) names for a category so we never hit the
 * "item specific X is missing" publish error one field at a time. See RULES.md.
 * @returns {Promise<string[]>} required aspect localized names.
 */
export async function getRequiredAspects(categoryId, categoryTreeId = SITE_ID === '3' ? '3' : '0') {
  const token = await getAccessToken(['https://api.ebay.com/oauth/api_scope']);
  const data = await ebayRest(
    `/commerce/taxonomy/v1/category_tree/${categoryTreeId}/get_item_aspects_for_category?category_id=${categoryId}`,
    { token },
  );
  return (data.aspects || [])
    .filter((a) => a?.aspectConstraint?.aspectRequired)
    .map((a) => a.localizedAspectName);
}

/** Suggest a leaf category id from a free-text query (e.g. the scraped product title). */
export async function suggestCategoryId(query, categoryTreeId = SITE_ID === '3' ? '3' : '0') {
  const token = await getAccessToken(['https://api.ebay.com/oauth/api_scope']);
  const data = await ebayRest(
    `/commerce/taxonomy/v1/category_tree/${categoryTreeId}/get_category_suggestions?q=${encodeURIComponent(query)}`,
    { token },
  );
  return data?.categorySuggestions?.[0]?.category?.categoryId || null;
}

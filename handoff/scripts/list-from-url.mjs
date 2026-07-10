#!/usr/bin/env node
// Create a multi-variation eBay listing from a product spec JSON.
//
// The browser agent (Playwright MCP) scrapes the product page, downloads the images,
// and writes a spec file. This script does the reliable, deterministic part:
// bg-remove + host images, then build the inventory-item group + per-variation offers
// and publish — auto-filling required item specifics so we don't hit publish errors.
//
// Usage:
//   node handoff/scripts/list-from-url.mjs product.json            # create + publish (asks nothing; guard upstream)
//   node handoff/scripts/list-from-url.mjs product.json --no-publish  # stage everything, stop before going live
//
// See handoff/LISTING.md for the spec format and the full workflow.

import { readFile } from 'node:fs/promises';
import {
  getAccessToken,
  ebayRest,
  getRequiredAspects,
  suggestCategoryId,
  MARKETPLACE_ID,
} from './lib-ebay.mjs';
import { processImages } from './lib-images.mjs';

const SELL = 'https://api.ebay.com/oauth/api_scope/sell.inventory';

const specPath = process.argv[2];
const noPublish = process.argv.includes('--no-publish');
if (!specPath) {
  console.error('Usage: node list-from-url.mjs <product.json> [--no-publish]');
  process.exit(1);
}

const spec = JSON.parse(await readFile(specPath, 'utf8'));
const token = await getAccessToken([SELL]);

// 1. Category ---------------------------------------------------------------
const categoryId = spec.categoryId || (await suggestCategoryId(spec.title));
if (!categoryId) throw new Error('No categoryId given and none could be suggested from the title.');
console.error(`Category: ${categoryId}`);

// 2. Verify required aspects are covered ------------------------------------
const required = await getRequiredAspects(categoryId);
const sharedKeys = Object.keys(spec.aspects || {});
const variesKeys = (spec.variesBy?.specifications || []).map((s) => s.name);
const covered = new Set([...sharedKeys, ...variesKeys]);
const missing = required.filter((r) => !covered.has(r));
if (missing.length) {
  throw new Error(
    `Missing required item specifics for category ${categoryId}: ${missing.join(', ')}. ` +
      `Add them to spec.aspects (shared) or spec.variesBy (per-variation).`,
  );
}
console.error(`Required aspects covered: ${required.join(', ') || '(none)'}`);

// 3. Images: bg-remove + host on eBay EPS -----------------------------------
const allImagePaths = [
  ...(spec.images || []),
  ...(spec.variations || []).flatMap((v) => v.images || []),
];
const removeBg = spec.removeBackground !== false;
console.error(`Processing ${allImagePaths.length} image(s) (bg-removal: ${removeBg})...`);
const imageMap = await processImages(allImagePaths, { removeBg });
const toUrls = (paths = []) => paths.map((p) => imageMap.get(p)).filter(Boolean);

// 4. Inventory items (one per variation) ------------------------------------
for (const v of spec.variations) {
  const body = {
    product: {
      title: spec.title,
      description: spec.description,
      aspects: { ...(spec.aspects || {}), ...(v.aspects || {}) },
      imageUrls: toUrls(v.images).length ? toUrls(v.images) : toUrls(spec.images),
    },
    condition: spec.condition || 'NEW',
    availability: { shipToLocationAvailability: { quantity: v.quantity ?? spec.quantity ?? 1 } },
  };
  await ebayRest(`/sell/inventory/v1/inventory_item/${encodeURIComponent(v.sku)}`, {
    method: 'PUT',
    token,
    body,
  });
  console.error(`  inventory item: ${v.sku}`);
}

// 5. Inventory item group ---------------------------------------------------
const groupKey = spec.groupKey || `${spec.skuPrefix || 'GRP'}-GROUP`;
const groupBody = {
  title: spec.title,
  description: spec.description,
  imageUrls: toUrls(spec.images),
  variantSKUs: spec.variations.map((v) => v.sku),
  variesBy: {
    // The aspect whose value swaps the main photo (usually Colour).
    aspectsImageVariesBy: spec.variesBy?.aspectsImageVariesBy || ['Colour'],
    specifications: spec.variesBy?.specifications || [],
  },
  aspects: spec.aspects || {},
};
await ebayRest(`/sell/inventory/v1/inventory_item_group/${encodeURIComponent(groupKey)}`, {
  method: 'PUT',
  token,
  body: groupBody,
});
console.error(`Inventory item group: ${groupKey}`);

// 6. Offers (one per SKU) ---------------------------------------------------
for (const v of spec.variations) {
  const offer = {
    sku: v.sku,
    marketplaceId: MARKETPLACE_ID,
    format: 'FIXED_PRICE',
    availableQuantity: v.quantity ?? spec.quantity ?? 1,
    categoryId,
    listingDescription: spec.description,
    pricingSummary: {
      price: { value: String(v.price ?? spec.price), currency: spec.currency || 'GBP' },
    },
    listingPolicies: spec.policies,
    merchantLocationKey: spec.merchantLocationKey,
  };
  // Idempotency: if an offer already exists for this SKU, update it instead of failing.
  try {
    await ebayRest('/sell/inventory/v1/offer', { method: 'POST', token, body: offer });
  } catch (e) {
    if (e.status === 409) {
      const existing = await ebayRest(
        `/sell/inventory/v1/offer?sku=${encodeURIComponent(v.sku)}&marketplace_id=${MARKETPLACE_ID}`,
        { token },
      );
      const offerId = existing?.offers?.[0]?.offerId;
      await ebayRest(`/sell/inventory/v1/offer/${offerId}`, { method: 'PUT', token, body: offer });
    } else throw e;
  }
  console.error(`  offer: ${v.sku} @ ${offer.pricingSummary.price.value} ${offer.pricingSummary.price.currency}`);
}

// 7. Publish the whole group as ONE listing ---------------------------------
if (noPublish) {
  console.error('\n--no-publish set: everything staged, not published. Review in Seller Hub.');
  console.log(JSON.stringify({ status: 'staged', groupKey, categoryId }, null, 2));
  process.exit(0);
}

const published = await ebayRest('/sell/inventory/v1/offer/publish_by_inventory_item_group', {
  method: 'POST',
  token,
  body: { inventoryItemGroupKey: groupKey, marketplaceId: MARKETPLACE_ID },
});
const listingId = published.listingId;
console.error('\nPUBLISHED.');
console.log(
  JSON.stringify(
    {
      status: 'published',
      listingId,
      url: `https://www.ebay.co.uk/itm/${listingId}`,
      groupKey,
      variations: spec.variations.length,
    },
    null,
    2,
  ),
);

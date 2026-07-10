# eBay MCP — Rules & Playbook (read this first)

Hard-won rules for the `ebay` MCP server in this folder. Follow these to avoid common errors.
This setup targets **EBAY_GB** (UK) — verify your account's marketplace with `ebay_get_user`.
All secrets live in `.env` in this folder — never paste them into chat or into this file.

---

## 1. Tokens & auth

- **Quote the refresh token in `.env`.** eBay tokens contain `#`, and dotenv treats `#` as a
  comment — an unquoted token gets silently truncated to `v^1.1` and auth fails.
  ✅ `EBAY_USER_REFRESH_TOKEN="v^1.1#i^1#...=="`   ❌ unquoted.
- **Dev-portal login ≠ eBay member login.** The eBay Developer Program login and the eBay
  marketplace/seller login are **separate accounts and can have different passwords**. Sign in with
  the **seller** account at the consent step (do it manually if automated entry is rejected).
- **Refresh token is bound to the RuName it was minted with.** Keep `EBAY_REDIRECT_URI` in `.env`
  set to the exact RuName you used when generating the token.
- After manually setting tokens (`ebay_set_user_tokens`), a pasted access token can be malformed
  → **call `ebay_refresh_access_token`** to mint a clean one, or just restart Claude Code so the
  server reloads `.env`.
- `ebay_get_token_status` only checks local state; it says "authenticated" even when the access
  token is broken. Verify with a real call like `ebay_get_user`.

### Minting a fresh refresh token (full scopes) — browser + REST
1. In the attached Brave window, navigate (consent is already granted, so it redirects straight through):
   `https://auth.ebay.com/oauth2/authorize?client_id=<CLIENT_ID>&response_type=code&redirect_uri=<YOUR_RUNAME>&scope=<space-separated scopes, URL-encoded>`
2. Grab `code=...` from the redirect URL (lands on `ThirdPartyAuthSucessFailure?...&code=...`). Code expires in ~5 min.
3. Exchange: `POST https://api.ebay.com/identity/v1/oauth2/token`
   Header `Authorization: Basic base64(client_id:client_secret)`,
   body `grant_type=authorization_code&code=<code>&redirect_uri=<RuName>`.
4. Write `refresh_token` (quoted) to `.env`, then `ebay_refresh_access_token` or restart.
   Refresh token lasts ~18 months (`refresh_token_expires_in` 47304000).
- **Include ALL scopes you'll need at authorize time** — the refresh token's scope set is fixed at
  the code grant. Analytics needs `sell.analytics.readonly`; we initially omitted it and analytics failed.
- **Mint the refresh token ONCE, then leave it alone.** eBay keeps only the newest refresh token for
  an account+app and retires older ones. Re-running the OAuth flow (e.g. to add a scope) invalidates
  the previous token, which then fails with `invalid_grant: ... issued to another client`. Get the
  scopes right the first time, save the token to `.env`, and don't re-generate — the 18-month token
  refreshes its own access tokens silently, no further sign-ins needed. To recover from an
  invalidated token: sign in once via the browser flow, exchange the code, overwrite `.env`, restart.

---

## 2. Creating listings — DON'T use the MCP write tools

- **The MCP write tools that take a `body` object FAIL from this client.** Claude Code serializes
  `body` to a string; the tool's `z.custom` expects an object → error
  `"Generated ... request body"`. This hits `create_or_replace_inventory_item`, `create_offer`, etc.
- ✅ **Create/publish listings via eBay Inventory REST directly** (mint access token from the
  refresh token first). Working sequence:
  1. `PUT https://api.ebay.com/sell/inventory/v1/inventory_item/{sku}`
  2. `POST https://api.ebay.com/sell/inventory/v1/offer`
  3. `POST https://api.ebay.com/sell/inventory/v1/offer/{offerId}/publish`
- **Required headers on inventory/offer calls:** `Content-Type: application/json`,
  **`Content-Language: en-GB`** (omitting this errors), `Authorization: Bearer <token>`.
- **Read/analytics MCP tools work fine** — use them normally (get_user, get_*_policies,
  get_traffic_report, get_category_suggestions, get_inventory_locations, seller standards, etc.).

### Required fields for a UK offer
- `marketplaceId: "EBAY_GB"`, `format: "FIXED_PRICE"`, `availableQuantity`, `categoryId`,
  `pricingSummary.price {value, currency: "GBP"}`, `merchantLocationKey`, and `listingPolicies`
  with all three policy IDs.
- **At least one image is mandatory** (`product.imageUrls`, https, ≥500px). Placeholder used for
  tests: `https://placehold.co/600x600.png`.

### Item specifics (aspects) — the whack-a-mole trap
- Publish rejects **one missing required aspect at a time** (errorId 25002). Don't guess — pull the
  full list up front:
  `GET https://api.ebay.com/commerce/taxonomy/v1/category_tree/3/get_item_aspects_for_category?category_id={id}`
  and set every aspect where `aspectConstraint.aspectRequired == true`.
- Category tree id for UK = **`3`**. Socks category **11511** requires:
  **Brand, Colour, Size, Department, Style**.

---

## 3. Analytics (Sell Analytics API)

- Traffic report filter format:
  `marketplace_ids:{EBAY_GB},date_range:[YYYYMMDD..YYYYMMDD]`.
- `dimension: "DAY"` → daily trend (compact). `dimension: "LISTING"` → per-listing, can be **huge**
  (200 listings ≈ 6,700 lines, overflows context) → offload parsing to a subagent or narrow the filter.
- The `sort` param is finicky and errored for us — **omit `sort`** and sort client-side.
- Metrics used: `LISTING_IMPRESSION_TOTAL, LISTING_VIEWS_TOTAL, TRANSACTION, SALES_CONVERSION_RATE`.
- Seller standards: `find_seller_standards_profiles`. Customer service: `get_customer_service_metric`
  (needs `customerServiceMetricType`, `evaluationType`, `evaluationMarketplaceId`).

---

## 4. Reference IDs (this account, EBAY_GB)

- **Category tree id:** `3` (eBay UK). Look up your category with `get_category_suggestions`.
- **Business policies** (payment / return / fulfillment) and **merchant location keys** are per-account
  — fetch yours with `get_payment_policies`, `get_return_policies`, `get_fulfillment_policies`,
  `get_inventory_locations`, and pass the IDs in `product.json` (see LISTING.md).
- **App ID / Cert ID / RuName** live only in `.env` (never committed). Get them from your eBay
  Developer keyset and the User Tokens page.

---

## 5. General

- Always operate on your target marketplace (this account: **EBAY_GB** / GBP) unless told otherwise.
- Treat the seller account as a **live revenue account** — confirm before publish / end / refund /
  delete. When testing, use a low quantity and end the test listing afterward.

# Listing workflow — product URL → live eBay listing

This is the playbook Claude Code follows when the user says *"list this product: <url>"*.
It combines the **browser agent** (scrape) with **`scripts/list-from-url.mjs`** (process + publish).

## The flow

1. **Scrape** (browser/Playwright MCP). Open the URL and extract:
   - title, full description, brand, price
   - every variation (e.g. Colour × Size) and which combinations are in stock
   - all product image URLs (per colour where possible)
2. **Download images** to a local `work/` folder (the browser agent saves them).
3. **Write a spec file** `work/product.json` in the format below.
4. **Run the script** — it removes image backgrounds (rembg), hosts them on eBay (EPS),
   creates one inventory item per variation, groups them, and publishes ONE multi-variation listing:
   ```
   node handoff/scripts/list-from-url.mjs work/product.json --no-publish   # stage + review first
   node handoff/scripts/list-from-url.mjs work/product.json                # publish live
   ```
5. **Confirm before the live run.** Always do `--no-publish` first, show the user the staged
   result, and only publish on their go-ahead. This is a live revenue account.

## `product.json` format

```jsonc
{
  "skuPrefix": "ADIDAS-ULTRABOOST",       // used to name the item group
  "title": "adidas Ultraboost Light Men's Running Shoes",   // <= 80 chars
  "description": "Full HTML/plain description...",
  "categoryId": "95672",                  // optional — omit to auto-suggest from the title
  "condition": "NEW",
  "currency": "GBP",
  "price": "129.99",                       // default price; a variation can override
  "removeBackground": true,                // rembg on all images

  // Shared item specifics (applied to every variation). Include everything the category
  // requires that ISN'T a variation axis. The script checks required aspects for you.
  "aspects": {
    "Brand": ["adidas"],
    "Department": ["Men"],
    "Type": ["Trainers"]
  },

  // The variation axes. aspectsImageVariesBy = which axis swaps the main photo.
  "variesBy": {
    "aspectsImageVariesBy": ["Colour"],
    "specifications": [
      { "name": "Colour", "values": ["Core Black", "Cloud White"] },
      { "name": "UK Shoe Size", "values": ["8", "9", "10"] }
    ]
  },

  // Group-level images (shown before a variation is picked).
  "images": ["work/hero-black.png", "work/hero-white.png"],

  // One entry per in-stock combination. sku must be unique. images = that colour's photos.
  "variations": [
    { "sku": "ADIDAS-ULTRABOOST-BLK-8",  "aspects": {"Colour":["Core Black"], "UK Shoe Size":["8"]},  "quantity": 3, "images": ["work/black-1.png"] },
    { "sku": "ADIDAS-ULTRABOOST-BLK-9",  "aspects": {"Colour":["Core Black"], "UK Shoe Size":["9"]},  "quantity": 5, "images": ["work/black-1.png"] },
    { "sku": "ADIDAS-ULTRABOOST-WHT-8",  "aspects": {"Colour":["Cloud White"], "UK Shoe Size":["8"]}, "quantity": 2, "images": ["work/white-1.png"] }
  ],

  // Business policies + location. Fetch your own IDs with get_payment_policies,
  // get_return_policies, get_fulfillment_policies, and get_inventory_locations.
  "policies": {
    "paymentPolicyId": "YOUR_PAYMENT_POLICY_ID",
    "returnPolicyId": "YOUR_RETURN_POLICY_ID",
    "fulfillmentPolicyId": "YOUR_FULFILLMENT_POLICY_ID"
  },
  "merchantLocationKey": "YOUR_LOCATION_KEY"
}
```

## What the script guarantees so publish doesn't fail
- **Required item specifics** for the category are fetched up front; if the spec is missing any,
  it stops with the exact list (no one-at-a-time publish errors).
- **Images are hosted** on eBay EPS, so `imageUrls` are always valid https URLs.
- **Idempotent offers** — re-running updates existing offers instead of erroring.

## Caution (say this to the user once)
Listing brand products (adidas, etc.) with the brand's own images/text can trigger eBay's **VeRO**
brand-protection takedowns. That's the seller's risk to accept. Prefer own-photographed images and
original descriptions where possible.

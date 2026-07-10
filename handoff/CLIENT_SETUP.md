# CLIENT_SETUP — instructions for Claude Code to execute

You are setting up the eBay Copilot on this machine. Do these steps in order. Stop and tell the
user if any step fails; do not improvise around a failure.

## 0. Preconditions
- Confirm the working directory contains `package.json` and a `.env` file. If `.env` is missing,
  STOP and ask the user to add the private `.env` file to this folder first.
- Confirm `node -v` is ≥ 20. If not, ask the user to run the install steps in `handoff/SETUP.md`.

## 1. Validate the `.env`
- Read `.env` and confirm these keys are present and non-empty: `EBAY_CLIENT_ID`,
  `EBAY_CLIENT_SECRET`, `EBAY_USER_REFRESH_TOKEN`, `EBAY_ENVIRONMENT`, `EBAY_MARKETPLACE_ID`.
- The `EBAY_USER_REFRESH_TOKEN` value **must be wrapped in double quotes** (it contains `#`, which
  dotenv treats as a comment and would truncate the token). If it isn't quoted, quote it.

## 2. Install dependencies
- Run `npm install` in this folder. This also builds the server (`prepare` script).
  This is a third-party package install; if the environment blocks it, ask the user to run
  `npm install` themselves in their terminal (`! npm install`).

## 3. Verify the token plumbing (no MCP needed)
- Run: `node handoff/scripts/lib-ebay.mjs` will not do anything on its own, so instead run this
  one-off check:
  ```
  node --input-type=module -e "import {getAccessToken,ebayRest} from './handoff/scripts/lib-ebay.mjs'; const t=await getAccessToken(['https://api.ebay.com/oauth/api_scope/commerce.identity.readonly']); const u=await ebayRest('/commerce/identity/v1/user/',{token:t}); console.log('OK', u.username, u.registrationMarketplaceId);"
  ```
- Expect `OK <your-username> <your-marketplace>` (e.g. `EBAY_GB`). If it fails on the token, revisit step 1.

## 4. Register the MCP server with Claude Code
- Get the absolute path to `build/index.js` in this folder.
- Run: `claude mcp add ebay --scope user -- node "<ABSOLUTE_PATH>/build/index.js"`
- Run `claude mcp list` and confirm `ebay` shows **Connected**.

## 5. Tell the user to restart
- MCP tools load at startup. Tell the user to fully quit and reopen Claude Code, then confirm by
  asking you *"check my eBay connection"* — at which point you call `ebay_get_user` and report the
  account + marketplace.

## Notes for later use (read `RULES.md` in full before listing)
- **Do not use the MCP write tools** (create inventory/offer, update offer) — they fail from this
  client because `body` is serialised to a string. Create/edit listings via
  `handoff/scripts/list-from-url.mjs`, which uses eBay REST directly.
- Analytics/read MCP tools work fine — use them normally.
- Default marketplace is **EBAY_GB** (UK, GBP). This is a live revenue account: confirm before
  publishing, ending, refunding, or deleting anything.

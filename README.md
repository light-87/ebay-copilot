# 🛒 eBay Copilot

**Run your eBay store from a chat window.** An AI assistant that lists products, answers questions
about your sales, and builds analytics dashboards — all in plain English, all against the real eBay
APIs. Built on top of the [`ebay-mcp`](https://github.com/YosefHayim/ebay-mcp) server (vendored here),
with a listing pipeline and dashboard generator layered on top.

> Paste a product link → get a fully-built, multi-variation listing.
> Ask *"how are my top sellers doing?"* → get live numbers.
> Say *"refresh my dashboard"* → get a fresh charts page.

---

## What it does

| | |
|---|---|
| 🔗 **List from a URL** | Paste a product page. It scrapes title, description, price, and every colour/size variation, **removes the image backgrounds**, and publishes one **multi-variation listing** — with all required item specifics auto-filled so it doesn't get rejected. |
| 📈 **Answer questions** | *"What sold best this month?" · "Is my conversion up?" · "Am I still Top Rated?"* — live answers from the eBay Analytics API, including early warnings when a seller-rating metric starts slipping. |
| 📊 **Visual dashboard** | One request builds a clean, self-contained HTML charts page (sales trend, top listings, seller standing). **Customizable** — ask to add any metric — and refreshed with a single *"refresh the analytics"*. |

---

## How it works

```
You (chat)  ─►  Claude Code  ─►  browser agent (Playwright)  ─►  scrape product page
                     │
                     ├─►  eBay MCP server (read/analytics tools)
                     │
                     └─►  handoff/scripts/  ─►  rembg (bg removal) ─► eBay EPS (image hosting)
                                            └─►  eBay Inventory REST ─► published listing
```

Everything runs **locally on your machine** against **your** eBay account. Credentials never leave
your computer.

---

## Prerequisites

- **Node.js 20+**, **git**
- **[Claude Code](https://claude.com/claude-code)**
- **rembg** for background removal: `pipx install rembg`
- An **eBay Developer account** with a Production keyset (free).

---

## Setup

### Option A — you were given a `.env` (client / team handoff)

1. `git clone <this-repo> ebay-copilot && cd ebay-copilot`
2. Put the `.env` file you were sent into the folder (next to `package.json`).
3. Open Claude Code (`claude`) and tell it: **"Run handoff/CLIENT_SETUP.md"**.
4. Restart Claude Code. Done — ask it *"check my eBay connection"*.

Full walkthrough: **[handoff/SETUP.md](handoff/SETUP.md)**.

### Option B — from scratch (your own eBay account)

1. **Get eBay API keys.** At [developer.ebay.com](https://developer.ebay.com) → *Application Keys*,
   create a **Production** keyset. Note the **App ID (Client ID)** and **Cert ID (Client Secret)**.
2. **Create a redirect (RuName)** under *User Tokens*, and note it.
3. **Get a user refresh token.** Easiest: run `npm run setup` and follow the OAuth sign-in.
   (Manual flow documented in [RULES.md](RULES.md).)
4. **Configure `.env`.** Copy `handoff/.env.example` to `.env` in the repo root and fill it in.
   > ⚠️ The refresh token **must** be double-quoted — it contains `#`, which dotenv treats as a
   > comment and would truncate. This is the #1 setup gotcha.
5. `npm install`
6. Register with Claude Code: `claude mcp add ebay --scope user -- node "$(pwd)/build/index.js"`
7. Restart Claude Code.

---

## Using it

Just talk to Claude Code:

- **List a product:** *"List this product: https://…"* → see **[handoff/LISTING.md](handoff/LISTING.md)**.
- **Ask about your store:** *"Show my top 10 sellers this month."*
- **Build a dashboard:** *"Generate my analytics dashboard."* then *"add a profit column"* / *"refresh the analytics"*.

Or run the tools directly:

```bash
node handoff/scripts/analytics-dashboard.mjs 30 dashboard.html        # 30-day dashboard
node handoff/scripts/list-from-url.mjs work/product.json --no-publish # stage a listing
```

---

## Important notes

- This is a **live account** — the assistant asks before anything public or irreversible.
- **The MCP write tools don't work from Claude Code** (it serialises the request body to a string);
  listings are created via eBay REST in `handoff/scripts/`. Read/analytics tools work fine. See [RULES.md](RULES.md).
- Listing **brand products** with the brand's own images/text can trigger eBay's **VeRO** takedowns.

For the full gotchas-and-recipes reference, read **[RULES.md](RULES.md)**.

---

## 🚀 Want this set up and running for you?

Don't want to touch the terminal? We'll set up eBay Copilot on your machine, connect it to your
account, and tailor the listing flow and dashboards to your store — **done for you, end to end.**

We build custom **automation & AI tools for businesses**: marketplace automation, listing pipelines,
AI assistants, dashboards, and full web apps.

### → [**saundaryaroof.homes**](https://saundaryaroof.homes)

- 📧 **helpdesk@saundaryaroof.homes** — setup & support
- 📧 **vaibhav@saundaryaroof.homes** — business & custom projects

<sub>**Saundarya Roof Private Limited** · DPIIT-recognised startup (DIPP269358) · Udyam/MSME registered · Maharashtra, India</sub>

---

## Credits & license

Built on the excellent [`ebay-mcp`](https://github.com/YosefHayim/ebay-mcp) by YosefHayim (MIT) —
its original README is preserved as [UPSTREAM-README.md](UPSTREAM-README.md). The `handoff/` toolkit
(listing pipeline, dashboard, setup automation) is provided as-is under the same MIT terms.
Not affiliated with or endorsed by eBay Inc.

<sub>© Saundarya Roof Private Limited · saundaryaroof.homes</sub>

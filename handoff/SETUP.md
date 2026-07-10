# eBay Copilot — Setup (macOS)

One-time setup to get the eBay Copilot running in Claude Code on your Mac. ~10 minutes.

You will need the **`.env` file** (sent to you privately — never in email or chat history). It holds
the eBay credentials and the long-lived access token. Keep it secret; it is git-ignored.

---

## 1. Install prerequisites

Open **Terminal** and run:

```bash
# Homebrew (skip if you already have it)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js 20+ and git
brew install node git

# rembg for background removal (used when listing products)
brew install pipx && pipx ensurepath && pipx install rembg
```

Check versions (Node must be ≥ 20):

```bash
node -v && git --version
```

Claude Code itself: install from https://claude.com/claude-code if you haven't.

---

## 2. Get the project

```bash
git clone <YOUR_GITHUB_REPO_URL> ebay-copilot
cd ebay-copilot
```

Put the **`.env`** you were sent into this folder (same level as `package.json`):

```bash
# after copying the file in:
ls .env    # should print ".env"
```

---

## 3. Let Claude Code finish the setup

Open Claude Code **in this folder**:

```bash
claude
```

Then tell it:

> Run handoff/CLIENT_SETUP.md

Claude will install dependencies, register the eBay MCP server, and verify the connection.
When it prints **"authenticated as … (EBAY_GB)"**, you're done.

---

## 4. Try it

In Claude Code, ask:

- *"Show me my top selling items this month"* → analytics.
- *"Generate my analytics dashboard"* → opens an HTML charts page.
- *"List this product: <paste an Adidas product URL>"* → scrapes, processes images, drafts the listing.

See **handoff/LISTING.md** for the listing workflow and **RULES.md** for the technical notes.

---

## Troubleshooting

- **"authentication failed" / user token not working** → open `.env` and make sure the
  `EBAY_USER_REFRESH_TOKEN` value is wrapped in **double quotes**. Then restart Claude Code.
- **rembg: command not found** → `pipx install rembg` and restart Terminal.
- **The eBay tools don't appear** → fully quit and reopen Claude Code (MCP tools load at startup).

#!/usr/bin/env node
// Generate a self-contained HTML analytics dashboard from live eBay data.
// No external dependencies, no build step — open the output .html in any browser.
//
// Usage:
//   node handoff/scripts/analytics-dashboard.mjs            # last 30 days -> dashboard.html
//   node handoff/scripts/analytics-dashboard.mjs 60 out.html
//
// Pulls: daily traffic trend, top listings by sales, and seller-standards level.

import { writeFile } from 'node:fs/promises';
import { getAccessToken, ebayRest, MARKETPLACE_ID } from './lib-ebay.mjs';

const ANALYTICS = 'https://api.ebay.com/oauth/api_scope/sell.analytics.readonly';
const days = Number(process.argv[2]) || 30;
const outFile = process.argv[3] || 'dashboard.html';

// eBay wants YYYYMMDD in the marketplace's timezone; UTC is close enough for a report.
const pad = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
const end = new Date();
const start = new Date(end.getTime() - days * 86400000);
const range = `date_range:[${ymd(start)}..${ymd(end)}]`;
const filter = `marketplace_ids:{${MARKETPLACE_ID}},${range}`;

const token = await getAccessToken([ANALYTICS]);

async function traffic(dimension, metric) {
  return ebayRest(
    `/sell/analytics/v1/traffic_report?dimension=${dimension}` +
      `&filter=${encodeURIComponent(filter)}&metric=${encodeURIComponent(metric)}`,
    { token },
  );
}

// --- Fetch -----------------------------------------------------------------
const METRICS = 'LISTING_IMPRESSION_TOTAL,LISTING_VIEWS_TOTAL,TRANSACTION,SALES_CONVERSION_RATE';
const byDay = await traffic('DAY', METRICS);
const byListing = await traffic('LISTING', 'LISTING_IMPRESSION_TOTAL,LISTING_VIEWS_TOTAL,TRANSACTION');

let standards = null;
try {
  const s = await ebayRest('/sell/analytics/v1/seller_standards_profile', {
    token: await getAccessToken(['https://api.ebay.com/oauth/api_scope/sell.analytics.readonly']),
  });
  const profiles = s?.standardsProfiles || [];
  // Prefer the current default program (the account's primary marketplace standard).
  standards =
    profiles.find((p) => p.defaultProgram && p.cycle?.cycleType === 'CURRENT') ||
    profiles.find((p) => p.cycle?.cycleType === 'CURRENT') ||
    profiles[0];
} catch {
  /* seller standards optional */
}

// --- Shape -----------------------------------------------------------------
const rows = (byDay.records || [])
  .map((r) => ({
    day: r.dimensionValues[0].value,
    imp: r.metricValues[0].value ?? 0,
    views: r.metricValues[1].value ?? 0,
    txn: r.metricValues[2].value ?? 0,
    conv: r.metricValues[3].value ?? 0,
  }))
  .sort((a, b) => a.day.localeCompare(b.day));

const listings = (byListing.records || [])
  .map((r) => ({
    id: r.dimensionValues[0].value,
    imp: r.metricValues[0].value ?? 0,
    views: r.metricValues[1].value ?? 0,
    txn: r.metricValues[2].value ?? 0,
  }))
  .sort((a, b) => b.txn - a.txn);

const totals = rows.reduce(
  (a, r) => ({ imp: a.imp + r.imp, views: a.views + r.views, txn: a.txn + r.txn }),
  { imp: 0, views: 0, txn: 0 },
);
const convAvg = totals.views ? ((totals.txn / totals.views) * 100).toFixed(1) : '0';
const top = listings.slice(0, 10);

// --- Render (server-side SVG, theme-aware, self-contained) -----------------
const fmt = (n) => n.toLocaleString('en-GB');
const W = 720;
const H = 220;
const P = 32;
const maxDaily = Math.max(1, ...rows.map((r) => Math.max(r.views, r.txn * 10)));
const x = (i) => P + (i * (W - 2 * P)) / Math.max(1, rows.length - 1);
const yV = (v) => H - P - (v / maxDaily) * (H - 2 * P);
const linePath = (key, scale = 1) =>
  rows.map((r, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${yV(r[key] * scale).toFixed(1)}`).join(' ');

const maxTxn = Math.max(1, ...top.map((l) => l.txn));
const bars = top
  .map((l, i) => {
    const bw = (W - 2 * P) / top.length - 8;
    const bx = P + i * ((W - 2 * P) / top.length);
    const bh = (l.txn / maxTxn) * (H - 2 * P);
    return `<rect x="${bx.toFixed(1)}" y="${(H - P - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="4" fill="var(--accent)"/>
      <text x="${(bx + bw / 2).toFixed(1)}" y="${(H - P - bh - 6).toFixed(1)}" text-anchor="middle" class="bl">${l.txn}</text>`;
  })
  .join('');

const level = standards?.standardsLevel || 'N/A';
const levelColor =
  level === 'TOP_RATED' ? '#1a8a4a' : level === 'ABOVE_STANDARD' ? '#1976D2' : '#c62828';

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>eBay Analytics — ${MARKETPLACE_ID}</title>
<style>
  :root{--bg:#f5f6f8;--card:#fff;--ink:#1a1a1a;--muted:#666;--accent:#1976D2;--line:#e3e6ea}
  @media(prefers-color-scheme:dark){:root{--bg:#12141a;--card:#1c1f27;--ink:#eef;--muted:#9aa;--line:#2a2e38}}
  *{box-sizing:border-box}body{margin:0;font:15px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--ink)}
  .wrap{max-width:820px;margin:0 auto;padding:28px 18px}
  h1{font-size:22px;margin:0 0 2px}.sub{color:var(--muted);margin:0 0 22px;font-size:13px}
  .tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:22px}
  .tile{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px}
  .tile .n{font-size:26px;font-weight:700}.tile .l{color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.04em}
  .card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px;margin-bottom:18px}
  .card h2{font-size:14px;margin:0 0 12px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}
  svg{width:100%;height:auto}.bl{fill:var(--muted);font-size:10px}.ax{fill:var(--muted);font-size:10px}
  .legend{display:flex;gap:16px;font-size:12px;color:var(--muted);margin-top:6px}
  .dot{display:inline-block;width:10px;height:10px;border-radius:3px;vertical-align:middle;margin-right:5px}
  table{width:100%;border-collapse:collapse;font-size:13px}td,th{padding:7px 8px;text-align:left;border-bottom:1px solid var(--line)}
  th{color:var(--muted);font-weight:600;font-size:11px;text-transform:uppercase}
  a{color:var(--accent);text-decoration:none}.badge{display:inline-block;padding:3px 10px;border-radius:20px;color:#fff;font-size:12px;font-weight:600}
</style></head><body><div class="wrap">
  <h1>eBay Analytics · ${MARKETPLACE_ID}</h1>
  <p class="sub">Last ${days} days · generated ${new Date().toISOString().slice(0, 10)}</p>

  <div class="tiles">
    <div class="tile"><div class="n">${fmt(totals.txn)}</div><div class="l">Sales</div></div>
    <div class="tile"><div class="n">${fmt(totals.views)}</div><div class="l">Views</div></div>
    <div class="tile"><div class="n">${fmt(totals.imp)}</div><div class="l">Impressions</div></div>
    <div class="tile"><div class="n">${convAvg}%</div><div class="l">Conversion</div></div>
    <div class="tile"><div class="n"><span class="badge" style="background:${levelColor}">${level.replace('_', ' ')}</span></div><div class="l">Seller standard</div></div>
  </div>

  <div class="card"><h2>Daily views &amp; sales</h2>
    <svg viewBox="0 0 ${W} ${H}">
      <path d="${linePath('views')}" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <path d="${linePath('txn', 10)}" fill="none" stroke="#e67e22" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="${P}" y="14" class="ax">${fmt(maxDaily)}</text>
      <text x="${P}" y="${H - 10}" class="ax">${rows[0]?.day || ''}</text>
      <text x="${W - P}" y="${H - 10}" class="ax" text-anchor="end">${rows.at(-1)?.day || ''}</text>
    </svg>
    <div class="legend"><span><span class="dot" style="background:var(--accent)"></span>Views</span><span><span class="dot" style="background:#e67e22"></span>Sales (×10)</span></div>
  </div>

  <div class="card"><h2>Top 10 listings by sales</h2>
    <svg viewBox="0 0 ${W} ${H}">${bars}</svg>
  </div>

  <div class="card"><h2>Top listings</h2>
    <table><tr><th>#</th><th>Listing</th><th>Sales</th><th>Views</th><th>Impr.</th></tr>
    ${top
      .map(
        (l, i) =>
          `<tr><td>${i + 1}</td><td><a href="https://www.ebay.co.uk/itm/${l.id}" target="_blank">${l.id}</a></td><td>${l.txn}</td><td>${fmt(l.views)}</td><td>${fmt(l.imp)}</td></tr>`,
      )
      .join('')}
    </table>
  </div>

  <div style="margin-top:22px;padding-top:14px;border-top:1px solid var(--line);display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:11.5px;color:var(--muted)">
    <span>Live data · eBay Sell Analytics API</span>
    <span>Built with eBay Copilot by <a href="https://saundaryaroof.homes" style="color:var(--accent);text-decoration:none;font-weight:600">Saundarya Roof Homes</a></span>
  </div>
</div></body></html>`;

await writeFile(outFile, html, 'utf8');
console.error(`Wrote ${outFile}  (${rows.length} days, ${listings.length} listings, ${totals.txn} sales)`);

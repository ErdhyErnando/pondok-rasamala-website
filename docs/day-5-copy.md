# Day 5 — Blog + EN sweep + Cloudflare handoff

## Blog (`src/data/posts.ts`, Emdash-shape 🟢)

3 launch posts (per issue #6), full ID+EN bodies (~6 paragraphs each):

1. `panduan-camping-gunung-salak-endah` — glamping vs lot, packing,
   timing, side-trip curug, leave-no-trace. 🟢 (facts: own inventory +
   Day-4 attraction research)
2. `villa-bambu-bogor-kabur-dari-kota` — weekend-escape pattern,
   Fri–Sun rhythm. 🟢
3. `curug-terbaik-sekitar-gunung-salak` — 6 spots, rules, basecamp CTA. 🟡
   (distances inherited from Day-4 research)
- Article JSON-LD + related posts + category pills via card eyebrow. 🟢
- RSS: `/rss.xml` (ID) + `/en/rss.xml` (EN). 🟢
- Week-2: body paragraphs → Portable Text blocks (mechanical).

## EN sweep

- Every page has a full EN mirror (no fallbacks needed — missing-EN
  noindex rule documented but untriggered). Toggles + hreflang triple
  verified per template via Base (spot-checked `/en/type-bambu/`).
- EN copy is our translation throughout (🟡) — human read before launch.

## Sitemap + robots

- `@astrojs/sitemap` with i18n (id default) — build-verified:
  production URLs, Papandayan + `/en/` tree included, hreflang alternates.
- `robots.txt` → sitemap-index. Both present in `dist/client`.

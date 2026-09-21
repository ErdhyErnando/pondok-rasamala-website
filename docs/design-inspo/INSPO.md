# Design Inspiration

## LOCKED — section mapping (owner, 2026-09-21)

| Reference | Serves |
|-----------|--------|
| hero-structure (Well Traveled) | Homepage hero + homepage rails/dividers |
| clean-layout (Babayants) | Villa / glamping / room detail pages |
| gallery-layout (scrapbook) | Gallery page — refined scrapbook, not rough |
| about-section (Armonia) | About + Contact pages |

- Hero: **split editorial** — serif headline + CTA left on paper, large
  bamboo-resort photo right (calmer than full-bleed overlay; H1 carries
  "Wisata Alam Pedesaan").
- Palette: **monochrome dominant** (ink/paper/grays lead) with **hints** of
  forest green, yellowish warmth, woody brown — accents, never section fills.
- Gallery: scrapbook warmth (paper tone, personal captions, tape/polaroid
  cues) executed cleanly: aligned grid, restrained rotation (≤2deg), no
  torn edges or heavy textures; performance budget unchanged.

---

## 1. hero-structure.webp — "Well Traveled" editorial travel club
Full-bleed landscape hero (canyon) with centered serif overlay headline,
floating member-card chips, slim top nav + black pill CTA. Below: intro
statement, editorial photo-card rails (eyebrow `SLEEP — CITY` / serif name /
small meta), category dividers (EAT / SLEEP / PLAY with icon + big serif
word), single testimonial quote, closing question CTA, minimal footer.
- Tags: `layout` (homepage blueprint), `type` (serif display + small caps
  eyebrows), `imagery` (photography-led, text-over-photo with scrim),
  `motion` (static, calm — no parallax visible)
- Reads for us: homepage structure (hero → showcase rails → category
  sections → quote → CTA), card anatomy for villa/glamping cards, category
  divider pattern reusable for Villa / Glamping / Paket sections.

## 2. clean-layout.jpg — BABAYANTS architects lookbook
Stark white pages, extreme whitespace, tiny grotesque body copy in narrow
columns, large forest/cabin photography, page-number + brand footer strip.
- Tags: `layout` (airiness benchmark), `imagery` (architecture-in-nature
  photography), `type` (quiet grotesque, small sizes, lots of leading)
- Reads for us: spacing ceiling (how much air is too much?), About page
  editorial tone, villa detail photography treatment.

## 3. about-section.jpg — Armonia travel About page
Warm paper background (~`#EFEAE0`), rounded-card container, small-caps nav,
deep-green pill CTA ("Book a Tour"), big grotesque headline, panoramic
rounded photo, purpose statement + side note, underlined subsection links,
deeper-cream closing CTA band.
- Tags: `palette` (paper + deep green = closest to our forest/paper tokens),
  `layout` (About page blueprint), `type` (grotesque headline, statement
  + sidenote rhythm)
- Reads for us: strongest palette reference so far; About Us page structure
  (statement → subsections → CTA band); pill CTA style.

## 4. gallery-layout.jpg — "travel recs" scrapbook collage
Sage dotted background, polaroid/tape/washi collage grid, handwritten
captions, torn-paper divider, big feature panel.
- Tags: `imagery`/`layout` — **conflicts with calm-premium**: busy, crafty,
  high visual noise. Warmth and playfulness are likable; the treatment
  fights the "calming" goal and hurts Lighthouse (many small images,
  textures).
- Open question: take only the warmth (sage/paper tones, personal captions)
  into a calm masonry grid — or do you want the actual collage look?

## Locked direction (from PRD Rev 2 — inspo serves this)

Calm semi-premium: airy neutrals + deep forest accent, one CTA color per
viewport, editorial serif headlines + clean grotesque body, generous
whitespace (64–120px sections), fade-only motion, photography-led.

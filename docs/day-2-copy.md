# Day 2 — Homepage copy delivery (ID source of truth + EN mirror)

> Voice: professional but friendly, understated (calm-premium). Benefits over
> features, specificity over vagueness, customer language (liburan, kabur,
> gathering). Zero fabricated stats/testimonials — all quotes real & linked.
> Live copy lives in `src/data/home.ts`; this doc is the rationale record.

## H1 — 3 curated options (no scorer script, per owner decision Day 2)

Anchor requirement: **"Wisata Alam Pedesaan"** in or next to the H1.

| # | ID | EN | Rationale |
|---|----|----|-----------|
| **A ✅ winner** | Wisata Alam Pedesaan di Kaki Gunung Salak | A Countryside Nature Retreat at the Foot of Mount Salak | Anchor *is* the H1 (strongest concept-SEO); place-specific (Gunung Salak); calm statement, no hype. Specificity > cleverness. |
| B | Kabur Sejenak ke Wisata Alam Pedesaan | Slip Away to a Countryside Nature Retreat | Customer language ("kabur"); active verb. Runner-up — slightly less specific about *where*. Reuse as blog/social headline. |
| C | Bangun Pagi di Udara Gunung Salak | Wake Up in Mount Salak's Mountain Air | Benefit-led sensory open; anchor moves to eyebrow. Weakest on concept-SEO — parked for Day 3 villa detail subheads. |

Why A wins: the site must rank for the concept phrase itself; leading with it
in the H1 costs nothing in warmth because the subheadline carries the benefit
("udara gunung yang sejuk", "tempat pelan"). 🟢

## Section copy + annotations

**Hero eyebrow** — "TNGHS · ±2 jam dari Jakarta": two credibility facts in
5 words (national-park status + drive time kills the #1 objection). 🟢
**Hero sub** — names the product range (villa bambu/kayu, glamping) + feeling
("tempat pelan") + audiences (keluarga, gathering, kabur akhir pekan). One
idea, active voice. 🟢
**Trust row** — inventory facts from seed (16 villa, 8 glamping, aula) —
no adjectives, no invented numbers. 🟢
**Showcase one-liners** — each states *who it's for* (keluarga kecil /
rombongan besar / komunitas), not specs. Prices verbatim from seed,
suffixed "(Konfirmasi via WhatsApp)" honesty guardrail. 🟢
**Activities** — "Seharian penuh tanpa gadget": benefit headline, one idea;
cards map to real inventory (lapangan, curug terdekat, aula+api unggun). 🟢
**Location** — "Dekat dari kota, jauh dari bising": contrast pairing from
PRD; times (2 jam / 1,5 jam) match PRD ground facts. 🟢
**CTA** — action-outcome ("Ceritakan tanggal dan jumlah rombongan — kami
bantu pilihkan…"); note carries the price/availability honesty guardrail. 🟢

## CTA alternatives (per page, action-outcome formula)

- Hero: "Pesan via WhatsApp" (winner — shortest path to booking) / alt:
  "Cek villa & glamping", "Rencanakan gathering"
- Activities: "Lihat paket gathering" (winner) / alt: "Cek paket outbound"
- Location: "Buka di Google Maps" (winner) / alt: "Lihat rute perjalanan"

## Testimonial provenance (all 🟢 ID verbatim, 🟡 EN = our translation)

1. "Suasana tenang dan sejuk memang terasa sangat menentramkan." — Cipu
   Suaib, family holiday Jan 2023, cipusuaib.id (trimmed from: "…meski
   sesekali terdengar teriakan bakso…" — cut marked, meaning preserved).
2. "Hawanya sangat sejuk sepanjang hari…" — Suwandi, Villa Pinus 2016,
   suwanditalks.com.
3. "Di sekitarnya ada banyak sekali wisata curug… Pengalaman glamping di
   sini tak kalah seru." — Ecy Rinos, glamping Apr 2019,
   ecyrinos.blogspot.com (ellipsis marks the trim).
4. Owner verification (Week 2): confirm none of these authors object to
   quotation; swap in Google-Review quotes if preferred.

## Meta ID+EN

- ID title: "Wisata Alam Pedesaan di Gunung Salak Endah, Bogor — Pondok
  Rasamala" (composed by Base) · description: "Villa bambu & kayu,
  glamping, dan paket gathering di kaki Gunung Salak, ±2 jam dari
  Jakarta. Pesan langsung via WhatsApp." (144 chars) 🟢
- EN title: "A Countryside Nature Retreat in Gunung Salak Endah, Bogor —
  Pondok Rasamala" · description: "Bamboo & timber villas, glamping, and
  gathering packages at the foot of Mount Salak, ±2 hours from Jakarta.
  Book direct via WhatsApp." 🟡 (translation, needs human read Day 5)

## Image placeholders (owner decision: temporary, swap Day 6)

All visuals are `PhotoPlaceholder` blocks (paper tone, dashed border,
"foto menyusul" label, `role="img"` + aria-label) — layout/finals are
real, only the photo bytes swap. Keeper shortlist for Day 6: wide resort
panorama (hero), Villa Bambu exterior, Villa Cendana exterior, Glamping
Salak tents, Glamping Cikuray tents.

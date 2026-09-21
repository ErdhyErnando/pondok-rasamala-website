# Day 3 — Accommodation copy & provenance

> Descriptions: 3–4 sentences, benefits-led, ID source of truth + EN mirror.
> Every price/capacity/spec mirrors
> `rasamala-app/rasamala-app-backend/src/db/data/rooms.seed.json` verbatim.

## Seed diffs fixed (Day-1 skeleton → verbatim)

| Row | Was | Seed verbatim now |
|-----|-----|-------------------|
| Bambu spec | "…(bisa disewakan per kamar)" | "2 kmr tidur, teras, 2 kmd (hanya kamar)" |
| Puspa spec | "2 kmr tidur, teras, 2 kmd" | "2 kmr tidur, teras, 2 kmd (hanya kamar)" |
| Leuit spec | “…& R Kel (rumah lumbung padi)” | "2 kmr tidur, 1 kmd, dapur & R Kel" (barn story moved to description) |
| Khiyang → Kihyang, Illegole kept | — | owner-locked names/URLs applied |
| Cikuray 10-pax row | — | seed quirk noted: paxNormal/paxMax = 8/8, tier pax taken from row name (10) |

## Verify flags (owner to confirm, Week 2)

- 🟡 Aula: price Rp2.000.000 (owner-supplied, not in seed) + capacity
  40/200 pax (Step-0 placeholder) — sidebar shows "Harga & kapasitas
  konfirmasi via WhatsApp".
- 🟡 Villa amenity lists are spec-derived (bedrooms/bathrooms/kitchen/
  terrace/living/pavilion/dining/extra beds) — no invented facilities
  (no wifi/AC claims anywhere).
- 🟡 EN descriptions are our translations — human read Day 5.
- 🟢 All prices, pax, tier tables, includes-notes: seed-verbatim.

## Structure decisions (owner-locked Day 3)

- `campsite.ts` = new tier file (seed rows 29–32); renders through the
  shared `AccommodationDetail` layout.
- Bedrooms/bathrooms parsed at build from the verbatim spec
  (`src/lib/specs.ts`); floor area removed entirely (not in seed).
- 26 segments × 2 locales = 52 prerendered paths via two catch-all routes
  sharing `src/lib/stay.ts`.
- Photos: `PhotoPlaceholder` + `<dialog>` lightbox until Day-6 keepers.

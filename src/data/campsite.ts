import { z } from "astro/zod";

const text = z.object({ id: z.string(), en: z.string() });

export const CampsiteSchema = z.object({
	slug: z.string().default("campsite"),
	name: text,
	tiers: z
		.array(
			z.object({
				pax: z.number().int(),
				price: z.number().int(), // IDR per night, seed verbatim
				includes: z.string(), // seed description verbatim
			}),
		)
		.min(1),
	firePit: z.boolean().default(true),
	tagline: text,
	description: text, // 3–4 sentences, benefits-led
	heroImage: z.string(),
	images: z.array(z.string()),
});

export type Campsite = z.infer<typeof CampsiteSchema>;

const T = (id: string, en = "") => ({ id, en });

/** Campsite lots mirror seed rows 29–32 verbatim (tent + breakfast per pax).
 *  Renders through the shared AccommodationDetail layout like glamping. */
export const campsite = CampsiteSchema.parse({
	name: T("Campsite", "Campsite"),
	tiers: [
		{ pax: 4, price: 1780000, includes: "Tenda 4 pax dan makan pagi 4 pax" },
		{ pax: 6, price: 2170000, includes: "Tenda 6 pax dan makan pagi 6 pax" },
		{ pax: 8, price: 2560000, includes: "Tenda 8 pax dan makan pagi 8 pax" },
		{ pax: 10, price: 2950000, includes: "Tenda 10 pax dan makan pagi 10 pax" },
	],
	firePit: true,
	tagline: T("Berkemah tanpa repot bawa tenda", "Camp without hauling tents"),
	description: T(
		"Campsite Pondok Rasamala untuk yang mau berkemah tanpa repot: tenda dan makan pagi sudah disiapkan untuk 4, 6, 8, atau 10 orang. Tinggal pilih jumlah rombongan — harga per lot sudah termasuk semuanya. Paling cocok untuk komunitas, sekolah, dan gathering yang mau api unggun di bawah langit Gunung Salak.",
		"Pondok Rasamala's campsite is for campers who skip the hassle: tents and breakfast ready for 4, 6, 8, or 10 people. Just pick your group size — the per-lot price covers everything. Best for communities, schools, and gatherings wanting bonfires under Mount Salak's sky.",
	),
	heroImage: "",
	images: [],
});

export const campsitePath = () => "/campsite/";

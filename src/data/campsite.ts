import { z } from "astro/zod";
import { photo, photoSchema } from "../lib/photos";

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
	hero: photoSchema,
	/** Photos after the hero. */
	gallery: z.array(photoSchema),
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
		"Campsite Pondok Rasamala untuk yang mau berkemah tanpa repot: tenda dan makan pagi sudah disiapkan untuk 4, 6, 8, atau 10 orang. Tinggal pilih jumlah rombongan, harga per lot sudah termasuk semuanya. Paling cocok untuk komunitas, sekolah, dan gathering yang mau api unggun di bawah langit Gunung Salak. Di sisi sungai tersedia pula Riverside Camp lot 1–6 untuk pengalaman berkemah tepi air, tanyakan ketersediaannya via WhatsApp.",
		"Pondok Rasamala's campsite is for campers who skip the hassle: tents and breakfast ready for 4, 6, 8, or 10 people. Just pick your group size, the per-lot price covers everything. Best for communities, schools, and gatherings wanting bonfires under Mount Salak's sky. By the river, Riverside Camp lots 1–6 offer a waterside camping experience, ask about availability via WhatsApp.",
	),
	hero: photo("campsite/campsite/01-malam-tenda-merah", {
		id: "Malam di campsite: tenda merah dan biru muda berjajar di pelataran paving, dengan saung beratap genteng merah di belakangnya.",
		en: "Night at the campsite: red and light-blue tents lined up on a paved area, with a red-tiled pavilion behind them.",
	}),
	gallery: [
			photo("campsite/campsite/02-tenda-dome-biru", {
				id: "Dua tenda dome biru di atas kerikil, dengan atap genteng merah saung terlihat di belakangnya.",
				en: "Two blue dome tents on gravel, with the red-tiled pavilion roofs behind them.",
			}),
			photo("campsite/campsite/03-area-tenda-saung", {
				id: "Pelataran tenda berkerikil dengan satu tenda biru, dikelilingi paving blok dan saung beratap genteng merah.",
				en: "Gravel tent pitch with one blue tent, bordered by paving blocks and a red-tiled pavilion.",
			}),
			photo("campsite/campsite/04-saung-panggung", {
				id: "Saung panggung kayu berlantai papan lebar dengan cincin batu di depannya dan jalan menurun di antara pepohonan.",
				en: "Raised timber pavilion with a broad plank floor, a stone ring in front and a path sloping away between trees.",
			}),
			photo("campsite/campsite/05-saung-malam", {
				id: "Saung terbuka dengan meja kayu panjang dan bangku di senja hari, lampu menyala menghadap pepohonan.",
				en: "Open pavilion with a long timber table and benches at dusk, a lamp glowing and trees beyond.",
			}),
			photo("campsite/campsite/06-saung-sore", {
				id: "Pelataran kerikil di depan saung beratap genteng merah pada sore hari, dengan lampu menyorot batang pohon.",
				en: "A gravel pitch in front of a red-tiled pavilion in the evening, with lights shining on a tree trunk.",
			}),
			photo("campsite/campsite/07-hamparan-camp", {
				id: "Hamparan rumput dan tembok batu berpagar tanaman di area campsite, dengan atap genteng merah di antara pepohonan.",
				en: "Lawn and a plant-topped stone wall at the campsite, with red-tiled roofs among the trees.",
			}),
			photo("campsite/campsite/08-pemandangan-atas", {
				id: "Pemandangan dari atas area campsite: jalan paving, tenda-tenda kecil, taman, dan hutan hijau di bawah puncak gunung.",
				en: "View from above the campsite grounds: paved paths, small tents and a garden, with green forest below a mountain peak.",
			}),
			photo("campsite/campsite/09-toilet", {
				id: "Toilet campsite berdinding batu kali dan kayu dengan wastafel kecil, beratap rangka terbuka dan dinaungi daun pisang.",
				en: "Campsite toilet with river-stone and timber walls and a small basin, an open roof frame and a banana leaf for shade.",
			}),
			photo("campsite/campsite/10-gerbang-campsite", {
				id: "Papan kayu bertuliskan CAMPSITE di antara dua tiang, dikelilingi pepohonan dan tanaman tropis.",
				en: "A wooden CAMPSITE sign between two posts, surrounded by trees and tropical plants.",
			}),
	],
});

export const campsitePath = () => "/campsite/";

/** Bookable spots mirror the live availability roster verbatim
 *  (api.pondokrasamala.com/public/availability): 6 campsite lots +
 *  6 riverside lots. Per-lot rates and capacity are not published
 *  there, so lot cards link out to live availability instead of
 *  showing prices. */
export const campLots = [
	...[1, 2, 3, 4, 5, 6].map((n) => ({
		name: `Campsite Lot ${n}`,
		area: "campsite" as const,
	})),
	...[1, 2, 3, 4, 5, 6].map((n) => ({
		name: `Riverside Camp ${n}`,
		area: "riverside" as const,
	})),
];

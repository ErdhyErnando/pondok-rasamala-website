import { z } from "astro/zod";

const text = z.object({ id: z.string(), en: z.string() });

/** One villa / cottage / hall row. Price + capacity mirror
 *  rasamala-app seed verbatim (single IDR/night, no weekday split). */
export const VillaSchema = z.object({
	slug: z.string(), // e.g. "kiriung" (URL path derived, not stored)
	name: z.string(), // canonical display name (owner-locked)
	type: z.enum(["villa", "leuit", "damar", "aula", "campsite"]),
	price: z.number().int(), // IDR per night
	paxNormal: z.number().int(),
	paxMax: z.number().int(),
	spec: z.string(), // seed spec string (Indonesian source)
	tagline: text,
	description: text, // 3–5 sentences, filled Day 2–3
	amenities: z.object({ id: z.array(z.string()), en: z.array(z.string()) }),
	heroImage: z.string(), // R2 URL, filled Day 6
	images: z.array(z.string()),
	priceNote: z.string().default("Harga konfirmasi via WhatsApp"),
});

export type Villa = z.infer<typeof VillaSchema>;

const T = (id: string, en = "") => ({ id, en });

export const villas = [
	{ slug: "kiriung", name: "Kiriung", type: "villa", price: 4750000, paxNormal: 8, paxMax: 16, spec: "4 kmr tidur, Ruang kel, 4 kmd, dapur, teras, Saung", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "bambu", name: "Bambu", type: "villa", price: 1250000, paxNormal: 4, paxMax: 6, spec: "2 kmr tidur, teras, 2 kmd (bisa disewakan per kamar)", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "cendana", name: "Cendana", type: "villa", price: 6750000, paxNormal: 14, paxMax: 28, spec: "7 kmr tidur, 3 kmd, dapur & 2 R kel", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "dayak", name: "Dayak", type: "villa", price: 2350000, paxNormal: 4, paxMax: 6, spec: "2 kmr tidur, R tamu, 1 kmd, dapur", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "kihyang", name: "Kihyang", type: "villa", price: 4750000, paxNormal: 10, paxMax: 20, spec: "5 kmr tidur, 2 R kel, 2 kmd, dapur", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "ilegole", name: "Ilegole", type: "villa", price: 2550000, paxNormal: 4, paxMax: 8, spec: "2 kmr tidur, 1 R kel, 1 kmd, dapur", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "kisampang", name: "Kisampang", type: "villa", price: 3850000, paxNormal: 6, paxMax: 12, spec: "3 kmr tidur, 3 kmd, dapur & R kel", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "pinus", name: "Pinus", type: "villa", price: 3850000, paxNormal: 6, paxMax: 12, spec: "3 kmr tidur, 2 kmd, dapur & R kel", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "puspa", name: "Puspa", type: "villa", price: 1250000, paxNormal: 4, paxMax: 8, spec: "2 kmr tidur, teras, 2 kmd", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "batarua", name: "Batarua", type: "villa", price: 3850000, paxNormal: 6, paxMax: 10, spec: "3 kmr tidur, 2 kmd, dapur & R kel", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "gaharu", name: "Gaharu", type: "villa", price: 3500000, paxNormal: 6, paxMax: 7, spec: "2 kmr tidur, 2 ext bed, 1 kmd, dapur & R Kel", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "mindi", name: "Mindi", type: "villa", price: 4100000, paxNormal: 8, paxMax: 12, spec: "4 kmr tidur, 3 kmd, Dapur & R Kel", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "kilanang", name: "Kilanang", type: "villa", price: 6750000, paxNormal: 10, paxMax: 12, spec: "5 kmr tidur, 6 kmd, Dapur & R kel & R Makan", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "kimerak", name: "Kimerak", type: "villa", price: 3950000, paxNormal: 6, paxMax: 7, spec: "3 kmr tidur, 2 kmd, R kel, Teras, dapur", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "leuit", name: "Leuit", type: "leuit", price: 2350000, paxNormal: 4, paxMax: 5, spec: "2 kmr tidur, 1 kmd, dapur & R Kel (rumah lumbung padi)", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "damar", name: "Damar", type: "damar", price: 3500000, paxNormal: 6, paxMax: 7, spec: "2 kmr tidur 3 bed, 1 kmd, Dapur & R Kel", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
	{ slug: "aula", name: "Aula", type: "aula", price: 2000000, paxNormal: 40, paxMax: 200, spec: "Ruang pertemuan + soundsystem (kapasitas menyusul, owner confirm)", tagline: T(""), description: T(""), amenities: { id: [], en: [] }, heroImage: "", images: [] },
];

/** Legacy URL path for a villa slug. */
export const villaPath = (slug: string) => `/type-${slug}/`;

for (const v of villas) VillaSchema.parse(v);
export type VillaRow = (typeof villas)[number];

import { z } from "astro/zod";

const text = z.object({ id: z.string(), en: z.string() });

export const PriceTierSchema = z.object({
	pax: z.number().int(),
	price: z.number().int(), // IDR per night, seed verbatim
});

export const GlampingSchema = z.object({
	slug: z.string(), // e.g. "salak" (URL: /glamping-type-salak/)
	name: z.string(),
	tiers: z.array(PriceTierSchema).min(1),
	includes: z.string(), // seed note, e.g. "Matras tidur, 1 kmd (Breakfast 4 pax)"
	firePit: z.boolean().default(true),
	tagline: text,
	description: text, // filled Day 2–3
	heroImage: z.string(),
	images: z.array(z.string()),
});

export type Glamping = z.infer<typeof GlampingSchema>;

const T = (id: string, en = "") => ({ id, en });
const std = "Matras tidur, 1 kmd + sarapan (sesuai pax)";

export const glamping = [
	{ slug: "salak", name: "Salak", tiers: [{ pax: 4, price: 2100000 }, { pax: 6, price: 2600000 }], includes: std, firePit: true, tagline: T(""), description: T(""), heroImage: "", images: [] },
	{ slug: "gede", name: "Gede", tiers: [{ pax: 4, price: 2100000 }, { pax: 6, price: 2600000 }], includes: std, firePit: true, tagline: T(""), description: T(""), heroImage: "", images: [] },
	{ slug: "pangrango", name: "Pangrango", tiers: [{ pax: 4, price: 2100000 }, { pax: 6, price: 2600000 }], includes: std, firePit: true, tagline: T(""), description: T(""), heroImage: "", images: [] },
	{ slug: "papandayan", name: "Papandayan", tiers: [{ pax: 8, price: 3100000 }], includes: std, firePit: true, tagline: T(""), description: T(""), heroImage: "", images: [] },
	{ slug: "burangrang", name: "Burangrang", tiers: [{ pax: 8, price: 3100000 }], includes: std, firePit: true, tagline: T(""), description: T(""), heroImage: "", images: [] },
	{ slug: "malabar", name: "Malabar", tiers: [{ pax: 8, price: 3100000 }], includes: std, firePit: true, tagline: T(""), description: T(""), heroImage: "", images: [] },
	{ slug: "cikuray", name: "Cikuray", tiers: [{ pax: 8, price: 3100000 }, { pax: 10, price: 3500000 }], includes: std, firePit: true, tagline: T(""), description: T(""), heroImage: "", images: [] },
	{ slug: "ciremey", name: "Ciremey", tiers: [{ pax: 8, price: 3100000 }], includes: std, firePit: true, tagline: T(""), description: T(""), heroImage: "", images: [] },
];

/** Legacy URL path for a glamping slug. */
export const glampingPath = (slug: string) => `/glamping-type-${slug}/`;

for (const g of glamping) GlampingSchema.parse(g);
export type GlampingRow = (typeof glamping)[number];

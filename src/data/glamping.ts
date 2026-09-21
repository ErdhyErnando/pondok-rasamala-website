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
	description: text, // 3–4 sentences, benefits-led
	heroImage: z.string(),
	images: z.array(z.string()),
});

export type Glamping = z.infer<typeof GlampingSchema>;

const T = (id: string, en = "") => ({ id, en });
const std = "Matras tidur, 1 kmd + sarapan (sesuai pax)";

/** Every tent is named after a West Java mountain. Tier prices + breakfast
 *  notes mirror the seed verbatim; Papandayan has no legacy URL (NEW page). */
export const glamping = [
	{
		slug: "salak", name: "Salak",
		tiers: [{ pax: 4, price: 2100000 }, { pax: 6, price: 2600000 }],
		includes: std, firePit: true,
		tagline: T("Tenda favorit keluarga", "The family-favourite tent"),
		description: T(
			"Glamping Salak dinamai dari gunung yang menaunginya — pilihan paling populer untuk keluarga 4–6 orang. Tidur di matras yang hangat, kamar mandi sendiri, dan sarapan pagi sudah termasuk sesuai jumlah tamu. Malamnya, api unggun dan langit Gunung Salak yang jernih menutup hari dengan sempurna.",
			"Glamping Salak is named after the mountain sheltering it — the most popular pick for families of 4–6. Warm mattresses, a private bathroom, and breakfast included per guest count. At night, a bonfire and Mount Salak's clear sky close the day perfectly.",
		),
		heroImage: "", images: [],
	},
	{
		slug: "gede", name: "Gede",
		tiers: [{ pax: 4, price: 2100000 }, { pax: 6, price: 2600000 }],
		includes: std, firePit: true,
		tagline: T("Untuk pendaki pemula", "For first-time campers"),
		description: T(
			"Glamping Gede cocok untuk yang baru pertama camping: sensasi tenda dengan kenyamanan kasur, kamar mandi, dan sarapan. Kapasitas 4–6 orang dengan dua pilihan harga sesuai rombongan. Lokasinya dekat jalur jalan pagi — pemanasan ideal sebelum trekking ke curug.",
			"Glamping Gede suits first-time campers: tent thrill with mattress comfort, bathroom, and breakfast. Sleeps 4–6 with two price options to match your group. Near the morning-walk path — an ideal warm-up before waterfall treks.",
		),
		heroImage: "", images: [],
	},
	{
		slug: "pangrango", name: "Pangrango",
		tiers: [{ pax: 4, price: 2100000 }, { pax: 6, price: 2600000 }],
		includes: std, firePit: true,
		tagline: T("Tenang di sudut resort", "Quiet in the resort's corner"),
		description: T(
			"Glamping Pangrango berada di sudut resort yang lebih tenang untuk 4–6 orang. Suara malam hutan — jangkrik dan angin pinus — terdengar paling jelas dari sini. Fasilitas sama lengkapnya: matras, kamar mandi, sarapan, dan api unggun untuk malam kebersamaan.",
			"Glamping Pangrango sits in the resort's quieter corner for 4–6 guests. Forest night sounds — crickets and pine wind — come through clearest here. Equally complete: mattresses, bathroom, breakfast, and a bonfire for nights together.",
		),
		heroImage: "", images: [],
	},
	{
		slug: "papandayan", name: "Papandayan",
		tiers: [{ pax: 8, price: 3100000 }],
		includes: std, firePit: true,
		tagline: T("Tenda baru untuk 8 orang", "The new tent for 8"),
		description: T(
			"Glamping Papandayan adalah tenda terbaru untuk 8 orang — kabar baik bagi komunitas yang selalu kelebihan peserta. Satu harga sudah termasuk matras, kamar mandi, dan sarapan untuk delapan orang. Halaman baru, halaman depan untuk api unggun bersama.",
			"Glamping Papandayan is the newest tent for 8 guests — good news for communities that always overflow. One price covers mattresses, bathroom, and breakfast for eight. Fresh grounds with a front yard for bonfires together.",
		),
		heroImage: "", images: [],
	},
	{
		slug: "burangrang", name: "Burangrang",
		tiers: [{ pax: 8, price: 3100000 }],
		includes: std, firePit: true,
		tagline: T("Untuk komunitas 8 orang", "For communities of 8"),
		description: T(
			"Glamping Burangrang menampung 8 orang dalam satu tenda besar — pas untuk komunitas, tim kantor, atau dua keluarga. Matras tidur, kamar mandi, dan sarapan untuk delapan orang sudah termasuk satu harga. Api unggun di depannya muat untuk lingkaran cerita semalam suntuk.",
			"Glamping Burangrang sleeps 8 in one big tent — right for communities, office teams, or two families. Mattresses, bathroom, and breakfast for eight are covered in one price. Its front bonfire fits an all-night story circle.",
		),
		heroImage: "", images: [],
	},
	{
		slug: "malabar", name: "Malabar",
		tiers: [{ pax: 8, price: 3100000 }],
		includes: std, firePit: true,
		tagline: T("Lapang untuk gathering", "Roomy for gatherings"),
		description: T(
			"Glamping Malabar lapang untuk 8 orang dengan area depan yang lega untuk aktivitas kelompok. Cocok dipadukan dengan paket outbound — tidur di tenda, beraktivitas di lapangan. Sarapan untuk delapan orang dan api unggun malam termasuk dalam harga.",
			"Glamping Malabar is roomy for 8 with a generous front area for group activities. Pairs well with outbound packages — sleep in tents, play in the fields. Breakfast for eight and a night bonfire are in the price.",
		),
		heroImage: "", images: [],
	},
	{
		slug: "cikuray", name: "Cikuray",
		tiers: [{ pax: 8, price: 3100000 }, { pax: 10, price: 3500000 }],
		includes: std, firePit: true,
		tagline: T("Paling besar hingga 10 orang", "The biggest, up to 10"),
		description: T(
			"Glamping Cikuray adalah tenda terbesar: muat 8–10 orang dengan dua pilihan harga. Satu-satunya tenda dengan opsi 10 pax — penyelamat gathering yang pesertanya selalu bertambah. Matras, kamar mandi, sarapan, dan api unggun lengkap seperti tenda-tenda lainnya.",
			"Glamping Cikuray is the biggest tent: 8–10 guests with two price options. The only tent with a 10-pax option — a lifesaver for gatherings whose headcount keeps growing. Mattresses, bathroom, breakfast, and bonfire, complete like the other tents.",
		),
		heroImage: "", images: [],
	},
	{
		slug: "ciremey", name: "Ciremey",
		tiers: [{ pax: 8, price: 3100000 }],
		includes: std, firePit: true,
		tagline: T("Dinamai atap Jawa Barat", "Named after West Java's roof"),
		description: T(
			"Glamping Ciremey dinamai dari puncak tertinggi Jawa Barat untuk rombongan 8 orang. Tenda yang kokoh dengan matras hangat, kamar mandi sendiri, dan sarapan pagi. Posisinya memberi privasi lebih — cocok untuk gathering yang butuh fokus siang hari dan santai malam hari.",
			"Glamping Ciremey is named after West Java's highest peak, for groups of 8. A sturdy tent with warm mattresses, private bathroom, and breakfast. Its position gives extra privacy — suited to gatherings needing daytime focus and easy nights.",
		),
		heroImage: "", images: [],
	},
];

/** Legacy URL path for a glamping slug. */
export const glampingPath = (slug: string) => `/glamping-type-${slug}/`;

for (const g of glamping) GlampingSchema.parse(g);
export type GlampingRow = (typeof glamping)[number];

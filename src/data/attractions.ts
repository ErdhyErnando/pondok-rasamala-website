import { z } from "astro/zod";

const text = z.object({ id: z.string().min(1), en: z.string().min(1) });

/** Nearby attractions. No distances (owner decision Day 4) — description
 *  + visit tips only. Facts grounded in travel-blog research (see
 *  docs/day-4-copy.md); verify flags where second-hand. */
export const AttractionSchema = z.object({
	slug: z.string(),
	name: text,
	description: text, // 2–3 sentences
	tip: text, // 1–2 visit tips
	heroImage: z.string(),
});

export type Attraction = z.infer<typeof AttractionSchema>;

const T = (id: string, en: string) => ({ id, en });

export const attractions = [
	{
		slug: "kawah-ratu",
		name: T("Kawah Ratu", "Kawah Ratu Crater"),
		description: T(
			"Kawah vulkanik aktif di lereng Gunung Salak dengan aliran sungai belerang biru muda. Trekking sekitar 6 jam pulang-pergi via jalur Curug Seribu menembus hutan dan lumpur — favorit pencinta alam yang staminanya fit.",
			"An active volcanic crater on Mount Salak's slopes with a pale-blue sulphur stream. The trek runs about 6 hours return via the Curug Seribu trail through forest and mud — a favourite for fit nature lovers.",
		),
		tip: T(
			"Mulai pagi hari, bawa masker untuk asap belerang, dan sewa pemandu lokal.",
			"Start early, bring a mask for sulphur fumes, and hire a local guide.",
		),
		heroImage: "",
	},
	{
		slug: "curug-seribu",
		name: T("Curug Seribu", "Curug Seribu Waterfall"),
		description: T(
			"Air terjun tertinggi di Bogor (±100 m) di ketinggian 750–1.050 mdpl, dikelilingi pohon-pohon besar. Dari parkir, perjalanan kaki sekitar 1 jam — sepadan dengan dinding air raksasanya.",
			"Bogor's tallest waterfall (±100 m) at 750–1,050 m altitude, ringed by giant trees. About an hour on foot from parking — worth it for the giant water wall.",
		),
		tip: T(
			"Pakai sepatu anti-slip dan bawa baju ganti — cipratan airnya deras.",
			"Wear grippy shoes and bring a change of clothes — the spray is heavy.",
		),
		heroImage: "",
	},
	{
		slug: "curug-ngumpet",
		name: T("Curug Ngumpet", "Curug Ngumpet Waterfall"),
		description: T(
			"Namanya berarti 'bersembunyi' — curug yang tersembunyi di balik rimbun hutan Gunung Bunder dengan kolam alami yang jernih. Suasananya paling sepi di antara curug-curug sekitar resort.",
			"Its name means 'hidden' — a waterfall tucked behind Gunung Bunder's dense forest with a clear natural pool. The quietest of the falls near the resort.",
		),
		tip: T(
			"Cocok untuk berendam santai; hindari akhir pekan bila mau sepi.",
			"Made for easy dips; avoid weekends if you want it empty.",
		),
		heroImage: "",
	},
	{
		slug: "curug-cigamea",
		name: T("Curug Cigamea", "Curug Cigamea Waterfall"),
		description: T(
			"Curug kembar dengan dua aliran berdampingan — spot foto favorit wisatawan Gunung Bunder. Aksesnya relatif mudah dibanding curug lain di kawasan ini.",
			"Twin falls with two side-by-side streams — Gunung Bunder visitors' favourite photo spot. Relatively easy access compared to other falls here.",
		),
		heroImage: "",
		tip: T(
			"Datang pagi untuk cahaya terbaik dan pengunjung paling sedikit.",
			"Come in the morning for the best light and fewest visitors.",
		),
	},
	{
		slug: "air-panas-ciparay",
		name: T("Air Panas Ciparay", "Ciparay Hot Springs"),
		description: T(
			"Pemandian air panas alami dari perut Gunung Salak — penutup sempurna setelah seharian trekking. Kolam-kolamnya berundak dengan suhu bertingkat dari hangat sampai panas.",
			"Natural hot springs from Mount Salak's belly — the perfect close after a trekking day. Terraced pools run from warm to properly hot.",
		),
		tip: T(
			"Paling nikmat malam hari; bawa handuk dan baju ganti.",
			"Best at night; bring a towel and a change of clothes.",
		),
		heroImage: "",
	},
	{
		slug: "curug-goa-lumut",
		name: T("Curug Goa Lumut", "Goa Lumut Waterfall"),
		description: T(
			"Air terjun yang mengalir di dinding gua berlumut hijau — pemandangan paling magis di kawasan ini. Jalurnya menantang dengan bebatuan licin, cocok untuk petualang.",
			"A waterfall streaming down a green moss-covered cave wall — the area's most magical sight. The trail is challenging with slippery rocks, made for adventurers.",
		),
		tip: T(
			"Bebatuan sangat licin — wajib sepatu gunung dan pendamping.",
			"Rocks are very slippery — hiking shoes and a companion are a must.",
		),
		heroImage: "",
	},
];

for (const a of attractions) AttractionSchema.parse(a);
export type AttractionRow = (typeof attractions)[number];

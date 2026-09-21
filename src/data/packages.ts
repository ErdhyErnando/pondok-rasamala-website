import { z } from "astro/zod";

const text = z.object({ id: z.string().min(1), en: z.string().min(1) });

/** Package price tier. price=null → "price on request" (company/family,
 *  owner decision Day 4). verify=true → web anchor, owner to confirm. */
export const PackageTierSchema = z.object({
	name: text,
	price: z.number().int().nullable(),
	unit: text,
	verify: z.boolean().default(false),
});

/** EXACT future-Emdash `packages` shape (Week-2 migration is mechanical):
 *  slug/name/description/heroImage/includes/price-tiers/duration/activities,
 *  all copy fields {id, en}. Local file is the ship vehicle. */
export const PackageSchema = z.object({
	slug: z.string(),
	name: text,
	tagline: text,
	description: text,
	duration: text,
	includes: z.object({ id: z.array(z.string()), en: z.array(z.string()) }),
	tiers: z.array(PackageTierSchema).min(1),
	activities: z.object({ id: z.array(z.string()), en: z.array(z.string()) }),
	heroImage: z.string(),
	images: z.array(z.string()),
});

export type Package = z.infer<typeof PackageSchema>;

const T = (id: string, en: string) => ({ id, en });

export const packages = [
	{
		slug: "outbound",
		name: T("Outbound", "Outbound"),
		tagline: T("Seharian seru di lapangan hijau", "A thrilling day on green fields"),
		description: T(
			"Paket outbound Pondok Rasamala memadukan team building, paintball, dan fun games di lapangan hijau kaki Gunung Salak. Dipandu fasilitator berpengalaman dengan skema permainan yang disesuaikan untuk kekompakan tim, leadership, dan problem solving. Tersedia opsi menginap 2 hari 1 malam atau satu hari penuh — keduanya sudah termasuk makan dan api unggun.",
			"Pondok Rasamala's outbound package blends team building, paintball, and fun games on green fields at the foot of Mount Salak. Led by experienced facilitators with games tuned for team cohesion, leadership, and problem solving. Choose a 2-day-1-night stay or a full day — both include meals and a bonfire.",
		),
		duration: T("1–2 hari", "1–2 days"),
		includes: {
			id: ["Makan 3× (opsi menginap)", "Coffee break 2×", "Extra bed", "Api unggun", "P3K standar", "Fasilitator & perlengkapan games"],
			en: ["3 meals (stay option)", "2 coffee breaks", "Extra bed", "Bonfire", "Standard first aid", "Facilitators & game equipment"],
		},
		tiers: [
			{ name: T("Menginap 2D1N (min. 40 pax)", "2D1N stay (min. 40 pax)"), price: 575000, unit: T("per orang", "per person"), verify: true },
			{ name: T("Satu hari (one day)", "One day"), price: 325000, unit: T("per orang", "per person"), verify: true },
		],
		activities: {
			id: ["Team building", "Paintball", "Fun games", "Api unggun"],
			en: ["Team building", "Paintball", "Fun games", "Bonfire"],
		},
		heroImage: "",
		images: [],
	},
	{
		slug: "special-school-package",
		name: T("Paket Sekolah", "School Package"),
		tagline: T("Belajar langsung di alam terbuka", "Learn directly in the open air"),
		description: T(
			"Paket sekolah mengubah kawasan Taman Nasional Gunung Halimun Salak jadi ruang kelas: trekking edukasi, games kekompakan, dan malam api unggun yang aman untuk anak. Kegiatan didampingi fasilitator dan dikoordinasikan dengan guru pendamping. Opsi menginap atau satu hari — harga mengikuti acuan paket outbound sampai konfirmasi pemilik.",
			"The school package turns Gunung Halimun Salak National Park into a classroom: educational treks, teamwork games, and a safe bonfire night for kids. Activities are facilitated and coordinated with accompanying teachers. Stay or one-day options — priced from outbound anchors pending owner confirmation.",
		),
		duration: T("1–2 hari", "1–2 days"),
		includes: {
			id: ["Makan 3× (opsi menginap)", "Coffee break", "Games edukasi & outbound anak", "Api unggun", "P3K standar"],
			en: ["3 meals (stay option)", "Coffee break", "Educational games & kids outbound", "Bonfire", "Standard first aid"],
		},
		tiers: [
			{ name: T("Menginap 2D1N (min. 40 pax)", "2D1N stay (min. 40 pax)"), price: 575000, unit: T("per orang", "per person"), verify: true },
			{ name: T("Satu hari (one day)", "One day"), price: 325000, unit: T("per orang", "per person"), verify: true },
		],
		activities: {
			id: ["Trekking edukasi", "Fun games", "Api unggun"],
			en: ["Educational treks", "Fun games", "Bonfire"],
		},
		heroImage: "",
		images: [],
	},
	{
		slug: "company-outing",
		name: T("Company Outing", "Company Outing"),
		tagline: T("Gathering kantor tanpa ribet", "Hassle-free company gatherings"),
		description: T(
			"Paket company outing untuk gathering kantor segala ukuran: aula dengan soundsystem untuk sesi formal, lapangan untuk team building dan paintball, dan villa-villa berkapasitas besar untuk menginap satu rombongan. Harga disusun per kebutuhan acara — ceritakan jumlah peserta dan agenda, tim kami buatkan penawaran.",
			"The company outing package serves office gatherings of any size: a hall with sound system for formal sessions, fields for team building and paintball, and large-capacity villas for the whole group. Priced per event — tell us your headcount and agenda and we'll quote.",
		),
		duration: T("1–2 hari", "1–2 days"),
		includes: {
			id: ["Aula + soundsystem", "Team building & paintball", "Villa rombongan", "Api unggun", "Koordinator acara"],
			en: ["Hall + sound system", "Team building & paintball", "Group villas", "Bonfire", "Event coordinator"],
		},
		tiers: [
			{ name: T("Penawaran khusus rombongan", "Custom group quote"), price: null, unit: T("per acara", "per event"), verify: false },
		],
		activities: {
			id: ["Team building", "Paintball", "Makan bersama", "Api unggun"],
			en: ["Team building", "Paintball", "Shared meals", "Bonfire"],
		},
		heroImage: "",
		images: [],
	},
	{
		slug: "family",
		name: T("Paket Keluarga", "Family Package"),
		tagline: T("Liburan keluarga besar satu atap", "Big-family holidays under one roof"),
		description: T(
			"Paket keluarga untuk liburan keluarga besar dan reuni: villa-villa berdekatan, trekking santai ke curug, kolam renang anak, dan api unggun malam. Tanpa jadwal kaku —tentukan sendiri ritme liburan, dari bangun siang sampai bakar jagung. Harga disesuaikan jumlah keluarga — hubungi via WhatsApp untuk penawaran.",
			"The family package is for big-family holidays and reunions: neighbouring villas, easy waterfall treks, a kids' pool, and night bonfires. No rigid schedule — set your own rhythm, from sleep-ins to bonfire snacks. Priced per family count — message us on WhatsApp for a quote.",
		),
		duration: T("2 hari 1 malam", "2 days 1 night"),
		includes: {
			id: ["Villa berdekatan", "Trekking santai", "Kolam renang", "Api unggun"],
			en: ["Neighbouring villas", "Easy treks", "Swimming pool", "Bonfire"],
		},
		tiers: [
			{ name: T("Penawaran khusus keluarga", "Custom family quote"), price: null, unit: T("per keluarga", "per family"), verify: false },
		],
		activities: {
			id: ["Trekking santai", "Berenang", "Api unggun"],
			en: ["Easy treks", "Swimming", "Bonfire"],
		},
		heroImage: "",
		images: [],
	},
];

export const packagePath = (slug: string) => `/package/${slug}/`;

for (const p of packages) PackageSchema.parse(p);
export type PackageRow = (typeof packages)[number];

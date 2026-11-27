import { z } from "astro/zod";
import { photo, photoSchema } from "../lib/photos";

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
 *  slug/name/description/hero/includes/price-tiers/duration/activities,
 *  all copy fields {id, en}. Local file is the ship vehicle. `hero` and
 *  `gallery` are site photos (src/lib/photos.ts), imported from the manifest. */
export const PackageSchema = z.object({
	slug: z.string(),
	name: text,
	tagline: text,
	description: text,
	duration: text,
	includes: z.object({ id: z.array(z.string()), en: z.array(z.string()) }),
	tiers: z.array(PackageTierSchema).min(1),
	activities: z.object({ id: z.array(z.string()), en: z.array(z.string()) }),
	hero: photoSchema,
	/** Photos after the hero. */
	gallery: z.array(photoSchema),
});

export type Package = z.infer<typeof PackageSchema>;

const T = (id: string, en: string) => ({ id, en });

export const packages = [
	{
		slug: "outbound",
		name: T("Outbound", "Outbound"),
		tagline: T("Seharian seru di lapangan hijau", "A thrilling day on green fields"),
		description: T(
			"Paket outbound Pondok Rasamala memadukan team building, paintball, dan fun games di lapangan hijau kaki Gunung Salak. Dipandu fasilitator berpengalaman dengan skema permainan yang disesuaikan untuk kekompakan tim, leadership, dan problem solving. Tersedia opsi menginap 2 hari 1 malam atau satu hari penuh, keduanya sudah termasuk makan dan api unggun.",
			"Pondok Rasamala's outbound package blends team building, paintball, and fun games on green fields at the foot of Mount Salak. Led by experienced facilitators with games tuned for team cohesion, leadership, and problem solving. Choose a 2-day-1-night stay or a full day, both include meals and a bonfire.",
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
		hero: photo("package/outbound/01-peserta-lingkaran-lapangan", {
			id: "Peserta outbound berkaus gelap dan bertopi biru berdiri melingkar di lapangan rumput, dikelilingi pakis dan pepohonan.",
			en: "Outbound participants in dark shirts and blue caps standing in a circle on the grass field, ringed by ferns and trees.",
		}),
		gallery: [
				photo("package/outbound/02-tali-games", {
					id: "Seorang peserta tergantung pada tali pengaman sambil disaksikan rekan satu tim, di hutan pinus.",
					en: "A participant hangs from a safety rope as teammates look on, in a pine forest.",
				}),
				photo("package/outbound/03-tim-bola", {
					id: "Tim berkaus hitam dan bertopi biru berdiri mengelilingi bola di atas tiang dalam permainan kerja sama di hutan pinus.",
					en: "A team in black shirts and blue caps gathers around a ball on a pole in a pine-forest teamwork game.",
				}),
				photo("package/outbound/04-briefing-hutan-pinus", {
					id: "Sekelompok peserta berkumpul untuk arahan di tanah lapang yang basah di tengah hutan pinus.",
					en: "A group of participants gathers for a briefing on a wet clearing in the pine forest.",
				}),
				photo("package/outbound/05-jembatan-tali", {
					id: "Dua peserta berjabat tangan sambil meniti tali rintangan di hutan pinus.",
					en: "Two participants clasp hands while crossing a rope obstacle in the pine forest.",
				}),
				photo("package/outbound/06-holi-warna", {
					id: "Peserta berbaju putih bersorak di antara semburan bubuk warna-warni di bawah pohon pinus, dengan spanduk di tangan.",
					en: "Participants in white cheer amid bursts of coloured powder beneath pine trees, holding a banner.",
				}),
				photo("package/outbound/07-games-lingkaran", {
					id: "Peserta berkaus merah muda dan biru berdiri melingkar di lapangan tanah untuk permainan kelompok.",
					en: "Participants in pink and blue shirts stand in a circle on the dirt field for a group game.",
				}),
				photo("package/outbound/08-tim-biru", {
					id: "Kelompok peserta berseragam gelap dan berponco biru berkumpul di antara batang pinus berlumut.",
					en: "A group in dark outfits and blue ponchos gathers between moss-covered pine trunks.",
				}),
				photo("package/outbound/09-susur-sungai-curug", {
					id: "Peserta berkaus oranye membentuk barisan melengkung di kolam sungai di bawah air terjun.",
					en: "Participants in orange shirts form curving lines in the stream pool below a waterfall.",
				}),
		],
	},
	{
		slug: "special-school-package",
		name: T("Paket Sekolah", "School Package"),
		tagline: T("Belajar langsung di alam terbuka", "Learn directly in the open air"),
		description: T(
			"Paket sekolah mengubah kawasan Taman Nasional Gunung Halimun Salak jadi ruang kelas: trekking edukasi, games kekompakan, dan malam api unggun yang aman untuk anak. Kegiatan didampingi fasilitator dan dikoordinasikan dengan guru pendamping. Opsi menginap atau satu hari, harga mengikuti acuan paket outbound sampai konfirmasi pemilik.",
			"The school package turns Gunung Halimun Salak National Park into a classroom: educational treks, teamwork games, and a safe bonfire night for kids. Activities are facilitated and coordinated with accompanying teachers. Stay or one-day options, priced from outbound anchors pending owner confirmation.",
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
		hero: photo("package/special-school-package/01-foto-bersama-peserta", {
			id: "Foto bersama peserta yang mengangkat tangan di hutan pinus, dengan dua spanduk kegiatan di belakang mereka.",
			en: "Group photo of participants with raised arms in a pine forest, with two event banners behind them.",
		}),
		gallery: [
				photo("package/special-school-package/02-games-lingkaran", {
					id: "Peserta berkaus merah muda dan biru berdiri melingkar di lapangan untuk permainan kekompakan.",
					en: "Participants in pink and blue shirts stand in a circle on the field for a teamwork game.",
				}),
				photo("package/special-school-package/03-susur-sungai-curug", {
					id: "Peserta berkaus oranye membentuk barisan melengkung di kolam sungai di bawah air terjun.",
					en: "Participants in orange shirts form curving lines in the stream pool below a waterfall.",
				}),
				photo("package/special-school-package/04-api-unggun-malam", {
					id: "Api unggun menyala oranye terang di tengah malam yang gelap.",
					en: "A bonfire burning bright orange in the dark of night.",
				}),
		],
	},
	{
		slug: "company-outing",
		name: T("Company Outing", "Company Outing"),
		tagline: T("Gathering kantor tanpa ribet", "Hassle-free company gatherings"),
		description: T(
			"Paket company outing untuk gathering kantor segala ukuran: aula dengan soundsystem untuk sesi formal, lapangan untuk team building dan paintball, dan villa-villa berkapasitas besar untuk menginap satu rombongan. Harga disusun per kebutuhan acara, ceritakan jumlah peserta dan agenda, tim kami buatkan penawaran.",
			"The company outing package serves office gatherings of any size: a hall with sound system for formal sessions, fields for team building and paintball, and large-capacity villas for the whole group. Priced per event, tell us your headcount and agenda and we'll quote.",
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
		hero: photo("package/company-outing/01-aula-meja-panjang", {
			id: "Aula kayu lapang dengan meja dan bangku kayu panjang di bawah rangka atap tinggi dan lampu gantung.",
			en: "Spacious timber hall with a long wooden table and benches under a high roof frame and hanging lamps.",
		}),
		gallery: [
				photo("package/company-outing/02-sesi-pertemuan", {
					id: "Peserta rapat duduk mengelilingi meja putih berbentuk U di aula beratap tenda, dengan kebun hijau di baliknya.",
					en: "Attendees at a meeting around a U-shaped white table in the tent-roofed hall, with a green garden beyond.",
				}),
				photo("package/company-outing/03-tim-bola", {
					id: "Tim berkaus hitam dan bertopi biru berdiri mengelilingi bola di atas tiang dalam permainan kerja sama di hutan pinus.",
					en: "A team in black shirts and blue caps gathers around a ball on a pole in a pine-forest teamwork game.",
				}),
				photo("package/company-outing/04-tali-games", {
					id: "Seorang peserta tergantung pada tali pengaman sambil disaksikan rekan satu tim, di hutan pinus.",
					en: "A participant hangs from a safety rope as teammates look on, in a pine forest.",
				}),
				photo("package/company-outing/05-sate-bakar-sosis", {
					id: "Sosis tusuk dan jagung manis dipanggang di atas panggangan.",
					en: "Skewered sausages and sweet corn grilling over a barbecue.",
				}),
				photo("package/company-outing/06-sate-bakar-daging", {
					id: "Sate daging berbumbu kecokelatan dipanggang berjajar di atas panggangan.",
					en: "Rows of seasoned, browned meat skewers grilling on a barbecue.",
				}),
				photo("package/company-outing/07-api-unggun-malam", {
					id: "Peserta berdiri setengah lingkaran menyaksikan api unggun menyala di tanah lapang pada malam hari.",
					en: "Participants stand in an arc watching a bonfire burn on an open field at night.",
				}),
		],
	},
	{
		slug: "family",
		name: T("Paket Keluarga", "Family Package"),
		tagline: T("Liburan keluarga besar satu atap", "Big-family holidays under one roof"),
		description: T(
			"Paket keluarga untuk liburan keluarga besar dan reuni: villa-villa berdekatan, trekking santai ke curug, kolam renang anak, dan api unggun malam. Tanpa jadwal kaku, tentukan sendiri ritme liburan, dari bangun siang sampai bakar jagung. Harga disesuaikan jumlah keluarga, hubungi via WhatsApp untuk penawaran.",
			"The family package is for big-family holidays and reunions: neighbouring villas, easy waterfall treks, a kids' pool, and night bonfires. No rigid schedule, set your own rhythm, from sleep-ins to bonfire snacks. Priced per family count, message us on WhatsApp for a quote.",
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
		hero: photo("package/family/01-kolam-renang-gedung", {
			id: "Kolam renang berair toska dengan bangunan kayu beratap sirap dan pakis pohon di tepinya.",
			en: "Turquoise swimming pool with a shingle-roofed timber building and tree ferns along its edge.",
		}),
		gallery: [
				photo("package/family/02-kolam-renang", {
					id: "Kolam renang biru berlantai paving batu dengan pepohonan tinggi di bawah langit cerah, dua orang berdiri di kejauhan.",
					en: "Blue swimming pool with a stone-paved deck and tall trees under a clear sky, two people standing in the distance.",
				}),
				photo("package/family/03-kolam-renang-taman", {
					id: "Tepi kolam renang toska dengan pot tanaman besar, di depan taman bambu dan pakis yang rimbun.",
					en: "Turquoise pool edge with large potted plants in front of a lush backdrop of bamboo and ferns.",
				}),
				photo("package/family/04-aliran-sungai-kecil", {
					id: "Aliran kecil berundak di antara bebatuan dan tanaman tropis, dengan bangunan kayu bertiang bata di sisi kanan.",
					en: "A small stepped stream among rocks and tropical plants, with a timber building on brick pillars at the right.",
				}),
				photo("package/family/05-taman-batu-pijakan", {
					id: "Hamparan rumput hijau dengan batu pijakan menuju rumah kayu panggung berpagar di antara tanaman tropis.",
					en: "Green lawn with stepping stones leading to a railed timber stilt house among tropical plants.",
				}),
				photo("package/family/06-villa-dan-palem", {
					id: "Villa kayu beratap genteng gelap di antara pakis sarang burung dan palem, dengan halaman paving di depannya.",
					en: "Timber villa with a dark tiled roof among bird's-nest ferns and palms, with a paved yard in front.",
				}),
				photo("package/family/07-api-unggun-malam", {
					id: "Api unggun menyala oranye terang di tengah malam yang gelap.",
					en: "A bonfire burning bright orange in the dark of night.",
				}),
		],
	},
];

export const packagePath = (slug: string) => `/package/${slug}/`;

for (const p of packages) PackageSchema.parse(p);
export type PackageRow = (typeof packages)[number];

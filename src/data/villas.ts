import { z } from "astro/zod";

const text = z.object({ id: z.string(), en: z.string() });

/** One villa / cottage / hall row. Price + capacity + spec mirror
 *  rasamala-app seed verbatim (single IDR/night, no weekday split).
 *  Seed spellings corrected per owner lock: Khiyang→Kihyang (URL kihyang),
 *  Illegole kept (URL ilegole). Aula is owner-supplied (not in seed). */
export const VillaSchema = z.object({
	slug: z.string(), // e.g. "kiriung" (URL path derived, not stored)
	name: z.string(), // canonical display name (owner-locked)
	type: z.enum(["villa", "leuit", "damar", "aula", "campsite"]),
	price: z.number().int(), // IDR per night
	paxNormal: z.number().int(),
	paxMax: z.number().int(),
	spec: z.string(), // seed spec string (Indonesian source)
	tagline: text,
	description: text, // 3–4 sentences, benefits-led
	amenities: z.object({ id: z.array(z.string()), en: z.array(z.string()) }),
	heroImage: z.string(), // R2 URL, filled Day 6
	images: z.array(z.string()),
	priceNote: z.string().default("Harga konfirmasi via WhatsApp"),
});

export type Villa = z.infer<typeof VillaSchema>;

const T = (id: string, en = "") => ({ id, en });

export const villas = [
	{
		slug: "kiriung", name: "Kiriung", type: "villa", price: 4750000, paxNormal: 8, paxMax: 16,
		spec: "4 kmr tidur, Ruang kel, 4 kmd, dapur, teras, Saung",
		tagline: T("Saung dan teras untuk rombongan besar", "Pavilion and terrace for large groups"),
		description: T(
			"Villa Kiriung adalah pilihan utama untuk rombongan besar: 4 kamar tidur, ruang keluarga, 4 kamar mandi, dapur, teras, dan saung untuk kumpul malam hari. Kapasitas normal 8 orang, muat sampai 16 orang untuk gathering keluarga atau komunitas. Bangun pagi di udara Gunung Salak, sarapan di teras, dan siangnya trekking ke curug-curug terdekat.",
			"Villa Kiriung is the top pick for large groups: 4 bedrooms, a living room, 4 bathrooms, kitchen, terrace, and a pavilion for evening gatherings. Sleeps 8 comfortably, up to 16 for family or community gatherings. Wake up in Mount Salak's mountain air, breakfast on the terrace, and trek nearby waterfalls by day.",
		),
		amenities: { id: ["4 kamar tidur", "4 kamar mandi", "Ruang keluarga", "Dapur", "Teras", "Saung"], en: ["4 bedrooms", "4 bathrooms", "Living room", "Kitchen", "Terrace", "Pavilion"] }, heroImage: "", images: [],
	},
	{
		slug: "bambu", name: "Bambu", type: "villa", price: 1250000, paxNormal: 4, paxMax: 6,
		spec: "2 kmr tidur, teras, 2 kmd (hanya kamar)",
		tagline: T("Ikon bambu untuk keluarga kecil", "The bamboo icon for small families"),
		description: T(
			"Villa Bambu adalah wajah Pondok Rasamala: bangunan bambu dan kayu di tengah taman yang rindang. Dua kamar tidur, teras, dan 2 kamar mandi untuk 4–6 orang — ideal untuk keluarga kecil yang baru pertama ke Gunung Salak Endah. Harganya paling bersahabat di antara villa-villa di sini, dengan suasana pedesaan yang paling kental.",
			"Villa Bambu is the face of Pondok Rasamala: bamboo and timber construction amid shady gardens. Two bedrooms, a terrace, and 2 bathrooms for 4–6 guests — ideal for small families visiting Gunung Salak Endah for the first time. The friendliest villa rate here, with the strongest countryside character.",
		),
		amenities: { id: ["2 kamar tidur", "2 kamar mandi", "Teras"], en: ["2 bedrooms", "2 bathrooms", "Terrace"] }, heroImage: "", images: [],
	},
	{
		slug: "cendana", name: "Cendana", type: "villa", price: 6750000, paxNormal: 14, paxMax: 28,
		spec: "7 kmr tidur, 3 kmd, dapur & 2 R kel",
		tagline: T("Villa terbesar untuk gathering akbar", "The biggest villa for grand gatherings"),
		description: T(
			"Villa Cendana adalah unit terbesar di Pondok Rasamala: 7 kamar tidur, 3 kamar mandi, dapur, dan 2 ruang keluarga untuk 14–28 orang. Dirancang untuk gathering perusahaan, reuni akbar, dan acara sekolah yang butuh satu atap untuk semua peserta. Satu villa menampung panitia, peserta, dan ruang kumpul tanpa harus berpencar.",
			"Villa Cendana is the largest unit at Pondok Rasamala: 7 bedrooms, 3 bathrooms, a kitchen, and 2 living rooms for 14–28 guests. Built for company outings, grand reunions, and school events that need everyone under one roof. One villa holds the committee, the participants, and the gathering space — nobody split up.",
		),
		amenities: { id: ["7 kamar tidur", "3 kamar mandi", "Dapur", "2 ruang keluarga"], en: ["7 bedrooms", "3 bathrooms", "Kitchen", "2 living rooms"] }, heroImage: "", images: [],
	},
	{
		slug: "dayak", name: "Dayak", type: "villa", price: 2350000, paxNormal: 4, paxMax: 6,
		spec: "2 kmr tidur, R tamu, 1 kmd, dapur",
		tagline: T("Hangat untuk keluarga dan sahabat", "Cosy for family and friends"),
		description: T(
			"Villa Dayak memadukan 2 kamar tidur, ruang tamu, dapur, dan kamar mandi dalam satu bangunan kayu yang hangat. Kapasitas 4–6 orang membuatnya pas untuk dua keluarga kecil atau rombongan sahabat. Ruang tamunya jadi tempat ngobrol sampai malam tanpa mengganggu yang sudah tidur.",
			"Villa Dayak combines 2 bedrooms, a guest room, kitchen, and bathroom in one warm timber building. Sleeping 4–6, it suits two small families or a group of friends. The guest room becomes the late-night chat spot without disturbing early sleepers.",
		),
		amenities: { id: ["2 kamar tidur", "Ruang tamu", "1 kamar mandi", "Dapur"], en: ["2 bedrooms", "Guest room", "1 bathroom", "Kitchen"] }, heroImage: "", images: [],
	},
	{
		slug: "kihyang", name: "Kihyang", type: "villa", price: 4750000, paxNormal: 10, paxMax: 20,
		spec: "5 kmr tidur, 2 R kel, 2 kmd, dapur",
		tagline: T("Lima kamar untuk komunitas", "Five bedrooms for communities"),
		description: T(
			"Villa Kihyang menampung 10–20 orang dalam 5 kamar tidur, 2 ruang keluarga, 2 kamar mandi, dan dapur. Dua ruang keluarga berarti remaja dan orang tua bisa punya ruang sendiri dalam satu villa. Favorit komunitas dan gathering kantor yang butuh kapasitas besar dengan harga menengah.",
			"Villa Kihyang sleeps 10–20 across 5 bedrooms, 2 living rooms, 2 bathrooms, and a kitchen. Two living rooms mean teenagers and parents each get their own space under one roof. A favourite for communities and company gatherings needing big capacity at a middle rate.",
		),
		amenities: { id: ["5 kamar tidur", "2 ruang keluarga", "2 kamar mandi", "Dapur"], en: ["5 bedrooms", "2 living rooms", "2 bathrooms", "Kitchen"] }, heroImage: "", images: [],
	},
	{
		slug: "ilegole", name: "Ilegole", type: "villa", price: 2550000, paxNormal: 4, paxMax: 8,
		spec: "2 kmr tidur, 1 R kel, 1 kmd, dapur",
		tagline: T("Ringkas untuk keluarga besar", "Compact for extended families"),
		description: T(
			"Villa Ilegole ringkas tapi lapang: 2 kamar tidur, 1 ruang keluarga, dapur, dan kamar mandi untuk 4–8 orang. Cocok untuk keluarga besar tiga generasi yang mau tetap berdekatan. Halamannya dekat dengan taman bunga dan jalur jalan pagi resort.",
			"Villa Ilegole is compact yet roomy: 2 bedrooms, a living room, kitchen, and bathroom for 4–8 guests. Made for three-generation families who want to stay close. Its yard sits near the flower garden and the resort's morning-walk path.",
		),
		amenities: { id: ["2 kamar tidur", "1 ruang keluarga", "1 kamar mandi", "Dapur"], en: ["2 bedrooms", "1 living room", "1 bathroom", "Kitchen"] }, heroImage: "", images: [],
	},
	{
		slug: "kisampang", name: "Kisampang", type: "villa", price: 3850000, paxNormal: 6, paxMax: 12,
		spec: "3 kmr tidur, 3 kmd, dapur & R kel",
		tagline: T("Tiga kamar, tiga kamar mandi", "Three bedrooms, three bathrooms"),
		description: T(
			"Villa Kisampang memberi tiap kamar kenyamanan sendiri: 3 kamar tidur dengan 3 kamar mandi, plus dapur dan ruang keluarga. Kapasitas 6–12 orang, pas untuk tiga keluarga yang liburan bareng tanpa antre kamar mandi pagi hari. Letaknya tenang di antara pepohonan resort.",
			"Villa Kisampang gives every bedroom its own comfort: 3 bedrooms with 3 bathrooms, plus kitchen and living room. Sleeping 6–12, it suits three families holidaying together with no morning bathroom queues. Set quietly among the resort's trees.",
		),
		amenities: { id: ["3 kamar tidur", "3 kamar mandi", "Dapur", "Ruang keluarga"], en: ["3 bedrooms", "3 bathrooms", "Kitchen", "Living room"] }, heroImage: "", images: [],
	},
	{
		slug: "pinus", name: "Pinus", type: "villa", price: 3850000, paxNormal: 6, paxMax: 12,
		spec: "3 kmr tidur, 2 kmd, dapur & R kel",
		tagline: T("Bertingkat di antara pinus", "Split-level among the pines"),
		description: T(
			"Villa Pinus berdiri bertingkat dengan 3 kamar tidur, 2 kamar mandi, dapur, dan ruang keluarga untuk 6–12 orang. Anak-anak biasanya langsung jatuh cinta pada sudut-sudutnya yang bertingkat, sementara orang tua menikmati sejuknya udara sore. Salah satu villa yang paling sering direkomendasikan tamu yang kembali.",
			"Villa Pinus is a split-level building with 3 bedrooms, 2 bathrooms, kitchen, and living room for 6–12 guests. Kids usually fall for its nooks and levels right away, while parents enjoy the cool afternoon air. One of the villas returning guests recommend most.",
		),
		amenities: { id: ["3 kamar tidur", "2 kamar mandi", "Dapur", "Ruang keluarga"], en: ["3 bedrooms", "2 bathrooms", "Kitchen", "Living room"] }, heroImage: "", images: [],
	},
	{
		slug: "puspa", name: "Puspa", type: "villa", price: 1250000, paxNormal: 4, paxMax: 8,
		spec: "2 kmr tidur, teras, 2 kmd (hanya kamar)",
		tagline: T("Mungil untuk kabur berdua", "Small for a couple's escape"),
		description: T(
			"Villa Puspa mungil dan tenang: 2 kamar tidur, teras, dan 2 kamar mandi untuk 4–8 orang. Paling cocok untuk pasangan atau keluarga kecil yang mau kabur dari bising kota tanpa anggaran besar. Sore hari di teras Puspa — ditemani suara serangga dan udara gunung — adalah definisi liburan pelan.",
			"Villa Puspa is small and quiet: 2 bedrooms, a terrace, and 2 bathrooms for 4–8 guests. Best for couples or small families escaping city noise on a modest budget. An afternoon on Puspa's terrace — insects humming, mountain air cool — is the definition of a slow holiday.",
		),
		amenities: { id: ["2 kamar tidur", "2 kamar mandi", "Teras"], en: ["2 bedrooms", "2 bathrooms", "Terrace"] }, heroImage: "", images: [],
	},
	{
		slug: "batarua", name: "Batarua", type: "villa", price: 3850000, paxNormal: 6, paxMax: 10,
		spec: "3 kmr tidur, 2 kmd, dapur & R kel",
		tagline: T("Seimbang untuk dua keluarga", "Balanced for two families"),
		description: T(
			"Villa Batarua seimbang untuk 6–10 orang: 3 kamar tidur, 2 kamar mandi, dapur, dan ruang keluarga. Dua keluarga bisa berbagi dapur dan ruang kumpul tanpa sempit. Lokasinya strategis — dekat ke area parkir sekaligus jalur menuju taman resort.",
			"Villa Batarua balances 6–10 guests: 3 bedrooms, 2 bathrooms, kitchen, and living room. Two families can share the kitchen and gathering space without crowding. Handily located — near parking and the path to the resort gardens.",
		),
		amenities: { id: ["3 kamar tidur", "2 kamar mandi", "Dapur", "Ruang keluarga"], en: ["3 bedrooms", "2 bathrooms", "Kitchen", "Living room"] }, heroImage: "", images: [],
	},
	{
		slug: "gaharu", name: "Gaharu", type: "villa", price: 3500000, paxNormal: 6, paxMax: 7,
		spec: "2 kmr tidur, 2 ext bed, 1 kmd, dapur & R Kel",
		tagline: T("Extra bed untuk tim kecil", "Extra beds for small teams"),
		description: T(
			"Villa Gaharu dirancang fleksibel: 2 kamar tidur plus 2 extra bed, dapur, ruang keluarga, dan kamar mandi untuk 6–7 orang. Extra bed-nya menyelamatkan tim kecil atau keluarga yang jumlahnya tanggung. Ruang keluarganya luas — cukup untuk briefing pagi sebelum outbound.",
			"Villa Gaharu is flexibly arranged: 2 bedrooms plus 2 extra beds, kitchen, living room, and bathroom for 6–7 guests. The extra beds save small teams or odd-numbered families. Its living room is generous — big enough for a morning briefing before outbound.",
		),
		amenities: { id: ["2 kamar tidur", "2 extra bed", "1 kamar mandi", "Dapur", "Ruang keluarga"], en: ["2 bedrooms", "2 extra beds", "1 bathroom", "Kitchen", "Living room"] }, heroImage: "", images: [],
	},
	{
		slug: "mindi", name: "Mindi", type: "villa", price: 4100000, paxNormal: 8, paxMax: 12,
		spec: "4 kmr tidur, 3 kmd, Dapur & R Kel",
		tagline: T("Empat kamar serba cukup", "Four bedrooms, everything covered"),
		description: T(
			"Villa Mindi serba cukup untuk 8–12 orang: 4 kamar tidur, 3 kamar mandi, dapur, dan ruang keluarga. Komposisi yang adil untuk gathering — tidak ada yang kebagian kamar kurang nyaman. Malam hari, ruang keluarganya muat untuk makan bersama satu rombongan.",
			"Villa Mindi covers everything for 8–12 guests: 4 bedrooms, 3 bathrooms, kitchen, and living room. A fair layout for gatherings — nobody draws the short straw on rooms. At night, the living room fits the whole group for dinner together.",
		),
		amenities: { id: ["4 kamar tidur", "3 kamar mandi", "Dapur", "Ruang keluarga"], en: ["4 bedrooms", "3 bathrooms", "Kitchen", "Living room"] }, heroImage: "", images: [],
	},
	{
		slug: "kilanang", name: "Kilanang", type: "villa", price: 6750000, paxNormal: 10, paxMax: 12,
		spec: "5 kmr tidur, 6 kmd, Dapur & R kel & R Makan",
		tagline: T("Premium dengan ruang makan", "Premium with a dining room"),
		description: T(
			"Villa Kilanang adalah kasta premium Pondok Rasamala: 5 kamar tidur, 6 kamar mandi, dapur, ruang keluarga, dan ruang makan khusus untuk 10–12 orang. Setiap kamar praktis punya kamar mandi sendiri — kenyamanan setara hotel di tengah hutan. Dipilih untuk gathering direksi, keluarga besar, dan tamu yang mau yang terbaik.",
			"Villa Kilanang is Pondok Rasamala's premium tier: 5 bedrooms, 6 bathrooms, kitchen, living room, and a dedicated dining room for 10–12 guests. Nearly every bedroom has its own bathroom — hotel comfort deep in the forest. Chosen for board gatherings, big families, and guests who want the best.",
		),
		amenities: { id: ["5 kamar tidur", "6 kamar mandi", "Dapur", "Ruang keluarga", "Ruang makan"], en: ["5 bedrooms", "6 bathrooms", "Kitchen", "Living room", "Dining room"] }, heroImage: "", images: [],
	},
	{
		slug: "kimerak", name: "Kimerak", type: "villa", price: 3950000, paxNormal: 6, paxMax: 7,
		spec: "3 kmr tidur, 2 kmd, R kel, Teras, dapur",
		tagline: T("Teras luas menghadap hijau", "Wide terrace facing the green"),
		description: T(
			"Villa Kimerak punya 3 kamar tidur, 2 kamar mandi, ruang keluarga, dapur, dan teras luas untuk 6–7 orang. Terasnya menghadap ke hijaunya resort — tempat terbaik untuk kopi pagi sebelum aktivitas. Ukurannya pas untuk gathering kecil yang ingin suasana villa besar.",
			"Villa Kimerak offers 3 bedrooms, 2 bathrooms, a living room, kitchen, and a wide terrace for 6–7 guests. The terrace faces the resort's greenery — the best seat for morning coffee before activities. Sized right for small gatherings wanting a big-villa feel.",
		),
		amenities: { id: ["3 kamar tidur", "2 kamar mandi", "Ruang keluarga", "Teras", "Dapur"], en: ["3 bedrooms", "2 bathrooms", "Living room", "Terrace", "Kitchen"] }, heroImage: "", images: [],
	},
	{
		slug: "leuit", name: "Leuit", type: "leuit", price: 2350000, paxNormal: 4, paxMax: 5,
		spec: "2 kmr tidur, 1 kmd, dapur & R Kel",
		tagline: T("Menginap di lumbung padi", "Sleep in a rice barn"),
		description: T(
			"Leuit adalah rumah lumbung padi Sunda yang dialihfungsikan jadi cottage: 2 kamar tidur, dapur, ruang keluarga, dan kamar mandi untuk 4–5 orang. Pengalaman menginap paling unik di resort — tidur di bangunan warisan budaya yang masih kokoh berdiri. Cocok untuk pasangan dan keluarga kecil yang cari cerita, bukan sekadar kamar.",
			"The Leuit is a Sundanese rice barn converted into a cottage: 2 bedrooms, kitchen, living room, and bathroom for 4–5 guests. The resort's most unusual stay — sleeping in a heritage building still standing strong. Made for couples and small families collecting stories, not just rooms.",
		),
		amenities: { id: ["2 kamar tidur", "1 kamar mandi", "Dapur", "Ruang keluarga"], en: ["2 bedrooms", "1 bathroom", "Kitchen", "Living room"] }, heroImage: "", images: [],
	},
	{
		slug: "damar", name: "Damar", type: "damar", price: 3500000, paxNormal: 6, paxMax: 7,
		spec: "2 kmr tidur 3 bed, 1 kmd, Dapur & R Kel",
		tagline: T("Triple bed untuk tim", "Triple beds for teams"),
		description: T(
			"Villa Damar efisien untuk 6–7 orang: 2 kamar tidur berisi 3 tempat tidur, dapur, ruang keluarga, dan kamar mandi. Konfigurasi triple bed-nya ideal untuk tim outbound atau komunitas yang mengutamakan kebersamaan. Semua kebutuhan masak dan kumpul tersedia dalam satu bangunan.",
			"Villa Damar efficiently sleeps 6–7: 2 bedrooms holding 3 beds, kitchen, living room, and bathroom. Its triple-bed setup suits outbound teams or communities prioritising togetherness. Everything for cooking and gathering fits in one building.",
		),
		amenities: { id: ["2 kamar tidur (3 bed)", "1 kamar mandi", "Dapur", "Ruang keluarga"], en: ["2 bedrooms (3 beds)", "1 bathroom", "Kitchen", "Living room"] }, heroImage: "", images: [],
	},
	{
		slug: "aula", name: "Aula", type: "aula", price: 2000000, paxNormal: 40, paxMax: 200,
		spec: "Ruang pertemuan + soundsystem (kapasitas owner confirm)",
		tagline: T("Ruang kumpul ber-AC suara", "Gathering hall with sound"),
		description: T(
			"Aula adalah ruang pertemuan Pondok Rasamala dengan soundsystem untuk acara gathering, seminar, dan resepsi. Kapasitasnya fleksibel untuk rombongan — cocok dipadukan dengan paket menginap villa dan outbound. Harga dan kapasitas pasti dikonfirmasi via WhatsApp sesuai kebutuhan acara.",
			"The Aula is Pondok Rasamala's meeting hall with a sound system for gatherings, seminars, and receptions. Flexible capacity for groups — pairs well with villa stays and outbound packages. Exact pricing and capacity confirmed via WhatsApp to suit your event.",
		),
		amenities: { id: ["Soundsystem", "Ruang pertemuan"], en: ["Sound system", "Meeting hall"] }, heroImage: "", images: [],
		priceNote: "Harga & kapasitas konfirmasi via WhatsApp",
	},
];

/** Legacy URL path for a villa slug. */
export const villaPath = (slug: string) => `/type-${slug}/`;

for (const v of villas) VillaSchema.parse(v);
export type VillaRow = (typeof villas)[number];

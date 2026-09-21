import { z } from "astro/zod";

const text = z.object({ id: z.string().min(1), en: z.string().min(1) });

/** EXACT future-Emdash `posts` shape (title/excerpt/pubDate/author/
 *  category/tags/heroImage/body, all copy {id,en}) so Week-2 migration is
 *  mechanical. Body here is paragraph arrays; Emdash body will be Portable
 *  Text — migration maps blocks to paragraphs. Local file ships. */
export const PostSchema = z.object({
	slug: z.string(),
	title: text,
	excerpt: text,
	category: text,
	tags: z.array(z.string()),
	author: z.string(),
	pubDate: z.string(), // ISO date
	heroImage: z.string(),
	body: z.object({ id: z.array(z.string()).min(1), en: z.array(z.string()).min(1) }),
});

export type Post = z.infer<typeof PostSchema>;

const T = (id: string, en: string) => ({ id, en });

export const posts = [
	{
		slug: "panduan-camping-gunung-salak-endah",
		title: T(
			"Panduan Lengkap Camping di Gunung Salak Endah",
			"The Complete Camping Guide to Gunung Salak Endah",
		),
		excerpt: T(
			"Glamping atau lot campsite? Apa yang dibawa, kapan berangkat, dan curug mana yang sempat dikunjungi — semua dalam satu panduan.",
			"Glamping or a campsite lot? What to pack, when to leave, and which waterfalls fit the trip — one guide covers it all.",
		),
		category: T("Panduan", "Guides"),
		tags: ["camping", "glamping", "gunung-salak-endah"],
		author: "Pondok Rasamala",
		pubDate: "2026-09-15",
		heroImage: "",
		body: {
			id: [
				"Camping di Gunung Salak Endah cocok untuk yang mau suasana hutan tanpa logistik ribet. Di Pondok Rasamala, tendanya sudah didirikan, matras sudah digelar, dan sarapan sudah disiapkan — Anda tinggal datang membawa pakaian ganti dan jaket hangat.",
				"Ada dua pilihan: glamping untuk 4–10 orang dengan kamar mandi sendiri dan api unggun, atau lot campsite untuk 4–10 orang dengan tenda plus makan pagi. Glamping lebih privat, campsite lebih lapang untuk komunitas dan acara sekolah.",
				"Berangkatlah pagi dari Jakarta (±2 jam) atau Bogor (±1,5 jam) agar tiba sebelum sore dan sempat memilih tenda terbaik. Suhu sore hingga dini hari bisa sangat dingin — jaket tebal dan kaos kaki wajib, bukan opsional.",
				"Sisakan satu pagi untuk trekking: Curug Seribu untuk yang fit (±1 jam jalan), Curug Ngumpet untuk berendam santai, atau Air Panas Ciparay untuk malam yang hangat. Semua dalam jangkauan singkat dari resort.",
				"Bawa pulang sampah Anda, matikan api unggun sampai padam total, dan hormati jam tenang malam. Hutan Taman Nasional Gunung Halimun Salak adalah rumah bersama — kita tamu di dalamnya.",
				"Siap camping? Ceritakan tanggal dan jumlah rombongan via WhatsApp — kami bantu pilihkan tenda atau lot yang pas, lengkap dengan sarapannya.",
			],
			en: [
				"Camping in Gunung Salak Endah suits anyone wanting forest atmosphere without the logistics headache. At Pondok Rasamala the tents are pitched, mattresses laid out, and breakfast prepared — just bring a change of clothes and a warm jacket.",
				"Two options: glamping for 4–10 guests with a private bathroom and bonfire, or campsite lots for 4–10 with tent plus breakfast. Glamping is more private; campsites are roomier for communities and school events.",
				"Leave Jakarta in the morning (±2 hours) or Bogor (±1.5 hours) to arrive before dusk and pick the best tent. Evenings through dawn get properly cold — a thick jacket and socks are mandatory, not optional.",
				"Save one morning for trekking: Curug Seribu for the fit (±1 hour on foot), Curug Ngumpet for easy dips, or Ciparay Hot Springs for a warm night. All a short trip from the resort.",
				"Take your rubbish home, put the bonfire fully out, and respect night quiet hours. Gunung Halimun Salak National Park's forest is a shared home — we are guests in it.",
				"Ready to camp? Tell us your dates and group size on WhatsApp — we'll help you pick the right tent or lot, breakfast included.",
			],
		},
	},
	{
		slug: "villa-bambu-bogor-kabur-dari-kota",
		title: T(
			"Villa Bambu Bogor: Kabur Sejenak dari Bising Kota",
			"Villa Bambu Bogor: A Brief Escape from City Noise",
		),
		excerpt: T(
			"Dua kamar, teras menghadap hijau, dan harga paling bersahabat — kenapa Villa Bambu jadi pintu masuk favorit ke Pondok Rasamala.",
			"Two bedrooms, a terrace facing the green, and the friendliest rate — why Villa Bambu is guests' favourite door into Pondok Rasamala.",
		),
		category: T("Villa", "Villas"),
		tags: ["villa-bambu", "keluarga", "weekend"],
		author: "Pondok Rasamala",
		pubDate: "2026-09-18",
		heroImage: "",
		body: {
			id: [
				"Tidak semua liburan butuh rencana besar. Kadang yang dibutuhkan hanya dua kamar yang tenang, teras untuk duduk sore, dan udara yang tidak berbau knalpot — itu tepatnya yang ditawarkan Villa Bambu.",
				"Villa dua kamar tidur ini dibangun dari bambu dan kayu di tengah taman resort yang rindang. Kapasitas 4–6 orang membuatnya pas untuk keluarga kecil atau dua pasangan yang liburan bareng tanpa mau sempit.",
				"Pagi dimulai dengan kabut tipis dan suara hutan, bukan klakson. Siangnya bisa diisi trekking ringan ke curug terdekat, berenang di kolam resort, atau tidak melakukan apa-apa sama sekali di teras — ketiganya pilihan yang sah.",
				"Dengan tarif per malam yang paling bersahabat di antara villa-villa di sini, Villa Bambu adalah cara termurah merasakan konsep resort bernuansa alam pedesaan: tidur di bangunan bambu asli, bangun di udara gunung.",
				"Datang Jumat sore, pulang Minggu siang — pola kabur akhir pekan yang paling sering dipilih tamu. Dua jam dari Jakarta, dan Senin pagi Anda kembali dengan kepala yang jauh lebih ringan.",
				"Cek ketersediaan Villa Bambu via WhatsApp — akhir pekan dan libur panjang biasanya penuh duluan.",
			],
			en: [
				"Not every holiday needs a grand plan. Sometimes all it takes is two quiet bedrooms, an afternoon terrace, and air that doesn't smell of exhaust — exactly what Villa Bambu offers.",
				"This two-bedroom villa is built from bamboo and timber amid the resort's shady gardens. Sleeping 4–6, it suits small families or two couples holidaying together without crowding.",
				"Mornings start with thin mist and forest sounds, not horns. Days can hold an easy waterfall trek, a swim in the resort pool, or doing nothing at all on the terrace — all valid choices.",
				"At the friendliest nightly rate of any villa here, Villa Bambu is the cheapest way to feel the countryside-resort concept: sleep in genuine bamboo, wake in mountain air.",
				"Arrive Friday evening, leave Sunday noon — guests' most-picked weekend-escape pattern. Two hours from Jakarta, and Monday finds you far lighter-headed.",
				"Check Villa Bambu availability on WhatsApp — weekends and long holidays fill first.",
			],
		},
	},
	{
		slug: "curug-terbaik-sekitar-gunung-salak",
		title: T(
			"6 Curug Terbaik di Sekitar Gunung Salak",
			"6 Best Waterfalls Around Mount Salak",
		),
		excerpt: T(
			"Dari Kawah Ratu sampai Goa Lumut — enam air terjun dan kawah yang semuanya bisa dicapai dari satu basecamp: Pondok Rasamala.",
			"From Kawah Ratu to Goa Lumut — six falls and a crater, all reachable from one basecamp: Pondok Rasamala.",
		),
		category: T("Atraksi", "Attractions"),
		tags: ["curug", "trekking", "gunung-salak"],
		author: "Pondok Rasamala",
		pubDate: "2026-09-20",
		heroImage: "",
		body: {
			id: [
				"Kawasan Gunung Salak Endah dijuluki surganya curug — dan julukan itu pantas. Dalam radius perjalanan singkat dari Pondok Rasamala ada enam titik air yang masing-masing punya karakter: kawah vulkanik, air terjun tertinggi se-Bogor, sampai gua berlumut.",
				"Kawah Ratu adalah yang paling menantang: trekking ±6 jam pulang-pergi via jalur Curug Seribu dengan hadiah sungai belerang biru muda. Wajib berangkat pagi, bawa masker, dan sewa pemandu lokal.",
				"Curug Seribu (±100 m, tertinggi di Bogor) butuh ±1 jam jalan kaki dari parkir — cocok untuk yang fit. Curug Ngumpet yang tersembunyi justru paling santai: kolam jernih untuk berendam tanpa trek berat.",
				"Curug Cigamea kembar jadi favorit foto dengan akses relatif mudah, Air Panas Ciparay menutup hari dengan rendaman hangat (paling nikmat malam hari), dan Curug Goa Lumut menawarkan dinding gua hijau untuk petualang berpengalaman.",
				"Aturan mainnya sama untuk semua: sepatu anti-slip, baju ganti, jas hujan tipis, dan jangan memaksakan diri saat hujan — debit air bisa naik cepat.",
				"Jadikan Pondok Rasamala basecamp: berangkat pagi setelah sarapan, pulang sore untuk api unggun. Tanya tim kami via WhatsApp untuk rekomendasi curug sesuai stamina rombongan.",
			],
			en: [
				"Gunung Salak Endah is nicknamed the waterfall haven — and earns it. Within a short trip of Pondok Rasamala sit six water spots, each with character: a volcanic crater, Bogor's tallest fall, and a mossy cave.",
				"Kawah Ratu is the most demanding: a ±6-hour return trek via the Curug Seribu trail rewarding you with a pale-blue sulphur stream. Start early, bring a mask, hire a local guide.",
				"Curug Seribu (±100 m, Bogor's tallest) needs ±1 hour on foot from parking — for the fit. Hidden Curug Ngumpet is the most relaxing: a clear pool for dipping without a hard trek.",
				"Twin Curug Cigamea is the photo favourite with relatively easy access, Ciparay Hot Springs closes the day with a warm soak (best at night), and Goa Lumut offers a green cave wall for seasoned adventurers.",
				"The rules are the same everywhere: grippy shoes, a change of clothes, a light raincoat — and never push on in rain, water levels can rise fast.",
				"Make Pondok Rasamala your basecamp: leave after breakfast, return for the bonfire. Ask our team on WhatsApp for waterfall picks matched to your group's stamina.",
			],
		},
	},
];

export const postPath = (slug: string) => `/blog/${slug}/`;

for (const p of posts) PostSchema.parse(p);
export type PostRow = (typeof posts)[number];

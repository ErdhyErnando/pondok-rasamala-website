import { z } from "astro/zod";
import { photo, photoSchema } from "../lib/photos";

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
	hero: photoSchema,
	/** Photos after the hero; the detail page shows hero + gallery. */
	gallery: z.array(photoSchema),
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
			"Glamping Salak dinamai dari gunung yang menaunginya, pilihan paling populer untuk keluarga 4–6 orang. Tidur di matras yang hangat, kamar mandi sendiri, dan sarapan pagi sudah termasuk sesuai jumlah tamu. Malamnya, api unggun dan langit Gunung Salak yang jernih menutup hari dengan sempurna.",
			"Glamping Salak is named after the mountain sheltering it, the most popular pick for families of 4–6. Warm mattresses, a private bathroom, and breakfast included per guest count. At night, a bonfire and Mount Salak's clear sky close the day perfectly.",
		),
		hero: photo("glamping/salak/01-tampak-taman-meja", {
			id: "Taman rimbun di depan Glamping Salak dengan jalan batu, payung, dan meja kecil di antara dedaunan tropis.",
			en: "Lush garden in front of Glamping Salak with a stepping-stone path, a parasol and a small table among tropical leaves.",
		}),
		gallery: [
				photo("glamping/salak/02-tampak-daun-pisang", {
					id: "Tenda panggung Glamping Salak beratap kanvas dengan rangka bambu, teras kayunya terlihat di balik daun pisang.",
					en: "Glamping Salak's raised tent with a canvas roof and bamboo frame, its timber deck showing behind banana leaves.",
				}),
				photo("glamping/salak/03-tampak-tenda-tangga", {
					id: "Atap kanvas tenda Glamping Salak di antara pakis pohon, dengan tangga batu menuju bangunan kayu di sampingnya.",
					en: "Glamping Salak's canvas-roofed tent among tree ferns, with stone steps up to a timber building beside it.",
				}),
				photo("glamping/salak/04-interior-kasur-kursi", {
					id: "Di dalam tenda Salak: dua kasur berseprai kotak-kotak beralas oranye, lampu hangat, dan dipan lipat di sisi kanan.",
					en: "Inside Salak's tent: two beds in checked linen with orange mats, a warm lamp and a folding cot on the right.",
				}),
				photo("glamping/salak/05-tenda-dalam-depan", {
					id: "Pintu tenda Glamping Salak terbuka memperlihatkan kasur hijau di bawah atap kanvas berrangka bambu.",
					en: "Glamping Salak's tent flaps open to green mattresses under a canvas roof on a bamboo frame.",
				}),
				photo("glamping/salak/06-interior-tempat-tidur", {
					id: "Dua kasur putih berselimut oranye di lantai kayu tenda Salak, berdinding kanvas cokelat dengan lampu kecil.",
					en: "Two white mattresses with orange blankets on the timber floor of Salak's tent, brown canvas walls and a small lamp.",
				}),
				photo("glamping/salak/07-interior-kursi-lipat", {
					id: "Sudut tenda Salak berlantai kayu dengan dipan lipat hijau dan rak kayu berisi handuk bersih.",
					en: "Corner of Salak's tent with a timber floor, a green folding cot and a wooden stand holding clean towels.",
				}),
				photo("glamping/salak/08-kamar-mandi", {
					id: "Kamar mandi tenda berdinding bambu, batu kali, dan bata merah dengan wastafel bulat dan cermin bundar.",
					en: "Tent bathroom with bamboo, river-stone and red brick walls, a round basin and a round mirror.",
				}),
				photo("glamping/salak/09-tampak-portrait", {
					id: "Tenda berkanvas Glamping Salak terlihat di sela pohon tinggi, dengan payung dan meja makan di pekarangan.",
					en: "Glamping Salak's canvas tent seen between tall trees, with a parasol and dining table in the yard.",
				}),
		],
	},
	{
		slug: "gede", name: "Gede",
		tiers: [{ pax: 4, price: 2100000 }, { pax: 6, price: 2600000 }],
		includes: std, firePit: true,
		tagline: T("Untuk pendaki pemula", "For first-time campers"),
		description: T(
			"Glamping Gede cocok untuk yang baru pertama camping: sensasi tenda dengan kenyamanan kasur, kamar mandi, dan sarapan. Kapasitas 4–6 orang dengan dua pilihan harga sesuai rombongan. Lokasinya dekat jalur jalan pagi, pemanasan ideal sebelum trekking ke curug.",
			"Glamping Gede suits first-time campers: tent thrill with mattress comfort, bathroom, and breakfast. Sleeps 4–6 with two price options to match your group. Near the morning-walk path, an ideal warm-up before waterfall treks.",
		),
		hero: photo("glamping/gede/01-tampak-daun-pakis", {
			id: "Rangka bambu dan atap kanvas Glamping Gede dilihat dari bawah, di balik daun pisang hijau yang lebar.",
			en: "Glamping Gede's bamboo frame and canvas roof seen from below, behind broad green banana leaves.",
		}),
		gallery: [
				photo("glamping/gede/02-tampak-malam", {
					id: "Glamping Gede menyala hangat di malam hari, tenda beratap kanvas terang di antara pohon gelap dan langit biru tua.",
					en: "Glamping Gede glowing warm at night, its canvas-roofed tent lit among dark trees under a deep blue sky.",
				}),
				photo("glamping/gede/03-tampak-pisang-pakis", {
					id: "Tenda Gede di balik pakis dan tanaman tropis, dengan dispenser air terlihat di teras kayunya.",
					en: "Gede's tent behind ferns and tropical plants, with a water dispenser visible on its timber deck.",
				}),
				photo("glamping/gede/04-interior-tenda-gelap", {
					id: "Teras tenda Gede berpagar bambu dengan kursi dan meja kecil, lampu menyala di bawah atap kanvas.",
					en: "The bamboo-railed deck of Gede's tent with a chair and small table, a light glowing under the canvas roof.",
				}),
				photo("glamping/gede/05-interior-kasur", {
					id: "Kasur putih lebar beralas oranye di lantai kayu tenda Gede, dinding kanvas cokelat dan tiang bambu.",
					en: "Wide white mattresses with orange mats on the timber floor of Gede's tent, brown canvas walls and bamboo posts.",
				}),
				photo("glamping/gede/06-interior-kasur-hijau", {
					id: "Kasur berseprai hijau dengan dua bantal di dalam tenda kanvas putih Gede yang berjendela kayu kecil.",
					en: "A bed in green linen with two cushions inside Gede's white canvas tent, with a small timber-framed window.",
				}),
				photo("glamping/gede/07-kamar-mandi", {
					id: "Kamar mandi tenda Gede berdinding bambu, batu kali, dan bata merah dengan wastafel bulat.",
					en: "Gede's tent bathroom with bamboo, river-stone and red brick walls and a round basin.",
				}),
		],
	},
	{
		slug: "pangrango", name: "Pangrango",
		tiers: [{ pax: 4, price: 2100000 }, { pax: 6, price: 2600000 }],
		includes: std, firePit: true,
		tagline: T("Tenang di sudut resort", "Quiet in the resort's corner"),
		description: T(
			"Glamping Pangrango berada di sudut resort yang lebih tenang untuk 4–6 orang. Suara malam hutan, jangkrik dan angin pinus, terdengar paling jelas dari sini. Fasilitas sama lengkapnya: matras, kamar mandi, sarapan, dan api unggun untuk malam kebersamaan.",
			"Glamping Pangrango sits in the resort's quieter corner for 4–6 guests. Forest night sounds, crickets and pine wind, come through clearest here. Equally complete: mattresses, bathroom, breakfast, and a bonfire for nights together.",
		),
		hero: photo("glamping/pangrango/01-tampak-depan", {
			id: "Tenda Pangrango di atas taman berumput, beratap kanvas dengan teras kayu dan tangga batu di sisi kiri.",
			en: "Pangrango's tent above a grassy garden, canvas-roofed with a timber deck and a stone staircase on the left.",
		}),
		gallery: [
				photo("glamping/pangrango/02-tampak-tenda-2", {
					id: "Tenda Glamping Pangrango muncul di balik daun lebar dan batang pohon yang tinggi.",
					en: "Glamping Pangrango's tent appearing behind broad leaves and a tall tree trunk.",
				}),
				photo("glamping/pangrango/03-tampak-taman", {
					id: "Tenda Pangrango di tepi kebun berumput di antara batang pohon tinggi dan pakis pohon.",
					en: "Pangrango's tent at the edge of a grassy garden among tall tree trunks and tree ferns.",
				}),
				photo("glamping/pangrango/04-tampak-pisang", {
					id: "Teras kayu berpagar dan atap kanvas tenda Pangrango, dikelilingi daun pisang dan pakis.",
					en: "Pangrango's railed timber deck and canvas roof, surrounded by banana leaves and ferns.",
				}),
				photo("glamping/pangrango/05-interior-tenda", {
					id: "Ruang depan tenda Pangrango dengan dipan bambu, bangku putih, dan pintu kanvas terbuka ke tempat tidur.",
					en: "Front room of Pangrango's tent with a bamboo daybed, a white stool and canvas flaps open to the bed.",
				}),
				photo("glamping/pangrango/06-interior-kasur", {
					id: "Dipan bambu di depan kasur hijau terang di dalam tenda Pangrango yang beratap kanvas.",
					en: "A bamboo daybed in front of a bright green bed inside Pangrango's canvas-roofed tent.",
				}),
				photo("glamping/pangrango/07-kamar-mandi", {
					id: "Kamar mandi tenda Pangrango berdinding bambu, batu kali, dan bata merah dengan wastafel bulat.",
					en: "Pangrango's tent bathroom with bamboo, river-stone and red brick walls and a round basin.",
				}),
				photo("glamping/pangrango/08-tampak-atap-putih", {
					id: "Atap kanvas putih dan rangka bambu tenda Pangrango menyembul di atas daun pisang.",
					en: "Pangrango's white canvas roof and bamboo frame rising above banana leaves.",
				}),
				photo("glamping/pangrango/09-tampak-pohon", {
					id: "Tenda beratap kanvas putih di antara pakis pohon dan lampu taman, dengan pelataran kayu di depannya.",
					en: "White canvas-roofed tent among tree ferns and garden lamps, with a timber platform in front.",
				}),
		],
	},
	{
		slug: "papandayan", name: "Papandayan",
		tiers: [{ pax: 8, price: 3100000 }],
		includes: std, firePit: true,
		tagline: T("Tenda baru untuk 8 orang", "The new tent for 8"),
		description: T(
			"Glamping Papandayan adalah tenda terbaru untuk 8 orang, kabar baik bagi komunitas yang selalu kelebihan peserta. Satu harga sudah termasuk matras, kamar mandi, dan sarapan untuk delapan orang. Halaman baru, halaman depan untuk api unggun bersama.",
			"Glamping Papandayan is the newest tent for 8 guests, good news for communities that always overflow. One price covers mattresses, bathroom, and breakfast for eight. Fresh grounds with a front yard for bonfires together.",
		),
		hero: photo("glamping/papandayan/01-tampak-dek-tenda", {
			id: "Dek kayu berpagar dengan lantai bambu di depan tenda Papandayan, beratap gelap dan menghadap pohon-pohon hutan.",
			en: "Railed timber deck with a bamboo-slat walkway in front of Papandayan's tent, under a dark roof facing forest trees.",
		}),
		gallery: [
				photo("glamping/papandayan/02-tampak-pakis", {
					id: "Pakis pohon dan batang pohon tinggi di sekitar Glamping Papandayan, dengan dek kayu dan pondok di kejauhan.",
					en: "Tree ferns and tall trunks around Glamping Papandayan, with a timber deck and cabin in the distance.",
				}),
				photo("glamping/papandayan/03-interior-kasur-hijau", {
					id: "Deretan kasur hijau muda beralas cokelat di tenda Papandayan yang lapang, berdinding kanvas krem dan jendela kecil.",
					en: "Rows of light-green mattresses with brown mats in Papandayan's spacious tent, with cream canvas walls and small windows.",
				}),
				photo("glamping/papandayan/04-kamar-mandi", {
					id: "Kamar mandi berdinding bambu, batu kali, dan bata merah dengan wastafel putih bulat di meja kayu serta cermin oval.",
					en: "Bathroom with bamboo, river-stone and red brick walls, a round white basin on a timber counter and an oval mirror.",
				}),
				photo("glamping/papandayan/05-tampak-tenda-dek", {
					id: "Papan nama Papandayan tergantung di pohon di depan tenda beratap putih berdek kayu, dikelilingi pakis.",
					en: "A Papandayan sign hangs on a tree in front of a white-roofed tent with a timber deck, ringed by ferns.",
				}),
				photo("glamping/papandayan/06-tampak-sisi", {
					id: "Jalan setapak di antara pakis dan pohon tinggi di bawah langit biru, dengan tenda-tenda terlihat di kejauhan.",
					en: "A path among ferns and tall trees under a blue sky, with tents visible in the distance.",
				}),
				photo("glamping/papandayan/07-pandangan-hutan", {
					id: "Papan nama Papandayan di batang pohon dekat tenda beratap putih, dengan rak tanaman gantung di sisi kiri.",
					en: "The Papandayan sign on a tree trunk beside a white-roofed tent, with hanging plant racks on the left.",
				}),
		],
	},
	{
		slug: "burangrang", name: "Burangrang",
		tiers: [{ pax: 8, price: 3100000 }],
		includes: std, firePit: true,
		tagline: T("Untuk komunitas 8 orang", "For communities of 8"),
		description: T(
			"Glamping Burangrang menampung 8 orang dalam satu tenda besar, pas untuk komunitas, tim kantor, atau dua keluarga. Matras tidur, kamar mandi, dan sarapan untuk delapan orang sudah termasuk satu harga. Api unggun di depannya muat untuk lingkaran cerita semalam suntuk.",
			"Glamping Burangrang sleeps 8 in one big tent, right for communities, office teams, or two families. Mattresses, bathroom, and breakfast for eight are covered in one price. Its front bonfire fits an all-night story circle.",
		),
		hero: photo("glamping/burangrang/01-tampak-dek-pohon", {
			id: "Tenda Burangrang di atas panggung kayu berpagar, beratap kanvas, di antara pohon dan tanaman hijau.",
			en: "Burangrang's tent on a railed timber platform with a canvas roof, among trees and green plants.",
		}),
		gallery: [
				photo("glamping/burangrang/02-tampak-depan", {
					id: "Tenda panggung Burangrang dilihat dari bawah, bertumpu pada tiang kayu di atas dinding batu, dengan jalan paving di kanan.",
					en: "Burangrang's raised tent seen from below, standing on timber posts above a stone wall, with a paved path on the right.",
				}),
				photo("glamping/burangrang/03-tampak-dek-kabut", {
					id: "Dek kayu dan tenda Burangrang dalam kabut tipis, dengan pepohonan tinggi di latar belakang.",
					en: "Burangrang's timber deck and tent in light mist, with tall trees behind.",
				}),
				photo("glamping/burangrang/04-interior-kasur", {
					id: "Deretan kasur hijau muda beralas cokelat di dalam tenda Burangrang yang luas, berdinding kayu dan kanvas.",
					en: "Rows of light-green mattresses with brown mats inside Burangrang's roomy tent, with timber and canvas walls.",
				}),
				photo("glamping/burangrang/05-kamar-mandi", {
					id: "Kamar mandi berdinding kayu dan bata merah dengan wastafel kecil, cermin bundar, dan lantai batu abu-abu.",
					en: "Bathroom with timber and red brick walls, a small basin, a round mirror and a grey stone floor.",
				}),
				photo("glamping/burangrang/06-tampak-taman", {
					id: "Tenda Burangrang di balik tanaman berdaun lebar dan pepohonan, dengan jalan setapak menurun di sisi kiri.",
					en: "Burangrang's tent behind broad-leafed plants and trees, with a path sloping down on the left.",
				}),
				photo("glamping/burangrang/07-tampak-panjang", {
					id: "Panggung kayu berpagar bambu dan atap tenda Burangrang, dengan pohon palem dan kebun hijau di sampingnya.",
					en: "Burangrang's bamboo-railed timber platform and tent roof, with a palm tree and green garden beside it.",
				}),
		],
	},
	{
		slug: "malabar", name: "Malabar",
		tiers: [{ pax: 8, price: 3100000 }],
		includes: std, firePit: true,
		tagline: T("Lapang untuk gathering", "Roomy for gatherings"),
		description: T(
			"Glamping Malabar lapang untuk 8 orang dengan area depan yang lega untuk aktivitas kelompok. Cocok dipadukan dengan paket outbound, tidur di tenda, beraktivitas di lapangan. Sarapan untuk delapan orang dan api unggun malam termasuk dalam harga.",
			"Glamping Malabar is roomy for 8 with a generous front area for group activities. Pairs well with outbound packages, sleep in tents, play in the fields. Breakfast for eight and a night bonfire are in the price.",
		),
		hero: photo("glamping/malabar/01-tampak-dek-tangga", {
			id: "Tenda kanvas putih Malabar di atas dek kayu berpagar, dengan tangga batu di rumput dan tanaman hijau di depannya.",
			en: "Malabar's white canvas tent on a railed timber deck, with a stone staircase across the grass and green plants in front.",
		}),
		gallery: [
				photo("glamping/malabar/02-dek-interior", {
					id: "Dek tenda Malabar dari dalam: rangka bambu, kasur hijau, kursi, dan bantalan oranye menghadap kebun.",
					en: "Looking out from Malabar's tent deck: bamboo frame, green mattresses, chairs and an orange cushion facing the garden.",
				}),
				photo("glamping/malabar/03-halaman", {
					id: "Halaman Malabar dengan jalan paving, bangku oranye, dan tenda beratap besar di antara pohon tinggi.",
					en: "Malabar's yard with a paved path, orange stools and a large-roofed tent among tall trees.",
				}),
				photo("glamping/malabar/04-jalan-pohon", {
					id: "Jalan setapak di antara pakis dan pohon tinggi di bawah langit biru, dengan atap tenda putih di kanan.",
					en: "A path among ferns and tall trees under a blue sky, with a white tent roof on the right.",
				}),
				photo("glamping/malabar/05-interior-kasur-hijau", {
					id: "Kasur hijau muda beralas cokelat berjajar di tenda kanvas krem yang luas, dengan jendela di dindingnya.",
					en: "Light-green mattresses with brown mats lined up in a roomy cream canvas tent with windows in its walls.",
				}),
				photo("glamping/malabar/06-suasana-malam", {
					id: "Malam di Malabar: lampu taman menyala hijau di antara pakis dan pepohonan, dengan tenda bercahaya di kejauhan.",
					en: "Night at Malabar: garden lights glowing green among ferns and trees, with a lit tent in the distance.",
				}),
		],
	},
	{
		slug: "cikuray", name: "Cikuray",
		tiers: [{ pax: 8, price: 3100000 }, { pax: 10, price: 3500000 }],
		includes: std, firePit: true,
		tagline: T("Paling besar hingga 10 orang", "The biggest, up to 10"),
		description: T(
			"Glamping Cikuray adalah tenda terbesar: muat 8–10 orang dengan dua pilihan harga. Satu-satunya tenda dengan opsi 10 pax, penyelamat gathering yang pesertanya selalu bertambah. Matras, kamar mandi, sarapan, dan api unggun lengkap seperti tenda-tenda lainnya.",
			"Glamping Cikuray is the biggest tent: 8–10 guests with two price options. The only tent with a 10-pax option, a lifesaver for gatherings whose headcount keeps growing. Mattresses, bathroom, breakfast, and bonfire, complete like the other tents.",
		),
		hero: photo("glamping/cikuray/01-tampak-atap-putih", {
			id: "Tenda Cikuray beratap kanvas putih dengan teras kayu berpagar dan panggangan, dikelilingi pohon dan bunga merah.",
			en: "Cikuray's white canvas-roofed tent with a railed timber deck and a grill, surrounded by trees and red flowers.",
		}),
		gallery: [
				photo("glamping/cikuray/02-tampak-pondok-hijau", {
					id: "Jalan setapak di antara pakis dan pohon tinggi menuju bangunan kayu Cikuray di bawah langit biru.",
					en: "A path through ferns and tall trees leading to Cikuray's timber buildings under a blue sky.",
				}),
				photo("glamping/cikuray/03-halaman-api-unggun", {
					id: "Halaman Cikuray dengan lubang api unggun dari batu, bangku ban merah, dan tenda beratap kanvas di tanah yang lebih tinggi.",
					en: "Cikuray's yard with a stone fire pit, red tyre seats and a canvas-roofed tent on higher ground.",
				}),
				photo("glamping/cikuray/04-interior-kasur-hijau", {
					id: "Kasur hijau muda beralas cokelat berjajar di tenda Cikuray yang luas, berdinding kanvas krem dengan jendela kecil.",
					en: "Light-green mattresses with brown mats lined up in Cikuray's roomy tent, cream canvas walls and small windows.",
				}),
				photo("glamping/cikuray/05-dek-tenda-oranye", {
					id: "Dek kayu Cikuray dengan tenda dome oranye dan meja lipat, menghadap kebun dan payung putih di kejauhan.",
					en: "Cikuray's timber deck with an orange dome tent and a folding table, looking over the garden to white parasols beyond.",
				}),
				photo("glamping/cikuray/06-halaman-ban", {
					id: "Tenda Cikuray di balik pakis, dengan bangku ban bercat merah dan jalan batu bertingkat di halaman.",
					en: "Cikuray's tent behind ferns, with red-painted tyre seats and a stepped stone path in the yard.",
				}),
				photo("glamping/cikuray/07-kamar-mandi", {
					id: "Kamar mandi berdinding bambu, batu, dan bata dengan wastafel putih, cermin bundar, dan pintu kayu.",
					en: "Bathroom with bamboo, stone and brick walls, a white basin, a round mirror and a timber door.",
				}),
				photo("glamping/cikuray/08-jalan-setapak", {
					id: "Jalan paving menurun di antara pakis pohon dan tanaman berdaun lebar menuju bangunan kayu.",
					en: "A paved path winding down between tree ferns and broad-leafed plants towards a timber building.",
				}),
		],
	},
	{
		slug: "ciremey", name: "Ciremey",
		tiers: [{ pax: 8, price: 3100000 }],
		includes: std, firePit: true,
		tagline: T("Dinamai atap Jawa Barat", "Named after West Java's roof"),
		description: T(
			"Glamping Ciremey dinamai dari puncak tertinggi Jawa Barat untuk rombongan 8 orang. Tenda yang kokoh dengan matras hangat, kamar mandi sendiri, dan sarapan pagi. Posisinya memberi privasi lebih, cocok untuk gathering yang butuh fokus siang hari dan santai malam hari.",
			"Glamping Ciremey is named after West Java's highest peak, for groups of 8. A sturdy tent with warm mattresses, private bathroom, and breakfast. Its position gives extra privacy, suited to gatherings needing daytime focus and easy nights.",
		),
		hero: photo("glamping/ciremey/01-dek-interior", {
			id: "Dek tenda Ciremey berlantai kayu mengilap di bawah atap kanvas, dengan dipan lipat hijau dan kursi kayu di sisi pagar.",
			en: "Ciremey's glossy timber deck under a canvas roof, with a green folding cot and wooden chairs beside the railing.",
		}),
		gallery: [
				photo("glamping/ciremey/02-tampak-depan-pakis", {
					id: "Tenda Ciremey beratap kanvas di balik pakis pohon, dengan jalan batu dan lampu taman di depannya.",
					en: "Ciremey's canvas-roofed tent behind a tree fern, with a stone path and a garden lamp in front.",
				}),
				photo("glamping/ciremey/03-tampak-depan-dek", {
					id: "Dek kayu berpagar dan atap kanvas lebar tenda Ciremey, dengan tangga beton dan jalan batu di depannya.",
					en: "Ciremey's railed timber deck under a wide canvas roof, with concrete steps and a stepping-stone path in front.",
				}),
				photo("glamping/ciremey/04-jalan-menuju-tenda", {
					id: "Jalan paving menurun di antara pepohonan tinggi menuju tenda Ciremey beratap abu-abu.",
					en: "A paved path winding between tall trees to Ciremey's grey-roofed tent.",
				}),
				photo("glamping/ciremey/05-tampak-hutan", {
					id: "Tenda beratap krem Glamping Ciremey terlihat di balik dedaunan hutan yang rimbun.",
					en: "Glamping Ciremey's cream-roofed tent seen through dense forest foliage.",
				}),
		],
	},
];

/** Legacy URL path for a glamping slug. */
export const glampingPath = (slug: string) => `/glamping-type-${slug}/`;

for (const g of glamping) GlampingSchema.parse(g);
export type GlampingRow = (typeof glamping)[number];

import { z } from "astro/zod";
import { photo, photoSchema } from "../lib/photos";

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
	hero: photoSchema,
	/** Photos after the hero; the detail page shows hero + gallery. */
	gallery: z.array(photoSchema),
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
		amenities: { id: ["4 kamar tidur", "4 kamar mandi", "Ruang keluarga", "Dapur", "Teras", "Saung"], en: ["4 bedrooms", "4 bathrooms", "Living room", "Kitchen", "Terrace", "Pavilion"] }, hero: photo("villa/kiriung/01-tampak-depan", {
			id: "Villa Kiriung beratap genteng merah dengan tiang merah bata, halaman paving, dan tanaman tropis berdaun lebar.",
			en: "Villa Kiriung with a red tile roof and brick-red pillars, a paved yard and broad-leafed tropical plants.",
		}),
		gallery: [
			photo("villa/kiriung/02-teras-meja-makan", {
				id: "Teras berlantai kayu di Villa Kiriung dengan meja makan bundar dan kursi, berdinding bata dan jendela kaca ke taman.",
				en: "Wood-floored terrace at Villa Kiriung with a round dining table and chairs, brick walls and glass windows to the garden.",
			}),
			photo("villa/kiriung/03-ruang-keluarga", {
				id: "Ruang keluarga Villa Kiriung yang lapang dengan bangku kayu ukir, jendela bergorden krem, dan lukisan di dinding kayu.",
				en: "Spacious living room of Villa Kiriung with a carved wooden bench, cream-curtained windows and a painting on the timber wall.",
			}),
			photo("villa/kiriung/04-dapur-pantry", {
				id: "Dapur pantry Villa Kiriung dengan meja bar kayu, kompor, dispenser air, dinding bata merah, dan lantai granit.",
				en: "Pantry kitchen at Villa Kiriung with a timber bar counter, hob, water dispenser, red brick walls and granite floor.",
			}),
			photo("villa/kiriung/05-kamar-tidur-1", {
				id: "Kamar tidur Villa Kiriung berpanel kayu dan bata dengan ranjang kayu besar, lukisan oranye, dan jendela bergorden krem.",
				en: "Villa Kiriung bedroom with timber and brick walls, a large wooden bed, an orange painting and cream-curtained windows.",
			}),
			photo("villa/kiriung/06-kamar-tidur-2", {
				id: "Kamar tidur kedua Villa Kiriung dengan ranjang kayu berseprai hijau zaitun, dinding bata, dan lukisan bunga.",
				en: "Second bedroom at Villa Kiriung with a wooden bed in olive-green linen, a brick wall and a flower painting.",
			}),
			photo("villa/kiriung/07-halaman-samping", {
				id: "Halaman samping Villa Kiriung: bangunan bata dan kayu beratap genteng di antara pakis pohon, dengan jalan kayu layang.",
				en: "Villa Kiriung's side yard: tiled-roof brick and timber buildings among tree ferns, joined by a raised walkway.",
			}),
		],
	},
	{
		slug: "bambu-a", name: "Bambu A", type: "villa", price: 1250000, paxNormal: 4, paxMax: 6,
		spec: "2 kmr tidur, teras, 2 kmd (hanya kamar)",
		tagline: T("Ikon bambu untuk keluarga kecil", "The bamboo icon for small families"),
		description: T(
			"Villa Bambu A adalah wajah Pondok Rasamala: bangunan bambu dan kayu di tengah taman yang rindang. Dua kamar tidur, teras, dan 2 kamar mandi untuk 4–6 orang, ideal untuk keluarga kecil yang baru pertama ke Gunung Salak Endah. Harganya paling bersahabat di antara villa-villa di sini, dengan suasana pedesaan yang paling kental.",
			"Villa Bambu A is the face of Pondok Rasamala: bamboo and timber construction amid shady gardens. Two bedrooms, a terrace, and 2 bathrooms for 4–6 guests, ideal for small families visiting Gunung Salak Endah for the first time. The friendliest villa rate here, with the strongest countryside character.",
		),
		amenities: { id: ["2 kamar tidur", "2 kamar mandi", "Teras"], en: ["2 bedrooms", "2 bathrooms", "Terrace"] }, hero: photo("villa/bambu-a/01-kamar-tidur", {
			id: "Kamar tidur Villa Bambu A dengan dinding anyaman bambu dan bata merah, kasur hijau, dan kamar mandi berdinding batu.",
			en: "Bedroom in Villa Bambu A with woven bamboo and red brick walls, a lime-green bed and a stone-walled bathroom beyond.",
		}),
		gallery: [
			photo("villa/bambu-a/02-jalan-menuju-bambu", {
				id: "Jalan batu setapak menuju pondok Bambu A beratap ilalang, diapit tanaman hijau dan pohon besar.",
				en: "Flagstone path leading to the thatched Bambu A hut, framed by lush greenery and a large tree.",
			}),
			photo("villa/bambu-a/03-kolam-renang", {
				id: "Kolam renang resor berair biru dengan rumah panggung kayu di antara pohon pinus di belakangnya.",
				en: "Blue resort swimming pool with a wooden stilt house among the pine trees behind it.",
			}),
			photo("villa/bambu-a/04-kamar-tidur-gelap", {
				id: "Ranjang berseprai hijau dan selimut cokelat di kamar bambu, dengan cahaya hangat masuk lewat gorden.",
				en: "Bed with green sheets and a brown blanket in the bamboo bedroom, warm light coming through the curtain.",
			}),
		],
	},
	{
		slug: "bambu-b", name: "Bambu B", type: "villa", price: 1250000, paxNormal: 4, paxMax: 6,
		spec: "2 kmr tidur, teras, 2 kmd (hanya kamar)",
		tagline: T("Ikon bambu untuk keluarga kecil", "The bamboo icon for small families"),
		description: T(
			"Villa Bambu B adalah wajah Pondok Rasamala: bangunan bambu dan kayu di tengah taman yang rindang. Dua kamar tidur, teras, dan 2 kamar mandi untuk 4–6 orang, ideal untuk keluarga kecil yang baru pertama ke Gunung Salak Endah. Harganya paling bersahabat di antara villa-villa di sini, dengan suasana pedesaan yang paling kental.",
			"Villa Bambu B is the face of Pondok Rasamala: bamboo and timber construction amid shady gardens. Two bedrooms, a terrace, and 2 bathrooms for 4–6 guests, ideal for small families visiting Gunung Salak Endah for the first time. The friendliest villa rate here, with the strongest countryside character.",
		),
		amenities: { id: ["2 kamar tidur", "2 kamar mandi", "Teras"], en: ["2 bedrooms", "2 bathrooms", "Terrace"] }, hero: photo("villa/bambu-b/01-kamar-tidur", {
			id: "Kamar tidur Villa Bambu B dengan dinding anyaman bambu dan bata merah, kasur hijau, dan kamar mandi berdinding batu.",
			en: "Bedroom in Villa Bambu B with woven bamboo and red brick walls, a lime-green bed and a stone-walled bathroom beyond.",
		}),
		gallery: [
			photo("villa/bambu-b/02-jalan-menuju-bambu", {
				id: "Jalan batu setapak menuju pondok Bambu B beratap ilalang, diapit tanaman hijau dan pohon besar.",
				en: "Flagstone path leading to the thatched Bambu B hut, framed by lush greenery and a large tree.",
			}),
			photo("villa/bambu-b/03-kolam-renang", {
				id: "Kolam renang resor berair biru dengan rumah panggung kayu di antara pohon pinus di belakangnya.",
				en: "Blue resort swimming pool with a wooden stilt house among the pine trees behind it.",
			}),
			photo("villa/bambu-b/04-kamar-tidur-gelap", {
				id: "Ranjang berseprai hijau dan selimut cokelat di kamar bambu, dengan cahaya hangat masuk lewat gorden.",
				en: "Bed with green sheets and a brown blanket in the bamboo bedroom, warm light coming through the curtain.",
			}),
		],
	},
	{
		slug: "cendana", name: "Cendana", type: "villa", price: 6750000, paxNormal: 14, paxMax: 28,
		spec: "7 kmr tidur, 3 kmd, dapur & 2 R kel",
		tagline: T("Villa terbesar untuk gathering akbar", "The biggest villa for grand gatherings"),
		description: T(
			"Villa Cendana adalah unit terbesar di Pondok Rasamala: 7 kamar tidur, 3 kamar mandi, dapur, dan 2 ruang keluarga untuk 14–28 orang. Dirancang untuk gathering perusahaan, reuni akbar, dan acara sekolah yang butuh satu atap untuk semua peserta. Satu villa menampung panitia, peserta, dan ruang kumpul tanpa harus berpencar.",
			"Villa Cendana is the largest unit at Pondok Rasamala: 7 bedrooms, 3 bathrooms, a kitchen, and 2 living rooms for 14–28 guests. Built for company outings, grand reunions, and school events that need everyone under one roof. One villa holds the committee, the participants, and the gathering space, nobody split up.",
		),
		amenities: { id: ["7 kamar tidur", "3 kamar mandi", "Dapur", "2 ruang keluarga"], en: ["7 bedrooms", "3 bathrooms", "Kitchen", "2 living rooms"] }, hero: photo("villa/cendana/01-tampak-depan", {
			id: "Bangunan kayu bertingkat Villa Cendana di antara pakis dan tanaman tropis, dengan saung beratap genteng di sampingnya.",
			en: "Villa Cendana's two-storey timber building among tree ferns and tropical plants, with a tiled pavilion beside it.",
		}),
		gallery: [
			photo("villa/cendana/02-tampak-pohon-pakis", {
				id: "Villa Cendana dua lantai berdinding batu dan balkon kayu, dinaungi daun pakis besar.",
				en: "Two-storey stone-walled Villa Cendana with a wooden balcony, sheltered by large fern fronds.",
			}),
			photo("villa/cendana/03-teras-pintu-kayu", {
				id: "Teras Villa Cendana dengan pintu ganda kayu, dinding batu kali, dan dua kursi kayu bercabang.",
				en: "Villa Cendana porch with double wooden doors, river-stone walls and two rustic branch-wood chairs.",
			}),
			photo("villa/cendana/04-saung-makan", {
				id: "Saung makan Villa Cendana beratap kayu tinggi dengan meja bundar dan kursi, terbuka ke arah taman.",
				en: "Open dining pavilion at Villa Cendana with a high timber roof, a round table and chairs, facing the garden.",
			}),
			photo("villa/cendana/05-ruang-keluarga-besar", {
				id: "Ruang keluarga Villa Cendana berpanel kayu hangat dengan aksen batu kali, sofa kayu, dan pintu kaca ke taman.",
				en: "Villa Cendana living room with warm wood panelling, river-stone accents, a wooden sofa and glass doors to the garden.",
			}),
			photo("villa/cendana/06-ruang-keluarga-sofa", {
				id: "Ruang duduk Villa Cendana dengan bangku kayu, kursi malas antik, meja akar, dan jendela besar bergorden putih.",
				en: "Villa Cendana sitting area with a wooden bench, a carved chaise, a root-wood table and big windows with white curtains.",
			}),
			photo("villa/cendana/07-lorong-tangga", {
				id: "Lorong Villa Cendana berdinding kayu dan batu dengan lantai terakota, lukisan besar, dan tangga ke lantai atas.",
				en: "Villa Cendana hallway with wood and stone walls, a terracotta floor, a large painting and stairs to the upper floor.",
			}),
			photo("villa/cendana/08-kamar-tidur-1", {
				id: "Kamar tidur Villa Cendana berdinding putih dengan langit-langit kayu, ranjang rendah berseprai putih, dan lantai kayu.",
				en: "Villa Cendana bedroom with white walls, a timber ceiling, a low bed in white linen and a wooden floor.",
			}),
			photo("villa/cendana/09-kamar-tidur-jendela", {
				id: "Kamar tidur Villa Cendana berseprai hijau dengan jendela lebar bergorden putih menghadap pakis dan hutan.",
				en: "Villa Cendana bedroom in green linen with wide, white-curtained windows facing tree ferns and forest.",
			}),
			photo("villa/cendana/10-kamar-mandi", {
				id: "Kamar mandi Villa Cendana berdinding keramik putih dengan motif daun hijau, water heater, dan toilet duduk.",
				en: "Villa Cendana bathroom with white tiled walls, painted green leaf motifs, a water heater and a toilet.",
			}),
			photo("villa/cendana/11-halaman-kompleks", {
				id: "Halaman rumput dengan jalan batu di kompleks Villa Cendana, dikelilingi tanaman tropis dan rumah kayu bertingkat.",
				en: "Lawn and cobblestone path in the Villa Cendana grounds, ringed by tropical plants and a multi-storey timber house.",
			}),
		],
	},
	{
		slug: "dayak", name: "Dayak", type: "villa", price: 2350000, paxNormal: 4, paxMax: 6,
		spec: "2 kmr tidur, R tamu, 1 kmd, dapur",
		tagline: T("Hangat untuk keluarga dan sahabat", "Cosy for family and friends"),
		description: T(
			"Villa Dayak memadukan 2 kamar tidur, ruang tamu, dapur, dan kamar mandi dalam satu bangunan kayu yang hangat. Kapasitas 4–6 orang membuatnya pas untuk dua keluarga kecil atau rombongan sahabat. Ruang tamunya jadi tempat ngobrol sampai malam tanpa mengganggu yang sudah tidur.",
			"Villa Dayak combines 2 bedrooms, a guest room, kitchen, and bathroom in one warm timber building. Sleeping 4–6, it suits two small families or a group of friends. The guest room becomes the late-night chat spot without disturbing early sleepers.",
		),
		amenities: { id: ["2 kamar tidur", "Ruang tamu", "1 kamar mandi", "Dapur"], en: ["2 bedrooms", "Guest room", "1 bathroom", "Kitchen"] }, hero: photo("villa/dayak/01-tampak-depan-jalan", {
			id: "Pondok A-frame Villa Dayak di antara pepohonan, terlihat dari jalan paving di dalam resor.",
			en: "A-frame Villa Dayak among the trees, seen from the paved road inside the resort.",
		}),
		gallery: [
			photo("villa/dayak/02-tampak-a-frame", {
				id: "Villa Dayak beratap runcing di taman rimbun, dengan papan nama kayu di depan dan pakis di sekelilingnya.",
				en: "Pointed-roof Villa Dayak in a leafy garden with a wooden name sign and ferns around it.",
			}),
			photo("villa/dayak/03-halaman-api-unggun", {
				id: "Halaman rumput Villa Dayak dengan lingkaran batu untuk api unggun dan jalan batu menuju rumah A-frame.",
				en: "Villa Dayak lawn with a stone fire ring and a flagstone path leading to the A-frame house.",
			}),
			photo("villa/dayak/04-ruang-tamu", {
				id: "Ruang tamu Villa Dayak berdinding anyaman bambu dengan bangku kayu, pintu ganda, dan lantai ubin abu-abu.",
				en: "Villa Dayak guest room with woven bamboo walls, a wooden bench, double doors and a grey tile floor.",
			}),
			photo("villa/dayak/05-loft-tangga", {
				id: "Bagian dalam atap A-frame Villa Dayak dengan tangga bambu ke loft, dispenser air, dan meja kayu di kiri.",
				en: "Inside Villa Dayak's A-frame: a bamboo stair up to the loft, a water dispenser and a wooden table at left.",
			}),
			photo("villa/dayak/06-kamar-loft", {
				id: "Kamar loft Villa Dayak di bawah atap miring bambu, dengan dua kasur lantai motif kotak dan jendela ke pepohonan.",
				en: "Villa Dayak loft room under a sloping bamboo roof, with two checked floor mattresses and a window onto the trees.",
			}),
			photo("villa/dayak/07-kamar-tidur", {
				id: "Kamar tidur Villa Dayak dengan ranjang bambu berseprai hijau limau, dinding anyaman bambu, dan langit-langit bambu.",
				en: "Villa Dayak bedroom with a bamboo bed in lime-green sheets, woven bamboo walls and a bamboo-slat ceiling.",
			}),
			photo("villa/dayak/08-kamar-mandi", {
				id: "Kamar mandi Villa Dayak berdinding batu kali dan panel hitam, dengan water heater, cermin kecil, dan ember merah.",
				en: "Villa Dayak bathroom with river-stone and black-panel walls, a water heater, a small mirror and a red bucket.",
			}),
			photo("villa/dayak/09-kolam-renang", {
				id: "Kolam renang resor berair biru dikelilingi pohon pinus dan paving batu, dengan pondok kayu di kejauhan.",
				en: "Blue resort swimming pool framed by pine trees and stone paving, with a timber hut in the distance.",
			}),
			photo("villa/dayak/10-jalan-masuk", {
				id: "Jalan paving menuju Villa Dayak beratap ilalang di antara pohon pinus dan pakis.",
				en: "Paved lane leading to the thatched Villa Dayak among pine trees and ferns.",
			}),
		],
	},
	{
		slug: "kihyang", name: "Kihyang", type: "villa", price: 4750000, paxNormal: 10, paxMax: 20,
		spec: "5 kmr tidur, 2 R kel, 2 kmd, dapur",
		tagline: T("Lima kamar untuk komunitas", "Five bedrooms for communities"),
		description: T(
			"Villa Kihyang menampung 10–20 orang dalam 5 kamar tidur, 2 ruang keluarga, 2 kamar mandi, dan dapur. Dua ruang keluarga berarti remaja dan orang tua bisa punya ruang sendiri dalam satu villa. Favorit komunitas dan gathering kantor yang butuh kapasitas besar dengan harga menengah.",
			"Villa Kihyang sleeps 10–20 across 5 bedrooms, 2 living rooms, 2 bathrooms, and a kitchen. Two living rooms mean teenagers and parents each get their own space under one roof. A favourite for communities and company gatherings needing big capacity at a middle rate.",
		),
		amenities: { id: ["5 kamar tidur", "2 ruang keluarga", "2 kamar mandi", "Dapur"], en: ["5 bedrooms", "2 living rooms", "2 bathrooms", "Kitchen"] }, hero: photo("villa/kihyang/01-tampak-depan", {
			id: "Villa Kihyang, rumah kayu bertingkat dengan tangga luar dan atap berlapis, terselip di antara pakis pohon.",
			en: "Villa Kihyang, a multi-level timber house with an outdoor stair and layered roofs, tucked among tree ferns.",
		}),
		gallery: [
			photo("villa/kihyang/02-tampak-depan-sungai", {
				id: "Villa Kihyang di balik taman tropis, dengan aliran sungai kecil dan jalan batu di depannya.",
				en: "Villa Kihyang behind a tropical garden, with a small stream and a stone path in front.",
			}),
			photo("villa/kihyang/03-tampak-samping", {
				id: "Villa Kihyang dari sisi: rumah kayu gelap berbalkon dengan tangga kayu, di bawah langit biru dan pakis.",
				en: "Side view of Villa Kihyang: a dark timber house with a balcony and wooden stair under tree ferns.",
			}),
			photo("villa/kihyang/04-tampak-taman", {
				id: "Taman rumput Villa Kihyang dengan ayunan ban dan jalan batu, di depan rumah kayu bertingkat.",
				en: "Villa Kihyang's lawn with a tyre swing and stepping stones in front of the multi-storey timber house.",
			}),
			photo("villa/kihyang/05-api-unggun-taman", {
				id: "Lingkaran api unggun dari bata dan batu dengan ban bercat sebagai tempat duduk, di taman Villa Kihyang.",
				en: "Brick-and-stone bonfire circle with painted tyre seats in the Villa Kihyang garden.",
			}),
			photo("villa/kihyang/06-ruang-keluarga", {
				id: "Ruang keluarga Villa Kihyang yang luas, berlantai dan berdinding kayu gelap, dengan pintu kamar di sisi kiri.",
				en: "Spacious living room of Villa Kihyang with dark timber floor and walls, and bedroom doors along the left side.",
			}),
			photo("villa/kihyang/07-kamar-tidur-1", {
				id: "Kamar tidur Villa Kihyang dengan ranjang berseprai hijau limau, dinding putih, panel kayu gelap, dan lukisan.",
				en: "Villa Kihyang bedroom with a lime-green bed, white walls, dark wood panelling and a painting.",
			}),
			photo("villa/kihyang/08-kamar-tidur-2", {
				id: "Kamar tidur kedua Villa Kihyang dengan ranjang hijau limau di bawah lukisan biru, dinding putih, dan kayu gelap.",
				en: "Second bedroom in Villa Kihyang with a lime-green bed beneath a blue painting, white walls and dark wood.",
			}),
			photo("villa/kihyang/09-teras-kursi", {
				id: "Teras berlantai batu pipih di Villa Kihyang dengan meja bundar dan kursi kayu di depan dinding kayu tua.",
				en: "Flagstone terrace at Villa Kihyang with a round table and wooden chairs against an aged timber wall.",
			}),
			photo("villa/kihyang/10-saung-teras", {
				id: "Saung kayu terbuka di Villa Kihyang dengan bangku bambu dan pagar rendah, menghadap taman dan pondok lain.",
				en: "Open timber pavilion at Villa Kihyang with a bamboo bench and low railing, looking onto the garden and other huts.",
			}),
			photo("villa/kihyang/11-lorong-kayu", {
				id: "Lorong panjang berlantai papan kayu mengilap di Villa Kihyang, berlangit-langit kayu dan berpintu ke kamar.",
				en: "Long corridor at Villa Kihyang with a polished plank floor, a timber ceiling and doors to the rooms.",
			}),
		],
	},
	{
		slug: "ilegole", name: "Ilegole", type: "villa", price: 2550000, paxNormal: 4, paxMax: 8,
		spec: "2 kmr tidur, 1 R kel, 1 kmd, dapur",
		tagline: T("Ringkas untuk keluarga besar", "Compact for extended families"),
		description: T(
			"Villa Ilegole ringkas tapi lapang: 2 kamar tidur, 1 ruang keluarga, dapur, dan kamar mandi untuk 4–8 orang. Cocok untuk keluarga besar tiga generasi yang mau tetap berdekatan. Halamannya dekat dengan taman bunga dan jalur jalan pagi resort.",
			"Villa Ilegole is compact yet roomy: 2 bedrooms, a living room, kitchen, and bathroom for 4–8 guests. Made for three-generation families who want to stay close. Its yard sits near the flower garden and the resort's morning-walk path.",
		),
		amenities: { id: ["2 kamar tidur", "1 ruang keluarga", "1 kamar mandi", "Dapur"], en: ["2 bedrooms", "1 living room", "1 bathroom", "Kitchen"] }, hero: photo("villa/ilegole/01-tampak-depan", {
			id: "Villa Ilegole berdinding anyaman bambu dan kayu dengan atap genteng, di taman rimbun berpakis dengan jalan batu.",
			en: "Villa Ilegole in woven bamboo and timber with a tiled roof, in a garden of tree ferns.",
		}),
		gallery: [
			photo("villa/ilegole/02-tampak-depan-2", {
				id: "Villa Ilegole yang rendah dan berdinding bambu, beratap genteng, dilihat dari samping di bawah langit biru.",
				en: "Low bamboo-walled Villa Ilegole with a tiled roof, seen from the side under a blue sky and tree ferns.",
			}),
			photo("villa/ilegole/03-teras-bunga-rambat", {
				id: "Tanaman rambat hijau dengan bunga merah dan kuning menaungi teras Villa Ilegole yang berdinding bambu.",
				en: "Green climbers with red and yellow flowers shade the porch of the bamboo-walled Villa Ilegole.",
			}),
			photo("villa/ilegole/04-teras-dalam", {
				id: "Teras dalam Villa Ilegole berlantai batu pipih, dengan tangga kayu menuju pintu dan dinding bambu.",
				en: "Inner porch of Villa Ilegole with a flagstone floor, wooden steps up to the door and bamboo walls.",
			}),
			photo("villa/ilegole/05-ruang-keluarga", {
				id: "Ruang keluarga Villa Ilegole berdinding anyaman bambu gelap, berlantai kayu, dengan lukisan bunga merah dan satu kursi.",
				en: "Villa Ilegole living room with dark woven bamboo walls, a wooden floor, a red-flower painting and an armchair.",
			}),
			photo("villa/ilegole/06-kamar-tidur", {
				id: "Kamar tidur Villa Ilegole berdinding bambu anyaman dengan ranjang bambu berseprai hijau pucat dan jendela bergorden putih.",
				en: "Villa Ilegole bedroom with woven bamboo walls, a bamboo bed in pale green linen and a white-curtained window.",
			}),
			photo("villa/ilegole/07-kamar-mandi-wastafel", {
				id: "Wastafel batu kali di kamar mandi Villa Ilegole, dengan dinding bambu dan area shower berkeramik putih.",
				en: "River-stone washbasin in Villa Ilegole's bathroom, with bamboo walls and a white-tiled shower area.",
			}),
			photo("villa/ilegole/08-taman-depan", {
				id: "Taman rumput hijau di depan Villa Ilegole, dikelilingi pakis, semak berbunga, dan pepohonan rindang.",
				en: "Green lawn in front of Villa Ilegole, bordered by ferns, flowering shrubs and leafy trees.",
			}),
			photo("villa/ilegole/09-kolam-renang", {
				id: "Kolam renang berair biru muda di depan rumah kayu beratap genteng dengan taman bunga dan pakis pohon.",
				en: "Pale blue swimming pool in front of a tiled-roof timber house, with a flower garden and tree ferns.",
			}),
		],
	},
	{
		slug: "kisampang", name: "Kisampang", type: "villa", price: 3850000, paxNormal: 6, paxMax: 12,
		spec: "3 kmr tidur, 3 kmd, dapur & R kel",
		tagline: T("Tiga kamar, tiga kamar mandi", "Three bedrooms, three bathrooms"),
		description: T(
			"Villa Kisampang memberi tiap kamar kenyamanan sendiri: 3 kamar tidur dengan 3 kamar mandi, plus dapur dan ruang keluarga. Kapasitas 6–12 orang, pas untuk tiga keluarga yang liburan bareng tanpa antre kamar mandi pagi hari. Letaknya tenang di antara pepohonan resort.",
			"Villa Kisampang gives every bedroom its own comfort: 3 bedrooms with 3 bathrooms, plus kitchen and living room. Sleeping 6–12, it suits three families holidaying together with no morning bathroom queues. Set quietly among the resort's trees.",
		),
		amenities: { id: ["3 kamar tidur", "3 kamar mandi", "Dapur", "Ruang keluarga"], en: ["3 bedrooms", "3 bathrooms", "Kitchen", "Living room"] }, hero: photo("villa/kisampang/01-tampak-depan", {
			id: "Tampak depan Villa Kisampang, rumah kayu beratap genteng dengan tangga batu kecil, dikelilingi pakis dan tanaman hijau.",
			en: "Front of Villa Kisampang, a tiled-roof timber house with a small stair, surrounded by ferns and greenery.",
		}),
		gallery: [
			photo("villa/kisampang/02-halaman-depan", {
				id: "Halaman berbatu dan berumput di depan Villa Kisampang, dikelilingi tanaman rimbun di bawah pepohonan.",
				en: "Cobbled and grassy yard in front of Villa Kisampang, ringed by dense plants under tall trees.",
			}),
			photo("villa/kisampang/03-tampak-kabut", {
				id: "Villa Kisampang diselimuti kabut pagi, dengan taman bunga bundar dan jalan batu di depannya.",
				en: "Villa Kisampang wrapped in morning mist, with a round flower bed and a stone path in front.",
			}),
			photo("villa/kisampang/04-ruang-keluarga", {
				id: "Ruang keluarga Villa Kisampang berlantai kayu gelap dengan sofa motif, gorden putih, dan jendela tinggi ke hutan.",
				en: "Villa Kisampang living room with a dark timber floor, a patterned sofa, white curtains and tall windows to the forest.",
			}),
			photo("villa/kisampang/05-ruang-makan", {
				id: "Ruang makan Villa Kisampang dengan kursi rotan, meja kayu, lukisan, dan rangka atap kayu di atas dinding bata merah.",
				en: "Villa Kisampang dining area with rattan chairs, a wooden table, a painting and an exposed timber roof frame.",
			}),
			photo("villa/kisampang/06-kamar-tidur-1", {
				id: "Kamar tidur Villa Kisampang berdinding bata merah dengan ranjang kayu gelondongan berseprai bunga dan jendela ke hutan.",
				en: "Villa Kisampang bedroom with red brick walls, a log-frame bed in floral sheets and windows to the forest.",
			}),
			photo("villa/kisampang/07-kamar-tidur-2", {
				id: "Kamar tidur Villa Kisampang dengan ranjang kayu bulat berseprai hitam, kursi putih, dan jendela lebar bergorden putih.",
				en: "Villa Kisampang bedroom with a round-log bed in black linen, a white armchair and wide white-curtained windows.",
			}),
			photo("villa/kisampang/08-kamar-tidur-3", {
				id: "Kamar tidur Villa Kisampang dengan ranjang kayu berseprai hijau, dinding bata merah, lukisan, dan pintu kayu besar.",
				en: "Villa Kisampang bedroom with a wooden bed in green linen, red brick walls, a painting and a large timber door.",
			}),
			photo("villa/kisampang/09-ruang-jendela", {
				id: "Sudut ruang Villa Kisampang berlantai kayu dengan jendela kaca di dua sisi dan gorden putih yang terikat.",
				en: "A corner room at Villa Kisampang with a timber floor, glass windows on two sides and tied white curtains.",
			}),
		],
	},
	{
		slug: "pinus", name: "Pinus", type: "villa", price: 3850000, paxNormal: 6, paxMax: 12,
		spec: "3 kmr tidur, 2 kmd, dapur & R kel",
		tagline: T("Bertingkat di antara pinus", "Split-level among the pines"),
		description: T(
			"Villa Pinus berdiri bertingkat dengan 3 kamar tidur, 2 kamar mandi, dapur, dan ruang keluarga untuk 6–12 orang. Anak-anak biasanya langsung jatuh cinta pada sudut-sudutnya yang bertingkat, sementara orang tua menikmati sejuknya udara sore. Salah satu villa yang paling sering direkomendasikan tamu yang kembali.",
			"Villa Pinus is a split-level building with 3 bedrooms, 2 bathrooms, kitchen, and living room for 6–12 guests. Kids usually fall for its nooks and levels right away, while parents enjoy the cool afternoon air. One of the villas returning guests recommend most.",
		),
		amenities: { id: ["3 kamar tidur", "2 kamar mandi", "Dapur", "Ruang keluarga"], en: ["3 bedrooms", "2 bathrooms", "Kitchen", "Living room"] }, hero: photo("villa/pinus/01-tampak-depan", {
			id: "Tampak depan Villa Pinus: pondok kayu beratap genteng dengan jendela segitiga, pintu ganda, dan taman bunga.",
			en: "Front of Villa Pinus: a timber cottage with a tiled roof, a triangular window, double doors and a flower garden.",
		}),
		gallery: [
			photo("villa/pinus/02-tampak-dua-lantai", {
				id: "Villa Pinus dua lantai berdinding batu dan kayu di balik pakis besar dan semak hijau.",
				en: "Two-storey Villa Pinus in stone and timber behind a large fern and green shrubs.",
			}),
			photo("villa/pinus/03-tampak-samping", {
				id: "Villa Pinus dari samping, pondok kayu beratap genteng di antara pinus, dengan halaman tanah di depannya.",
				en: "Villa Pinus from the side, a tiled-roof timber cottage among pines with a dirt yard in front.",
			}),
			photo("villa/pinus/04-teras", {
				id: "Teras Villa Pinus dengan pintu ganda kayu, kursi ukir, tiang batang pohon, dan semak berdaun merah.",
				en: "Villa Pinus porch with double timber doors, a carved chair, a tree-trunk post and red-leafed shrubs.",
			}),
			photo("villa/pinus/05-ruang-keluarga-bambu", {
				id: "Ruang keluarga Villa Pinus berlangit-langit anyaman bambu, dengan dua jendela bergorden putih ke arah taman.",
				en: "Villa Pinus living room under a woven-bamboo ceiling, with two white-curtained windows onto the garden.",
			}),
			photo("villa/pinus/06-kamar-tidur-1", {
				id: "Kamar tidur Villa Pinus berdinding putih dengan ranjang berseprai hijau, lantai ubin terakota, dan pintu kayu.",
				en: "Villa Pinus bedroom with white walls, a bed in green linen, a terracotta tile floor and a timber door.",
			}),
			photo("villa/pinus/07-kamar-tidur-2", {
				id: "Kamar tidur Villa Pinus berdinding bata merah dengan ranjang hijau limau, lukisan abstrak, dan lantai kayu.",
				en: "Villa Pinus bedroom with red brick walls, a lime-green bed, an abstract painting and a wooden floor.",
			}),
			photo("villa/pinus/08-kamar-loft", {
				id: "Kamar loft Villa Pinus di bawah atap miring anyaman bambu, dengan ranjang kayu gelondongan berseprai hijau muda.",
				en: "Villa Pinus loft room under a sloping woven-bamboo roof, with a log-frame bed in pale green linen.",
			}),
			photo("villa/pinus/09-kamar-tidur-3", {
				id: "Kamar tidur Villa Pinus dengan ranjang kayu berseprai hijau muda, dinding bata merah, lukisan biru, dan pintu kayu.",
				en: "Villa Pinus bedroom with a wooden bed in pale green linen, red brick walls, a blue painting and a door.",
			}),
			photo("villa/pinus/10-kamar-mandi-batu", {
				id: "Kamar mandi Villa Pinus berdinding batu alam dengan shower, toilet duduk, dan lubang angin berpola di atasnya.",
				en: "Villa Pinus bathroom with natural stone walls, a shower, a toilet and a patterned vent above.",
			}),
		],
	},
	{
		slug: "puspa-a", name: "Puspa A", type: "villa", price: 1250000, paxNormal: 4, paxMax: 8,
		spec: "2 kmr tidur, teras, 2 kmd (hanya kamar)",
		tagline: T("Mungil untuk kabur berdua", "Small for a couple's escape"),
		description: T(
			"Villa Puspa A mungil dan tenang: 2 kamar tidur, teras, dan 2 kamar mandi untuk 4–8 orang. Paling cocok untuk pasangan atau keluarga kecil yang mau kabur dari bising kota tanpa anggaran besar. Sore hari di teras Puspa, ditemani suara serangga dan udara gunung, adalah definisi liburan pelan.",
			"Villa Puspa A is small and quiet: 2 bedrooms, a terrace, and 2 bathrooms for 4–8 guests. Best for couples or small families escaping city noise on a modest budget. An afternoon on Puspa's terrace, insects humming, mountain air cool, is the definition of a slow holiday.",
		),
		amenities: { id: ["2 kamar tidur", "2 kamar mandi", "Teras"], en: ["2 bedrooms", "2 bathrooms", "Terrace"] }, hero: photo("villa/puspa-a/01-lorong-pintu-kamar", {
			id: "Lorong batu di Villa Puspa A dengan dua pintu kamar berdampingan, tiang kayu bercabang, dan bunga heliconia di rak kayu.",
			en: "Stone-walled corridor at Villa Puspa A with two bedroom doors, branching timber posts and heliconia flowers on a shelf.",
		}),
		gallery: [
			photo("villa/puspa-a/02-teras-pagar-bambu", {
				id: "Teras panjang Villa Puspa A beratap ilalang dengan pagar bambu bulat dan jalan batu pipih di sampingnya.",
				en: "Long porch at Villa Puspa A under a thatched roof with a round-bamboo railing and a flagstone path beside it.",
			}),
			photo("villa/puspa-a/03-teras-bunga", {
				id: "Teras Villa Puspa A berdinding batu dengan meja dan bangku kayu akar, serta heliconia kuning di dalam vas.",
				en: "Stone-walled porch at Villa Puspa A with root-wood table and benches and yellow heliconia in a vase.",
			}),
			photo("villa/puspa-a/04-teras-kursi-batu", {
				id: "Teras Villa Puspa A dengan bangku kayu bulat, meja kayu alami, pintu kamar, dan dinding batu.",
				en: "Porch of Villa Puspa A with a round-log bench, a natural-edge wood table, a bedroom door and a stone wall.",
			}),
			photo("villa/puspa-a/05-kamar-tidur-1", {
				id: "Kamar tidur Villa Puspa A berdinding anyaman bambu dengan ranjang berseprai kuning-hijau dan kamar mandi di sisi kanan.",
				en: "Bedroom in Villa Puspa A with woven bamboo walls, a yellow-green bed and the bathroom on the right.",
			}),
			photo("villa/puspa-a/06-kamar-tidur-2", {
				id: "Kamar tidur kedua Villa Puspa A dengan dinding anyaman bambu, ranjang kayu bulat berseprai hijau, dan gorden putih.",
				en: "Second bedroom in Villa Puspa A with woven bamboo walls, a round-log bed in green linen and a white curtain.",
			}),
			photo("villa/puspa-a/07-kamar-tidur-hijau", {
				id: "Dua bantal dan seprai hijau segar di atas ranjang bambu Villa Puspa A, dilihat dari dekat.",
				en: "Close view of two pillows and fresh green sheets on the bamboo bed in Villa Puspa A.",
			}),
			photo("villa/puspa-a/08-taman-pinus", {
				id: "Taman Villa Puspa A di bawah pohon pinus, dengan deretan tanaman daun merah muda dan pondok ilalang di belakang.",
				en: "Garden at Villa Puspa A under pine trees, with a border of pink-and-green foliage and a thatched hut behind.",
			}),
			photo("villa/puspa-a/09-tampak-depan", {
				id: "Tampak depan Villa Puspa A: pondok dua tingkat beratap ilalang dengan pagar bambu bulat, dinaungi pakis pohon.",
				en: "Front of Villa Puspa A: a two-tier thatched cottage with a round-bamboo railing, shaded by a tree fern.",
			}),
		],
	},
	{
		slug: "puspa-b", name: "Puspa B", type: "villa", price: 1250000, paxNormal: 4, paxMax: 8,
		spec: "2 kmr tidur, teras, 2 kmd (hanya kamar)",
		tagline: T("Mungil untuk kabur berdua", "Small for a couple's escape"),
		description: T(
			"Villa Puspa B mungil dan tenang: 2 kamar tidur, teras, dan 2 kamar mandi untuk 4–8 orang. Paling cocok untuk pasangan atau keluarga kecil yang mau kabur dari bising kota tanpa anggaran besar. Sore hari di teras Puspa, ditemani suara serangga dan udara gunung, adalah definisi liburan pelan.",
			"Villa Puspa B is small and quiet: 2 bedrooms, a terrace, and 2 bathrooms for 4–8 guests. Best for couples or small families escaping city noise on a modest budget. An afternoon on Puspa's terrace, insects humming, mountain air cool, is the definition of a slow holiday.",
		),
		amenities: { id: ["2 kamar tidur", "2 kamar mandi", "Teras"], en: ["2 bedrooms", "2 bathrooms", "Terrace"] }, hero: photo("villa/puspa-b/01-lorong-pintu-kamar", {
			id: "Lorong batu di Villa Puspa B dengan dua pintu kamar berdampingan, tiang kayu bercabang, dan bunga heliconia di rak kayu.",
			en: "Stone-walled corridor at Villa Puspa B with two bedroom doors, branching timber posts and heliconia flowers on a shelf.",
		}),
		gallery: [
			photo("villa/puspa-b/02-teras-pagar-bambu", {
				id: "Teras panjang Villa Puspa B beratap ilalang dengan pagar bambu bulat dan jalan batu pipih di sampingnya.",
				en: "Long porch at Villa Puspa B under a thatched roof with a round-bamboo railing and a flagstone path beside it.",
			}),
			photo("villa/puspa-b/03-teras-bunga", {
				id: "Teras Villa Puspa B berdinding batu dengan meja dan bangku kayu akar, serta heliconia kuning di dalam vas.",
				en: "Stone-walled porch at Villa Puspa B with root-wood table and benches and yellow heliconia in a vase.",
			}),
			photo("villa/puspa-b/04-teras-kursi-batu", {
				id: "Teras Villa Puspa B dengan bangku kayu bulat, meja kayu alami, pintu kamar, dan dinding batu.",
				en: "Porch of Villa Puspa B with a round-log bench, a natural-edge wood table, a bedroom door and a stone wall.",
			}),
			photo("villa/puspa-b/05-kamar-tidur-1", {
				id: "Kamar tidur Villa Puspa B berdinding anyaman bambu dengan ranjang berseprai kuning-hijau dan kamar mandi di sisi kanan.",
				en: "Bedroom in Villa Puspa B with woven bamboo walls, a yellow-green bed and the bathroom on the right.",
			}),
			photo("villa/puspa-b/06-kamar-tidur-2", {
				id: "Kamar tidur kedua Villa Puspa B dengan dinding anyaman bambu, ranjang kayu bulat berseprai hijau, dan gorden putih.",
				en: "Second bedroom in Villa Puspa B with woven bamboo walls, a round-log bed in green linen and a white curtain.",
			}),
			photo("villa/puspa-b/07-kamar-tidur-hijau", {
				id: "Dua bantal dan seprai hijau segar di atas ranjang bambu Villa Puspa B, dilihat dari dekat.",
				en: "Close view of two pillows and fresh green sheets on the bamboo bed in Villa Puspa B.",
			}),
			photo("villa/puspa-b/08-taman-pinus", {
				id: "Taman Villa Puspa B di bawah pohon pinus, dengan deretan tanaman daun merah muda dan pondok ilalang di belakang.",
				en: "Garden at Villa Puspa B under pine trees, with a border of pink-and-green foliage and a thatched hut behind.",
			}),
			photo("villa/puspa-b/09-tampak-depan", {
				id: "Tampak depan Villa Puspa B: pondok dua tingkat beratap ilalang dengan pagar bambu bulat, dinaungi pakis pohon.",
				en: "Front of Villa Puspa B: a two-tier thatched cottage with a round-bamboo railing, shaded by a tree fern.",
			}),
		],
	},
	{
		slug: "puspa-c", name: "Puspa C", type: "villa", price: 1250000, paxNormal: 4, paxMax: 8,
		spec: "2 kmr tidur, teras, 2 kmd (hanya kamar)",
		tagline: T("Mungil untuk kabur berdua", "Small for a couple's escape"),
		description: T(
			"Villa Puspa C mungil dan tenang: 2 kamar tidur, teras, dan 2 kamar mandi untuk 4–8 orang. Paling cocok untuk pasangan atau keluarga kecil yang mau kabur dari bising kota tanpa anggaran besar. Sore hari di teras Puspa, ditemani suara serangga dan udara gunung, adalah definisi liburan pelan.",
			"Villa Puspa C is small and quiet: 2 bedrooms, a terrace, and 2 bathrooms for 4–8 guests. Best for couples or small families escaping city noise on a modest budget. An afternoon on Puspa's terrace, insects humming, mountain air cool, is the definition of a slow holiday.",
		),
		amenities: { id: ["2 kamar tidur", "2 kamar mandi", "Teras"], en: ["2 bedrooms", "2 bathrooms", "Terrace"] }, hero: photo("villa/puspa-c/01-lorong-pintu-kamar", {
			id: "Lorong batu di Villa Puspa C dengan dua pintu kamar berdampingan, tiang kayu bercabang, dan bunga heliconia di rak kayu.",
			en: "Stone-walled corridor at Villa Puspa C with two bedroom doors, branching timber posts and heliconia flowers on a shelf.",
		}),
		gallery: [
			photo("villa/puspa-c/02-teras-pagar-bambu", {
				id: "Teras panjang Villa Puspa C beratap ilalang dengan pagar bambu bulat dan jalan batu pipih di sampingnya.",
				en: "Long porch at Villa Puspa C under a thatched roof with a round-bamboo railing and a flagstone path beside it.",
			}),
			photo("villa/puspa-c/03-teras-bunga", {
				id: "Teras Villa Puspa C berdinding batu dengan meja dan bangku kayu akar, serta heliconia kuning di dalam vas.",
				en: "Stone-walled porch at Villa Puspa C with root-wood table and benches and yellow heliconia in a vase.",
			}),
			photo("villa/puspa-c/04-teras-kursi-batu", {
				id: "Teras Villa Puspa C dengan bangku kayu bulat, meja kayu alami, pintu kamar, dan dinding batu.",
				en: "Porch of Villa Puspa C with a round-log bench, a natural-edge wood table, a bedroom door and a stone wall.",
			}),
			photo("villa/puspa-c/05-kamar-tidur-1", {
				id: "Kamar tidur Villa Puspa C berdinding anyaman bambu dengan ranjang berseprai kuning-hijau dan kamar mandi di sisi kanan.",
				en: "Bedroom in Villa Puspa C with woven bamboo walls, a yellow-green bed and the bathroom on the right.",
			}),
			photo("villa/puspa-c/06-kamar-tidur-2", {
				id: "Kamar tidur kedua Villa Puspa C dengan dinding anyaman bambu, ranjang kayu bulat berseprai hijau, dan gorden putih.",
				en: "Second bedroom in Villa Puspa C with woven bamboo walls, a round-log bed in green linen and a white curtain.",
			}),
			photo("villa/puspa-c/07-kamar-tidur-hijau", {
				id: "Dua bantal dan seprai hijau segar di atas ranjang bambu Villa Puspa C, dilihat dari dekat.",
				en: "Close view of two pillows and fresh green sheets on the bamboo bed in Villa Puspa C.",
			}),
			photo("villa/puspa-c/08-taman-pinus", {
				id: "Taman Villa Puspa C di bawah pohon pinus, dengan deretan tanaman daun merah muda dan pondok ilalang di belakang.",
				en: "Garden at Villa Puspa C under pine trees, with a border of pink-and-green foliage and a thatched hut behind.",
			}),
			photo("villa/puspa-c/09-tampak-depan", {
				id: "Tampak depan Villa Puspa C: pondok dua tingkat beratap ilalang dengan pagar bambu bulat, dinaungi pakis pohon.",
				en: "Front of Villa Puspa C: a two-tier thatched cottage with a round-bamboo railing, shaded by a tree fern.",
			}),
		],
	},
	{
		slug: "batarua", name: "Batarua", type: "villa", price: 3850000, paxNormal: 6, paxMax: 10,
		spec: "3 kmr tidur, 2 kmd, dapur & R kel",
		tagline: T("Seimbang untuk dua keluarga", "Balanced for two families"),
		description: T(
			"Villa Batarua seimbang untuk 6–10 orang: 3 kamar tidur, 2 kamar mandi, dapur, dan ruang keluarga. Dua keluarga bisa berbagi dapur dan ruang kumpul tanpa sempit. Lokasinya strategis, dekat ke area parkir sekaligus jalur menuju taman resort.",
			"Villa Batarua balances 6–10 guests: 3 bedrooms, 2 bathrooms, kitchen, and living room. Two families can share the kitchen and gathering space without crowding. Handily located, near parking and the path to the resort gardens.",
		),
		amenities: { id: ["3 kamar tidur", "2 kamar mandi", "Dapur", "Ruang keluarga"], en: ["3 bedrooms", "2 bathrooms", "Kitchen", "Living room"] }, hero: photo("villa/batarua/01-tampak-depan", {
			id: "Tampak depan Villa Batarua dengan pintu ganda kayu, atap genteng merah, kursi kayu di teras, dan taman kecil.",
			en: "Front of Villa Batarua with double wooden doors, a red tile roof, rustic porch seats and a small garden.",
		}),
		gallery: [
			photo("villa/batarua/02-teras", {
				id: "Teras Villa Batarua dengan bangku dan kursi kayu gelondongan, dinding batu kali, dan pintu kaca patri.",
				en: "Villa Batarua porch with log benches and chairs, a river-stone wall and a stained-glass door.",
			}),
			photo("villa/batarua/03-tangga-kayu", {
				id: "Ruang dalam Villa Batarua dengan tangga kayu melingkar ke loft, dinding bata merah, dan lantai terakota.",
				en: "Villa Batarua interior with a curving log staircase up to the loft, red brick walls and terracotta floors.",
			}),
			photo("villa/batarua/04-ruang-keluarga", {
				id: "Ruang keluarga Villa Batarua dengan sofa anyaman, kursi kayu, jendela besar bergorden, dan tangga di kanan.",
				en: "Living room of Villa Batarua with a woven-fabric sofa, a wooden armchair, big curtained windows and stairs at right.",
			}),
			photo("villa/batarua/05-kamar-tidur-1", {
				id: "Kamar tidur Villa Batarua dengan dinding bata merah, ranjang berseprai hijau muda, dan lukisan di dinding.",
				en: "Bedroom in Villa Batarua with red brick walls, a bed in light green sheets and a painting on the wall.",
			}),
			photo("villa/batarua/06-kamar-tidur-2", {
				id: "Kamar tidur kedua Villa Batarua dengan ranjang kayu gelondongan berseprai putih dan gorden cokelat di jendela.",
				en: "Second bedroom in Villa Batarua with a log-frame bed in white sheets and brown curtains at the window.",
			}),
			photo("villa/batarua/07-kamar-tidur-3", {
				id: "Kamar tidur ketiga Villa Batarua: ranjang kayu bulat, bantal hijau, lukisan lanskap hijau, dan cermin berbingkai kayu.",
				en: "Third bedroom of Villa Batarua: a round-log bed, green pillows, a green landscape painting and a wood-framed mirror.",
			}),
			photo("villa/batarua/08-ruang-tangga", {
				id: "Dari pintu kaca patri Villa Batarua terlihat sofa dan tangga kayu melingkar menuju loft.",
				en: "Through the stained-glass door of Villa Batarua you see the sofa and the spiral log staircase up to the loft.",
			}),
		],
	},
	{
		slug: "gaharu", name: "Gaharu", type: "villa", price: 3500000, paxNormal: 6, paxMax: 7,
		spec: "2 kmr tidur, 2 ext bed, 1 kmd, dapur & R Kel",
		tagline: T("Extra bed untuk tim kecil", "Extra beds for small teams"),
		description: T(
			"Villa Gaharu dirancang fleksibel: 2 kamar tidur plus 2 extra bed, dapur, ruang keluarga, dan kamar mandi untuk 6–7 orang. Extra bed-nya menyelamatkan tim kecil atau keluarga yang jumlahnya tanggung. Ruang keluarganya luas, cukup untuk briefing pagi sebelum outbound.",
			"Villa Gaharu is flexibly arranged: 2 bedrooms plus 2 extra beds, kitchen, living room, and bathroom for 6–7 guests. The extra beds save small teams or odd-numbered families. Its living room is generous, big enough for a morning briefing before outbound.",
		),
		amenities: { id: ["2 kamar tidur", "2 extra bed", "1 kamar mandi", "Dapur", "Ruang keluarga"], en: ["2 bedrooms", "2 extra beds", "1 bathroom", "Kitchen", "Living room"] }, hero: photo("villa/gaharu/01-tampak-malam", {
			id: "Villa Gaharu, rumah panggung kayu yang menyala hangat di malam hari dengan tangga luar, di antara pohon pinus.",
			en: "Villa Gaharu, a timber stilt house glowing warmly at night with an outdoor stair, among pine trees.",
		}),
		gallery: [
			photo("villa/gaharu/02-tampak-siang", {
				id: "Villa Gaharu dua lantai berbalkon kayu di antara pohon pinus dan taman pakis dengan bunga merah.",
				en: "Two-storey Villa Gaharu with a wooden balcony among pine trees and a fern garden with red flowers.",
			}),
			photo("villa/gaharu/03-tampak-samping-pinus", {
				id: "Sisi Villa Gaharu yang bertumpu pada panggung kayu dengan jendela kaca lebar, berdiri di antara batang pinus.",
				en: "Side of Villa Gaharu raised on timber stilts, with wide glass windows, standing among pine trunks.",
			}),
			photo("villa/gaharu/04-taman-meja-makan", {
				id: "Meja makan dan kursi di bawah payung di taman Villa Gaharu, dikelilingi tanaman hijau.",
				en: "Dining table and chairs under an umbrella in Villa Gaharu's garden, surrounded by greenery.",
			}),
			photo("villa/gaharu/05-balkon", {
				id: "Balkon luas berlantai kayu di Villa Gaharu dengan meja makan, kursi, dan pagar kayu yang menghadap pinus.",
				en: "Wide wood-floored balcony at Villa Gaharu with a dining table, chairs and a railing facing the pines.",
			}),
			photo("villa/gaharu/06-tangga", {
				id: "Tangga kayu luar menuju lantai atas Villa Gaharu, bersebelahan jendela kayu, di antara pepohonan.",
				en: "Outdoor timber stair up to Villa Gaharu's upper floor, beside wooden windows, among the trees.",
			}),
			photo("villa/gaharu/07-kamar-tidur-1", {
				id: "Kamar tidur Villa Gaharu berdinding papan kayu dengan ranjang berseprai ungu bergaris, bantal hijau, dan jendela lebar.",
				en: "Villa Gaharu bedroom with plank walls, a bed in striped purple linen, green pillows and wide windows.",
			}),
			photo("villa/gaharu/08-kamar-tidur-2", {
				id: "Kamar tidur kedua Villa Gaharu dengan selimut putih tebal, seprai kotak-kotak, gorden bunga, dan jendela ke arah hutan.",
				en: "Second bedroom of Villa Gaharu with a thick white duvet, checked bedding, floral curtains and windows to the forest.",
			}),
			photo("villa/gaharu/09-kamar-loft", {
				id: "Kamar loft Villa Gaharu dengan dua kasur lantai, sofa hijau tua, meja kayu, dan jendela lebar di malam hari.",
				en: "Villa Gaharu loft room with two floor mattresses, a dark teal sofa, a wooden desk and wide windows at night.",
			}),
			photo("villa/gaharu/10-kamar-tidur-3", {
				id: "Kamar tidur Villa Gaharu beratap miring dengan ranjang berseprai biru bergaris dan jendela bergorden bunga.",
				en: "Villa Gaharu bedroom under a sloped timber ceiling, with a blue-striped bed and floral-curtained windows.",
			}),
			photo("villa/gaharu/11-kamar-mandi", {
				id: "Kamar mandi Villa Gaharu berdinding motif batu krem dengan wastafel, toilet duduk, dan cermin berbingkai ukir.",
				en: "Villa Gaharu bathroom with cream stone-effect walls, a sink, a toilet and a carved-frame mirror.",
			}),
		],
	},
	{
		slug: "mindi", name: "Mindi", type: "villa", price: 4100000, paxNormal: 8, paxMax: 12,
		spec: "4 kmr tidur, 3 kmd, Dapur & R Kel",
		tagline: T("Empat kamar serba cukup", "Four bedrooms, everything covered"),
		description: T(
			"Villa Mindi serba cukup untuk 8–12 orang: 4 kamar tidur, 3 kamar mandi, dapur, dan ruang keluarga. Komposisi yang adil untuk gathering, tidak ada yang kebagian kamar kurang nyaman. Malam hari, ruang keluarganya muat untuk makan bersama satu rombongan.",
			"Villa Mindi covers everything for 8–12 guests: 4 bedrooms, 3 bathrooms, kitchen, and living room. A fair layout for gatherings, nobody draws the short straw on rooms. At night, the living room fits the whole group for dinner together.",
		),
		amenities: { id: ["4 kamar tidur", "3 kamar mandi", "Dapur", "Ruang keluarga"], en: ["4 bedrooms", "3 bathrooms", "Kitchen", "Living room"] }, hero: photo("villa/mindi/01-tampak-depan", {
			id: "Tampak depan Villa Mindi, rumah kayu panjang berteras di balik pakis pohon, dengan tangga batu di tengah.",
			en: "Front of Villa Mindi, a long timber house with a porch behind tree ferns and a central stone stair.",
		}),
		gallery: [
			photo("villa/mindi/02-halaman-depan", {
				id: "Halaman tanah luas di depan Villa Mindi yang beratap lebar, dengan tangga bata dan pakis pohon di sekelilingnya.",
				en: "Open yard in front of the broad-roofed Villa Mindi, with a brick stair and tree ferns around it.",
			}),
			photo("villa/mindi/03-teras-samping", {
				id: "Teras samping Villa Mindi berlantai ubin terakota dengan dua kursi lipat, dinding bata dan kayu, serta pakis pohon.",
				en: "Side porch of Villa Mindi with a terracotta tile floor, two folding chairs, brick and wood walls and tree ferns.",
			}),
			photo("villa/mindi/04-ruang-keluarga", {
				id: "Ruang keluarga Villa Mindi yang luas berlantai kayu mengilap, berjendela kaca lebar, dengan meja kayu di ujung.",
				en: "Villa Mindi's wide living space with a polished timber floor, large glass windows and a table at the far end.",
			}),
			photo("villa/mindi/05-teras-kayu", {
				id: "Teras beratap anyaman bambu di Villa Mindi dengan meja makan kayu dan bangku, terlihat dari balik sekat kayu.",
				en: "Villa Mindi porch under a woven-bamboo ceiling with a wooden dining table and benches, seen past a timber screen.",
			}),
			photo("villa/mindi/06-kamar-tidur-1", {
				id: "Kamar tidur Villa Mindi berdinding bata merah dengan ranjang berseprai hijau limau, lukisan, dan jendela bergorden krem.",
				en: "Villa Mindi bedroom with red brick walls, a lime-green bed, a painting and cream-curtained windows.",
			}),
			photo("villa/mindi/07-kamar-tidur-2", {
				id: "Kamar tidur Villa Mindi berpanel kayu dengan ranjang berseprai hijau limau, pintu kayu besar, dan jendela bergorden.",
				en: "Villa Mindi bedroom with wood panelling, a lime-green bed, a big timber door and curtained windows.",
			}),
			photo("villa/mindi/08-dapur", {
				id: "Dapur Villa Mindi berdinding bata merah dengan kompor dua tungku, bak cuci kecil, dan sekat kayu berlubang.",
				en: "Villa Mindi kitchen with red brick walls, a two-burner hob, a small sink and a slatted timber screen.",
			}),
			photo("villa/mindi/09-kamar-mandi", {
				id: "Kamar mandi Villa Mindi berdinding keramik terakota dengan toilet, wastafel kecil, shower, dan ember merah.",
				en: "Villa Mindi bathroom with terracotta tiled walls, a toilet, a small basin, a shower and a red bucket.",
			}),
		],
	},
	{
		slug: "kilanang", name: "Kilanang", type: "villa", price: 6750000, paxNormal: 10, paxMax: 12,
		spec: "5 kmr tidur, 6 kmd, Dapur & R kel & R Makan",
		tagline: T("Premium dengan ruang makan", "Premium with a dining room"),
		description: T(
			"Villa Kilanang adalah kasta premium Pondok Rasamala: 5 kamar tidur, 6 kamar mandi, dapur, ruang keluarga, dan ruang makan khusus untuk 10–12 orang. Setiap kamar praktis punya kamar mandi sendiri, kenyamanan setara hotel di tengah hutan. Dipilih untuk gathering direksi, keluarga besar, dan tamu yang mau yang terbaik.",
			"Villa Kilanang is Pondok Rasamala's premium tier: 5 bedrooms, 6 bathrooms, kitchen, living room, and a dedicated dining room for 10–12 guests. Nearly every bedroom has its own bathroom, hotel comfort deep in the forest. Chosen for board gatherings, big families, and guests who want the best.",
		),
		amenities: { id: ["5 kamar tidur", "6 kamar mandi", "Dapur", "Ruang keluarga", "Ruang makan"], en: ["5 bedrooms", "6 bathrooms", "Kitchen", "Living room", "Dining room"] }, hero: photo("villa/kilanang/01-tampak-depan", {
			id: "Tampak depan Villa Kilanang dua lantai dengan dinding bata merah, atap genteng, dan jendela kaca lebar di atas.",
			en: "Front of two-storey Villa Kilanang with red brick walls, a tiled roof and wide glass windows upstairs.",
		}),
		gallery: [
			photo("villa/kilanang/02-tampak-samping", {
				id: "Sisi Villa Kilanang dengan teras bata dan kayu, jendela besar bergorden, dan atap segitiga di lantai atas.",
				en: "Side of Villa Kilanang with a brick-and-timber porch, large curtained windows and a gabled upper floor.",
			}),
			photo("villa/kilanang/03-ruang-keluarga", {
				id: "Ruang keluarga Villa Kilanang berpanel kayu dan berdinding bata, dengan lukisan, meja rendah, dan lantai kayu terang.",
				en: "Villa Kilanang living room with wood panelling and brick walls, paintings, a low table and a light wood floor.",
			}),
			photo("villa/kilanang/04-ruang-sofa", {
				id: "Sofa panjang berkain motif di ruang keluarga Villa Kilanang, dengan gorden cokelat dan jendela ke arah kebun.",
				en: "Long patterned sofa in Villa Kilanang's living room, with brown curtains and windows onto the greenery.",
			}),
			photo("villa/kilanang/05-saung-dapur-makan", {
				id: "Saung dapur dan makan Villa Kilanang beratap kayu dengan meja panjang, bangku, kompor, bak cuci, dan dispenser.",
				en: "Kitchen and dining pavilion at Villa Kilanang with a long table, benches, hob, sink and water dispenser.",
			}),
			photo("villa/kilanang/06-kamar-tidur-1", {
				id: "Kamar tidur Villa Kilanang dengan ranjang besar berseprai putih, satu kasur tunggal, dinding bata, dan lukisan.",
				en: "Villa Kilanang bedroom with a large bed in white linen, a single bed, brick walls and a painting.",
			}),
			photo("villa/kilanang/07-kamar-tidur-2", {
				id: "Kamar tidur Villa Kilanang dengan dua ranjang rendah berseprai putih, jendela lebar bergorden, dan lantai papan.",
				en: "Villa Kilanang bedroom with two low beds in white linen, wide curtained windows and a plank floor.",
			}),
			photo("villa/kilanang/08-kamar-tidur-3", {
				id: "Kamar tidur Villa Kilanang dengan satu ranjang besar, dinding bata merah, lukisan berwarna, dan jendela ke hutan.",
				en: "Villa Kilanang bedroom with one large bed, red brick walls, a colourful painting and windows to the forest.",
			}),
			photo("villa/kilanang/09-kamar-mandi", {
				id: "Kamar mandi Villa Kilanang berdinding bata dan panel kayu dengan wastafel kecil, toilet, dan ember merah.",
				en: "Villa Kilanang bathroom with brick and wood-panel walls, a small basin, a toilet and a red bucket.",
			}),
			photo("villa/kilanang/10-kamar-mandi-2", {
				id: "Kamar mandi kedua Villa Kilanang dengan wastafel putih, cermin bulat, shower, dan jendela menghadap hutan.",
				en: "Second bathroom at Villa Kilanang with a white basin, a round mirror, a shower and a window onto the forest.",
			}),
			photo("villa/kilanang/11-koridor-lantai-atas", {
				id: "Koridor lantai atas Villa Kilanang berdinding kayu dan bata, berlukisan bunga merah muda, dengan pintu kaca bergorden di ujung.",
				en: "Upstairs corridor of Villa Kilanang with wood and brick walls, a pink flower painting and curtained glass doors.",
			}),
		],
	},
	{
		slug: "kimerak", name: "Kimerak", type: "villa", price: 3950000, paxNormal: 6, paxMax: 7,
		spec: "3 kmr tidur, 2 kmd, R kel, Teras, dapur",
		tagline: T("Teras luas menghadap hijau", "Wide terrace facing the green"),
		description: T(
			"Villa Kimerak punya 3 kamar tidur, 2 kamar mandi, ruang keluarga, dapur, dan teras luas untuk 6–7 orang. Terasnya menghadap ke hijaunya resort, tempat terbaik untuk kopi pagi sebelum aktivitas. Ukurannya pas untuk gathering kecil yang ingin suasana villa besar.",
			"Villa Kimerak offers 3 bedrooms, 2 bathrooms, a living room, kitchen, and a wide terrace for 6–7 guests. The terrace faces the resort's greenery, the best seat for morning coffee before activities. Sized right for small gatherings wanting a big-villa feel.",
		),
		amenities: { id: ["3 kamar tidur", "2 kamar mandi", "Ruang keluarga", "Teras", "Dapur"], en: ["3 bedrooms", "2 bathrooms", "Living room", "Terrace", "Kitchen"] }, hero: photo("villa/kimerak/01-tampak-pemandangan", {
			id: "Villa Kimerak berbentuk A beratap merah di antara tanaman tropis, dengan perbukitan dan langit biru di kejauhan.",
			en: "A-shaped, red-roofed Villa Kimerak among tropical plants, with hills and blue sky in the distance.",
		}),
		gallery: [
			photo("villa/kimerak/02-tampak-depan-bunga", {
				id: "Villa Kimerak berdinding kayu dan bata dengan atap merah, di balik bunga ungu dan tanah merah.",
				en: "Timber-and-brick Villa Kimerak with a red roof, behind purple flowers and red soil.",
			}),
			photo("villa/kimerak/03-teras-api-unggun", {
				id: "Tempat api unggun dari batu dengan bangku beton di halaman bata Villa Kimerak, di samping teras kayu.",
				en: "Stone fire pit with concrete benches on Villa Kimerak's brick patio, beside the timber porch.",
			}),
			photo("villa/kimerak/04-teras-lantai-kayu", {
				id: "Teras Villa Kimerak berlantai ubin motif kayu, beratap anyaman bambu dengan lampu gantung, terbuka ke kebun pinus.",
				en: "Villa Kimerak porch with a wood-look tile floor and a woven bamboo ceiling with pendant lamps.",
			}),
			photo("villa/kimerak/05-kamar-loft", {
				id: "Kamar loft Villa Kimerak di bawah atap miring kayu, dengan dua kasur berseprai pink dan jendela ke pepohonan.",
				en: "Villa Kimerak loft room under a sloping timber roof, with two pink-sheeted mattresses and a window to the trees.",
			}),
			photo("villa/kimerak/06-tangga-meja", {
				id: "Ruang bawah Villa Kimerak dengan tangga kayu ke loft, dinding bata merah, dan meja lipat di tengah.",
				en: "Ground floor of Villa Kimerak with a wooden stair to the loft, red brick walls and a folding table.",
			}),
			photo("villa/kimerak/07-kamar-tidur", {
				id: "Kamar tidur Villa Kimerak berdinding bata merah dengan ranjang berseprai pink, kasur tambahan, dan jendela bergorden.",
				en: "Villa Kimerak bedroom with red brick walls, a bed in pink sheets, an extra mattress and curtained windows.",
			}),
			photo("villa/kimerak/08-jendela-pemandangan", {
				id: "Jendela kayu terbuka di Villa Kimerak menghadap daun pisang, pakis, dan langit biru dengan perbukitan jauh.",
				en: "An open wooden window at Villa Kimerak looking out over banana leaves, ferns and blue sky with distant hills.",
			}),
		],
	},
	{
		slug: "leuit", name: "Leuit", type: "leuit", price: 2350000, paxNormal: 4, paxMax: 5,
		spec: "2 kmr tidur, 1 kmd, dapur & R Kel",
		tagline: T("Menginap di lumbung padi", "Sleep in a rice barn"),
		description: T(
			"Leuit adalah rumah lumbung padi Sunda yang dialihfungsikan jadi cottage: 2 kamar tidur, dapur, ruang keluarga, dan kamar mandi untuk 4–5 orang. Pengalaman menginap paling unik di resort, tidur di bangunan warisan budaya yang masih kokoh berdiri. Cocok untuk pasangan dan keluarga kecil yang cari cerita, bukan sekadar kamar.",
			"The Leuit is a Sundanese rice barn converted into a cottage: 2 bedrooms, kitchen, living room, and bathroom for 4–5 guests. The resort's most unusual stay, sleeping in a heritage building still standing strong. Made for couples and small families collecting stories, not just rooms.",
		),
		amenities: { id: ["2 kamar tidur", "1 kamar mandi", "Dapur", "Ruang keluarga"], en: ["2 bedrooms", "1 bathroom", "Kitchen", "Living room"] }, hero: photo("villa/leuit/01-tampak-depan", {
			id: "Leuit, cottage kayu beratap segitiga tinggi dengan teras beratap seng, di tengah pakis dan pohon pinus.",
			en: "The Leuit, a timber cottage with a tall gabled roof and a corrugated-roof porch, amid ferns and pine trees.",
		}),
		gallery: [
			photo("villa/leuit/02-halaman-api-unggun", {
				id: "Halaman rumput Leuit dengan tempat api unggun, panggangan, dan ban bercat warna-warni sebagai tempat duduk.",
				en: "Leuit's lawn with a fire pit, a grill and brightly painted tyre seats.",
			}),
			photo("villa/leuit/03-teras-panggung", {
				id: "Teras panggung kayu Leuit dengan pintu kaca, gorden putih, dan bangku sudut, beratap seng.",
				en: "The Leuit's raised timber deck with a glass door, white curtains and a corner bench under a corrugated roof.",
			}),
			photo("villa/leuit/04-ruang-tengah-tangga", {
				id: "Ruang tengah Leuit berlantai kayu dengan tangga ke loft, meja lipat putih, dispenser air, dan lukisan.",
				en: "The Leuit's central room with a timber floor, a wooden stair to the loft, a folding table and a painting.",
			}),
			photo("villa/leuit/05-loft-atas", {
				id: "Sudut loft Leuit dengan jendela segitiga berbingkai kayu dan gorden putih terikat, hutan hijau di baliknya.",
				en: "A corner of the Leuit's loft with a triangular timber-framed window and a tied white curtain, green forest beyond.",
			}),
			photo("villa/leuit/06-kamar-tidur", {
				id: "Kamar tidur Leuit berlantai papan dengan kasur besar di atas panggung kayu, dikelilingi jendela dan gorden krem.",
				en: "Leuit bedroom with a plank floor and a large mattress on a timber platform, surrounded by windows and cream curtains.",
			}),
			photo("villa/leuit/07-kamar-loft", {
				id: "Kamar loft Leuit di bawah atap miring anyaman bambu, dengan kasur krem, selimut oranye, dan jendela ke pepohonan.",
				en: "Leuit loft bedroom under a sloping bamboo roof, with a cream mattress, orange blanket and a window to the trees.",
			}),
			photo("villa/leuit/08-kamar-mandi", {
				id: "Kamar mandi Leuit berdinding keramik motif irisan kayu dengan wastafel, toilet, shower, dan ember.",
				en: "Leuit bathroom with wood-slice patterned tiles, a basin, a toilet, a shower and a bucket.",
			}),
			photo("villa/leuit/09-tangga-spiral", {
				id: "Tangga kayu berbelok dari ruang tengah Leuit menuju loft di bawah atap anyaman bambu.",
				en: "A turning timber staircase up to the Leuit's loft, under a woven-bamboo roof.",
			}),
		],
	},
	{
		slug: "damar", name: "Damar", type: "damar", price: 3500000, paxNormal: 6, paxMax: 7,
		spec: "2 kmr tidur 3 bed, 1 kmd, Dapur & R Kel",
		tagline: T("Triple bed untuk tim", "Triple beds for teams"),
		description: T(
			"Villa Damar efisien untuk 6–7 orang: 2 kamar tidur berisi 3 tempat tidur, dapur, ruang keluarga, dan kamar mandi. Konfigurasi triple bed-nya ideal untuk tim outbound atau komunitas yang mengutamakan kebersamaan. Semua kebutuhan masak dan kumpul tersedia dalam satu bangunan.",
			"Villa Damar efficiently sleeps 6–7: 2 bedrooms holding 3 beds, kitchen, living room, and bathroom. Its triple-bed setup suits outbound teams or communities prioritising togetherness. Everything for cooking and gathering fits in one building.",
		),
		amenities: { id: ["2 kamar tidur (3 bed)", "1 kamar mandi", "Dapur", "Ruang keluarga"], en: ["2 bedrooms (3 beds)", "1 bathroom", "Kitchen", "Living room"] }, hero: photo("villa/damar/01-tampak-depan", {
			id: "Tampak depan Villa Damar dua lantai berdinding kayu, dikelilingi pakis dan tanaman berbunga merah.",
			en: "Front of two-storey timber Villa Damar, surrounded by ferns and red-flowering plants.",
		}),
		gallery: [
			photo("villa/damar/02-teras", {
				id: "Teras Villa Damar beratap seng dengan pintu kaca ganda, meja dan bangku kayu panjang, serta lantai terakota.",
				en: "Covered porch of Villa Damar with glass double doors, a long wooden table and bench, and a terracotta floor.",
			}),
			photo("villa/damar/03-ruang-keluarga", {
				id: "Ruang keluarga Villa Damar dengan kursi sofa merah, tangga kayu ke loft, dan dinding bata merah.",
				en: "Villa Damar living room with a red armchair, a wooden stair to the loft and exposed red brick.",
			}),
			photo("villa/damar/04-ruang-makan", {
				id: "Ruang makan Villa Damar dengan meja dan kursi, tiang batang pohon di tengah, dan jendela menghadap pinus.",
				en: "Villa Damar dining area with a table and chairs, a tree-trunk pillar and windows facing the pines.",
			}),
			photo("villa/damar/05-kamar-tidur-1", {
				id: "Kamar tidur panjang Villa Damar berdinding kayu dengan dua ranjang rendah berseprai putih dan jendela lebar.",
				en: "Long timber bedroom in Villa Damar with two low beds in white linen and wide windows.",
			}),
			photo("villa/damar/06-kamar-tidur-2", {
				id: "Kamar tidur kedua Villa Damar: ranjang rendah di atas panggung kayu, jendela bergorden kuning, dinding kayu.",
				en: "Second bedroom in Villa Damar: a low bed on a timber platform, yellow-curtained windows and wood-panelled walls.",
			}),
			photo("villa/damar/07-kamar-mandi", {
				id: "Kamar mandi Villa Damar berdinding batu kali dengan wastafel granit, toilet duduk, dan lubang angin berpola.",
				en: "Villa Damar bathroom with river-stone walls, a granite counter with sink, a toilet and a patterned vent.",
			}),
			photo("villa/damar/08-balkon", {
				id: "Balkon kayu Villa Damar berlantai papan dengan pagar rendah, menghadap taman dan atap villa lain.",
				en: "Wooden balcony of Villa Damar with plank flooring and a low railing, overlooking the garden and neighbouring roofs.",
			}),
			photo("villa/damar/09-pantry", {
				id: "Pantry Villa Damar berdinding bata merah dengan kompor, bak cuci, rak piring, dan tiang kayu alami.",
				en: "Villa Damar pantry with red brick walls, a gas hob, a sink, dish shelves and natural timber posts.",
			}),
		],
	},
	{
		slug: "aula", name: "Aula", type: "aula", price: 2000000, paxNormal: 40, paxMax: 200,
		spec: "Ruang pertemuan + soundsystem (kapasitas owner confirm)",
		tagline: T("Ruang kumpul ber-AC suara", "Gathering hall with sound"),
		description: T(
			"Aula adalah ruang pertemuan Pondok Rasamala dengan soundsystem untuk acara gathering, seminar, dan resepsi. Kapasitasnya fleksibel untuk rombongan, cocok dipadukan dengan paket menginap villa dan outbound. Harga dan kapasitas pasti dikonfirmasi via WhatsApp sesuai kebutuhan acara.",
			"The Aula is Pondok Rasamala's meeting hall with a sound system for gatherings, seminars, and receptions. Flexible capacity for groups, pairs well with villa stays and outbound packages. Exact pricing and capacity confirmed via WhatsApp to suit your event.",
		),
		amenities: { id: ["Soundsystem", "Ruang pertemuan"], en: ["Sound system", "Meeting hall"] }, hero: photo("aula/aula/01-aula-meja-kursi", {
			id: "Aula Pondok Rasamala berlantai ubin terakota dengan deretan kursi kayu dan atap kayu tinggi yang terbuka di sisinya.",
			en: "Open-sided Aula with a terracotta tile floor, rows of wooden chairs and a high timber roof.",
		}),
		gallery: [
			photo("aula/aula/02-aula-meja-panjang", {
				id: "Meja kayu panjang dengan bangku di Aula, di bawah lampu gantung dan tiang-tiang kayu.",
				en: "Long solid-wood table with benches in the Aula, under hanging lamps and timber pillars.",
			}),
			photo("aula/aula/03-aula-lantai-ubin", {
				id: "Aula luas berlantai ubin terakota dengan tiang batang pohon di tengah dan dinding bata merah di ujung.",
				en: "Spacious Aula with terracotta tiles, a tree-trunk pillar in the middle and a red brick wall at the far end.",
			}),
			photo("aula/aula/04-aula-panggung", {
				id: "Dinding bata merah berhias dua lukisan di ujung Aula, dengan lantai ubin lapang di depannya untuk acara.",
				en: "Red brick wall with two colourful paintings at the end of the Aula, and open tiled floor for events.",
			}),
			photo("aula/aula/05-aula-tiang-kayu", {
				id: "Tiang kayu bercabang dan pagar balok bulat di tepi Aula, terbuka ke taman yang hijau.",
				en: "Branching timber posts and log railings along the edge of the Aula, open to the green garden.",
			}),
		],
		priceNote: "Harga & kapasitas konfirmasi via WhatsApp",
	},
];

/** Legacy URL path for a villa slug. */
export const villaPath = (slug: string) => `/type-${slug}/`;

/** Villa-category rows. Leuit (rice barn) and Damar are cottages, not a
 *  separate product line, they list and cross-link with the villas. Aula is
 *  a hall, so it stays out. */
export const isVillaCategory = (v: { type: string }) =>
	v.type === "villa" || v.type === "leuit" || v.type === "damar";

for (const v of villas) VillaSchema.parse(v);
export type VillaRow = (typeof villas)[number];

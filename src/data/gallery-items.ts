import { z } from "astro/zod";
import { photo, photoSchema } from "../lib/photos";

const text = z.object({ id: z.string().min(1), en: z.string().min(1) });

export const GalleryCategorySchema = z.enum([
	"villa",
	"glamping",
	"activities",
	"nature",
	"events",
]);

/** EXACT future-Emdash `gallery` shape (image/caption/category) so Week-2
 *  migration is mechanical. `photo` is the site photo (src/lib/photos.ts,
 *  imported from the manifest); an item without one shows its `label` as a
 *  placeholder. */
export const GalleryItemSchema = z.object({
	id: z.string(),
	category: GalleryCategorySchema,
	caption: text, // personal, scrapbook-warm caption
	photo: photoSchema.optional(),
	label: text.optional(), // placeholder text, only for items with no photo yet
	image: z.string(), // R2 URL, unused until the Emdash migration
});

export type GalleryItem = z.infer<typeof GalleryItemSchema>;

const T = (id: string, en: string) => ({ id, en });

export const galleryItems: GalleryItem[] = [
	{
		id: "villa-bambu", category: "villa",
		caption: T("Pagi di teras Bambu, kopi, kabut, dan suara hutan.", "Morning on Bambu's terrace, coffee, mist, forest sounds."),
		photo: photo("gallery/villa-bambu/01-teras-bambu", {
			id: "Jalan batu setapak menuju pondok bambu beratap ilalang, dinaungi pohon besar dan tanaman hijau.",
			en: "Flagstone path leading to a thatched bamboo hut, shaded by a large tree and green plants.",
		}),
		image: "",
	},
	{
		id: "villa-cendana", category: "villa",
		caption: T("Cendana muat semua, reuni 28 orang tanpa berpencar.", "Cendana fits everyone, a 28-person reunion, undivided."),
		photo: photo("gallery/villa-cendana/01-villa-cendana", {
			id: "Fasad batu dan kayu bertingkat Villa Cendana dengan balkon berpagar, diapit pakis pohon dan tanaman tropis.",
			en: "Villa Cendana's two-storey stone and timber facade with a railed balcony, framed by tree ferns and tropical plants.",
		}),
		image: "",
	},
	{
		id: "taman-bunga", category: "villa",
		caption: T("Taman bunga di antara villa, jalur jalan pagi favorit.", "Flower garden between villas, the favourite morning-walk route."),
		photo: photo("gallery/taman-bunga/01-taman-bunga", {
			id: "Batu pijakan melintasi hamparan rumput menuju rumah kayu panggung di antara tanaman tropis.",
			en: "Stepping stones crossing a lawn to a timber stilt house among tropical plants.",
		}),
		image: "",
	},
	{
		id: "bunga-agapanthus", category: "nature",
		caption: T("Agapanthus biru mekar di sudut taman.", "Blue agapanthus in bloom in a corner of the garden."),
		photo: photo("gallery/bunga-agapanthus/01-bunga-agapanthus", {
			id: "Bunga agapanthus biru keunguan bermekaran dalam satu tangkai di depan latar hijau yang kabur.",
			en: "Blue-violet agapanthus flowers blooming in one cluster against a blurred green background.",
		}),
		image: "",
	},
	{
		id: "tenda-salak", category: "glamping",
		caption: T("Tenda Salak sore hari, siap untuk api unggun.", "Salak tent at dusk, ready for the bonfire."),
		photo: photo("gallery/tenda-salak/01-tenda-salak", {
			id: "Taman rimbun di depan Glamping Salak dengan jalan batu, payung, dan meja kecil di antara dedaunan tropis.",
			en: "Lush garden in front of Glamping Salak with a stepping-stone path, a parasol and a small table among tropical leaves.",
		}),
		image: "",
	},
	{
		id: "api-unggun", category: "glamping",
		caption: T("Lingkaran cerita semalam suntuk.", "An all-night story circle."),
		photo: photo("gallery/api-unggun/01-api-unggun", {
			id: "Api unggun menyala oranye terang di tengah malam yang gelap.",
			en: "A bonfire burning bright orange in the dark of night.",
		}),
		image: "",
	},
	{
		id: "bakar-bakaran", category: "events",
		caption: T("Bakar-bakaran bersama, daging dan sayur mendesis di plat panas.", "A shared barbecue, meat and vegetables sizzling on the hot plate."),
		photo: photo("gallery/bakar-bakaran/01-bakar-bakaran", {
			id: "Potongan daging dan sayuran dipanggang di atas plat panas, dengan bara menyala di bawahnya.",
			en: "Slices of meat and vegetables grilling on a hot plate, with glowing embers underneath.",
		}),
		image: "",
	},
	{
		id: "sarapan-tenda", category: "glamping",
		caption: T("Sarapan hangat di depan tenda.", "Warm breakfast in front of the tent."),
		// No photo exists yet: the grid shows this label until one is added to the manifest.
		label: T("Sarapan glamping: foto menyusul", "Glamping breakfast: photo to follow"),
		image: "",
	},
	{
		id: "outbound-games", category: "activities",
		caption: T("Team building di lapangan hijau.", "Team building on the green field."),
		photo: photo("gallery/outbound-games/01-outbound-games", {
			id: "Seorang peserta tergantung pada tali pengaman sambil disaksikan rekan satu tim, di hutan pinus.",
			en: "A participant hangs from a safety rope as teammates look on, in a pine forest.",
		}),
		image: "",
	},
	{
		id: "tim-kompak", category: "activities",
		caption: T("Gandengan tangan, kekompakan diuji.", "Arms linked, teamwork put to the test."),
		photo: photo("gallery/tim-kompak/01-kekompakan-tim", {
			id: "Sekelompok peserta berkaus oranye dan putih saling menggandeng lengan dan bersandar bersama dalam permainan di rumput.",
			en: "A group of participants in orange and white shirts linking arms and leaning together in a game on the grass.",
		}),
		image: "",
	},
	{
		id: "trekking-curug", category: "activities",
		caption: T("Jalan menuju curug, sepatu basah, hati senang.", "On the waterfall trail, wet shoes, happy hearts."),
		photo: photo("gallery/trekking-curug/01-trekking-curug", {
			id: "Peserta berkaus oranye membentuk barisan melengkung di kolam sungai di bawah air terjun.",
			en: "Participants in orange shirts form curving lines in the stream pool below a waterfall.",
		}),
		image: "",
	},
	{
		id: "hutan-pinus", category: "nature",
		caption: T("Hutan pinus TNGHS di sekitar resort.", "TNGHS pine forest around the resort."),
		photo: photo("gallery/hutan-pinus/01-hutan-pinus", {
			id: "Jalan beraspal di antara batang pinus tinggi dan pakis pohon di hutan yang hijau.",
			en: "A paved road between tall pine trunks and tree ferns in the green forest.",
		}),
		image: "",
	},
	{
		id: "monyet-hutan", category: "nature",
		caption: T("Sepasang monyet saling merawat bulu, penghuni hutan di sekitar resort.", "A pair of macaques grooming each other, residents of the forest around the resort."),
		photo: photo("gallery/monyet-hutan/01-monyet-hutan", {
			id: "Dua monyet ekor panjang duduk berdekatan di atas batu, satu merawat bulu yang lain, dengan dedaunan hijau di belakangnya.",
			en: "Two macaques sitting close together on a rock, one grooming the other, with green foliage behind them.",
		}),
		image: "",
	},
	{
		id: "sungai-jernih", category: "nature",
		caption: T("Sungai kecil jernih di kawasan resort.", "A clear little stream in the resort area."),
		photo: photo("gallery/sungai-jernih/01-sungai-jernih", {
			id: "Aliran sungai kecil yang jernih berundak di antara bebatuan dan tanaman hijau yang lebat.",
			en: "A clear little stream stepping down between rocks and lush green plants.",
		}),
		image: "",
	},
	{
		id: "marigold", category: "nature",
		caption: T("Marigold oranye, warna hangat di sela hijau kebun.", "Orange marigolds, a warm splash of colour among the garden greens."),
		photo: photo("gallery/marigold/01-marigold", {
			id: "Bunga marigold oranye yang sedang mekar, dengan satu kuntum kering kecokelatan di sampingnya dan latar kebun yang kabur.",
			en: "An orange marigold in full bloom beside a dried brown one, against a blurred garden background.",
		}),
		image: "",
	},
	{
		id: "gathering-aula", category: "events",
		caption: T("Sesi formal di aula sebelum games dimulai.", "A formal session in the hall before games begin."),
		photo: photo("gallery/gathering-aula/01-gathering-aula", {
			id: "Peserta rapat duduk mengelilingi meja putih berbentuk U di aula beratap tenda, dengan kebun hijau di baliknya.",
			en: "Attendees at a meeting around a U-shaped white table in the tent-roofed hall, with a green garden beyond.",
		}),
		image: "",
	},
	{
		id: "malam-gathering", category: "events",
		caption: T("Malam kebersamaan, api unggun dan gitar.", "A night together, bonfire and guitar."),
		photo: photo("gallery/malam-gathering/01-malam-gathering", {
			id: "Peserta berdiri setengah lingkaran menyaksikan api unggun menyala di tanah lapang pada malam hari.",
			en: "Participants stand in an arc watching a bonfire burn on an open field at night.",
		}),
		image: "",
	},
	{
		id: "bunga-putih", category: "nature",
		caption: T("Bunga putih berbercak merah, kecil tapi menawan.", "White flowers with red blotches, small but striking."),
		photo: photo("gallery/bunga-putih/01-bunga-putih", {
			id: "Bunga putih berbercak merah tua dengan benang sari oranye, di depan latar gelap kehijauan.",
			en: "White flowers with deep-red blotches and orange stamens against a dark green background.",
		}),
		image: "",
	},
];

export const galleryCategories = ["villa", "glamping", "activities", "nature", "events"] as const;

for (const g of galleryItems) GalleryItemSchema.parse(g);
export type GalleryRow = (typeof galleryItems)[number];

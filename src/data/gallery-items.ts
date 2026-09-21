import { z } from "astro/zod";

const text = z.object({ id: z.string().min(1), en: z.string().min(1) });

export const GalleryCategorySchema = z.enum([
	"villa",
	"glamping",
	"activities",
	"nature",
	"events",
]);

/** EXACT future-Emdash `gallery` shape (image/caption/category) so Week-2
 *  migration is mechanical. Until Day-6 keepers land, entries carry a
 *  placeholder label; captions are final copy. */
export const GalleryItemSchema = z.object({
	id: z.string(),
	category: GalleryCategorySchema,
	caption: text, // personal, scrapbook-warm caption
	label: text, // placeholder label (Day-6 swap)
	image: z.string(), // R2 URL, filled Day 6
});

export type GalleryItem = z.infer<typeof GalleryItemSchema>;

const T = (id: string, en: string) => ({ id, en });

export const galleryItems = [
	{ id: "villa-bambu", category: "villa", caption: T("Pagi di teras Bambu — kopi, kabut, dan suara hutan.", "Morning on Bambu's terrace — coffee, mist, forest sounds."), label: T("Villa Bambu — foto menyusul", "Villa Bambu — photo to follow"), image: "" },
	{ id: "villa-cendana", category: "villa", caption: T("Cendana muat semua — reuni 28 orang tanpa berpencar.", "Cendana fits everyone — a 28-person reunion, undivided."), label: T("Villa Cendana — foto menyusul", "Villa Cendana — photo to follow"), image: "" },
	{ id: "taman-bunga", category: "villa", caption: T("Taman bunga di antara villa — jalur jalan pagi favorit.", "Flower garden between villas — the favourite morning-walk route."), label: T("Taman resort — foto menyusul", "Resort garden — photo to follow"), image: "" },
	{ id: "tenda-salak", category: "glamping", caption: T("Tenda Salak sore hari — siap untuk api unggun.", "Salak tent at dusk — ready for the bonfire."), label: T("Glamping Salak — foto menyusul", "Glamping Salak — photo to follow"), image: "" },
	{ id: "api-unggun", category: "glamping", caption: T("Lingkaran cerita semalam suntuk.", "An all-night story circle."), label: T("Api unggun — foto menyusul", "Bonfire — photo to follow"), image: "" },
	{ id: "sarapan-tenda", category: "glamping", caption: T("Sarapan hangat di depan tenda.", "Warm breakfast in front of the tent."), label: T("Sarapan glamping — foto menyusul", "Glamping breakfast — photo to follow"), image: "" },
	{ id: "outbound-games", category: "activities", caption: T("Team building di lapangan hijau.", "Team building on the green field."), label: T("Outbound — foto menyusul", "Outbound — photo to follow"), image: "" },
	{ id: "trekking-curug", category: "activities", caption: T("Jalan menuju curug — sepatu basah, hati senang.", "On the waterfall trail — wet shoes, happy hearts."), label: T("Trekking — foto menyusul", "Trekking — photo to follow"), image: "" },
	{ id: "hutan-pinus", category: "nature", caption: T("Hutan pinus TNGHS di sekitar resort.", "TNGHS pine forest around the resort."), label: T("Hutan pinus — foto menyusul", "Pine forest — photo to follow"), image: "" },
	{ id: "sungai-jernih", category: "nature", caption: T("Sungai kecil jernih di kawasan resort.", "A clear little stream in the resort area."), label: T("Sungai — foto menyusul", "Stream — photo to follow"), image: "" },
	{ id: "gathering-aula", category: "events", caption: T("Sesi formal di aula sebelum games dimulai.", "A formal session in the hall before games begin."), label: T("Acara aula — foto menyusul", "Hall event — photo to follow"), image: "" },
	{ id: "malam-gathering", category: "events", caption: T("Malam kebersamaan — api unggun dan gitar.", "A night together — bonfire and guitar."), label: T("Malam gathering — foto menyusul", "Gathering night — photo to follow"), image: "" },
];

export const galleryCategories = ["villa", "glamping", "activities", "nature", "events"] as const;

for (const g of galleryItems) GalleryItemSchema.parse(g);
export type GalleryRow = (typeof galleryItems)[number];

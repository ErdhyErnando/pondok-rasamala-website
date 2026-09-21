import { z } from "astro/zod";
import type { Locale } from "../lib/i18n";

const text = z.object({ id: z.string().min(1), en: z.string().min(1) });
export type Text = z.infer<typeof text>;
export const tx = (t: Text, locale: Locale): string => t[locale];

const T = (id: string, en: string) => ({ id, en });

/** Homepage copy, ID source of truth + EN mirror.
 *  Annotations, alternatives & confidence tags live in docs/day-2-copy.md.
 *  Prices/names resolve from villas.ts + glamping.ts — never duplicated here. */
export const HeroSchema = z.object({
	eyebrow: text,
	title: text,
	sub: text,
	trust: z.array(text).min(1),
	visualLabel: text,
});
export const hero = HeroSchema.parse({
	eyebrow: T("TNGHS · ±2 jam dari Jakarta", "TNGHS · ±2 hours from Jakarta"),
	title: T(
		"Wisata Alam Pedesaan di Kaki Gunung Salak",
		"A Countryside Nature Retreat at the Foot of Mount Salak",
	),
	sub: T(
		"Villa bambu dan kayu, glamping, dan udara gunung yang sejuk — tempat pelan untuk liburan keluarga, gathering, dan kabur akhir pekan.",
		"Bamboo and timber villas, glamping, and cool mountain air — a slow place for family holidays, gatherings, and weekend escapes.",
	),
	trust: [
		T("16 villa & cottage", "16 villas & cottages"),
		T("8 tenda glamping", "8 glamping tents"),
		T("Aula & area outbound", "Hall & outbound grounds"),
	],
	visualLabel: T(
		"Foto resort — menyusul (Day 6)",
		"Resort photo — to follow (Day 6)",
	),
});

export const FeaturedSchema = z.object({
	kind: z.enum(["villa", "glamping"]),
	slug: z.string(),
	blurb: text,
});
export type Featured = z.infer<typeof FeaturedSchema>;
export const featured = z.array(FeaturedSchema).parse([
	{
		kind: "villa",
		slug: "bambu",
		blurb: T(
			"Villa bambu 2 kamar untuk keluarga kecil — bisa disewa per kamar.",
			"Two-bedroom bamboo villa for small families — rentable per room.",
		),
	},
	{
		kind: "villa",
		slug: "cendana",
		blurb: T(
			"Villa 7 kamar untuk rombongan besar — gathering sampai 28 orang.",
			"Seven-bedroom villa for big groups — gatherings up to 28 people.",
		),
	},
	{
		kind: "glamping",
		slug: "salak",
		blurb: T(
			"Glamping untuk 4–6 orang — api unggun dan sarapan termasuk.",
			"Glamping for 4–6 guests — bonfire and breakfast included.",
		),
	},
	{
		kind: "glamping",
		slug: "cikuray",
		blurb: T(
			"Glamping besar untuk 8–10 orang — cocok untuk komunitas.",
			"Large glamping for 8–10 guests — made for communities.",
		),
	},
]);

export const showcase = {
	eyebrow: T("Menginap", "Stay"),
	title: T("Pilih tempat bermalam", "Choose your stay"),
	description: T(
		"Empat favorit tamu — villa, cottage, dan glamping di dalam kawasan Taman Nasional Gunung Halimun Salak.",
		"Four guest favourites — villas, cottages, and glamping inside Gunung Halimun Salak National Park.",
	),
	allVillas: T("Lihat semua villa", "View all villas"),
	allGlamping: T("Lihat semua glamping", "View all glamping"),
	detail: T("Lihat detail", "View details"),
	from: T("Mulai", "From"),
	priceNote: T("Konfirmasi via WhatsApp", "Confirm via WhatsApp"),
} as const;

export const activities = {
	eyebrow: T("Aktivitas & Paket", "Activities & Packages"),
	title: T("Seharian penuh tanpa gadget", "Full days, no gadgets needed"),
	description: T(
		"Outbound di lapangan hijau, trekking ke curug, dan malam api unggun — semua bisa diatur dari satu pintu.",
		"Outbound on green fields, waterfall treks, and bonfire nights — all arranged from one place.",
	),
	cta: T("Lihat paket gathering", "View gathering packages"),
	cards: [
		{
			title: T("Outbound & team building", "Outbound & team building"),
			body: T(
				"Lapangan bola, area games, dan pemandu untuk rombongan kantor dan sekolah.",
				"Football field, games ground, and facilitators for company and school groups.",
			),
		},
		{
			title: T("Trekking curug", "Waterfall treks"),
			body: T(
				"Kawah Ratu, Curug Seribu, dan Curug Ngumpet — semua dalam jangkauan singkat.",
				"Kawah Ratu, Curug Seribu, and Curug Ngumpet — all a short trip away.",
			),
		},
		{
			title: T("Gathering & api unggun", "Gatherings & bonfires"),
			body: T(
				"Aula dengan soundsystem, saung-saung, dan api unggun untuk malam kebersamaan.",
				"Meeting hall with sound system, pavilions, and bonfires for nights together.",
			),
		},
	],
} as const;

export const TestimonialSchema = z.object({
	quote: text,
	name: z.string(),
	context: text,
	source: z.url(),
	sourceLabel: z.string(),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;
export const testimonialsHead = {
	eyebrow: T("Kata tamu", "Guest words"),
	title: T("Yang bikin kangen pulang", "What guests remember"),
} as const;
/** REAL guest quotes only — curated from public reviews, linked to source.
 *  EN lines are our translation of the guest's words (🟡), ID is verbatim (🟢). */
export const testimonials = z.array(TestimonialSchema).parse([
	{
		quote: T(
			"Suasana tenang dan sejuk memang terasa sangat menentramkan.",
			"The calm, cool air is genuinely soothing.",
		),
		name: "Cipu Suaib",
		context: T("Liburan keluarga, Januari 2023", "Family holiday, January 2023"),
		source: "https://www.cipusuaib.id/2023/04/rasa-gak-pengen-pulang-di-rasamala.html",
		sourceLabel: "cipusuaib.id",
	},
	{
		quote: T(
			"Hawanya sangat sejuk sepanjang hari. Bahkan sore hingga dini hari, suhu sangat dingin.",
			"Cool mountain air all day — evenings through dawn get properly cold.",
		),
		name: "Suwandi",
		context: T("Menginap di Villa Pinus, 2016", "Stayed at Villa Pinus, 2016"),
		source: "https://suwanditalks.com/2016/12/12/review-pondok-rasamala/",
		sourceLabel: "suwanditalks.com",
	},
	{
		quote: T(
			"Di sekitarnya ada banyak sekali wisata curug… Pengalaman glamping di sini tak kalah seru.",
			"Waterfalls everywhere nearby… glamping here is every bit as exciting.",
		),
		name: "Ecy Rinos",
		context: T("Glamping, April 2019", "Glamping, April 2019"),
		source: "https://ecyrinos.blogspot.com/2019/04/glamping-di-pondok-rasamala.html",
		sourceLabel: "ecyrinos.blogspot.com",
	},
]);

export const location = {
	eyebrow: T("Lokasi", "Location"),
	title: T("Dekat dari kota, jauh dari bising", "Close to the city, far from noise"),
	body: T(
		"Di kawasan wisata Gunung Salak Endah, Pamijahan, Bogor — di dalam Taman Nasional Gunung Halimun Salak. Sekitar 2 jam dari Jakarta, 1,5 jam dari Bogor.",
		"In the Gunung Salak Endah tourism area, Pamijahan, Bogor — inside Gunung Halimun Salak National Park. About 2 hours from Jakarta, 1.5 hours from Bogor.",
	),
	address: T(
		"Jl. Raya Gunung Salak Endah, Pamijahan, Kab. Bogor",
		"Gunung Salak Endah Rd, Pamijahan, Bogor Regency",
	),
	mapLabel: T("Muat peta", "Load map"),
	mapsLink: T("Buka di Google Maps", "Open in Google Maps"),
	detail: T("Lihat rute & petunjuk", "See routes & directions"),
} as const;

export const ctaSection = {
	title: T("Siap kabur akhir pekan ini?", "Ready for a weekend escape?"),
	body: T(
		"Ceritakan tanggal dan jumlah rombongan — kami bantu pilihkan villa atau tenda yang pas.",
		"Tell us your dates and group size — we'll help you pick the right villa or tent.",
	),
	note: T(
		"Harga & ketersediaan konfirmasi via WhatsApp",
		"Prices & availability confirmed via WhatsApp",
	),
} as const;

export const homeMeta = {
	title: T(
		"Pondok Rasamala — Wisata Alam Pedesaan di Gunung Salak Endah, Bogor",
		"Pondok Rasamala — Countryside Nature Retreat in Gunung Salak Endah, Bogor",
	),
	description: T(
		"Villa bambu & kayu, glamping, dan paket gathering di kaki Gunung Salak, ±2 jam dari Jakarta. Pesan langsung via WhatsApp.",
		"Bamboo & timber villas, glamping, and gathering packages at the foot of Mount Salak, ±2 hours from Jakarta. Book direct via WhatsApp.",
	),
} as const;

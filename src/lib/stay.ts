import { campsite } from "../data/campsite";
import { glamping, glampingPath } from "../data/glamping";
import { isVillaCategory, villas, villaPath } from "../data/villas";
import { formatIDR } from "./format";
import { localizePath, type Locale } from "./i18n";
import { parseSpec } from "./specs";
import { waInquiry, waInquiryEn } from "./whatsapp";

export type StayKind = "villa" | "glamping" | "campsite";

export interface StaySpec {
	label: string;
	value: string;
}
export interface StayTier {
	label: string;
	/** IDR per night (number, for the live estimate). */
	price: number;
	priceText: string;
}
export interface StayFact {
	value: string;
	label: string;
}
export interface StayCard {
	href: string;
	name: string;
	blurb: string;
	/** Three-fact strip: rooms · capacity · price. */
	facts: StayFact[];
	/** Capacity range + lowest nightly price, used by the index filter/sort. */
	paxMin: number;
	paxMax: number;
	minPrice: number;
	imageLabel: string;
	kind: StayKind;
}
export interface StayPage {
	kind: StayKind;
	slug: string;
	segment: string;
	name: string;
	category: string | null;
	categoryHref: string | null;
	tagline: string;
	description: string;
	specs: StaySpec[];
	tiers: StayTier[];
	amenities: string[];
	/** Aula is booked per event, so no nights / estimate on its price card. */
	showNights: boolean;
	priceNote: string;
	waHref: string;
	waMessage: string;
	gallery: Array<{ label: string }>;
	metaDescription: string;
	labels: {
		home: string;
		specs: string;
		prices: string;
		gallery: string;
		related: string;
		close: string;
		book: string;
	};
}

const villaSegment = (slug: string) => `type-${slug}`;
const glampingSegment = (slug: string) => `glamping-type-${slug}`;

/** All 28 stay URL segments: 19 villa-category units (incl. leuit + damar) + aula + 8 glamping. Campsite is an index now, not a segment. */
export function getStaySegments(): string[] {
	return [
		...villas.filter(isVillaCategory).map((v) => villaSegment(v.slug)),
		"aula",
		...glamping.map((g) => glampingSegment(g.slug)),
	];
}

/** Leuit and Aula keep their bare names; everything else takes the "Villa "/"Glamping "
 *  prefix. Shared so index cards and detail pages never disagree. */
export function displayName(kind: StayKind, raw: string): string {
	if (kind === "glamping") return `Glamping ${raw}`;
	if (raw === "Leuit" || raw === "Aula" || raw === "Campsite") return raw;
	return `Villa ${raw}`;
}

export function resolveStay(segment: string, locale: Locale): StayPage | null {
	const L = (p: string) => localizePath(p, locale);
	const en = locale === "en";

	// --- villa / leuit / damar / aula ---
	const villa = villas.find((v) =>
		v.type === "aula" ? segment === "aula" : segment === villaSegment(v.slug),
	);
	if (villa) {
		const name = displayName("villa", villa.name);
		const counts = parseSpec(villa.spec);
		const specs: StaySpec[] = [
			{
				label: en ? "Capacity" : "Kapasitas",
				value: en
					? `${villa.paxNormal}–${villa.paxMax} guests`
					: `${villa.paxNormal}–${villa.paxMax} orang`,
			},
		];
		if (counts.bedrooms !== null)
			specs.push({
				label: en ? "Bedrooms" : "Kamar tidur",
				value:
					counts.extraBeds > 0
						? `${counts.bedrooms} (+${counts.extraBeds} extra bed)`
						: String(counts.bedrooms),
			});
		if (counts.bathrooms !== null)
			specs.push({ label: en ? "Bathrooms" : "Kamar mandi", value: String(counts.bathrooms) });
		const isAula = villa.type === "aula";
		return {
			kind: "villa",
			slug: villa.slug,
			segment,
			name,
			category: isAula ? null : en ? "Villa" : "Villa",
			categoryHref: isAula ? null : L("/villa/"),
			tagline: villa.tagline[locale],
			description: villa.description[locale],
			specs,
			tiers: [
				{
					label: en ? "Per night" : "Per malam",
					price: villa.price,
					priceText: formatIDR(villa.price),
				},
			],
			amenities: villa.amenities[locale],
			showNights: !isAula,
			priceNote: isAula
				? en
					? "Price & capacity confirmed via WhatsApp"
					: "Harga & kapasitas konfirmasi via WhatsApp"
				: en
					? "Price confirmed via WhatsApp"
					: (villa.priceNote ?? "Harga konfirmasi via WhatsApp"),
			waHref: en ? waInquiryEn(name) : waInquiry(name),
			waMessage: en
				? `Hello Pondok Rasamala, I'd like to ask about availability at ${name} for ..., ... guests. Thank you.`
				: `Halo Pondok Rasamala, saya mau tanya ketersediaan ${name} untuk tanggal ..., ... orang.`,
			gallery: [1, 2, 3].map((i) => ({
				label: en ? `${name}: photo ${i} to follow` : `${name}: foto ${i} menyusul`,
			})),
			metaDescription: `${name}: ${villa.tagline[locale]}. ${formatIDR(villa.price)}/malam.`,
			labels: {
				home: en ? "Home" : "Beranda",
				specs: en ? "Specifications" : "Spesifikasi",
				prices: en ? "Rates" : "Harga",
				gallery: en ? "Gallery" : "Galeri",
				related: en ? "Other villas" : "Villa lainnya",
				close: en ? "Close" : "Tutup",
				book: en ? "Check availability" : "Cek ketersediaan",
			},
		};
	}

	// --- glamping (+ campsite shares the tier shape) ---
	const g = glamping.find((x) => segment === glampingSegment(x.slug));
	if (g || segment === "campsite") {
		const isCamp = segment === "campsite";
		const tiers = isCamp ? campsite.tiers : g!.tiers;
		const name = isCamp ? "Campsite" : displayName("glamping", g!.name);
		const pax = tiers.map((tier) => tier.pax);
		return {
			kind: isCamp ? "campsite" : "glamping",
			slug: isCamp ? "campsite" : g!.slug,
			segment,
			name,
			category: isCamp ? null : en ? "Glamping" : "Glamping",
			categoryHref: isCamp ? null : L("/glamping/"),
			tagline: isCamp ? campsite.tagline[locale] : g!.tagline[locale],
			description: isCamp ? campsite.description[locale] : g!.description[locale],
			specs: [
				{
					label: en ? "Capacity" : "Kapasitas",
					value: en
						? `${Math.min(...pax)}–${Math.max(...pax)} guests`
						: `${Math.min(...pax)}–${Math.max(...pax)} orang`,
				},
				{
					label: en ? "Tents" : "Tenda",
					value: isCamp ? (en ? "Set up for you" : "Didirikan untuk Anda") : "1",
				},
				{ label: en ? "Bonfire" : "Api unggun", value: en ? "Included" : "Termasuk" },
				{ label: en ? "Breakfast" : "Sarapan", value: en ? "Per guest count" : "Sesuai pax" },
			],
			tiers: tiers.map((tier) => ({
				label: en ? `${tier.pax} guests` : `${tier.pax} orang`,
				price: tier.price,
				priceText: formatIDR(tier.price),
			})),
			amenities: en
				? ["Warm mattress", "Private bathroom", "Breakfast per guest count", "Bonfire"]
				: ["Matras hangat", "Kamar mandi sendiri", "Sarapan sesuai jumlah tamu", "Api unggun"],
			showNights: true,
			priceNote: en ? "Price confirmed via WhatsApp" : "Harga konfirmasi via WhatsApp",
			waHref: en ? waInquiryEn(name) : waInquiry(name),
			waMessage: en
				? `Hello Pondok Rasamala, I'd like to ask about availability at ${name} for ..., ... guests. Thank you.`
				: `Halo Pondok Rasamala, saya mau tanya ketersediaan ${name} untuk tanggal ..., ... orang.`,
			gallery: [1, 2, 3].map((i) => ({
				label: en ? `${name}: photo ${i} to follow` : `${name}: foto ${i} menyusul`,
			})),
			metaDescription: `${name}: ${(isCamp ? campsite.tagline[locale] : g!.tagline[locale])}.`,
			labels: {
				home: en ? "Home" : "Beranda",
				specs: en ? "Specifications" : "Spesifikasi",
				prices: en ? "Rates" : "Harga",
				gallery: en ? "Gallery" : "Galeri",
				related: isCamp
					? en
						? "See also"
						: "Lihat juga"
					: en
						? "Other tents"
						: "Tenda lainnya",
				close: en ? "Close" : "Tutup",
				book: en ? "Check availability" : "Cek ketersediaan",
			},
		};
	}

	return null;
}

const compactIDR = (n: number, locale: Locale) => {
	const m = n / 1_000_000;
	return locale === "en"
		? `IDR ${m.toLocaleString("en-US", { maximumFractionDigits: 2 })}M`
		: `Rp${m.toLocaleString("id-ID", { maximumFractionDigits: 2 })} jt`;
};
const paxRange = (min: number, max: number) => (min === max ? String(max) : `${min}–${max}`);

export function villaStayCard(slug: string, locale: Locale): StayCard {
	const L = (p: string) => localizePath(p, locale);
	const en = locale === "en";
	const v = villas.find((x) => x.slug === slug)!;
	const name = displayName("villa", v.name);
	const bedrooms = parseSpec(v.spec).bedrooms;
	return {
		href: L(v.type === "aula" ? "/aula/" : villaPath(v.slug)),
		name,
		blurb: v.tagline[locale],
		facts: [
			{ value: bedrooms === null ? "–" : String(bedrooms), label: en ? "bedrooms" : "kamar" },
			{ value: paxRange(v.paxNormal, v.paxMax), label: en ? "guests" : "orang" },
			{ value: compactIDR(v.price, locale), label: en ? "/ night" : "/ malam" },
		],
		paxMin: v.paxNormal,
		paxMax: v.paxMax,
		minPrice: v.price,
		imageLabel: en ? `${name}: photo to follow` : `${name}: foto menyusul`,
		kind: "villa",
	};
}

export function tentStayCard(slug: string, locale: Locale): StayCard {
	const L = (p: string) => localizePath(p, locale);
	const en = locale === "en";
	const g = glamping.find((x) => x.slug === slug)!;
	const name = displayName("glamping", g.name);
	const pax = g.tiers.map((tier) => tier.pax);
	const min = Math.min(...g.tiers.map((tier) => tier.price));
	return {
		href: L(glampingPath(g.slug)),
		name,
		blurb: g.tagline[locale],
		facts: [
			{ value: "1", label: en ? "tent" : "tenda" },
			{ value: paxRange(Math.min(...pax), Math.max(...pax)), label: en ? "guests" : "orang" },
			{
				value: compactIDR(min, locale),
				label: g.tiers.length > 1 ? (en ? "from" : "mulai") : en ? "/ night" : "/ malam",
			},
		],
		paxMin: Math.min(...pax),
		paxMax: Math.max(...pax),
		minPrice: min,
		imageLabel: en ? `${name}: photo to follow` : `${name}: foto menyusul`,
		kind: "glamping",
	};
}

export interface SizeBucket {
	label: string;
	min: number;
	max: number;
}
/** Group-size filter buckets for the index pages. A unit matches when its
 *  capacity range overlaps the bucket. Campsite has no per-lot capacity. */
export function getSizeBuckets(kind: "villa" | "glamping", locale: Locale): SizeBucket[] {
	const g = locale === "en" ? "guests" : "orang";
	return kind === "villa"
		? [
				{ label: `≤ 6 ${g}`, min: 1, max: 6 },
				{ label: `7–12 ${g}`, min: 7, max: 12 },
				{ label: `13+ ${g}`, min: 13, max: 999 },
			]
		: [
				{ label: `≤ 6 ${g}`, min: 1, max: 6 },
				{ label: `7+ ${g}`, min: 7, max: 999 },
			];
}

/** Index pages: every villa-category unit / every glamping tent. */
export const getVillaCards = (locale: Locale): StayCard[] =>
	villas.filter(isVillaCategory).map((v) => villaStayCard(v.slug, locale));
export const getTentCards = (locale: Locale): StayCard[] =>
	glamping.map((g) => tentStayCard(g.slug, locale));

/** 3 related cards: same-kind siblings (campsite → glamping, aula → villas). */
export function getRelated(segment: string, locale: Locale): StayCard[] {
	if (segment === "campsite") return ["salak", "cikuray", "gede"].map((s) => tentStayCard(s, locale));
	const villa = villas.find((v) =>
		v.type === "aula" ? segment === "aula" : segment === villaSegment(v.slug),
	);
	if (villa) {
		const pool = villas.filter((v) => isVillaCategory(v) && v.slug !== villa.slug);
		return pool.slice(0, 3).map((v) => villaStayCard(v.slug, locale));
	}
	const tents = glamping.filter((x) => glampingSegment(x.slug) !== segment);
	return [...tents, ...glamping].slice(0, 3).map((x) => tentStayCard(x.slug, locale));
}

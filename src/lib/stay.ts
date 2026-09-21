import { campsite } from "../data/campsite";
import { glamping, glampingPath } from "../data/glamping";
import { villas, villaPath } from "../data/villas";
import { formatIDR } from "./format";
import { localizePath, type Locale } from "./i18n";
import { parseSpec } from "./specs";
import { waInquiry, waInquiryEn } from "./whatsapp";

export type StayKind = "villa" | "glamping" | "campsite";

export interface StaySpec {
	label: string;
	value: string;
}
export interface StayPriceLine {
	label: string;
	price: string;
}
export interface StayCard {
	href: string;
	name: string;
	eyebrow: string;
	price: string;
	blurb?: string;
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
	prices: StayPriceLine[];
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

/** All 26 stay URL segments: 14 villas + leuit + damar + aula + 8 glamping + campsite. */
export function getStaySegments(): string[] {
	return [
		...villas.filter((v) => v.type === "villa").map((v) => villaSegment(v.slug)),
		villaSegment("leuit"),
		villaSegment("damar"),
		"aula",
		...glamping.map((g) => glampingSegment(g.slug)),
		"campsite",
	];
}

function displayName(kind: StayKind, raw: string): string {
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
			prices: [{ label: en ? "Per night" : "Per malam", price: formatIDR(villa.price) }],
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
				label: en ? `${name} — photo ${i} to follow` : `${name} — foto ${i} menyusul`,
			})),
			metaDescription: `${name} — ${villa.tagline[locale]}. ${formatIDR(villa.price)}/malam.`,
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
			prices: tiers.map((tier) => ({
				label: en ? `${tier.pax} guests / night` : `${tier.pax} orang / malam`,
				price: formatIDR(tier.price),
			})),
			priceNote: en ? "Price confirmed via WhatsApp" : "Harga konfirmasi via WhatsApp",
			waHref: en ? waInquiryEn(name) : waInquiry(name),
			waMessage: en
				? `Hello Pondok Rasamala, I'd like to ask about availability at ${name} for ..., ... guests. Thank you.`
				: `Halo Pondok Rasamala, saya mau tanya ketersediaan ${name} untuk tanggal ..., ... orang.`,
			gallery: [1, 2, 3].map((i) => ({
				label: en ? `${name} — photo ${i} to follow` : `${name} — foto ${i} menyusul`,
			})),
			metaDescription: `${name} — ${(isCamp ? campsite.tagline[locale] : g!.tagline[locale])}.`,
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

/** 3 related cards: same-kind siblings (campsite → glamping, aula/leuit/damar → villas). */
export function getRelated(segment: string, locale: Locale): StayCard[] {
	const L = (p: string) => localizePath(p, locale);
	const en = locale === "en";

	const villaCard = (slug: string): StayCard => {
		const v = villas.find((x) => x.slug === slug)!;
		return {
			href: L(v.type === "aula" ? "/aula/" : villaPath(v.slug)),
			name: displayName("villa", v.name),
			eyebrow: en ? `Villa · sleeps ${v.paxMax}` : `Villa · maks ${v.paxMax} orang`,
			price: formatIDR(v.price),
			imageLabel: en
				? `${displayName("villa", v.name)} — photo to follow`
				: `${displayName("villa", v.name)} — foto menyusul`,
			kind: "villa",
		};
	};
	const tentCard = (slug: string): StayCard => {
		const g = glamping.find((x) => x.slug === slug)!;
		const min = Math.min(...g.tiers.map((tier) => tier.price));
		const pax = g.tiers.map((tier) => tier.pax);
		return {
			href: L(glampingPath(g.slug)),
			name: displayName("glamping", g.name),
			eyebrow: en
				? `Glamping · ${Math.min(...pax)}–${Math.max(...pax)} guests`
				: `Glamping · ${Math.min(...pax)}–${Math.max(...pax)} orang`,
			price: `${en ? "From" : "Mulai"} ${formatIDR(min)}`,
			imageLabel: en
				? `${displayName("glamping", g.name)} — photo to follow`
				: `${displayName("glamping", g.name)} — foto menyusul`,
			kind: "glamping",
		};
	};

	if (segment === "campsite") return ["salak", "cikuray", "gede"].map(tentCard);
	const villa = villas.find((v) =>
		v.type === "aula" ? segment === "aula" : segment === villaSegment(v.slug),
	);
	if (villa) {
		const pool =
			villa.type === "villa"
				? villas.filter((v) => v.type === "villa" && v.slug !== villa.slug)
				: villas.filter((v) => v.type === "villa");
		return pool.slice(0, 3).map((v) => villaCard(v.slug));
	}
	const tents = glamping.filter((x) => glampingSegment(x.slug) !== segment);
	return [...tents, ...glamping].slice(0, 3).map((x) => tentCard(x.slug));
}

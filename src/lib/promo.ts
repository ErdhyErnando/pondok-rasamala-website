import { packages } from "../data/packages";
import type { Post } from "../data/posts";
import { glamping } from "../data/glamping";
import { villas } from "../data/villas";
import { localizePath, type Locale } from "./i18n";
import { packageCardProps } from "./packages";
import { tentStayCard, villaStayCard } from "./stay";

export interface ResolvedPromo {
	after: number;
	title: string;
	body?: string;
	meta?: string;
	href: string;
	cta: string;
	imageLabel: string;
}

/** Turn a post's `promos` entries into render-ready cards. Stay/package kinds
 *  read live data (name, blurb, facts, price) so they never drift; any
 *  title/body/cta on the entry overrides. A bad slug fails the build. */
export function resolvePromos(post: Post, locale: Locale): ResolvedPromo[] {
	const en = locale === "en";
	return post.promos.map((p) => {
		let base: Omit<ResolvedPromo, "after">;
		if (p.kind === "villa" || p.kind === "glamping") {
			const exists = (p.kind === "villa" ? villas : glamping).some((x) => x.slug === p.slug);
			if (!p.slug || !exists) throw new Error(`Promo in "${post.slug}": unknown ${p.kind} "${p.slug}"`);
			const c = p.kind === "villa" ? villaStayCard(p.slug, locale) : tentStayCard(p.slug, locale);
			base = {
				title: c.name,
				body: c.blurb,
				meta: c.facts.map((f) => `${f.value} ${f.label}`).join(" · "),
				href: c.href,
				cta: p.kind === "villa" ? (en ? "View villa" : "Lihat villa") : en ? "View tent" : "Lihat tenda",
				imageLabel: c.imageLabel,
			};
		} else if (p.kind === "package") {
			const pkg = packages.find((x) => x.slug === p.slug);
			if (!pkg) throw new Error(`Promo in "${post.slug}": unknown package "${p.slug}"`);
			const c = packageCardProps(pkg, locale);
			base = {
				title: c.name,
				body: c.tagline,
				meta: [c.priceSummary, c.priceUnit].filter(Boolean).join(" "),
				href: c.href,
				cta: en ? "View package" : "Lihat paket",
				imageLabel: c.imageLabel,
			};
		} else {
			if (!p.title || !p.href) throw new Error(`Promo in "${post.slug}": custom promos need title + href`);
			base = {
				title: p.title[locale],
				href: localizePath(p.href, locale),
				cta: en ? "Learn more" : "Selengkapnya",
				imageLabel: p.title[locale],
			};
		}
		return {
			after: p.after,
			...base,
			title: p.title?.[locale] ?? base.title,
			body: p.body?.[locale] ?? base.body,
			cta: p.cta?.[locale] ?? base.cta,
		};
	});
}

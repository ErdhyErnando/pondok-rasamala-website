import { packagePath, type PackageRow } from "../data/packages";
import { formatIDR } from "./format";
import { localizePath, type Locale } from "./i18n";

/** Everything a package card needs, in one place (index + "other packages").
 *  Duration is deliberately not shown: trips can run any number of days. */
export function packageCardProps(p: PackageRow, locale: Locale) {
	const en = locale === "en";
	const priced = p.tiers.filter((t) => t.price != null);
	const cheapest = priced.length
		? priced.reduce((a, b) => ((b.price as number) < (a.price as number) ? b : a))
		: null;
	const name = p.name[locale];
	return {
		href: localizePath(packagePath(p.slug), locale),
		name,
		tagline: p.tagline[locale],
		activities: p.activities[locale].slice(0, 3),
		priceSummary: cheapest
			? `${en ? "From" : "Mulai"} ${formatIDR(cheapest.price as number)}`
			: en
				? "Custom quote"
				: "Penawaran khusus",
		priceUnit: cheapest ? cheapest.unit[locale] : undefined,
		imageLabel: en ? `${name}: photo to follow` : `${name}: foto menyusul`,
	};
}

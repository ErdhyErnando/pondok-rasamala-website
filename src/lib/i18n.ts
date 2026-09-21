import en from "../i18n/en.json";
import id from "../i18n/id.json";

export type Locale = "id" | "en";

const dicts = { id, en } as const;

export type Strings = (typeof dicts)["id"];

/** UI chrome strings for a locale. Content bodies stay in data files / Emdash. */
export function getStrings(locale: Locale = "id"): Strings {
	return dicts[locale] ?? dicts.id;
}

/** Map a root-locale path to its locale-prefixed (or unprefixed) form.
 *  ID lives at root (no prefix); EN mirrors under /en/. */
export function localizePath(path: string, locale: Locale): string {
	const clean =
		path === "/en" ? "/" : path.startsWith("/en/") ? path.slice(3) : path;
	if (locale === "en") return clean === "/" ? "/en/" : `/en${clean}`;
	return clean === "" ? "/" : clean;
}

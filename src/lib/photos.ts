import type { ImageMetadata } from "astro";
import { z } from "astro/zod";

/** A site photo: optimised WebP source, bilingual alt, optional crop focus.
 *  Files live in src/assets/photos/<section>/<slug>/<NN>-<name>.webp and are
 *  produced by `pnpm photos:import` from scripts/photos/manifest.json. */
export interface Photo {
	src: ImageMetadata;
	alt: { id: string; en: string };
	/** CSS object-position (manifest `focal`), e.g. "center" or "50% 30%". */
	position?: string;
}

const files = import.meta.glob<ImageMetadata>("/src/assets/photos/**/*.webp", {
	eager: true,
	import: "default",
});

/** Alt text shorter than this is a placeholder, not a description. */
export const MIN_ALT_LENGTH = 10;

/** Resolve a photo by its path under src/assets/photos (no extension), e.g.
 *  `photo("villa/pinus/01-teras-depan", { id, en })`. Throws at build time
 *  when the file is missing or either alt text is too short, so a typo or an
 *  unfinished caption fails the build instead of shipping. */
export function photo(key: string, alt: { id: string; en: string }, position?: string): Photo {
	const src = files[`/src/assets/photos/${key}.webp`];
	if (!src) {
		throw new Error(
			`photo("${key}"): src/assets/photos/${key}.webp not found. Run \`pnpm photos:import\`, or fix the key.`,
		);
	}
	for (const lang of ["id", "en"] as const) {
		if ((alt[lang] ?? "").trim().length < MIN_ALT_LENGTH) {
			throw new Error(
				`photo("${key}"): alt.${lang} must be at least ${MIN_ALT_LENGTH} characters, got "${alt[lang] ?? ""}".`,
			);
		}
	}
	return position ? { src, alt, position } : { src, alt };
}

/** Zod shape for data files. Validates only; callers keep the original
 *  object, because ImageMetadata carries hidden fields zod would drop. */
export const photoSchema = z.object({
	src: z.custom<ImageMetadata>(
		(v) => typeof v === "object" && v !== null && "src" in v && "width" in v && "height" in v,
		{ message: "src must be an imported ImageMetadata" },
	),
	alt: z.object({
		id: z.string().min(MIN_ALT_LENGTH),
		en: z.string().min(MIN_ALT_LENGTH),
	}),
	position: z.string().optional(),
});

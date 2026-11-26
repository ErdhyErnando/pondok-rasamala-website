#!/usr/bin/env node
// Photo import pipeline: manifest.json -> optimised WebP in src/assets/photos.
//
//   node scripts/photos/import.mjs [--sections=villa,aula] [--force] [--src=<dir>]
//
// For every photo of the selected manifest sections it:
//   1. reads the original: a manifest `source` that is a relative path is
//      looked up in the legacy uploads folder (--src / PHOTO_SRC / default,
//      read-only); an absolute path is used as is (photos from a new shoot),
//   2. applies EXIF orientation with .rotate(),
//   3. fits it inside 2400 px on the long edge, never enlarging,
//   4. writes WebP (quality 88) with NO metadata (EXIF/GPS/ICC dropped),
//   5. saves it as src/assets/photos/<section>/<slug>/<NN>-<name>.webp,
//      where NN is the photo's 1-based position in the manifest entry.
//
// Idempotent: an output newer than its source is skipped. After changing
// QUALITY / MAX_EDGE, run with `--force` to redo everything.
// Files in a processed slug folder that the manifest no longer lists are
// deleted, so a re-ordered manifest cannot leave stale numbered files behind.
//
// An entry with `"sameAs": "<other slug>"` (same section) has no photos of its
// own: it shares that entry's files, so nothing is written for it, its folder
// is removed if one exists, and data files point at the other slug's keys.
// See scripts/photos/README.md for the add/replace workflow.

import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const MAX_EDGE = 2400;
const QUALITY = 88;
const DEFAULT_SRC = "/home/erdhy/dev/rasamala/old-rasamala-website/uploads/uploads";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const manifestPath = path.join(root, "scripts/photos/manifest.json");
const outRoot = path.join(root, "src/assets/photos");

const args = new Map(
	process.argv.slice(2).map((a) => {
		const [k, v = "true"] = a.replace(/^--/, "").split("=");
		return [k, v];
	}),
);
const sections = args.get("sections")?.split(",").filter(Boolean);
const force = args.get("force") === "true";
const srcRoot = args.get("src") ?? process.env.PHOTO_SRC ?? DEFAULT_SRC;

if (!sections?.length) {
	console.error("Pass --sections=<comma list>, e.g. --sections=villa,aula");
	process.exit(1);
}
/** Absolute `source` -> as is; relative -> inside the uploads folder. */
function resolveSource(source) {
	if (path.isAbsolute(source)) return source;
	if (!existsSync(srcRoot)) {
		throw new Error(`uploads folder not found: ${srcRoot} (set --src or PHOTO_SRC), needed for relative source "${source}"`);
	}
	return path.join(srcRoot, source);
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const entries = manifest.entries.filter((e) => sections.includes(e.section));
const unknown = sections.filter((s) => !manifest.entries.some((e) => e.section === s));
if (unknown.length) {
	console.error(`No manifest entries for section(s): ${unknown.join(", ")}`);
	process.exit(1);
}

for (const entry of manifest.entries) {
	if (!entry.sameAs) continue;
	const target = manifest.entries.find((e) => e.section === entry.section && e.slug === entry.sameAs);
	if (!target?.photos?.length || target.sameAs || entry.photos) {
		console.error(
			`Manifest entry ${entry.section}/${entry.slug}: "sameAs" must name another ${entry.section} entry that has its own photos, and the entry must not list photos itself.`,
		);
		process.exit(1);
	}
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
let done = 0;
let skipped = 0;
let pruned = 0;
let totalBytes = 0;
const failures = [];

for (const entry of entries) {
	const dir = path.join(outRoot, entry.section, entry.slug);
	if (entry.sameAs) {
		if (existsSync(dir)) {
			await rm(dir, { recursive: true });
			pruned++;
			console.log(`  removed ${entry.section}/${entry.slug}/ (shares ${entry.sameAs})`);
		}
		continue;
	}
	await mkdir(dir, { recursive: true });
	const wanted = new Set();

	for (const [i, photo] of entry.photos.entries()) {
		const nn = String(i + 1).padStart(2, "0");
		const file = `${nn}-${photo.name}.webp`;
		const out = path.join(dir, file);
		wanted.add(file);

		try {
			if (!/^[a-z0-9-]+$/.test(photo.name)) throw new Error(`name "${photo.name}" must be lowercase letters, digits and dashes`);
			const src = resolveSource(photo.source);
			const srcStat = await stat(src);
			const outStat = existsSync(out) ? await stat(out) : null;
			if (!force && outStat && outStat.mtimeMs > srcStat.mtimeMs) {
				skipped++;
				totalBytes += outStat.size;
				continue;
			}
			await sharp(src, { failOn: "error" })
				.rotate()
				.resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
				// sharp strips all metadata (EXIF, GPS, ICC, XMP) unless
				// .withMetadata()/.keepMetadata() is called, which we never do.
				.webp({ quality: QUALITY })
				.toFile(out);
			const { size } = await stat(out);
			totalBytes += size;
			done++;
			console.log(`  ${entry.section}/${entry.slug}/${file}  ${kb(size)}`);
		} catch (err) {
			failures.push(`${entry.section}/${entry.slug}/${file}: ${err.message}`);
		}
	}

	for (const existing of await readdir(dir)) {
		if (existing.endsWith(".webp") && !wanted.has(existing)) {
			await rm(path.join(dir, existing));
			pruned++;
			console.log(`  pruned ${entry.section}/${entry.slug}/${existing}`);
		}
	}
}

console.log(
	`\nphotos: ${done} written, ${skipped} up to date, ${pruned} pruned, ${failures.length} failed` +
		`\ntotal size of ${sections.join("+")}: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`,
);
if (failures.length) {
	console.error(`\nFailures:\n${failures.map((f) => `  ${f}`).join("\n")}`);
	process.exit(1);
}

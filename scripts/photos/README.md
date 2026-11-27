# Site photos

`scripts/photos/manifest.json` lists every photo. `pnpm photos:import` turns it into
optimised WebP files in `src/assets/photos/`, and the data files point at those files
with `photo(...)` calls (`src/lib/photos.ts`). Nothing else is needed: the build makes the
responsive sizes.

Currently covered: sections `villa`, `aula`, `glamping`, `campsite`, `package` and `gallery`
(data files `villas.ts`, `glamping.ts`, `campsite.ts`, `packages.ts`, `gallery-items.ts`). Manifest
sections not listed in the `photos:import` script in `package.json` (`home`, `about`, `post`,
`activity`) are planned but not wired yet: add them to `--sections=` when you start one.

## Replace or add a photo

1. **Edit the entry in `scripts/photos/manifest.json`.** Find it by `section` + `slug`
   (for example `"section": "villa", "slug": "pinus"`). Inside its `photos` array:
   - *Replace*: change that photo's `source` (keep or change `name`).
   - *Add*: append a new object at the end of `photos`. Fields: `source`, `name`
     (lowercase letters, digits and dashes: it becomes the file name), `role`
     (`hero` or `gallery`), `focal` (`center`, or a CSS `object-position` such as `50% 30%`).
   - The **first** photo is the hero. A photo's file number (`NN-`) is its position in the
     array, so inserting or reordering in the middle renumbers the files after it and
     changes their keys in step 3. Appending at the end changes nothing else.
   - `source` has two forms:
     - **Relative**: a path inside the legacy uploads folder, e.g. `2020/12/Pinus_01.jpg`.
       The folder is `/home/erdhy/dev/rasamala/old-rasamala-website/uploads/uploads`; override it
       with `--src=<dir>` or the `PHOTO_SRC` environment variable.
     - **Absolute**: the full path of any file on disk, e.g.
       `/home/erdhy/photos/2026-shoot/pinus-teras.jpg`. Use this for a new shoot; the uploads
       folder is not needed.
   - A unit that shares another unit's photos has `"sameAs": "<other slug>"` and no `photos`
     (today: `bambu-b` uses `bambu-a`; `puspa-b` and `puspa-c` use `puspa-a`). To give such a
     unit its own photos, remove `sameAs` and add a `photos` array.
2. **Run `pnpm photos:import`.** It rotates by EXIF, caps the long edge at 2400 px, writes WebP
   without metadata to `src/assets/photos/<section>/<slug>/<NN>-<name>.webp`, skips files that
   are already up to date and deletes files the manifest no longer lists. If you replaced a photo
   with a file that is *older* than the existing output, add `--force`
   (`pnpm photos:import --force`). It prints the total size.
3. **Update the alt text in the matching data file** (the entry's `dataFile`, for example
   `src/data/villas.ts` for villas and the Aula, `src/data/glamping.ts` for tents). Each photo is one call; the hero is `hero:`, the rest are in `gallery: [...]`:

   ```ts
   photo("villa/pinus/04-teras", {
   	id: "Teras Villa Pinus dengan pintu ganda kayu, kursi ukir, dan semak berdaun merah.",
   	en: "Villa Pinus porch with double timber doors, a carved chair and red-leafed shrubs.",
   }),
   ```

   The key is `<section>/<slug>/<NN>-<name>` (no `.webp`). Write what is visible and useful to a
   guest, 8–20 words, in both languages, naming the unit where natural, without "foto" or "image of".
   For a `sameAs` unit use the *target's* keys (`villa/bambu-a/...`) and name the unit in the alt.
   Add `, "50% 30%"` as a third argument only when `focal` is not `center`.
4. **Run `pnpm build`.** It fails if a key has no file or an alt text is under 10 characters.
   Open the page (`pnpm dev`, or `pnpm preview` after the build) and check the photo.
5. **Commit** the three things together: `scripts/photos/manifest.json`, the data file
   (for example `src/data/villas.ts`) and the changed files under `src/assets/photos/`.

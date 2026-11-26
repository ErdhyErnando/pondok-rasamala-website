import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { d1, r2 } from "@emdash-cms/cloudflare";
import icon from "astro-iconset";
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import emdash from "emdash/astro";

export default defineConfig({
	site: "https://pondokrasamala.com",
	output: "server",
	// "compile": local images are resized to WebP srcsets by sharp at build time
	// and served as static files; runtime /_image requests are passthrough.
	adapter: cloudflare({ imageService: "compile" }),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	vite: {
		plugins: [tailwindcss()],
		ssr: {
			optimizeDeps: {
				// Pre-bundle so it isn't discovered mid-render, which would trigger
				// a Vite dep re-optimization and break in-flight worker imports
				// under the Cloudflare dev runner (workerd).
				include: ["astro-iconset/components"],
			},
		},
	},
	integrations: [
		{
			// Astro never routes src/pages files that start with "_", so the
			// CSP report sink is injected explicitly (prerender = false inside).
			name: "csp-report-route",
			hooks: {
				"astro:config:setup": ({ injectRoute }) => {
					injectRoute({
						pattern: "/_csp-report",
						entrypoint: new URL("./src/csp-report.ts", import.meta.url),
					});
				},
			},
		},
		sitemap({
			i18n: { defaultLocale: "id", locales: { id: "id-ID", en: "en-US" } },
		}),
		react(),
		icon({
			// Only ship the Phosphor icons actually referenced in templates,
			// not the full @iconify-json/ph set (which adds megabytes to the
			// deployed worker bundle).
			include: {
				ph: [
					"chart-bar",
					"check-circle",
					"clock",
					"cloud",
					"code",
					"currency-dollar",
					"envelope",
					"globe",
					"heart",
					"lifebuoy",
					"lightning",
					"lock",
					"shield-check",
					"sparkle",
					"star",
					"users-three",
				],
			},
		}),
		emdash({
			database: d1({ binding: "DB", session: "auto" }),
			storage: r2({ binding: "MEDIA" }),
			// Security headers wrap EmDash's whole middleware stack (see file).
			middleware: { outer: "./src/outer-middleware.ts" },
			plugins: [
				{
					id: "marketing-blocks",
					version: "0.1.0",
					// Absolute file:// URL so the virtual emdash/plugins module
					// can resolve this at build time (relative paths fail because
					// the virtual module has no on-disk location to anchor them).
					entrypoint: new URL("./src/plugins/marketing-blocks/index.ts", import.meta.url).href,
				},
			],
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-body",
			weights: [400, 500, 600, 700],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "Fraunces",
			cssVariable: "--font-heading",
			weights: [500, 600, 700],
			fallbacks: ["Georgia", "serif"],
		},
	],
	devToolbar: { enabled: false },
});

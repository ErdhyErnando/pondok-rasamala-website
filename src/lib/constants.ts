export const SITE = {
	name: "Pondok Rasamala",
	tagline: "Wisata Alam Pedesaan",
	url: "https://pondokrasamala.com",
	whatsapp: "6285771089787",
	phones: ["021-7250730", "021-72795447"],
	email: "info@pondokrasamala.com",
	address:
		"Jl. Raya Gunung Salak Endah, Kec. Pamijahan, Kab. Bogor, Jawa Barat",
	socials: {
		instagram: "https://www.instagram.com/pondokrasamala",
		tiktok: "https://www.tiktok.com/@pondokrasamala",
		youtube: "https://www.youtube.com/channel/UCESofkysfhq1l_7xLIllQ2A",
		facebook: "https://www.facebook.com/pondokrasamala",
	},
} as const;

/** 301 map: legacy WordPress → new. Mirrored in wrangler.jsonc [[redirects]]. */
export const REDIRECTS: Array<[string, string]> = [
	["/category/type-of-villa/", "/villa/"],
	["/category/glamping/", "/glamping/"],
	["/category/campsite/", "/campsite/"],
	["/outbound/", "/package/outbound/"],
	["/special-school-package/", "/package/special-school-package/"],
	["/dexter", "/"],
	["/author/adminpondok/", "/"],
];

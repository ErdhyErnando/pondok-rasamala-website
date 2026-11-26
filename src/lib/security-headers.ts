// Baseline security headers, delivered two ways:
//   - prerendered pages are static assets, so they get them from
//     public/_headers (Cloudflare Workers static assets);
//   - everything the worker renders gets them from src/outer-middleware.ts.
// KEEP public/_headers IN SYNC with this file. `scripts/` has no check for
// that, so edit both together (the PR verifies they match).
//
// EmDash's own middleware already sets X-Content-Type-Options, Referrer-Policy,
// Permissions-Policy and X-Frame-Options on worker responses, and an enforced
// CSP (frame-ancestors 'none') on /_emdash/*. We only fill in what is missing.
//
// No Strict-Transport-Security on purpose: it waits for the DNS cutover (#7).

/** Policy is Report-Only: nothing is blocked, violations go to /_csp-report. */
const csp = [
	"default-src 'self'",
	// 'unsafe-inline' covers the theme pre-paint script, Astro's small inlined
	// module scripts and the speculationrules block. 'inline-speculation-rules'
	// changes nothing today; it is the one keyword that still allows the
	// speculationrules block once 'unsafe-inline' is replaced by hashes (checked:
	// without both, Chromium reports that block as an extra violation).
	"script-src 'self' 'unsafe-inline' 'inline-speculation-rules' https://static.cloudflareinsights.com",
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data: https:",
	"font-src 'self'",
	"connect-src 'self' https://cloudflareinsights.com",
	// MapFacade loads https://www.google.com/maps?...&output=embed on demand.
	"frame-src https://www.google.com https://maps.google.com",
	"frame-ancestors 'self'",
	"base-uri 'self'",
	"form-action 'self' https://wa.me",
	"object-src 'none'",
	// report-to is the modern path (Chromium); report-uri covers Firefox/Safari.
	"report-to default",
	"report-uri /_csp-report",
].join("; ");

/** The admin previews media from blob: URLs; the public site does not. */
const adminCsp = csp.replace("img-src 'self' data: https:", "img-src 'self' data: blob: https:");

export const securityHeaders: Record<string, string> = {
	"X-Content-Type-Options": "nosniff",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"Cross-Origin-Opener-Policy": "same-origin-allow-popups",
	"X-Frame-Options": "SAMEORIGIN",
	"Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
	"Reporting-Endpoints": 'default="/_csp-report"',
};

export function cspReportOnly(pathname: string): string {
	return pathname.startsWith("/_emdash/") ? adminCsp : csp;
}

import { defineMiddleware } from "astro:middleware";
import { cspReportOnly, securityHeaders } from "./lib/security-headers";

// Registered through emdash({ middleware: { outer } }) in astro.config.mjs.
// EmDash runs its own middleware with order "pre", so a plain src/middleware.ts
// would sit *inside* that stack and miss EmDash's early responses (redirects,
// 503s). The outer hook wraps the whole stack and sees the final response.
//
// HTML responses only, and never override a header something else already set
// (EmDash sets nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options
// and, on /_emdash/*, an enforced CSP).
export const onRequest = defineMiddleware(async (context, next) => {
	const response = await next();
	if (!response.headers.get("content-type")?.toLowerCase().includes("text/html")) return response;

	const wanted: Array<[string, string]> = [
		...Object.entries(securityHeaders),
		["Content-Security-Policy-Report-Only", cspReportOnly(context.url.pathname)],
	];
	const missing = wanted.filter(([name]) => !response.headers.has(name));
	if (missing.length === 0) return response;

	try {
		for (const [name, value] of missing) response.headers.set(name, value);
		return response;
	} catch {
		// Immutable headers (e.g. a proxied fetch() response): rebuild instead.
		const copy = new Response(response.body, response);
		for (const [name, value] of missing) copy.headers.set(name, value);
		return copy;
	}
});

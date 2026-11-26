import type { APIRoute } from "astro";

// CSP violation sink for the Report-Only policy (see src/lib/security-headers.ts).
// Routed by the csp-report-route integration in astro.config.mjs.
// Logs a minimal, single-line record to the console (Workers logs) and answers
// 204. Deliberately not logged: query strings, fragments, cookies, IP addresses,
// user agents, and the report's `sample` (inline code snippet).
export const prerender = false;

const MAX_BODY = 16 * 1024;
const MAX_FIELD = 200;

/** Report fields are attacker-controlled: coerce, strip control chars, cap length. */
function clean(value: unknown): string | undefined {
	if (typeof value !== "string" && typeof value !== "number") return undefined;
	// eslint-disable-next-line no-control-regex
	return String(value).replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, MAX_FIELD);
}

/** Origin + path only. Keeps "inline", "eval", "data" and similar keywords as-is. */
function stripQuery(value: unknown): string | undefined {
	const s = clean(value);
	if (!s) return s;
	return s.split(/[?#]/)[0];
}

function pick(body: Record<string, unknown>) {
	return {
		document: stripQuery(body.documentURL ?? body.documentURI ?? body["document-uri"]),
		blocked: stripQuery(body.blockedURL ?? body.blockedURI ?? body["blocked-uri"]),
		directive: clean(body.effectiveDirective ?? body["effective-directive"] ?? body["violated-directive"]),
		disposition: clean(body.disposition),
		source: stripQuery(body.sourceFile ?? body["source-file"]),
		line: clean(body.lineNumber ?? body["line-number"]),
		column: clean(body.columnNumber ?? body["column-number"]),
	};
}

export const POST: APIRoute = async ({ request }) => {
	try {
		const declared = Number(request.headers.get("content-length") ?? 0);
		if (declared > MAX_BODY) return new Response(null, { status: 204 });
		const text = (await request.text()).slice(0, MAX_BODY);
		const json: unknown = JSON.parse(text);
		// Reporting API: [{ type: "csp-violation", body: {...} }, ...]
		// Legacy report-uri: { "csp-report": {...} }
		const bodies: Array<Record<string, unknown>> = [];
		if (Array.isArray(json)) {
			for (const r of json.slice(0, 10)) {
				if (r && typeof r === "object" && (r as { type?: string }).type === "csp-violation") {
					const b = (r as { body?: unknown }).body;
					if (b && typeof b === "object") bodies.push(b as Record<string, unknown>);
				}
			}
		} else if (json && typeof json === "object") {
			const b = (json as Record<string, unknown>)["csp-report"];
			if (b && typeof b === "object") bodies.push(b as Record<string, unknown>);
		}
		for (const b of bodies) console.warn("[csp-report]", JSON.stringify(pick(b)));
	} catch {
		// Malformed report: nothing useful to log.
	}
	return new Response(null, { status: 204 });
};

export const ALL: APIRoute = () =>
	new Response(null, { status: 405, headers: { Allow: "POST" } });

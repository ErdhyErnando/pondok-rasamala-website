/** IDR formatting. Seed prices are single nightly rates — shown verbatim. */
export function formatIDR(n: number): string {
	return `Rp${n.toLocaleString("id-ID")}`;
}

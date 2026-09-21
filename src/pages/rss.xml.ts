import { posts, postPath } from "../data/posts";
import { SITE } from "../lib/constants";

export const prerender = true;

export function GET() {
	const items = posts
		.map(
			(p) => `    <item>
      <title><![CDATA[${p.title.id}]]></title>
      <link>${SITE.url}${postPath(p.slug)}</link>
      <guid>${SITE.url}${postPath(p.slug)}</guid>
      <description><![CDATA[${p.excerpt.id}]]></description>
      <pubDate>${new Date(p.pubDate + "T00:00:00").toUTCString()}</pubDate>
    </item>`,
		)
		.join("\n");
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE.name} — Blog</title>
    <link>${SITE.url}/blog/</link>
    <description>Panduan dan cerita dari kaki Gunung Salak.</description>
    <language>id</language>
${items}
  </channel>
</rss>`;
	return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

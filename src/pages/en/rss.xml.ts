import { posts, postPath } from "../../data/posts";
import { SITE } from "../../lib/constants";

export const prerender = true;

export function GET() {
	const items = posts
		.map(
			(p) => `    <item>
      <title><![CDATA[${p.title.en}]]></title>
      <link>${SITE.url}/en${postPath(p.slug).slice(0, -1)}/</link>
      <guid>${SITE.url}/en${postPath(p.slug).slice(0, -1)}/</guid>
      <description><![CDATA[${p.excerpt.en}]]></description>
      <pubDate>${new Date(p.pubDate + "T00:00:00").toUTCString()}</pubDate>
    </item>`,
		)
		.join("\n");
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE.name} — Blog (EN)</title>
    <link>${SITE.url}/en/blog/</link>
    <description>Guides and stories from the foot of Mount Salak.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;
	return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

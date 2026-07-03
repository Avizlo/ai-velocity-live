import { insightsData } from '@/lib/insightsData';
import { siteConfig } from '@/lib/site.config';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
    const baseUrl = siteConfig.url;

    const items = [...insightsData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 30)
        .map((article) => {
            const pubDate = new Date(article.date).toUTCString();
            const url = `${baseUrl}/news-insights/${article.slug}`;
            const excerpt = (article.excerpt || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const title = (article.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${excerpt}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${article.category || siteConfig.name}</category>
      <author>${siteConfig.contactEmail} (${article.author || siteConfig.name})</author>
    </item>`;
        })
        .join('');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteConfig.name} — News &amp; Insights</title>
    <link>${baseUrl}</link>
    <description>Independent news, analysis and intelligence on agentic commerce, autonomous marketing, AI-native payments, and the emerging machine economy.</description>
    <language>en-gb</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <atom:link rel="hub" href="https://pubsubhubbub.appspot.com/"/>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>${siteConfig.name}</title>
      <link>${baseUrl}</link>
    </image>${items}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
    });
}

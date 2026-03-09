import { insightsData } from '@/lib/insightsData';
import { CATEGORY_SLUGS } from '@/lib/categoryRegistry';

const BASE_URL = 'https://aivelocity.dev';

export default function sitemap() {
    // Static pages
    const staticPages = [
        {
            url: BASE_URL,
            lastModified: new Date('2026-03-09'),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/agentic-commerce`,
            lastModified: new Date('2026-03-09'),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/agentic-marketing`,
            lastModified: new Date('2026-03-09'),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/agentic-payments`,
            lastModified: new Date('2026-03-09'),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/agentic-aeo`,
            lastModified: new Date('2026-03-09'),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/agentic-strategy`,
            lastModified: new Date('2026-03-09'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: new Date('2026-03-09'),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/news-insights`,
            lastModified: new Date('2026-03-09'),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Dynamic blog category pages — lastModified from most recent article in category
    const categoryPages = Object.keys(CATEGORY_SLUGS).map(slug => {
        const categoryName = CATEGORY_SLUGS[slug];
        const categoryArticles = insightsData
            .filter(a => a.category === categoryName)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        const latestDate = categoryArticles.length > 0
            ? new Date(categoryArticles[0].date)
            : new Date();
        return {
            url: `${BASE_URL}/news-insights/${slug}`,
            lastModified: latestDate,
            changeFrequency: 'weekly',
            priority: 0.75,
        };
    });

    // Dynamic blog article pages
    const articlePages = insightsData.map(article => ({
        url: `${BASE_URL}/news-insights/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [...staticPages, ...categoryPages, ...articlePages];
}

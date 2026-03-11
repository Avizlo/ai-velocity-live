import { insightsData } from '@/lib/insightsData';
import { createMetadata } from '@/lib/metadata';

// Server Component for News & Insights SEO Metadata
export const metadata = createMetadata({
    pageTitle: 'News & Insights | AI Velocity',
    title: 'News & Insights | AI Velocity',
    description: 'Expert analysis on agentic commerce, autonomous marketing, AEO strategy, and machine-to-machine payment protocols. Insights from the AI Velocity engineering team.',
    ogDescription: 'Expert analysis on agentic commerce, autonomous marketing, AEO strategy, and machine-to-machine payment protocols.',
    path: '/news-insights',
    ogSubtitle: 'AI Velocity',
});

// CollectionPage + BreadcrumbList JSON-LD for agent discoverability
const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Home',
                    'item': 'https://aivelocity.dev',
                },
                {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': 'News & Insights',
                    'item': 'https://aivelocity.dev/news-insights',
                },
            ],
        },
        {
            '@type': 'CollectionPage',
            'name': 'News & Insights',
            'description': 'Expert analysis on agentic commerce, autonomous marketing, AEO strategy, and machine-to-machine payment protocols.',
            'url': 'https://aivelocity.dev/news-insights',
            'isPartOf': {
                '@type': 'WebSite',
                'name': 'AI Velocity',
                'url': 'https://aivelocity.dev',
            },
            'publisher': {
                '@type': 'Organization',
                'name': 'AI Velocity',
                'url': 'https://aivelocity.dev',
            },
            'speakable': {
                '@type': 'SpeakableSpecification',
                'cssSelector': ['h1', 'h2', '.sr-only'],
            },
            'hasPart': insightsData.map(article => ({
                '@type': article.category === 'News' ? 'NewsArticle' : 'Article',
                'headline': article.title,
                'url': `https://aivelocity.dev/news-insights/${article.slug}`,
                'datePublished': article.date,
                'description': article.excerpt,
                'author': {
                    '@type': 'Organization',
                    'name': article.author,
                },
            })),
        },
    ],
};

export default function NewsInsightsLayout({ children }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
            />
            {children}
        </>
    );
}

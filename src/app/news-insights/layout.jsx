import { insightsData } from '@/lib/insightsData';

// Server Component for News & Insights SEO Metadata
export const metadata = {
    title: 'News & Insights | AI Velocity',
    description: 'Expert analysis on agentic commerce, autonomous marketing, AEO strategy, and machine-to-machine payment protocols. Insights from the AI Velocity engineering team.',
    openGraph: {
        title: 'News & Insights | AI Velocity',
        description: 'Expert analysis on agentic commerce, autonomous marketing, AEO strategy, and machine-to-machine payment protocols.',
        type: 'website',
    },
};

// CollectionPage JSON-LD for agent discoverability
const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'News & Insights',
    description: 'Expert analysis on agentic commerce, autonomous marketing, AEO strategy, and machine-to-machine payment protocols.',
    url: 'https://ai-velocity.com/news-insights',
    isPartOf: {
        '@type': 'WebSite',
        name: 'AI Velocity',
        url: 'https://ai-velocity.com',
    },
    publisher: {
        '@type': 'Organization',
        name: 'AI Velocity',
        url: 'https://ai-velocity.com',
    },
    hasPart: insightsData.map(article => ({
        '@type': article.category === 'News' ? 'NewsArticle' : 'Article',
        headline: article.title,
        url: `https://ai-velocity.com/news-insights/${article.slug}`,
        datePublished: article.date,
        description: article.excerpt,
        author: {
            '@type': 'Organization',
            name: article.author,
        },
    })),
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

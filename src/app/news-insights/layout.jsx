import { insightsData } from '@/lib/insightsData';

// Server Component for News & Insights SEO Metadata
export const metadata = {
    title: 'News & Insights | Your Brand',
    description: 'Expert analysis on agentic commerce, autonomous marketing, AEO strategy, and machine-to-machine payment protocols. Insights from the Your Brand engineering team.',
    alternates: {
        canonical: 'https://example.com/news-insights',
    },
    openGraph: {
        title: 'News & Insights | Your Brand',
        description: 'Expert analysis on agentic commerce, autonomous marketing, AEO strategy, and machine-to-machine payment protocols.',
        url: 'https://example.com/news-insights',
        siteName: 'Your Brand',
        type: 'website',
        images: [
            {
                url: 'https://example.com/images/agentic-agent-hero.webp',
                width: 1200,
                height: 630,
                alt: 'Your Brand News & Insights — Expert analysis on agentic commerce and autonomous AI',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'News & Insights | Your Brand',
        description: 'Expert analysis on agentic commerce, autonomous marketing, AEO strategy, and machine-to-machine payment protocols.',
        images: ['https://example.com/images/agentic-agent-hero.webp'],
    },
};

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
                    'item': 'https://example.com',
                },
                {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': 'News & Insights',
                    'item': 'https://example.com/news-insights',
                },
            ],
        },
        {
            '@type': 'CollectionPage',
            'name': 'News & Insights',
            'description': 'Expert analysis on agentic commerce, autonomous marketing, AEO strategy, and machine-to-machine payment protocols.',
            'url': 'https://example.com/news-insights',
            'isPartOf': {
                '@type': 'WebSite',
                'name': 'Your Brand',
                'url': 'https://example.com',
            },
            'publisher': {
                '@type': 'Organization',
                'name': 'Your Brand',
                'url': 'https://example.com',
            },
            'speakable': {
                '@type': 'SpeakableSpecification',
                'cssSelector': ['h1', 'h2', '.sr-only'],
            },
            'hasPart': insightsData.map(article => ({
                '@type': article.category === 'News' ? 'NewsArticle' : 'Article',
                'headline': article.title,
                'url': `https://example.com/news-insights/${article.slug}`,
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

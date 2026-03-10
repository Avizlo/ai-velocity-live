// Server Component for Agentic Marketing SEO Metadata
import { insightsData } from '@/lib/insightsData';

export const metadata = {
    title: 'Agentic Marketing — Autonomous AI Campaign Orchestration | Your Brand',
    description: 'Agentic marketing deploys autonomous AI agents to execute campaign orchestration, content generation, and performance optimisation at machine speed — replacing legacy agency models with goal-driven digital labor.',
    alternates: {
        canonical: 'https://example.com/agentic-marketing',
    },
    openGraph: {
        title: 'Agentic Marketing — Autonomous AI Campaign Orchestration',
        description: 'Autonomous AI agents that execute campaign orchestration, content generation, and performance marketing at machine speed. The future of brand growth is agent-to-agent.',
        url: 'https://example.com/agentic-marketing',
        siteName: 'Your Brand',
        type: 'website',
        images: [
            {
                url: 'https://example.com/images/ai-model-marketing.webp',
                width: 1200,
                height: 630,
                alt: 'Your Brand Agentic Marketing — Autonomous AI campaign orchestration',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Agentic Marketing — Autonomous AI Campaign Orchestration',
        description: 'Autonomous AI agents that execute campaign orchestration, content generation, and performance marketing at machine speed.',
        images: ['https://example.com/images/ai-model-marketing.webp'],
    },
};

export default function Layout({ children }) {
    const categoryArticles = insightsData
        .filter(a => a.category === 'Agentic Marketing')
        .map(a => ({
            '@type': 'Article',
            headline: a.title,
            url: `https://example.com/news-insights/${a.slug}`,
        }));

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://example.com/agentic-marketing',
        name: 'Agentic Marketing',
        url: 'https://example.com/agentic-marketing',
        description: 'Agentic marketing deploys autonomous AI agents to execute campaign orchestration, content generation, and performance optimisation at machine speed.',
        isPartOf: { '@id': 'https://example.com/#website' },
        about: { '@id': 'https://example.com/#organization' },
        hasPart: categoryArticles,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            {children}
        </>
    );
}

// Server Component for Agentic Marketing SEO Metadata
import { insightsData } from '@/lib/insightsData';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    pageTitle: 'Agentic Marketing, Autonomous AI Campaign Orchestration | AI Velocity',
    title: 'Agentic Marketing, Autonomous AI Campaign Orchestration',
    description: 'Agentic marketing deploys autonomous AI agents to execute campaign orchestration, content generation, and performance optimisation at machine speed, replacing legacy agency models with goal-driven digital labor.',
    ogDescription: 'Autonomous AI agents that execute campaign orchestration, content generation, and performance marketing at machine speed. The future of brand growth is agent-to-agent.',
    path: '/agentic-marketing',
    ogSubtitle: 'Service Page',
});

export default function Layout({ children }) {
    const categoryArticles = insightsData
        .filter(a => a.category === 'Agentic Marketing')
        .map(a => ({
            '@type': 'Article',
            headline: a.title,
            url: `https://aivelocity.dev/news-insights/${a.slug}`,
        }));

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://aivelocity.dev/agentic-marketing',
        name: 'Agentic Marketing',
        url: 'https://aivelocity.dev/agentic-marketing',
        description: 'Agentic marketing deploys autonomous AI agents to execute campaign orchestration, content generation, and performance optimisation at machine speed.',
        isPartOf: { '@id': 'https://aivelocity.dev/#website' },
        about: { '@id': 'https://aivelocity.dev/#organization' },
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

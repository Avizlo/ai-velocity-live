// Server Component for Agentic Commerce SEO Metadata
import { insightsData } from '@/lib/insightsData';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    pageTitle: 'Agentic Commerce, Autonomous AI Agents for Procurement & Settlement | AI Velocity',
    title: 'Agentic Commerce, Autonomous AI Procurement & Settlement',
    description: 'Agentic commerce replaces manual storefronts with autonomous AI agents that discover, negotiate, and settle purchases on behalf of your customers, 24/7, in 60+ languages. Learn how AI Velocity builds this infrastructure.',
    ogDescription: 'Autonomous AI agents that discover, negotiate, and settle purchases on behalf of your customers, 24/7, in 60+ languages. The future of commerce is agent-to-agent.',
    path: '/agentic-commerce',
    ogSubtitle: 'Service Page',
});

export default function Layout({ children }) {
    const categoryArticles = insightsData
        .filter(a => a.category === 'Agentic Commerce')
        .map(a => ({
            '@type': 'Article',
            headline: a.title,
            url: `https://aivelocity.dev/news-insights/${a.slug}`,
        }));

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://aivelocity.dev/agentic-commerce',
        name: 'Agentic Commerce',
        url: 'https://aivelocity.dev/agentic-commerce',
        description: 'Agentic commerce replaces manual storefronts with autonomous AI agents that discover, negotiate, and settle purchases on behalf of your customers.',
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

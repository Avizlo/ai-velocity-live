import { insightsData } from '@/lib/insightsData';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    pageTitle: 'Agentic AEO, Answer Engine Optimization for AI Agents | AI Velocity',
    title: 'Agentic AEO, Answer Engine Optimization for AI Agents',
    description: 'Agentic AEO restructures your digital footprint so autonomous AI agents cite your brand as the canonical answer. Structured schema, semantic knowledge graphs, and entity anchoring that make you the primary source for LLMs, ChatGPT, Perplexity, and Gemini.',
    ogDescription: 'Make your brand the canonical answer for autonomous AI search agents. Entity anchoring, knowledge graphs, and structured schema that dominate the generative search layer.',
    path: '/agentic-aeo',
    ogSubtitle: 'Service Page',
});

export default function AgenticAEOLayout({ children }) {
    const categoryArticles = insightsData
        .filter(a => a.category === 'Agentic AEO')
        .map(a => ({
            '@type': 'Article',
            headline: a.title,
            url: `https://aivelocity.dev/news-insights/${a.slug}`,
        }));

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://aivelocity.dev/agentic-aeo',
        name: 'Agentic AEO',
        url: 'https://aivelocity.dev/agentic-aeo',
        description: 'Agentic AEO restructures your digital footprint so autonomous AI agents cite your brand as the canonical answer.',
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

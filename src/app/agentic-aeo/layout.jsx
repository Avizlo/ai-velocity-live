import { insightsData } from '@/lib/insightsData';

export const metadata = {
    title: 'Agentic AEO — Answer Engine Optimization for AI Agents | Your Brand',
    description: 'Agentic AEO restructures your digital footprint so autonomous AI agents cite your brand as the canonical answer. Structured schema, semantic knowledge graphs, and entity anchoring that make you the primary source for LLMs, ChatGPT, Perplexity, and Gemini.',
    alternates: {
        canonical: 'https://example.com/agentic-aeo',
    },
    openGraph: {
        title: 'Agentic AEO — Answer Engine Optimization for AI Agents',
        description: 'Make your brand the canonical answer for autonomous AI search agents. Entity anchoring, knowledge graphs, and structured schema that dominate the generative search layer.',
        url: 'https://example.com/agentic-aeo',
        siteName: 'Your Brand',
        type: 'website',
        images: [
            {
                url: 'https://example.com/images/agentic-agent-hero.webp',
                width: 1200,
                height: 630,
                alt: 'Your Brand Agentic AEO — Answer Engine Optimization for AI agents',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Agentic AEO — Answer Engine Optimization for AI Agents',
        description: 'Make your brand the canonical answer for autonomous AI search agents. Entity anchoring, knowledge graphs, and structured schema.',
        images: ['https://example.com/images/agentic-agent-hero.webp'],
    },
};

export default function AgenticAEOLayout({ children }) {
    const categoryArticles = insightsData
        .filter(a => a.category === 'Agentic AEO')
        .map(a => ({
            '@type': 'Article',
            headline: a.title,
            url: `https://example.com/news-insights/${a.slug}`,
        }));

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://example.com/agentic-aeo',
        name: 'Agentic AEO',
        url: 'https://example.com/agentic-aeo',
        description: 'Agentic AEO restructures your digital footprint so autonomous AI agents cite your brand as the canonical answer.',
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

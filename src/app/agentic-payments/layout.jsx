import { insightsData } from '@/lib/insightsData';

export const metadata = {
    title: 'Agentic Payments | Autonomous Settlement Infrastructure | Your Brand',
    description: 'Agentic payments orchestrate instant, machine-to-machine settlements via autonomous software delegates. Explore the v402 handshake, sovereign settlement protocols, and the financial infrastructure powering agent-to-agent commerce.',
    alternates: {
        canonical: 'https://example.com/agentic-payments',
    },
    openGraph: {
        title: 'Agentic Payments — Autonomous Settlement Infrastructure',
        description: 'Instant machine-to-machine settlements via autonomous AI delegates. The v402 handshake protocol enables sovereign, cryptographically verified settlement at global scale.',
        url: 'https://example.com/agentic-payments',
        siteName: 'Your Brand',
        type: 'website',
        images: [
            {
                url: 'https://example.com/images/agentic-agent-hero.webp',
                width: 1200,
                height: 630,
                alt: 'Your Brand Agentic Payments — Autonomous settlement infrastructure',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Agentic Payments — Autonomous Settlement Infrastructure',
        description: 'Instant machine-to-machine settlements via autonomous AI delegates. The financial infrastructure powering agent-to-agent commerce.',
        images: ['https://example.com/images/agentic-agent-hero.webp'],
    },
};

export default function AgenticPaymentsLayout({ children }) {
    const categoryArticles = insightsData
        .filter(a => a.category === 'Agentic Payments')
        .map(a => ({
            '@type': 'Article',
            headline: a.title,
            url: `https://example.com/news-insights/${a.slug}`,
        }));

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://example.com/agentic-payments',
        name: 'Agentic Payments',
        url: 'https://example.com/agentic-payments',
        description: 'Agentic payments orchestrate instant, machine-to-machine settlements via autonomous software delegates.',
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

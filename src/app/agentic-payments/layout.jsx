import { insightsData } from '@/lib/insightsData';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    pageTitle: 'Agentic Payments | Autonomous Settlement Infrastructure | AI Velocity',
    title: 'Agentic Payments, Autonomous Settlement Infrastructure',
    description: 'Agentic payments orchestrate instant, machine-to-machine settlements via autonomous software delegates. Explore the v402 handshake, sovereign settlement protocols, and the financial infrastructure powering agent-to-agent commerce.',
    ogDescription: 'Instant machine-to-machine settlements via autonomous AI delegates. The v402 handshake protocol enables sovereign, cryptographically verified settlement at global scale.',
    path: '/agentic-payments',
    ogSubtitle: 'Service Page',
});

export default function AgenticPaymentsLayout({ children }) {
    const categoryArticles = insightsData
        .filter(a => a.category === 'Agentic Payments')
        .map(a => ({
            '@type': 'Article',
            headline: a.title,
            url: `https://aivelocity.dev/news-insights/${a.slug}`,
        }));

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://aivelocity.dev/agentic-payments',
        name: 'Agentic Payments',
        url: 'https://aivelocity.dev/agentic-payments',
        description: 'Agentic payments orchestrate instant, machine-to-machine settlements via autonomous software delegates.',
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

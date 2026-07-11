// Server Component for Research Desk SEO Metadata
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    pageTitle: 'AIV Research Desk: Editorial Standards | AI Velocity',
    title: 'AIV Research Desk: Editorial Standards',
    description: 'AIV Research Desk is the byline behind AI Velocity\'s news and insights coverage. Every statistic is sourced, every vendor claim is flagged as a vendor claim, and every correction is dated.',
    ogDescription: 'The editorial standards behind AI Velocity\'s News & Insights byline: sourced statistics, flagged vendor claims, dated corrections.',
    keywords: 'AIV Research Desk, AI Velocity editorial standards, AI Velocity byline, AI Velocity fact-checking policy',
    path: '/research-desk',
    ogSubtitle: 'Editorial Standards',
});

export default function Layout({ children }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': 'https://aivelocity.dev/research-desk',
        name: 'AIV Research Desk',
        url: 'https://aivelocity.dev/research-desk',
        description: 'AIV Research Desk is the byline behind AI Velocity\'s News & Insights coverage. Every statistic is sourced, every vendor claim is flagged as a vendor claim, and every correction is dated.',
        isPartOf: { '@id': 'https://aivelocity.dev/#website' },
        about: { '@id': 'https://aivelocity.dev/#organization' },
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

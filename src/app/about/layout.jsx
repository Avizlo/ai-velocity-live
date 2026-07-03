// Server Component for About SEO Metadata
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    pageTitle: 'About AI Velocity: Built by an Operator, Not a Consultancy | AI Velocity',
    title: 'About AI Velocity: Built by an Operator, Not a Consultancy',
    description: 'AI Velocity is run by a working ecommerce operator with a 30-year record across action sports and heritage retail. Every method on this site runs in production before it is written about.',
    ogDescription: 'AI Velocity is run by a working ecommerce operator. Every method on this site runs in production before it is written about.',
    keywords: 'About AI Velocity, AI-first web development, agentic commerce consultancy, ecommerce operator',
    path: '/about',
    ogSubtitle: 'About',
});

export default function Layout({ children }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        '@id': 'https://aivelocity.dev/about',
        name: 'About AI Velocity',
        url: 'https://aivelocity.dev/about',
        description: 'AI Velocity is run by a working ecommerce operator. Every method on this site runs in production before it is written about.',
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

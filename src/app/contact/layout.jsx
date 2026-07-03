// Server Component for Contact SEO Metadata
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    pageTitle: 'Contact AI Velocity | AI Velocity',
    title: 'Contact AI Velocity',
    description: 'Get in touch with AI Velocity about AI-first web development, AEO and agentic commerce. Messages go straight to the operator, not a sales queue.',
    ogDescription: 'Get in touch with AI Velocity about AI-first web development, AEO and agentic commerce.',
    keywords: 'Contact AI Velocity, agentic commerce consultancy, AEO services',
    path: '/contact',
    ogSubtitle: 'Contact',
});

export default function Layout({ children }) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': 'https://aivelocity.dev/contact',
        name: 'Contact AI Velocity',
        url: 'https://aivelocity.dev/contact',
        description: 'Get in touch with AI Velocity about AI-first web development, AEO and agentic commerce.',
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

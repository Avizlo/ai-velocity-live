import { StrategyOption1 } from '@/components/sections/StrategyOption1';
import { StrategyOption3 } from '@/components/sections/StrategyOption3';
import { CTABanner } from '@/components/sections/CTABanner';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    pageTitle: 'Agentic Commerce Timeline and Strategy | AI Velocity',
    title: 'Agentic Commerce Timeline and Strategy | AI Velocity',
    description: 'What has shipped in agentic commerce, what has not, and what a merchant should do now. Dated, sourced, reviewed October 2026.',
    path: '/agentic-strategy',
});

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebPage",
            "@id": "https://aivelocity.dev/agentic-strategy/#webpage",
            "url": "https://aivelocity.dev/agentic-strategy",
            "name": "Agentic Commerce Timeline and Strategy",
            "description": "What has shipped in agentic commerce, what has not, and what a merchant should do now.",
            "dateModified": "2026-10-02",
            "isPartOf": { "@id": "https://aivelocity.dev/#website" },
            "publisher": { "@id": "https://aivelocity.dev/#organization" }
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aivelocity.dev" },
                { "@type": "ListItem", "position": 2, "name": "Agentic Strategy", "item": "https://aivelocity.dev/agentic-strategy" }
            ]
        }
    ]
};

export default function AgenticStrategyPage() {
    return (
        <main className="min-h-screen bg-charcoal selection:bg-electric-mint selection:text-charcoal relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <StrategyOption1 />
            <StrategyOption3 />
            <CTABanner title="The evidence moves monthly. So does this page." />
        </main>
    );
}

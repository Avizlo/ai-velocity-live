import Link from 'next/link';

// The standards are the argument. No invented persona, no borrowed credentials:
// this is the editorial policy behind every News & Insights byline on the site.
const standards = [
    {
        title: 'Every statistic is sourced',
        body: 'A number appears in an article only if it traces to a named, linkable source: a published report, a company announcement, a regulatory filing, or a tool pull run during research for that piece. Unsourced figures do not ship.',
    },
    {
        title: 'Vendor claims are flagged as vendor claims',
        body: 'When a statistic or result comes from the company being covered, the article says so explicitly, in the sentence carrying the claim, not in a footnote. A single named-customer result is labelled as exactly that: directional case evidence, not an aggregated study.',
    },
    {
        title: 'Corrections are dated, not silently edited',
        body: 'When a fact changes, an article is updated and its modified date moves with it. AI Velocity does not quietly rewrite a published claim; the update is visible in the article\'s Published/Updated metadata.',
    },
    {
        title: 'Research is verified in-session',
        body: 'External facts (company moves, product launches, prices, dates, version numbers) are checked against live sources at the time of writing, not recalled from memory. Stale or unverifiable claims are marked as such or left out.',
    },
];

export default function ResearchDeskPage() {
    return (
        <main className="min-h-screen bg-charcoal selection:bg-electric-mint selection:text-charcoal pb-24">

            {/* Opening statement */}
            <section className="px-6 md:px-12 mx-auto max-w-screen-2xl pt-40 md:pt-48 pb-16 md:pb-24">
                <span className="font-mono text-electric-mint text-[10px] md:text-xs uppercase tracking-widest">
                    AIV Research Desk
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.05] max-w-5xl mt-6">
                    The byline behind News &amp; Insights.
                </h1>
                <p className="text-lg md:text-xl text-white/80 font-sans max-w-3xl leading-relaxed mt-8 border-l-2 border-electric-mint/50 pl-6">
                    AIV Research Desk is the editorial byline for AI Velocity&apos;s News &amp; Insights coverage.
                    It is not a person; it is the standard this team holds every article to, published under a
                    consistent name so the standard, not an invented biography, is what readers are trusting.
                </p>
            </section>

            {/* Editorial standards */}
            <section className="px-6 md:px-12 mx-auto max-w-screen-2xl py-16 border-t border-white/5">
                <h2 className="font-serif text-white/90 text-3xl md:text-4xl tracking-tight mb-12">
                    Editorial standards
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {standards.map((s) => (
                        <div key={s.title} className="border border-white/5 rounded-card p-8 bg-charcoal">
                            <h3 className="font-serif text-white/90 text-xl leading-tight mb-4">{s.title}</h3>
                            <p className="text-white/60 font-sans text-sm leading-relaxed">{s.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why a desk byline, not a named author */}
            <section className="px-6 md:px-12 mx-auto max-w-screen-2xl py-16 border-t border-white/5">
                <h2 className="font-serif text-white/90 text-3xl md:text-4xl tracking-tight mb-8">
                    Why a desk byline
                </h2>
                <p className="text-white/80 font-sans max-w-3xl leading-relaxed">
                    AI Velocity is currently in a stealth-mode building phase (see <Link href="/about" className="text-electric-mint underline decoration-electric-mint/30 underline-offset-2 hover:text-white transition-colors duration-200">About</Link>).
                    Publishing under a named individual with full credentials will come when the site exits that
                    phase. Until then, AIV Research Desk is the honest version: it makes no claim to expertise
                    it cannot demonstrate on the page, and every article stands or falls on its own sourcing, not
                    on a borrowed reputation.
                </p>
            </section>

            {/* CTA */}
            <section className="px-6 md:px-12 mx-auto max-w-screen-2xl py-16 border-t border-white/5">
                <p className="text-white/80 font-sans max-w-3xl leading-relaxed mb-8">
                    Spotted an error or an outdated figure in a News &amp; Insights article? Corrections are welcome
                    and get dated in the article the moment they are made.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-electric-mint border border-electric-mint/40 rounded-card px-5 py-2 hover:bg-electric-mint hover:text-charcoal transition-all duration-300"
                >
                    Report a correction
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
            </section>
        </main>
    );
}

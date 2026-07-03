import Link from 'next/link';

// The record is the argument. Each line is a fact the founder can stand behind
// in a room, which is the entire editorial standard of this site.
const record = [
    {
        period: '30 years',
        line: 'Inside action sports culture: snow, skate, surf. Sales rep, distributor, country head of sales and marketing, European trade-show brand launcher.',
    },
    {
        period: '4 titles',
        line: 'Four-time British Snowboard Champion. The cultural credential came before the commercial one.',
    },
    {
        period: '7 years',
        line: 'Ran Nixon watches in the UK from day one, while the brand became a defining accessory of snow, skate and surf culture.',
    },
    {
        period: 'Founder',
        line: 'Founded blackleaf.com and built it into one of the most successful action sports lifestyle ecommerce sites of its era.',
    },
    {
        period: 'Present',
        line: 'Runs ecommerce growth for a heritage UK menswear retailer: from roughly £500K to £4.3M in online revenue, hands-on across SEO, advertising, design and web development.',
    },
    {
        period: 'Now',
        line: 'Builds AI-first: this site, the Avizlo commerce ecosystem behind it, and the instrumented measurement stack that keeps every claim on this site honest.',
    },
];

const principles = [
    {
        title: 'Production before publication',
        body: 'Nothing is recommended here that has not run on a live, revenue-carrying site first. The methods are tested where the money is.',
    },
    {
        title: 'Instruments, not opinions',
        body: 'Every figure on this site traces to a named source or a measured system. If a claim cannot be sourced, it does not ship.',
    },
    {
        title: 'Operator economics',
        body: 'AI Velocity is built the way it advises clients to build: one operator, a coordinated AI workforce, and infrastructure that compounds instead of headcount that scales linearly.',
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-charcoal selection:bg-electric-mint selection:text-charcoal pb-24">

            {/* Opening statement */}
            <section className="px-6 md:px-12 mx-auto max-w-screen-2xl pt-40 md:pt-48 pb-16 md:pb-24">
                <span className="font-mono text-electric-mint text-[10px] md:text-xs uppercase tracking-widest">
                    About AI Velocity
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.05] max-w-5xl mt-6">
                    Built by an operator, not a consultancy.
                </h1>
                <p className="text-lg md:text-xl text-white/80 font-sans max-w-3xl leading-relaxed mt-8 border-l-2 border-electric-mint/50 pl-6">
                    AI Velocity is run by one person and an AI workforce. Everything published here, from
                    agentic commerce analysis to AEO method, is tested on live commercial sites before it
                    reaches this page. That is the whole editorial policy.
                </p>
            </section>

            {/* The record */}
            <section className="px-6 md:px-12 mx-auto max-w-screen-2xl py-16 border-t border-white/5">
                <h2 className="font-serif text-white/90 text-3xl md:text-4xl tracking-tight mb-12">
                    The record
                </h2>
                <dl className="max-w-4xl">
                    {record.map((item) => (
                        <div key={item.line} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-8 py-6 border-b border-white/10">
                            <dt className="font-mono text-electric-mint text-xs uppercase tracking-widest pt-1">
                                {item.period}
                            </dt>
                            <dd className="text-white/80 font-sans leading-relaxed">
                                {item.line}
                            </dd>
                        </div>
                    ))}
                </dl>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-6 max-w-4xl">
                    No client case studies appear on this site. When they do, they will be named, measured and verifiable.
                </p>
            </section>

            {/* Operating principles */}
            <section className="px-6 md:px-12 mx-auto max-w-screen-2xl py-16 border-t border-white/5">
                <h2 className="font-serif text-white/90 text-3xl md:text-4xl tracking-tight mb-12">
                    How this operation works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {principles.map((p) => (
                        <div key={p.title} className="border border-white/5 rounded-card p-8 bg-charcoal">
                            <h3 className="font-serif text-white/90 text-xl leading-tight mb-4">{p.title}</h3>
                            <p className="text-white/60 font-sans text-sm leading-relaxed">{p.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 md:px-12 mx-auto max-w-screen-2xl py-16 border-t border-white/5">
                <p className="text-white/80 font-sans max-w-3xl leading-relaxed mb-8">
                    AI Velocity is currently in a building phase, publishing methods and tracking the
                    agentic commerce shift while the service line is proven in production.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-electric-mint border border-electric-mint/40 rounded-card px-5 py-2 hover:bg-electric-mint hover:text-charcoal transition-all duration-300"
                >
                    Get in touch
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
            </section>
        </main>
    );
}

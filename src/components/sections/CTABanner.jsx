import Link from 'next/link';

export const CTABanner = ({
    title = "Stay current. The future is moving fast."
}) => {
    return (
        <section className="w-full bg-[#212121] py-24">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                {/* Left: editorial heading */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-white/95 tracking-tight leading-[1.1] max-w-2xl">
                        {title}
                    </h2>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-widest">
                    <Link href="/news-insights" className="inline-flex items-center min-h-[44px] text-electric-mint border-b border-electric-mint/50 hover:text-white hover:border-white transition-colors">Read the latest analysis</Link>
                    <a href="/feed.xml" className="inline-flex items-center min-h-[44px] text-white/70 border-b border-white/30 hover:text-white hover:border-white transition-colors">RSS feed</a>
                </div>
            </div>
        </section>
    );
};


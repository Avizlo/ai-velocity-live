export const CTABanner = ({
    title = <>Stay up-to-date with our latest news by following us at x.com</>,
    buttonText = "x.com/aivelocitydev",
    buttonLink = "https://x.com/aivelocitydev"
}) => {
    return (
        <section className="py-12 bg-cloud-dancer">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                {/* Card */}
                <div
                    className="relative overflow-hidden rounded-2xl px-10 md:px-16 py-14 md:py-20"
                    style={{ background: '#0d0e1a' }}
                >
                    {/* Electric mint glow blob — top left */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(151,213,174,0.4) 0%, rgba(151,213,174,0.15) 40%, transparent 70%)',
                            filter: 'blur(60px)',
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
                        <h2 className="font-sans text-white text-xl md:text-2xl lg:text-3xl font-medium tracking-wide">
                            {title}
                        </h2>

                        <a
                            href={buttonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 self-start md:self-auto px-6 py-3 rounded-card border border-white/30 bg-white/10 text-white text-sm font-sans font-medium backdrop-blur-sm hover:bg-white hover:text-charcoal transition-all duration-300 group whitespace-nowrap"
                        >
                            {buttonText}
                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

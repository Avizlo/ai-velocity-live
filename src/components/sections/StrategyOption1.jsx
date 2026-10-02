'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const StrategyOption1 = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current.querySelectorAll('.phase-anim'),
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Reviewed 2026-10-02. Every stat is dated and sourced; forward entries are questions, not forecasts.
    const phases = [
        {
            period: "Sep 2025 – Jan 2026",
            title: "The Protocols Are Published",
            desc: "OpenAI and Stripe open-source the Agentic Commerce Protocol (ACP). Google announces the Universal Commerce Protocol (UCP) at NRF with Shopify, Etsy, Wayfair, Target and Walmart. The standards for agent checkout exist on paper.",
            stat: "UCP announced 11 Jan 2026 (Google, NRF)",
            isCurrent: false
        },
        {
            period: "Mar – Apr 2026",
            title: "First Contact With Reality",
            desc: "OpenAI scales back in-chat Instant Checkout and routes buyers to merchant sites instead. Shopify switches on Agentic Storefronts for US merchants. Google hands the AP2 payments protocol to the FIDO Alliance.",
            stat: "Instant Checkout scaled back, 10 Mar 2026 (Retail Gazette)",
            isCurrent: false
        },
        {
            period: "Q3 2026",
            title: "Discovery Moves Faster Than Checkout",
            desc: "AI assistants send more shoppers to retail sites, and those visitors convert better than average. Buying inside the assistant stays rare. Being found, read and cited by AI matters now; agent checkout mostly does not yet.",
            stat: "AI referrals to US retail +62% YoY, converting 60% better (Adobe, Jul 2026)",
            isCurrent: false
        },
        {
            period: "Q4 2026",
            title: "Checkout Is Still US-First",
            desc: "Google's UCP checkout is rolling out to US merchants only, with Australia and Canada next and no UK date. Adobe Commerce has committed to UCP and ACP but not shipped them natively. For a UK merchant, the work that pays today is product data, AI visibility and measurement.",
            stat: "UCP checkout: US now, AU and CA next year (Google Merchant Center, Oct 2026)",
            isCurrent: true
        },
        {
            period: "2027",
            title: "The Questions That Decide It",
            desc: "Does agent checkout reach the UK, and on whose rails? Do platforms below Shopify ship native support? Do assistants keep sending traffic to merchants, or keep the purchase for themselves? We track the evidence here as it lands, not the forecasts.",
            stat: "Open: we update this timeline as the evidence changes",
            isCurrent: false
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-charcoal min-h-screen text-white relative flex flex-col items-center overflow-hidden">
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 text-center mt-12 md:mt-20 px-6">The Adaptation Timeline</h1>
            <p className="text-white/70 font-sans text-sm md:text-base max-w-xl text-center mb-16 md:mb-20 px-6">
                What has actually shipped in agentic commerce, what has not, and where a merchant stands today. Every milestone is dated and sourced. Last reviewed 2 October 2026.
            </p>

            <div className="relative w-full max-w-4xl mx-auto pb-16 px-6 md:px-0">
                {/* The Vertical Track Line */}
                <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/20 md:-translate-x-1/2"></div>

                {phases.map((phase, index) => (
                    <div key={index} className={`relative flex items-center justify-end md:justify-between w-full mb-12 md:mb-20 phase-anim flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        {/* The Content Box */}
                        <div className={`w-[calc(100%-4rem)] md:w-5/12 p-6 md:p-8 rounded-card border ${phase.isCurrent ? 'border-electric-mint/40 bg-electric-mint/5' : 'border-white/10 bg-white/5'} backdrop-blur-sm relative`}>
                            {/* Current marker */}
                            {phase.isCurrent && (
                                <div className="absolute -top-3 left-6 bg-electric-mint text-charcoal text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold">
                                    You are here
                                </div>
                            )}
                            <span className="font-mono text-electric-mint text-xs uppercase tracking-widest">{phase.period}</span>
                            <h3 className="text-xl md:text-2xl font-serif mt-2 mb-3">{phase.title}</h3>
                            <p className="text-white/70 font-sans text-sm mb-4">{phase.desc}</p>
                            {/* Stat callout */}
                            <div className={`flex items-center gap-2 pt-3 border-t ${phase.isCurrent ? 'border-electric-mint/20' : 'border-white/10'}`}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-electric-mint shrink-0"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                                <span className="font-mono text-electric-mint text-xs">{phase.stat}</span>
                            </div>
                        </div>
                        {/* The Center Node */}
                        <div className={`absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-10 ${phase.isCurrent ? 'w-5 h-5' : 'w-4 h-4'} rounded-full bg-electric-mint border-4 border-charcoal`}>
                            {phase.isCurrent && (
                                <span className="absolute inset-0 rounded-full bg-electric-mint animate-ping opacity-40"></span>
                            )}
                        </div>
                        {/* Empty Space for the other side on desktop */}
                        <div className="hidden md:block w-5/12"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const StrategyOption1 = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
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

    const phases = [
        {
            period: "Q4 2025",
            title: "The Protocol Layer Arrives",
            desc: "Stripe launches the Agentic Commerce Suite and co-develops the Agentic Commerce Protocol (ACP) with OpenAI. Google and Apple announce agent integration strategies. The foundational standards for machine-to-machine commerce are set.",
            stat: "Dec 2025: Stripe ACP goes live",
            isCurrent: false
        },
        {
            period: "Q1 2026",
            title: "The Payment Rails Go Live",
            desc: "Visa Intelligent Commerce, Mastercard Agent Pay, and Shared Payment Tokens create a three-layer trust stack for autonomous transactions. The settlement infrastructure for agentic commerce becomes operational across all major card networks.",
            stat: "$1.9T processed through Stripe in 2025",
            isCurrent: true
        },
        {
            period: "Q2–Q3 2026",
            title: "Enterprise Adoption Wave",
            desc: "Major retailers activate agent commerce through platform-level integrations. Squarespace, Wix, WooCommerce, and BigCommerce bring millions of merchants online for agent discovery. First measurable revenue from agent-originated transactions is reported.",
            stat: "81% of consumers open to agentic commerce",
            isCurrent: false
        },
        {
            period: "2027",
            title: "Autonomous Procurement at Scale",
            desc: "Agent-to-agent B2B transactions become standard operating procedure. Stablecoin settlement overtakes card rails for cross-border agent commerce. Level 3 agentic commerce, where agents purchase within delegated parameters, reaches mainstream adoption.",
            stat: "Stablecoin market cap exceeds $230B",
            isCurrent: false
        },
        {
            period: "2028–2029",
            title: "The Agent Economy Matures",
            desc: "Full-stack agentic commerce ecosystems manage entire procurement lifecycles. Traditional e-commerce becomes legacy architecture. Brands without agent-readable infrastructure experience measurable revenue decline as autonomous purchasing agents systematically exclude them.",
            stat: "$1T US agentic commerce (McKinsey projection)",
            isCurrent: false
        },
        {
            period: "2030",
            title: "$30 Trillion: The New Baseline",
            desc: "Agentic intelligence influences approximately 30% of global commerce. Autonomous agents handle discovery, negotiation, payment, and fulfilment across every major vertical. The commercial internet has been fundamentally restructured around machine-to-machine protocols.",
            stat: "$30T global commerce influenced by AI agents",
            isCurrent: false
        }
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-charcoal min-h-screen text-white relative flex flex-col items-center overflow-hidden">
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4 text-center mt-12 md:mt-20 px-6">The Adaptation Timeline</h1>
            <p className="text-white/50 font-sans text-sm md:text-base max-w-xl text-center mb-16 md:mb-20 px-6">
                The infrastructure for autonomous commerce is being built now. This is the timeline that will define the next era of global trade.
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
                            <p className="text-white/60 font-sans text-sm mb-4">{phase.desc}</p>
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

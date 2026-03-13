'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const StrategyOption3 = () => {
    const containerRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const scrollContainer = scrollContainerRef.current;
        let mm = gsap.matchMedia();

        // Desktop only horizontal scroll
        mm.add("(min-width: 768px)", () => {
            let totalWidth = scrollContainer.offsetWidth - window.innerWidth;

            gsap.to(scrollContainer, {
                x: -totalWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + totalWidth
                }
            });
        });

        return () => mm.revert();
    }, []);

    const panels = [
        {
            id: 1,
            title: "Make Your Brand Machine-Readable",
            text: "Implement JSON-LD schemas, structured product data, and clean API endpoints. AI agents cannot browse visual storefronts. They require structured data to discover, compare, and transact with your catalogue.",
            stat: "Brands without structured data are invisible to agents"
        },
        {
            id: 2,
            title: "Activate the Agent Payment Stack",
            text: "Connect to Stripe's Agentic Commerce Suite or equivalent agent-ready payment infrastructure. Enable Shared Payment Tokens, Visa Intelligent Commerce verification, and Mastercard Agent Pay to accept autonomous transactions securely.",
            stat: "One integration makes you visible to every major AI agent"
        },
        {
            id: 3,
            title: "Build for the Agent-First Future",
            text: "Audit your fraud detection rules to accept authenticated agent transactions. Monitor agent-originated revenue as a new KPI. Prepare your procurement and supply chain systems for autonomous B2B purchasing at scale.",
            stat: "The window to establish first-mover advantage is closing"
        }
    ];

    return (
        <section ref={containerRef} className="h-[90vh] md:h-screen bg-cloud-dancer text-charcoal overflow-hidden border-y border-charcoal/10 relative">
            {/* Massive background watermark */}
            <div className="absolute top-1/2 left-4 md:left-10 -translate-y-1/2 z-0 opacity-5 pointer-events-none whitespace-nowrap">
                <h2 className="text-[30vw] md:text-[20vw] font-serif italic tracking-tighter">Your Playbook</h2>
            </div>

            {/* Scroll Container: native snap on mobile, horizontal GSAP on desktop */}
            <div
                ref={scrollContainerRef}
                className="h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory md:overflow-visible md:w-[300vw] relative z-10 [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {panels.map((panel) => (
                    <div key={panel.id} className="min-w-[100vw] md:w-screen h-full flex flex-col justify-center px-8 md:px-24 border-r border-charcoal/10 snap-center shrink-0">
                        <span className="font-mono text-xs uppercase tracking-widest text-charcoal/50 mb-4 md:mb-6">Step 0{panel.id}</span>
                        <h2 className="text-5xl md:text-8xl font-serif tracking-tight mb-6 md:mb-8 md:w-3/4 leading-none">{panel.title}</h2>
                        <p className="text-lg md:text-2xl font-sans md:w-1/2 text-charcoal/70 leading-relaxed mb-6">{panel.text}</p>
                        <div className="flex items-center gap-2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-charcoal/40 shrink-0"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M12 8v4l3 3" /></svg>
                            <span className="font-mono text-charcoal/50 text-xs uppercase tracking-wider">{panel.stat}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile swipe hint overlay */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-charcoal/40 text-xs uppercase tracking-widest font-mono md:hidden pointer-events-none animate-pulse flex items-center gap-2">
                <span>Swipe</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </div>
        </section>
    );
};

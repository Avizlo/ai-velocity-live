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
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const phases = [
        { title: "Q3 2025: Semantic Legibility", desc: "Implementing JSON-LD across the entire product catalog to ensure discovery by language models." },
        { title: "Q4 2025: Headless Architecture", desc: "Decoupling the frontend to expose RESTful APIs directly to autonomous purchasing agents." },
        { title: "Q1 2026: Autonomous Settlement", desc: "Integrating the v402 Handshake to process machine-to-machine crypto payments instantly." }
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-charcoal min-h-screen text-white relative flex flex-col items-center overflow-hidden">
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-16 md:mb-20 text-center mt-12 md:mt-20 px-6">The Adaptation Timeline</h1>

            <div className="relative w-full max-w-4xl mx-auto pb-32 px-6 md:px-0">
                {/* The Vertical Track Line */}
                <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/20 md:-translate-x-1/2"></div>

                {phases.map((phase, index) => (
                    <div key={index} className={`relative flex items-center justify-end md:justify-between w-full mb-16 md:mb-24 phase-anim flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                        {/* The Content Box */}
                        <div className="w-[calc(100%-4rem)] md:w-5/12 p-6 md:p-8 rounded-card border border-white/10 bg-white/5 backdrop-blur-sm">
                            <span className="font-mono text-electric-mint text-xs uppercase tracking-widest">{`Phase ${index + 1}`}</span>
                            <h3 className="text-xl md:text-2xl font-serif mt-2 mb-3 md:mb-4">{phase.title}</h3>
                            <p className="text-white/60 font-sans text-sm">{phase.desc}</p>
                        </div>
                        {/* The Center Node */}
                        <div className="absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-electric-mint border-4 border-charcoal z-10"></div>
                        {/* Empty Space for the other side on desktop */}
                        <div className="hidden md:block w-5/12"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

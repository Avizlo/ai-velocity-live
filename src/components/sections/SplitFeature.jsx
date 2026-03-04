"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const SplitFeature = ({
    image = "/images/ai-model-1.webp",
    imageAlt,
    title,
    text1 = "Our agentic systems combine sovereign AI intelligence with creative precision to bring exceptional growth velocity to every brand we activate. Specialising in autonomous content generation, digital identity design, and AI-powered campaign execution — we build infrastructure that performs without limits.",
    text2 = "We are dedicated to achieving exceptional revenue outcomes, while maintaining full brand integrity and strategic alignment for our clients and their audiences.",
    ctaText = "Discover",
    ctaLink = "#contact",
    reverse = false,
    bgClass = "bg-cloud-dancer",
    theme = "light" // "light" or "dark"
}) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(imageRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
            )
                .fromTo(".split-anim",
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
                    "-=0.6"
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className={`py-20 ${bgClass}`}>
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left/Right: Image */}
                    <div ref={imageRef} className={`group rounded-card overflow-hidden aspect-[4/5] w-full max-w-md ${reverse ? 'md:order-last md:justify-self-end' : ''} opacity-0`}>
                        <img loading="lazy" decoding="async"
                            src={image}
                            alt={imageAlt || "Agentic AI model"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    {/* Left/Right: Text + CTA */}
                    <div ref={textRef} className={`flex flex-col justify-between h-full gap-16 ${reverse ? 'md:order-first' : ''}`}>
                        <div>
                            {title && (
                                <h2 className={`split-anim text-4xl md:text-5xl font-serif tracking-tight mb-8 opacity-0 translate-y-4 ${theme === 'dark' ? 'text-white' : 'text-charcoal'}`}>
                                    {title}
                                </h2>
                            )}
                            {text1 && (
                                <p className={`split-anim font-sans opacity-0 translate-y-4 ${theme === 'dark' ? 'text-white/90' : 'text-charcoal'}`}>
                                    {text1}
                                </p>
                            )}
                            {text2 && (
                                <p className={`split-anim font-sans mt-4 opacity-0 translate-y-4 ${theme === 'dark' ? 'text-white/90' : 'text-charcoal'}`}>
                                    {text2}
                                </p>
                            )}
                        </div>

                        <div className="split-anim opacity-0 translate-y-4">
                            <MagneticButton>
                                <a
                                    href={ctaLink}
                                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-card border text-sm font-sans font-medium transition-all duration-300 group ${theme === 'dark' ? 'border-white/30 text-white hover:bg-white hover:text-charcoal' : 'border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-white'}`}
                                >
                                    {ctaText}
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </a>
                            </MagneticButton>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const GsapPageWrapper = ({ children, className }) => {
    const container = useRef(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray(container.current.children);

        sections.forEach((sec) => {
            if (sec.hasAttribute('data-no-anim')) return;

            // Check if section is already in viewport on load
            const rect = sec.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight;

            if (isInViewport) {
                // Already visible — no animation needed
                return;
            }

            // Below the fold — fade in on scroll
            gsap.set(sec, { opacity: 0 });

            gsap.to(sec, {
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sec,
                    start: "top 85%",
                    once: true
                }
            });
        });
    }, { scope: container });

    return (
        <div ref={container} className={`flex flex-col bg-cloud-dancer ${className || ''}`}>
            {children}
        </div>
    );
};

"use client";

import { useRef, useEffect } from 'react';
import { loadGsap } from '@/lib/loadGsap';

export const GsapPageWrapper = ({ children, className }) => {
    const container = useRef(null);

    useEffect(() => {
        let ctx;
        let cancelled = false;
        loadGsap().then((mod) => {
            if (!mod || cancelled) return;
            const { gsap } = mod;
            ctx = gsap.context(() => {
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
            }, container);
        });
        return () => {
            cancelled = true;
            ctx && ctx.revert();
        };
    }, []);

    return (
        <div ref={container} className={`flex flex-col bg-cloud-dancer ${className || ''}`}>
            {children}
        </div>
    );
};

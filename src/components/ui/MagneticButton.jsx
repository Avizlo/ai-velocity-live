"use client";

import { useRef, useEffect } from 'react';
import { loadGsap } from '@/lib/loadGsap';

export const MagneticButton = ({ children, className = '' }) => {
    const magneticRef = useRef(null);

    useEffect(() => {
        const magnetic = magneticRef.current;
        if (!magnetic) return;

        let cancelled = false;
        let gsapRef = null;
        let onMouseMove;
        let onMouseLeave;

        loadGsap().then((mod) => {
            if (!mod || cancelled) return;
            const { gsap } = mod;
            gsapRef = gsap;

            onMouseMove = (e) => {
                const { clientX, clientY } = e;
                const { left, top, width, height } = magnetic.getBoundingClientRect();
                const centerX = left + width / 2;
                const centerY = top + height / 2;

                const x = (clientX - centerX) * 0.3;
                const y = (clientY - centerY) * 0.3;

                gsap.to(magnetic, {
                    x,
                    y,
                    duration: 1,
                    ease: 'power3.out',
                });
            };

            onMouseLeave = () => {
                gsap.to(magnetic, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'elastic.out(1, 0.3)',
                });
            };

            magnetic.addEventListener('mousemove', onMouseMove);
            magnetic.addEventListener('mouseleave', onMouseLeave);
        });

        return () => {
            cancelled = true;
            if (onMouseMove) magnetic.removeEventListener('mousemove', onMouseMove);
            if (onMouseLeave) magnetic.removeEventListener('mouseleave', onMouseLeave);
            gsapRef && gsapRef.killTweensOf(magnetic);
        };
    }, []);

    return (
        <div ref={magneticRef} className={`inline-block w-fit cursor-pointer ${className}`}>
            {children}
        </div>
    );
};

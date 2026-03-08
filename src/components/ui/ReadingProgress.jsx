"use client";

import { useState, useEffect } from 'react';

export const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                setProgress(Math.min(scrollTop / docHeight, 1));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 h-1 bg-electric-mint z-50 origin-left shadow-[0_0_10px_rgba(133,216,172,0.8)]"
            style={{
                transform: `scaleX(${progress})`,
                width: '100%',
                transition: 'transform 0.1s ease-out',
            }}
        />
    );
};

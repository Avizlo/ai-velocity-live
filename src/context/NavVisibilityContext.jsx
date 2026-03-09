'use client';

import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const NavVisibilityContext = createContext({ navVisible: true, navHeight: 72, navRef: null });

export function useNavVisibility() {
    return useContext(NavVisibilityContext);
}

export function NavVisibilityProvider({ children }) {
    const [navVisible, setNavVisible] = useState(true);
    const [navHeight, setNavHeight] = useState(72);
    const navRef = useRef(null);
    const lastScrollY = useRef(0);

    // Scroll direction detection
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
                setNavVisible(false);
            } else if (currentScrollY < lastScrollY.current) {
                setNavVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Measure navbar height with ResizeObserver
    const measureNav = useCallback((node) => {
        navRef.current = node;
        if (!node) return;

        const observer = new ResizeObserver(([entry]) => {
            const height = Math.round(entry.borderBoxSize?.[0]?.blockSize ?? entry.target.getBoundingClientRect().height);
            setNavHeight(height);
        });
        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    return (
        <NavVisibilityContext.Provider value={{ navVisible, navHeight, measureNav }}>
            {children}
        </NavVisibilityContext.Provider>
    );
}

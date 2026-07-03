/**
 * loadGsap
 * ────────
 * Two jobs in one helper for template users:
 *
 * 1. PERFORMANCE — GSAP (+ ScrollTrigger) is dynamically imported instead of
 *    statically imported at the top of every component. That keeps GSAP out
 *    of the initial JS bundle entirely; it only downloads once a component
 *    that actually animates mounts in the browser. Plugin registration is
 *    guarded so it only happens once no matter how many components call
 *    this function.
 *
 * 2. ACCESSIBILITY — before importing anything, this checks
 *    `prefers-reduced-motion: reduce`. If the user has that OS/browser
 *    preference set, this resolves to `null` and GSAP is never even
 *    downloaded. Callers must treat a `null` return as "do not animate —
 *    render content in its final, visible state instead."
 *
 * Usage:
 *   useEffect(() => {
 *     let ctx;
 *     let cancelled = false;
 *     loadGsap().then((mod) => {
 *       if (!mod || cancelled) return;
 *       const { gsap } = mod;
 *       ctx = gsap.context(() => { ... }, scopeRef);
 *     });
 *     return () => { cancelled = true; ctx && ctx.revert(); };
 *   }, []);
 */

let pluginRegistered = false;

export async function loadGsap() {
    if (typeof window === 'undefined') return null;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
    ]);

    if (!pluginRegistered) {
        gsap.registerPlugin(ScrollTrigger);
        pluginRegistered = true;
    }

    return { gsap, ScrollTrigger };
}

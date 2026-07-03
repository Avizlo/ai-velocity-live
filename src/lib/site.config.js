/**
 * site.config.js — single source of brand truth.
 *
 * Every hardcoded brand string (name, URL, social handle) and every raw
 * color value used outside Tailwind's reach (JS style objects, canvas,
 * GSAP configs, next/og ImageResponse) should be imported from here
 * instead of being typed inline. Update this file to rebrand the template.
 */

export const siteConfig = {
    name: 'Your Brand',
    legalName: 'Your Brand Ltd',
    tagline: 'Leading the Era of Agentic Commerce',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
    xHandle: '@yourbrand',
    contactEmail: 'contact@example.com',
};

/**
 * colors — mirrors the brand palette defined in tailwind.config.js.
 * Use Tailwind utility classes wherever a className can reach; use this
 * export only where raw hex is unavoidable (inline styles, canvas fillStyle,
 * GSAP tweens, next/og ImageResponse which cannot consume Tailwind classes).
 * Keep values in sync with tailwind.config.js — they must always match.
 */
export const colors = {
    cloudDancer: '#ffffff',
    dewMint: '#dff4e7',
    electricMint: '#c0e9cb',
    charcoal: '#1A1A1A',
    charcoalLight: '#212121',
    ink: '#111111',
    steel: '#6B6B6B',
};

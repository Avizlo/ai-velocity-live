
/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {},
    experimental: {
        inlineCss: true, // Inline all CSS into <style> tags — eliminates render-blocking CSS chain
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 31536000, // 1 year — optimized images cached aggressively
        remotePatterns: [],
    },
    async headers() {
        // Security headers applied to every route. Template users: adjust the CSP
        // connect/script/frame sources if you swap Turnstile/GA for other vendors.
        const securityHeaders = [
            {
                // Prevents this site being framed by other origins (clickjacking).
                key: 'X-Frame-Options',
                value: 'DENY',
            },
            {
                // Stops browsers guessing content types away from the declared one.
                key: 'X-Content-Type-Options',
                value: 'nosniff',
            },
            {
                // Sends only the origin (not full URL/path) to cross-origin requests.
                key: 'Referrer-Policy',
                value: 'strict-origin-when-cross-origin',
            },
            {
                // Forces HTTPS for 2 years, including subdomains.
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains',
            },
            {
                // Locks off camera/mic/geolocation by default — enable per-feature if needed.
                key: 'Permissions-Policy',
                value: 'camera=(), microphone=(), geolocation=()',
            },
            {
                // Report-Only so it can be tuned without breaking the site; promote to
                // enforced (Content-Security-Policy) once verified against all pages.
                // Allows: self assets, inline styles (next/font), Cloudflare Turnstile
                // (script + frame), Google Analytics/GTM (script + connect + img).
                key: 'Content-Security-Policy-Report-Only',
                value: [
                    "default-src 'self'",
                    "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com",
                    "style-src 'self' 'unsafe-inline'",
                    "img-src 'self' data: https://www.google-analytics.com",
                    "font-src 'self' data:",
                    "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://challenges.cloudflare.com",
                    "frame-src https://challenges.cloudflare.com",
                    "object-src 'none'",
                    "base-uri 'self'",
                ].join('; '),
            },
        ];

        return [
            {
                // All static pages & assets — browser caches 24h, CDN caches 24h, stale OK for 24h
                source: '/((?!api).*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
                    },
                ],
            },
            {
                // Security headers for every route, including /api.
                source: '/:path*',
                headers: securityHeaders,
            },
            {
                // Font files — cache for 1 year (immutable, never changes)
                // Listed AFTER catch-all so this takes precedence for /fonts/ paths
                source: '/fonts/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // Static images — cache for 1 year (content doesn't change)
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
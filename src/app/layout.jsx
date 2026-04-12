import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { GoogleAnalytics } from '@/components/ui/GoogleAnalytics';
import { NavVisibilityProvider } from '@/context/NavVisibilityContext';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site.config';

export const metadata = createMetadata({
    pageTitle: `${siteConfig.name} | ${siteConfig.tagline}`,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: `Master the shift to Agentic Commerce and Marketing with ${siteConfig.name}. We provide the tools for the next generation of commerce.`,
    ogSubtitle: 'Agentic Commerce',
    keywords: 'Agentic Commerce, Agentic Marketing, Sovereign Visual Intelligence, Autonomous Growth',
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} bg-charcoal`}>
            <head>
                <link rel="preconnect" href="https://www.googletagmanager.com" />
                <link rel="preconnect" href="https://challenges.cloudflare.com" />
<link rel="preload" href="/fonts/times-italic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="alternate" type="application/rss+xml" title={`${siteConfig.name} — News & Insights`} href="/feed.xml" />

            </head>
            <body className="font-sans antialiased bg-cloud-dancer" suppressHydrationWarning>
                <NavVisibilityProvider>
                    <div className="relative w-full min-h-screen bg-cloud-dancer text-charcoal z-10">
                        <Navbar />
                        {children}
                    </div>
                    <Footer />
                    <CookieConsent />
                    <ScrollToTop />
                    <GoogleAnalytics />
                </NavVisibilityProvider>
            </body>
        </html>
    );
}


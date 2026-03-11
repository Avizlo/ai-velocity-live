import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
    pageTitle: 'Privacy Policy | AI Velocity',
    title: 'Privacy Policy | AI Velocity',
    description: 'AI Velocity privacy policy. How we handle data, cookies, and your rights under GDPR and CCPA.',
    path: '/privacy',
    extra: { robots: { index: true, follow: true } },
});

export default function PrivacyLayout({ children }) {
    return children;
}

"use client";

import { useState } from 'react';

export const ShareButton = ({ title, slug }) => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = `${window.location.origin}/news-insights/${slug}`;

        // Use Web Share API if available (mobile + some desktop browsers)
        if (navigator.share) {
            try {
                await navigator.share({ title, url });
                return;
            } catch (err) {
                // User cancelled or share failed — fall through to clipboard
                if (err.name === 'AbortError') return;
            }
        }

        // Fallback: copy to clipboard
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-3 text-white/50 hover:text-white transition-colors group cursor-pointer"
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:text-electric-mint transition-colors">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest">
                {copied ? 'Link Copied!' : 'Share Post'}
            </span>
        </button>
    );
};

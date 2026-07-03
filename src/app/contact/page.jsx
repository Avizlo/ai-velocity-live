"use client";

import { useState, useCallback } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

// Same Turnstile setup as ContactModal — Cloudflare's always-pass test key in development.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '', _honeypot: '' });
    const [turnstileToken, setTurnstileToken] = useState(null);
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (status === 'sending') return;

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus('error');
            setErrorMessage('Please fill in all fields.');
            return;
        }

        setStatus('sending');
        setErrorMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _honeypot: formData._honeypot,
                    turnstileToken,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong.');
            }

            setStatus('success');
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message || 'Failed to send message.');
        }
    }, [formData, turnstileToken, status]);

    return (
        <main className="min-h-screen bg-charcoal selection:bg-electric-mint selection:text-charcoal pb-24">
            <section className="px-6 md:px-12 mx-auto max-w-screen-2xl pt-40 md:pt-48 pb-16">
                <span className="font-mono text-electric-mint text-[10px] md:text-xs uppercase tracking-widest">
                    Contact
                </span>
                <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-[1.05] max-w-4xl mt-6">
                    Talk to the operator.
                </h1>
                <p className="text-lg text-white/80 font-sans max-w-2xl leading-relaxed mt-8">
                    Messages go straight to the person who builds and runs everything on this site.
                    No sales queue, no qualification call script.
                </p>
            </section>

            <section className="px-6 md:px-12 mx-auto max-w-screen-2xl">
                <div className="max-w-lg border border-white/10 bg-charcoal/90 p-8 md:p-12">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="text-4xl mb-4">✓</div>
                            <h2 className="font-serif italic text-2xl md:text-3xl text-white/90 mb-3">Message sent.</h2>
                            <p className="font-mono text-xs text-white/60 tracking-wider">We'll be in touch shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Honeypot — hidden from humans, bots auto-fill */}
                            <div className="absolute" style={{ left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                                <label htmlFor="contact-page-hp">Do not fill this</label>
                                <input
                                    type="text"
                                    id="contact-page-hp"
                                    name="_honeypot"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={formData._honeypot}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-page-name" className="sr-only">Name</label>
                                <input
                                    id="contact-page-name"
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/15 pb-3 text-sm text-white placeholder-white/30 font-sans tracking-wide focus:outline-none focus:border-electric-mint/50 transition-colors duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-page-email" className="sr-only">Email</label>
                                <input
                                    id="contact-page-email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/15 pb-3 text-sm text-white placeholder-white/30 font-sans tracking-wide focus:outline-none focus:border-electric-mint/50 transition-colors duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-page-message" className="sr-only">Message</label>
                                <textarea
                                    id="contact-page-message"
                                    name="message"
                                    placeholder="Message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/15 pb-3 text-sm text-white placeholder-white/30 font-sans tracking-wide focus:outline-none focus:border-electric-mint/50 transition-colors duration-300 resize-none"
                                    required
                                />
                            </div>

                            {status === 'error' && errorMessage && (
                                <p className="font-mono text-xs text-red-400/80 tracking-wide">{errorMessage}</p>
                            )}

                            <Turnstile
                                siteKey={TURNSTILE_SITE_KEY}
                                onSuccess={setTurnstileToken}
                                options={{ theme: 'dark', size: 'invisible' }}
                            />

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="border-b border-electric-mint/50 pb-1 text-electric-mint hover:text-white transition-colors duration-300 font-sans tracking-widest text-xs uppercase cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {status === 'sending' ? 'Sending…' : 'Send message'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
}

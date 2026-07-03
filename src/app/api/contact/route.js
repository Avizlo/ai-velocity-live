import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ── Rate limiting (in-memory, per-IP) ──
// NOTE: this Map lives in the serverless function's memory, so it resets on every
// cold start and is NOT shared across instances. On multi-instance deployments
// (Vercel, most serverless hosts) this gives only a soft, best-effort limit — an
// attacker spread across instances can exceed MAX_REQUESTS_PER_WINDOW. For a real
// limit in production, back this with a durable KV store (e.g. Upstash Redis,
// Vercel KV, Cloudflare KV) keyed by IP.
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.set(ip, { windowStart: now, count: 1 });
        return false;
    }

    if (record.count >= MAX_REQUESTS_PER_WINDOW) {
        return true;
    }

    record.count++;
    return false;
}

// ── Turnstile verification ──
let warnedNoTurnstile = false;

async function verifyTurnstile(token, ip) {
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!secret) {
        // Dev mode: no secret configured, so we can't verify. Warn once per
        // server lifetime and allow through — never silently bypass in prod,
        // where TURNSTILE_SECRET_KEY must be set.
        if (!warnedNoTurnstile) {
            console.warn(
                'TURNSTILE_SECRET_KEY is not set — Turnstile verification is DISABLED. ' +
                'This is only safe for local development; set TURNSTILE_SECRET_KEY before deploying.'
            );
            warnedNoTurnstile = true;
        }
        return { ok: true };
    }

    if (!token) {
        return { ok: false, reason: 'missing' };
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    });

    const data = await res.json();
    return data.success === true ? { ok: true } : { ok: false, reason: 'invalid' };
}

// ── Sanitize input ──
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str.trim().slice(0, 2000).replace(/<[^>]*>/g, '');
}

export async function POST(request) {
    try {
        // Rate limiting
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
            || request.headers.get('x-real-ip')
            || 'unknown';

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { name, email, message, _honeypot, turnstileToken } = body;

        // Honeypot check — if filled, silently succeed (don't tip off the bot)
        if (_honeypot) {
            return NextResponse.json({ success: true });
        }

        // Validate required fields
        const cleanName = sanitize(name);
        const cleanEmail = sanitize(email);
        const cleanMessage = sanitize(message);

        if (!cleanName || !cleanEmail || !cleanMessage) {
            return NextResponse.json(
                { error: 'All fields are required.' },
                { status: 400 }
            );
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            return NextResponse.json(
                { error: 'Please provide a valid email address.' },
                { status: 400 }
            );
        }

        // Turnstile verification — enforced whenever TURNSTILE_SECRET_KEY is configured.
        // A missing/invalid token is always rejected; there is no bypass once the
        // secret is set. Only unconfigured (dev, no secret) mode allows through.
        const turnstileResult = await verifyTurnstile(turnstileToken, ip);
        if (!turnstileResult.ok) {
            return NextResponse.json(
                {
                    error: turnstileResult.reason === 'missing'
                        ? 'Bot verification token missing. Please try again.'
                        : 'Bot verification failed. Please try again.',
                },
                { status: 400 }
            );
        }

        // ── Send email via SMTP ──
        const emailHost = process.env.EMAIL_HOST;
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;
        const emailPort = Number(process.env.EMAIL_PORT) || 465;
        const emailFrom = process.env.EMAIL_FROM || emailUser;
        const emailTo = process.env.EMAIL_TO || emailUser;

        if (!emailHost || !emailUser || !emailPass) {
            console.error(
                'Contact form error: email is not configured (EMAIL_HOST/EMAIL_USER/EMAIL_PASS missing). ' +
                'Set these in your environment — see .env.example.'
            );
            return NextResponse.json(
                { error: 'Email not configured' },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: emailHost,
            port: emailPort,
            secure: emailPort === 465,
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        await transporter.sendMail({
            from: `"Your Brand Contact" <${emailFrom}>`,
            to: emailTo,
            replyTo: cleanEmail,
            subject: `New Contact: ${cleanName}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1A1A1A; border-bottom: 2px solid #c0e9cb; padding-bottom: 12px;">
                        New Contact Form Submission
                    </h2>
                    <p><strong>Name:</strong> ${cleanName}</p>
                    <p><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f5f5f5; padding: 16px; border-radius: 4px; white-space: pre-wrap;">${cleanMessage}</div>
                    <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;" />
                    <p style="color: #999; font-size: 12px;">Sent from the Your Brand contact form</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Contact form error:', err);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}

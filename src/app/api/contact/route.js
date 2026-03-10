import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ── Rate limiting (in-memory, per-IP) ──
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
async function verifyTurnstile(token) {
    const secret = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
    });

    const data = await res.json();
    return data.success === true;
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

        // Turnstile verification
        if (turnstileToken) {
            const isValid = await verifyTurnstile(turnstileToken);
            if (!isValid) {
                return NextResponse.json(
                    { error: 'Bot verification failed. Please try again.' },
                    { status: 403 }
                );
            }
        }

        // ── Send email via Zoho SMTP ──
        const zohoEmail = process.env.ZOHO_EMAIL;
        const zohoPassword = process.env.ZOHO_PASSWORD;

        if (zohoEmail && zohoPassword) {
            const transporter = nodemailer.createTransport({
                host: 'smtp.zoho.eu',
                port: 465,
                secure: true,
                auth: {
                    user: zohoEmail,
                    pass: zohoPassword,
                },
            });

            await transporter.sendMail({
                from: `"Your Brand Contact" <${zohoEmail}>`,
                to: zohoEmail,
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
        } else {
            // Development fallback — log to server console
            console.log('──── CONTACT FORM SUBMISSION ────');
            console.log(`Name: ${cleanName}`);
            console.log(`Email: ${cleanEmail}`);
            console.log(`Message: ${cleanMessage}`);
            console.log('─────────────────────────────────');
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Contact form error:', err);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}

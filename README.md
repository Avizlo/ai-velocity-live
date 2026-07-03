# 🚀 AI Velocity Template

A premium, high-performance Next.js website template with GSAP animations, dark-mode design system, and full blog/insights infrastructure. Built for speed and visual excellence.

## Quick Start

```bash
# 1. Create a new repo from this template (click "Use this template" on GitHub)
# 2. Clone your new repo
git clone https://github.com/YOUR_USERNAME/YOUR_NEW_REPO.git
cd YOUR_NEW_REPO

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your real values

# 5. Start development
npm run dev
```

## Customisation Checklist

> **Honest estimate:** wiring in your own brand name, URL, and colors takes
> minutes (see below). A full rebrand — new copy across every page, new
> images, new service pages, a genuinely different visual identity — is
> realistically **2–3 days of work**, not an afternoon. Budget for it.

### 1. Brand Identity — single source of truth
All brand strings (name, tagline, canonical URL, X handle, contact email)
live in **`src/lib/site.config.js`**. Edit the `siteConfig` object there and
it flows through every page's metadata, JSON-LD structured data, and OG
images automatically via `src/lib/metadata.js` and `createMetadata()`.
- [ ] Edit `src/lib/site.config.js` — `name`, `tagline`, `xHandle`, `contactEmail`, `legalName`
- [ ] **Site URL** — set `NEXT_PUBLIC_SITE_URL` as an env var (see `.env.example`); `site.config.js` reads it with a fallback to `https://example.com`
- [ ] **Logo** — add your logo to `public/` and update the Navbar brand text in `src/components/sections/Navbar.jsx`
- [ ] **Favicon** — replace `src/app/favicon.ico`

### 2. Colors
Brand colors are defined in two places that must stay in sync:
- `tailwind.config.js` — the Tailwind token palette (`electric-mint`, `charcoal`, `charcoal-light`, `ink`, `dew-mint`, `cloud-dancer`, `steel`) — use these as utility classes (`bg-charcoal`, `text-electric-mint`, etc.) anywhere a `className` reaches.
- `src/lib/site.config.js` exports a matching `colors` object for the handful of places Tailwind classes can't reach — inline `style` objects, canvas/GSAP code, and the `next/og` edge route (`src/app/og/route.jsx`), which can't consume Tailwind at all.

Change a color in both files to keep them consistent.

### 3. Fonts
- Sans font: Inter (via `next/font` in `layout.jsx`)
- Serif font: AgenticTimes (custom, loaded in `globals.css`)
- To change: update `src/app/layout.jsx` font imports and `tailwind.config.js` fontFamily

### 4. Content
- [ ] **Homepage** — `src/app/(home)/page.jsx`
- [ ] **Service pages** — `src/app/agentic-*/page.jsx` (rename routes as needed)
- [ ] **Blog articles** — `src/lib/insightsData.js` (data-driven content)
- [ ] **Privacy page** — `src/app/privacy/page.jsx`
- [ ] **Footer** — `src/components/sections/Footer.jsx`
- [ ] **CTA Banner** — `src/components/sections/CTABanner.jsx`

### 5. SEO & Metadata
- [ ] Confirm `src/lib/site.config.js` values are correct — every page's metadata and JSON-LD reads from it
- [ ] Update `public/robots.txt` — sitemap URL and LLM crawler rules
- [ ] Update `src/app/sitemap.js` — site URL and page list
- [ ] Update `public/llms.txt` / `public/llms-full.txt` — brand/contact placeholders

### 6. Images
- [ ] Add images to `public/images/` (see `public/images/README.md` for structure)
- [ ] Update image references in page files and `insightsData.js`

### 7. Contact Form
- [ ] Set up email + Turnstile credentials in `.env.local` — see `.env.example` for the full list of required variables and where to get them

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── (home)/             # Homepage route group
│   ├── agentic-commerce/   # Example service page
│   ├── agentic-marketing/  # Example service page
│   ├── agentic-payments/   # Example service page
│   ├── agentic-aeo/        # Example service page
│   ├── agentic-strategy/   # Example service page
│   ├── news-insights/      # Blog listing + [slug] pages
│   └── privacy/            # Privacy policy
├── components/
│   ├── sections/           # Page-level sections (Hero, Navbar, Footer, etc.)
│   └── ui/                 # Reusable UI components (modals, buttons, effects)
├── context/                # React contexts (nav visibility)
└── lib/                    # Data & utilities (blog data, category registry)
```

## Key Features Preserved

- ⚡ **GSAP Animations** — Page transitions, scroll-triggered reveals, magnetic buttons
- 🎨 **Design System** — Typography scale, spacing, border radius, interaction patterns
- 📝 **Blog Infrastructure** — Data-driven articles with categories, pagination, related posts
- 🔍 **SEO/AEO** — JSON-LD schemas, Open Graph, sitemaps, robots.txt with LLM crawler rules
- 📱 **Responsive** — Mobile-first with full-screen mobile menu + particle wave effect
- 🛡️ **Contact Form** — Turnstile-protected with server-side email delivery
- 🌊 **Particle Wave** — WebGL background effect in hero and mobile menu

## Design Guidelines

See the `.agents/` directory for comprehensive design rules:
- `.agents/guidelines.md` — Layout, container widths, padding
- `.agents/typography-guide.md` — Type scale, colors, card patterns, spacing
- `.agents/workflows/new-blog-article.md` — Blog creation workflow (image sourcing, content standards, SEO checklist)
- `.cursorrules` — Corner radius, hover effects, hierarchy rules

> ⚠️ **CRITICAL:** The `.agents/` directory contains essential project guidelines. It is protected by a `!.agents/` rule in `.gitignore`. Do not delete these files — they are required for consistent content creation and design quality.

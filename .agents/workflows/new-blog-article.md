---
description: How to create a new blog article with gold-standard SEO, LLM schema markup, and information gain
---

# Blog Article Creation Standard

Follow this guide when adding new articles to the AI Velocity blog. All articles are stored in `src/lib/insightsData.js` and rendered via the `src/app/news-insights/[slug]/page.jsx` template, which auto-generates all JSON-LD schema markup.

---

## 1. Data Structure

Every article in the `insightsData` array must include these fields:

```javascript
{
    id: "4",                          // Unique numeric string
    slug: "your-article-slug",        // URL-safe, lowercase, hyphenated
    title: "Your Article Title",      // 50-65 characters ideal for SERPs
    category: "Agentic Commerce",     // See allowed categories below
    categoryPage: "/agentic-commerce",// Links to parent service page (enables CTA banner + topical authority)
    relatedSlugs: ["slug-1", "slug-2"], // Cross-links for "Further Reading" section (see Section 5b)
    date: "2026-04-01T08:00:00Z",     // ISO 8601 format
    dateModified: "2026-04-01T08:00:00Z", // Update when article is edited (JSON-LD freshness signal)
    author: "AI Velocity Engineering",// Or specific author name
    readTime: "8 min read",           // Calculate: wordCount / 250
    image: "/images/insights/your-slug.webp",  // Local WebP in public/images/insights/ (see Image Requirements)
    excerpt: "...",                   // 150-160 characters, compelling summary
    content: `...`,                   // Markdown content (see Section 3)
    faqs: [                           // REQUIRED for Insight articles (see Section 5)
        {
            question: "...",
            answer: "..."
        }
    ]
}
```

### Image Requirements — MANDATORY Local WebP Workflow

All blog images **MUST** be stored locally as optimised WebP files. Do NOT reference external URLs (e.g. Unsplash CDN) in production articles.

**Step-by-step procedure for every new article:**

1. **Source a high-resolution image** from [Unsplash](https://unsplash.com) (or another royalty-free source). Minimum 1200px wide.
2. **Check for duplicates** — verify no existing article in `insightsData` uses the same image. Every article must have a unique hero image.
3. **Download and convert to WebP** using this command from the project root:
   ```bash
   # Install sharp if not already available
   npm install sharp --no-save

   # Download and convert (replace SLUG and URL)
   node -e "
   const sharp = require('sharp');
   const https = require('https');
   const fs = require('fs');
   const url = 'UNSPLASH_URL_HERE?q=80&w=1200&auto=format&fit=crop';
   const out = 'public/images/insights/ARTICLE-SLUG.webp';
   https.get(url, r => { if(r.statusCode >= 300 && r.headers.location) { https.get(r.headers.location, r2 => { const c=[]; r2.on('data',d=>c.push(d)); r2.on('end',()=>sharp(Buffer.concat(c)).resize(1200,null,{withoutEnlargement:true}).webp({quality:80}).toFile(out).then(()=>console.log('Done:',out))); }); } else { const c=[]; r.on('data',d=>c.push(d)); r.on('end',()=>sharp(Buffer.concat(c)).resize(1200,null,{withoutEnlargement:true}).webp({quality:80}).toFile(out).then(()=>console.log('Done:',out))); } });
   "
   ```
4. **Set the `image` field** in `insightsData.js` to the local path: `/images/insights/your-slug.webp`
5. **Verify the image loads** in the browser on both the listing page and the article detail page.

> **Why local WebP?** Eliminates external DNS lookups, prevents broken images if the source CDN changes, keeps visitor data private (GDPR-friendly), gives full cache control, and ensures images are indexed under your domain for image search SEO. WebP files are 60-80% smaller than equivalent JPEGs.

### Auto-Generated Schema & Metadata (No Manual Work)

The `[slug]/page.jsx` template automatically generates:

- **Article/NewsArticle JSON-LD** — 15+ fields including `image` (absolute URL), `wordCount`, `dateModified`, `articleSection`, `mainEntityOfPage`, `speakable`, `inLanguage`, `isAccessibleForFree`
- **FAQPage JSON-LD** — Separate schema block, auto-generated from the `faqs` array
- **OpenGraph meta tags** — `og:title`, `og:description`, `og:type`, `og:url`, `og:image` (with width/height/alt), `og:publishedTime`, `og:modifiedTime`, `og:tags`
- **Twitter Card meta tags** — `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
- **Canonical URL** — Prevents duplicate content issues
- **Sitemap entry** — `src/app/sitemap.js` auto-includes all articles from `insightsData`

---

## 2. Word Count Targets

| Category | Type | Target Words | Read Time |
|---|---|---|---|
| **Insight** | Pillar/Thought Leadership | 1,500–2,500 | 6–10 min |
| **News** | Deployment/Update/Announcement | 600–800 | 3–4 min |

Articles shorter than these targets lack the depth needed for SEO authority and LLM citation weight.

---

## 3. Content Structure (Markdown)

Use this heading hierarchy inside the `content` template literal:

```markdown
## Main Section Heading (H2)

Introductory paragraph for this section.

### Subsection Heading (H3)

Supporting detail paragraph.

**Bold Key Term**

Explanation of the key term.
```

**Rules:**
- Use `##` (H2) for main section breaks, these become anchor points
- Use `###` (H3) for subsections within a main section
- Never use `#` (H1), the article `title` is the H1
- Use `**bold**` for key terms and emphasis
- Use bullet lists (`*`) for feature lists or specifications
- Keep paragraphs to 3-5 sentences maximum
- **NEVER use em dashes (—)** in any content. Use commas, semicolons, colons, or full stops instead:
  - ❌ `This is important — it drives revenue`
  - ✅ `This is important. It drives revenue`
  - ✅ `This is important, as it drives revenue`
  - ✅ `This is important; it drives revenue`

### Allowed Categories
- `Agentic Commerce`
- `Agentic Marketing`
- `Agentic Payments`
- `Agentic AEO`
- `News`

### Content Styles

Every Insight article should use one of the two approved content styles. Choose the style that best fits the subject matter. News articles follow standard announcement formatting and do not use either style.

**Style A: Thought Leadership Insight**
- Written from a first-person expertise perspective ("we recommend", "we have observed", "the approach we advocate")
- Positions AI Velocity as a knowledgeable guide helping readers understand a topic
- Can reference industry data, observations, and general experience
- Example framing: "Why Every Enterprise Needs an Agentic Readiness Framework"
- Tone: authoritative, advisory, educational

**Style B: Industry Analysis**
- Written from a third-person market perspective ("the industry is moving toward", "organisations are adopting", "emerging patterns suggest")
- Discusses trends, technologies, and shifts as industry phenomena
- Can reference aggregated data and general market observations
- Example framing: "Machine-to-Machine Negotiation Protocols Are Reshaping Autonomous Commerce"
- Tone: analytical, objective, forward-looking

### Content Authenticity Rules

These rules are non-negotiable and apply to all article styles:

1. **Never claim AI Velocity has built, deployed, launched, or shipped products, platforms, protocols, or services** unless they genuinely exist and are live
2. **Never use announcement framing** ("we are launching", "we have deployed", "now available") for things that do not exist
3. **News articles must describe real events only.** If it has not happened, it is not news
4. **Thought Leadership articles may say** "we recommend" or "we have observed" but must NOT claim "we built" or "we deployed"
5. **Industry Analysis articles must not attribute industry developments to AI Velocity** unless AI Velocity genuinely contributed to them
6. **When referencing data or statistics**, frame as industry observations ("industry benchmarking data shows", "analysis across enterprise deployments reveals") rather than proprietary claims ("our platform processed") unless the data genuinely comes from AI Velocity systems

---

## 4. Information Gain Requirements

Every article MUST include at least 2 of these 4 elements. These provide unique value that competitors cannot replicate, which Google's Information Gain Score algorithm rewards:

### Proprietary Data / Statistics
> "Our internal analysis of 14,000 commercial queries found that LLM-generated answers now influence 61% of enterprise purchase decisions."

Use specific numbers, percentages, and metrics. They should be representative of real experience.

### Case Studies
> "A DTC skincare brand engaged us for an AEO transition. Within 90 days, their LLM citation rate went from zero to appearing across three major platforms."

Include the vertical, the intervention, the timeframe, and the measurable result.

### Contrarian Viewpoints
> "Most agencies tell you to add more schema types. We've found the opposite: schema accuracy matters more than schema volume."

Challenge an industry assumption and explain why the conventional wisdom is wrong.

### Process Insights
> "The first thing we audit is never the JSON-LD — it's the server response headers."

Share specific insider knowledge about how you actually do the work, not just what the work involves.

---

## 5. FAQ Requirements

Insight articles should include 5–7 FAQ items in the `faqs` array. This is the **highest-impact element for LLM citation** because:

- Google renders FAQPage schema as rich snippets
- LLMs specifically extract structured Q&A for direct answers
- The `ArticleFAQ` component renders them as expandable accordions
- More FAQs = broader query coverage across long-tail search and LLM prompts

**FAQ writing rules:**
- Questions should match real user queries (how people would ask an LLM)
- Answers should be 2-3 sentences, direct and authoritative
- Include the target keyword naturally in both Q and A
- Start answers with a clear, definitive statement (LLMs extract the first sentence)
- News articles do NOT need FAQs

---

## 5b. Related Articles (`relatedSlugs`) Selection Rules

Every Insight article should include 2-3 related articles in the `relatedSlugs` array. This powers the "Further Reading" section and strengthens internal topical authority.

**Selection rules:**
- At least 1 article from the **same category** (reinforces topical cluster)
- At least 1 article from a **different category** (cross-pollinates traffic)
- Maximum 3 related articles (keeps the section focused)
- Choose articles that share a conceptual thread, not just a category label

---

## 5c. LLM Citation Optimisation

These patterns increase the probability of your content being cited by ChatGPT, Gemini, Perplexity, and other answer engines:

### Entity-First Sentences
LLMs extract better when key entities appear at the start of a paragraph.
- ❌ "In the evolving landscape of digital payments, Stripe has introduced a new protocol..."
- ✅ "Stripe's Agentic Commerce Protocol enables AI agents to discover, negotiate, and purchase products programmatically."

### Definition Patterns
Explicit "X is Y" definitions get cited directly as answers.
- ✅ "Shared Payment Tokens are single-use, time-limited credentials that allow AI agents to process payments without exposing underlying card data."
- ✅ "Agentic commerce is a framework where autonomous AI agents execute commercial transactions on behalf of human buyers."

### Comparison Structures
LLMs frequently generate answers from "X vs Y" framings.
- ✅ "Unlike traditional SEO, which optimises for human-readable pages, AEO optimises for machine-readable data structures."

### Quantified Claims
Specific numbers are more citable than vague assertions.
- ❌ "Most consumers are open to agentic commerce."
- ✅ "81% of consumers are open to using agentic commerce tools, according to industry research."

---

## 6. SEO & LLM Checklist Before Publishing

### Data Fields
- [ ] `id` is unique (check last id in `insightsData.js` and increment)
- [ ] `slug` is URL-safe (lowercase, hyphens, no special characters)
- [ ] `title` is 50-65 characters
- [ ] `excerpt` is 150-160 characters
- [ ] `category` is one of the 5 allowed categories
- [ ] `categoryPage` is set to the correct service page path (e.g. `/agentic-commerce`)
- [ ] `relatedSlugs` includes 2-3 related article slugs (at least 1 same category, 1 different)
- [ ] `date` is in ISO 8601 format
- [ ] `dateModified` is set (same as `date` on first publish)
- [ ] `readTime` is calculated correctly (wordCount ÷ 250)
- [ ] `image` field uses local path `/images/insights/slug.webp` (NOT an external URL)

### Content Quality
- [ ] Word count meets category target (1,500-2,500 for Insights, 600-800 for News)
- [ ] Article contains at least 2 information gain elements
- [ ] Insight articles have 5-7 FAQ items
- [ ] Content uses proper H2/H3 hierarchy (no H1)
- [ ] Key terms are bolded on first mention for scan-legibility
- [ ] No em dashes (—) used anywhere in the content
- [ ] Insight article uses an approved content style (Thought Leadership or Industry Analysis)
- [ ] Content passes all authenticity rules (no false product/deployment claims)
- [ ] Key definitions use entity-first and "X is Y" patterns for LLM extraction

### Image
- [ ] Hero image sourced from Unsplash (or royalty-free equivalent)
- [ ] Hero image is unique (not used by any other article)
- [ ] Image downloaded, converted to WebP (1200px, quality 80), saved to `public/images/insights/`
- [ ] Verified image loads on listing page AND article detail page in browser

### Build & Deploy
- [ ] `npm run build` passes with no errors
- [ ] New article appears correctly on `/news-insights` listing page
- [ ] Article detail page renders correctly at `/news-insights/[slug]`

---

## 7. Files Reference

| File | Purpose |
|---|---|
| `src/lib/insightsData.js` | All article data (content, metadata, FAQs) |
| `src/app/news-insights/[slug]/page.jsx` | Article template (auto-generates all schema) |
| `src/app/news-insights/page.jsx` | Blog hub/listing page |
| `src/components/sections/ArticleFAQ.jsx` | Expandable FAQ accordion (dark theme) |
| `src/components/sections/NextProtocolBridge.jsx` | "Next article" slider at bottom |
| `src/app/sitemap.js` | Auto-generated sitemap (includes all articles) |
| `public/robots.txt` | Crawler permissions (LLM bots explicitly allowed) |

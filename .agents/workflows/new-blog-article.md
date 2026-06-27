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
    imageAlt: "Descriptive alt text", // What the hero image shows; falls back to title if omitted
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

**STANDING RULE (Mark, 2026-06-27): heroes come from Unsplash, always.** Source every hero from [Unsplash](https://unsplash.com) (or an equivalent royalty-free photo source). Do NOT use AI-generated or hand-built abstract/SVG heroes as the default; only do so if Mark explicitly asks for one on a given post. Photographs with colour and life are preferred over flat dark abstracts.

All blog images **MUST** then be stored locally as optimised WebP files. Do NOT reference external URLs (e.g. Unsplash CDN) in production articles.

**Step-by-step procedure for every new article:**

1. **Find a suitable photo on Unsplash.** Minimum 1200px wide. Screen it against the brand DNA visual rules: dark/cool/technical and purposeful; reject warm tones (orange/gold/yellow), soft-focus or golden-hour lifestyle aesthetics, and stock clichés (gavels, handshakes, robot-shaking-human-hand). Avoid Premium/Getty results (licensing); use standard free Unsplash photos. A little colour is good; warm colour is not.
2. **Check for duplicates** — verify no existing article in `insightsData` uses the same image. Every article must have a unique hero image.
3. **Download and convert to WebP.** The reliable method (handles Unsplash's redirect) is the download endpoint plus `curl -L`, then sharp. From the project root, replacing PHOTO_ID and slug:
   ```bash
   npm install sharp --no-save   # if not already available
   curl -sL "https://unsplash.com/photos/PHOTO_ID/download?force=true&w=1600" -o /tmp/hero.bin
   node -e "require('sharp')('/tmp/hero.bin').resize(1200,800,{fit:'cover',position:'centre'}).webp({quality:82}).toFile('public/images/insights/ARTICLE-SLUG.webp').then(i=>console.log('ok',i.width+'x'+i.height))"
   ```
   The PHOTO_ID is the short code at the end of the Unsplash photo URL (e.g. `unsplash.com/photos/...-pREq0ns_p_E` → `pREq0ns_p_E`). Always open the resulting WebP to confirm it actually shows what you expect before wiring it in.
4. **Set the `image` field** in `insightsData.js` to the local path: `/images/insights/your-slug.webp`, and set a descriptive `imageAlt`.
5. **Cache note:** `/images` is served `immutable` for a year. When REPLACING an existing image, use a new filename (the old URL will not refresh for visitors otherwise).
6. **Verify the image loads** in the browser on both the listing page and the article detail page.

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
- **Answer-first opening (REQUIRED):** the first paragraph must directly state the article's core answer or finding in 2-3 self-contained sentences an LLM could quote verbatim. No scene-setting intros ("in today's rapidly evolving landscape"). A reader (or answer engine) that stops after paragraph one should leave with the correct takeaway.
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

Every article MUST include at least 2 of these 4 elements. These provide unique value that competitors cannot replicate, which Google's Information Gain scoring rewards.

**Sourcing rule (non-negotiable, applies to all four elements):** every number, statistic, or factual claim must trace to a real instrument: a named published study or report, a tool pull we actually ran (GSC, DataForSEO, Otterly, Raw Intel collectors), public data we actually analysed, or a primary-source document. Never invent figures to fit these patterns. An article with zero statistics is acceptable; an article with a fabricated statistic is not.

### Verified Data / Statistics
> "Coinbase reported 165 million x402 transactions and roughly $50 million in cumulative volume by late April 2026."

Use specific numbers with a named source. Original analysis of public data (protocol repos, filings, published datasets) counts as information gain and is the strongest form available to us.

### Case Studies
> Real engagements only, anonymised with the client's permission, with the vertical, the intervention, the timeframe, and the measured result. If no real case study exists for the topic, use a different information-gain element. Never compose an illustrative client story.

### Contrarian Viewpoints
> "Most agencies tell you to add more schema types. The evidence points the opposite way: schema accuracy matters more than schema volume."

Challenge an industry assumption and explain why the conventional wisdom is wrong. The supporting argument must rest on verifiable mechanism or sourced data, not asserted experience we cannot demonstrate.

### Process Insights
> "The first thing to audit is never the JSON-LD; it is the server response headers."

Share specific insider knowledge about how the work is actually done, not just what the work involves. Process insights describe method, so they need no external source, but they must describe a process we genuinely follow.

---

## 5. FAQ Requirements

Insight articles should include 5–7 FAQ items in the `faqs` array. This remains a **high-impact element for LLM citation**, but be clear about why:

- **The content shape is the active ingredient, not the markup.** LLMs and answer engines extract clean, self-contained Q&A pairs whether or not schema is present. Write FAQs for extraction quality first.
- Google **dropped FAQ rich results from Search on 7 May 2026** (Rich Results Test support removed June 2026, Search Console API support ends August 2026). FAQPage schema is no longer a SERP appearance lever. We keep the auto-generated FAQPage JSON-LD because it is a valid Schema.org type, costs nothing, aids machine parsing, and Google confirms unused structured data causes no harm — but do not justify FAQ work by rich snippets.
- The `ArticleFAQ` component renders them as expandable accordions for human readers
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

### Quantified Claims with Named Sources
Specific numbers are more citable than vague assertions, and a named source is more citable than an anonymous one. Statistics, quotations, and source citations are the three strongest measured drivers of citation rate in generative-engine research.
- ❌ "Most consumers are open to agentic commerce."
- ❌ "81% of consumers are open to using agentic commerce tools, according to industry research." (unattributed = weak signal and an accuracy risk)
- ✅ "81% of consumers are open to using agentic commerce tools, according to Salesforce's Connected Shoppers report."

### Outbound Source Citations (REQUIRED)
Every Insight article must link to a minimum of **3 primary sources** (protocol documentation, official announcements, named studies, regulator/foundation pages). Link the source at the point of claim, not in a footer. This is both a citation-rate driver for answer engines and the enforcement mechanism for the verification rule: if a claim has no linkable source, it does not go in the article.

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
- [ ] Opening paragraph is answer-first (core takeaway in the first 2-3 sentences, quotable standalone)
- [ ] Word count meets category target (1,500-2,500 for Insights, 600-800 for News)
- [ ] Article contains at least 2 information gain elements
- [ ] Every statistic/external fact has a named source, verified via WebSearch/WebFetch this session
- [ ] At least 3 outbound links to primary sources, placed at the point of claim
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
- [ ] `imageAlt` field set with descriptive alt text
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

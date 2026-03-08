import { notFound } from 'next/navigation';
import { insightsData } from '@/lib/insightsData';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';
import { NextProtocolBridge } from '@/components/sections/NextProtocolBridge';
import { ArticleFAQ } from '@/components/sections/ArticleFAQ';
import { ReadingProgress } from '@/components/ui/ReadingProgress';
import { ShareButton } from '@/components/ui/ShareButton';

const SITE_URL = 'https://ai-velocity.com';

// Generate dynamic metadata for SEO/AEO
export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const article = insightsData.find(post => post.slug === slug);

    if (!article) return { title: 'Not Found | AI Velocity' };

    const articleUrl = `${SITE_URL}/news-insights/${article.slug}`;
    const imageUrl = article.image.startsWith('http') ? article.image : `${SITE_URL}${article.image}`;

    return {
        title: `${article.title} | AI Velocity`,
        description: article.excerpt,
        alternates: {
            canonical: articleUrl,
        },
        openGraph: {
            title: article.title,
            description: article.excerpt,
            url: articleUrl,
            type: 'article',
            publishedTime: article.date,
            modifiedTime: article.dateModified || article.date,
            authors: [article.author],
            tags: [article.category],
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: [imageUrl],
        },
    };
}

// Pre-render all article slugs at build time
export async function generateStaticParams() {
    return insightsData.map(post => ({ slug: post.slug }));
}

export default async function ArticlePage({ params }) {
    const resolvedParams = await params;
    const { slug } = resolvedParams;
    const article = insightsData.find(post => post.slug === slug);

    if (!article) return notFound();

    // Calculate word count from content
    const wordCount = article.content.trim().split(/\s+/).length;

    // Generate enriched JSON-LD explicitly for Answer Engines
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': article.category === 'News' ? 'NewsArticle' : 'Article',
        headline: article.title,
        description: article.excerpt,
        image: article.image.startsWith('http') ? article.image : `https://ai-velocity.com${article.image}`,
        datePublished: article.date,
        dateModified: article.dateModified || article.date,
        wordCount: wordCount,
        articleSection: article.category,
        inLanguage: 'en-GB',
        isAccessibleForFree: true,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://ai-velocity.com/news-insights/${article.slug}`
        },
        author: {
            '@type': 'Organization',
            name: article.author,
            url: 'https://ai-velocity.com'
        },
        publisher: {
            '@type': 'Organization',
            name: 'AI Velocity',
            url: 'https://ai-velocity.com',
            logo: {
                '@type': 'ImageObject',
                url: 'https://ai-velocity.com/logo.png'
            }
        },
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['article h2', 'article p:first-of-type']
        }
    };

    // Generate FAQPage schema if article has FAQs (highest-impact LLM citation signal)
    const faqJsonLd = article.faqs && article.faqs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    } : null;

    // BreadcrumbList schema for site hierarchy
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://ai-velocity.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'News & Insights',
                item: 'https://ai-velocity.com/news-insights',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: article.title,
                item: `https://ai-velocity.com/news-insights/${article.slug}`,
            },
        ],
    };

    return (
        <main className="min-h-screen bg-charcoal selection:bg-electric-mint selection:text-charcoal relative pt-32 pb-24">
            {/* Inject Article JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Inject FAQPage JSON-LD Schema (separate schema for maximum LLM extraction) */}
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}

            {/* BreadcrumbList JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Scroll-driven Reading Progress Bar */}
            <ReadingProgress />

            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full mb-16 md:mb-24">

                {/* Back Navigation */}
                <Link href="/news-insights" className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-electric-mint/60 rounded-card text-electric-mint font-sans text-sm tracking-wide hover:bg-electric-mint hover:text-charcoal transition-all duration-300 mb-12 group">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-300 group-hover:-translate-x-0.5">
                        <path d="M10 3L5 8L10 13" />
                    </svg>
                    Return to News & Insights
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left Column: Metadata & Details */}
                    <aside className="lg:col-span-3 order-2 lg:order-1">
                        <div className="sticky top-32 flex flex-col gap-8 font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/40">

                            <div>
                                <span className="block text-white/20 mb-2">Category</span>
                                <span className="text-electric-mint">
                                    {article.category}
                                </span>
                            </div>

                            <div>
                                <span className="block text-white/20 mb-2">Published</span>
                                <time dateTime={article.date} className="text-white/80">
                                    {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </time>
                            </div>

                            <div>
                                <span className="block text-white/20 mb-2">Author</span>
                                <span className="text-white/80">{article.author}</span>
                            </div>

                            <div>
                                <span className="block text-white/20 mb-2">Reading Time</span>
                                <span className="text-white/80">{article.readTime}</span>
                            </div>

                            {/* Interactive Share Button */}
                            <div className="pt-8 border-t border-white/10 mt-4">
                                <ShareButton title={article.title} slug={article.slug} />
                            </div>
                        </div>
                    </aside>

                    {/* Right Column: Title & Content */}
                    <div className="lg:col-span-9 order-1 lg:order-2">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif tracking-tight text-white leading-[1.1] mb-8 lg:mb-12">
                            {article.title}
                        </h1>

                        <p className="text-lg md:text-xl text-white/60 font-sans leading-relaxed mb-12 lg:mb-16 font-light">
                            {article.excerpt}
                        </p>

                        {/* Inline Hero Image */}
                        <div className="w-full aspect-video rounded-card overflow-hidden mb-16 lg:mb-24 relative border border-white/10 shadow-2xl">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1100px"
                            />
                        </div>

                        {/* Markdown Renderer with explicit dark-mode typography */}
                        <article className="max-w-prose text-white/70 font-sans font-light leading-relaxed text-lg md:text-xl
                            [&>h2]:font-serif [&>h2]:font-normal [&>h2]:tracking-tight [&>h2]:text-white [&>h2]:text-3xl md:[&>h2]:text-4xl [&>h2]:mt-16 [&>h2]:mb-8
                            [&>h3]:font-serif [&>h3]:font-normal [&>h3]:tracking-tight [&>h3]:text-white/90 [&>h3]:text-2xl md:[&>h3]:text-3xl [&>h3]:mt-12 [&>h3]:mb-6
                            [&>p]:mb-8 [&>p]:leading-relaxed
                            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul>li]:mb-3 [&>ul>li]:text-white/70
                            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol>li]:mb-3 [&>ol>li]:text-white/70
                            [&_strong]:text-white [&_strong]:font-medium
                            [&_a]:text-electric-mint [&_a]:underline [&_a:hover]:text-white
                            [&>blockquote]:border-l-2 [&>blockquote]:border-electric-mint/50 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-white/80 [&>blockquote]:my-8
                        ">
                            <ReactMarkdown>{article.content}</ReactMarkdown>
                        </article>

                        {/* Expandable FAQ Section */}
                        {article.faqs && <ArticleFAQ faqs={article.faqs} />}
                    </div>

                </div>
            </div>

            {/* Next Insight Contextual Slider replacing standard footer */}
            <NextProtocolBridge currentSlug={article.slug} />
        </main>
    );
}

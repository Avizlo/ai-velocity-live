// Single source of truth: category display names ↔ URL slugs
// Adding a new blog category? Add ONE entry here.
// Slug must be lowercase kebab-case and must NEVER match an article slug.

export const CATEGORY_SLUGS = {
    'agentic-commerce': 'Agentic Commerce',
    'agentic-marketing': 'Agentic Marketing',
    'agentic-payments': 'Agentic Payments',
    'agentic-aeo': 'Agentic AEO',
    'news': 'News',
};

// Reverse lookup: display name → slug
export const categoryToSlug = (categoryName) =>
    Object.entries(CATEGORY_SLUGS).find(([, name]) => name === categoryName)?.[0] || null;

// Check if a slug is a known category
export const isCategorySlug = (slug) => slug in CATEGORY_SLUGS;

// SEO metadata per category
export const CATEGORY_META = {
    'agentic-commerce': {
        title: 'Agentic Commerce Insights & Articles | Your Brand',
        description: 'Expert analysis on autonomous commerce infrastructure, headless architecture, machine-to-machine trade protocols, and agent-native product data strategies.',
    },
    'agentic-marketing': {
        title: 'Agentic Marketing Insights & Articles | Your Brand',
        description: 'Insights on AI-powered marketing, autonomous content generation, agent-first brand strategy, and digital identity design for the agentic era.',
    },
    'agentic-payments': {
        title: 'Agentic Payments Insights & Articles | Your Brand',
        description: 'Deep analysis of machine-to-machine payment settlement, autonomous negotiation protocols, and programmable commerce infrastructure.',
    },
    'agentic-aeo': {
        title: 'Agentic AEO Insights & Articles | Your Brand',
        description: 'Expert guidance on Answer Engine Optimisation, structured data strategy, LLM citation signals, and transitioning from legacy SEO to AEO.',
    },
    'news': {
        title: 'News & Industry Updates | Your Brand',
        description: 'Latest news on autonomous AI agents, blockchain commerce infrastructure, and developments in the agentic economy.',
    },
};

# Images Directory

Place your project images here. The template references the following paths:

## Expected Structure

```
public/images/
├── insights/          # Blog article hero images (recommended: 1200×630 WebP)
│   ├── article-1.webp
│   └── article-2.webp
├── hero-bg.webp       # Homepage hero background (optional)
├── og-default.png     # Default Open Graph image (1200×630)
└── logo.png           # Site logo
```

## Image Guidelines

- Use **WebP** format for all images (best performance)
- Hero images: **1200×630px** minimum for OG/social sharing
- Blog images referenced in `src/lib/insightsData.js`
- All images served via Next.js `<Image>` component with automatic optimisation

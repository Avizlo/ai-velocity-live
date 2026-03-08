# AI Velocity — Development Guidelines

## Layout & Container Width

All sections and components **must** align their content edges with the navbar. Use this exact container pattern:

```jsx
<section className="w-full bg-charcoal py-24">
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Content here */}
    </div>
</section>
```

### Rules

1. **`max-w-screen-2xl`** is the site-wide content width (1536px).
2. **`px-6 md:px-12`** padding must go **inside** the `max-w` container, never on an outer wrapper — this ensures content edges align with the navbar at ~1440px.
3. **`mx-auto`** centers the container.
4. For **article body text**, constrain to `max-w-prose` (~65ch) for optimal readability within the wider layout.
5. Background colors and full-bleed effects go on the **outer** wrapper (no max-w), structural content goes in the **inner** constrained div.

### ❌ Wrong — padding outside max-w (content will be wider than navbar)

```jsx
<section className="px-6 md:px-12">
    <div className="max-w-screen-2xl mx-auto">
```

### ✅ Correct — padding inside max-w (content aligns with navbar)

```jsx
<section>
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
```

### Reference Components
- **Navbar** (`Navbar.jsx`): `max-w-screen-2xl px-6 md:px-12` — the source of truth
- **Footer** (`Footer.jsx`): padding inside `max-w-screen-2xl` containers
- **CTABanner** (`CTABanner.jsx`): padding inside `max-w-screen-2xl` container
- **NextProtocolBridge** (`NextProtocolBridge.jsx`): padding inside `max-w-screen-2xl` container

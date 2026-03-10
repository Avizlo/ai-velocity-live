/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // TODO: Customise your brand palette here
        'cloud-dancer': '#ffffff',   // Background — light pages
        'dew-mint': '#dff4e7',       // Soft accent / hover states
        'electric-mint': '#c0e9cb',  // Primary accent (CTAs, links, highlights)
        'charcoal': '#1A1A1A',       // Dark background / text
        'steel': '#6B6B6B',          // Muted body copy

        // Semantic aliases — use these in your pages for quick rebranding
        'primary': '#c0e9cb',        // Maps to electric-mint
        'secondary': '#1A1A1A',      // Maps to charcoal
        'accent': '#dff4e7',         // Maps to dew-mint
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['AgenticTimes', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        'sans-instrument': ['var(--font-instrument-sans)', 'sans-serif'],
        'agentic-times': ['AgenticTimes', 'serif']
      },
      spacing: { 'section-desktop': '120px', 'section-mobile': '80px' },
      borderRadius: { 'card': '10px' },
      animation: {
        'breathe-mint': 'breathe-mint 8s ease-in-out infinite',
        'marquee': 'marquee 35s linear infinite'
      },
      keyframes: {
        'breathe-mint': { '0%, 100%': { opacity: '0.2' }, '50%': { opacity: '0.6' } },
        'marquee': { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-100%)' } }
      },
    },
  },
  plugins: [],
}

# Lighthouse & SEO

## Lighthouse

### Commands

| Command | Description |
|---------|-------------|
| `npm run lighthouse-report` | Build app, run Lighthouse, output HTML + JSON report |
| `npm run lighthouse-check` | Same as above, but fail if any category score < 70% |
| `npm run lighthouse` | Run check first, then generate full report |

### Report output

- `lighthouse-report.html` – Open in browser for full audit
- `lighthouse-report.report.json` – Raw data for tooling

### Categories audited

- **Performance** – Load speed, TTI, CLS
- **Accessibility** – ARIA, contrast, labels
- **Best practices** – HTTPS, console errors
- **SEO** – Meta tags, crawlability

### Threshold

Default minimum score: **70** per category. Edit `scripts/lighthouse-check.mjs` → `THRESHOLD`.

### Requirements

- Chrome/Chromium installed (Lighthouse uses it)
- Build succeeds before running

---

## SEO Setup

### Meta tags (index.html)

- **description** – VentPro-focused: ventilation services, installation, repair, inspection, maintenance, air quality.
- **theme-color** – `#7c3aed` (violet, matches brand).
- **Open Graph** – `og:title`, `og:description`, `og:type` for sharing.
- **robots** – `index, follow`.

### Dynamic meta (per route)

- `@vueuse/head` in `App.vue` updates `<title>` and `<meta name="description">` from `route.meta`.
- Set `title` and `description` on each route in `router/index.ts` (VentPro defaults in place).

### robots.txt

- Path: `public/robots.txt`.
- `User-agent: *` with `Allow: /`.
- `Sitemap: /sitemap.xml` (relative; replace with full URL when deploying).

### Sitemap

- `public/sitemap.xml` – static list of URLs (home). Update `<loc>` with your production origin when deploying.

## Accessibility

- **Skip link** – “Skip to main content” (visible on focus) in `App.vue`; targets `#main-content`.
- **Landmarks** – `<header role="banner">`, `<main id="main-content" role="main">`, `<footer role="contentinfo">`.
- **Navigation** – Main nav and footer nav have `aria-label` (“Main navigation”, “Footer navigation”).
- **Search** – Region has `role="search"` and `aria-label`; input has `aria-label` from `home.header.searchAriaLabel`; results list has `role="listbox"` and options `role="option"`; loading state has `role="status"` and `aria-live="polite"`.
- **Decorative images** – Hero/CTA banners use `alt=""` and `aria-hidden="true"` where appropriate; informative images (ventilation concepts) use i18n `alt` text.

---

## Smoke tests

Run: `npm run smoke`

Uses Playwright to:

1. Build the app
2. Start preview server
3. Hit key routes
4. Check that core content and interactions work (e.g. language selector)

### Writing smoke tests

Tests live in `e2e/`. Add cases for:

- Each route loading
- Critical links and buttons
- Main user flows

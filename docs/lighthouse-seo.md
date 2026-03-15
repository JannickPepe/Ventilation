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

- `description`, `theme-color`
- Open Graph: `og:title`, `og:description`, `og:type`
- `robots`: `index, follow`

### Dynamic meta (per route)

- `@vueuse/head` updates `<title>` and `<meta name="description">` from `route.meta`
- Add `title` and `description` to each route’s `meta` in `router/index.ts`

### robots.txt

- Path: `public/robots.txt`
- Allows all crawlers; adjust `Allow`/`Disallow` as needed
- Update `Sitemap` URL when you have a sitemap

### Sitemap

For SPAs, sitemaps are often generated at build time or served by the backend. Add a `sitemap.xml` to `public/` and reference it in `robots.txt` once you have it.

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

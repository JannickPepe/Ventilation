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

- `@vueuse/head` in `App.vue` updates `<title>`, `<meta name="description">`, and `<meta name="robots">` from `route.meta`.
- Set `title` and `description` on each route in `router/index.ts` (VentPro defaults in place).
- **Login, register, dashboard** use `meta.robots: 'noindex, nofollow'` so they are not indexed; home uses default `index, follow`.

### robots.txt

- Path: `public/robots.txt`.
- `User-agent: *` with `Allow: /`.
- `Disallow: /login`, `/register`, `/dashboard` so crawlers do not index auth/dashboard pages.
- `Sitemap: /sitemap.xml` (relative; replace with full URL when deploying).

### Sitemap

- `public/sitemap.xml` – static list of **indexable** URLs (home only). Login, register, and dashboard are noindex and omitted. Update `<loc>` with your production origin when deploying.

## Accessibility

- **Skip link** – “Skip to main content” (visible on focus) in `App.vue`; targets `#main-content`.
- **Landmarks** – `<header role="banner">`, `<main id="main-content" role="main">`, `<footer role="contentinfo">`.
- **Navigation** – Main nav and footer nav have `aria-label` (“Main navigation”, “Footer navigation”).
- **Search** – Region has `role="search"` and `aria-label`; input has `aria-label` from `home.header.searchAriaLabel`; results list has `role="listbox"` and options `role="option"`; loading state has `role="status"` and `aria-live="polite"`.
- **Decorative images** – Hero/CTA banners use `alt=""` and `aria-hidden="true"` where appropriate; informative images (ventilation concepts) use i18n `alt` text.
- **Buttons** – `AtomButton` supports an optional `ariaLabel` prop for an explicit accessible name. Prefer visible label text (slot); use `ariaLabel` when the button is icon-only or to reinforce the action (e.g. “Sign in to your account”, “Log out of your account”). Each button should have a clear label for screen readers.

---

## Smoke tests

Run: `npm run smoke`

Uses Playwright to:

1. Build the app
2. Start preview server
3. Hit key routes (home, login, register)
4. Check that core content, nav links, and interactions work (e.g. language selector)

### Writing smoke tests

Tests live in `e2e/smoke.spec.ts`. Current coverage:

- **Home** – main content and footer visible; heading contains VentPro/Expert/Ventilation.
- **Login** – `/login` loads; heading “Log in”, email field, “Sign in” button visible.
- **Register** – `/register` loads; heading “Register”, email field, “Create account” button visible.
- **Nav** – from home, “Log in” and “Register” links visible; clicking them navigates to `/login` and `/register`.
- **Language selector** – visible and main content remains after switching locale.

Add further cases for:

- Each new route loading
- Critical links and buttons
- Main user flows (e.g. login submission if needed)

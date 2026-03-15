# Huso Architecture

## Overview

Huso is a Vue 3 application built with a feature-based architecture, strict TypeScript, and performance best practices. The current home page showcases **VentPro** (ventilation services): hero with banner, services, benefits, ventilation concepts, FAQ (data from API), CTA, and a site footer. SEO, accessibility (skip link, ARIA, landmarks), and a Ruby backend for locales and heading search are set up.

## Key Focus Areas

- **Feature-based architecture** – Domain-driven structure
- **Clean API + Service separation** – API client vs business logic
- **Modular Pinia stores** – Per-domain, with persistence
- **Reusable composables** – Shared logic
- **Strong TypeScript typing** – Strict mode enabled
- **i18n** – vue-i18n with locale store (en, da)
- **Lazy loading and code splitting** – Route-based + manual chunks
- **Centralized error handling** – Global handler + API interceptors
- **Performance optimization** – Bundle analyzer, virtual scrolling ready

## Folder Structure

```
src/
├── api/           # HTTP client, resource factories
├── assets/        # Images, fonts
├── components/    # Atomic design (atoms, molecules, organisms, templates e.g. AppFooter)
├── constants/     # App constants
├── core/          # Error handler (handleError, setErrorHandler)
├── composables/   # Vue composables
├── features/      # Feature-based modules
├── i18n/          # vue-i18n config
├── locales/       # JSON locale files (en.json, da.json)
├── router/        # Routes, middleware, guards
├── services/      # API service layer (business logic)
├── stores/        # Pinia stores (locale, app, resources)
├── types/         # Shared types
├── utils/         # Pure utilities
└── views/         # Route-level pages

e2e/               # Playwright smoke tests
scripts/           # Build scripts (e.g. lighthouse-check.mjs)
docs/              # Architecture, API, guidelines, Lighthouse/SEO, data-handling, ruby-setup
```

## Linting & Code Quality

- **ESLint** – Flat config with Vue, TypeScript, Prettier
- **Prettier** – Consistent formatting
- **TypeScript strict** – Strict mode, strictNullChecks
- **Husky + lint-staged** – Pre-commit: lint + format on staged files, then `test:run` and `vue-tsc`
- **dev:full** – Run lint, TypeScript, and tests before starting dev server

## i18n (vue-i18n)

- **Source of truth** – When the Ruby backend is running, locale JSON is served from `/api/locales/:locale`. Otherwise the app uses bundled `src/locales/en.json`, `da.json`.
- **Default** – English
- **Store** – `useLocaleStore()` with Pinia persistence
- **Usage** – `t('key')` or `$t('key')` in templates
- **Headings search** – Backend indexes all h1–h6 keys; frontend search calls `/api/search?q=...&locale=...` and scrolls to the matching section. See [ruby-setup.md](./ruby-setup.md).

## State Management (Pinia Best Practices)

- Modular stores by domain (app, locale, faq, resources)
- Separate state, actions, getters
- Pinia persistence plugin for hydration
- **New API = new store resource:** When adding a new API endpoint, create a dedicated store that performs the fetch. The UI component only reads from the store; the view (or parent) triggers the store’s fetch so the component stays free of API calls. See [api.md](./api.md).
- API logic in services/composables or stores (stores for domain-specific fetch-and-hold, e.g. FAQ)
- Use `createResourceStore` for CRUD resources

## Performance

- Route-based code splitting (lazy `import()` for routes)
- `defineAsyncComponent` for heavy components
- Prefer `ref()` over `reactive()` for simple state
- Avoid deeply nested reactive objects
- Manual chunks: vue-vendor, vueuse, validation
- Run `npm run build:analyze` for bundle analysis

## Middleware

Router middleware runs in `meta.middleware`. Add names like `auth` to protect routes.

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) – This file
- [api.md](./api.md) – API layer
- [coding-guidelines.md](./coding-guidelines.md) – Conventions
- [lighthouse-seo.md](./lighthouse-seo.md) – Lighthouse, SEO, accessibility, smoke tests
- [data-handling.md](./data-handling.md) – Utils and composables for API and data
- [ruby-setup.md](./ruby-setup.md) – Ruby backend (locales + search)

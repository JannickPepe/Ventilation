# Huso Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) – Architecture and best practices
- [api.md](./api.md) – API layer and resource factories
- [coding-guidelines.md](./coding-guidelines.md) – Naming, TypeScript, Vue conventions
- [lighthouse-seo.md](./lighthouse-seo.md) – Lighthouse audits, SEO, smoke tests
- [data-handling.md](./data-handling.md) – Utils & composables for API and data
- [ruby-setup.md](./ruby-setup.md) – Ruby backend setup (locales + search)

## Commands

| Command | Description |
|--------|-------------|
| `npm run dev` | Start frontend dev server only |
| `npm run start` | Start **backend + frontend** in one terminal (see [ruby-setup.md](./ruby-setup.md)) |
| `npm run backend` | Start Ruby API only (port 3000) |
| `npm run dev:full` | Lint + TypeScript + tests, then dev (fail-fast) |
| `npm run build` | Production build |
| `npm run build:analyze` | Build with bundle analyzer |
| `npm run test` | Run tests (watch) |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Test coverage |
| `npm run lint` | ESLint |
| `npm run format` | Prettier format |
| `npm run lighthouse` | Full Lighthouse audit (check + report) |
| `npm run lighthouse-check` | Lighthouse scores, fail if below threshold |
| `npm run lighthouse-report` | Lighthouse HTML + JSON report |
| `npm run smoke` | Playwright smoke tests (routes, buttons) |

## i18n (vue-i18n)

- **With backend**: Locales are loaded from the Ruby API (`/api/locales/:locale`) and are the source of truth. See [ruby-setup.md](./ruby-setup.md).
- **Without backend**: Bundled locale files `src/locales/en.json`, `src/locales/da.json` are used.
- Default: English. `useLocaleStore()` for locale state (persisted).
- Use `t('key')` or `$t('key')` in templates.
- **Search**: Header search uses the backend to search over all heading (h1–h6) text; when the backend is running, results link to the matching section.

## Commit workflow (Husky + lint-staged)

On `git commit`, the pre-commit hook runs:

1. **lint-staged** – ESLint + Prettier on staged files
2. **test:run** – Vitest
3. **vue-tsc --noEmit** – TypeScript check

If any step fails, the commit is aborted.

To enable: ensure Huso is a git repo (`git init`), then `npm install` (runs `prepare` → husky init).

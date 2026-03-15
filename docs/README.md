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
- **FAQ**: FAQ section data is loaded from the backend (`GET /api/faq?locale=...`). The view triggers the store fetch; the FAQ organism only reads from the store. See [api.md](./api.md) (convention: new API = new store).

## Auth (login, register, dashboard)

- **Login / Register**: Nav links go to `/login` and `/register`. Validation is done on the backend; errors are shown in the UI via the ErrorMessage component. Email (only) is persisted in localStorage for form pre-fill; password is never stored.
- **JWT**: Access token (1 hour) and refresh token (5 days). On 401 the client tries refresh; if that fails, user is logged out and redirected to login. After 5 days the user must sign in again to get a new token.
- **Protected route**: `/dashboard` is protected by the `auth` router middleware. See [api.md](./api.md) (Auth API) and [ARCHITECTURE.md](./ARCHITECTURE.md) (Middleware).

## Git – seeing your name and email in history / blame

`git blame` shows the **author of the last commit** that changed each line. To see your name and email (e.g. “Bob Larsen &lt;boblarsen@live.dk&gt;”):

1. Set your identity once (if not already):  
   `git config --global user.name "Your Name"`  
   `git config --global user.email "your@email.com"`
2. **Commit your changes.** Uncommitted edits are not in history, so they never appear in blame. After you commit, `git blame` on the updated lines will show you as the author.

So the diff you have in the editor will only show up in blame after you run `git add` and `git commit`.

## Commit workflow (Husky + lint-staged)

On `git commit`, the pre-commit hook runs:

1. **lint-staged** – ESLint + Prettier on staged files
2. **test:run** – Vitest
3. **vue-tsc --noEmit** – TypeScript check

If any step fails, the commit is aborted.

To enable: ensure Huso is a git repo (`git init`), then `npm install` (runs `prepare` → husky init).

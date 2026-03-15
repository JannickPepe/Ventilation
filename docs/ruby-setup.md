# Ruby Backend Setup (Huso)

The Huso frontend can run with an optional **Ruby (Sinatra) backend** that:

- Serves **locales as the source of truth** (i18n) for the app
- Exposes **search over all headings** (h1–h6) so the header search is backed by the API

## Prerequisites

- **Ruby** 3.x (recommended). Check with `ruby -v`.
- **Bundler**: `gem install bundler` if needed.

### Windows: “bundle is not recognized”

If you just installed Ruby (e.g. RubyInstaller) and accepted “Add to PATH”:

1. **Close this terminal and open a new one** (or restart Cursor). PATH is only updated for new sessions.
2. In the **new** terminal, run:
   ```powershell
   ruby -v
   gem -v
   ```
   If both work, install Bundler and run bundle in the backend:
   ```powershell
   gem install bundler
   cd C:\Users\janni\source\repos\Huso\backend
   bundle install
   ```
3. If `ruby` or `gem` are still not found, add Ruby’s `bin` folder to PATH yourself:
   - Typical path: `C:\Ruby33-x64\bin` or `C:\Users\<YourUser>\AppData\Local\Programs\Ruby\Ruby33-x64\bin`.
   - In PowerShell (current user):  
     `[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Ruby33-x64\bin", "User")`  
     (adjust the path if yours is different).
   - Close and reopen the terminal, then try `ruby -v` and `bundle install` again.

## One-time setup

1. Open a terminal in the project root.
2. Go to the backend and install gems:

   ```bash
   cd backend
   bundle install
   ```

3. Return to the project root:

   ```bash
   cd ..
   ```

## Run backend only

From the project root:

```bash
npm run backend
```

This starts the API at **http://localhost:3000**. Endpoints:

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check |
| `GET /api/locales` | List available locale codes |
| `GET /api/locales/:locale` | Locale JSON (e.g. `en`, `da`) – source of truth for frontend i18n |
| `GET /api/search?q=...&locale=en` | Search headings by translated text; returns matches with `route`, `id`, `title` |
| `GET /api/faq?locale=en` | FAQ items (question + answer) for the given locale |

## Run backend + frontend in one terminal

From the project root:

```bash
npm install
npm run start
```

This runs:

- **Backend** on http://localhost:3000 (locales + search API)
- **Frontend** (Vite) on http://localhost:5173 (or next free port)

The frontend proxies `/api` to the backend, so the Vue app uses the same origin for API calls.

## Backend layout

```
backend/
├── Gemfile
├── config.ru
├── app.rb
└── data/
    ├── locales/
    │   ├── en.json
    │   └── da.json
    ├── faq/
    │   ├── en.json
    │   └── da.json
    └── headings.json
```

- **data/locales/** – Locale JSON files; edit these to change copy. The frontend loads them at startup and when switching language.
- **data/headings.json** – Index of every heading (h1–h6) that should be searchable: `key` (i18n key), `tag`, `route`, `id` (fragment for scroll-to). When you add new headings on the frontend, add a corresponding entry here so search works.
- **data/faq/** – FAQ JSON per locale (`en.json`, `da.json`). Each file is an array of `{ "id": "1", "question": "...", "answer": "..." }`. Served by `GET /api/faq?locale=...`.

## Without the backend

If you don’t run the backend:

- The frontend still works: it uses **bundled** locale files (`src/locales/en.json`, `da.json`).
- Header search will not return results (API calls will fail and results stay empty).

So you can develop UI with `npm run dev` only; run `npm run start` when you need backend-driven i18n and search.

# CLAUDE.md

Guidance for working in this repository. Everything here was checked against the files in the repo; anything unverified is marked **unknown**.

## 1. Project Overview

**AI Product Intelligence Dashboard**: a portfolio SaaS-style dashboard for monitoring AI model usage, cost and latency.

- **Dashboard** (`/dashboard`): KPI cards (requests, tokens, cost) derived from a 7/14/30-day range with change versus the previous period, requests/cost chart toggle, refresh control with "last updated", skeleton/empty/error states.
- **AI Models** (`/models`): search (stored in the URL as `?q=`), provider filter, sorting (dropdown and table headers), summary tiles, Clear filters, table on desktop and cards on mobile.
- **Coming Soon** (`/prompts`, `/analytics`, `/users`, `/settings`): one reusable `ComingSoon` page. These modules are intentionally not implemented.
- Header with breadcrumbs, date-range filter, sample notifications and a user menu. There is **no authentication**; the user menu shows a fixed placeholder profile.

## 2. Tech Stack

- **Frontend:** React 19, TypeScript (~6.0), Vite 8, React Router 7, Recharts 3, Tailwind CSS 4 (`@tailwindcss/vite`; theme tokens live in `src/index.css`, there is no `tailwind.config`).
- **Backend (optional for local development):** Express 5, PostgreSQL via `pg`, run with `tsx`.
- **Tooling:** ESLint 10 (flat config: typescript-eslint, react-hooks, react-refresh).
- **Tests:** none configured (no test script, runner or test files).
- No state-management or UI-component library is used.

## 3. Project Structure

```text
src/
  App.tsx, main.tsx, config.ts, navigation.ts, index.css
  components/   reusable UI (layout, cards, chart, table, popovers, states)
  context/      DashboardFiltersProvider.tsx + dashboardFilters.ts (date-range state)
  hooks/        useAsyncData, usePageTitle
  pages/        Dashboard, Models, Prompts, Analytics, Users, Settings, NotFound
  services/     apiClient (fetch + errors), dashboardService, modelService, demoData
  types/        re-exports of shared contracts
  utils/        dashboardMetrics, modelFormatters, modelSorting
shared/         contracts.ts (types used by frontend and API), fixtures.ts (simulated data)
server/         Express API + Postgres (src/app.ts, routes/, services/, db/ with migrations, seed, setup)
.github/workflows/deploy-pages.yml   GitHub Pages deployment
```

Routing is `BrowserRouter` in `App.tsx` with `basename` derived from Vite's `BASE_URL`. API routes: `GET /api/dashboard`, `/api/models`, `/api/health`.

## 4. Development Commands

All defined in `package.json`:

| Command | Purpose |
|---|---|
| `npm run dev:demo` | Frontend only, bundled demo data, no backend needed |
| `npm run dev` | Frontend against the real API (Vite proxies `/api` to `http://127.0.0.1:3000`) |
| `npm run dev:server` | Start the API (needs `server/.env`) |
| `npm run db:setup` | Run migrations and seed the local database (needs `server/.env`) |
| `npm run build` / `npm run build:demo` | `tsc -b` then Vite build (API mode / demo mode) |
| `npm run lint` | ESLint |
| `npm run preview` | Preview the last build |
| `npx tsc -p server/tsconfig.json --noEmit` | Type-check the server (`tsc -b` covers only `src` and `vite.config.ts`) |

`build:server` and `start:server` exist in `package.json`; they were not exercised while writing this file. There is no test command.

Windows note: in Git Bash, a value starting with `/` is rewritten into a path. When testing the Pages build locally, use `MSYS_NO_PATHCONV=1 BASE_PATH=/ai-product-intelligence-dashboard/ npm run build:demo` (or PowerShell: `$env:BASE_PATH = "/ai-product-intelligence-dashboard/"`).

Environment variables found in code: `BASE_PATH` (build time, `vite.config.ts`), `PORT` (server, defaults to 3000, binds `127.0.0.1`), and PostgreSQL's `PGHOST`, `PGDATABASE`, `PGUSER` (required by `server/src/db/pool.ts`), plus `PGPORT`, `PGPASSWORD` (listed in `server/.env.example`). Vite mode `demo` selects demo data (`src/config.ts`).

## 5. Coding Guidelines

- Function components with default exports; props typed as `type XProps`; one component per file, named like the file (`PascalCase.tsx`). Hooks are `useX` in `src/hooks`; utilities are `camelCase.ts`.
- Strict TypeScript settings are on: `verbatimModuleSyntax` (use `import type`), `erasableSyntaxOnly` (no enums, namespaces or constructor parameter properties), `noUnusedLocals/Parameters`. Do not use `any`.
- Domain types are defined once in `shared/contracts.ts` and re-exported from `src/types/`. Do not duplicate them.
- `eslint-plugin-react-refresh` and `eslint-plugin-react-hooks` (v7) are enabled. Keep component files exporting only components (hooks and context objects live in separate files, as in `context/`), and follow the hooks rules.
- Data loading goes through `useAsyncData`. Services return typed promises. `getJson` in `src/services/apiClient.ts` throws errors with the status and the server's `{ error }` message; callers log the real error with `console.error` and show a short fixed message with a retry action.
- Match the surrounding file's style. Indentation is mostly 4 spaces in `src/` and 2 spaces in `server/` and `shared/`, but a few files differ, so check the file you are editing.

## 6. UI/UX Guidelines

- Modern, professional SaaS look; keep the existing teal palette from `src/index.css` (`page`, `sidebar`, `sidebar-hover`, `card`, `accent`, `primary`, `muted`, `border`). Use the tokens, not new ad-hoc colors.
- Consistent spacing and radii (cards: `rounded-xl border border-border bg-card shadow-sm`). Restrained color; accent for emphasis only.
- Mobile first: layouts must not scroll horizontally down to ~320px. Existing pattern: sidebar drawer below `md`, cards instead of table below `md`, three-column grids from `lg`.
- Accessible controls: real `button`/`a`/`select` elements, visible `focus-visible` rings, `aria-label`s on icon buttons, `aria-sort` on sortable headers, status text in `role="status"`, errors in `role="alert"`.
- Charts: Recharts with theme colors, formatted axes, a clear title and subtitle, and a custom tooltip. Every data view needs loading (skeleton), empty and error states.
- Keep interactions polished but light: hover/focus transitions, popovers closing on Escape and outside click.

## 7. Data and API Rules

- **Demo mode** (`MODE === "demo"`): `src/services/dashboardService.ts` and `modelService.ts` return bundled data from `src/services/demoData.ts`, built on `shared/fixtures.ts`. The 30-day series is generated deterministically; only its date labels depend on today's date. Append `?demo=slow` or `?demo=error` to a page URL to review loading and error states.
- **API mode**: services call `/api/dashboard` and `/api/models`. The database is seeded by `npm run db:setup` from the same `shared/fixtures.ts`, so **API-mode data is also simulated**. No real AI-provider telemetry or provider API integration exists anywhere in this repo.
- Never present synthetic data as live provider telemetry: keep the "Demo data" badge and the demo notes, do not add wording such as "live", "real-time" or real provider usage claims, and label any new demo figures as simulated.
- Do not change the API response shapes in `shared/contracts.ts` casually; the frontend, the server and the demo data all depend on them.
- Never open, print or commit `server/.env`; it is git-ignored. Only `server/.env.example` (placeholder values) is tracked.

## 8. Deployment

The app is deployed only to **GitHub Pages** (evidence: `.github/workflows/deploy-pages.yml`, GitHub deployments API):
- Workflow runs on pushes to `main` and manual dispatch: Node 22, `npm ci`, `npm run build:demo` with `BASE_PATH=/ai-product-intelligence-dashboard/`, copies `dist/index.html` to `dist/404.html` (SPA fallback), then deploys with the official Pages actions.
- Site URL: `https://priyankagdev.github.io/ai-product-intelligence-dashboard/`. When this file was written, the latest run from `main` had succeeded and the site returned HTTP 200.
- Pages cannot rewrite routes, so refreshing a deep link such as `/models` is served from `404.html` with HTTP status 404 while the app renders normally.
- The repository Pages settings (Source = GitHub Actions) and the `github-pages` environment's branch rules (observed: `main` and `v2` allowed) are GitHub settings, not files in the repo.
- The original V1 (frontend-only) is preserved at the git tag `v1.0.0`.

## 9. Development Workflow

- Read the relevant code before editing; reuse existing components, hooks and utilities.
- Keep changes focused and small; do not refactor unrelated code.
- After changes, run `npm run build`, `npm run build:demo`, `npm run lint` and the server type check, and report real results. Check UI changes in a browser at desktop and ~375px widths where possible.
- Explain important changes, trade-offs and anything left unverified.

## 10. Important Constraints

- **Never commit, push, merge or deploy without the user's explicit approval.** Do not force-push, delete branches or repositories, or rewrite history, and ask before any other destructive git operation.
- Do not change GitHub Pages settings, and do not claim a deployment succeeded until the live site has been checked.
- Preserve existing functionality, routes, API contracts and the visual design unless a change is requested.
- Avoid new dependencies and over-engineering; do not add test infrastructure unless asked.
- Do not read, print or expose secrets (`server/.env`, tokens).
- Do not invent features, commands, environment variables or configuration; mark unknowns as unknown.

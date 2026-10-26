# AI Product Intelligence Dashboard

A SaaS-style dashboard for monitoring AI model usage, cost and latency, built with React, TypeScript, Tailwind CSS and Recharts.

## 🚀 Live Demo

[View Live Application](https://priyankagdev.github.io/ai-product-intelligence-dashboard/)

> The hosted version runs in **demo mode**: all figures are simulated demo data bundled with the app, so no backend is required.

## ✨ Features

### Dashboard

- KPI cards for requests, tokens and cost, with change versus the previous period
- Date-range control (7D / 14D / 30D) that drives both the KPI cards and the chart
- Requests / cost chart toggle with formatted tooltips and peak-day summary
- Skeleton loading, empty and error states (with retry)

### AI Models

- Search by model name, filter by provider and sort by requests, cost, latency or name
- Summary of requests, cost and request-weighted average latency for the current selection
- Table on desktop and cards on mobile, with a clear-filters action

### Platform

- Responsive layout with a mobile navigation drawer
- Reusable "Coming soon" page for the Prompts, Analytics, Users and Settings modules (not part of this release)
- Typed data layer with shared TypeScript contracts between frontend and API

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4, React Router, Recharts
- **Backend (optional for local development):** Express 5, PostgreSQL (`pg`)
- **Tooling:** ESLint

## 💻 Running Locally

### Demo mode (frontend only, no backend needed)

```bash
npm install
npm run dev:demo
```

Append `?demo=slow` or `?demo=error` to a page URL (for example `/models?demo=error`) to review the loading and error states.

### Full-stack mode (Express API + PostgreSQL)

1. Set up the API and database as described in [`server/README.md`](server/README.md).
2. Start the API: `npm run dev:server`
3. In a second terminal, start the frontend: `npm run dev`

Vite proxies `/api` requests to the API on port 3000.

### Other scripts

| Script | Purpose |
|---|---|
| `npm run build` | Type-check and build against the API |
| `npm run build:demo` | Type-check and build in demo mode (used for deployment, see `.github/workflows/deploy-pages.yml`) |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the last production build |

## 🏗️ Project Architecture

```text
shared/            TypeScript contracts and fixtures shared by frontend and API
server/            Express + PostgreSQL API (/api/dashboard, /api/models, /api/health)
src/
├── components/    Reusable UI (layout, cards, chart, table, states)
├── hooks/         useAsyncData, usePageTitle
├── pages/         Dashboard, Models, Coming Soon modules, NotFound
├── services/      API client, data services and demo data
├── utils/         Formatting, sorting and dashboard metrics
└── config.ts      Demo-mode switch
```

## 🚢 Deployment

- The app is hosted on **GitHub Pages**: https://priyankagdev.github.io/ai-product-intelligence-dashboard/
- The workflow in `.github/workflows/deploy-pages.yml` builds it in demo mode and publishes it on every push to `main`. It needs no backend.
- The original frontend-only V1 is preserved at the `v1.0.0` tag. It was previously hosted on Vercel, which no longer builds this repository.
- The Pages build sets `BASE_PATH=/ai-product-intelligence-dashboard/`. Without it (local development) the app is served from the site root.
- GitHub Pages cannot rewrite routes, so the workflow copies `index.html` to `404.html`. Refreshing a route such as `/models` is served through that file, and React Router renders the page (the HTTP status of that response is 404).

To try the Pages build locally:

```bash
# macOS / Linux (in Git Bash on Windows, prefix with MSYS_NO_PATHCONV=1)
BASE_PATH=/ai-product-intelligence-dashboard/ npm run build:demo
npm run preview
```

```powershell
# Windows PowerShell
$env:BASE_PATH = "/ai-product-intelligence-dashboard/"; npm run build:demo
npm run preview
```

## 🔭 Roadmap

- Prompts, Analytics, Users and Settings modules
- Usage-event pipeline behind the dashboard metrics

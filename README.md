# AI Product Intelligence Dashboard

A SaaS-style dashboard for monitoring AI model usage, cost and latency, built with React, TypeScript, Tailwind CSS and Recharts.

## 🚀 Live Demo

[View Live Application](https://ai-product-intelligence-dashboard-4qmba9pjx-priyankagdev.vercel.app)

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
| `npm run build:demo` | Type-check and build in demo mode (used for deployment, see `vercel.json`) |
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

## 🔭 Roadmap

- Prompts, Analytics, Users and Settings modules
- Usage-event pipeline behind the dashboard metrics

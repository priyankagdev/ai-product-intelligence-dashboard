# AI Product Intelligence Dashboard

A modern AI usage and performance dashboard built with React, TypeScript, Tailwind CSS, and Recharts.

The application provides a centralized view of AI model usage, costs, request volume, and latency through a responsive enterprise-style dashboard.

## 🚀 Live Demo

[View Live Application](https://ai-product-intelligence-dashboard-4qmba9pjx-priyankagdev.vercel.app)

## 📸 Overview

The AI Product Intelligence Dashboard is designed to help product and engineering teams monitor AI model usage and performance from a single interface.

### Dashboard

- AI request volume
- Token usage
- Estimated AI costs
- Request trend visualization
- Responsive dashboard layout

### AI Models

- AI model performance cards
- Model usage statistics
- Request volume
- Cost tracking
- Latency monitoring
- Search by model
- Filter by provider
- Responsive performance table

## ✨ Key Features

- 📊 AI usage dashboard
- 🤖 AI model monitoring
- 💰 Cost tracking
- ⚡ Latency monitoring
- 🔎 Model search
- 🏷️ Provider filtering
- 📈 Usage trend visualization
- 📱 Responsive design
- ⏳ Loading states
- ❌ Error handling
- 🔄 Simulated asynchronous API layer
- 🧭 Client-side routing
- ♻️ Reusable React components
- 📐 Type-safe TypeScript architecture

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts

### Development

- ESLint
- Git
- GitHub

## 🏗️ Project Architecture

```text
src/
├── components/
│   ├── Header.tsx
│   ├── ModelCard.tsx
│   ├── ModelTable.tsx
│   ├── Sidebar.tsx
│   ├── StatCard.tsx
│   └── UsageChart.tsx
│
├── pages/
│   ├── Analytics.tsx
│   ├── Dashboard.tsx
│   ├── Models.tsx
│   ├── Prompts.tsx
│   ├── Settings.tsx
│   └── Users.tsx
│
├── services/
│   ├── dashboardService.ts
│   └── modelService.ts
│
├── types/
│   ├── AIModel.ts
│   └── DashboardStats.ts
│
├── App.tsx
├── index.css
└── main.tsx
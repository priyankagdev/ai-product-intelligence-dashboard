import type { AIModel, DashboardChartData, DashboardStats } from "./contracts.ts";

export const dashboardStats: DashboardStats[] = [
  {
    id: "requests",
    title: "AI Requests",
    value: 128450,
    description: "Requests this month",
  },
  {
    id: "tokens",
    title: "Token Usage",
    value: 2_400_000,
    description: "Tokens consumed",
  },
  {
    id: "cost",
    title: "Total Cost",
    value: 428.5,
    description: "Estimated monthly cost",
  },
];

const CHART_DAYS = 30;

const dayFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});

function createRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Simulated daily usage for the last 30 days, ending today. The values are
// deterministic; only the date labels depend on when this runs.
function buildDashboardChartData(): DashboardChartData[] {
  const random = createRandom(2026);
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  return Array.from({ length: CHART_DAYS }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (CHART_DAYS - 1 - index));

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const weekdayFactor = isWeekend ? 0.62 : 1;
    const growthFactor = 1 + (index / (CHART_DAYS - 1)) * 0.18;
    const requests = Math.round(
      15000 * weekdayFactor * growthFactor * (0.9 + random() * 0.2),
    );
    const cost = Math.round(requests * 0.0033 * (0.95 + random() * 0.1) * 100) / 100;

    return { day: dayFormatter.format(date), requests, cost };
  });
}

export const dashboardChartData: DashboardChartData[] = buildDashboardChartData();

export const models: AIModel[] = [
  {
    id: "gpt",
    name: "GPT",
    provider: "OpenAI",
    requests: 48230,
    costUsd: 182.4,
    latencyMs: 820,
  },
  {
    id: "claude",
    name: "Claude",
    provider: "Anthropic",
    requests: 31450,
    costUsd: 124.8,
    latencyMs: 760,
  },
  {
    id: "gemini",
    name: "Gemini",
    provider: "Google",
    requests: 18720,
    costUsd: 86.2,
    latencyMs: 690,
  },
];

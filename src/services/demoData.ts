import type { AIModel, DashboardData, DashboardStats } from "../../shared/contracts";
import { dashboardChartData as chartData } from "../../shared/fixtures";

// Simulated demo data for portfolio use. The daily series is shared with the
// database seed, and the totals and per-model figures are derived from it so
// they always add up.

const DEMO_DAYS = chartData.length;
const TOKENS_PER_REQUEST = 950;
const totalRequests = chartData.reduce((sum, point) => sum + point.requests, 0);
const totalCost =
    Math.round(chartData.reduce((sum, point) => sum + point.cost, 0) * 100) / 100;

const stats: DashboardStats[] = [
    {
        id: "requests",
        title: "AI Requests",
        value: totalRequests,
        description: `Requests, last ${DEMO_DAYS} days`,
    },
    {
        id: "tokens",
        title: "Token Usage",
        value: totalRequests * TOKENS_PER_REQUEST,
        description: `Estimated tokens, last ${DEMO_DAYS} days`,
    },
    {
        id: "cost",
        title: "Total Cost",
        value: totalCost,
        description: `Estimated cost, last ${DEMO_DAYS} days`,
    },
];

const modelSeeds = [
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", share: 0.26, price: 1, latencyMs: 840 },
    { id: "gpt-4o-mini", name: "GPT-4o mini", provider: "OpenAI", share: 0.22, price: 0.08, latencyMs: 410 },
    { id: "claude-sonnet", name: "Claude Sonnet", provider: "Anthropic", share: 0.18, price: 1.1, latencyMs: 780 },
    { id: "claude-haiku", name: "Claude Haiku", provider: "Anthropic", share: 0.1, price: 0.12, latencyMs: 360 },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google", share: 0.09, price: 0.7, latencyMs: 720 },
    { id: "gemini-flash", name: "Gemini Flash", provider: "Google", share: 0.07, price: 0.06, latencyMs: 330 },
    { id: "mistral-large", name: "Mistral Large", provider: "Mistral AI", share: 0.05, price: 0.8, latencyMs: 690 },
    { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta", share: 0.03, price: 0.25, latencyMs: 520 },
];

function buildModels(): AIModel[] {
    const costWeights = modelSeeds.map((seed) => seed.share * seed.price);
    const totalWeight = costWeights.reduce((sum, weight) => sum + weight, 0);
    let remainingRequests = totalRequests;
    let remainingCost = totalCost;

    return modelSeeds.map((seed, index) => {
        const isLast = index === modelSeeds.length - 1;
        const requests = isLast ? remainingRequests : Math.round(totalRequests * seed.share);
        const costUsd = isLast
            ? Math.round(remainingCost * 100) / 100
            : Math.round((totalCost * costWeights[index]) / totalWeight * 100) / 100;

        remainingRequests -= requests;
        remainingCost -= costUsd;

        return {
            id: seed.id,
            name: seed.name,
            provider: seed.provider,
            requests,
            costUsd,
            latencyMs: seed.latencyMs,
        };
    });
}

export const demoDashboardData: DashboardData = { stats, chartData };
export const demoModels: AIModel[] = buildModels();

const DEMO_DELAY_MS = 500;
const DEMO_SLOW_DELAY_MS = 3000;

// Append ?demo=slow or ?demo=error to a page URL (demo mode only) to review
// the loading and error states without a backend.
export function respondWithDemo<T>(data: T): Promise<T> {
    const scenario = new URLSearchParams(window.location.search).get("demo");
    const delay = scenario === "slow" ? DEMO_SLOW_DELAY_MS : DEMO_DELAY_MS;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (scenario === "error") {
                reject(new Error("Simulated demo error (?demo=error)"));
                return;
            }
            resolve(data);
        }, delay);
    });
}

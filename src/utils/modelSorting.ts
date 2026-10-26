import type { AIModel } from "../types/AIModel";

export type ModelSortKey = "requests" | "cost" | "latency" | "name";

export const modelSortOptions: { value: ModelSortKey; label: string }[] = [
    { value: "requests", label: "Most requests" },
    { value: "cost", label: "Highest cost" },
    { value: "latency", label: "Lowest latency" },
    { value: "name", label: "Name (A–Z)" },
];

const comparators: Record<ModelSortKey, (a: AIModel, b: AIModel) => number> = {
    requests: (a, b) => b.requests - a.requests,
    cost: (a, b) => b.costUsd - a.costUsd,
    latency: (a, b) => a.latencyMs - b.latencyMs,
    name: (a, b) => a.name.localeCompare(b.name),
};

export function sortModels(models: AIModel[], sortKey: ModelSortKey): AIModel[] {
    return [...models].sort(comparators[sortKey]);
}

// Each sort key has one natural direction: biggest first for usage and cost,
// smallest first for latency and names.
export const modelSortDirection: Record<ModelSortKey, "asc" | "desc"> = {
    requests: "desc",
    cost: "desc",
    latency: "asc",
    name: "asc",
};

export function getModelSortLabel(sortKey: ModelSortKey): string {
    return modelSortOptions.find((option) => option.value === sortKey)?.label ?? sortKey;
}

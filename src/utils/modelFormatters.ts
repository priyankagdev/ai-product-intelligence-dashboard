const requestCountFormatter = new Intl.NumberFormat("en-US");
const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
const latencyFormatter = new Intl.NumberFormat("en-US");

export function formatRequestCount(requests: number): string {
    return requestCountFormatter.format(requests);
}

export function formatUsdCost(costUsd: number): string {
    return usdFormatter.format(costUsd);
}

export function formatLatency(latencyMs: number): string {
    return `${latencyFormatter.format(latencyMs)} ms`;
}

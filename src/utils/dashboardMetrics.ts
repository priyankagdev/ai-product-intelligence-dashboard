import type { DashboardChartData, DashboardData } from "../types/DashboardData";
import type { DashboardStats } from "../types/DashboardStats";

export type DashboardStatId = DashboardStats["id"];

export type RangeSummary = {
    days: number;
    stats: DashboardStats[];
    chartData: DashboardChartData[];
    // Percentage change versus the previous period of the same length, when
    // enough history exists.
    changes: Partial<Record<DashboardStatId, number>>;
};

export const RANGE_OPTIONS = [7, 14, 30];
const DEFAULT_RANGE_DAYS = 7;

export function getAvailableRanges(dataLength: number): number[] {
    return RANGE_OPTIONS.filter((days) => days <= dataLength);
}

export function getDefaultRange(dataLength: number): number {
    return Math.min(DEFAULT_RANGE_DAYS, dataLength);
}

function totalsFor(rows: DashboardChartData[], tokensPerRequest: number) {
    const requests = rows.reduce((sum, row) => sum + row.requests, 0);
    const cost = rows.reduce((sum, row) => sum + row.cost, 0);

    return {
        requests,
        tokens: Math.round(requests * tokensPerRequest),
        cost: Math.round(cost * 100) / 100,
    };
}

function percentChange(current: number, previous: number): number | undefined {
    return previous > 0 ? ((current - previous) / previous) * 100 : undefined;
}

// Derives the KPI cards from the selected slice of the daily chart data, so the
// cards and the chart always describe the same period. Tokens are not part of
// the daily data, so they are estimated from the overall tokens-per-request
// ratio of the stats returned by the API.
export function summarizeRange(data: DashboardData, days: number): RangeSummary {
    const requestsStat = data.stats.find((stat) => stat.id === "requests");
    const tokensStat = data.stats.find((stat) => stat.id === "tokens");
    const tokensPerRequest =
        requestsStat && tokensStat && requestsStat.value > 0
            ? tokensStat.value / requestsStat.value
            : 0;

    const chartData = data.chartData.slice(-days);
    const previousRows = data.chartData.slice(-days * 2, -days);
    const current = totalsFor(chartData, tokensPerRequest);
    const previous = totalsFor(previousRows, tokensPerRequest);
    const hasPrevious = previousRows.length === days;

    const descriptions: Record<DashboardStatId, string> = {
        requests: `Requests, last ${days} days`,
        tokens: `Estimated tokens, last ${days} days`,
        cost: `Estimated cost, last ${days} days`,
    };

    const stats = data.stats.map((stat): DashboardStats => ({
        ...stat,
        value: current[stat.id],
        description: descriptions[stat.id],
    }));

    const changes: RangeSummary["changes"] = {};
    if (hasPrevious) {
        for (const stat of data.stats) {
            const change = percentChange(current[stat.id], previous[stat.id]);
            if (change !== undefined) {
                changes[stat.id] = change;
            }
        }
    }

    return { days, stats, chartData, changes };
}

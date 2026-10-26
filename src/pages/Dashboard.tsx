import { useEffect, useState } from "react";
import type { DashboardStats } from "../types/DashboardStats";
import { getDashboardData } from "../services/dashboardService";
import { useAsyncData } from "../hooks/useAsyncData";
import { useDashboardFilters } from "../context/dashboardFilters";
import { summarizeRange } from "../utils/dashboardMetrics";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import UsageChart, { type ChartMetric } from "../components/UsageChart";
import RefreshControl from "../components/RefreshControl";
import DateRangeFilter from "../components/DateRangeFilter";
import ErrorState from "../components/ErrorState";
import Skeleton from "../components/Skeleton";
import type { DashboardKpiIcon } from "../components/AppIcon";

const statIcons: Record<DashboardStats["id"], DashboardKpiIcon> = {
    requests: "requests",
    tokens: "tokens",
    cost: "cost",
};

const requestFormatter = new Intl.NumberFormat("en-US");
const tokenFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
});
const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

function formatStatValue(stat: DashboardStats): string {
    switch (stat.id) {
        case "requests":
            return requestFormatter.format(stat.value);
        case "tokens":
            return tokenFormatter.format(stat.value);
        case "cost":
            return currencyFormatter.format(stat.value);
        default: {
            const exhaustiveCheck: never = stat;
            return exhaustiveCheck;
        }
    }
}

function DashboardSkeleton() {
    return (
        <div role="status">
            <span className="sr-only">Loading dashboard...</span>
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {[0, 1, 2].map((index) => (
                    <Skeleton key={index} className="h-40" />
                ))}
            </div>
            <Skeleton className="mt-8 h-[22rem]" />
        </div>
    );
}

function Dashboard() {
    const { data, loading, refreshing, error, updatedAt, reload } = useAsyncData(
        getDashboardData,
        "Failed to load dashboard statistics.",
    );
    const { activeDays, setDataLength } = useDashboardFilters();
    const [metric, setMetric] = useState<ChartMetric>("requests");

    // Tell the top-bar date-range filter how much data is available.
    const dataLength = data?.chartData.length ?? 0;
    useEffect(() => {
        setDataLength(dataLength);
        return () => setDataLength(0);
    }, [dataLength, setDataLength]);

    const summary = data && dataLength > 0 ? summarizeRange(data, activeDays) : null;

    return (
        <div className="min-w-0">
            <PageHeader
                title="Dashboard"
                description="AI usage overview"
                actions={
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Desktop shows this filter in the top bar instead */}
                        <div className="md:hidden">
                            <DateRangeFilter />
                        </div>
                        <RefreshControl
                            updatedAt={updatedAt}
                            refreshing={refreshing}
                            onRefresh={reload}
                        />
                    </div>
                }
            />

            {loading ? (
                <DashboardSkeleton />
            ) : error ? (
                <ErrorState message={error} onRetry={reload} />
            ) : summary === null ? (
                <p className="mt-8 text-center text-muted">
                    No usage data available yet.
                </p>
            ) : (
                <>
                    <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                        {summary.stats.map((stat) => (
                            <StatCard
                                key={stat.id}
                                title={stat.title}
                                value={formatStatValue(stat)}
                                description={stat.description}
                                icon={statIcons[stat.id]}
                                change={summary.changes[stat.id]}
                                changeLabel={`vs previous ${summary.days} days`}
                            />
                        ))}
                    </div>

                    <UsageChart
                        data={summary.chartData}
                        metric={metric}
                        onMetricChange={setMetric}
                    />
                </>
            )}
        </div>
    );
}

export default Dashboard;

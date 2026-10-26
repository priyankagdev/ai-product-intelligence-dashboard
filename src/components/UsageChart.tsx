import { useId } from "react";
import {
    ComposedChart,
    Area,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    type TooltipContentProps,
} from "recharts";
import type { DashboardChartData } from "../types/DashboardData";
import SegmentedControl from "./SegmentedControl";

export type ChartMetric = "requests" | "cost";

type UsageChartProps = {
    data: DashboardChartData[];
    metric: ChartMetric;
    onMetricChange: (metric: ChartMetric) => void;
};

const metricOptions: { value: ChartMetric; label: string }[] = [
    { value: "requests", label: "Requests" },
    { value: "cost", label: "Cost" },
];

const requestCountFormatter = new Intl.NumberFormat("en-US");
const compactCountFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
});
const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
const compactUsdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 0,
});

const metricConfig = {
    requests: {
        title: "AI Request Trend",
        seriesName: "Requests",
        formatValue: (value: number) => requestCountFormatter.format(value),
        formatAxis: (value: number) => compactCountFormatter.format(value),
    },
    cost: {
        title: "AI Cost Trend",
        seriesName: "Cost",
        formatValue: (value: number) => usdFormatter.format(value),
        formatAxis: (value: number) => compactUsdFormatter.format(value),
    },
} satisfies Record<ChartMetric, unknown>;

const changeFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

type ChartTooltipProps = Pick<TooltipContentProps<number, string>, "active" | "payload"> & {
    metric: ChartMetric;
    data: DashboardChartData[];
};

// Shows the hovered day's value, the change versus the previous day, and the
// other metric for context.
function ChartTooltip({ active, payload, metric, data }: ChartTooltipProps) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    const point = payload[0].payload as DashboardChartData;
    const index = data.findIndex((item) => item.day === point.day);
    const previous = index > 0 ? data[index - 1] : undefined;
    const change =
        previous && previous[metric] > 0
            ? ((point[metric] - previous[metric]) / previous[metric]) * 100
            : undefined;
    const other: ChartMetric = metric === "requests" ? "cost" : "requests";

    return (
        <div className="min-w-44 rounded-xl border border-border bg-card px-4 py-3 text-primary shadow-lg">
            <p className="text-xs font-medium text-muted">{point.day}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums">
                {metricConfig[metric].formatValue(point[metric])}
            </p>
            {change !== undefined && (
                <p className="mt-1 text-xs text-muted">
                    <span className={`font-semibold ${change >= 0 ? "text-accent" : "text-amber-600"}`}>
                        <span aria-hidden="true">{change >= 0 ? "▲" : "▼"}</span>{" "}
                        {changeFormatter.format(Math.abs(change))}%
                    </span>{" "}
                    vs previous day
                </p>
            )}
            <p className="mt-2 flex items-center justify-between gap-4 border-t border-border pt-2 text-xs text-muted">
                {metricConfig[other].seriesName}
                <span className="font-medium tabular-nums text-primary">
                    {metricConfig[other].formatValue(point[other])}
                </span>
            </p>
        </div>
    );
}

function UsageChart({ data, metric, onMetricChange }: UsageChartProps) {
    const config = metricConfig[metric];
    const gradientId = `usage-fill-${useId().replace(/:/g, "")}`;
    const peak = data.reduce<DashboardChartData | null>(
        (best, point) => (best === null || point[metric] > best[metric] ? point : best),
        null,
    );

    return (
        <section
            aria-labelledby="usage-chart-title"
            className="mt-8 min-w-0 rounded-xl border border-border bg-card p-4 text-primary shadow-sm sm:p-6"
        >
            <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h2
                        id="usage-chart-title"
                        className="text-base font-semibold text-primary sm:text-lg"
                    >
                        {config.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                        Daily {config.seriesName.toLowerCase()}
                        {peak && (
                            <>
                                {" "}
                                · Peak {config.formatValue(peak[metric])} on {peak.day}
                            </>
                        )}
                    </p>
                </div>

                <SegmentedControl
                    ariaLabel="Chart metric"
                    options={metricOptions}
                    value={metric}
                    onChange={onMetricChange}
                />
            </div>

            {data.length === 0 ? (
                <p className="py-16 text-center text-sm text-muted">
                    No usage data for this period.
                </p>
            ) : (
                <ResponsiveContainer width="100%" height={280}>
                    <ComposedChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    style={{ stopColor: "var(--color-accent)", stopOpacity: 0.28 }}
                                />
                                <stop
                                    offset="100%"
                                    style={{ stopColor: "var(--color-accent)", stopOpacity: 0 }}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            stroke="var(--color-border)"
                            strokeDasharray="3 3"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="day"
                            axisLine={{ stroke: "var(--color-border)" }}
                            tickLine={false}
                            tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                            tickMargin={8}
                            minTickGap={16}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                            tickFormatter={(value: number) => config.formatAxis(value)}
                            width={56}
                        />
                        <Tooltip
                            cursor={{
                                stroke: "var(--color-accent)",
                                strokeDasharray: "4 4",
                            }}
                            wrapperStyle={{ outline: "none" }}
                            animationDuration={150}
                            content={(tooltipProps) => (
                                <ChartTooltip active={tooltipProps.active} payload={tooltipProps.payload} metric={metric} data={data} />
                            )}
                        />

                        {/* Decorative fill only: the Line below carries the data and tooltip */}
                        <Area
                            type="monotone"
                            dataKey={metric}
                            stroke="none"
                            fill={`url(#${gradientId})`}
                            tooltipType="none"
                            activeDot={false}
                            legendType="none"
                        />

                        <Line
                            type="monotone"
                            dataKey={metric}
                            name={config.seriesName}
                            stroke="var(--color-accent)"
                            strokeWidth={3}
                            dot={data.length <= 14 ? { r: 3, fill: "var(--color-accent)" } : false}
                            activeDot={{
                                r: 6,
                                fill: "var(--color-accent)",
                                stroke: "var(--color-card)",
                                strokeWidth: 2,
                            }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            )}
        </section>
    );
}

export default UsageChart;

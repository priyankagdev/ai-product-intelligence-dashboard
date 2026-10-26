import AppIcon, { type DashboardKpiIcon } from "./AppIcon";

type StatCardProps = {
    title: string;
    value: string;
    description: string;
    icon: DashboardKpiIcon;
    // Percentage change versus the previous period, if known.
    change?: number;
    changeLabel?: string;
};

const changeFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
});

function StatCard({ title, value, description, icon, change, changeLabel }: StatCardProps) {
    const isUp = change !== undefined && change >= 0;

    return (
        <article className="flex h-full min-w-0 flex-col rounded-xl border border-border border-t-2 border-t-accent bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <h2 className="pt-1 text-sm font-medium tracking-wide text-muted">
                    {title}
                </h2>

                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#0D9488] via-[#2DD4BF] to-[#99F6E4] text-[#172B35] shadow-sm">
                    <AppIcon name={icon} className="h-5 w-5" />
                </span>
            </div>

            <div className="mb-4 mt-4">
                <p className="wrap-break-word text-3xl font-bold leading-none tracking-tight text-primary tabular-nums xl:text-4xl">
                    {value}
                </p>

                {change !== undefined && (
                    <p className="mt-3 flex flex-wrap items-center gap-x-1.5 text-sm text-muted">
                        <span
                            className={`inline-flex items-center gap-1 font-semibold ${
                                isUp ? "text-accent" : "text-amber-600"
                            }`}
                        >
                            <span aria-hidden="true" className="text-xs">
                                {isUp ? "▲" : "▼"}
                            </span>
                            <span className="sr-only">{isUp ? "Up" : "Down"}</span>
                            {changeFormatter.format(Math.abs(change))}%
                        </span>
                        <span>{changeLabel}</span>
                    </p>
                )}
            </div>

            <p className="mt-auto border-t border-border pt-3 text-sm leading-5 text-muted">
                {description}
            </p>
        </article>
    );
}

export default StatCard;

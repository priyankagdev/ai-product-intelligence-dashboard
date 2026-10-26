import AppIcon from "./AppIcon";

type RefreshControlProps = {
    updatedAt: Date | null;
    refreshing: boolean;
    onRefresh: () => void;
};

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
});

function RefreshControl({ updatedAt, refreshing, onRefresh }: RefreshControlProps) {
    return (
        <div className="flex items-center gap-3">
            <p role="status" className="text-sm text-muted">
                {updatedAt && (
                    <>
                        Last updated{" "}
                        <time dateTime={updatedAt.toISOString()} className="font-medium text-primary">
                            {timeFormatter.format(updatedAt)}
                        </time>
                    </>
                )}
            </p>

            <button
                type="button"
                onClick={onRefresh}
                disabled={refreshing}
                aria-label="Refresh dashboard data"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-page focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-wait disabled:opacity-70"
            >
                <AppIcon
                    name="refresh"
                    className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">{refreshing ? "Refreshing…" : "Refresh"}</span>
            </button>
        </div>
    );
}

export default RefreshControl;

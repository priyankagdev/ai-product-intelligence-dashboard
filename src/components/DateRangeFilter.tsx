import { useId } from "react";
import { useDashboardFilters } from "../context/dashboardFilters";
import { RANGE_OPTIONS } from "../utils/dashboardMetrics";
import AppIcon from "./AppIcon";

function DateRangeFilter() {
    const { activeDays, availableDays, setSelectedDays } = useDashboardFilters();
    const isDisabled = availableDays.length <= 1;
    const selectId = useId();

    return (
        <div
            className="relative"
            title={
                isDisabled
                    ? "Only one date range is available with the current data"
                    : undefined
            }
        >
            <label htmlFor={selectId} className="sr-only">
                Date range
            </label>
            <AppIcon
                name="calendar"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            />
            <select
                id={selectId}
                value={activeDays || RANGE_OPTIONS[0]}
                disabled={isDisabled}
                onChange={(event) => setSelectedDays(Number(event.target.value))}
                className="h-10 cursor-pointer appearance-none rounded-lg border border-border bg-card pl-9 pr-8 text-sm font-medium text-primary shadow-sm outline-none transition-colors focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {RANGE_OPTIONS.map((days) => (
                    <option key={days} value={days} disabled={!availableDays.includes(days)}>
                        Last {days} days
                    </option>
                ))}
            </select>
            <AppIcon
                name="chevron"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            />
        </div>
    );
}

export default DateRangeFilter;

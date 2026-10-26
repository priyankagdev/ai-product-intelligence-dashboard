import { useMemo, useState, type ReactNode } from "react";
import { getAvailableRanges, getDefaultRange } from "../utils/dashboardMetrics";
import { DashboardFiltersContext, type DashboardFilters } from "./dashboardFilters";

// Shares the date-range selection between the top bar (where it is chosen) and
// the Dashboard page (which knows how much data is available).
function DashboardFiltersProvider({ children }: { children: ReactNode }) {
    const [dataLength, setDataLength] = useState(0);
    const [selectedDays, setSelectedDays] = useState<number | null>(null);

    const value = useMemo<DashboardFilters>(() => {
        const availableDays = getAvailableRanges(dataLength);
        const activeDays =
            selectedDays !== null && availableDays.includes(selectedDays)
                ? selectedDays
                : getDefaultRange(dataLength);

        return { dataLength, setDataLength, availableDays, activeDays, setSelectedDays };
    }, [dataLength, selectedDays]);

    return (
        <DashboardFiltersContext.Provider value={value}>
            {children}
        </DashboardFiltersContext.Provider>
    );
}

export default DashboardFiltersProvider;

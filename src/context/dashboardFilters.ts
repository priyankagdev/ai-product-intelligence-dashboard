import { createContext, useContext } from "react";

export type DashboardFilters = {
    // Number of daily data points the Dashboard currently has (0 while loading).
    dataLength: number;
    setDataLength: (length: number) => void;
    availableDays: number[];
    // The range in effect: the user's choice when it is available, otherwise the default.
    activeDays: number;
    setSelectedDays: (days: number) => void;
};

export const DashboardFiltersContext = createContext<DashboardFilters | null>(null);

export function useDashboardFilters(): DashboardFilters {
    const filters = useContext(DashboardFiltersContext);
    if (filters === null) {
        throw new Error("useDashboardFilters must be used inside DashboardFiltersProvider");
    }
    return filters;
}

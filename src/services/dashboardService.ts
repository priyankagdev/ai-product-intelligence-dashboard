import { isDemoMode } from "../config";
import type { DashboardData } from "../types/DashboardData";
import { getJson } from "./apiClient";
import { demoDashboardData, respondWithDemo } from "./demoData";

export function getDashboardData(): Promise<DashboardData> {
    if (isDemoMode) {
        return respondWithDemo(demoDashboardData);
    }

    return getJson<DashboardData>("/api/dashboard");
}

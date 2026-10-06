import type { DashboardStats } from "../types/DashboardStats";

const stats: DashboardStats[] = [
  {
    id: "requests",
    title: "AI Requests",
    value: "128,450",
    description: "Requests this month",
  },
  {
    id: "tokens",
    title: "Token Usage",
    value: "2.4M",
    description: "Tokens consumed",
  },
  {
    id: "cost",
    title: "Total Cost",
    value: "$428.50",
    description: "Estimated monthly cost",
  },
];

export function getDashboardStats(): Promise<DashboardStats[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(stats);
        }, 800);
    });
}
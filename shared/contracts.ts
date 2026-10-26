export type DashboardStatBase = {
  title: string;
  description: string;
};

export type DashboardStats =
  | (DashboardStatBase & { id: "requests"; value: number })
  | (DashboardStatBase & { id: "tokens"; value: number })
  | (DashboardStatBase & { id: "cost"; value: number });

export type DashboardChartData = {
  day: string;
  requests: number;
  cost: number;
};

export type DashboardData = {
  stats: DashboardStats[];
  chartData: DashboardChartData[];
};

export type AIModel = {
  id: string;
  name: string;
  provider: string;
  requests: number;
  costUsd: number;
  latencyMs: number;
};

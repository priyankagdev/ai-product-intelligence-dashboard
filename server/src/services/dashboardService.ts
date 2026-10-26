import type { QueryResultRow } from "pg";
import type { DashboardChartData, DashboardData, DashboardStats } from "../../../shared/contracts.ts";
import { pool } from "../db/pool.ts";

interface DashboardStatRow extends QueryResultRow {
  id: string;
  title: string;
  value: string;
  description: string;
}

interface DashboardChartRow extends QueryResultRow {
  day: string;
  requests: number;
  cost_usd: string;
}

function parseFiniteNumber(value: string | number, field: string): number {
  const parsedValue = Number(value);
  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    throw new Error(`Invalid numeric value for ${field}`);
  }
  return parsedValue;
}

function parseCount(value: number, field: string): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`Invalid count value for ${field}`);
  }
  return value;
}

function mapStat(row: DashboardStatRow): DashboardStats {
  const value = parseFiniteNumber(row.value, `dashboard stat ${row.id}`);
  const base = { title: row.title, description: row.description };

  switch (row.id) {
    case "requests":
      return { ...base, id: "requests", value: parseCount(value, row.id) };
    case "tokens":
      return { ...base, id: "tokens", value: parseCount(value, row.id) };
    case "cost":
      return { ...base, id: "cost", value };
    default:
      throw new Error(`Unknown dashboard stat id: ${row.id}`);
  }
}

export async function getDashboardDataFromDatabase(): Promise<DashboardData> {
  const [statResult, chartResult] = await Promise.all([
    pool.query<DashboardStatRow>(
      `SELECT id, title, value::text AS value, description
       FROM ai_dashboard.dashboard_stats
       ORDER BY sort_order ASC`,
    ),
    pool.query<DashboardChartRow>(
      `SELECT day, requests, cost_usd::text AS cost_usd
       FROM ai_dashboard.dashboard_chart_data
       ORDER BY sort_order ASC`,
    ),
  ]);

  const stats = statResult.rows.map(mapStat);
  const chartData: DashboardChartData[] = chartResult.rows.map((row) => ({
    day: row.day,
    requests: parseCount(row.requests, `chart requests for ${row.day}`),
    cost: parseFiniteNumber(row.cost_usd, `chart cost for ${row.day}`),
  }));

  return { stats, chartData };
}

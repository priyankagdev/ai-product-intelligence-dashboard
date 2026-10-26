import type { PoolClient } from "pg";
import { dashboardChartData, dashboardStats, models } from "../../../shared/fixtures.ts";

export async function seedFixtures(client: PoolClient): Promise<void> {
  for (const [index, stat] of dashboardStats.entries()) {
    await client.query(
      `INSERT INTO ai_dashboard.dashboard_stats
        (id, title, value, description, sort_order)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO NOTHING`,
      [stat.id, stat.title, stat.value, stat.description, index + 1],
    );
  }

  // The chart covers the most recent days and is labelled with dates, so it is
  // replaced on every run to keep the dates current.
  await client.query("DELETE FROM ai_dashboard.dashboard_chart_data");
  for (const [index, point] of dashboardChartData.entries()) {
    await client.query(
      `INSERT INTO ai_dashboard.dashboard_chart_data
        (day, requests, cost_usd, sort_order)
       VALUES ($1, $2, $3, $4)`,
      [point.day, point.requests, point.cost, index + 1],
    );
  }

  for (const [index, model] of models.entries()) {
    await client.query(
      `INSERT INTO ai_dashboard.ai_models
        (id, name, provider, requests, cost_usd, latency_ms, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO NOTHING`,
      [
        model.id,
        model.name,
        model.provider,
        model.requests,
        model.costUsd,
        model.latencyMs,
        index + 1,
      ],
    );
  }
}

import type { QueryResultRow } from "pg";
import type { AIModel } from "../../../shared/contracts.ts";
import { pool } from "../db/pool.ts";

interface ModelRow extends QueryResultRow {
  id: string;
  name: string;
  provider: string;
  requests: number;
  cost_usd: string;
  latency_ms: number;
}

function parseCount(value: number, field: string): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`Invalid count value for ${field}`);
  }
  return value;
}

function parseCost(value: string): number {
  const parsedValue = Number(value);
  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    throw new Error("Invalid model cost value");
  }
  return parsedValue;
}

export async function getModelsFromDatabase(): Promise<AIModel[]> {
  const result = await pool.query<ModelRow>(
    `SELECT id, name, provider, requests, cost_usd::text AS cost_usd, latency_ms
     FROM ai_dashboard.ai_models
     ORDER BY sort_order ASC`,
  );

  return result.rows.map((row) => ({
    id: row.id,
    name: row.name,
    provider: row.provider,
    requests: parseCount(row.requests, `model requests for ${row.id}`),
    costUsd: parseCost(row.cost_usd),
    latencyMs: parseCount(row.latency_ms, `model latency for ${row.id}`),
  }));
}

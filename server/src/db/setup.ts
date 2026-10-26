import { readFile } from "node:fs/promises";
import { pool } from "./pool.ts";
import { seedFixtures } from "./seed.ts";

const migrationVersions = ["001_initial", "002_chart_day_labels"];

async function setupDatabase(): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query("CREATE SCHEMA IF NOT EXISTS ai_dashboard");
    await client.query(
      `CREATE TABLE IF NOT EXISTS ai_dashboard.schema_migrations (
        version text PRIMARY KEY,
        applied_at timestamptz NOT NULL DEFAULT now()
      )`,
    );

    for (const migrationVersion of migrationVersions) {
      const migrationResult = await client.query(
        "SELECT version FROM ai_dashboard.schema_migrations WHERE version = $1",
        [migrationVersion],
      );

      if (migrationResult.rowCount === 0) {
        const migrationSql = await readFile(
          new URL(`./migrations/${migrationVersion}.sql`, import.meta.url),
          "utf8",
        );
        await client.query(migrationSql);
        await client.query(
          "INSERT INTO ai_dashboard.schema_migrations (version) VALUES ($1) ON CONFLICT (version) DO NOTHING",
          [migrationVersion],
        );
      }
    }

    await seedFixtures(client);
    await client.query("COMMIT");
    console.info("Database migration and fixture seed completed.");
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch {
      // Preserve the original setup error.
    }
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase().catch((error: unknown) => {
  console.error("Database setup failed.", error);
  process.exitCode = 1;
});

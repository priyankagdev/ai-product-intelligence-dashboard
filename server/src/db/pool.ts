import { Pool } from "pg";

const requiredEnvironmentVariables = ["PGHOST", "PGDATABASE", "PGUSER"] as const;
const missingVariables = requiredEnvironmentVariables.filter(
  (name) => !process.env[name],
);

if (missingVariables.length > 0) {
  throw new Error(
    `Missing required PostgreSQL environment variable(s): ${missingVariables.join(", ")}`,
  );
}

export const pool = new Pool();

pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error", error);
});

import { Router } from "express";
import { pool } from "../db/pool.ts";

const healthRouter = Router();

healthRouter.get("/", async (_request, response) => {
  try {
    await pool.query("SELECT 1");
    response.json({ status: "ok", database: "connected" });
  } catch {
    response.status(503).json({ status: "error", database: "unavailable" });
  }
});

export default healthRouter;

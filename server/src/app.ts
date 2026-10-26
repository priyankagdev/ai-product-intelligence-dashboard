import express, { type ErrorRequestHandler } from "express";
import dashboardRouter from "./routes/dashboardRoutes.ts";
import healthRouter from "./routes/healthRoutes.ts";
import modelRouter from "./routes/modelRoutes.ts";

export const app = express();

app.use(express.json());
app.use("/api/health", healthRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/models", modelRouter);

app.use((_request, response) => {
  response.status(404).json({ error: "Not found" });
});

// Express identifies error handlers by their four parameters, so `_next` must stay.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error("API request failed.", error);
  response.status(500).json({ error: "Internal server error" });
};

app.use(errorHandler);

import { Router } from "express";
import { getDashboardDataFromDatabase } from "../services/dashboardService.ts";

const dashboardRouter = Router();

dashboardRouter.get("/", async (_request, response, next) => {
  try {
    response.json(await getDashboardDataFromDatabase());
  } catch (error) {
    next(error);
  }
});

export default dashboardRouter;

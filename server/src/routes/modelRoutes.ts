import { Router } from "express";
import { getModelsFromDatabase } from "../services/modelService.ts";

const modelRouter = Router();

modelRouter.get("/", async (_request, response, next) => {
  try {
    response.json(await getModelsFromDatabase());
  } catch (error) {
    next(error);
  }
});

export default modelRouter;

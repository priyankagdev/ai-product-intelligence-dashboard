import { isDemoMode } from "../config";
import type { AIModel } from "../types/AIModel";
import { getJson } from "./apiClient";
import { demoModels, respondWithDemo } from "./demoData";

export function getModels(): Promise<AIModel[]> {
  if (isDemoMode) {
    return respondWithDemo(demoModels);
  }

  return getJson<AIModel[]>("/api/models");
}

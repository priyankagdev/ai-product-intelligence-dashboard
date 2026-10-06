import type { AIModel } from "../types/AIModel";

const models: AIModel[] = [
  {
    id: "gpt",
    name: "GPT",
    provider: "OpenAI",
    requests: 48230,
    cost: 182.4,
    latency: 820,
  },
  {
    id: "claude",
    name: "Claude",
    provider: "Anthropic",
    requests: 31450,
    cost: 124.8,
    latency: 760,
  },
  {
    id: "gemini",
    name: "Gemini",
    provider: "Google",
    requests: 18720,
    cost: 86.2,
    latency: 690,
  },
];

export function getModels(): Promise<AIModel[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(models);
    }, 1000);
  });
}

// export function getModels(): Promise<AIModel[]> {
//   return new Promise((_, reject) => {
//     setTimeout(() => {
//       reject(new Error("API request failed"));
//     }, 1000);
//   });
// }
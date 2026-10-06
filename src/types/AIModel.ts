export type AIModel = {
  id: string;
  name: string;
  provider: string;
  requests: number;
  cost: number;
  latency: number;
};
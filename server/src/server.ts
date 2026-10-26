import { app } from "./app.ts";

const port = Number(process.env.PORT ?? "3000");

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port number");
}

app.listen(port, "127.0.0.1", () => {
  console.info(`AI Product Dashboard API listening on http://127.0.0.1:${port}`);
});

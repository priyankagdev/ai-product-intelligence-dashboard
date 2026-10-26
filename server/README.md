# Local API server

The API uses the local PostgreSQL database named `ai_product_dashboard`.

1. Copy `.env.example` to `.env` in this folder.
2. Fill in the PostgreSQL host, port, local role, and password for your machine. Do not commit `.env` or share the password.
3. From the repository root, run `npm run db:setup` once to create the app's schema and seed the existing fixtures.
4. Run `npm run dev:server` to start the API on port 3000.
5. In another terminal, run `npm run dev` to start the frontend. Vite proxies `/api` requests to the server.

The Dashboard and AI Models pages read from this API (`/api/dashboard` and `/api/models`) when the frontend runs with `npm run dev`. To review the frontend without the API, use `npm run dev:demo` instead. The API can also be checked directly at `/api/health`, `/api/dashboard`, and `/api/models`.

// `npm run dev:demo` and `npm run build:demo` run Vite in "demo" mode, which
// serves bundled demo data instead of calling the Express API.
export const isDemoMode = import.meta.env.MODE === "demo";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    // Only the GitHub Pages workflow sets BASE_PATH (a repository subpath);
    // local development serves from the site root.
    base: process.env.BASE_PATH ?? "/",
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            "/api": "http://127.0.0.1:3000",
        },
    },
});

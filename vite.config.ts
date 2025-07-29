import { defineConfig } from "vite";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: process.env.BASE_PATH || '',
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

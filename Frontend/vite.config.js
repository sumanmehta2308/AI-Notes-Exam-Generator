import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // THIS IS THE FIX: This tells Vite to allow communication with authentication popups
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
  },
});

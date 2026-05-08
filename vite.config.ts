import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "url";
import { componentTagger } from "lovable-tagger";

// ✅ This version is Windows-safe and handles dots/spaces in folder names
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8081, // ✅ keep your preferred port
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

  resolve: {
    alias: {
      // ✅ Use URL-based resolution instead of path.resolve
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginRewriteAll from "vite-plugin-rewrite-all";

export default defineConfig({
  base: process.env.GITHUB_PAGES ? "/mch-test/" : "/",
  plugins: [pluginRewriteAll(), react()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});

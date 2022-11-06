import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// https://vitejs.dev/config/

const config = {
  root: "src",
  base: process.env.GITHUB_PAGES ? "/mch-test/" : "/",
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "../dist",
  },
};

console.log(`process.env.GITHUB_PAGES: ${process.env.GITHUB_PAGES}`);
console.log(config);
console.log(`config.base: ${config.base}`);
export default defineConfig(config);

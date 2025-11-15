import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  define: {
    global: "window",
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});

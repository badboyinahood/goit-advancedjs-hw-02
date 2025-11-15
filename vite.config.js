import { defineConfig } from "vite";
import { resolve } from "path";

// ⚠️ Название твоего репозитория
const repo = "goit-advancedjs-hw-02";

export default defineConfig({
  root: "src",

  base: `/${repo}/`,

  build: {
    outDir: "../dist",
    emptyOutDir: true,

    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
        timer: resolve(__dirname, "src/1-timer.html"),
        snackbar: resolve(__dirname, "src/2-snackbar.html"),
      },
    },
  },
});

import { defineConfig } from "vite";
import { glob } from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";
import postcssSortMediaQueries from "postcss-sort-media-queries";

export default defineConfig(({ command }) => ({
  root: "src",

  // ⚠️ ОБЯЗАТЕЛЬНО: поменяй goit-js-hw-10 на реальное имя репозитория
  base: "/goit-advancedjs-hw-02/",

  define: {
    // фикс ошибки global is not defined только в dev
    ...(command === "serve" ? { global: {} } : {}),
  },

  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,

    rollupOptions: {
      // Обрабатываем все HTML в src/
      input: glob.sync("./src/*.html"),

      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },

        entryFileNames: chunk => {
          if (chunk.name === "commonHelpers") return "commonHelpers.js";
          return "[name].js";
        },

        assetFileNames: asset => {
          if (asset.name && asset.name.endsWith(".html")) {
            return "[name].[ext]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },

  plugins: [
    injectHTML(),
    FullReload(["./src/**/*.html"]),
  ],

  css: {
    postcss: {
      plugins: [
        postcssSortMediaQueries({ sort: "mobile-first" }),
      ],
    },
  },
}));

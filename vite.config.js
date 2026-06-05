import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";
import { resolve } from "path";

export default defineConfig(({ command }) => {
  const version = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);

  // 是否為正式站 build
  const isPhpBuild = process.env.BUILD_PHP === "true";

  function htmlVersioningPlugin(version) {
    return {
      name: "html-versioning",
      enforce: "post",

      transformIndexHtml(html) {
        let result = html
          // 1. 替換所有 {{APP_VERSION}}
          .replace(/{{APP_VERSION}}/g, version)

          // 2. JS 自動加版本號
          .replace(
            /<script([^>]+)src="([^">]+)"([^>]*)><\/script>/g,
            (match, before, src, after) => {
              if (src.includes("http") || src.includes("?v=")) {
                return match;
              }

              const connector = src.includes("?") ? "&" : "?";

              return `<script${before}src="${src}${connector}v=${version}"${after}></script>`;
            },
          )

          // 3. CSS 自動加版本號
          .replace(
            /<link([^>]+)href="([^">]+)"([^>]*)/g,
            (match, before, href, after) => {
              if (
                href.includes("http") ||
                href.includes("?v=") ||
                !href.includes(".css")
              ) {
                return match;
              }

              const connector = href.includes("?") ? "&" : "?";

              return `<link${before}href="${href}${connector}v=${version}"${after}`;
            },
          );

        // =========================
        // 正式站 build 移除 .html
        // GitHub Pages 不影響
        // =========================
        if (isPhpBuild) {
          result = result
            .replace(/href="([^"]+)\.html"/g, 'href="$1"')
            .replace(/href="([^"]+)\/index\.html"/g, 'href="$1"');
        }

        return result;
      },
    };
  }

  return {
    // 專案根目錄
    root: "project-root",

    // 本機與部署路徑
    base: command === "serve" ? "/" : "/fongai/",

    plugins: [
      injectHTML({
        data: {
          APP_VERSION: version,
        },
      }),

      htmlVersioningPlugin(version),
    ],

    build: {
      // 打包輸出位置
      outDir: "../dist",

      // 每次打包前清空
      emptyOutDir: true,

      // 多頁面入口
      rollupOptions: {
        input: {
          main: resolve(__dirname, "project-root/index.html"),

          about: resolve(__dirname, "project-root/about.html"),

          contact: resolve(__dirname, "project-root/contact.html"),

          fongaiapp: resolve(__dirname, "project-root/fongaiapp.html"),

          partners: resolve(__dirname, "project-root/partners.html"),

          technology: resolve(__dirname, "project-root/technology.html"),

          vivifrail: resolve(__dirname, "project-root/vivifrail.html"),

          news: resolve(__dirname, "project-root/news/news.html"),

          detail: resolve(__dirname, "project-root/news/detail.html"),

          whitepapers: resolve(
            __dirname,
            "project-root/whitepapers/index.html",
          ),

          whitepapers_detail: resolve(
            __dirname,
            "project-root/whitepapers/detail.html",
          ),

          fongaiexercise: resolve(
            __dirname,
            "project-root/fongai-exercise.html",
          ),

          selectedProducts: resolve(
            __dirname,
            "project-root/product/selected-products.html",
          ),

          product01: resolve(__dirname, "project-root/product/product-01.html"),

          product02: resolve(__dirname, "project-root/product/product-02.html"),

          product03: resolve(__dirname, "project-root/product/product-03.html"),
        },

        output: {
          // hash 防快取
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
        },
      },
    },
  };
});

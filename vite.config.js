import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";
import { resolve } from "path";

export default defineConfig(({ command }) => {

  const version = new Date().toISOString().replace(/[-:T]/g,'').slice(0,14);
  function htmlVersioningPlugin(version) {
    return {
      name: "html-versioning",
      enforce: "post",
      transformIndexHtml(html) {
        return html
          // JS
          .replace(
            /<script type="module" crossorigin src="([^"]+)"><\/script>/g,
            (match, src) => {
              return `<script type="module" crossorigin src="${src}?v=${version}"></script>`;
            }
          )
          // CSS
          .replace(
            /<link rel="stylesheet" crossorigin href="([^"]+)">/g,
            (match, href) => {
              return `<link rel="stylesheet" crossorigin href="${href}?v=${version}">`;
            }
          );
      },
    };
  }
  return {
    // 1. 設定專案根目錄，讓 Vite 去這裡找 index.html
    root: "project-root",

    // 2. 設定開發/發布的路徑基準
    // 本機開發時使用 '/'，部署到 GitHub 時自動切換為 '/fongai/'
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
      // 3. 設定打包輸出的位置 (相對於 project-root 的上一層)
      outDir: "../dist",
      emptyOutDir: true, // 每次打包前清空舊的 dist

      // 4. 多頁面入口設定 (告訴 Vite 哪些 HTML 需要被打包)
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
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
          // entryFileNames: `assets/[name].[hash].js`,
          // chunkFileNames: `assets/[name].[hash].js`,
          // assetFileNames: `assets/[name].[hash].[ext]`,
        },
      },
    },
  };
});

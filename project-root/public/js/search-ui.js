/**
 * 站內搜尋 UI：按鈕綁定、動態 modal、首次開啟才載入搜尋資料
 */
(function () {
  const TYPE_I18N_KEYS = {
    article: "search.type.article",
    whitepaper: "search.type.whitepaper",
    page: "search.type.page",
    product: "search.type.product",
  };

  const FALLBACK_TEXT = {
    "search.aria": {
      zh: "搜尋網站",
      en: "Search the site",
      ja: "サイトを検索",
    },
    "search.title": {
      zh: "搜尋網站",
      en: "Search",
      ja: "サイト検索",
    },
    "search.placeholder": {
      zh: "輸入關鍵字搜尋新聞、白皮書與頁面",
      en: "Search news, whitepapers, and pages",
      ja: "キーワードでニュース・資料・ページを検索",
    },
    "search.empty": {
      zh: "請輸入關鍵字開始搜尋",
      en: "Enter a keyword to start searching",
      ja: "キーワードを入力してください",
    },
    "search.no_results": {
      zh: "找不到相關內容",
      en: "No matching results",
      ja: "該当する結果がありません",
    },
    "search.loading": {
      zh: "載入搜尋資料中…",
      en: "Loading search data…",
      ja: "検索データを読み込み中…",
    },
    "search.close": {
      zh: "關閉",
      en: "Close",
      ja: "閉じる",
    },
    "search.type.article": { zh: "新聞", en: "News", ja: "ニュース" },
    "search.type.whitepaper": {
      zh: "白皮書",
      en: "Whitepaper",
      ja: "ホワイトペーパー",
    },
    "search.type.page": { zh: "頁面", en: "Page", ja: "ページ" },
    "search.type.product": { zh: "產品", en: "Product", ja: "製品" },
  };

  let dataPromise = null;
  let modalEl = null;
  let overlayEl = null;
  let inputEl = null;
  let resultsEl = null;
  let statusEl = null;
  let lastQuery = "";

  function getLang() {
    return localStorage.getItem("lang") || "zh";
  }

  function t(key) {
    const lang = getLang();
    const entry = FALLBACK_TEXT[key];
    if (!entry) return key;
    return entry[lang] || entry.zh || key;
  }

  function assetBase() {
    const isSubFolder =
      location.hostname.includes("github.io") ||
      location.pathname.startsWith("/fongai/");
    return isSubFolder ? "/fongai" : "";
  }

  function loadScriptOnce(src) {
    const fullSrc = assetBase() + src;
    const existing = document.querySelector(`script[data-search-src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "1") return Promise.resolve();
      return new Promise((resolve, reject) => {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () =>
          reject(new Error("Failed to load " + src)),
        );
      });
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = fullSrc;
      script.async = false;
      script.dataset.searchSrc = src;
      script.onload = () => {
        script.dataset.loaded = "1";
        resolve();
      };
      script.onerror = () => reject(new Error("Failed to load " + src));
      document.head.appendChild(script);
    });
  }

  function ensureSearchData() {
    if (window.FongAISearch && window.FongAISearch.buildSearchIndex) {
      window.FongAISearch.buildSearchIndex();
      return Promise.resolve();
    }

    if (dataPromise) return dataPromise;

    dataPromise = (async () => {
      if (typeof articlesData === "undefined") {
        await loadScriptOnce("/js/articles-data.js");
      }
      if (typeof whitepapersData === "undefined") {
        await loadScriptOnce("/js/whitepapers-data.js");
      }
      if (typeof searchPagesData === "undefined") {
        await loadScriptOnce("/js/search-pages-data.js");
      }
      if (!window.FongAISearch) {
        await loadScriptOnce("/js/search-engine.js");
      }

      if (!window.FongAISearch) {
        throw new Error("FongAISearch is not available");
      }
      window.FongAISearch.clearSearchIndexCache();
      window.FongAISearch.buildSearchIndex();
    })().catch((err) => {
      dataPromise = null;
      throw err;
    });

    return dataPromise;
  }

  function resolveResultUrl(url) {
    if (!url) return "#";
    if (url.startsWith("http") || url.startsWith("/fongai/")) return url;

    const isProd =
      location.hostname.includes("fongai.co") &&
      location.pathname.startsWith("/fongai/");
    const isGithub = location.hostname.includes("github.io");

    if (isProd) {
      let path = url.replace(/^\.?\//, "").replace(/\.html$/, "");
      if (path.includes("?")) {
        const [page, query] = path.split("?");
        const params = new URLSearchParams(query);
        if (params.has("id")) {
          return `/fongai/page.php?page=${page}&id=${params.get("id")}`;
        }
        if (params.has("slug")) {
          return `/fongai/page.php?page=${page}&slug=${params.get("slug")}`;
        }
      }
      if (path === "index" || path === "") {
        return "/fongai/page.php?page=index";
      }
      return `/fongai/page.php?page=${path}`;
    }

    if (isGithub && !url.startsWith("/fongai/")) {
      return "/fongai" + (url.startsWith("/") ? url : "/" + url);
    }

    return url;
  }

  function applyModalI18n() {
    if (!modalEl) return;

    const aria = t("search.aria");
    document.querySelectorAll(".js-search-toggle").forEach((btn) => {
      btn.setAttribute("aria-label", aria);
      btn.setAttribute("title", aria);
    });

    const title = modalEl.querySelector("[data-search-i18n='search.title']");
    const close = modalEl.querySelector("[data-search-i18n='search.close']");
    if (title) title.textContent = t("search.title");
    if (close) close.setAttribute("aria-label", t("search.close"));
    if (inputEl) {
      inputEl.setAttribute("placeholder", t("search.placeholder"));
      inputEl.setAttribute("aria-label", t("search.aria"));
    }

    if (window.loadLang) {
      window.loadLang(getLang());
    }

    if (lastQuery) {
      runSearch(lastQuery);
    } else if (resultsEl && !statusEl?.hidden) {
      // keep current status; refresh empty hint if needed
    } else if (resultsEl && resultsEl.childElementCount === 0 && statusEl) {
      statusEl.hidden = false;
      statusEl.textContent = t("search.empty");
    }
  }

  function createModal() {
    if (modalEl) return;

    overlayEl = document.createElement("div");
    overlayEl.className = "site-search-overlay";
    overlayEl.hidden = true;

    modalEl = document.createElement("div");
    modalEl.className = "site-search-modal";
    modalEl.setAttribute("role", "dialog");
    modalEl.setAttribute("aria-modal", "true");
    modalEl.hidden = true;
    modalEl.innerHTML = `
      <div class="site-search-panel">
        <div class="site-search-header">
          <h2 class="site-search-title" data-search-i18n="search.title" data-i18n="search.title"></h2>
          <button type="button" class="site-search-close" data-search-i18n="search.close" aria-label="">
            <i class="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>
        <div class="site-search-input-wrap">
          <i class="bi bi-search" aria-hidden="true"></i>
          <input
            type="search"
            class="site-search-input"
            autocomplete="off"
            data-i18n-placeholder="search.placeholder"
          />
        </div>
        <p class="site-search-status" hidden></p>
        <div class="site-search-results" role="list"></div>
      </div>
    `;

    document.body.appendChild(overlayEl);
    document.body.appendChild(modalEl);

    inputEl = modalEl.querySelector(".site-search-input");
    resultsEl = modalEl.querySelector(".site-search-results");
    statusEl = modalEl.querySelector(".site-search-status");

    overlayEl.addEventListener("click", closeModal);
    modalEl
      .querySelector(".site-search-close")
      .addEventListener("click", closeModal);
    inputEl.addEventListener("input", () => {
      runSearch(inputEl.value);
    });

    applyModalI18n();
  }

  function openModal() {
    createModal();
    overlayEl.hidden = false;
    modalEl.hidden = false;
    document.body.classList.add("site-search-open");
    applyModalI18n();

    resultsEl.innerHTML = "";
    statusEl.hidden = false;
    statusEl.textContent = t("search.loading");

    ensureSearchData()
      .then(() => {
        if (lastQuery) {
          inputEl.value = lastQuery;
          runSearch(lastQuery);
        } else {
          statusEl.hidden = false;
          statusEl.textContent = t("search.empty");
        }
        inputEl.focus();
      })
      .catch((err) => {
        console.error(err);
        statusEl.hidden = false;
        statusEl.textContent = t("search.no_results");
      });
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.hidden = true;
    overlayEl.hidden = true;
    document.body.classList.remove("site-search-open");
  }

  function runSearch(query) {
    lastQuery = query;
    if (!resultsEl || !window.FongAISearch) return;

    const trimmed = String(query || "").trim();
    if (!trimmed) {
      resultsEl.innerHTML = "";
      statusEl.hidden = false;
      statusEl.textContent = t("search.empty");
      return;
    }

    const results = window.FongAISearch.searchSite(trimmed, getLang());
    resultsEl.innerHTML = "";

    if (!results.length) {
      statusEl.hidden = false;
      statusEl.textContent = t("search.no_results");
      return;
    }

    statusEl.hidden = true;

    results.forEach((item) => {
      const a = document.createElement("a");
      a.className = "site-search-item";
      a.href = resolveResultUrl(item.url);
      a.setAttribute("role", "listitem");

      const typeKey = TYPE_I18N_KEYS[item.type] || "search.type.page";
      a.innerHTML = `
        <span class="site-search-badge site-search-badge--${item.type}">${t(typeKey)}</span>
        <span class="site-search-item-title"></span>
        <span class="site-search-item-excerpt"></span>
      `;
      a.querySelector(".site-search-item-title").textContent = item.title;
      a.querySelector(".site-search-item-excerpt").textContent = item.excerpt;
      resultsEl.appendChild(a);
    });
  }

  function clearOnLangChange() {
    lastQuery = "";
    if (inputEl) inputEl.value = "";
    if (resultsEl) resultsEl.innerHTML = "";
    if (statusEl) {
      statusEl.hidden = false;
      statusEl.textContent = t("search.empty");
    }
    applyModalI18n();
  }

  function wrapSetLang() {
    if (typeof window.setLang !== "function") return;
    if (window.setLang.__searchWrapped) return;

    const original = window.setLang;
    window.setLang = async function (lang) {
      await original(lang);
      clearOnLangChange();
    };
    window.setLang.__searchWrapped = true;
  }

  function bindToggles() {
    document.querySelectorAll(".js-search-toggle").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl && !modalEl.hidden) {
      closeModal();
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    bindToggles();
    wrapSetLang();
    // setLang may load slightly later as module
    setTimeout(wrapSetLang, 0);
    setTimeout(wrapSetLang, 300);

    const aria = t("search.aria");
    document.querySelectorAll(".js-search-toggle").forEach((btn) => {
      btn.setAttribute("aria-label", aria);
      btn.setAttribute("title", aria);
    });
  });
})();

/**
 * 站內搜尋資料層：映射新聞／白皮書／靜態頁，只比對標題與摘要
 */
(function (global) {
  const EXCERPT_MAX_LEN = 90;
  let cachedIndex = null;

  function getCurrentLang() {
    return localStorage.getItem("lang") || "zh";
  }

  function stripHtml(html) {
    if (!html || typeof html !== "string") return "";
    return html
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/\s+/g, " ")
      .trim();
  }

  function shortenText(text, maxLen) {
    const clean = stripHtml(text);
    if (!clean) return "";
    if (clean.length <= maxLen) return clean;
    return clean.slice(0, maxLen).trim() + "...";
  }

  function buildArticleUrl(id) {
    const isProd =
      location.hostname.includes("fongai.co") &&
      location.pathname.startsWith("/fongai/");

    if (isProd) {
      return `/fongai/page.php?page=news/detail&id=${encodeURIComponent(id)}`;
    }
    return `/news/detail.html?id=${encodeURIComponent(id)}`;
  }

  function buildWhitepaperUrl(slug) {
    const isProd =
      location.hostname.includes("fongai.co") &&
      location.pathname.startsWith("/fongai/");

    if (isProd) {
      return `/fongai/page.php?page=whitepapers/detail&slug=${encodeURIComponent(slug)}`;
    }
    return `/whitepapers/detail.html?slug=${encodeURIComponent(slug)}`;
  }

  function mapArticles(articles) {
    if (!Array.isArray(articles)) return [];

    return articles.map((item) => ({
      id: `article:${item.id}`,
      type: "article",
      url: buildArticleUrl(item.id),
      title: {
        zh: item.title_zh || "",
        en: item.title_en || item.title_zh || "",
        ja: item.title_ja || item.title_zh || "",
      },
      excerpt: {
        zh: item.excerpt_zh || "",
        en: item.excerpt_en || item.excerpt_zh || "",
        ja: item.excerpt_ja || item.excerpt_zh || "",
      },
    }));
  }

  function mapWhitepapers(whitepapers) {
    if (!Array.isArray(whitepapers)) return [];

    return whitepapers.map((item) => ({
      id: `whitepaper:${item.slug}`,
      type: "whitepaper",
      url: buildWhitepaperUrl(item.slug),
      title: {
        zh: item.title || "",
        en: item.title_en || item.title || "",
        ja: item.title_ja || item.title || "",
      },
      excerpt: {
        zh: shortenText(item.content || "", EXCERPT_MAX_LEN),
        en: shortenText(item.content_en || item.content || "", EXCERPT_MAX_LEN),
        ja: shortenText(item.content_ja || item.content || "", EXCERPT_MAX_LEN),
      },
    }));
  }

  function mapPages(pages) {
    if (!Array.isArray(pages)) return [];

    return pages.map((item) => ({
      id: item.id,
      type: item.type,
      url: item.url,
      title: {
        zh: (item.title && item.title.zh) || "",
        en: (item.title && item.title.en) || "",
        ja: (item.title && item.title.ja) || "",
      },
      excerpt: {
        zh: (item.excerpt && item.excerpt.zh) || "",
        en: (item.excerpt && item.excerpt.en) || "",
        ja: (item.excerpt && item.excerpt.ja) || "",
      },
    }));
  }

  function buildSearchIndex() {
    if (cachedIndex) return cachedIndex;

    const articles =
      typeof articlesData !== "undefined" ? mapArticles(articlesData) : [];
    const whitepapers =
      typeof whitepapersData !== "undefined"
        ? mapWhitepapers(whitepapersData)
        : [];
    const pages =
      typeof searchPagesData !== "undefined" ? mapPages(searchPagesData) : [];

    cachedIndex = [...pages, ...articles, ...whitepapers];
    return cachedIndex;
  }

  function clearSearchIndexCache() {
    cachedIndex = null;
  }

  function matchesQuery(item, query, lang) {
    const q = String(query || "")
      .trim()
      .toLowerCase();
    if (!q) return false;

    const title = String((item.title && item.title[lang]) || "").toLowerCase();
    const excerpt = String(
      (item.excerpt && item.excerpt[lang]) || "",
    ).toLowerCase();

    return title.includes(q) || excerpt.includes(q);
  }

  /**
   * @param {string} query
   * @param {string} [lang]
   * @returns {Array<{id:string,type:string,url:string,title:string,excerpt:string}>}
   */
  function searchSite(query, lang) {
    const currentLang = lang || getCurrentLang();
    const index = buildSearchIndex();

    return index
      .filter((item) => {
        if (item.type === "product" && currentLang !== "zh") return false;
        return matchesQuery(item, query, currentLang);
      })
      .map((item) => ({
        id: item.id,
        type: item.type,
        url: item.url,
        title: (item.title && item.title[currentLang]) || "",
        excerpt: (item.excerpt && item.excerpt[currentLang]) || "",
      }));
  }

  global.FongAISearch = {
    buildSearchIndex,
    clearSearchIndexCache,
    searchSite,
    getCurrentLang,
    mapArticles,
    mapWhitepapers,
    mapPages,
    shortenText,
  };
})(window);

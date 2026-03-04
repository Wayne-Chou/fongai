window.setLang = async function (lang) {
  localStorage.setItem("lang", lang);
  await loadLang(lang);
};

async function loadLang(lang) {
  try {
    const res = await fetch(`/lang/${lang}.json`);
    if (!res.ok) throw new Error("Language file not found");
    const data = await res.json();

    // 1. 處理帶有 data-i18n 的文字
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (data[key]) {
        el.textContent = data[key];
      }
    });

    // 2. 處理「建豐嚴選」顯示邏輯
    const selectedNav = document.getElementById("nav-selected-products");
    if (selectedNav) {
      // 只有中文顯示，其他隱藏
      selectedNav.style.setProperty(
        "display",
        lang === "zh" ? "block" : "none",
        "important",
      );
    }

    // 3. 更新 HTML 標籤的 lang 屬性（對 SEO 有幫助）
    document.documentElement.lang = lang;
  } catch (error) {
    console.error("切換語系失敗:", error);
  }
}

// 頁面初始化
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "zh";
  loadLang(savedLang);
});

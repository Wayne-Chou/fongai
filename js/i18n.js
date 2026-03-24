// window.setLang = async function (lang) {
//   localStorage.setItem("lang", lang);
//   await loadLang(lang);
// };

// async function loadLang(lang) {
//   document.documentElement.lang = lang;
//   const base = location.hostname.includes("github.io") ? "/fongai" : "";

//   const res = await fetch(base + "/lang/" + lang + ".json");
//   const data = await res.json();

//   document.querySelectorAll("[data-i18n]").forEach((el) => {
//     const key = el.getAttribute("data-i18n");
//     if (data[key]) {
//       el.textContent = data[key];
//     }
//   });
//   document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
//     const key = el.getAttribute("data-i18n-placeholder");
//     if (data[key]) {
//       el.setAttribute("placeholder", data[key]);
//     }
//   });
//   // B. 處理動態純文字 (如標題、麵包屑)
//   document.querySelectorAll("[data-dynamic-i18n]").forEach((el) => {
//     const targetText = el.getAttribute(`data-${lang}`);
//     if (targetText) el.innerText = targetText;
//   });

//   // C. 處理動態 HTML (如 content, applyContent)
//   document.querySelectorAll("[data-dynamic-i18n-html]").forEach((el) => {
//     const targetHtml = el.getAttribute(`data-${lang}`);
//     if (targetHtml) el.innerHTML = targetHtml;
//   });

//   const selectedNav = document.getElementById("nav-selected-products");
//   if (selectedNav) {
//     selectedNav.style.display = lang === "zh" ? "block" : "none";
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const savedLang = localStorage.getItem("lang") || "zh";
//   loadLang(savedLang);
// });
window.setLang = async function (lang) {
  localStorage.setItem("lang", lang);
  await loadLang(lang);
};

async function loadLang(lang) {
  document.documentElement.lang = lang;

  // 修改後的路徑判斷：增加對 WordPress 子目錄 /fongai/ 的支援
  const isSubFolder =
    location.hostname.includes("github.io") ||
    location.pathname.startsWith("/fongai/");

  const base = isSubFolder ? "/fongai" : "";

  try {
    // 加上 base 前綴，確保抓到 /fongai/lang/zh.json
    const res = await fetch(base + "/lang/" + lang + ".json");

    // 增加防呆檢查，如果抓到的是 WordPress 的 404 HTML 會報錯提示
    if (!res.ok) {
      console.error(`無法載入語系檔: ${lang}.json，狀態碼: ${res.status}`);
      return;
    }

    const data = await res.json();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (data[key]) {
        el.textContent = data[key];
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (data[key]) {
        el.setAttribute("placeholder", data[key]);
      }
    });

    // B. 處理動態純文字 (如標題、麵包屑)
    document.querySelectorAll("[data-dynamic-i18n]").forEach((el) => {
      const targetText = el.getAttribute(`data-${lang}`);
      if (targetText) el.innerText = targetText;
    });

    // C. 處理動態 HTML (如 content, applyContent)
    document.querySelectorAll("[data-dynamic-i18n-html]").forEach((el) => {
      const targetHtml = el.getAttribute(`data-${lang}`);
      if (targetHtml) el.innerHTML = targetHtml;
    });

    const selectedNav = document.getElementById("nav-selected-products");
    if (selectedNav) {
      selectedNav.style.display = lang === "zh" ? "block" : "none";
    }
  } catch (error) {
    console.error("JSON 解析錯誤，可能是路徑不對抓到了 404 頁面:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "zh";
  loadLang(savedLang);
});

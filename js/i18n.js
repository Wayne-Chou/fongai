async function loadLang(lang) {
  try {
    const res = await fetch(`lang/${lang}.json`);

    if (!res.ok) throw new Error("Language file not found");
    const data = await res.json();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (data[key]) {
        el.textContent = data[key];
      }
    });

    const selectedNav = document.getElementById("nav-selected-products");
    if (selectedNav) {
      selectedNav.style.display = lang === "zh" ? "block" : "none";
    }

    document.documentElement.lang = lang;
  } catch (error) {
    console.error("切換語系失敗:", error);
  }
}

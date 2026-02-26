async function setLang(lang) {
  localStorage.setItem("lang", lang);
  await loadLang(lang);
}

async function loadLang(lang) {
  const res = await fetch(`/lang/${lang}.json`);
  const data = await res.json();

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (data[key]) {
      el.textContent = data[key];
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "zh";
  loadLang(savedLang);
});

window.setLang = async function (lang) {
  localStorage.setItem("lang", lang);
  await loadLang(lang);
};

async function loadLang(lang) {
  const res = await fetch(`/lang/${lang}.json`);
  const data = await res.json();

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (data[key]) {
      el.textContent = data[key];
    }
  });

  const selectedNav = document.getElementById("nav-selected-products");
  if (selectedNav) {
    if (lang === "zh") {
      selectedNav.style.display = "block";
    } else {
      selectedNav.style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "zh";
  loadLang(savedLang);
});

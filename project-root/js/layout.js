async function loadHTML(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(url);
  el.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("#site-header", "../partials/header.html");
  loadHTML("#site-footer", "../partials/footer.html");
  const head = document.querySelector("head");
  if (head) {
    fetch("../partials/head.html")
      .then((res) => res.text())
      .then((html) => head.insertAdjacentHTML("beforeend", html));
  }
});

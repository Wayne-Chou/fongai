document.addEventListener("DOMContentLoaded", () => {
  const waitForNavbar = setInterval(() => {
    const nav = document.querySelector(".navbar");
    const navCollapse = document.getElementById("mainNav");

    if (!nav || !navCollapse) return;

    clearInterval(waitForNavbar);

    function updateNavbar() {
      if (window.scrollY > 50 || navCollapse.classList.contains("show")) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", updateNavbar);

    navCollapse.addEventListener("show.bs.collapse", () => {
      nav.classList.add("scrolled");
    });

    navCollapse.addEventListener("hide.bs.collapse", () => {
      if (window.scrollY <= 50) {
        nav.classList.remove("scrolled");
      }
    });

    updateNavbar();
  }, 50);
});

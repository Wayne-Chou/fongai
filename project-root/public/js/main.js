// 你的 navbar code
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
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;

          const target = +el.dataset.target;

          let current = 0;

          const increment = target / 60;

          function update() {
            current += increment;

            if (current < target) {
              el.innerText = Math.floor(current).toLocaleString();

              requestAnimationFrame(update);
            } else {
              el.innerText = target.toLocaleString();
            }
          }

          update();

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.6 },
  );

  counters.forEach((c) => observer.observe(c));
});
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));

    document
      .querySelectorAll(".tab-panel")
      .forEach((p) => p.classList.remove("active"));

    btn.classList.add("active");

    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

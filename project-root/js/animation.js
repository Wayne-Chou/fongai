document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("revealed");
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll("[data-reveal]")
    .forEach((el) => observer.observe(el));
});

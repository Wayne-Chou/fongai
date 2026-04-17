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
  const motionElements = document.querySelectorAll(".motion");

  const motionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("motion-show");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  motionElements.forEach((el) => motionObserver.observe(el));
});

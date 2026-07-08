let revealObserver;
let motionObserver;

function bindRevealElements() {
  if (!revealObserver) return;

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (el.dataset.revealBound === "1") return;
    el.dataset.revealBound = "1";
    revealObserver.observe(el);
  });
}

function bindMotionElements() {
  if (!motionObserver) return;

  document.querySelectorAll(".motion").forEach((el) => {
    if (el.dataset.motionBound === "1") return;
    el.dataset.motionBound = "1";
    motionObserver.observe(el);
  });
}

window.refreshRevealAnimations = function () {
  bindRevealElements();
};

document.addEventListener("DOMContentLoaded", () => {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("revealed");
      });
    },
    { threshold: 0.1 },
  );

  motionObserver = new IntersectionObserver(
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

  bindRevealElements();
  bindMotionElements();
});

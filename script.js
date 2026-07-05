document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Sticky nav shrink/blur on scroll
  const nav = document.getElementById("nav");
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });
  links.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));

  // Stagger hero reveal immediately (above the fold, no need to wait for scroll)
  document.querySelectorAll(".hero .reveal").forEach((el, i) => {
    setTimeout(() => el.classList.add("in-view"), 150 + i * 120);
  });

  // Lightbox for work samples
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");

  document.querySelectorAll(".view-sample").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".work-card");
      lightboxImg.src = card.dataset.full;
      lightboxImg.alt = card.dataset.title;
      lightboxCaption.textContent = card.dataset.title;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});

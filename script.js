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

  // Active section indicator (scroll-spy)
  const sections = document.querySelectorAll("section[id]");
  const navLinkMap = {};
  document.querySelectorAll(".nav__link").forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    navLinkMap[id] = link;
  });
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = navLinkMap[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.values(navLinkMap).forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((sec) => spy.observe(sec));

  // Hero typing animation
  const typingWordEl = document.getElementById("typingWord");
  if (typingWordEl) {
    const words = [
      "Lead Generation",
      "Calendar Management",
      "Email Management",
      "Data Entry",
      "Content Scheduling",
      "Customer Support",
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const current = words[wordIndex];
      if (!deleting) {
        charIndex++;
        typingWordEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        charIndex--;
        typingWordEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 65);
    }
    typeLoop();
  }

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

  // Lightbox / details modal for work samples
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const lightboxBadges = document.getElementById("lightboxBadges");
  const closeBtn = document.getElementById("lightboxClose");

  document.querySelectorAll(".view-sample").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".work-card");
      const title = card.dataset.title;
      const desc = card.querySelector("p")?.textContent.trim() || "";
      const badges = card.querySelectorAll(".work-card__badges span");

      lightboxImg.src = card.dataset.full;
      lightboxImg.alt = title;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;
      lightboxBadges.innerHTML = "";
      badges.forEach((badge) => {
        const span = document.createElement("span");
        span.textContent = badge.textContent.trim();
        lightboxBadges.appendChild(span);
      });

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

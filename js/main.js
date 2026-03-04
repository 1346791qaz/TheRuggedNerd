// The Rugged Nerd — Main JavaScript

(function () {
  "use strict";

  // ── Theme toggle / dark mode ─────────────────────────────
  const THEME_STORAGE_KEY = "trn-theme";
  const root = document.documentElement;

  const getInitialTheme = () => {
    try {
      const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme === "dark" || storedTheme === "light") {
        return storedTheme;
      }
    } catch (error) {
      // Ignore storage errors
    }

    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      // Ignore storage errors
    }
  };

  const updateThemeToggleLabel = (toggleButton, theme) => {
    const isDark = theme === "dark";
    toggleButton.textContent = isDark ? "☀ Light" : "🌙 Dark";
    toggleButton.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode",
    );
    toggleButton.setAttribute("aria-pressed", String(isDark));
  };

  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  const navList = document.querySelector(".main-nav ul");
  if (navList) {
    let themeToggleButton = navList.querySelector(".theme-toggle");

    if (!themeToggleButton) {
      const themeToggleItem = document.createElement("li");
      themeToggleItem.className = "theme-toggle-item";

      themeToggleButton = document.createElement("button");
      themeToggleButton.className = "theme-toggle";
      themeToggleButton.type = "button";

      themeToggleItem.appendChild(themeToggleButton);
      navList.appendChild(themeToggleItem);
    }

    updateThemeToggleLabel(themeToggleButton, initialTheme);

    themeToggleButton.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      updateThemeToggleLabel(themeToggleButton, nextTheme);
      window.dispatchEvent(new Event("scroll"));
    });
  }

  // ── Mobile nav toggle ──────────────────────────────────────
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ── Active nav link ────────────────────────────────────────
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkFile = href.split("/").pop();
    if (
      linkFile === currentPath ||
      (currentPath === "" && linkFile === "index.html") ||
      (currentPath.startsWith("blog") && href.includes("blog")) ||
      (currentPath === "resources.html" && href.includes("resources")) ||
      (currentPath === "photos.html" && href.includes("photos"))
    ) {
      link.classList.add("active");
    }
  });

  // ── Blog category filter ────────────────────────────────────
  const catBtns = document.querySelectorAll(".cat-btn");
  const blogCards = document.querySelectorAll(".blog-card[data-cat]");

  if (catBtns.length) {
    catBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        catBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        blogCards.forEach((card) => {
          if (filter === "all" || card.dataset.cat === filter) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // ── Photo lightbox ─────────────────────────────────────────
  const lightbox = document.getElementById("lightbox");
  const lightboxClose = document.querySelector(".lightbox-close");
  const photoItems = document.querySelectorAll(".photo-item[data-caption]");

  if (lightbox) {
    photoItems.forEach((item) => {
      item.addEventListener("click", () => {
        const caption = item.dataset.caption || "";
        const sub = item.dataset.sub || "";
        const icon = item.dataset.icon || "🏔️";

        lightbox.querySelector(".lightbox-caption").textContent = caption;
        lightbox.querySelector(".lightbox-sub").textContent = sub;
        lightbox.querySelector(".lightbox-icon").textContent = icon;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    };

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  // ── Scroll-based header elevation ──────────────────────────
  const header = document.querySelector(".site-header");
  if (header) {
    header.style.transition = "box-shadow 0.2s ease";
    const onScroll = () => {
      header.style.boxShadow =
        window.scrollY > 10 ? "0 12px 32px rgba(15, 23, 42, 0.12)" : "";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ── Animated entrance for cards ───────────────────────────
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(
        ".blog-card, .feature-card, .resource-item, .photo-item",
      )
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        observer.observe(el);
      });
  }
})();

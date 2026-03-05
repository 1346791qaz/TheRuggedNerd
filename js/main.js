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

  const getSearchPageHref = () => {
    try {
      const mainScript = document.querySelector('script[src*="main.js"]');
      const mainScriptSrc = mainScript ? mainScript.getAttribute("src") : "";

      if (mainScriptSrc) {
        const resolvedMainScript = new URL(mainScriptSrc, window.location.href);
        return new URL("../search.html", resolvedMainScript).pathname;
      }
    } catch (error) {
      // Ignore URL parsing errors
    }

    return "/search.html";
  };

  const createSearchUrl = (baseHref, query) => {
    const normalizedQuery = (query || "").trim();
    if (!normalizedQuery) return baseHref;

    const params = new URLSearchParams();
    params.set("q", normalizedQuery);
    return `${baseHref}?${params.toString()}`;
  };

  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  const navList = document.querySelector(".main-nav ul");
  if (navList) {
    const searchPageHref = getSearchPageHref();

    let navSearchItem = navList.querySelector(".nav-search-item");
    if (!navSearchItem) {
      navSearchItem = document.createElement("li");
      navSearchItem.className = "nav-search-item";
      navSearchItem.innerHTML = `
        <form class="nav-search-form" role="search" aria-label="Search site">
          <label class="sr-only" for="nav-search-input">Search site</label>
          <input
            id="nav-search-input"
            class="nav-search-input"
            type="search"
            name="q"
            placeholder="Search..."
            autocomplete="off"
          />
          <button
            class="nav-search-toggle"
            type="button"
            aria-label="Open site search"
            aria-expanded="false"
          >
            <span aria-hidden="true">🔍</span>
          </button>
        </form>
      `;
      navList.insertBefore(navSearchItem, navList.firstElementChild);
    }

    const navSearchForm = navSearchItem.querySelector(".nav-search-form");
    const navSearchInput = navSearchItem.querySelector(".nav-search-input");
    const navSearchToggle = navSearchItem.querySelector(".nav-search-toggle");

    if (navSearchForm && navSearchInput && navSearchToggle) {
      const openNavSearch = () => {
        navSearchForm.classList.add("open");
        navSearchToggle.setAttribute("aria-expanded", "true");
        navSearchInput.focus();
      };

      const closeNavSearch = () => {
        navSearchForm.classList.remove("open");
        navSearchToggle.setAttribute("aria-expanded", "false");
      };

      const submitNavSearch = () => {
        window.location.href = createSearchUrl(
          searchPageHref,
          navSearchInput.value,
        );
      };

      const queryFromUrl = new URLSearchParams(window.location.search).get("q");
      const onSearchPage = window.location.pathname.endsWith("search.html");
      if (queryFromUrl) {
        navSearchInput.value = queryFromUrl;
      }
      if (onSearchPage && queryFromUrl) {
        navSearchForm.classList.add("open");
        navSearchToggle.setAttribute("aria-expanded", "true");
      }

      navSearchToggle.addEventListener("click", () => {
        const isOpen = navSearchForm.classList.contains("open");
        if (!isOpen) {
          openNavSearch();
          return;
        }

        if (navSearchInput.value.trim()) {
          submitNavSearch();
        } else {
          closeNavSearch();
        }
      });

      navSearchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        submitNavSearch();
      });

      navSearchInput.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          closeNavSearch();
          navSearchInput.blur();
        }
      });

      document.addEventListener("click", (event) => {
        if (!navSearchItem.contains(event.target)) {
          closeNavSearch();
        }
      });
    }

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

    const siteHeader = document.querySelector(".site-header");
    if (siteHeader && !siteHeader.querySelector(".header-social")) {
      const headerSocial = document.createElement("div");
      headerSocial.className = "header-social";
      headerSocial.setAttribute("aria-label", "Social media links");
      headerSocial.innerHTML = `
        <a
          class="social-link"
          href="https://www.youtube.com/@theruggednerd"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="The Rugged Nerd on YouTube"
        >
          <span class="social-icon" aria-hidden="true">▶</span>
          <span>YouTube</span>
        </a>
        <a
          class="social-link"
          href="https://x.com/theruggednerd"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="The Rugged Nerd on X"
        >
          <span class="social-icon" aria-hidden="true">𝕏</span>
          <span>X</span>
        </a>
        <a
          class="social-link"
          href="https://www.instagram.com/theruggednerd/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="The Rugged Nerd on Instagram"
        >
          <span class="social-icon" aria-hidden="true">📷</span>
          <span>Instagram</span>
        </a>
        <a
          class="social-link"
          href="https://www.twitch.tv/theruggednerd"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="The Rugged Nerd on Twitch"
        >
          <span class="social-icon" aria-hidden="true">🎮</span>
          <span>Twitch</span>
        </a>
      `;
      siteHeader.appendChild(headerSocial);
    }
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
  const catBtns = document.querySelectorAll(".cat-btn[data-filter]");
  const blogCards = document.querySelectorAll(".blog-card[data-cat]");
  const blogSearchInput = document.getElementById("blog-search-input");
  const blogSearchClear = document.getElementById("blog-search-clear");
  const blogSearchAll = document.querySelector(".blog-search-all");

  const normalizeText = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  const getActiveBlogFilter = () => {
    const activeButton = document.querySelector(".cat-btn.active[data-filter]");
    return activeButton ? activeButton.dataset.filter : "all";
  };

  const applyBlogFilters = () => {
    if (!blogCards.length) return;

    const activeFilter = getActiveBlogFilter();
    const query = normalizeText(blogSearchInput ? blogSearchInput.value : "");

    blogCards.forEach((card) => {
      const category = card.dataset.cat || "";
      const title = card.querySelector("h3")?.textContent || "";
      const summary = card.querySelector("p")?.textContent || "";
      const content = normalizeText(`${title} ${summary} ${category}`);

      const matchesCategory =
        activeFilter === "all" || category === activeFilter;
      const matchesSearch = !query || content.includes(query);

      card.style.display = matchesCategory && matchesSearch ? "" : "none";
    });
  };

  if (blogCards.length) {
    catBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        catBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        applyBlogFilters();
      });
    });

    if (blogSearchInput) {
      blogSearchInput.addEventListener("input", applyBlogFilters);

      if (blogSearchAll) {
        const updateBlogSearchHref = () => {
          blogSearchAll.setAttribute(
            "href",
            createSearchUrl(getSearchPageHref(), blogSearchInput.value),
          );
        };

        updateBlogSearchHref();
        blogSearchInput.addEventListener("input", updateBlogSearchHref);
      }

      blogSearchInput.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          blogSearchInput.value = "";
          applyBlogFilters();
        }
      });
    }

    if (blogSearchClear && blogSearchInput) {
      blogSearchClear.addEventListener("click", () => {
        blogSearchInput.value = "";
        applyBlogFilters();
        blogSearchInput.focus();
      });
    }

    applyBlogFilters();
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

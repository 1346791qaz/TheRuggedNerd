// The Rugged Nerd — Main JavaScript

(function () {
  'use strict';

  // ── Mobile nav toggle ──────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav   = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Active nav link ────────────────────────────────────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop();
    if (
      linkFile === currentPath ||
      (currentPath === '' && linkFile === 'index.html') ||
      (currentPath.startsWith('blog') && href.includes('blog')) ||
      (currentPath === 'resources.html' && href.includes('resources')) ||
      (currentPath === 'photos.html' && href.includes('photos'))
    ) {
      link.classList.add('active');
    }
  });

  // ── Blog category filter ────────────────────────────────────
  const catBtns  = document.querySelectorAll('.cat-btn');
  const blogCards = document.querySelectorAll('.blog-card[data-cat]');

  if (catBtns.length) {
    catBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        blogCards.forEach((card) => {
          if (filter === 'all' || card.dataset.cat === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ── Photo lightbox ─────────────────────────────────────────
  const lightbox      = document.getElementById('lightbox');
  const lightboxClose = document.querySelector('.lightbox-close');
  const photoItems    = document.querySelectorAll('.photo-item[data-caption]');

  if (lightbox) {
    photoItems.forEach((item) => {
      item.addEventListener('click', () => {
        const caption = item.dataset.caption || '';
        const sub     = item.dataset.sub || '';
        const icon    = item.dataset.icon || '🏔️';

        lightbox.querySelector('.lightbox-caption').textContent   = caption;
        lightbox.querySelector('.lightbox-sub').textContent       = sub;
        lightbox.querySelector('.lightbox-icon').textContent      = icon;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ── Scroll-based header elevation ──────────────────────────
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(0,0,0,0.6)'
        : '';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ── Animated entrance for cards ───────────────────────────
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.blog-card, .feature-card, .resource-item, .photo-item').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

}());

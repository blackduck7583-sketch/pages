(function () {
  const WECHAT_ID = 'perfectwonderful1024';

  const nav = document.getElementById('nav');
  const toast = document.getElementById('toast');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbTitle = document.getElementById('lbTitle');
  const lbDesc = document.getElementById('lbDesc');
  const scrollProgress = document.getElementById('scrollProgress');

  function showToast(msg) {
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { toast.hidden = true; }, 2800);
  }

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ── Scroll progress ── */
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
    if (scrollProgress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = h > 0 ? `${(window.scrollY / h) * 100}%` : '0%';
    }
  }, { passive: true });

  /* ── Hero title char split ── */
  function splitHeroTitle() {
    const title = document.querySelector('.hero__title');
    if (!title || prefersReducedMotion()) return;
    const accent = title.querySelector('.accent');
    const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (accent && accent.contains(node)) return;
      const text = node.textContent;
      const frag = document.createDocumentFragment();
      [...text].forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.style.setProperty('--i', i);
        span.textContent = ch === ' ' ? '\u00a0' : ch;
        frag.appendChild(span);
      });
      node.parentNode.replaceChild(frag, node);
    });
    if (accent) {
      const t = accent.textContent;
      accent.textContent = '';
      [...t].forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.style.setProperty('--i', i + 20);
        span.textContent = ch;
        accent.appendChild(span);
      });
    }
  }

  /* ── Counter animation ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.classList.contains('stat-card__num') ? '' : '+';
    if (prefersReducedMotion() || isNaN(target)) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ── Intersection observers ── */
  function observeReveal(selector, opts = {}) {
    const els = document.querySelectorAll(selector);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('is-visible');
          if (el.dataset.count !== undefined) animateCounter(el);
        }, Number(delay));
        obs.unobserve(el);
      });
    }, { threshold: opts.threshold ?? 0.12, rootMargin: opts.rootMargin ?? '0px 0px -40px 0px' });
    els.forEach((el, i) => {
      if (!el.dataset.delay) el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
      obs.observe(el);
    });
    return obs;
  }

  observeReveal('.reveal');
  observeReveal('.reveal-left');
  observeReveal('.reveal-right');
  observeReveal('.reveal-scale');

  document.querySelectorAll('.service-card').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.08}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-visible'); obs.unobserve(el); }
    }, { threshold: 0.15 });
    obs.observe(el);
  });

  document.querySelectorAll('.step').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.1}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-visible'); obs.unobserve(el); }
    }, { threshold: 0.2 });
    obs.observe(el);
  });

  document.querySelectorAll('.compare__col').forEach((el) => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-visible'); obs.unobserve(el); }
    }, { threshold: 0.2 });
    obs.observe(el);
  });

  document.querySelectorAll('.tier-card').forEach((el) => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('is-visible'); obs.unobserve(el); }
    }, { threshold: 0.15 });
    obs.observe(el);
  });

  document.querySelectorAll('.quote-flow__step').forEach((el, i) => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add('is-visible'), i * 200);
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
  });
  document.querySelectorAll('.quote-flow__line').forEach((el, i) => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add('is-visible'), i * 200 + 150);
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
  });

  /* ── Parallax hero showcase ── */
  if (!prefersReducedMotion()) {
    const showcase = document.querySelector('.hero-photo__main');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (showcase) showcase.style.transform = `scale(1.05) translateY(${y * 0.02}px)`;
    }, { passive: true });
  }

  document.querySelectorAll('.stat-card__num[data-count]').forEach((el) => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { animateCounter(el); obs.unobserve(el); }
    }, { threshold: 0.5 });
    obs.observe(el);
  });

  /* ── Gallery filter ── */
  const filter = document.getElementById('filter');
  const gallery = document.getElementById('gallery');
  if (filter && gallery) {
    filter.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter__btn');
      if (!btn) return;
      filter.querySelectorAll('.filter__btn').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cat = btn.dataset.cat;
      gallery.querySelectorAll('.card-work').forEach((card, i) => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.classList.remove('is-filtered-in', 'is-filtered-out');
        if (show) {
          card.style.display = '';
          card.style.position = '';
          card.style.visibility = '';
          setTimeout(() => {
            card.classList.add('is-filtered-in');
            card.style.animationDelay = `${i * 0.05}s`;
          }, 20);
        } else {
          card.classList.add('is-filtered-out');
          setTimeout(() => { card.style.display = 'none'; }, 400);
        }
      });
    });
    gallery.querySelectorAll('.card-work').forEach((c) => c.classList.add('is-filtered-in'));
  }

  gallery?.addEventListener('click', (e) => {
    const card = e.target.closest('.card-work');
    if (!card || card.classList.contains('is-filtered-out')) return;
    lbImg.src = card.dataset.img;
    lbImg.alt = card.dataset.title;
    lbTitle.textContent = card.dataset.title;
    lbDesc.textContent = card.dataset.desc;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  });

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }
  document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  splitHeroTitle();
  const badgeNum = document.querySelector('.hero__badge [data-count]');
  if (badgeNum) {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { animateCounter(badgeNum); obs.unobserve(badgeNum); }
    }, { threshold: 0.5 });
    obs.observe(badgeNum);
  }
})();

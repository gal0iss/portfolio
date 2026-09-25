/**
 * Pedro Parada — portfolio
 * Vanilla JS, no dependencies. Each feature is isolated in its own
 * init function so a failure in one (e.g. no IntersectionObserver
 * support) never blocks the others.
 */

/** Mobile nav: toggles the menu and keeps aria-expanded in sync. */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  const setOpen = (open) => {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => {
    setOpen(!links.classList.contains('is-open'));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

/** Highlights the nav link matching the section currently in view. */
function initScrollSpy() {
  if (!('IntersectionObserver' in window)) return;

  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/** Fades sections in as they enter the viewport (skipped for reduced motion via CSS). */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
}
function track(eventName) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName);
  }
}

function initAnalyticsTracking() {
  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => track(el.getAttribute('data-track')));
  });

  const cvPreview = document.getElementById('cv-preview-details');
  if (cvPreview) {
    cvPreview.addEventListener('toggle', () => {
      if (cvPreview.open) track('cv_preview');
    });
  }
}

initMobileNav();
initScrollSpy();
initScrollReveal();
initAnalyticsTracking();

/* ═══════════════════════════
   KHATIB365 · main.js
   ═══════════════════════════ */

// ── NAV: scroll class & mobile toggle ──
const nav        = document.getElementById('nav');
const navToggle  = document.getElementById('navToggle');
const navLinks   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  // animate bars
  const bars = navToggle.querySelectorAll('span');
  if (open) {
    bars[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    bars[1].style.opacity   = '0';
    bars[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  }
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    const bars = navToggle.querySelectorAll('span');
    bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  });
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll(
  '.hero-left, .hero-right, .about-photo-col, .about-content, ' +
  '.skills-header, .skill-card, .projects-header, ' +
  '.project-card--featured, .project-card, ' +
  '.blog-header, .blog-featured, .blog-card, ' +
  '.contact-left, .contact-form, .hero-scroll-hint'
);

reveals.forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('in'), Number(delay));
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

// stagger cards
['skill-card', 'project-card', 'blog-card'].forEach(cls => {
  document.querySelectorAll(`.${cls}`).forEach((el, i) => {
    el.dataset.delay = i * 70;
  });
});

reveals.forEach(el => revealObs.observe(el));

// ── ACTIVE NAV LINK ──
// Only highlight anchor links (#section), never external page links
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link:not(.nav-link--cta)');
const anchorLinks = [...navAnchors].filter(a => a.getAttribute('href').startsWith('#'));

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      anchorLinks.forEach(a => {
        const active = a.getAttribute('href') === `#${id}`;
        a.style.color = active ? 'var(--copper)' : '';
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => sectionObs.observe(s));

// ── NAV BRAND: scroll to top on homepage, navigate home on sub-pages ──
const navBrand = document.querySelector('.nav-brand');
if (navBrand) {
  navBrand.addEventListener('click', e => {
    const href = navBrand.getAttribute('href');
    // If it's a hash link we're on the homepage — smooth scroll to top
    if (href && href.startsWith('#')) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Otherwise let it navigate naturally (blog pages use href="../")
  });
}

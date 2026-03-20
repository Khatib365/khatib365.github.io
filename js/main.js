/* ═══════════════════════════
   KHATIB365 · main.js
   ═══════════════════════════ */

// ── NAV: scroll class & mobile toggle ──
const nav       = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  const bars = navToggle.querySelectorAll('span');
  if (open) {
    bars[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    bars[1].style.opacity   = '0';
    bars[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  }
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    navToggle.querySelectorAll('span').forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
  });
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll(
  '.hero-left, .about-photo-col, .about-content, ' +
  '.skills-header, .skill-card, ' +
  '.blog-header, .blog-featured, .blog-card, ' +
  '.contact-header, .contact-open, .hero-scroll-hint'
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

['skill-card', 'blog-card'].forEach(cls => {
  document.querySelectorAll(`.${cls}`).forEach((el, i) => { el.dataset.delay = i * 70; });
});
reveals.forEach(el => revealObs.observe(el));

// ── ACTIVE NAV LINK ──
const sections    = document.querySelectorAll('section[id]');
const navAnchors  = document.querySelectorAll('.nav-link:not(.nav-link--cta)');
const anchorLinks = [...navAnchors].filter(a => a.getAttribute('href').startsWith('#'));

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      anchorLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${e.target.id}` ? 'var(--copper)' : '';
      });
    }
  });
}, { threshold: 0.45 });
sections.forEach(s => sectionObs.observe(s));

// ── NAV BRAND ──
const navBrand = document.querySelector('.nav-brand');
if (navBrand) {
  navBrand.addEventListener('click', e => {
    const href = navBrand.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

// ════════════════════════════════════════════════
// PARTICLE NETWORK CANVAS
// ════════════════════════════════════════════════
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles, rafId;

  const TECH = [
    { label: 'Power Platform', r: 3.8 },
    { label: 'Azure',          r: 3.4 },
    { label: 'Dataverse',      r: 3.2 },
    { label: 'D365',           r: 2.8 },
    { label: 'Power Automate', r: 2.6 },
    { label: 'Copilot Studio', r: 2.6 },
    { label: 'PCF',            r: 2.2 },
    { label: 'Logic Apps',     r: 2.2 },
    { label: 'ALM',            r: 2.2 },
    { label: 'TypeScript',     r: 2.0 },
    { label: 'Azure OpenAI',   r: 2.4 },
    { label: 'Power BI',       r: 2.0 },
  ];

  const TOTAL    = 72;
  const MAX_DIST = 120;
  const SPEED    = 0.26;

  // Copper / amber colour palette for particles
  const COLORS = [
    [196, 122,  74],   // amber copper
    [212, 150,  90],   // light copper
    [  0, 120, 212],   // Azure blue
    [123,  94, 167],   // purple (Dataverse)
    [  0, 145, 178],   // teal (Azure 2)
    [ 16, 124,  16],   // green (ALM)
  ];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function randFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function makeParticle(i) {
    const tl  = i < TECH.length ? TECH[i] : null;
    const col = COLORS[i % COLORS.length];
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * SPEED,
      vy:    (Math.random() - 0.5) * SPEED,
      r:     tl ? tl.r : (Math.random() * 1.4 + 0.7),
      label: tl ? tl.label : null,
      a:     Math.random() * 0.45 + 0.2,
      glow:  tl ? 18 : 8,
      col,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: TOTAL }, (_, i) => makeParticle(i));
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      const pi = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const pj = particles[j];
        const dx = pi.x - pj.x, dy = pi.y - pj.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          // Blend colours of the two connected nodes
          const [r1, g1, b1] = pi.col;
          const [r2, g2, b2] = pj.col;
          const t = 0.5;
          const r = r1 * (1-t) + r2 * t;
          const g = g1 * (1-t) + g2 * t;
          const b = b1 * (1-t) + b2 * t;
          const alpha = (1 - d / MAX_DIST) * 0.22;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth   = 0.7;
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      // Move — wrap around edges
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -30)      p.x = W + 30;
      else if (p.x > W+30) p.x = -30;
      if (p.y < -30)      p.y = H + 30;
      else if (p.y > H+30) p.y = -30;

      const [r, g, b] = p.col;

      // Glow halo
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glow);
      grd.addColorStop(0, `rgba(${r},${g},${b},${p.a * 0.7})`);
      grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.glow, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(p.a + 0.4, 1)})`;
      ctx.fill();

      // Tech label
      if (p.label) {
        ctx.font      = '9.5px "Fira Code", monospace';
        ctx.fillStyle = `rgba(220,205,185,${p.a + 0.2})`;
        ctx.fillText(p.label, p.x + p.r + 5, p.y + 3.5);
      }
    });

    rafId = requestAnimationFrame(frame);
  }

  init();
  frame();

  // Resize observer — restart on container size change
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      init();
      frame();
    }).observe(canvas.parentElement);
  } else {
    window.addEventListener('resize', () => { cancelAnimationFrame(rafId); init(); frame(); });
  }
})();

// ════════════════════════════════════════════════
// SARCASTIC FULL-SCREEN MODAL
// ════════════════════════════════════════════════
(function initSardonicModal() {
  const modal      = document.getElementById('sardonicModal');
  if (!modal) return;

  const titleEl    = document.getElementById('sardonicTitle');
  const bodyEl     = document.getElementById('sardonicBody');
  const emojiEl    = document.getElementById('sardonicEmoji');
  const dismissBtn = document.getElementById('sardonicDismiss');
  const backdrop   = document.getElementById('sardonicBackdrop');

  const tips = [
    {
      emoji: '🙃',
      title: "You're About to Deploy Unmanaged, Aren't You.",
      body:  "It'll be fine. It won't be fine. This is a judgment-free zone — except it's not. Deploy managed, or don't deploy at all."
    },
    {
      emoji: '💀',
      title: "Bold Choice, Hardcoding That URL.",
      body:  "That connection string you just pasted directly into 23 flows? It's wrong in every environment except the laptop you're holding right now. You know what to do."
    },
    {
      emoji: '🔥',
      title: "No Security Groups on the Environment? Love That.",
      body:  "You invited everyone directly by email. No security group. Everyone is now effectively a System Administrator. The auditors will have opinions."
    },
    {
      emoji: '😭',
      title: "One Solution. Everything in It. Respect the Courage.",
      body:  "The data model, the apps, the flows, the PCF controls — all in one glorious solution. Future-you is already filing the therapy paperwork."
    },
    {
      emoji: '👀',
      title: "It Works in Dev. That's Basically Done, Right?",
      body:  "Dev passed. Test passed. Prod is a different country with different laws, different environment variables, and it has never once heard of your hardcoded service account."
    },
    {
      emoji: '😬',
      title: "Polling Every Minute? That's a Lifestyle Choice.",
      body:  "Your scheduled flow runs 1,440 times a day and finds nothing to process 1,437 of those times. Your API provider has entered the building."
    },
    {
      emoji: '🫠',
      title: "Three Publisher Prefixes. In One Org.",
      body:  "You mixed publisher prefixes across solutions that share the same tables. You have created something that cannot be undone. This is your legacy now."
    },
    {
      emoji: '🤦',
      title: "Synchronous Plugin on a 10,000 Row Import.",
      body:  "You're about to block the entire transaction thread while processing ten thousand records. The waiting room is open and they are not happy."
    },
    {
      emoji: '🚨',
      title: "No DLP Policies. Living on the Edge, I See.",
      body:  "Anyone in your org can now connect Power Automate to personal Gmail, Dropbox, and Twitter simultaneously. This is what 'minimal governance' looks like in production."
    },
    {
      emoji: '⚡',
      title: "Environment Variables Are Optional, Right?",
      body:  "The service account email is hardcoded in 47 different flows. That person just left the company. Please update your emergency contact list immediately."
    }
  ];

  const tip = tips[Math.floor(Math.random() * tips.length)];
  emojiEl.textContent = tip.emoji;
  titleEl.textContent = tip.title;
  bodyEl.textContent  = tip.body;

  function closeModal() {
    modal.classList.remove('visible');
    modal.classList.add('hiding');
    setTimeout(() => modal.classList.add('hidden'), 500);
  }

  // Wire close triggers
  dismissBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Show after short delay
  setTimeout(() => modal.classList.add('visible'), 700);
})();

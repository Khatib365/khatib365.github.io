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
// PARTICLE NETWORK CANVAS — Interactive
// ════════════════════════════════════════════════
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles, rafId;
  let mouse   = { x: -9999, y: -9999 };
  let ripples = [];

  // ── Full tech stack ──
  const TECH = [
    // Power Platform
    { label: 'Canvas Apps',     r: 3.8, cat: 'pp'   },
    { label: 'Model-Driven',    r: 3.4, cat: 'pp'   },
    { label: 'Power Automate',  r: 3.6, cat: 'pp'   },
    { label: 'Power Pages',     r: 3.0, cat: 'pp'   },
    { label: 'Power BI',        r: 3.2, cat: 'pp'   },
    { label: 'AI Builder',      r: 2.8, cat: 'pp'   },
    { label: 'Copilot Studio',  r: 3.0, cat: 'pp'   },
    { label: 'Power Fx',        r: 2.4, cat: 'pp'   },
    // Dataverse & D365
    { label: 'Dataverse',       r: 3.8, cat: 'dv'   },
    { label: 'Dynamics 365 CE', r: 3.4, cat: 'dv'   },
    { label: 'D365 F&O',        r: 3.0, cat: 'dv'   },
    { label: 'Custom APIs',     r: 2.6, cat: 'dv'   },
    { label: 'Plugins',         r: 2.4, cat: 'dv'   },
    { label: 'Business Events', r: 2.4, cat: 'dv'   },
    // Pro-code
    { label: 'PCF Controls',    r: 2.8, cat: 'code' },
    { label: 'TypeScript',      r: 2.6, cat: 'code' },
    { label: 'C#',              r: 2.4, cat: 'code' },
    { label: 'JavaScript',      r: 2.2, cat: 'code' },
    // Azure
    { label: 'Azure Functions', r: 3.4, cat: 'az'   },
    { label: 'Logic Apps',      r: 3.0, cat: 'az'   },
    { label: 'API Management',  r: 2.8, cat: 'az'   },
    { label: 'Service Bus',     r: 2.6, cat: 'az'   },
    { label: 'Azure OpenAI',    r: 3.2, cat: 'az'   },
    { label: 'Key Vault',       r: 2.4, cat: 'az'   },
    { label: 'App Insights',    r: 2.4, cat: 'az'   },
    { label: 'Entra ID',        r: 2.6, cat: 'az'   },
    // ALM & DevOps
    { label: 'Azure DevOps',    r: 3.0, cat: 'alm'  },
    { label: 'ALM',             r: 2.6, cat: 'alm'  },
    { label: 'Pipelines',       r: 2.4, cat: 'alm'  },
  ];

  const CAT_COLORS = {
    pp:   [  0, 120, 212],  // Power Platform blue
    dv:   [123,  94, 167],  // Dataverse purple
    az:   [  0, 145, 178],  // Azure teal
    code: [196, 122,  74],  // Copper
    alm:  [ 16, 124,  16],  // DevOps green
  };

  const TOTAL             = 58;
  const MAX_DIST          = 130;
  const BASE_SPEED        = 0.28;
  const ATTRACT_DIST      = 190;
  const ATTRACT_FORCE     = 0.013;
  const MAX_SPEED         = 3.0;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeParticle(i) {
    const tl  = i < TECH.length ? TECH[i] : null;
    const cat = tl ? tl.cat : Object.keys(CAT_COLORS)[i % 5];
    const col = CAT_COLORS[cat];
    return {
      x:       Math.random() * W,
      y:       Math.random() * H,
      vx:      (Math.random() - 0.5) * BASE_SPEED,
      vy:      (Math.random() - 0.5) * BASE_SPEED,
      r:       tl ? tl.r : (Math.random() * 1.2 + 0.6),
      label:   tl ? tl.label : null,
      a:       Math.random() * 0.35 + 0.25,
      glow:    tl ? 20 : 7,
      col,
      pulse:   0,
      hovered: false,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: TOTAL }, (_, i) => makeParticle(i));
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);

    // Ripple rings from clicks
    ripples = ripples.filter(rp => rp.a > 0);
    ripples.forEach(rp => {
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(196,122,74,${rp.a})`;
      ctx.lineWidth   = 1.5;
      ctx.stroke();
      rp.r += 4;
      rp.a -= 0.022;
    });

    // Find closest labeled particle to mouse (for hover)
    let hoveredParticle = null;
    let minDist = 44;
    particles.forEach(p => {
      if (!p.label) return;
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < minDist) { minDist = d; hoveredParticle = p; }
    });
    particles.forEach(p => { p.hovered = (p === hoveredParticle); });

    // Connection lines — brighten near cursor
    for (let i = 0; i < particles.length; i++) {
      const pi = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const pj  = particles[j];
        const dx  = pi.x - pj.x, dy = pi.y - pj.y;
        const d   = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const [r1, g1, b1] = pi.col;
          const [r2, g2, b2] = pj.col;
          const r = (r1 + r2) / 2, g = (g1 + g2) / 2, b = (b1 + b2) / 2;
          const base  = (1 - d / MAX_DIST) * 0.22;
          const mdx   = (pi.x + pj.x) / 2 - mouse.x;
          const mdy   = (pi.y + pj.y) / 2 - mouse.y;
          const md    = Math.sqrt(mdx * mdx + mdy * mdy);
          const boost = md < 110 ? (1 - md / 110) * 0.45 : 0;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${r},${g},${b},${base + boost})`;
          ctx.lineWidth   = 0.7;
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.stroke();
        }
      }
    }

    // Particles
    particles.forEach(p => {
      // Mouse attraction
      const dxm = mouse.x - p.x, dym = mouse.y - p.y;
      const dm  = Math.sqrt(dxm * dxm + dym * dym);
      if (dm < ATTRACT_DIST && dm > 1) {
        p.vx += (dxm / dm) * ATTRACT_FORCE;
        p.vy += (dym / dm) * ATTRACT_FORCE;
      }

      // Speed cap
      const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (spd > MAX_SPEED) { p.vx *= MAX_SPEED / spd; p.vy *= MAX_SPEED / spd; }

      // Gentle damping when mouse is away
      if (dm > ATTRACT_DIST) { p.vx *= 0.995; p.vy *= 0.995; }

      // Move — wrap edges
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -30) p.x = W + 30;
      else if (p.x > W + 30) p.x = -30;
      if (p.y < -30) p.y = H + 30;
      else if (p.y > H + 30) p.y = -30;

      const [r, g, b] = p.col;
      const isHov = p.hovered;

      // Pulse on hover
      if (isHov) p.pulse += 0.09;
      else if (p.pulse > 0) p.pulse = Math.max(0, p.pulse - 0.06);

      const scale   = isHov ? 1 + Math.sin(p.pulse) * 0.45 : 1;
      const drawR   = p.r * scale;
      const drawGlow = p.glow * (isHov ? 2.2 : 1);
      const alpha   = isHov ? Math.min(p.a + 0.55, 1) : p.a;

      // Glow halo
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, drawGlow);
      grd.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.85})`);
      grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, drawGlow, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, drawR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(alpha + 0.4, 1)})`;
      ctx.fill();

      // Label
      if (p.label) {
        const fontSize   = isHov ? 11 : 9.5;
        const labelAlpha = isHov ? 1 : (p.a + 0.1);
        ctx.font      = `${isHov ? '500 ' : ''}${fontSize}px "Fira Code", monospace`;
        ctx.fillStyle = `rgba(220,205,185,${labelAlpha})`;
        ctx.fillText(p.label, p.x + drawR + 5, p.y + 3.5);
      }
    });

    rafId = requestAnimationFrame(frame);
  }

  // ── Mouse events ──
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  // Click → repulsion burst + ripple rings
  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    particles.forEach(p => {
      const dx = p.x - cx, dy = p.y - cy;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 170 && d > 0) {
        const force = ((170 - d) / 170) * 2.8;
        p.vx += (dx / d) * force;
        p.vy += (dy / d) * force;
      }
    });

    // Two staggered ripple rings
    ripples.push({ x: cx, y: cy, r: 4, a: 0.85 });
    setTimeout(() => ripples.push({ x: cx, y: cy, r: 4, a: 0.5 }), 120);
  });

  canvas.style.cursor = 'crosshair';

  init();
  frame();

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => { cancelAnimationFrame(rafId); init(); frame(); }).observe(canvas.parentElement);
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
    "🎰 Built your entire app in the Default environment? Bold strategy. Everyone in your tenant can now see it. Congratulations on the world's most public POC.",
    "📛 org8372649.crm4.dynamics.com is not a URL. It's a cry for help. Set your org URL at creation time. It cannot be changed later. You've been warned. Twice.",
    "🔐 No security group on your environment means every licensed user in the tenant can walk in. It's not an environment, it's a public park.",
    "☑️ Skipped the Enable Dynamics 365 Apps toggle because you're 'just building a Canvas App'? The client will ask for D365 Sales in 3... 2... 1...",
    "🧱 A solution named 'Default Solution' is not a solution. It's a red flag with a publisher prefix nobody set.",
    "🚢 Shipping directly to Production because 'it's just a small change'? Bold. Unhinged. Deeply relatable. Still wrong.",
    "💡 Power Automate is not a database. Stop storing state in flow variables across runs. Dataverse exists. Use it.",
    "🧨 'It works in my Dev environment' is the Power Platform equivalent of 'it works on my machine.' Managed solutions exist for a reason.",
    "📦 One solution for everything is not an architecture. It's a time bomb with a version number.",
    "🔄 Triggering a flow on every record update without a change detection condition is not automation. It's a cloud bill waiting to happen.",
    "👤 Using a personal account as your service account is completely fine — until that person leaves and 47 flows die overnight.",
    "🏷️ 'New_field' is a field name. 'khatib_EnvironmentSetupStatus' is an architecture decision. Naming conventions aren't optional.",
    "🔁 Copy-pasting the same 15 actions across 8 flows instead of building a child flow is not efficiency. It's technical debt in bulk.",
    "🧪 Testing in Production because 'UAT takes too long to set up' is the bravest thing you can do with someone else's data.",
    "📊 Power BI connected directly to Dataverse with no aggregation layer and 50 users refreshing simultaneously. The environment will remember this.",
    "🔑 Hardcoding your client secret in a flow is not a secret anymore. Azure Key Vault is free. Embarrassment is not.",
    "🌍 'We'll set up environments properly later' is developer speak for: we will migrate everything manually at 11pm before go-live.",
    "📱 Canvas App with 47 screens, 200 variables, and zero components. It runs fine. On the device it was built on. Exclusively.",
    "🎭 Model-Driven App with 12 custom pages and no sitemap structure. Navigation is just a suggestion at this point.",
    "⚡ 'Let's just use the Common Data Service connector' — it's been deprecated. It was deprecated when you typed that. Dataverse connector. Always.",
    "🏗️ Publisher prefix set to 'new_' means you accepted every default. Future you is already disappointed.",
    "🔃 Synchronous plugin that calls an external API. In a transaction. On the Create of Account. Audacious. Incredibly audacious.",
    "📧 Power Automate flow that sends an email on every Dataverse record change with no filter. Your users will enjoy the 3,000 emails per day.",
    "🗄️ Storing files as base64 strings in a text column because SharePoint integration 'was complicated.' The column limit says hi.",
    "🎯 DLP policy that blocks everything except the connectors you needed last year. Your new project is not impressed.",
    "🧩 PCF control built as a solution component in the Default solution. ALM will find you eventually.",
    "🔌 Logic App using a service account instead of Managed Identity. One password rotation away from a 2am incident.",
    "🌐 'We don't need ALM, it's just an internal tool.' Famous last words, spoken approximately 4 weeks before a production incident.",
    "📋 Business rule with 14 conditions and 3 nested ifs. Works perfectly. Nobody can explain why. Nobody will touch it.",
    "🎪 Canvas App shared with 'Everyone' in the organization because setting up security groups 'takes too long.' Compliance says hi.",
    "🔧 Custom connector with no error handling because 'the API never fails.' The API has already failed. It failed while you typed that.",
    "📐 No environment variables. Connection references hardcoded to Dev. Deployment to UAT will be a spiritual experience.",
    "🧵 Power Automate flow with 200 actions in a single flow because child flows are 'complicated.' Azure timeout is on its way.",
    "🗺️ No sitemap customization on the Model-Driven App means users get every table ever created. It's less an app, more a museum.",
    "💾 'We'll document it later.' Chapter one of every post-mortem ever written.",
    "🧮 Calculated column doing real-time aggregation across 500k records. The environment is fine. It's fine. Look away.",
    "🔒 Giving everyone System Administrator role 'temporarily.' Temporarily has been running for 14 months.",
    "📡 Webhook with no retry logic and no dead-letter handling. Your integration works — until it doesn't, silently, at 2am.",
    "🎲 Environment without Managed Environments enabled but you're using pipelines. Microsoft will enable it for you. Surprise.",
    "🛸 'We'll refactor it after go-live.' Statistically, this has never happened. Not once. In the history of software.",
    "🧯 Hotfix applied directly in Production at midnight. No documentation. No PR. No tests. Fully deployed. Probably fine.",
    "🔂 Importing an unmanaged solution into Production. The environment will accept it. It just loses all respect for you.",
    "🧲 Business process flow with 9 stages and no stage-gating. Users will click through all of them in 4 seconds. Guaranteed.",
    "🌀 Circular reference in Power Automate with a 1-second delay added to 'prevent' it from looping. It's looping.",
    "🏛️ 'Let's not use source control, it's just one developer.' One developer who will leave in 3 months with no handover.",
    "🎸 Plugin registered on PostOperation Synchronous that queries 50,000 records. The platform would like a word.",
    "🗝️ Admin credentials shared in a group chat 'just this once.' Security auditors screenshot group chats too.",
    "🌋 Canvas App with OnStart loading 8 collections simultaneously. The loading screen is not a bug. It's loading. Still loading. Still loading.",
    "🧬 'We'll use one environment for both Dev and Test to save capacity.' This is how environments get reset. Ask me how I know.",
    "🏆 If you made it to tip 50, you've either done all of these or inherited a project where someone else did. Either way — welcome. You're in the right place."
  ];

  const tip = tips[Math.floor(Math.random() * tips.length)];
  const m = tip.match(/^(\S+)\s+(.+)$/s);
  const [, emoji, rest] = m || ['', '⚡', tip];
  const sentM = rest.match(/^([^.?!]+[.?!])\s*(.*)/s);
  emojiEl.textContent = emoji;
  titleEl.textContent = sentM ? sentM[1] : rest;
  bodyEl.textContent  = sentM ? sentM[2].trim() : '';

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

// ════════════════════════════════════════════════
// ENVIRONMENT HEALTH CHECK EASTER EGG
// ════════════════════════════════════════════════
(function initHealthModal() {
  const modal      = document.getElementById('health-modal');
  if (!modal) return;
  const findingsEl = document.getElementById('health-findings');
  const footerEl   = document.getElementById('health-footer');
  const statusEl   = document.getElementById('health-status');

  const findings = [
    { icon: '❌', text: 'Default environment in active use' },
    { icon: '❌', text: 'org7382847.crm4.dynamics.com detected in production' },
    { icon: '❌', text: "Service account tied to a real person's email" },
    { icon: '❌', text: 'Unmanaged solution imported to Production' },
    { icon: '❌', text: '47 flows running without error handling' },
    { icon: '⚠️',  text: 'Publisher prefix: new_' },
    { icon: '⚠️',  text: 'Documentation last updated: never' },
    { icon: '✅',  text: "At least you're reading this blog" }
  ];

  function openHealthModal() {
    findingsEl.innerHTML = '';
    footerEl.style.display = 'none';
    statusEl.textContent = 'Scanning your tenant...';
    modal.style.display = 'flex';
    findings.forEach((f, i) => {
      setTimeout(() => {
        const li = document.createElement('li');
        li.className = 'health-finding';
        li.innerHTML = `<span class="health-finding-icon">${f.icon}</span><span>${f.text}</span>`;
        findingsEl.appendChild(li);
        if (i === findings.length - 1) {
          setTimeout(() => {
            statusEl.textContent = 'Scan complete.';
            footerEl.style.display = 'block';
          }, 300);
        }
      }, i * 400);
    });
  }

  window.closeHealthModal = function() { modal.style.display = 'none'; };
  modal.addEventListener('click', e => { if (e.target === modal) window.closeHealthModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'flex') window.closeHealthModal();
  });

  // Triple-click Easter egg on nav brand
  const navBrand = document.getElementById('navBrand');
  if (!navBrand) return;
  let clickCount = 0, clickTimer = null;
  navBrand.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 1) clickTimer = setTimeout(() => { clickCount = 0; }, 1500);
    if (clickCount >= 3) {
      clearTimeout(clickTimer);
      clickCount = 0;
      openHealthModal();
    }
  });
})();

// ════════════════════════════════════════════════
// FOOTER — COMMIT MESSAGE + UPTIME
// ════════════════════════════════════════════════
(function initFooterEggs() {
  const commits = [
    "fix: fixed the fix that fixed the previous fix",
    "hotfix: please work",
    "temp: do not push to prod (pushing to prod)",
    "chore: removed todo comments (left the todos)",
    "refactor: same code, more confidence",
    "fix: it works now (reason unknown)",
    "wip: not wip anymore, shipping anyway",
    "feat: added feature client didn't ask for but definitely needs",
    "hotfix: prod is fine, this is fine, everything is fine",
    "fix: reverted the revert of the revert",
    "style: moved semicolon 1px to the right",
    "docs: added comment explaining what the code does (incorrectly)",
    "fix: null check (too late)",
    "feat: environment variables (they were hardcoded until today)",
    "deploy: fingers crossed",
    "fix: works on my machine (adding my machine to prod)",
    "chore: deleted unused code (it will be needed next week)",
    "feat: error handling (catching and ignoring)",
    "fix: race condition by adding setTimeout 1000",
    "hotfix: unrelated change that somehow fixes everything"
  ];

  const msgEl = document.getElementById('footer-commit-msg');
  if (msgEl) msgEl.textContent = commits[Math.floor(Math.random() * commits.length)];

  const uptimeEl = document.getElementById('status-uptime');
  if (uptimeEl) uptimeEl.textContent =
    'Khatib365 up for ' +
    Math.floor((Date.now() - new Date('2026-03-01').getTime()) / 86400000) + ' days';
})();

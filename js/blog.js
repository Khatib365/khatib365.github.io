/* ═══════════════════════════
   KHATIB365 · blog.js
   ═══════════════════════════ */

// ── READING PROGRESS BAR ──
const progressBar = document.getElementById('readingProgress');
const article = document.getElementById('postArticle');

function updateProgress() {
  if (!progressBar || !article) return;
  const articleTop    = article.offsetTop;
  const articleHeight = article.offsetHeight;
  const windowHeight  = window.innerHeight;
  const scrolled      = window.scrollY;
  const start         = articleTop;
  const end           = articleTop + articleHeight - windowHeight;
  const pct           = Math.min(100, Math.max(0, ((scrolled - start) / (end - start)) * 100));
  progressBar.style.width = pct + '%';
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ── TOC ACTIVE HIGHLIGHT ──
const tocLinks = document.querySelectorAll('.toc-link');
const headings = document.querySelectorAll('.post-article h2[id]');

function updateTOC() {
  let current = '';
  headings.forEach(h => {
    if (window.scrollY >= h.offsetTop - 120) current = h.id;
  });
  tocLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', active);
  });
}

window.addEventListener('scroll', updateTOC, { passive: true });
updateTOC();

// ── COPY CODE BUTTONS ──
function copyCode(btn) {
  const block = btn.closest('.code-block');
  const code  = block.querySelector('pre code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    const orig = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.color = '#9c5a2e';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.color = '';
    }, 2000);
  });
}

// ── SHARE LINKS ──
document.querySelectorAll('.share-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const text = link.textContent.trim();
    const url  = window.location.href;
    const title = document.title;

    if (text === 'Copy link') {
      navigator.clipboard.writeText(url).then(() => {
        const orig = link.textContent;
        link.textContent = 'Copied!';
        setTimeout(() => link.textContent = orig, 2000);
      });
    } else if (text === 'LinkedIn') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (text === 'Twitter / X') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    }
  });
});

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.offsetTop - 90;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

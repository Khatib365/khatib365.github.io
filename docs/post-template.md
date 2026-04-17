# Blog Post Template — Khatib365

**Reference implementation**: `blog/post01-environment-strategy.html` — read it in full before writing any new post.

---

## Required `<head>` Tags

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="One sentence. What the post covers and why it matters." />
<title>Post Title — Subtitle | Khatib365</title>
<link rel="icon" type="image/svg+xml" href="../assets/favicon.svg" />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
<style>
  /* Full CSS inline here — copy :root block from post01, then add post-specific rules */
</style>
```

---

## Page Structure (in order)

```
<nav>          → Sticky site nav
<breadcrumb>   → Home / Writing / Post XX — Title
<hero>         → Series tag + post title + tagline + author meta
<layout>       → Sidebar TOC (desktop) + article body (mobile: TOC inline above article)
<post-footer>  → Author block (photo + name + bio)
<disclaimer>   → Standard disclaimer text
```

### 1. Nav

Sticky, fixed to top. Logo left, links right. Identical across every page.

```html
<nav class="site-nav">
  <a href="/index.html" class="site-nav-brand">Khatib<span>365</span></a>
  <div class="site-nav-links">
    <a href="/index.html" class="site-nav-link">Home</a>
    <a href="/blog/index.html" class="site-nav-link active">Writing</a>
    <a href="/index.html#about" class="site-nav-link">About</a>
  </div>
</nav>
```

### 2. Breadcrumb

```html
<div class="post-breadcrumb">
  <a href="/index.html">Home</a>
  <span class="bc-sep">/</span>
  <a href="/blog/index.html">Writing</a>
  <span class="bc-sep">/</span>
  <span>Post XX — Title</span>
</div>
```

### 3. Hero

```html
<div class="page">
  <header class="blog-header">
    <span class="series-tag">Power Platform Deployment · Post XX</span>
    <h1 class="blog-title">Post Title</h1>
    <p class="blog-subtitle">Tagline — one sentence that earns the read.</p>
    <div class="meta">
      <img src="/assets/photo.jpg" alt="Ahmed El-Khatib" style="width:36px;height:36px;border-radius:50%;object-fit:cover;">
      <span class="meta-item">Ahmed El-Khatib</span>
      <span class="meta-dot"></span>
      <span class="meta-item">MONTH YEAR</span>
      <span class="meta-dot"></span>
      <span class="meta-item">X MIN READ</span>
    </div>
  </header>
```

**Read time formula**: word count ÷ 200, rounded to nearest whole minute.
**Date format**: `March 2026` — never abbreviate.

### 4. Layout — Sidebar TOC + Article

```html
  <div class="content-layout">
    <aside class="toc-sidebar">
      <div class="toc-inner">
        <div class="toc-label">In this post</div>
        <nav class="toc-nav">
          <a href="#section-01" class="toc-link">§ 01 — Section Title</a>
          <!-- one link per § section -->
        </nav>
      </div>
    </aside>
    <article class="post-body">
      <!-- Section content here -->
    </article>
  </div>
```

- Desktop: TOC is sticky sidebar to the left of article
- Mobile: TOC collapses inline above the article body

### 5. Sections

```html
<section id="section-01">
  <div class="divider"><div class="divider-line"></div><span class="divider-mark">§ 01</span><div class="divider-line"></div></div>
  <h2>§ 01 — Section Title</h2>
  <p>Body text...</p>
  <!-- h3 for subsections, callout boxes, decision tables, figures as needed -->
</section>
```

**Section numbering**: `§ 01`, `§ 02`, etc. — always zero-padded, always the `§` symbol.
**Subsections**: use `<h3>` — styled in uppercase Jost with copper color.

### 6. Post Footer (Author Block)

```html
<div class="author-block">
  <img src="/assets/photo.jpg" alt="Ahmed El-Khatib" style="width:56px;height:56px;border-radius:50%;object-fit:cover;flex-shrink:0;">
  <div>
    <div class="author-name">Ahmed El-Khatib</div>
    <div class="author-title">Power Platform Architect</div>
    <p class="author-bio">One-line bio relevant to the series.</p>
  </div>
</div>
```

### 7. Disclaimer

Verbatim — do not paraphrase:

```html
<div class="post-disclaimer">
  Everything in this post reflects my own experience and opinions. Not my employer's, not Microsoft's — mine.
</div>
```

---

## Component Reference

| Component | Class | Notes |
|-----------|-------|-------|
| Callout (default) | `.callout` | Left copper border, copper-pal background |
| Callout (warning) | `.callout.warn` | Left amber border, warn-bg background |
| Callout (success) | `.callout.ok` | Left green border, ok-bg background |
| Mistake card | `.mistake-card` | Used for Mr. YOLO scenarios |
| Decision table | `.decision-table` | Env comparison tables |
| Section divider | `.divider` | Between every `§` section |
| Inline code | `<code>` | code-bg / code-fg colors |

---

## Conventions

- **Client names**: never use real names — use `contoso`, `contoso-dev`, `contoso-uat`, `contoso-prod`
- **Internal links**: absolute from root — `/blog/post01-environment-strategy.html` not `../post01.html`
- **Future posts**: do not create dead links — render as plain text with a "coming soon" label
- **Images**: see `docs/visual-identity.md` for figure/figcaption rules
- **Mr. YOLO**: every post has one Mr. YOLO mistake — see `docs/series-roadmap.md`

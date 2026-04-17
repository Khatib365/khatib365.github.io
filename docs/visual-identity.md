# Visual Identity — Khatib365

**Source of truth**: `blog/post01-environment-strategy.html` — always read that file before writing a new page. All values below were pulled directly from its `:root` block.

---

## Fonts

| Role | Family | Usage |
|------|--------|-------|
| Display / headings | Cormorant Garamond | `h1`, `h2`, blog titles, series tags, nav brand |
| Body | Jost | All body text, labels, nav links |
| Code / mono | Fira Code | Inline code, breadcrumbs, meta lines, callout labels |

Google Fonts load string:
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap
```

> **Note**: CLAUDE.md previously listed JetBrains Mono — that is wrong. Fira Code is what the site uses.

---

## Color Tokens

These are the exact CSS custom properties from `post01-environment-strategy.html`:

```css
:root {
  --bg:          #FAF7F1;   /* parchment page background */
  --surface:     #F4EFE6;   /* card / raised surface */
  --surface2:    #ECE4D5;   /* deeper surface (code blocks, tags) */
  --border:      #E0D5C4;   /* primary border */
  --border2:     #D4C8B4;   /* stronger border / dividers */
  --copper:      #9C5A2E;   /* primary accent — links, tags, highlights */
  --copper-l:    #C47A4A;   /* lighter copper — hover states */
  --copper-pal:  #F5EBE0;   /* copper wash — callout backgrounds */
  --ink:         #1C1812;   /* primary text */
  --ink-soft:    #453D31;   /* body text paragraphs */
  --ink-mid:     #7A6F60;   /* secondary / meta text */
  --ink-light:   #B5A99A;   /* muted text, figure captions */
  --code-bg:     #EDE5D8;   /* inline code background */
  --code-fg:     #7A3E10;   /* inline code foreground */
  --warn-bg:     #FDF3E8;   /* warning callout background */
  --warn-border: #E8B87A;   /* warning callout border */
  --ok-bg:       #EEF5EE;   /* success/ok callout background */
  --ok-border:   #8AB88A;   /* success/ok callout border */
}
```

> There is **no gold token** in the live site. CLAUDE.md previously listed `#C9A84C` — ignore that.
> There is **no `--ink-faint`** variable — use `--ink-light` for muted/caption text.

---

## Tone

- **Craftsman**: precise, deliberate, built to last
- **Warm but authoritative**: Ahmed knows this domain — not showing off, just clear
- **Editorial without being academic**: no jargon walls, no fluffy intros
- Every new page must be visually indistinguishable from post01. Match spacing, typography, nav, breadcrumb, footer — exactly.

---

## CSS Rules

- Use CSS custom properties for every color — never hardcode hex values in new rules
- Mobile-first. Mental test at 375px, 768px, 1280px
- No `!important` unless overriding a third-party style
- Class names are kebab-case and descriptive: `.post-meta`, `.series-table-wrap` — not `.div1`, `.red`
- Blog posts embed styles in an inline `<style>` block in `<head>` — there is no shared blog stylesheet to link
- The homepage (`index.html`) links to `/css/style.css` and `/css/blog.css`

---

## Image Styling

Every image in a blog post must be wrapped in a `<figure>`:

```html
<figure class="post-figure post-figure--screenshot">
  <img
    src="/assets/screenshots/postXX/image-name.png"
    alt="Descriptive alt text"
    class="post-screenshot"
    loading="lazy"
  />
  <figcaption class="figure-caption">Caption text here.</figcaption>
</figure>
```

### Caption style
- `font-size: 0.82rem` (approximately 11.5px at base 14px)
- `color: var(--ink-light)`
- `font-style: italic`
- `text-align: center` (or left-aligned with monospace — match post01 exactly)
- Font: Fira Code monospace

### Image rules
- `width: 100%`, `display: block`, `border-radius: 8px`
- `border: 0.5px solid var(--border)` — always, but especially required for images with dark/navy backgrounds so they don't bleed into the parchment page

### CSS classes (from post01)
```css
.post-figure { margin: 2rem 0; overflow-x: auto; }
.post-figure--screenshot { margin: 1.5rem 0; }
.post-screenshot { width: 100%; border-radius: 8px; border: 0.5px solid var(--border); display: block; }
.figure-caption { font-family: 'Fira Code', monospace; font-size: 11.5px; color: var(--ink-light); letter-spacing: .04em; margin-top: 10px; }
```

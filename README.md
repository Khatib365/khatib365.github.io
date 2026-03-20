# Khatib365 — Ahmed El-Khatib Portfolio

Personal portfolio and blog. Built with pure HTML/CSS/JS. Zero dependencies.

---

## 🚀 Deploy to GitHub Pages (5 minutes)

### Option A — Clean URL (`khatib365.github.io`)
1. Create a repo named exactly `<yourusername>.github.io`
2. Upload all files to the repo root
3. Go to **Settings → Pages → Source → GitHub Actions**
4. Push to `main` — auto-deploys via the included workflow

### Option B — Subdirectory URL
1. Create any repo (e.g. `portfolio`)
2. Same steps as above
3. Your URL will be `https://<username>.github.io/portfolio`

---

## 🖼 Adding Your Photo

In `index.html`, find the `photo-placeholder` div inside `.about-photo-col` and replace it:

```html
<!-- Remove this: -->
<div class="photo-placeholder">
  <div class="photo-initials">AEK</div>
  <p class="photo-hint code">Replace with your photo</p>
</div>

<!-- Add this: -->
<img src="assets/photo.jpg" alt="Ahmed El-Khatib" />
```

Then add your photo as `assets/photo.jpg` (recommended: 600×800px, portrait).

---

## ✏️ Customising Content

| What | Where in index.html |
|---|---|
| Name & tagline | Hero section |
| Bio text | About section |
| LinkedIn / GitHub / email | About links + Contact channels |
| Certifications | `.hero-badges` |
| Skills | Skills section — `.skill-card` blocks |
| Projects | Projects section — `.project-card` blocks |
| Blog posts | Blog section — `.blog-card` blocks |

---

## 🎨 Changing Colors

Open `css/style.css` and edit the `:root` variables at the top:

```css
--copper:      #9c5a2e;  /* Main accent — change this to rebrand */
--parchment:   #f4efe6;  /* Background surfaces */
--canvas:      #faf7f1;  /* Page background */
--ink:         #1c1812;  /* Primary text */
```

---

## 📝 Adding Blog Posts

Copy any `.blog-card` block and update the content. To feature a post, use the `.blog-featured` structure.

---

## 📦 Structure

```
khatib365/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/           ← Add your photo here
│   └── photo.jpg
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## 🌐 Custom Domain

To use `khatib365.dev` or similar:
1. Add a `CNAME` file to the repo root containing just your domain: `khatib365.dev`
2. Configure DNS with your registrar (A records pointing to GitHub Pages IPs, or CNAME)
3. In repo Settings → Pages, set your custom domain

GitHub Pages IP addresses: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

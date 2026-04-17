# Series Roadmap — Power Platform Deployment Series

---

## The Series

Every post on Khatib365 is part of this series. The series teaches Power Platform deployment discipline from zero, following the journey of Mr. YOLO and fixing his mistakes one post at a time.

| Post | Slug | Title | Status |
|------|------|-------|--------|
| 00 | `post00-mr-yolo.html` | Meet Mr. YOLO — series intro | ✅ Live |
| 01 | `post01-environment-strategy.html` | Environment Strategy | ✅ Live |
| 02 | `post02-dlp-policies.html` | DLP Policies | Coming soon |
| 03 | `post03-solutions-101.html` | Solutions 101 — Managed, Unmanaged, Publishers & Naming | Coming soon |
| 04 | `post04-solution-architecture.html` | Solution Architecture & Segmentation | Coming soon |
| 05 | `post05-alm-foundations.html` | ALM Foundations | Coming soon |
| 06 | `post06-deployment-methods.html` | Deployment Methods — The Decision Guide | Coming soon |
| 07 | `post07-pp-pipelines.html` | Pipelines Deep-Dive: Power Platform Pipelines | Coming soon |
| 08 | `post08-azure-devops.html` | Pipelines Deep-Dive: Azure DevOps & Build Tools | Coming soon |
| 09 | `post09-github-actions.html` | Pipelines Deep-Dive: GitHub Actions | Coming soon |
| 10 | `post10-alm-accelerator.html` | Pipelines Deep-Dive: ALM Accelerator | Coming soon |
| 11 | `post11-solution-packager.html` | Pipelines Deep-Dive: Solution Packager & CLI | Coming soon |
| 12 | `post12-env-variables.html` | Environment Variables & Connection References | Coming soon |
| ★  | `post-bonus-solution-xml.html` | Bonus — Solution XML Anatomy | Coming soon |

---

## Linking Rules

### Linking to existing posts
Use paths relative to `/blog/` — e.g., from within a blog post:
```html
<a href="/blog/post01-environment-strategy.html">Post 01 — Environment Strategy</a>
```

### Linking to future (unwritten) posts
**Never create a dead `<a href="">` link.** Render as plain text with a coming-soon tag:
```html
Post 02 — DLP Policies <span class="coming-soon">coming soon</span>
```

The `.coming-soon` class should be styled in Fira Code, small, muted — matching the site's meta style.

### Series navigation (post footer)
Each post links to the previous and next post in the series. If the next post doesn't exist yet, render the next-post slot as plain text only — no link.

---

## Mr. YOLO — Character Reference

Mr. YOLO is the recurring anti-hero of the series. He appears in every post making exactly the mistake that the post then teaches you to avoid.

### Who he is
- He is **not a villain**. He is a mirror.
- He is fast, creative, and well-intentioned — just undisciplined.
- His mistakes are recognizable, not cartoonish. Every reader has been Mr. YOLO at some point.
- He gets things done. The problem is what he leaves behind.

### Voice and tone
- Warm, slightly self-deprecating humor — never condescending
- Write him with affection, not contempt
- His internal monologue is confident: "5 minutes. Easy." — then it isn't.
- The reader is meant to laugh and wince at the same time

### Structure rule
Every post has exactly **one Mr. YOLO mistake** — the thing he does that the post then fixes. Introduce the mistake early (usually § 01), fix it through the body of the post.

### Visual description (for image prompts / illustrations)
- Black hair, sunglasses pushed up on his head
- Wearing a hoodie with "YOLO" text
- Semi-realistic comic style
- Dark navy background (images will need `1px solid var(--border)` to separate from parchment)
- Expression: confident, slightly oblivious, mid-action
- He is always *doing* something — not posing

### Image files
```
/assets/screenshots/post00/yolo-character-card.png   → character intro card
/assets/screenshots/post00/yolo-story-begins.png     → 4:44 PM → 4:53 PM scene
/assets/screenshots/post00/yolo-three-pillars.png    → three pillars graphic
```

Post-specific Mr. YOLO images go in `/assets/screenshots/postXX/` following kebab-case naming.

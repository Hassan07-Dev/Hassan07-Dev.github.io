# Hassan Mansoor — Developer Portfolio

Static portfolio site: plain **HTML, CSS and JavaScript**. No framework, no build step, and nothing to install.
Dark "terminal" theme, mobile-first, accessible, with a case-study page for each featured project.

```
index.html                  Home page: hero, about, skills, projects, open source*, writing*, experience, contact
projects/<slug>.html        Case-study pages (generated, see below)
assets/js/data.js           ← ALL CONTENT LIVES HERE
assets/js/components.js     Reusable render components
assets/js/main.js           Page bootstrapping + behavior (nav, typing, reveal, form)
assets/css/styles.css       Design tokens + all styles
assets/img/                 Photo, favicon (add project screenshots here)
assets/Hassan-Mansoor-Resume.pdf
tools/build-case-pages.js   Generates projects/*.html + sitemap.xml from data.js
tools/serve.js              Zero-dependency local server
```
\* Hidden until you add data (see below).

## Run locally

```bash
node tools/serve.js
```
Open http://localhost:5173. Opening `index.html` directly in a browser also works.

## Customizing content

Edit **`assets/js/data.js`**. Every section renders from it:

| Key | What it controls |
|---|---|
| `site` | name, email, resume path, `url` (your deployed domain), `formEndpoint`, response-time copy |
| `social` | `github` username (also turns on the **Open Source** section), LinkedIn, X/Twitter. Empty = hidden |
| `roles` | Phrases cycled by the hero typing effect |
| `about` | Summary, fun fact, stats, stack-layer visual |
| `skills` | Icon grid. `icon` is a [devicon](https://devicon.dev) path like `"laravel/laravel-original"`; `null` shows a text badge |
| `projects` | Featured cards + full case-study content |
| `moreProjects` | Compact "More work" list |
| `experience`, `education`, `certifications`, `awards` | Timeline and credential cards |
| `openSource.contributions` | Notable PRs and repos (shown when `social.github` is set) |
| `articles` | Blog cards (the **Writing** section appears once this has entries) |

### Adding a project / case study
1. Add an object to `projects` in `data.js` (copy an existing one; `slug` becomes the URL).
2. Run `node tools/build-case-pages.js`. It writes `projects/<slug>.html` with per-page `<title>`, description, canonical and Open Graph tags, and refreshes `sitemap.xml`.
3. Re-run step 2 whenever you change a project's `title` or `summary` (they're baked into the page meta).

## Implementation notes

**Components** (`components.js`). Each component is a pure function: data in, HTML string out:
`SocialLinks`, `About`, `SkillsCloud`, `ProjectGrid` → `ProjectCard`, `MoreProjects`, `OpenSource`, `Articles`,
`ExperienceTimeline`, `Credentials`, `ContactCTA`, `CaseStudy`, `CaseStudyPreview` (prev/next links).
All interpolated text goes through `esc()`. Porting to React, Next.js or Astro is mostly mechanical: each function becomes a component, and `data.js` becomes a typed module.

**Motion effects** (`main.js`, no libraries, built on the browser's Web Animations API; all switched off under `prefers-reduced-motion`):
- *Typewriter, change content:* `createTypewriter(el).to(text)` deletes back to the shared prefix, then types with natural timing. Used for the hero roles and the hero terminal (whose `"scale"` value keeps rewriting itself).
- *Skeleton shimmer:* `.skeleton` / `[data-skeleton].is-loading` placeholders for the photo, skill icons, the contribution graph and the live GitHub repo cards, which `loadRepos()` fetches from the GitHub API, caches per session, and falls back to `openSource.contributions` if the request fails.
- *Animated reorder:* the Featured filter/sort bar uses `flip()` so cards glide to their new positions, plus a sliding highlight pill. Filters come from `projectFilters` and each project's `categories` in `data.js`.

**Case-study routing.** One static HTML file per project (`projects/<slug>.html`) with `data-slug` on `<body>`.
`main.js` finds the project in `data.js` and renders `CaseStudy`. Static files keep URLs clean on any host and give each page its own metadata.

**Images.**
- Project cards use a generated SVG mockup until you set `image` on a project. Add real screenshots at **1200×750 (16:10)**, preferably **WebP** under ~150 KB, in `assets/img/projects/`, then set `image: "assets/img/projects/kyc.webp"`.
- `<img>` tags carry `width`/`height` (no layout shift), `loading="lazy"` and `decoding="async"`. The hero photo is preloaded with `fetchpriority="high"`.
- To shrink the photo further: `npx @squoosh/cli --webp auto assets/img/hassan-mansoor.jpg`.

**Accessibility.** Skip link, semantic landmarks and headings, visible focus rings, 44 px minimum touch targets, a keyboard-operable hamburger menu (Esc closes it, `aria-expanded`), a screen-reader-friendly typing effect, labelled form fields with inline errors, and `prefers-reduced-motion` support.

**Responsive breakpoints.** 640 px (small tablet), 768 px (two-column grids), 960 px (desktop nav and hero split), 1200 px (wide layout, horizontal architecture diagrams).

**SEO.** Title, description and keywords (developer portfolio, full-stack developer portfolio, Claude Code portfolio), Open Graph and Twitter cards, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`.

## Contact form
By default the form opens the visitor's email app with the message pre-filled (no backend needed).
To receive submissions directly, create a free form at [Formspree](https://formspree.io), then set
`site.formEndpoint: "https://formspree.io/f/xxxxxxx"` in `data.js`.

## Deployment

Live at **https://hassan07-dev.github.io/** (GitHub Pages, served from the `main` branch root of
`Hassan07-Dev/Hassan07-Dev.github.io`). Every push to `main` redeploys it within a minute or two:

```bash
node tools/build-case-pages.js   # only needed after changing projects in data.js
git add -A && git commit -m "Update portfolio" && git push
```

If you move to a custom domain, replace `https://hassan07-dev.github.io` in `assets/js/data.js` (`site.url`),
`index.html` (canonical, og/twitter tags, JSON-LD) and `robots.txt`, then rerun `node tools/build-case-pages.js`.

Other hosts work too:
- **Vercel / Netlify:** import the repo. Framework preset: *Other*, build command empty, output directory `/`.
- **Any static host / cPanel:** upload the folder as-is.

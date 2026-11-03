#!/usr/bin/env node
/*
 * Generates projects/<slug>.html for every project in assets/js/data.js.
 * Each page gets its own <title>, description, canonical and Open Graph tags (good for SEO),
 * while the body is rendered from data.js by assets/js/components.js.
 *
 * Usage:  node tools/build-case-pages.js
 * Re-run after adding a project or changing a title/summary. Also refreshes sitemap.xml.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "assets/js/data.js"), "utf8"), sandbox);
const D = sandbox.window.PORTFOLIO;
const site = D.site.url.replace(/\/$/, "");

const esc = (s = "") =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const page = (p) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(p.title)} — Case Study | ${esc(D.site.name)}</title>
  <meta name="description" content="${esc(p.summary)} ${esc(p.outcome)}">
  <meta name="author" content="${esc(D.site.name)}">
  <meta name="theme-color" content="#06110C">
  <script>(function(){var t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.setAttribute("data-theme",t)})();</script>
  <script>if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("loading");</script>
  <link rel="canonical" href="${site}/projects/${p.slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${esc(p.title)} — Case Study by ${esc(D.site.name)}">
  <meta property="og:description" content="${esc(p.summary)}">
  <meta property="og:url" content="${site}/projects/${p.slug}.html">
  <meta property="og:image" content="${site}/${esc(p.image || D.site.photo)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="../assets/img/favicon.svg?v=2" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body data-page="case" data-slug="${p.slug}" data-base="../">
  <a class="skip-link" href="#main">Skip to content</a>
  <!-- Page loader (shown while html.loading; removed by main.js, auto-hides after 6s as a failsafe) -->
  <div class="loader" id="loader" aria-hidden="true">
    <div class="loader-curtain loader-curtain-top"></div>
    <div class="loader-curtain loader-curtain-bottom"></div>
    <div class="loader-core">
      <div class="loader-orbit">
        <svg class="loader-ring" viewBox="0 0 120 120">
          <circle class="loader-ring-track" cx="60" cy="60" r="52"/>
          <circle class="loader-ring-arc" cx="60" cy="60" r="52" pathLength="100"/>
        </svg>
        <span class="loader-spinner"></span>
        <span class="loader-monogram">HM</span>
      </div>
      <p class="loader-name"><span class="prompt">~/</span>hassan<span class="caret">_</span></p>
      <ol class="loader-log">
        <li>booting portfolio<span class="dots"></span></li>
        <li>loading modules: laravel · python · claude-api</li>
        <li>warming caches: redis</li>
        <li class="ok">ready ✓</li>
      </ol>
      <div class="loader-bar"><span></span></div>
      <p class="loader-pct"><b>000</b>%</p>
    </div>
  </div>

  <header class="site-header">
    <nav class="container nav" aria-label="Primary">
      <a class="logo" href="../index.html" aria-label="${esc(D.site.name)}, home"><span class="logo-mark" aria-hidden="true"><span class="logo-face logo-front">HM</span><span class="logo-face logo-back">&lt;/&gt;</span></span><span class="logo-text" aria-hidden="true"><span class="logo-name">Hassan Mansoor</span><span class="logo-sub"><span class="prompt">~/</span>senior-swe<span class="caret">_</span></span></span></a>
      <div class="nav-menu" id="nav-menu">
        <a href="../index.html#about"><span class="num">01</span>About</a>
        <a href="../index.html#skills"><span class="num">02</span>Skills</a>
        <a href="../index.html#projects"><span class="num">03</span>Projects</a>
        <a href="../index.html#experience"><span class="num">05</span>Experience</a>
        <a href="../index.html#contact"><span class="num">06</span>Contact</a>
        <a class="btn btn-ghost" href="../${esc(D.site.resume)}" download>Resume</a>
      </div>
      <div class="nav-end">
        <button class="icon-btn theme-toggle" type="button" aria-label="Switch to day mode">
          <svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          <svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
        </button>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Open menu"><span class="bar"></span></button>
      </div>
    </nav>
  </header>

  <main id="main">
    <article id="case-root">
      <noscript><div class="container case-hero"><h1>${esc(p.title)}</h1><p>${esc(p.summary)}</p></div></noscript>
    </article>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <p class="mono">© <span data-year></span> ${esc(D.site.name)} · <a href="../index.html#contact">Get in touch</a></p>
      <div class="social-row" data-footer-social></div>
    </div>
  </footer>

  <script src="../assets/js/data.js"></script>
  <script src="../assets/js/components.js"></script>
  <script src="../assets/js/main.js"></script>
</body>
</html>
`;

fs.mkdirSync(path.join(root, "projects"), { recursive: true });
for (const p of D.projects) {
  fs.writeFileSync(path.join(root, "projects", `${p.slug}.html`), page(p));
  console.log(`wrote projects/${p.slug}.html`);
}

const urls = ["/", ...D.projects.map((p) => `/projects/${p.slug}.html`)];
fs.writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${site}${u}</loc></url>`)
    .join("\n")}\n</urlset>\n`
);
console.log("wrote sitemap.xml");

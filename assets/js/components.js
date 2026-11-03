/*
 * Reusable UI components. Each one is a pure function: data in, HTML string out.
 * Hero / ProjectGrid / ProjectCard / CaseStudyPreview / SkillsCloud / ExperienceTimeline / ContactCTA
 * plus CaseStudy (full page) and small helpers.
 */
(function () {
  "use strict";

  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // Lucide-style inline icons (stroke = currentColor)
  const ICON_PATHS = {
    github:
      '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    linkedin:
      '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    twitter: '<path d="M4 4l11.733 16H20L8.267 4z"/><path d="M4 20l6.768-6.768M13.232 10.768L20 4"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    trend: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  };
  const icon = (name, label) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${
      label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"'
    }>${ICON_PATHS[name] || ""}</svg>`;

  const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";

  // First `max` tags, then a "+N" chip for the rest (keeps cards short)
  const TagItems = (list, max) =>
    list.slice(0, max).map((t) => `<li class="tag">${esc(t)}</li>`).join("") +
    (list.length > max ? `<li class="tag tag-more" title="${esc(list.slice(max).join(", "))}">+${list.length - max}</li>` : "");

  /* ---------- Project art: generated "browser mockup" used until real screenshots are added ---------- */
  function ProjectArt(p, variant = "card") {
    const a = p.accent || "#EF5350";
    const id = `g-${p.slug}-${variant}`;
    const title = esc(p.title);
    return `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration for ${title}">
      <defs>
        <radialGradient id="${id}" cx="80%" cy="10%" r="90%">
          <stop offset="0" stop-color="${a}" stop-opacity=".35"/>
          <stop offset=".6" stop-color="#0A140F" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="#0A140F"/>
      <rect width="800" height="500" fill="url(#${id})"/>
      <g opacity=".08" stroke="#A3A3A3">${Array.from({ length: 17 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="500"/>`).join("")}${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="800" y2="${i * 50}"/>`).join("")}</g>
      <g transform="translate(90 70)">
        <rect width="620" height="400" rx="16" fill="#171717" stroke="#3A3A3A"/>
        <rect width="620" height="40" rx="16" fill="#262626"/><rect y="24" width="620" height="16" fill="#262626"/>
        <circle cx="24" cy="20" r="6" fill="#f87171"/><circle cx="44" cy="20" r="6" fill="#fbbf24"/><circle cx="64" cy="20" r="6" fill="#4ade80"/>
        <rect x="100" y="11" width="300" height="18" rx="9" fill="#0A140F"/>
        <rect x="28" y="70" width="150" height="300" rx="10" fill="#1F1F1F"/>
        ${[0, 1, 2, 3, 4].map((i) => `<rect x="44" y="${92 + i * 34}" width="${i === 1 ? 118 : 96}" height="12" rx="6" fill="${i === 1 ? a : "#3A3A3A"}" opacity="${i === 1 ? 0.9 : 1}"/>`).join("")}
        <rect x="200" y="70" width="392" height="120" rx="10" fill="#1F1F1F"/>
        <text x="228" y="150" font-family="JetBrains Mono, monospace" font-size="56" font-weight="700" fill="${a}">${esc(p.glyph || "")}</text>
        <rect x="370" y="100" width="190" height="12" rx="6" fill="#525252"/>
        <rect x="370" y="124" width="150" height="12" rx="6" fill="#3A3A3A"/>
        <rect x="370" y="148" width="170" height="12" rx="6" fill="#3A3A3A"/>
        <rect x="200" y="206" width="186" height="164" rx="10" fill="#1F1F1F"/>
        <polyline points="220,340 254,300 288,316 322,262 366,240" fill="none" stroke="${a}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="406" y="206" width="186" height="164" rx="10" fill="#1F1F1F"/>
        ${[0, 1, 2, 3].map((i) => `<rect x="426" y="${230 + i * 34}" width="20" height="20" rx="5" fill="${i === 0 ? a : "#3A3A3A"}"/><rect x="456" y="${235 + i * 34}" width="${110 - i * 12}" height="10" rx="5" fill="#3A3A3A"/>`).join("")}
      </g>
    </svg>`;
  }

  // Small abstract screen used for "UI states" on case-study pages
  function StateArt(accent, i) {
    const a = accent || "#EF5350";
    const rows = [0, 1, 2].map((r) => `<rect x="24" y="${70 + r * 28}" width="${150 - ((r + i) % 3) * 30}" height="10" rx="5" fill="#3A3A3A"/>`).join("");
    return `<svg viewBox="0 0 240 180" aria-hidden="true">
      <rect width="240" height="180" fill="#0A140F"/>
      <rect x="12" y="12" width="216" height="156" rx="10" fill="#171717" stroke="#3A3A3A"/>
      <rect x="24" y="26" width="${60 + i * 14}" height="14" rx="7" fill="${a}"/>
      ${rows}
      <rect x="${150 - i * 6}" y="132" width="${66 + i * 6}" height="22" rx="11" fill="${a}" opacity=".85"/>
      <circle cx="200" cy="34" r="10" fill="none" stroke="${a}" stroke-width="3"/>
    </svg>`;
  }

  function Media(p, base, variant) {
    if (p.image) {
      return `<img src="${esc(base + p.image)}" alt="Screenshot of ${esc(p.title)}" width="1200" height="750" loading="lazy" decoding="async">`;
    }
    return ProjectArt(p, variant);
  }

  /* ---------- Hero socials ---------- */
  function SocialLinks(social, email) {
    const links = [];
    if (social.github) links.push(["github", `https://github.com/${social.github}`, "GitHub"]);
    if (social.linkedin) links.push(["linkedin", social.linkedin, "LinkedIn"]);
    if (social.twitter) links.push(["twitter", social.twitter, "X (Twitter)"]);
    if (email) links.push(["mail", `mailto:${email}`, "Email"]);
    return links
      .map(
        ([ic, href, label]) =>
          `<a class="icon-btn" href="${esc(href)}" ${href.startsWith("mailto") ? "" : 'target="_blank" rel="noopener noreferrer"'} aria-label="${label}">${icon(ic)}</a>`
      )
      .join("");
  }

  /* ---------- About ---------- */
  function About(d) {
    const a = d.about;
    const stats = a.stats
      .map((s) => `<div class="stat" data-tilt><div class="stat-value" data-count="${esc(s.value)}">${esc(s.value)}</div><div class="stat-label">${esc(s.label)}</div></div>`)
      .join("");
    const layers = a.stackLayers
      .map(
        (l) => `<div class="stack-layer"><span class="stack-layer-name">${esc(l.layer)}</span><ul class="stack-layer-items tag-list">${l.items
          .map((i) => `<li class="tag">${esc(i)}</li>`)
          .join("")}</ul></div>`
      )
      .join("");
    return `
      <div class="about-grid">
        <div class="about-copy reveal">
          <p class="now-at"><span class="mono">● now</span> ${esc(a.currentRole || d.site.title)} at <strong>${esc(a.company)}</strong></p>
          ${a.summary.map((p) => `<p>${esc(p)}</p>`).join("")}
          <p class="fun-fact"><span class="label">fun_fact.md</span>${esc(a.funFact)}</p>
        </div>
        <div class="reveal">
          <div class="stats">${stats}</div>
          <div class="stack-viz" aria-label="Tech stack by layer">
            <div class="stack-viz-head">~/stack $ tree --layers</div>
            ${layers}
          </div>
        </div>
      </div>`;
  }

  /* ---------- SkillsCloud ---------- */
  function SkillsCloud(groups, leadership) {
    const tile = (s, i) => {
      const visual = s.icon
        ? `<span class="skill-icon is-loading" data-skeleton><img src="${DEVICON}${esc(s.icon)}.svg" alt="" width="28" height="28" loading="lazy" data-badge="${esc(s.name.slice(0, 2))}"></span>`
        : `<span class="skill-icon badge" aria-hidden="true">${esc(s.badge || s.name.slice(0, 2))}</span>`;
      return `<li class="skill" style="--i:${i}">${visual}<span class="skill-name">${esc(s.name)}</span></li>`;
    };
    const html = groups
      .map(
        (g) =>
          g.chips
            ? `<div class="skill-group skill-group-chips reveal"><h3>${esc(g.category)}</h3><ul class="tag-list skill-chips">${g.items.map((s) => `<li class="tag">${esc(s.name)}</li>`).join("")}</ul></div>`
            : `<div class="skill-group reveal"><h3>${esc(g.category)}</h3><ul class="skill-icons">${g.items.map(tile).join("")}</ul></div>`
      )
      .join("");
    const lead = leadership && leadership.length
      ? `<div class="leadership reveal"><h3>Leadership</h3><ul class="tag-list">${leadership.map((l) => `<li class="tag">${esc(l)}</li>`).join("")}</ul></div>`
      : "";
    return `<div class="skills-grid">${html}</div>${lead}`;
  }

  /* ---------- ProjectCard / ProjectGrid ---------- */
  function ProjectCard(p, base = "") {
    const caseHref = `${base}projects/${p.slug}.html`;
    const links = [
      `<a class="case-link" href="${caseHref}">Read case study ${icon("arrowRight")}</a>`,
      p.links.live ? `<a href="${esc(p.links.live)}" target="_blank" rel="noopener noreferrer">${icon("external")} Live<span class="sr-only"> site for ${esc(p.title)} (opens in new tab)</span></a>` : "",
      p.links.repo ? `<a href="${esc(p.links.repo)}" target="_blank" rel="noopener noreferrer">${icon("github")} Code<span class="sr-only"> for ${esc(p.title)} (opens in new tab)</span></a>` : "",
      p.stars != null ? `<span class="stars">${icon("star", "GitHub stars")} ${esc(p.stars)}</span>` : "",
    ].join("");
    return `
      <li>
        <article class="project-card reveal" data-tilt>
          <span class="spotlight" aria-hidden="true"></span>
          <div class="project-media">${Media(p, base, "card")}</div>
          <div class="project-body">
            <div class="project-meta"><span>${esc(p.org)}</span><span>${esc(p.period)}</span></div>
            <h3 class="project-title"><a href="${caseHref}">${esc(p.title)}</a></h3>
            <p class="project-desc">${esc(p.summary)}</p>
            <p class="project-outcome">${icon("trend")}<span>${esc(p.outcome)}</span></p>
            <ul class="tag-list" aria-label="Tech stack">${TagItems(p.tags, 5)}</ul>
            <div class="project-links">${links}</div>
          </div>
        </article>
      </li>`;
  }

  // Filter + sort toolbar; main.js animates the cards to their new positions (FLIP).
  function ProjectGrid(projects, base = "", filters = {}) {
    const used = Object.keys(filters).filter((k) => projects.some((p) => (p.categories || []).includes(k)));
    const btn = (key, label, n) =>
      `<button class="filter-btn" type="button" data-filter="${key}" aria-pressed="${key === "all"}">${esc(label)}<span class="filter-count">${n}</span></button>`;
    const toolbar = used.length
      ? `<div class="project-toolbar reveal">
          <div class="seg" role="group" aria-label="Filter projects">
            <span class="seg-pill" aria-hidden="true"></span>
            ${btn("all", "All", projects.length)}
            ${used.map((k) => btn(k, filters[k], projects.filter((p) => p.categories.includes(k)).length)).join("")}
          </div>
          <div class="seg seg-sort" role="group" aria-label="Sort projects">
            <span class="seg-pill" aria-hidden="true"></span>
            <button class="filter-btn" type="button" data-sort="featured" aria-pressed="true">Featured</button>
            <button class="filter-btn" type="button" data-sort="az" aria-pressed="false">A–Z</button>
          </div>
        </div>
        <p class="sr-only" id="project-status" aria-live="polite"></p>`
      : "";
    return `${toolbar}<ul class="project-grid">${projects
      .map((p, i) => ProjectCard(p, base).replace("<li>", `<li data-index="${i}" data-title="${esc(p.title)}" data-cats="${esc((p.categories || []).join(" "))}">`))
      .join("")}</ul>`;
  }

  /* ---------- Marquee: auto-scrolling tech-stack slider ---------- */
  function Marquee(groups) {
    const items = groups.filter((g) => !g.chips).flatMap((g) => g.items);
    const chip = (s) =>
      `<li class="mq-item">${
        s.icon
          ? `<img src="${DEVICON}${esc(s.icon)}.svg" alt="" width="22" height="22" loading="lazy">`
          : `<span class="mq-badge" aria-hidden="true">${esc(s.badge || s.name.slice(0, 2))}</span>`
      }<span>${esc(s.name)}</span></li>`;
    const half = Math.ceil(items.length / 2);
    const row = (list, reverse) =>
      `<div class="mq-row${reverse ? " mq-reverse" : ""}"><ul class="mq-track">${list.map(chip).join("")}</ul><ul class="mq-track" aria-hidden="true">${list.map(chip).join("")}</ul></div>`;
    return `${row(items.slice(0, half))}${row(items.slice(half), true)}
      <button class="mq-pause" type="button" aria-pressed="false"><span class="sr-only">Pause scrolling technologies</span><span aria-hidden="true">❚❚</span></button>`;
  }

  /* ---------- More work: horizontal slider ---------- */
  function MoreProjects(items) {
    if (!items || !items.length) return "";
    return `
      <div class="more-projects reveal" data-slider>
        <div class="slider-head">
          <h3>More work</h3>
          <div class="slider-controls">
            <button class="icon-btn" type="button" data-slide="-1" aria-label="Previous projects">${icon("arrowLeft")}</button>
            <button class="icon-btn" type="button" data-slide="1" aria-label="Next projects">${icon("arrowRight")}</button>
          </div>
        </div>
        <ul class="more-list" tabindex="0" aria-label="More projects, scroll horizontally">
          ${items
            .map(
              (m, i) => `<li class="more-item" aria-label="${i + 1} of ${items.length}"><span class="more-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
                <div class="more-item-head">
                  <h4>${m.url ? `<a href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">${esc(m.title)} ${icon("external")}<span class="sr-only"> (opens in new tab)</span></a>` : esc(m.title)}</h4>
                  <span class="org">${esc(m.org)}</span>
                </div>
                <p>${esc(m.description)}</p>
              </li>`
            )
            .join("")}
        </ul>
      </div>`;
  }

  /* ---------- Open source ---------- */
  // Live repo cards start as shimmer skeletons; main.js fills them from the GitHub API.
  function OpenSource(github, os) {
    const count = Math.max(2, Math.min(6, (os.contributions || []).length || 4));
    return `
      <div class="gh-graph reveal is-loading" data-skeleton>
        <img src="https://ghchart.rshah.org/a31c1b/${esc(github)}" alt="GitHub contribution graph for ${esc(github)}" width="720" height="112" loading="lazy">
      </div>
      ${os.heading ? `<h3 class="contrib-heading">${esc(os.heading)}</h3>` : ""}
      <ul class="repo-grid" id="gh-repos" aria-busy="true" aria-label="Public repositories">${RepoSkeletons(count)}</ul>
      <a class="btn btn-ghost" href="https://github.com/${esc(github)}" target="_blank" rel="noopener noreferrer">${icon("github")} View GitHub profile</a>`;
  }

  function RepoSkeletons(n) {
    return Array.from({ length: n }, () => `
      <li class="repo-card is-skeleton" aria-hidden="true">
        <span class="skeleton sk-line" style="width:62%"></span>
        <span class="skeleton sk-line sk-sm" style="width:92%"></span>
        <span class="skeleton sk-line sk-sm" style="width:74%"></span>
        <span class="sk-row"><span class="skeleton sk-pill"></span><span class="skeleton sk-pill"></span></span>
      </li>`).join("");
  }

  const LANG_COLORS = { PHP: "#4F5D95", Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6", Blade: "#f7523f", HTML: "#e34c26", CSS: "#563d7c", Vue: "#41b883", Shell: "#89e051" };
  function RepoCards(repos) {
    const fmt = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    return repos
      .map(
        (r) => `<li class="repo-card">
          <a class="repo-name" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${icon("github")}<span>${esc(r.name)}</span><span class="sr-only"> (opens in new tab)</span></a>
          <p>${esc(r.description || "Public repository.")}</p>
          <div class="repo-meta">
            ${r.language ? `<span><i class="lang-dot" style="background:${LANG_COLORS[r.language] || "var(--fg-subtle)"}"></i>${esc(r.language)}</span>` : ""}
            <span>${icon("star")} ${r.stars}</span>
            ${r.updated ? `<span>Updated ${fmt(r.updated)}</span>` : ""}
          </div>
        </li>`
      )
      .join("");
  }

  /* ---------- Writing ---------- */
  function Articles(articles) {
    const fmt = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    return `<ul class="article-grid">${articles
      .slice(0, 3)
      .map(
        (a) => `<li><article class="article-card reveal">
          <div><time datetime="${esc(a.date)}">${fmt(a.date)}</time> · <span class="read">${esc(a.readTime)}</span></div>
          <h3><a href="${esc(a.url)}" target="_blank" rel="noopener noreferrer">${esc(a.title)}</a></h3>
          <p>${esc(a.excerpt)}</p>
        </article></li>`
      )
      .join("")}</ul>`;
  }

  /* ---------- ExperienceTimeline ---------- */
  function ExperienceTimeline(items) {
    return `<ol class="timeline">${items
      .map(
        (e) => `<li class="timeline-item reveal${e.end === "Present" ? " is-current" : ""}">
          <article class="timeline-card">
            <p class="timeline-dates">${esc(e.start)} — ${esc(e.end)}</p>
            <h3 class="timeline-role">${esc(e.role)}</h3>
            <p class="timeline-company">${esc(e.company)} · ${esc(e.location)}${e.end === "Present" ? '<span class="current-badge">current</span>' : ""}</p>
            <p>${esc(e.description)}</p>
            <ul class="tag-list" aria-label="Technologies used">${TagItems(e.tech, e.tech.length)}</ul>
          </article>
        </li>`
      )
      .join("")}</ol>`;
  }

  function Credentials(d) {
    return `<div class="creds">
      <div class="cred-card reveal"><h3>// education</h3><ul><li><strong>${esc(d.education.degree)}</strong><span>${esc(d.education.school)} · ${esc(d.education.period)}</span></li></ul></div>
      <div class="cred-card reveal"><h3>// certifications</h3><ul>${d.certifications.map((c) => `<li><strong>${esc(c.name)}</strong><span>${esc(c.issuer)} · ${esc(c.date)}</span></li>`).join("")}</ul></div>
      <div class="cred-card reveal"><h3>// recognition</h3><ul>${d.awards.map((a) => `<li><strong>${esc(a.name)}</strong><span>${esc(a.issuer)}</span></li>`).join("")}</ul></div>
    </div>`;
  }

  /* ---------- ContactCTA ---------- */
  function ContactCTA(site) {
    return `
      <div class="contact-grid">
        <div class="reveal">
          <a class="contact-email" href="mailto:${esc(site.email)}">${icon("mail")}${esc(site.email)}</a>
          <ul class="contact-meta">
            <li>${icon("clock")}<span>${esc(site.responseTime)}</span></li>
            <li>${icon("pin")}<span>${esc(site.location)}</span></li>
            <li>${icon("briefcase")}<span>${esc(site.availability)}</span></li>
          </ul>
          <div class="inquiry-types">
            <div class="inquiry"><strong>Full-time</strong><span>Senior back-end or team lead roles on products with real scale.</span></div>
            <div class="inquiry"><strong>Freelance</strong><span>Laravel or Python APIs, payment integrations and Claude API features.</span></div>
            <div class="inquiry"><strong>Consulting</strong><span>Architecture reviews, scaling plans and security hardening.</span></div>
          </div>
        </div>
        <form class="contact-form reveal" id="contact-form" novalidate>
          <fieldset class="field">
            <legend>What's this about?</legend>
            <div class="chip-group">
              <input type="radio" id="t-ft" name="type" value="Full-time role" checked><label for="t-ft">Full-time</label>
              <input type="radio" id="t-fl" name="type" value="Freelance project"><label for="t-fl">Freelance</label>
              <input type="radio" id="t-co" name="type" value="Consulting"><label for="t-co">Consulting</label>
              <input type="radio" id="t-ot" name="type" value="Something else"><label for="t-ot">Other</label>
            </div>
          </fieldset>
          <div class="form-row">
            <div class="field">
              <label for="f-name">Name <span class="req" aria-hidden="true">*</span></label>
              <input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="f-name-err">
              <p class="field-error" id="f-name-err"></p>
            </div>
            <div class="field">
              <label for="f-email">Email <span class="req" aria-hidden="true">*</span></label>
              <input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="f-email-err">
              <p class="field-error" id="f-email-err"></p>
            </div>
          </div>
          <div class="field">
            <label for="f-msg">Message <span class="req" aria-hidden="true">*</span></label>
            <textarea id="f-msg" name="message" required placeholder="A few lines about the role, project or problem…" aria-describedby="f-msg-err"></textarea>
            <p class="field-error" id="f-msg-err"></p>
          </div>
          <button class="btn btn-primary" type="submit">${icon("send")} Send message</button>
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>`;
  }

  /* ---------- CaseStudyPreview (used for prev/next links) ---------- */
  function CaseStudyPreview(p, label, cls, base) {
    return `<a class="${cls}" href="${base}projects/${p.slug}.html"><small>${label}</small><strong>${esc(p.title)}</strong></a>`;
  }

  /* ---------- Full case-study page ---------- */
  function CaseStudy(p, all, base) {
    const c = p.caseStudy;
    const sections = [];
    const add = (id, title, body) => sections.push({ id, title, body });

    add("context", "Problem & context", `<p>${esc(c.context)}</p><p>${esc(c.problem)}</p>`);
    add("role", "My role", `<p>${esc(c.myRole)}</p>`);
    add(
      "constraints",
      "Constraints & tradeoffs",
      `<ul class="check-list">${c.constraints.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
       <div class="tradeoffs" style="margin-top:20px">${c.tradeoffs.map((t) => `<div class="tradeoff"><strong>${esc(t.choice)}</strong><span>${esc(t.why)}</span></div>`).join("")}</div>`
    );
    add(
      "architecture",
      "Architecture & data flow",
      `<ol class="flow" aria-label="Data flow">${c.architecture.steps
        .map((s) => `<li class="flow-step"><strong>${esc(s.label)}</strong><span>${esc(s.sub)}</span></li>`)
        .join("")}</ol>${c.architecture.note ? `<p class="flow-note">${esc(c.architecture.note)}</p>` : ""}`
    );
    if (c.states && c.states.length) {
      add(
        "screens",
        "Screens & UI states",
        `<ul class="states-grid">${c.states
          .map((s, i) => `<li class="state-card"><div class="mini">${StateArt(p.accent, i)}</div><div class="txt"><strong>${esc(s.title)}</strong><span>${esc(s.detail)}</span></div></li>`)
          .join("")}</ul>`
      );
    }
    const metrics = c.metrics && c.metrics.length
      ? `<div class="metrics">${c.metrics.map((m) => `<div class="stat"><div class="stat-value">${esc(m.value)}</div><div class="stat-label">${esc(m.label)}</div></div>`).join("")}</div>`
      : "";
    add(
      "results",
      "Results & lessons",
      `${metrics}<ul class="check-list">${c.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
       <h3 style="font-size:1.05rem;margin-top:28px">Lessons learned</h3>
       <ul class="check-list">${c.lessons.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>`
    );
    const linkBtns = [
      p.links.live ? `<a class="btn btn-primary" href="${esc(p.links.live)}" target="_blank" rel="noopener noreferrer">${icon("external")} Visit live site</a>` : "",
      p.links.repo ? `<a class="btn btn-ghost" href="${esc(p.links.repo)}" target="_blank" rel="noopener noreferrer">${icon("github")} View repository</a>` : "",
    ].join("");
    add(
      "code",
      "Code & links",
      `${linkBtns ? `<div class="case-links">${linkBtns}</div>` : ""}
       ${!p.links.repo ? `<p class="repo-note" ${linkBtns ? 'style="margin-top:16px"' : ""}>${icon("lock")} The source code is private. Happy to walk through the architecture and code decisions in a call.</p>` : ""}`
    );

    const idx = all.findIndex((x) => x.slug === p.slug);
    const prev = all[(idx - 1 + all.length) % all.length];
    const next = all[(idx + 1) % all.length];

    return `
      <header class="case-hero" id="overview" data-rail="Overview">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb"><a href="${base}index.html#projects">${icon("arrowLeft")} cd ../projects</a></nav>
          <p class="eyebrow">case study</p>
          <h1 class="case-title">${esc(p.title)}</h1>
          <p class="case-summary">${esc(p.summary)}</p>
          <dl class="case-facts">
            <div class="case-fact"><dt>Where</dt><dd>${esc(p.org)}</dd></div>
            <div class="case-fact"><dt>When</dt><dd>${esc(p.period)}</dd></div>
            <div class="case-fact"><dt>Role</dt><dd>${esc(p.role)}</dd></div>
            <div class="case-fact"><dt>Outcome</dt><dd>${esc(p.outcome)}</dd></div>
          </dl>
          <ul class="tag-list" aria-label="Tech stack">${p.tags.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>
          <div class="case-cover">${Media(p, base, "cover")}</div>
        </div>
      </header>
      <div class="container case-layout">
        <aside class="case-toc" aria-label="On this page">
          <p>on this page</p>
          <ol>${sections.map((s) => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join("")}</ol>
        </aside>
        <div>
          ${sections
            .map(
              (s, i) => `<section class="case-section reveal" id="${s.id}" data-rail="${esc(s.title)}" aria-labelledby="${s.id}-h">
                <h2 id="${s.id}-h"><span class="idx">0${i + 1}</span>${esc(s.title)}</h2>${s.body}
              </section>`
            )
            .join("")}
          <nav class="case-nav" aria-label="More case studies">
            ${CaseStudyPreview(prev, "← previous", "prev", base)}
            ${CaseStudyPreview(next, "next →", "next", base)}
          </nav>
        </div>
      </div>`;
  }

  window.Components = {
    esc, icon, SocialLinks, About, SkillsCloud, Marquee, ProjectCard, ProjectGrid, MoreProjects, RepoCards,
    OpenSource, Articles, ExperienceTimeline, Credentials, ContactCTA, CaseStudyPreview, CaseStudy,
  };
})();

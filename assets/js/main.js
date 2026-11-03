/*
 * Page bootstrapping: renders data into the page, then wires up behavior
 * (mobile nav, typing effect, scroll reveal, active links, contact form).
 */
(function () {
  "use strict";

  const D = window.PORTFOLIO;
  const C = window.Components;
  const base = document.body.dataset.base || "";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  document.documentElement.classList.add("js");
  const pageReady = runLoader(); // resolves when the hero intro starts
  initBackground();

  const mount = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
    return el;
  };
  const hideSection = (id) => {
    const s = document.getElementById(id);
    if (s) s.hidden = true;
    $$(`a[href$="#${id}"]`).forEach((a) => a.closest("li, a").remove());
  };

  /* ---------- Render: home page ---------- */
  if (document.body.dataset.page === "home") {
    mount("hero-social", C.SocialLinks(D.social, D.site.email));
    mount("marquee", C.Marquee(D.skills));
    mount("about-content", C.About(D));
    mount("skills-content", C.SkillsCloud(D.skills, D.leadership));
    mount("projects-content", C.ProjectGrid(D.projects, base, D.projectFilters) + C.MoreProjects(D.moreProjects));
    mount("experience-content", `<div class="exp-layout"><div>${C.ExperienceTimeline(D.experience)}</div><aside class="exp-aside" aria-label="Education, certifications and recognition">${C.Credentials(D)}</aside></div>`);
    mount("contact-content", C.ContactCTA(D.site));

    if (D.social.github) mount("opensource-content", C.OpenSource(D.social.github, D.openSource));
    else hideSection("opensource");

    if (D.articles.length) mount("writing-content", C.Articles(D.articles));
    else hideSection("writing");

    initTyping();
    initTerminal();
    initProjectFilters();
    if (D.social.github) loadRepos(D.social.github);
    initContactForm();
  }

  /* ---------- Render: case-study page ---------- */
  if (document.body.dataset.page === "case") {
    const slug = document.body.dataset.slug;
    const project = D.projects.find((p) => p.slug === slug);
    mount("case-root", project ? C.CaseStudy(project, D.projects, base) : `<div class="container case-hero"><h1>Case study not found</h1><p><a href="${base}index.html#projects">Back to projects</a></p></div>`);
    initTocHighlight();
  }

  // Footer year + social (both page types)
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  $$("[data-footer-social]").forEach((el) => (el.innerHTML = C.SocialLinks(D.social, D.site.email)));

  // Swap any devicon that fails to load for a text badge
  $$(".skill-icon img").forEach((img) => {
    img.addEventListener("error", () => {
      const span = img.parentElement;
      span.classList.add("badge");
      span.textContent = img.dataset.badge || "";
    }, { once: true });
  });

  numberSections();
  initImageSkeletons();
  initTheme();
  initNav();
  initReveal();
  initRail();
  initCursor();
  initTilt();
  initCounters();
  initSliders();
  initMarquee();
  initTimelineProgress();

  /* ---------- Day / night mode (initial theme is set in <head> to avoid a flash) ---------- */
  function initTheme() {
    const root = document.documentElement;
    const btn = $(".theme-toggle");
    const meta = $('meta[name="theme-color"]');
    const apply = (t) => {
      root.setAttribute("data-theme", t);
      if (meta) meta.setAttribute("content", t === "light" ? "#F6F4F0" : "#06110C");
      if (btn) btn.setAttribute("aria-label", t === "light" ? "Switch to night mode" : "Switch to day mode");
    };
    apply(root.getAttribute("data-theme") === "light" ? "light" : "dark");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      if (!reduceMotion) { root.classList.add("theme-anim"); setTimeout(() => root.classList.remove("theme-anim"), 400); }
      apply(next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable: theme still applies for this visit */ }
    });
    // follow the OS setting until the visitor picks one
    matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => {
      let saved = null;
      try { saved = localStorage.getItem("theme"); } catch (err) { /* ignore */ }
      if (!saved) apply(e.matches ? "light" : "dark");
    });
  }

  /* ---------- Section numbering (skips hidden sections, so there are no gaps) ---------- */
  function numberSections() {
    if (document.body.dataset.page !== "home") return;
    $$("main section[data-rail]:not([hidden])")
      .filter((s) => s.id !== "top")
      .forEach((s, i) => {
        const nn = String(i + 1).padStart(2, "0");
        const eyebrow = $(".eyebrow", s);
        if (eyebrow) eyebrow.textContent = `${nn}. ${s.dataset.rail.toLowerCase()}`;
        const num = $(`#nav-menu a[href="#${s.id}"] .num`);
        if (num) num.textContent = nn;
      });
  }

  /* ---------- Numbered vertical scroll-progress rail ---------- */
  function initRail() {
    const rail = $("#rail") || document.body.appendChild(Object.assign(document.createElement("nav"), { className: "rail", id: "rail" }));
    rail.setAttribute("aria-label", "Page sections");
    const sections = $$("[data-rail]:not([hidden])").filter((s) => s.id && s.offsetParent !== null);
    if (!sections.length) return;
    const start = 0; // first entry (Intro / Overview) is 00, matching the section numbers
    rail.innerHTML = `
      <div class="rail-track" aria-hidden="true"><span class="rail-fill"></span></div>
      <ol>${sections
        .map((s, i) => `<li><a href="#${s.id}" data-rail-link="${s.id}"><span class="rail-label">${C.esc(s.dataset.rail)}</span><span class="rail-num">${String(i + start).padStart(2, "0")}</span></a></li>`)
        .join("")}</ol>
      <p class="rail-pct" aria-hidden="true"><span>scroll</span> <b>000</b>%</p>`;
    const fill = $(".rail-fill", rail);
    const pct = $(".rail-pct b", rail);
    const links = $$("a", rail);

    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      fill.style.transform = `scaleY(${p})`;
      pct.textContent = String(Math.round(p * 100)).padStart(3, "0");
      // active = last section whose top passed 40% of the viewport
      let active = sections[0];
      for (const s of sections) if (s.getBoundingClientRect().top <= innerHeight * 0.4) active = s;
      if (p > 0.995) active = sections[sections.length - 1];
      links.forEach((a) => {
        const on = a.dataset.railLink === active.id;
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ---------- Custom cursor: dot + trailing ring (fine pointers only) ---------- */
  function initCursor() {
    if (reduceMotion || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot = Object.assign(document.createElement("div"), { className: "cursor-dot" });
    const ring = Object.assign(document.createElement("div"), { className: "cursor-ring" });
    dot.setAttribute("aria-hidden", "true");
    ring.setAttribute("aria-hidden", "true");
    document.body.append(ring, dot);
    document.documentElement.classList.add("has-cursor");

    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = Math.abs(mx - rx) + Math.abs(my - ry) > 0.2 ? requestAnimationFrame(loop) : 0;
    };
    document.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      document.documentElement.classList.add("cursor-visible");
      const t = e.target.closest("a, button, label, [data-tilt], input, textarea, .more-list");
      ring.classList.toggle("is-link", !!t && !t.matches("input, textarea, [data-tilt], .more-list"));
      ring.classList.toggle("is-card", !!t && t.matches("[data-tilt], .more-list"));
      ring.classList.toggle("is-text", !!t && t.matches("input, textarea"));
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
    document.addEventListener("pointerdown", () => ring.classList.add("is-down"));
    document.addEventListener("pointerup", () => ring.classList.remove("is-down"));
    document.documentElement.addEventListener("mouseleave", () => document.documentElement.classList.remove("cursor-visible"));
  }

  /* ---------- Animated cards: 3D tilt + spotlight that follows the pointer ---------- */
  function initTilt() {
    if (reduceMotion || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    $$("[data-tilt]").forEach((card) => {
      const max = card.classList.contains("project-card") ? 6 : 8;
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
        card.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
        card.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
        card.classList.add("is-tilting");
      });
      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-tilting");
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------- Count-up stats ---------- */
  function initCounters() {
    const els = $$("[data-count]");
    if (reduceMotion || !els.length || !("IntersectionObserver" in window)) return;
    const run = (el) => {
      const m = el.dataset.count.match(/^([^\d]*)([\d.]+)(.*)$/);
      if (!m) return;
      const [, pre, num, post] = m;
      const target = parseFloat(num);
      const decimals = (num.split(".")[1] || "").length;
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / 1400);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = `${pre}${(target * eased).toFixed(decimals)}${post}`;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
    }), { threshold: 0.6 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Horizontal sliders (prev / next + scroll-snap, swipe and keyboard native) ---------- */
  function initSliders() {
    $$("[data-slider]").forEach((wrap) => {
      const track = $(".more-list", wrap);
      const prev = $('[data-slide="-1"]', wrap);
      const next = $('[data-slide="1"]', wrap);
      const sync = () => {
        prev.disabled = track.scrollLeft <= 4;
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      };
      $$("[data-slide]", wrap).forEach((b) =>
        b.addEventListener("click", () => {
          const card = $(".more-item", track);
          const step = card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
          track.scrollBy({ left: step * Number(b.dataset.slide), behavior: reduceMotion ? "auto" : "smooth" });
        })
      );
      track.addEventListener("scroll", sync, { passive: true });
      window.addEventListener("resize", sync);
      sync();
    });
  }

  /* ---------- Marquee pause control (WCAG 2.2.2) ---------- */
  function initMarquee() {
    const mq = $("#marquee");
    const btn = mq && $(".mq-pause", mq);
    if (!btn) return;
    btn.addEventListener("click", () => {
      const paused = mq.classList.toggle("is-paused");
      btn.setAttribute("aria-pressed", String(paused));
      $(".sr-only", btn).textContent = paused ? "Play scrolling technologies" : "Pause scrolling technologies";
      $("[aria-hidden]", btn).textContent = paused ? "▶" : "❚❚";
    });
  }

  /* ---------- Experience line draws in as you scroll ---------- */
  function initTimelineProgress() {
    const tl = $(".timeline");
    if (!tl) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
      tl.style.setProperty("--tl", p.toFixed(3));
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- Mobile nav ---------- */
  function initNav() {
    const header = $(".site-header");
    const toggle = $(".nav-toggle");
    const menu = $("#nav-menu");
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      if (open) {
        $("a", menu)?.focus();
        // mobile menu: links cascade in, numbers scramble into place
        if (!reduceMotion) {
          $$("a", menu).forEach((a, i) =>
            a.animate([{ opacity: 0, transform: "translateX(28px)" }, { opacity: 1, transform: "none" }], { duration: 420, delay: 80 + i * 50, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", fill: "backwards" })
          );
          $$(".num", menu).forEach((n, i) => setTimeout(() => scramble(n, n.textContent, { chars: "0123456789", duration: 420 }), 80 + i * 50));
        }
      }
    };

    // hover: the number badge scrambles, the logo name decodes
    $$("a:not(.btn)", menu).forEach((a) => {
      const n = $(".num", a);
      if (n) a.addEventListener("mouseenter", () => scramble(n, n.textContent, { chars: "0123456789", duration: 320 }));
    });
    const logo = $(".logo");
    const logoName = $(".logo-name");
    if (logo && logoName) logo.addEventListener("mouseenter", () => scramble(logoName, logoName.textContent, { duration: 650 }));

    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Active section highlighting (home page only) + a glow bar that slides to the active link
    const links = $$('#nav-menu a[href^="#"]');
    const sections = links.map((a) => document.getElementById(a.hash.slice(1))).filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const bar = document.createElement("span");
    bar.className = "nav-indicator";
    bar.setAttribute("aria-hidden", "true");
    menu.appendChild(bar);
    const moveBar = () => {
      const a = links.find((l) => l.classList.contains("is-active"));
      if (!a || !matchMedia("(min-width: 960px)").matches) return bar.classList.remove("is-on");
      const m = menu.getBoundingClientRect(), r = a.getBoundingClientRect();
      bar.style.width = `${r.width - 20}px`;
      bar.style.transform = `translateX(${r.left - m.left + 10}px)`;
      bar.classList.add("is-on");
    };
    const setActive = (id) => {
      links.forEach((a) => {
        const on = a.hash === `#${id}`;
        const was = a.classList.contains("is-active");
        a.classList.toggle("is-active", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        const n = $(".num", a);
        if (on && !was && n) scramble(n, n.textContent, { chars: "0123456789", duration: 380 });
      });
      moveBar();
    };
    const hero = $("#top");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) setActive(en.target === hero ? null : en.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    if (hero) io.observe(hero);
    window.addEventListener("resize", moveBar);
    document.fonts && document.fonts.ready.then(moveBar);
  }

  /* ---------- Text scramble: characters shuffle, then settle left to right ---------- */
  const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}#$%&*+=";
  function scramble(el, text, { chars = SCRAMBLE_CHARS, duration = 600 } = {}) {
    if (reduceMotion || el._scrambling) return;
    // remember the real text the first time, so overlapping triggers always settle on it
    text = el.dataset.final || (el.dataset.final = text);
    el._scrambling = true;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const settled = Math.floor(p * text.length);
      el.textContent = Array.from(text, (c, i) => (i < settled || c === " " ? c : chars[(Math.random() * chars.length) | 0])).join("");
      if (p < 1) requestAnimationFrame(tick);
      else { el.textContent = text; el._scrambling = false; }
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Page loader ----------
   * Progress follows real work (fonts, hero photo, window load) but never finishes before a
   * minimum time, so the animation reads well. Repeat visits in the same tab session get a quick
   * version. Then the curtains split open and the hero plays its intro. */
  function runLoader() {
    const root = document.documentElement;
    const el = document.getElementById("loader");
    if (!el || !root.classList.contains("loading")) {
      if (el) el.remove();
      root.classList.remove("loading");
      return Promise.resolve();
    }
    let quick = false;
    try { quick = sessionStorage.getItem("booted") === "1"; sessionStorage.setItem("booted", "1"); } catch (e) { /* ignore */ }
    const minTime = quick ? 500 : 1700;
    const maxTime = 5000;
    const arc = el.querySelector(".loader-ring-arc");
    const bar = el.querySelector(".loader-bar span");
    const pct = el.querySelector(".loader-pct b");
    const logs = Array.from(el.querySelectorAll(".loader-log li"));
    const steps = [0, 22, 55, 100];

    const imgReady = (img) => new Promise((r) => (!img || img.complete ? r() : (img.addEventListener("load", r, { once: true }), img.addEventListener("error", r, { once: true }))));
    const tasks = [
      document.fonts ? document.fonts.ready : Promise.resolve(),
      imgReady(document.querySelector(".photo-frame img")),
      new Promise((r) => (document.readyState === "complete" ? r() : window.addEventListener("load", r, { once: true }))),
    ];
    let done = 0;
    tasks.forEach((t) => t.then(() => done++, () => done++));

    return new Promise((resolve) => {
      const t0 = performance.now();
      let shown = 0;
      const frame = (now) => {
        const elapsed = now - t0;
        const allDone = done === tasks.length || elapsed > maxTime;
        const cap = allDone ? 1 : 0.3 + 0.6 * (done / tasks.length);
        const target = Math.min(elapsed / minTime, cap) * 100;
        shown += (target - shown) * 0.14;
        if (allDone && elapsed >= minTime && shown > 99.3) shown = 100;
        arc.style.strokeDashoffset = String(100 - shown);
        bar.style.transform = `scaleX(${shown / 100})`;
        pct.textContent = String(Math.round(shown)).padStart(3, "0");
        logs.forEach((li, i) => li.classList.toggle("is-on", shown >= steps[i]));
        if (shown < 100) return requestAnimationFrame(frame);
        finish();
      };
      const finish = async () => {
        await wait(quick ? 80 : 260);
        el.classList.add("is-done");
        await wait(320);
        root.classList.add("intro");
        playIntro();
        resolve();
        await wait(800);
        el.remove();
        root.classList.remove("loading", "intro");
      };
      requestAnimationFrame(frame);
    });
  }

  // Hero entrance, played as the loader curtains open
  function playIntro() {
    const ease = "cubic-bezier(0.2, 0.8, 0.2, 1)";
    $$("[data-intro]").forEach((el, i) => {
      const kind = el.dataset.intro;
      let frames, opts;
      if (kind === "photo") {
        frames = [
          { opacity: 0, transform: "scale(1.08)", clipPath: "inset(14% 14% 14% 14% round 20px)" },
          { opacity: 1, transform: "none", clipPath: "inset(0% 0% 0% 0% round 20px)" },
        ];
        opts = { duration: 1100, delay: 60 };
      } else if (kind === "terminal") {
        frames = [{ opacity: 0, transform: "translate(-36px, 36px) rotate(-3deg)" }, { opacity: 1, transform: "none" }];
        opts = { duration: 900, delay: 520 };
      } else {
        frames = [{ opacity: 0, transform: "translateY(28px)", filter: "blur(8px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }];
        opts = { duration: 760, delay: 40 + i * 85 };
      }
      el.animate(frames, { ...opts, easing: ease, fill: "backwards" });
    });

    // header: logo badge spins in, menu items drop in one by one, numbers and name decode
    const mark = $(".logo-mark");
    if (mark) mark.animate([{ opacity: 0, transform: "rotate(-180deg) scale(0.4)" }, { opacity: 1, transform: "none" }], { duration: 900, delay: 100, easing: "cubic-bezier(0.34, 1.4, 0.5, 1)", fill: "backwards" });
    const name = $(".logo-name");
    if (name) setTimeout(() => scramble(name, name.textContent, { duration: 900 }), 200);
    $$(".nav-menu > a, .nav-end > *").forEach((el, i) => {
      el.animate([{ opacity: 0, transform: "translateY(-16px)" }, { opacity: 1, transform: "none" }], { duration: 600, delay: 180 + i * 60, easing: ease, fill: "backwards" });
      const n = $(".num", el);
      if (n) setTimeout(() => scramble(n, n.textContent, { chars: "0123456789", duration: 500 }), 180 + i * 60);
    });
  }

  /* ---------- Animated background: drifting aurora blobs + a node network that reacts to the pointer ---------- */
  function initBackground() {
    const fx = document.createElement("div");
    fx.className = "bg-fx";
    fx.setAttribute("aria-hidden", "true");
    fx.innerHTML = '<span class="bg-blob bg-blob-1"></span><span class="bg-blob bg-blob-2"></span><span class="bg-blob bg-blob-3"></span>';
    document.body.prepend(fx);
    if (reduceMotion) return;

    const canvas = document.createElement("canvas");
    canvas.id = "bg-net";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    const ctx = canvas.getContext("2d");
    const LINK = 140, MOUSE = 190;
    let w = 0, h = 0, nodes = [], rgb = "239, 83, 80", raf = 0;
    const mouse = { x: -1e4, y: -1e4 };

    const readColor = () => { rgb = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim() || rgb; };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(18, Math.min(70, Math.round((w * h) / 22000)));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.6,
      }));
    };
    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of nodes) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / LINK) * 0.28})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE) {
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - md / MOUSE) * 0.6})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          a.x += (a.x - mouse.x) * 0.006; a.y += (a.y - mouse.y) * 0.006; // drift away from the pointer
        }
        ctx.fillStyle = `rgba(${rgb}, 0.75)`;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(step); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    readColor(); resize(); start();
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
    document.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    document.addEventListener("pointerleave", () => { mouse.x = mouse.y = -1e4; });
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    new MutationObserver(readColor).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  /* ---------- Typewriter: natural typing that "changes content" ----------
   * to(next) deletes only back to the shared prefix, then types the rest with
   * human-like timing (variable per key, slower after spaces/punctuation, the odd hesitation).
   * Calling to() again mid-animation cancels the previous run. */
  function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }
  function createTypewriter(el) {
    let current = el.textContent;
    let run = 0;
    const keyDelay = (ch) => 38 + Math.random() * 62 + (/[\s,.:/-]/.test(ch) ? 70 : 0) + (Math.random() < 0.05 ? 220 : 0);
    return {
      async to(next) {
        const id = ++run;
        if (reduceMotion) { el.textContent = current = next; return; }
        let p = 0;
        while (p < current.length && p < next.length && current[p] === next[p]) p++;
        while (current.length > p) {
          if (id !== run) return;
          current = current.slice(0, -1);
          el.textContent = current;
          await wait(18 + Math.random() * 22);
        }
        if (next.length > p) await wait(140 + Math.random() * 120);
        while (current.length < next.length) {
          if (id !== run) return;
          current = next.slice(0, current.length + 1);
          el.textContent = current;
          await wait(keyDelay(current[current.length - 1]));
        }
      },
    };
  }

  /* ---------- Hero role typewriter ---------- */
  function initTyping() {
    const el = $("#typed");
    if (!el) return;
    const roles = D.roles;
    el.textContent = roles[0];
    if (reduceMotion) return;
    const tw = createTypewriter(el);
    (async () => {
      await pageReady;
      for (let r = 1; ; r = (r + 1) % roles.length) {
        await wait(2200);
        await tw.to(roles[r]);
      }
    })();
  }

  /* ---------- Hero terminal: types commands, reveals output, then keeps changing "scale" ---------- */
  function initTerminal() {
    const term = $("#term");
    if (!term || reduceMotion) return;
    const lines = $$(".t-line, .t-out", term);
    const cmds = $$("[data-type]", term).map((el) => [el, el.textContent]);
    lines.forEach((l) => l.classList.add("t-pending"));
    cmds.forEach(([el]) => (el.textContent = ""));

    const show = (line) => {
      line.classList.remove("t-pending");
      line.animate([{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: 220, easing: "ease-out" });
    };

    (async () => {
      await pageReady;
      await wait(900); // let the terminal slide in first
      for (const line of lines) {
        const cmd = $("[data-type]", line);
        if (cmd) {
          show(line);
          line.classList.add("t-typing");
          await createTypewriter(cmd).to(cmds.find(([el]) => el === cmd)[1]);
          line.classList.remove("t-typing");
          await wait(260);
        } else {
          show(line);
          await wait(line.classList.contains("t-last") ? 0 : 70);
        }
      }
      const scale = $("#term-scale");
      if (!scale) return;
      const values = ["1M+ req/day", "1M+ users/month", "150+ countries", "99.9% uptime SLA", "60% faster checks"];
      const tw = createTypewriter(scale);
      for (let i = 1; ; i = (i + 1) % values.length) {
        await wait(2400);
        scale.parentElement.classList.add("t-changing");
        await tw.to(values[i]);
        scale.parentElement.classList.remove("t-changing");
      }
    })();
  }

  /* ---------- Layout animation (FLIP): animate elements from their old box to their new one ---------- */
  const SPRING = "cubic-bezier(0.22, 1.25, 0.36, 1)";
  function flip(items, mutate) {
    const first = new Map(items.map((el) => [el, el.hidden ? null : el.getBoundingClientRect()]));
    mutate();
    if (reduceMotion) return;
    items.forEach((el, i) => {
      if (el.hidden) return;
      const a = first.get(el);
      const b = el.getBoundingClientRect();
      if (!a) {
        el.animate([{ opacity: 0, transform: "scale(0.94)" }, { opacity: 1, transform: "none" }], { duration: 380, delay: i * 40, easing: "ease-out", fill: "backwards" });
        return;
      }
      const dx = a.left - b.left, dy = a.top - b.top;
      if (dx || dy) el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 560, easing: SPRING });
    });
  }

  // Sliding highlight behind the pressed button of a segmented control (shared-layout style)
  function movePill(group, instant) {
    const pill = $(".seg-pill", group);
    const on = $('[aria-pressed="true"]', group);
    if (!pill || !on) return;
    const g = group.getBoundingClientRect(), r = on.getBoundingClientRect();
    const to = { transform: `translate(${r.left - g.left + group.scrollLeft}px, ${r.top - g.top}px)`, width: `${r.width}px`, height: `${r.height}px` };
    if (instant || reduceMotion || !pill.style.width) Object.assign(pill.style, to);
    else {
      const from = { transform: pill.style.transform, width: pill.style.width, height: pill.style.height };
      Object.assign(pill.style, to);
      pill.animate([from, to], { duration: 420, easing: SPRING });
    }
  }

  /* ---------- Project filter + sort with animated reorder ---------- */
  function initProjectFilters() {
    const grid = $(".project-grid");
    const bar = $(".project-toolbar");
    if (!grid || !bar) return;
    const items = $$(":scope > li", grid);
    const status = $("#project-status");
    let filter = "all", sort = "featured";

    const matches = (li) => filter === "all" || li.dataset.cats.split(" ").includes(filter);
    const order = () =>
      [...items].sort((a, b) => (sort === "az" ? a.dataset.title.localeCompare(b.dataset.title) : a.dataset.index - b.dataset.index));

    const apply = async () => {
      const leaving = items.filter((li) => !li.hidden && !matches(li));
      if (!reduceMotion && leaving.length) {
        const out = Promise.all(
          leaving.map((li) => li.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "scale(0.94)" }], { duration: 180, easing: "ease-in", fill: "forwards" }).finished)
        );
        await Promise.race([out, wait(260)]); // never block the filter on a throttled tab
      }
      flip(items, () => {
        items.forEach((li) => (li.hidden = !matches(li)));
        order().forEach((li) => grid.appendChild(li));
      });
      leaving.forEach((li) => li.getAnimations().forEach((a) => a.cancel()));
      $$(".reveal", grid).forEach((el) => { if (!el.closest("li").hidden) el.classList.add("is-visible"); });
      const n = items.filter((li) => !li.hidden).length;
      if (status) status.textContent = `Showing ${n} project${n === 1 ? "" : "s"}`;
    };

    $$(".seg", bar).forEach((group) => {
      group.addEventListener("click", (e) => {
        const b = e.target.closest(".filter-btn");
        if (!b || b.getAttribute("aria-pressed") === "true") return;
        $$(".filter-btn", group).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        movePill(group);
        if (b.dataset.filter) filter = b.dataset.filter;
        if (b.dataset.sort) sort = b.dataset.sort;
        apply();
      });
      requestAnimationFrame(() => movePill(group, true));
    });
    window.addEventListener("resize", () => $$(".seg", bar).forEach((g) => movePill(g, true)));
  }

  /* ---------- Live GitHub repos (shimmer skeletons until loaded) ---------- */
  async function loadRepos(user) {
    const list = $("#gh-repos");
    if (!list) return;
    const known = new Map((D.openSource.contributions || []).map((c) => [c.repo.split("/").pop().toLowerCase(), c]));
    const fallback = () => [...known.values()].map((c) => ({ name: c.repo.split("/").pop(), url: c.url, description: c.description, stars: 0 }));
    const KEY = `gh-repos:${user}`;
    let repos = null;
    try { repos = JSON.parse(sessionStorage.getItem(KEY) || "null"); } catch (e) { /* ignore */ }
    if (!repos) {
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=pushed`, { headers: { Accept: "application/vnd.github+json" } });
        if (!res.ok) throw new Error(res.status);
        repos = (await res.json())
          .filter((r) => !r.fork && !r.archived)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 6)
          .map((r) => ({
            name: r.name,
            url: r.html_url,
            description: r.description || (known.get(r.name.toLowerCase()) || {}).description || "",
            language: r.language,
            stars: r.stargazers_count,
            updated: r.pushed_at,
          }));
        try { sessionStorage.setItem(KEY, JSON.stringify(repos)); } catch (e) { /* ignore */ }
      } catch (e) {
        repos = fallback();
      }
    }
    if (!repos.length) repos = fallback();
    list.innerHTML = C.RepoCards(repos);
    list.setAttribute("aria-busy", "false");
    if (!reduceMotion) {
      $$(".repo-card", list).forEach((card, i) =>
        card.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 420, delay: i * 70, easing: "ease-out", fill: "backwards" })
      );
    }
  }

  /* ---------- Image skeletons: shimmer until the image inside has loaded ---------- */
  function initImageSkeletons() {
    $$("[data-skeleton]").forEach((box) => {
      const img = $("img", box);
      const done = () => box.classList.remove("is-loading");
      if (!img || (img.complete && img.naturalWidth)) return done();
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const items = $$(".reveal");
    // stagger siblings in the same grid/list so cards cascade in
    items.forEach((el) => {
      const group = el.closest("li") ? el.closest("li").parentElement : el.parentElement;
      const peers = $$(":scope > .reveal, :scope > li > .reveal", group);
      const i = peers.indexOf(el);
      if (i > 0) el.style.transitionDelay = `${Math.min(i, 6) * 90}ms`;
    });
    if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach((el) => el.classList.add("is-visible")); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add("is-visible");
        io.unobserve(el);
        setTimeout(() => (el.style.transitionDelay = ""), 1300); // keep hover effects snappy afterwards
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Case-study table of contents ---------- */
  function initTocHighlight() {
    const links = $$(".case-toc a");
    if (!links.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.hash === `#${en.target.id}`));
      }),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    links.forEach((a) => { const s = document.getElementById(a.hash.slice(1)); if (s) io.observe(s); });
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    const form = $("#contact-form");
    if (!form) return;
    const status = $(".form-status", form);
    const btn = $('button[type="submit"]', form);

    const rules = {
      name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address, e.g. you@company.com."),
      message: (v) => (v.trim().length >= 10 ? "" : "Please add a short message (at least 10 characters)."),
    };
    const check = (field) => {
      const msg = rules[field.name] ? rules[field.name](field.value) : "";
      field.setAttribute("aria-invalid", msg ? "true" : "false");
      $(`#${field.id}-err`).textContent = msg;
      return !msg;
    };
    Object.keys(rules).forEach((n) => form.elements[n].addEventListener("blur", (e) => check(e.target)));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fields = Object.keys(rules).map((n) => form.elements[n]);
      const results = fields.map(check);
      if (results.includes(false)) { fields[results.indexOf(false)].focus(); return; }

      const data = Object.fromEntries(new FormData(form));
      status.className = "form-status";

      if (!D.site.formEndpoint) {
        const subject = encodeURIComponent(`${data.type} — from ${data.name}`);
        const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
        window.location.href = `mailto:${D.site.email}?subject=${subject}&body=${body}`;
        status.classList.add("ok");
        status.textContent = "Opening your email app… If nothing happens, email me directly at " + D.site.email + ".";
        return;
      }

      btn.disabled = true;
      status.textContent = "Sending…";
      try {
        const res = await fetch(D.site.formEndpoint, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(res.statusText);
        form.reset();
        status.classList.add("ok");
        status.textContent = "Thanks! Your message is on its way. " + D.site.responseTime;
      } catch {
        status.classList.add("err");
        status.textContent = "Something went wrong sending your message. Please email me directly at " + D.site.email + ".";
      } finally {
        btn.disabled = false;
      }
    });
  }
})();

/*
 * Portfolio content — edit this file to update the site.
 * Every section on the home page and every case-study page is rendered from these arrays.
 * Leave a value empty ("" / null / []) to hide the matching link or section.
 */
window.PORTFOLIO = {
  site: {
    name: "Hassan Mansoor",
    shortName: "hassan",
    title: "Engineering Lead",
    location: "Lahore, Pakistan",
    email: "ali.haxxan10@gmail.com",
    resume: "assets/Hassan-Mansoor-Resume.pdf",
    photo: "assets/img/hassan-mansoor.jpg",
    // Replace with your deployed URL (also update the <link rel="canonical"> / og tags in the HTML files).
    url: "https://hassan07-dev.github.io",
    // Formspree / Getform endpoint. When empty, the contact form opens the visitor's mail app instead.
    formEndpoint: "",
    responseTime: "I usually reply within 1–2 business days.",
    availability: "Open to full-time, freelance and consulting work · Remote or Lahore",
  },

  social: {
    github: "Hassan07-Dev", // GitHub icon links in the hero and footer
    showOpenSource: false,  // true = show the GitHub section (contribution graph + live repos)
    linkedin: "https://www.linkedin.com/in/hassan26",
    twitter: "",         // e.g. "https://x.com/yourhandle"
  },

  roles: [
    "Engineering Lead",
    "Senior Full Stack Engineer",
    "Full Stack AI Engineer",
  ],

  intro:
    "I design, build and ship scalable, secure web platforms, APIs and payment systems. Right now I lead a team of five on a KYC and identity verification platform that handles 1M+ requests a day across 150+ countries.",

  about: {
    company: "Programmers Force",
    currentRole: "Senior Software Engineer & Team Lead",
    summary: [
      "I'm a back-end engineer with 6+ years building production systems in Laravel (PHP) and Python (Django, Flask, FastAPI). My work spans RegTech (KYC/AML), FinTech, HealthTech and multi-tenant SaaS.",
      "At Programmers Force I lead the team behind a KYC and identity verification platform: I own the technical roadmap, run sprint planning and code reviews, and make architecture calls with product, QA and operations. I also ship Anthropic Claude API features to production, including agentic workflows.",
    ],
    funFact:
      "I started as a PHP intern in February 2020. Five years later I was leading the engineering team, and along the way I was named Programmers Force's “Force of the Month”.",
    stats: [
      { value: "6+", label: "Years shipping production code" },
      { value: "1M+", label: "Requests per day on my current platform" },
      { value: "150+", label: "Countries served" },
      { value: "60%", label: "Faster verification processing" },
    ],
    // Rendered as the stacked “tech stack” visual in the About section.
    stackLayers: [
      { layer: "AI", items: ["Claude API", "Claude Code", "Cursor", "Agentic workflows"] },
      { layer: "Back end", items: ["Laravel", "Django", "Flask", "FastAPI", "Node.js"] },
      { layer: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DynamoDB"] },
      { layer: "Infra", items: ["AWS EC2", "Docker", "Web server", "CI/CD"] },
    ],
  },

  /*
   * Skills. icon: devicon folder/file name (https://devicon.dev); null → text badge.
   * Groups with chips: true render as a compact tag list (concepts and practices rather than tools).
   */
  skills: [
    {
      category: "Core back end",
      items: [
        { name: "Laravel (6 yrs)", icon: "laravel/laravel-original" },
        { name: "PHP 8.x", icon: "php/php-original" },
        { name: "Python", icon: "python/python-original" },
        { name: "REST APIs", icon: null, badge: "{ }" },
        { name: "GraphQL", icon: "graphql/graphql-plain" },
        { name: "Microservices", icon: null, badge: "⧉" },
        { name: "Django", icon: "django/django-plain" },
        { name: "Flask", icon: "flask/flask-original" },
        { name: "FastAPI", icon: "fastapi/fastapi-original" },
        { name: "Node.js", icon: "nodejs/nodejs-original" },
        { name: "CodeIgniter", icon: "codeigniter/codeigniter-plain" },
        { name: "Livewire", icon: "livewire/livewire-original" },
      ],
    },
    {
      category: "Laravel internals",
      chips: true,
      items: [
        { name: "Service Container" },
        { name: "Dependency Injection" },
        { name: "Eloquent ORM" },
        { name: "Middleware" },
        { name: "Queues" },
        { name: "Events" },
        { name: "Request Lifecycle" },
      ],
    },
    {
      category: "AI & LLM integration",
      items: [
        { name: "Anthropic Claude API", icon: null, badge: "AI" },
        { name: "Prompt Engineering", icon: null, badge: "›_" },
        { name: "AI Workflow Automation", icon: null, badge: "↻" },
        { name: "LLM-powered Features", icon: null, badge: "✦" },
      ],
    },
    {
      category: "AI tools",
      items: [
        { name: "Claude Code", icon: null, badge: "✳" },
        { name: "Cursor", icon: null, badge: "⌘" },
        { name: "Antigravity", icon: null, badge: "↟" },
        // add more here, e.g. { name: "GitHub Copilot", icon: null, badge: "Co" },
      ],
    },
    {
      category: "Databases",
      items: [
        { name: "MySQL", icon: "mysql/mysql-original" },
        { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
        { name: "MongoDB", icon: "mongodb/mongodb-original" },
        { name: "Redis (Caching & Queues)", icon: "redis/redis-original" },
        { name: "DynamoDB", icon: "dynamodb/dynamodb-original" },
      ],
    },
    {
      category: "DevOps & tools",
      items: [
        { name: "Docker", icon: "docker/docker-original" },
        { name: "Web Server", icon: null, badge: "www" },
        { name: "Ubuntu / Linux", icon: "ubuntu/ubuntu-original" },
        { name: "Git", icon: "git/git-original" },
        { name: "Git Flow", icon: null, badge: "⎇" },
        { name: "CI/CD Pipelines", icon: "githubactions/githubactions-original" },
        { name: "AWS (EC2)", icon: "amazonwebservices/amazonwebservices-original-wordmark" },
      ],
    },
    {
      category: "Integrations",
      items: [
        { name: "Stripe", icon: null, badge: "S" },
        { name: "PayPal", icon: null, badge: "P" },
        { name: "Third-Party APIs", icon: null, badge: "⇌" },
        { name: "Payment Gateways", icon: null, badge: "$" },
        { name: "Webhooks", icon: null, badge: "⇄" },
      ],
    },
    {
      category: "Front end",
      items: [
        { name: "JavaScript", icon: "javascript/javascript-original" },
        { name: "Vue.js", icon: "vuejs/vuejs-original" },
        { name: "React", icon: "react/react-original" },
        { name: "HTML5", icon: "html5/html5-original" },
        { name: "CSS3", icon: "css3/css3-original" },
        { name: "Bootstrap", icon: "bootstrap/bootstrap-original" },
      ],
    },
    {
      category: "Architecture",
      chips: true,
      items: [
        { name: "SOLID Principles" },
        { name: "Clean Architecture" },
        { name: "Design Patterns" },
        { name: "System Design" },
        { name: "Scalable Architectures" },
      ],
    },
    {
      category: "Testing & quality",
      chips: true,
      items: [
        { name: "PHPUnit" },
        { name: "Pest" },
        { name: "Code Reviews" },
        { name: "Pull Requests" },
        { name: "Best Practices" },
      ],
    },
    {
      category: "Methodologies",
      chips: true,
      items: [
        { name: "Agile / Scrum" },
        { name: "SDLC" },
        { name: "Sprint Planning" },
        { name: "Mentorship" },
        { name: "Team Leadership" },
        { name: "Roadmap Ownership" },
      ],
    },
  ],

  /*
   * Featured projects. Each one gets a card on the home page and a page at projects/<slug>.html.
   * image: path to a real screenshot (16:10, ~1200×750, WebP preferred). null → generated mockup art.
   * stars: GitHub star count for open-source repos, or null.
   */
  projects: [
    {
      slug: "kyc-platform",
      title: "KYC & Identity Verification Platform",
      org: "Programmers Force",
      period: "Oct 2022 – Present",
      role: "Team Lead (since Jan 2025) · Back-end engineer before that",
      summary:
        "Identity verification platform used by 1M+ people a month in 150+ countries. I lead the five-person engineering team and own the technical roadmap.",
      outcome: "Supports a 99.9% uptime SLA at 1M+ requests/day, with verifications 60% faster.",
      tags: ["Laravel", "Python", "PostgreSQL", "Redis", "Docker", "AWS", "Claude API"],
      links: { live: "", repo: "" },
      stars: null,
      image: null,
      accent: "#EF5350",
      categories: ["backend","ai","regtech"],
      glyph: "ID",
      caseStudy: {
        context:
          "The platform verifies identities for businesses and their users worldwide, so it is part of the compliance path for every customer it serves. Uptime, correctness and security are product requirements here, not extras.",
        problem:
          "As traffic grew past 1M requests a day, three issues stood out: the multi-server setup still had single points of failure, verification checks were slower than they needed to be, and the real-time stream that carries verification data had to be hardened against injection attacks.",
        myRole:
          "I joined as a back-end engineer in October 2022, building Laravel and Python (Django, Flask) verification APIs. Since January 2025 I have led a team of five: I own the roadmap and delivery, run sprint planning and code reviews, and make architecture decisions with product, QA and operations.",
        constraints: [
          "A 99.9% uptime SLA, so changes had to ship without downtime",
          "Untrusted input arriving in real time from users in 150+ countries",
          "A regulated (KYC/AML) domain where correctness and auditability matter",
          "Proprietary code, so no public repository",
        ],
        tradeoffs: [
          { choice: "Decentralized architecture over a bigger primary server", why: "More services to deploy and monitor, in exchange for removing single points of failure." },
          { choice: "Rule engine instead of hard-coded checks", why: "One more layer to maintain, but verification rules can change without rewriting flows." },
          { choice: "Parallel third-party calls", why: "Much faster end to end, but every provider call needs its own timeout and failure handling." },
        ],
        architecture: {
          note: "Simplified view. Internal details are omitted.",
          steps: [
            { label: "Client / SDK", sub: "Verification request" },
            { label: "Web server", sub: "Routing & TLS" },
            { label: "API services", sub: "Laravel · Python" },
            { label: "Rule engine", sub: "Per-flow checks" },
            { label: "Parallel checks", sub: "Third-party providers" },
            { label: "Data layer", sub: "PostgreSQL · MongoDB · Redis" },
          ],
        },
        states: null,
        highlights: [
          "Led the migration of the multi-server platform to a decentralized architecture",
          "Hardened real-time KYC stream processing against injection attacks and closed critical security gaps",
          "Integrated Anthropic's Claude API into production: LLM features and agentic workflows",
          "Cut per-verification processing time by 60% with rule engines and parallel API calls",
        ],
        metrics: [
          { value: "1M+", label: "Monthly users" },
          { value: "1M+", label: "Requests per day" },
          { value: "150+", label: "Countries" },
          { value: "99.9%", label: "Uptime SLA supported" },
          { value: "60%", label: "Faster verification" },
          { value: "5", label: "Engineers led" },
        ],
        lessons: [
          "At this scale, security hardening is ongoing work, not a one-off sprint.",
          "Running independent checks in parallel saved more time than optimizing any single check.",
          "Leading a team means turning architecture decisions into work that ships every sprint.",
        ],
      },
    },
    {
      slug: "aml-watcher",
      title: "AML Watcher",
      org: "Programmers Force",
      period: "2025 – Present",
      role: "Engineer on the platform, alongside leading the KYC team",
      summary:
        "AI anti-money-laundering compliance platform that screens people and companies against sanctions, PEP and adverse-media data.",
      outcome: "Helps compliance teams find real risk faster by screening sanctions, PEP and adverse media in one place.",
      tags: ["RegTech", "AML", "Sanctions & PEP", "Adverse media", "AI"],
      links: { live: "https://amlwatcher.com", repo: "" },
      stars: null,
      image: null,
      accent: "#5FBF8A",
      categories: ["ai", "regtech", "backend"],
      glyph: "AML",
      caseStudy: {
        context:
          "AML Watcher is an AI anti-money-laundering compliance platform. Regulated businesses use it to check customers and counterparties against sanctions lists, politically exposed person (PEP) data and adverse media before and during a business relationship.",
        problem:
          "Compliance teams have to screen every customer across many data sources, and each check has to be both accurate and explainable. Too strict and analysts drown in false alerts; too loose and real risk slips through.",
        myRole:
          "I worked on AML Watcher at Programmers Force while leading the team behind the company's KYC and identity verification platform, so I brought the same focus on secure, reliable back-end services to the screening side.",
        constraints: [
          "A regulated domain where every screening decision must be traceable",
          "Names come in many spellings, scripts and transliterations",
          "Data from many sanctions, PEP and media sources, each in its own format",
          "Analysts, not the system, make the final call on a match",
        ],
        tradeoffs: [
          { choice: "Fuzzy matching over exact matching", why: "Catches spelling variants and transliterations, at the cost of more potential matches to review." },
          { choice: "AI to summarise adverse media", why: "Makes reviews much faster, while analysts keep the final decision." },
          { choice: "One screening flow for every list", why: "Sanctions, PEP and media results land in one review instead of three separate tools." },
        ],
        architecture: {
          note: "Simplified view of a screening request.",
          steps: [
            { label: "Customer data", sub: "Person or company" },
            { label: "Screening API", sub: "Request & validation" },
            { label: "List matching", sub: "Sanctions · PEP" },
            { label: "Adverse media", sub: "AI-assisted" },
            { label: "Risk & alerts", sub: "Scored results" },
            { label: "Analyst review", sub: "Decision & audit trail" },
          ],
        },
        states: [
          { title: "Search", detail: "Screen a person or company" },
          { title: "Match results", detail: "Sanctions and PEP hits" },
          { title: "Adverse media", detail: "AI-summarised news" },
          { title: "Case review", detail: "Analyst decision, recorded" },
        ],
        highlights: [
          "Sanctions, PEP and adverse-media screening in one platform",
          "AI-assisted compliance workflows",
          "Built alongside the KYC and identity verification platform",
        ],
        metrics: [],
        lessons: [
          "In compliance, explaining why something matched matters as much as the match itself.",
          "Reducing false positives is often the biggest time saver for analysts.",
        ],
      },
    },
    {
      slug: "facie-ai",
      title: "Facie.ai",
      org: "Programmers Force",
      period: "2025 – Present",
      role: "Built the app",
      summary:
        "Consumer AI app: drop in a photo and get a playful AI read of someone's vibe, ready to share with them.",
      outcome: "A fun consumer AI product with privacy built in: uploads never train models and can be deleted anytime.",
      tags: ["Consumer AI", "Photo analysis", "Web app", "Privacy by design"],
      links: { live: "https://facie.ai", repo: "" },
      stars: null,
      image: null,
      accent: "#F2A65A",
      categories: ["ai", "fullstack"],
      glyph: "F",
      caseStudy: {
        context:
          "Facie is a consumer AI app built for fun and self-reflection. You drop in a photo, get an AI \"vibe read\" of the person in it, and share it with them.",
        problem:
          "A photo-based AI product for consumers has to feel instant and playful, while handling people's photos carefully and never presenting results as more than entertainment.",
        myRole: "I built Facie.ai at Programmers Force.",
        constraints: [
          "People's photos are personal data and need careful handling",
          "Reads are for entertainment and self-reflection, not high-stakes decisions",
          "Consumer users expect results in seconds",
          "Reads are meant only for people who agree to them",
        ],
        tradeoffs: [
          { choice: "Never train on uploaded photos", why: "Gives up reusing user data, in exchange for user trust." },
          { choice: "Delete anytime", why: "Users can remove any read or photo, so storage is temporary by design." },
          { choice: "A playful framing for results", why: "Keeps reads light and shareable, and avoids claims the product shouldn't make." },
        ],
        architecture: {
          note: "Simplified view of a read.",
          steps: [
            { label: "Photo upload", sub: "Web app" },
            { label: "Secure storage", sub: "Deletable anytime" },
            { label: "AI analysis", sub: "Vibe read" },
            { label: "Read & scores", sub: "Traits" },
            { label: "Share", sub: "With the person" },
          ],
        },
        states: [
          { title: "Drop a photo", detail: "Upload in the web app" },
          { title: "Get the read", detail: "AI traits and scores" },
          { title: "Share it", detail: "Send it to the person" },
          { title: "Delete anytime", detail: "Remove a read or photo" },
        ],
        highlights: [
          "Built a consumer AI photo app end to end",
          "Privacy by design: uploads never train models",
          "Reads and photos can be deleted at any time",
        ],
        metrics: [],
        lessons: [
          "With consumer AI, trust features like deletion and no training on uploads are part of the product, not an afterthought.",
        ],
      },
    },
    {
      slug: "fintech-payments",
      title: "FinTech Payments & Wallets",
      org: "Personal project",
      period: "Ongoing",
      role: "Designer & developer",
      summary:
        "Payment gateway integrations with webhook-driven transaction states, ledgers, refunds and retries.",
      outcome: "Payments that stay correct when webhooks arrive late, twice or not at all.",
      tags: ["Laravel", "Stripe", "PayPal", "Webhooks", "PostgreSQL", "Redis"],
      links: { live: "", repo: "" },
      stars: null,
      image: null,
      accent: "#E8B04A",
      categories: ["payments","backend"],
      glyph: "$",
      caseStudy: {
        context:
          "A personal project that builds on payment work I shipped professionally: Stripe and PayPal integrations with webhook-driven transaction states and retry logic.",
        problem:
          "Payment providers confirm results asynchronously. Webhooks can arrive out of order, more than once or not at all, and the app still has to know the exact state of every transaction and every wallet balance.",
        myRole: "I designed and built it end to end.",
        constraints: [
          "Money must never be double-counted or lost",
          "Every provider event may be duplicated or delayed",
          "Refunds and failures must leave a clear audit trail",
        ],
        tradeoffs: [
          { choice: "Webhooks as the source of truth", why: "The app waits for the provider's confirmation instead of trusting the client-side redirect." },
          { choice: "Ledger entries instead of editing balances", why: "More rows to store, but every balance can be rebuilt and audited." },
          { choice: "Automatic retries with limits", why: "Recovers from temporary failures without hammering the provider." },
        ],
        architecture: {
          note: "Simplified view.",
          steps: [
            { label: "Checkout", sub: "Stripe · PayPal" },
            { label: "Webhook receiver", sub: "Verify & de-duplicate" },
            { label: "Transaction states", sub: "State machine" },
            { label: "Ledger", sub: "Wallet balances" },
            { label: "Refunds & retries", sub: "Recovery paths" },
          ],
        },
        states: [
          { title: "Pending", detail: "Payment started, awaiting provider" },
          { title: "Succeeded", detail: "Confirmed by webhook, ledger updated" },
          { title: "Failed → retry", detail: "Retried with limits" },
          { title: "Refunded", detail: "Reversal recorded in the ledger" },
        ],
        highlights: [
          "Stripe and PayPal gateway integrations",
          "Webhook-driven transaction states",
          "Ledgers, refunds and retry logic",
        ],
        metrics: [],
        lessons: [
          "With payments, plan for the unhappy paths (duplicates, delays, failures) first.",
        ],
      },
    },
  ],

  // Filter buttons above the featured grid (key → label). Each project lists its keys in `categories`.
  projectFilters: { backend: "Back end", ai: "AI & LLM", payments: "Payments", regtech: "RegTech", health: "HealthTech", mobile: "Mobile", fullstack: "Full stack" },

  // Shorter entries shown under the featured grid.
  moreProjects: [
    { title: "V.ARIA Health", org: "Coding Pixel", description: "End-to-end telehealth flow: patient questionnaire, checkout, physician dashboard and e-prescriptions.", url: "https://v-ariahealth.com" },
    { title: "Fyfer", org: "Coding Pixel", description: "Back-end APIs plus social and workout-tracking features for an iOS fitness app that connects users with trainers.", url: "https://fyferapp.com" },
    { title: "Claude API & agentic workflows", org: "Programmers Force", description: "Production LLM features and multi-step agent flows.", url: "" },
    { title: "Meal Minion", org: "Tech Andaz", description: "Modules for an all-in-one restaurant SaaS: POS, inventory, online ordering, payroll and accounting.", url: "https://mealminion.com" },
    { title: "Digital IMNCI", org: "Tech Andaz", description: "Contributed to this digital health project.", url: "https://imnci.phcglobal.org" },
  ],

  experience: [
    {
      company: "Programmers Force",
      role: "Senior Software Engineer & Team Lead",
      start: "Jan 2025",
      end: "Present",
      location: "Lahore, Pakistan",
      description:
        "Lead a team of 5 engineers on a KYC and identity verification platform serving 1M+ monthly users in 150+ countries at 1M+ requests/day. Own the roadmap and delivery; led the move to a decentralized architecture supporting a 99.9% uptime SLA; hardened real-time stream processing; ship Claude API features to production.",
      tech: ["Laravel", "Python", "Node.js", "Vue.js", "React", "AWS", "Docker", "Web Server", "PostgreSQL", "MongoDB", "Redis", "Claude API"],
    },
    {
      company: "Programmers Force",
      role: "Software Engineer",
      start: "Oct 2022",
      end: "Dec 2024",
      location: "Lahore, Pakistan",
      description:
        "Built Laravel and Python (Django/Flask) verification APIs and services. Cut per-verification processing time by 60% with rule engines and parallel API calls. Owned features from estimation through delivery.",
      tech: ["Laravel", "Python", "PostgreSQL", "MySQL", "Redis", "Docker", "AWS"],
    },
    {
      company: "Coding Pixel",
      role: "Laravel Back-End Developer",
      start: "Dec 2021",
      end: "Oct 2022",
      location: "Lahore, Pakistan",
      description:
        "Built Laravel applications and secure REST APIs, including Livewire interfaces. Integrated Stripe and PayPal with webhook-driven transaction states and retry logic. Built V.ARIA Health and the Fyfer back end; deployed and managed servers on AWS.",
      tech: ["Laravel", "PHP", "Livewire", "Stripe", "PayPal", "AWS", "Python"],
    },
    {
      company: "Tech Andaz",
      role: "Software Engineer",
      start: "Sep 2020",
      end: "Dec 2021",
      location: "Lahore, Pakistan",
      description:
        "Built server-side features and APIs in PHP, Laravel and CodeIgniter; designed MySQL schemas and refactored legacy code. Worked on Meal Minion and Digital IMNCI.",
      tech: ["PHP", "Laravel", "CodeIgniter", "MySQL", "HTML", "Bootstrap"],
    },
    {
      company: "Tech Andaz",
      role: "PHP/Laravel Developer Intern",
      start: "Feb 2020",
      end: "Aug 2020",
      location: "Lahore, Pakistan",
      description: "Learned PHP and Laravel web development, MySQL and the team's development workflow.",
      tech: ["PHP", "Laravel", "MySQL"],
    },
  ],

  education: {
    degree: "BS Computer Science",
    school: "National College of Business Administration & Economics (NCBA&E)",
    period: "2016 – 2020",
  },

  certifications: [
    { name: "Claude Code in Action", issuer: "Anthropic", date: "Apr 2026" },
    { name: "Vue.js: Working with APIs", issuer: "LinkedIn Learning", date: "Aug 2022" },
    { name: "Learning Vue.js", issuer: "LinkedIn Learning", date: "Jul 2022" },
  ],

  awards: [{ name: "Employee of the Month (“Force of the Month”)", issuer: "Programmers Force" }],

  // Shown only when social.github is set.
  openSource: {
    heading: "Learning in public",
    contributions: [
      // { repo: "owner/repo", description: "What you contributed", url: "https://github.com/owner/repo/pull/1" },
      { repo: "Hassan07-Dev/PHP-Laravel-Mastery", description: "PHP and Laravel course work and practice projects.", url: "https://github.com/Hassan07-Dev/PHP-Laravel-Mastery" },
      { repo: "Hassan07-Dev/Python-Django-FastAPI-Course", description: "Python, Django and FastAPI course work.", url: "https://github.com/Hassan07-Dev/Python-Django-FastAPI-Course" },
      { repo: "Hassan07-Dev/Node-Js-Mastery", description: "Node.js course work and practice projects.", url: "https://github.com/Hassan07-Dev/Node-Js-Mastery" },
      { repo: "Hassan07-Dev/react-course", description: "React course work and practice projects.", url: "https://github.com/Hassan07-Dev/react-course" },
    ],
  },

  // Optional writing section — hidden while empty.
  articles: [
    // { title: "", excerpt: "", date: "2026-01-15", readTime: "6 min read", url: "https://dev.to/..." },
  ],
};

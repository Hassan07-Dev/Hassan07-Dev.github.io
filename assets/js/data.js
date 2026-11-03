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
    github: "Hassan07-Dev", // also enables the Open Source section
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
      "At Programmers Force I lead the team behind a KYC and identity verification platform: I own the technical roadmap, run sprint planning and code reviews, and make architecture calls with product, QA and operations. I also ship Anthropic Claude API features to production, including tool use and agentic workflows.",
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
      { layer: "AI", items: ["Claude API", "Tool use", "Agentic workflows"] },
      { layer: "Back end", items: ["Laravel", "Django", "Flask", "FastAPI", "Node.js"] },
      { layer: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DynamoDB"] },
      { layer: "Infra", items: ["AWS EC2", "Docker", "Nginx", "CI/CD"] },
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
        { name: "Tool Use / Function Calling", icon: null, badge: "fn" },
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
        { name: "Nginx", icon: "nginx/nginx-original" },
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
            { label: "Nginx edge", sub: "Routing & TLS" },
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
          "Integrated Anthropic's Claude API into production: LLM features, tool use and agentic workflows",
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
      slug: "varia-health",
      title: "V.ARIA Health",
      org: "Coding Pixel",
      period: "2021 – 2022",
      role: "Laravel back-end developer",
      summary:
        "End-to-end telehealth flow: patient questionnaire, checkout, physician dashboard and e-prescriptions.",
      outcome: "Took patients from first question to physician-approved prescription in one flow.",
      tags: ["Laravel", "Livewire", "REST APIs", "Bootstrap", "AWS"],
      links: { live: "https://v-ariahealth.com", repo: "" },
      stars: null,
      image: null,
      accent: "#5FBF8A",
      categories: ["health","fullstack"],
      glyph: "Rx",
      caseStudy: {
        context:
          "V.ARIA Health is a telehealth service where patients complete an online assessment, pay, and get reviewed by a physician who can issue a prescription.",
        problem:
          "Patients, payments and physicians each needed their own step, and the whole journey had to work as one flow. A prescription must never go out without a completed questionnaire, a successful checkout and a physician's approval.",
        myRole:
          "At Coding Pixel I built the end-to-end flow in Laravel: the patient questionnaire, checkout, the physician dashboard and e-prescriptions, with Livewire and Bootstrap on the interface side. I deployed and managed it on AWS.",
        constraints: [
          "Sensitive patient health data at every step",
          "Strict ordering: questionnaire → payment → physician review → prescription",
          "Two very different users: patients on the public side, physicians in a dashboard",
        ],
        tradeoffs: [
          { choice: "Livewire for interactive screens", why: "Kept the questionnaire and dashboard in one Laravel codebase instead of adding a separate SPA." },
          { choice: "Explicit status per consultation", why: "Each case moves through clear states, so the dashboard and prescriptions can trust where it is." },
        ],
        architecture: {
          note: "Simplified view of the patient journey.",
          steps: [
            { label: "Questionnaire", sub: "Patient intake" },
            { label: "Checkout", sub: "Payment" },
            { label: "Physician dashboard", sub: "Review & decision" },
            { label: "E-prescription", sub: "Issued to patient" },
          ],
        },
        states: [
          { title: "Patient questionnaire", detail: "Step-by-step medical intake" },
          { title: "Checkout", detail: "Payment before review" },
          { title: "Physician dashboard", detail: "Queue of cases to review" },
          { title: "E-prescription", detail: "Issued after approval" },
        ],
        highlights: [
          "Built the full patient-to-prescription flow end to end",
          "Physician dashboard for reviewing and approving cases",
          "Deployed and managed on AWS",
        ],
        metrics: [],
        lessons: [
          "In healthcare, the order of steps is itself a rule the system has to enforce.",
          "Designing for two audiences means two very different interfaces sharing one source of truth.",
        ],
      },
    },
    {
      slug: "fyfer",
      title: "Fyfer",
      org: "Coding Pixel",
      period: "2021 – 2022",
      role: "Back-end developer",
      summary:
        "Back-end APIs plus social and workout-tracking features for an iOS fitness app that connects users with trainers.",
      outcome: "Gave the iOS app one API for workouts, social features and trainer connections.",
      tags: ["Laravel", "PHP", "REST APIs", "AWS"],
      links: { live: "https://fyferapp.com", repo: "" },
      stars: null,
      image: null,
      accent: "#F2A65A",
      categories: ["mobile","backend"],
      glyph: "Fy",
      caseStudy: {
        context:
          "Fyfer is an iOS fitness app where people track workouts, follow each other and connect with personal trainers.",
        problem:
          "The mobile app needed a back end that could handle workout logging, a social layer and trainer connections, behind an API the iOS client could rely on release after release.",
        myRole:
          "I built the back end at Coding Pixel: the REST APIs used by the iOS app, plus the social and workout-tracking features.",
        constraints: [
          "Mobile clients that can't be updated instantly, so the API has to stay backward compatible",
          "Social features that need to stay fast as follow graphs grow",
          "Two user types: regular members and trainers",
        ],
        tradeoffs: [
          { choice: "One REST API for all app features", why: "A single contract for the iOS team, at the cost of careful versioning when features change." },
        ],
        architecture: {
          note: "Simplified view.",
          steps: [
            { label: "iOS app", sub: "Members & trainers" },
            { label: "REST API", sub: "Laravel" },
            { label: "Features", sub: "Workouts · Social · Trainers" },
            { label: "Database", sub: "Persistent storage" },
          ],
        },
        states: [
          { title: "Workout tracking", detail: "Log sessions and progress" },
          { title: "Social", detail: "Follow and interact with others" },
          { title: "Trainers", detail: "Find and connect with a trainer" },
        ],
        highlights: [
          "Back-end APIs for the iOS app",
          "Social and workout-tracking features",
          "Trainer–user connections",
        ],
        metrics: [],
        lessons: [
          "With a mobile client, the API contract is the product: breaking changes cost a full app release.",
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
    { title: "Facie.ai", org: "Programmers Force", description: "Built this consumer AI photo app.", url: "https://facie.ai" },
    { title: "AML Watcher", org: "Programmers Force", description: "AI anti-money-laundering compliance platform: sanctions, PEP and adverse media screening.", url: "https://amlwatcher.com" },
    { title: "Claude API & agentic workflows", org: "Programmers Force", description: "Production LLM features with tool use and multi-step agent flows.", url: "" },
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
      tech: ["Laravel", "Python", "Node.js", "Vue.js", "React", "AWS", "Docker", "Nginx", "PostgreSQL", "MongoDB", "Redis", "Claude API"],
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

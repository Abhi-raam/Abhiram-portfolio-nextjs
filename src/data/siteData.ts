/**
 * ==============================================================================
 * CENTRAL WEBSITE CONTENT & CONFIGURATION
 * ==============================================================================
 * Abhiram Suresh — Frontend Developer
 * ==============================================================================
 */

// -----------------------------------------------------------------------------
// 1. NAVBAR & HEADER
// -----------------------------------------------------------------------------
export const NAVBAR_DATA = {
  wordmark: {
    ghostLetter: "A",
    restOfName: "bhiram.",
  },

  links: [
    { label: "Home", href: "#home" },
    { label: "About Me", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],

  socials: [
    {
      label: "GitHub",
      glyph: "GH",
      href: "https://github.com/Abhi-raam",
    },
    {
      label: "LinkedIn",
      glyph: "in",
      href: "https://www.linkedin.com/in/abhiram-suresh",
    },
    {
      label: "Contact",
      href: "#contact",
      isEmailIcon: true,
    },
  ],
};

// -----------------------------------------------------------------------------
// 2. HERO SECTION
// -----------------------------------------------------------------------------
export const HERO_DATA = {
  ariaLabel: "ENGINEERING THE FUTURE",

  headlineWords: [
    // Line 1: ENGINEERING
    [
      [
        { char: "E", ghost: true },
        { char: "N", ghost: false },
        { char: "G", ghost: false },
        { char: "I", ghost: true },
        { char: "N", ghost: false },
        { char: "E", ghost: false },
        { char: "E", ghost: false },
        { char: "R", ghost: false },
        { char: "I", ghost: true },
        { char: "N", ghost: false },
        { char: "G", ghost: false },
      ],
    ],

    // Line 2: THE FUTURE
    [
      [
        { char: "T", ghost: false },
        { char: "H", ghost: true },
        { char: "E", ghost: false },
      ],
      [
        { char: "F", ghost: false },
        { char: "U", ghost: false },
        { char: "T", ghost: true },
        { char: "U", ghost: false },
        { char: "R", ghost: false },
        { char: "E", ghost: true },
      ],
    ],
  ],

  portrait: {
    src: "/portrait-v2.png",
    alt: "Abhiram Suresh",
  },

  leftRail: {
    estText: "Frontend Developer · 2+ Years",
    ctaHref: "#about",
    ctaAriaLabel: "Scroll to about",
  },

  rightRail: {
    lede: "I build responsive, user-centric web applications using React.js, Next.js, TypeScript, and modern frontend technologies.",
    disciplines: ["React.js", "Next.js", "TypeScript", "REST APIs"],
    role: "Frontend Developer",
  },
};

// -----------------------------------------------------------------------------
// 3. ABOUT SECTION
// -----------------------------------------------------------------------------
export const ABOUT_DATA = {
  titleLetters: [
    { text: "A", ghost: false },
    { text: "B", ghost: true },
    { text: "O", ghost: false },
    { text: "U", ghost: true },
    { text: "T", ghost: false },
  ],

  quote:
    "“Frontend Developer with 2+ years of experience building responsive, user-centric web applications using React.js, Recoil, and SWR.”",

  ctaHref: "#contact",

  stats: [
    { value: "2", suffix: "+", label: "Years Experience" },
    { value: "6", suffix: "", label: "Featured Projects" },
    { value: "2", suffix: "", label: "Professional Roles" },
  ],
};

// -----------------------------------------------------------------------------
// 4. WORK EXPERIENCE
// -----------------------------------------------------------------------------
export const EXPERIENCE_DATA = {
  titleLetters: [
    [
      { text: "W", ghost: false },
      { text: "O", ghost: false },
      { text: "R", ghost: true },
      { text: "K", ghost: false },
    ],
    [
      { text: "E", ghost: true },
      { text: "X", ghost: false },
      { text: "P", ghost: false },
      { text: "E", ghost: true },
      { text: "R", ghost: false },
      { text: "I", ghost: false },
      { text: "E", ghost: true },
      { text: "N", ghost: false },
      { text: "C", ghost: true },
      { text: "E", ghost: false },
    ],
  ],

  lede: "My professional experience includes building responsive web applications, management dashboards, and websites while collaborating with backend and cross-functional teams.",

  roles: [
    {
      period: "09 DEC 2024 — PRESENT",
      isCurrent: true,
      role: "Software Engineer",
      company: "Webandcrafts",
      type: "Full-Time",
      location: "Kerala, India",
      description:
        "Contributing to frontend development of web applications using React.js, Redux, TanStack Query, and Tailwind CSS, while integrating REST APIs and collaborating with backend teams.",
      highlights: [
        "Developing responsive and user-centric web interfaces using React.js and modern frontend technologies.",
        "Working with Redux and TanStack Query for state management and efficient data fetching.",
        "Collaborating with Python and PHP backend teams for REST API integration and feature delivery.",
        "Maintaining clean, scalable, and reusable frontend code with a focus on usability and performance.",
        "Working closely with cross-functional teams in an Agile development environment.",
      ],
      tech: [
        "React.js",
        "Redux",
        "TanStack Query",
        "Tailwind CSS",
        "REST APIs",
        "Git",
      ],
    },
    {
      period: "10 JAN 2024 — 30 NOV 2024",
      isCurrent: false,
      role: "MERN Stack Developer",
      company: "Zyfarer Innovations",
      type: "Full-Time",
      location: "Kerala, India",
      description:
        "Developed a high-performance management dashboard using React, Vite, and Tailwind CSS with a fully responsive user interface.",
      highlights: [
        "Developed responsive management dashboard interfaces using React, Vite, and Tailwind CSS.",
        "Implemented Recoil and Jotai for state management and SWR for optimized data fetching.",
        "Collaborated with Python and PHP backend teams to integrate REST APIs.",
        "Focused on reusable components, maintainable code, and application usability.",
      ],
      tech: [
        "React.js",
        "Vite",
        "Tailwind CSS",
        "Recoil",
        "Jotai",
        "SWR",
        "REST APIs",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// 5. FEATURED PROJECTS
// -----------------------------------------------------------------------------
export const PROJECTS_DATA = {
  titleLetters: [
    [
      { text: "M", ghost: false },
      { text: "Y", ghost: true },
    ],
    [
      { text: "P", ghost: false },
      { text: "R", ghost: false },
      { text: "O", ghost: true },
      { text: "J", ghost: false },
      { text: "E", ghost: true },
      { text: "C", ghost: true },
      { text: "T", ghost: true },
    ],
  ],

  categories: [
    { key: "client", label: "CLIENT WORK" },
    { key: "products", label: "OWN / PERSONAL PROJECTS" },
  ],

  items: {
    client: [
      {
        index: "01",
        category: "FINTECH & DASHBOARD",
        titlePrefix: "Manage Your ",
        titleGhost: "Finances",
        shots: [
          {
            src: "/screenshots/finance-os-desktop.png",
            alt: "FinanceOS personal finance management dashboard",
          },
          {
            src: "/screenshots/finance-os-mobile.png",
            alt: "FinanceOS personal finance tracking interface",
          },
        ],
        namePrefix: "Finance",
        nameGhost: "OS",
        title: "FinanceOS",
        desc: "Personal finance management · Budgeting, expenses & financial planning",
        href: "https://finance-os-next-nu.vercel.app/",
        tech: ["Next.js", "Tailwind CSS", "TypeScript", "Recharts"],
      },
      {
        index: "02",
        category: "PWA & PRODUCTIVITY",
        titlePrefix: "Calculate Your ",
        titleGhost: "Scores",
        shots: [
          {
            src: "/screenshots/scoreMate.png",
            alt: "ScoreMate GPA calculator",
          },
          {
            src: "/screenshots/scoremate-mobile.png",
            alt: "ScoreMate GPA calculator mobile",
          },
        ],
        namePrefix: "Score",
        nameGhost: "Mate",
        title: "ScoreMate",
        desc: "PWA · GPA, CGPA & Percentage Calculator",
        href: "https://github.com/Abhi-raam",
        github: "https://github.com/Abhi-raam",
        tech: ["React.js", "PWA", "Tailwind CSS", "Vite"],
      },
      {
        index: "03",
        category: "HOSPITALITY & RESORT",
        titlePrefix: "A Resort ",
        titleGhost: "Experience",
        shots: [
          {
            src: "/screenshots/windsorvale-full.png",
            alt: "Windsorvale Resort website homepage",
          },
          {
            src: "/screenshots/windsorvale-full-mobile.png",
            alt: "Windsorvale Resort website",
          },
        ],
        namePrefix: "Windsor",
        nameGhost: "vale",
        title: "Windsorvale",
        desc: "Resort website · Next.js + Tailwind CSS + Sanity",
        href: "https://windsorvale.vercel.app/",
        tech: ["Next.js", "Tailwind CSS", "Sanity CMS", "Framer Motion"],
      },
      {
        index: "04",
        category: "EDUCATION & ACADEMICS",
        titlePrefix: "A Modern ",
        titleGhost: "School Website",
        shots: [
          {
            src: "/screenshots/cjems-desktop.png",
            alt: "CJEMS school website homepage",
          },
          {
            src: "/screenshots/cjems-mobile.png",
            alt: "CJEMS school website",
          },
        ],
        namePrefix: "CJEMS ",
        nameGhost: "School",
        title: "CJEMS School",
        desc: "School website · Next.js · Responsive UI",
        href: "https://cjems.vercel.app/",
        tech: ["Next.js", "Tailwind CSS", "TypeScript", "Responsive UI"],
      },
      {
        index: "05",
        category: "FITNESS & SPORTS",
        titlePrefix: "Train. Fight. ",
        titleGhost: "Transform.",
        shots: [
          {
            src: "/screenshots/ifc-desktop.png",
            alt: "Immortals Fight and Fitness Club website",
          },
          {
            src: "/screenshots/ifc-mobile.png",
            alt: "Immortals Fight and Fitness Club website",
          },
        ],
        namePrefix: "Immortals ",
        nameGhost: "Fitness Club",
        title: "Immortals Fitness Club",
        desc: "Gym website · Next.js · Responsive UI",
        href: "https://ifc-website.vercel.app/",
        tech: ["Next.js", "Tailwind CSS", "React", "Lucide Icons"],
      },
      {
        index: "06",
        category: "WEDDING & EVENT",
        titlePrefix: "A Beautiful ",
        titleGhost: "Wedding Invitation",
        shots: [
          {
            src: "/screenshots/shahul-weds-jabeen-1.png",
            alt: "Shahul weds Jabeen wedding invitation website",
          },
          {
            src: "/screenshots/shahul-weds-jabeen-2.png",
            alt: "Shahul weds Jabeen wedding invitation website",
          },
        ],
        namePrefix: "Shahul Weds ",
        nameGhost: "Jabeen",
        title: "Shahul Weds Jabeen",
        desc: "Wedding invitation website · Interactive & responsive experience",
        href: "https://shahul-weds-jabeen.vercel.app/",
        tech: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
      },
    ],

    products: [
      {
        index: "01",
        category: "FINTECH & DASHBOARD",
        titlePrefix: "Manage Your ",
        titleGhost: "Finances",
        shots: [
          {
            src: "/screenshots/finance-os-desktop.png",
            alt: "FinanceOS personal finance management dashboard",
          },
          {
            src: "/screenshots/finance-os-mobile.png",
            alt: "FinanceOS personal finance tracking interface",
          },
        ],
        namePrefix: "Finance",
        nameGhost: "OS",
        title: "FinanceOS",
        desc: "Personal finance management · Budgeting, expenses & financial planning",
        href: "https://finance-os-next-nu.vercel.app/",
        tech: ["Next.js", "Tailwind CSS", "TypeScript", "Recharts"],
      },
      {
        index: "02",
        category: "PWA & PRODUCTIVITY",
        titlePrefix: "Calculate Your ",
        titleGhost: "Scores",
        shots: [
          {
            src: "/screenshots/scoreMate.png",
            alt: "ScoreMate GPA calculator",
          },
          {
            src: "/screenshots/scoremate-mobile.png",
            alt: "ScoreMate GPA calculator mobile",
          },
        ],
        namePrefix: "Score",
        nameGhost: "Mate",
        title: "ScoreMate",
        desc: "PWA · GPA, CGPA & Percentage Calculator",
        href: "https://github.com/Abhi-raam",
        github: "https://github.com/Abhi-raam",
        tech: ["React.js", "PWA", "Tailwind CSS", "Vite"],
      },
    ],
  },
};

// -----------------------------------------------------------------------------
// 6. SERVICES SECTION
// -----------------------------------------------------------------------------
export const SERVICES_DATA = {
  titleLines: [
    // Line 1: AREAS OF
    [
      [
        { char: "A", ghost: false },
        { char: "R", ghost: true },
        { char: "E", ghost: false },
        { char: "A", ghost: false },
        { char: "S", ghost: true },
      ],
      [
        { char: "O", ghost: false },
        { char: "F", ghost: true },
      ],
    ],

    // Line 2: EXPERTISE
    [
      [
        { char: "E", ghost: false },
        { char: "X", ghost: true },
        { char: "P", ghost: false },
        { char: "E", ghost: false },
        { char: "R", ghost: true },
        { char: "T", ghost: false },
        { char: "I", ghost: false },
        { char: "S", ghost: true },
        { char: "E", ghost: false },
      ],
    ],
  ],

  lede:
    "I build responsive, user-centric web experiences with modern frontend technologies, focusing on clean code, reusable components, usability, and performance.",

  items: [
    {
      number: "01",
      category: "FRONTEND",
      titlePrefix: "FRONTEND ",
      titleGhost: "DEVELOPMENT",
      name: "Frontend Development",
      description:
        "RESPONSIVE AND USER-CENTRIC WEB INTERFACES BUILT WITH MODERN FRONTEND TECHNOLOGIES, REUSABLE COMPONENTS, AND A STRONG FOCUS ON USABILITY AND MAINTAINABILITY.",
      chips: [
        { label: "REACT.JS", featured: true },
        { label: "JAVASCRIPT" },
        { label: "TYPESCRIPT" },
        { label: "TAILWIND CSS" },
        { label: "BOOTSTRAP" },
      ],
      layout: "wide",
      href: "#contact",
    },
    {
      number: "02",
      category: "APPLICATIONS",
      titlePrefix: "REACT & NEXT.JS ",
      titleGhost: "DEVELOPMENT",
      name: "React & Next.js Development",
      description:
        "MODERN WEB APPLICATIONS DEVELOPED WITH REACT.JS AND NEXT.JS, USING REUSABLE COMPONENTS, STRUCTURED STATE MANAGEMENT, AND RESPONSIVE UI PATTERNS.",
      chips: [
        { label: "REACT.JS", featured: true },
        { label: "NEXT.JS" },
        { label: "TYPESCRIPT" },
        { label: "REUSABLE COMPONENTS" },
        { label: "RESPONSIVE UI" },
      ],
      layout: "wide",
      href: "#contact",
    },
    {
      number: "03",
      category: "INTEGRATION",
      titlePrefix: "REST API ",
      titleGhost: "INTEGRATION",
      name: "REST API Integration",
      description:
        "DATA-DRIVEN FRONTEND APPLICATIONS CONNECTED TO REST APIS WITH EFFICIENT DATA FETCHING, ERROR HANDLING, AND SMOOTH COLLABORATION WITH BACKEND TEAMS.",
      chips: [
        { label: "REST APIS", featured: true },
        { label: "SWR" },
        { label: "TANSTACK QUERY" },
        { label: "DATA FETCHING" },
        { label: "API INTEGRATION" },
      ],
      layout: "compact",
      href: "#contact",
    },
    {
      number: "04",
      category: "RESPONSIVE WEB",
      titlePrefix: "WEBSITE ",
      titleGhost: "DEVELOPMENT",
      name: "Responsive Website Development",
      description:
        "MODERN, MOBILE-FIRST WEBSITES FOR BUSINESSES, RESORTS, EDUCATIONAL INSTITUTIONS, FITNESS BRANDS, AND OTHER DIGITAL EXPERIENCES.",
      chips: [
        { label: "NEXT.JS", featured: true },
        { label: "TAILWIND CSS" },
        { label: "RESPONSIVE DESIGN" },
        { label: "CROSS-DEVICE UI" },
        { label: "SANITY CMS" },
      ],
      layout: "compact",
      href: "#contact",
    },
    {
      number: "05",
      category: "PROGRESSIVE WEB",
      titlePrefix: "PWA ",
      titleGhost: "DEVELOPMENT",
      name: "Progressive Web Apps",
      description:
        "INSTALLABLE AND RESPONSIVE WEB APPLICATIONS WITH OFFLINE SUPPORT AND A MOBILE-FIRST EXPERIENCE FOR PRACTICAL EVERYDAY USE CASES.",
      chips: [
        { label: "REACT", featured: true },
        { label: "VITE" },
        { label: "PWA" },
        { label: "OFFLINE SUPPORT" },
        { label: "TAILWIND CSS" },
      ],
      layout: "compact",
      href: "#contact",
    },
  ],
};

// -----------------------------------------------------------------------------
// 7. CONTACT & FOOTER SECTION
// -----------------------------------------------------------------------------
export const CONTACT_DATA = {
  headlineLetters: [
    [
      { text: "L", ghost: true },
      { text: "E", ghost: false },
      { text: "T", ghost: false },
      { text: "'", ghost: false },
      { text: "S", ghost: false },
    ],
    [
      { text: "T", ghost: false },
      { text: "A", ghost: false },
      { text: "L", ghost: true },
      { text: "K", ghost: true },
    ],
  ],

  scatterKeywords: [
    { name: "React.js", left: "26%", top: "9%" },
    { name: "Next.js", left: "60%", top: "11%" },
    { name: "TypeScript", left: "82%", top: "15%" },
    { name: "Tailwind CSS", left: "10%", top: "20%" },
    { name: "JavaScript", left: "44%", top: "17%" },
    { name: "Git", left: "68%", top: "21%" },
  ],

  availability: {
    status: "Open to Opportunities",
    subtext: "Full-time Roles & Freelance Projects",
    location: "Kottayam, Kerala, India",
  },

  channels: [
    {
      id: "email",
      type: "email",
      label: "Email",
      value: "iabhiramsuresh@gmail.com",
      displayValue: "iabhiramsuresh@gmail.com",
      tag: "Direct Inbox",
      title: "Send an Email",
      description:
        "Reach out for project inquiries, opportunities, or collaborations.",
      href: "mailto:iabhiramsuresh@gmail.com",
      actionLabel: "Write Email",
      featured: true,
    },
    {
      id: "whatsapp",
      type: "whatsapp",
      label: "WhatsApp",
      value: "+91 8156806105",
      displayValue: "+91 8156806105",
      tag: "Instant Chat",
      title: "Quick WhatsApp Message",
      description:
        "Reach out directly on WhatsApp for project inquiries and quick conversations.",
      href: "https://wa.me/918156806105",
      actionLabel: "Open Chat",
      featured: false,
    },
    {
      id: "linkedin",
      type: "linkedin",
      label: "LinkedIn",
      value: "abhiram-suresh",
      displayValue: "/in/abhiram-suresh",
      tag: "Professional",
      title: "Connect on LinkedIn",
      description:
        "Connect with me professionally and explore my experience and projects.",
      href: "https://www.linkedin.com/in/abhiram-suresh",
      actionLabel: "View Profile",
      featured: false,
    },
    {
      id: "github",
      type: "github",
      label: "GitHub",
      value: "Abhi-raam",
      displayValue: "@Abhi-raam",
      tag: "Code",
      title: "Explore GitHub Code",
      description: "Browse my repositories, projects, and development work.",
      href: "https://github.com/Abhi-raam",
      actionLabel: "View GitHub",
      featured: false,
    },
  ],

  socialLinks: [
    {
      label: "GitHub",
      href: "https://github.com/Abhi-raam",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abhiram-suresh",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/918156806105",
    },
    {
      label: "Email",
      href: "mailto:iabhiramsuresh@gmail.com",
    },
  ],

  legal: {
    copyright: "© Abhiram Suresh. All rights reserved",
    credit: "Built by Abhiram Suresh",
  },
};

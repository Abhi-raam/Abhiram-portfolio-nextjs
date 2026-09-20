const { createClient } = require("@sanity/client");
const fs = require("fs");
const path = require("path");

// 1. Load env variables from .env.local manually
let env = {};
try {
  const envPath = path.join(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let value = match[2] ? match[2].trim() : "";
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        env[match[1]] = value;
      }
    });
  }
} catch (err) {
  console.error("Warning: Failed to load .env.local file", err);
}

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID is missing in .env.local");
  process.exit(1);
}

if (!token) {
  console.error("❌ Error: SANITY_API_WRITE_TOKEN is missing in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-06-09",
  useCdn: false,
});

async function uploadImageAsset(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Warning: Image file not found at ${filePath}, skipping upload.`);
    return null;
  }
  try {
    const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
      filename: path.basename(filePath),
    });
    console.log(`✅ Uploaded image: ${path.basename(filePath)} (${asset._id})`);
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.error(`❌ Error uploading image ${filePath}:`, err.message);
    return null;
  }
}

async function seed() {
  console.log("🚀 Starting database seeding to Sanity CMS for UI Revamp...");

  // A. Upload Media Assets
  console.log("🖼️ Uploading media assets...");
  const portraitImage = await uploadImageAsset(path.join(__dirname, "../public/portrait-v2.png"));
  
  // Screenshots
  const financeDesktop = await uploadImageAsset(path.join(__dirname, "../public/screenshots/finance-os-desktop.png"));
  const financeMobile = await uploadImageAsset(path.join(__dirname, "../public/screenshots/finance-os-mobile.png"));
  
  const scoremateDesktop = await uploadImageAsset(path.join(__dirname, "../public/screenshots/scoreMate.png"));
  const scoremateMobile = await uploadImageAsset(path.join(__dirname, "../public/screenshots/scoremate-mobile.png"));
  
  const windsorDesktop = await uploadImageAsset(path.join(__dirname, "../public/screenshots/windsorvale-full.png"));
  const windsorMobile = await uploadImageAsset(path.join(__dirname, "../public/screenshots/windsorvale-full-mobile.png"));
  
  const cjemsDesktop = await uploadImageAsset(path.join(__dirname, "../public/screenshots/cjems-desktop.png"));
  const cjemsMobile = await uploadImageAsset(path.join(__dirname, "../public/screenshots/cjems-mobile.png"));
  
  const ifcDesktop = await uploadImageAsset(path.join(__dirname, "../public/screenshots/ifc-desktop.png"));
  const ifcMobile = await uploadImageAsset(path.join(__dirname, "../public/screenshots/ifc-mobile.png"));
  
  const shahul1 = await uploadImageAsset(path.join(__dirname, "../public/screenshots/shahul-weds-jabeen-1.png"));
  const shahul2 = await uploadImageAsset(path.join(__dirname, "../public/screenshots/shahul-weds-jabeen-2.png"));

  // B. Seed Profile Singleton
  console.log("📝 Seeding Profile & Settings Document...");
  const profileDoc = {
    _type: "profile",
    _id: "profile",
    name: "Abhiram Suresh",
    title: "Frontend Developer",
    headlineWord1: "ENGINEERING",
    headlineWord2: "THE FUTURE",
    estText: "Frontend Developer · 2+ Years",
    heroLede: "I build responsive, user-centric web applications using React.js, Next.js, TypeScript, and modern frontend technologies.",
    disciplines: ["React.js", "Next.js", "TypeScript", "REST APIs"],
    heroRole: "Frontend Developer",
    aboutQuote: "“Frontend Developer with 2+ years of experience building responsive, user-centric web applications using React.js, Recoil, and SWR.”",
    bio1: "Frontend Developer with 2+ years of experience building responsive, user-centric web applications using React.js, Recoil, and SWR.",
    bio2: "Contributing to frontend development of modern applications, dashboards, and responsive web platforms with a focus on usability and performance.",
    stats: [
      { _key: "s1", value: "2", suffix: "+", label: "Years Experience" },
      { _key: "s2", value: "6", suffix: "", label: "Featured Projects" },
      { _key: "s3", value: "2", suffix: "", label: "Professional Roles" },
    ],
    email: "iabhiramsuresh@gmail.com",
    mobile: "+91 8156806105",
    linkedin: "https://www.linkedin.com/in/abhiram-suresh",
    github: "https://github.com/Abhi-raam",
    location: "Kottayam, Kerala, India",
    availabilityStatus: "Open to Opportunities",
    availabilityLocation: "Kottayam, Kerala, India",
    scatterKeywords: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "Git"],
    channels: [
      {
        _key: "ch-email",
        id: "email",
        type: "email",
        label: "Email",
        value: "iabhiramsuresh@gmail.com",
        displayValue: "iabhiramsuresh@gmail.com",
        tag: "Direct Inbox",
        title: "Send an Email",
        description: "Reach out for project inquiries, opportunities, or collaborations.",
        href: "mailto:iabhiramsuresh@gmail.com",
        actionLabel: "Write Email",
        featured: true,
      },
      {
        _key: "ch-whatsapp",
        id: "whatsapp",
        type: "whatsapp",
        label: "WhatsApp",
        value: "+91 8156806105",
        displayValue: "+91 8156806105",
        tag: "Instant Chat",
        title: "Quick WhatsApp Message",
        description: "Reach out directly on WhatsApp for project inquiries and quick conversations.",
        href: "https://wa.me/918156806105",
        actionLabel: "Open Chat",
        featured: false,
      },
      {
        _key: "ch-linkedin",
        id: "linkedin",
        type: "linkedin",
        label: "LinkedIn",
        value: "abhiram-suresh",
        displayValue: "/in/abhiram-suresh",
        tag: "Professional",
        title: "Connect on LinkedIn",
        description: "Connect with me professionally and explore my experience and projects.",
        href: "https://www.linkedin.com/in/abhiram-suresh",
        actionLabel: "View Profile",
        featured: false,
      },
      {
        _key: "ch-github",
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
    legalCopyright: "© Abhiram Suresh. All rights reserved",
    legalCredit: "Built by Abhiram Suresh",
  };

  if (portraitImage) {
    profileDoc.image = portraitImage;
  }

  await client.createOrReplace(profileDoc);
  console.log("✅ Profile document seeded.");

  // C. Seed Experiences
  console.log("💼 Seeding Career Experiences...");
  const experiences = [
    {
      _type: "experience",
      _id: "exp-webandcrafts",
      role: "Software Engineer",
      company: "Webandcrafts",
      period: "09 DEC 2024 — PRESENT",
      isCurrent: true,
      type: "Full-Time",
      location: "Kerala, India",
      description: "Contributing to frontend development of web applications using React.js, Redux, TanStack Query, and Tailwind CSS, while integrating REST APIs and collaborating with backend teams.",
      highlights: [
        "Developing responsive and user-centric web interfaces using React.js and modern frontend technologies.",
        "Working with Redux and TanStack Query for state management and efficient data fetching.",
        "Collaborating with Python and PHP backend teams for REST API integration and feature delivery.",
        "Maintaining clean, scalable, and reusable frontend code with a focus on usability and performance.",
        "Working closely with cross-functional teams in an Agile development environment.",
      ],
      tech: ["React.js", "Redux", "TanStack Query", "Tailwind CSS", "REST APIs", "Git"],
      order: 1,
    },
    {
      _type: "experience",
      _id: "exp-zyfarer",
      role: "MERN Stack Developer",
      company: "Zyfarer Innovations",
      period: "10 JAN 2024 — 30 NOV 2024",
      isCurrent: false,
      type: "Full-Time",
      location: "Kerala, India",
      description: "Developed a high-performance management dashboard using React, Vite, and Tailwind CSS with a fully responsive user interface.",
      highlights: [
        "Developed responsive management dashboard interfaces using React, Vite, and Tailwind CSS.",
        "Implemented Recoil and Jotai for state management and SWR for optimized data fetching.",
        "Collaborated with Python and PHP backend teams to integrate REST APIs.",
        "Focused on reusable components, maintainable code, and application usability.",
      ],
      tech: ["React.js", "Vite", "Tailwind CSS", "Recoil", "Jotai", "SWR", "REST APIs"],
      order: 2,
    },
  ];

  for (const exp of experiences) {
    await client.createOrReplace(exp);
  }
  console.log("✅ Experiences seeded.");

  // D. Seed Projects
  console.log("🚀 Seeding Featured Projects...");
  const projects = [
    {
      _type: "project",
      _id: "proj-client-finance-os",
      name: "FinanceOS",
      index: "01",
      projectType: "client",
      category: "FINTECH & DASHBOARD",
      titlePrefix: "Manage Your ",
      titleGhost: "Finances",
      namePrefix: "Finance",
      nameGhost: "OS",
      desc: "Personal finance management · Budgeting, expenses & financial planning",
      image: financeDesktop,
      mobileImage: financeMobile,
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Recharts"],
      liveUrl: "https://finance-os-next-nu.vercel.app/",
      order: 1,
    },
    {
      _type: "project",
      _id: "proj-client-scoremate",
      name: "ScoreMate",
      index: "02",
      projectType: "client",
      category: "PWA & PRODUCTIVITY",
      titlePrefix: "Calculate Your ",
      titleGhost: "Scores",
      namePrefix: "Score",
      nameGhost: "Mate",
      desc: "PWA · GPA, CGPA & Percentage Calculator",
      image: scoremateDesktop,
      mobileImage: scoremateMobile,
      tech: ["React.js", "PWA", "Tailwind CSS", "Vite"],
      liveUrl: "https://github.com/Abhi-raam",
      githubUrl: "https://github.com/Abhi-raam",
      order: 2,
    },
    {
      _type: "project",
      _id: "proj-client-windsorvale",
      name: "Windsorvale",
      index: "03",
      projectType: "client",
      category: "HOSPITALITY & RESORT",
      titlePrefix: "A Resort ",
      titleGhost: "Experience",
      namePrefix: "Windsor",
      nameGhost: "vale",
      desc: "Resort website · Next.js + Tailwind CSS + Sanity",
      image: windsorDesktop,
      mobileImage: windsorMobile,
      tech: ["Next.js", "Tailwind CSS", "Sanity CMS", "Framer Motion"],
      liveUrl: "https://windsorvale.vercel.app/",
      order: 3,
    },
    {
      _type: "project",
      _id: "proj-client-cjems",
      name: "CJEMS School",
      index: "04",
      projectType: "client",
      category: "EDUCATION & ACADEMICS",
      titlePrefix: "A Modern ",
      titleGhost: "School Website",
      namePrefix: "CJEMS ",
      nameGhost: "School",
      desc: "School website · Next.js · Responsive UI",
      image: cjemsDesktop,
      mobileImage: cjemsMobile,
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Responsive UI"],
      liveUrl: "https://cjems.vercel.app/",
      order: 4,
    },
    {
      _type: "project",
      _id: "proj-client-ifc",
      name: "Immortals Fitness Club",
      index: "05",
      projectType: "client",
      category: "FITNESS & SPORTS",
      titlePrefix: "Train. Fight. ",
      titleGhost: "Transform.",
      namePrefix: "Immortals ",
      nameGhost: "Fitness Club",
      desc: "Gym website · Next.js · Responsive UI",
      image: ifcDesktop,
      mobileImage: ifcMobile,
      tech: ["Next.js", "Tailwind CSS", "React", "Lucide Icons"],
      liveUrl: "https://ifc-website.vercel.app/",
      order: 5,
    },
    {
      _type: "project",
      _id: "proj-client-shahul",
      name: "Shahul Weds Jabeen",
      index: "06",
      projectType: "client",
      category: "WEDDING & EVENT",
      titlePrefix: "A Beautiful ",
      titleGhost: "Wedding Invitation",
      namePrefix: "Shahul Weds ",
      nameGhost: "Jabeen",
      desc: "Wedding invitation website · Interactive & responsive experience",
      image: shahul1,
      mobileImage: shahul2,
      tech: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
      liveUrl: "https://shahul-weds-jabeen.vercel.app/",
      order: 6,
    },
    // Products category projects
    {
      _type: "project",
      _id: "proj-product-finance-os",
      name: "FinanceOS",
      index: "01",
      projectType: "products",
      category: "FINTECH & DASHBOARD",
      titlePrefix: "Manage Your ",
      titleGhost: "Finances",
      namePrefix: "Finance",
      nameGhost: "OS",
      desc: "Personal finance management · Budgeting, expenses & financial planning",
      image: financeDesktop,
      mobileImage: financeMobile,
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Recharts"],
      liveUrl: "https://finance-os-next-nu.vercel.app/",
      order: 10,
    },
    {
      _type: "project",
      _id: "proj-product-scoremate",
      name: "ScoreMate",
      index: "02",
      projectType: "products",
      category: "PWA & PRODUCTIVITY",
      titlePrefix: "Calculate Your ",
      titleGhost: "Scores",
      namePrefix: "Score",
      nameGhost: "Mate",
      desc: "PWA · GPA, CGPA & Percentage Calculator",
      image: scoremateDesktop,
      mobileImage: scoremateMobile,
      tech: ["React.js", "PWA", "Tailwind CSS", "Vite"],
      liveUrl: "https://github.com/Abhi-raam",
      githubUrl: "https://github.com/Abhi-raam",
      order: 11,
    },
  ];

  for (const proj of projects) {
    await client.createOrReplace(proj);
  }
  console.log("✅ Projects seeded.");

  // E. Seed Services Bento Items
  console.log("⚡ Seeding Areas of Expertise Services...");
  const services = [
    {
      _type: "service",
      _id: "serv-frontend",
      number: "01",
      category: "FRONTEND",
      titlePrefix: "FRONTEND ",
      titleGhost: "DEVELOPMENT",
      name: "Frontend Development",
      description: "RESPONSIVE AND USER-CENTRIC WEB INTERFACES BUILT WITH MODERN FRONTEND TECHNOLOGIES, REUSABLE COMPONENTS, AND A STRONG FOCUS ON USABILITY AND MAINTAINABILITY.",
      chips: [
        { _key: "c1", label: "REACT.JS", featured: true },
        { _key: "c2", label: "JAVASCRIPT" },
        { _key: "c3", label: "TYPESCRIPT" },
        { _key: "c4", label: "TAILWIND CSS" },
        { _key: "c5", label: "BOOTSTRAP" },
      ],
      layout: "wide",
      href: "#contact",
      order: 1,
    },
    {
      _type: "service",
      _id: "serv-react-next",
      number: "02",
      category: "APPLICATIONS",
      titlePrefix: "REACT & NEXT.JS ",
      titleGhost: "DEVELOPMENT",
      name: "React & Next.js Development",
      description: "MODERN WEB APPLICATIONS DEVELOPED WITH REACT.JS AND NEXT.JS, USING REUSABLE COMPONENTS, STRUCTURED STATE MANAGEMENT, AND RESPONSIVE UI PATTERNS.",
      chips: [
        { _key: "c1", label: "REACT.JS", featured: true },
        { _key: "c2", label: "NEXT.JS" },
        { _key: "c3", label: "TYPESCRIPT" },
        { _key: "c4", label: "REUSABLE COMPONENTS" },
        { _key: "c5", label: "RESPONSIVE UI" },
      ],
      layout: "wide",
      href: "#contact",
      order: 2,
    },
    {
      _type: "service",
      _id: "serv-rest-api",
      number: "03",
      category: "INTEGRATION",
      titlePrefix: "REST API ",
      titleGhost: "INTEGRATION",
      name: "REST API Integration",
      description: "DATA-DRIVEN FRONTEND APPLICATIONS CONNECTED TO REST APIS WITH EFFICIENT DATA FETCHING, ERROR HANDLING, AND SMOOTH COLLABORATION WITH BACKEND TEAMS.",
      chips: [
        { _key: "c1", label: "REST APIS", featured: true },
        { _key: "c2", label: "SWR" },
        { _key: "c3", label: "TANSTACK QUERY" },
        { _key: "c4", label: "DATA FETCHING" },
        { _key: "c5", label: "API INTEGRATION" },
      ],
      layout: "compact",
      href: "#contact",
      order: 3,
    },
    {
      _type: "service",
      _id: "serv-website",
      number: "04",
      category: "RESPONSIVE WEB",
      titlePrefix: "WEBSITE ",
      titleGhost: "DEVELOPMENT",
      name: "Responsive Website Development",
      description: "MODERN, MOBILE-FIRST WEBSITES FOR BUSINESSES, RESORTS, EDUCATIONAL INSTITUTIONS, FITNESS BRANDS, AND OTHER DIGITAL EXPERIENCES.",
      chips: [
        { _key: "c1", label: "NEXT.JS", featured: true },
        { _key: "c2", label: "TAILWIND CSS" },
        { _key: "c3", label: "RESPONSIVE DESIGN" },
        { _key: "c4", label: "CROSS-DEVICE UI" },
        { _key: "c5", label: "SANITY CMS" },
      ],
      layout: "compact",
      href: "#contact",
      order: 4,
    },
    {
      _type: "service",
      _id: "serv-pwa",
      number: "05",
      category: "PROGRESSIVE WEB",
      titlePrefix: "PWA ",
      titleGhost: "DEVELOPMENT",
      name: "Progressive Web Apps",
      description: "INSTALLABLE AND RESPONSIVE WEB APPLICATIONS WITH OFFLINE SUPPORT AND A MOBILE-FIRST EXPERIENCE FOR PRACTICAL EVERYDAY USE CASES.",
      chips: [
        { _key: "c1", label: "REACT", featured: true },
        { _key: "c2", label: "VITE" },
        { _key: "c3", label: "PWA" },
        { _key: "c4", label: "OFFLINE SUPPORT" },
        { _key: "c5", label: "TAILWIND CSS" },
      ],
      layout: "compact",
      href: "#contact",
      order: 5,
    },
  ];

  for (const serv of services) {
    await client.createOrReplace(serv);
  }
  console.log("✅ Services seeded.");

  console.log("🎉 All Sanity CMS data and media assets have been seeded successfully!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed with error:", err);
  process.exit(1);
});

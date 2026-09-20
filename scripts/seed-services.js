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

if (!projectId || !token) {
  console.error("❌ Missing Sanity credentials in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-06-09",
  useCdn: false,
});

const services = [
  {
    _type: "service",
    _id: "serv-frontend",
    number: "01",
    category: "FRONTEND",
    titlePrefix: "FRONTEND ",
    titleGhost: "DEVELOPMENT",
    name: "Frontend Development",
    description:
      "RESPONSIVE AND USER-CENTRIC WEB INTERFACES BUILT WITH MODERN FRONTEND TECHNOLOGIES, REUSABLE COMPONENTS, AND A STRONG FOCUS ON USABILITY AND MAINTAINABILITY.",
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
    description:
      "MODERN WEB APPLICATIONS DEVELOPED WITH REACT.JS AND NEXT.JS, USING REUSABLE COMPONENTS, STRUCTURED STATE MANAGEMENT, AND RESPONSIVE UI PATTERNS.",
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
    description:
      "DATA-DRIVEN FRONTEND APPLICATIONS CONNECTED TO REST APIS WITH EFFICIENT DATA FETCHING, ERROR HANDLING, AND SMOOTH COLLABORATION WITH BACKEND TEAMS.",
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
    description:
      "MODERN, MOBILE-FIRST WEBSITES FOR BUSINESSES, RESORTS, EDUCATIONAL INSTITUTIONS, FITNESS BRANDS, AND OTHER DIGITAL EXPERIENCES.",
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
    description:
      "INSTALLABLE AND RESPONSIVE WEB APPLICATIONS WITH OFFLINE SUPPORT AND A MOBILE-FIRST EXPERIENCE FOR PRACTICAL EVERYDAY USE CASES.",
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

async function seedServices() {
  console.log("⚡ Seeding Areas of Expertise / Services to Sanity CMS...");
  for (const serv of services) {
    const res = await client.createOrReplace(serv);
    console.log(`✅ Seeded service [${serv.number}]: "${serv.name}" (ID: ${res._id})`);
  }
  console.log("🎉 Successfully seeded all 5 Areas of Service into Sanity!");
}

seedServices().catch((err) => {
  console.error("❌ Seeding services failed:", err);
  process.exit(1);
});

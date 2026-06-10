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
  console.error("Please create a 'write' token at https://www.sanity.io/manage (API tab -> Tokens) and add it to .env.local like:");
  console.error('SANITY_API_WRITE_TOKEN="your_write_token_here"');
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
    console.warn(`⚠️ Warning: Image file not found at ${filePath}, skipping asset upload.`);
    return null;
  }
  try {
    const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
      filename: path.basename(filePath),
    });
    console.log(`✅ Uploaded image asset: ${path.basename(filePath)} (${asset._id})`);
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
  console.log("🚀 Starting database seeding to Sanity CMS...");

  // A. Upload Images
  console.log("🖼️ Uploading media assets...");
  const profileImage = await uploadImageAsset(path.join(__dirname, "../public/profile.png"));
  const konectoImage = await uploadImageAsset(path.join(__dirname, "../public/projects/konecto.png"));
  const scoremateImage = await uploadImageAsset(path.join(__dirname, "../public/projects/scoremate.png"));
  const dolistImage = await uploadImageAsset(path.join(__dirname, "../public/projects/dolist.png"));
  const learningImage = await uploadImageAsset(path.join(__dirname, "../public/projects/learning.png"));
  const windsorImage = await uploadImageAsset(path.join(__dirname, "../public/projects/windsor.png"));
  const schoolImage = await uploadImageAsset(path.join(__dirname, "../public/projects/school.png"));

  // B. Seed Profile (Singleton)
  console.log("📝 Seeding Profile Document...");
  const profileDoc = {
    _type: "profile",
    _id: "profile",
    name: "Abhiram Suresh",
    title: "Software Developer",
    bio1: "I am a 2024 Computer Science graduate who has transitioned into a highly focused Software Engineer, with a core expertise in modern frontend development. My passion lies in designing, building, and launching intuitive, sleek web applications that run seamlessly across all devices.",
    bio2: "With a solid foundation in React.js, Next.js, TypeScript, and Tailwind CSS, I build highly interactive interfaces. I am deeply concerned with writing clean, modular code and optimizing page speed and performance. My experience spans across collaborative, agile product teams as well as delivering key freelance solutions.",
    email: "abhiramsuresh.dev@gmail.com",
    linkedin: "https://linkedin.com/in/abhiram-suresh",
    github: "https://github.com/AbhiramSuresh",
    location: "Kerala, India",
    specialties: [
      "Next.js & App Router Architecture",
      "TypeScript Typings & Safety",
      "Performance Optimization",
      "Progressive Web Apps (PWA)",
    ],
    stats: [
      { _key: "stat1", value: "2+ Years", label: "Exp in Web Dev", icon: "briefcase" },
      { _key: "stat2", value: "15+", label: "Completed Projects", icon: "folder" },
      { _key: "stat3", value: "12+", label: "Technologies Mastered", icon: "cpu" },
      { _key: "stat4", value: "1.2k+", label: "GitHub Contributions", icon: "commit" },
    ],
  };

  if (profileImage) {
    profileDoc.image = profileImage;
  }

  await client.createOrReplace(profileDoc);
  console.log("✅ Seeding Profile complete.");

  // C. Seed Experiences
  console.log("💼 Seeding Experiences Timeline...");
  const experiences = [
    {
      _type: "experience",
      _id: "exp1",
      title: "Software Developer",
      company: "Webandcrafts",
      duration: "2024 - Present",
      description: "Lead frontend feature design and implementation. Collaborate with cross-functional product and design teams to translate complex requirements into modern, performant, and responsive interfaces. Spearhead performance optimization initiatives reducing load time and improving Core Web Vitals.",
      tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Team Collaboration", "Performance Optimization"],
      order: 1,
    },
    {
      _type: "experience",
      _id: "exp2",
      title: "MERN Stack Developer",
      company: "Zyfarer Innovations",
      duration: "2023 - 2024",
      description: "Architected and deployed full-stack web applications. Utilized MongoDB, Express.js, React.js, and Node.js to create scalable database-driven portals. Integrated RESTful APIs, payment gateways, and secure authentication flows.",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Scalable Web Solutions"],
      order: 2,
    },
    {
      _type: "experience",
      _id: "exp3",
      title: "MERN Stack Trainee",
      company: "Zyfarer Innovations",
      duration: "2022 - 2023",
      description: "Gained hands-on project development experience. Learned software development fundamentals, version control with Git, databases, and clean coding practices. Collaborated in Agile mock sprints to build full-stack projects.",
      tags: ["JavaScript", "HTML5 & CSS3", "Git & GitHub", "Agile Fundamentals", "MERN Basics"],
      order: 3,
    },
  ];

  for (const exp of experiences) {
    await client.createOrReplace(exp);
  }
  console.log("✅ Seeding Experiences complete.");

  // D. Seed Education
  console.log("🎓 Seeding Education History...");
  const educations = [
    {
      _type: "education",
      _id: "edu1",
      title: "Bachelor of Technology in Computer Science & Engineering",
      subtitle: "Anna University",
      duration: "2020 - 2024",
      description: "2024 Computer Science graduate. Focused on key core computing domains including Data Structures & Algorithms, Software Engineering, Object-Oriented Programming, Database Management Systems, and Web Application Architectures.",
      tags: ["Computer Science", "Algorithms & DS", "Software Engineering", "DBMS", "Core Computing"],
      order: 1,
    },
    {
      _type: "education",
      _id: "edu2",
      title: "Higher Secondary Education (Biology Science)",
      subtitle: "Board of Higher Secondary Education, Kerala",
      duration: "2018 - 2020",
      description: "Completed science stream majoring in Biology Science. Built a strong foundation in physics, mathematics and biology fundamentals.",
      tags: ["Biology", "Mathematics", "Physics", "Chemistry"],
      order: 2,
    },
  ];

  for (const edu of educations) {
    await client.createOrReplace(edu);
  }
  console.log("✅ Seeding Education complete.");

  // E. Seed Projects
  console.log("🚀 Seeding Featured Projects...");
  const projects = [
    {
      _type: "project",
      _id: "proj1",
      name: "Konecto",
      description: "An anonymous real-time chat platform supporting fast communication channels. Designed for frictionless, instant connections with full privacy features.",
      category: "fullstack",
      techStack: ["React.js", "Node.js", "Express.js", "Socket.io", "Tailwind CSS"],
      liveUrl: "https://konecto-chat.vercel.app",
      githubUrl: "https://github.com/AbhiramSuresh/konecto-chat",
      order: 1,
      image: konectoImage,
    },
    {
      _type: "project",
      _id: "proj2",
      name: "ScoreMate",
      description: "A comprehensive grading dashboard for students to calculate GPA, CGPA, and grade percentages. Features interactive weight adjustments and target trackers.",
      category: "react",
      techStack: ["React.js", "Tailwind CSS", "JavaScript", "LocalStorage"],
      liveUrl: "https://scoremate-gpa.vercel.app",
      githubUrl: "https://github.com/AbhiramSuresh/scoremate",
      order: 2,
      image: scoremateImage,
    },
    {
      _type: "project",
      _id: "proj3",
      name: "Dolist",
      description: "A premium project and task management dashboard designed for tracking sprints. Features interactive drag-and-drop boards, checklist progress, and statistics.",
      category: "fullstack",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      liveUrl: "https://dolist-tasks.vercel.app",
      githubUrl: "https://github.com/AbhiramSuresh/dolist-tasks",
      order: 3,
      image: dolistImage,
    },
    {
      _type: "project",
      _id: "proj4",
      name: "Learning Portal",
      description: "An interactive online education and quiz portal. Features student dashboards, lecture uploads, progress rings, and timed, gamified course assessments.",
      category: "next",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase Auth", "Firestore"],
      liveUrl: "https://learning-portal-edu.vercel.app",
      githubUrl: "https://github.com/AbhiramSuresh/learning-portal",
      order: 4,
      image: learningImage,
    },
    {
      _type: "project",
      _id: "proj5",
      name: "Windsor Vale",
      description: "A premium corporate marketing website built for Windsor Vale. Integrates a headless CMS for dynamic block creation, with custom page transitions.",
      category: "next",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Framer Motion"],
      liveUrl: "https://windsorvale.com",
      order: 5,
      image: windsorImage,
    },
    {
      _type: "project",
      _id: "proj6",
      name: "School Website",
      description: "An educational institution hub hosting event announcements, campus resources, and news. Features a complete admin portal for updating notifications.",
      category: "fullstack",
      techStack: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      liveUrl: "https://school-portal-demo.vercel.app",
      githubUrl: "https://github.com/AbhiramSuresh/school-website",
      order: 6,
      image: schoolImage,
    },
  ];

  for (const proj of projects) {
    if (!proj.image) {
      delete proj.image; // Do not seed null image
    }
    await client.createOrReplace(proj);
  }
  console.log("✅ Seeding Projects complete.");

  // F. Seed Skills
  console.log("⚡ Seeding Technical Skills...");
  const skills = [
    { _type: "skill", _id: "sk1", name: "React.js", level: 90, category: "frontend", order: 1 },
    { _type: "skill", _id: "sk2", name: "Next.js", level: 85, category: "frontend", order: 2 },
    { _type: "skill", _id: "sk3", name: "TypeScript", level: 85, category: "frontend", order: 3 },
    { _type: "skill", _id: "sk4", name: "JavaScript", level: 90, category: "frontend", order: 4 },
    { _type: "skill", _id: "sk5", name: "Tailwind CSS", level: 95, category: "frontend", order: 5 },
    { _type: "skill", _id: "sk6", name: "HTML5 & CSS3", level: 95, category: "frontend", order: 6 },
    { _type: "skill", _id: "sk7", name: "Node.js", level: 80, category: "backend", order: 7 },
    { _type: "skill", _id: "sk8", name: "Express.js", level: 80, category: "backend", order: 8 },
    { _type: "skill", _id: "sk9", name: "MongoDB", level: 75, category: "backend", order: 9 },
    { _type: "skill", _id: "sk10", name: "Firebase", level: 80, category: "backend", order: 10 },
    { _type: "skill", _id: "sk11", name: "Git & GitHub", level: 88, category: "tools", order: 11 },
    { _type: "skill", _id: "sk12", name: "VS Code", level: 92, category: "tools", order: 12 },
    { _type: "skill", _id: "sk13", name: "Postman", level: 85, category: "tools", order: 13 },
    { _type: "skill", _id: "sk14", name: "Vercel", level: 90, category: "tools", order: 14 },
  ];

  for (const sk of skills) {
    await client.createOrReplace(sk);
  }
  console.log("✅ Seeding Skills complete.");

  console.log("\n🎉 Database Seeding successfully completed! All default content has been uploaded to Sanity CMS.");
}

seed().catch((err) => {
  console.error("❌ Seeding failed with unexpected error:", err);
  process.exit(1);
});

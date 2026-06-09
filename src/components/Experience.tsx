"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";

interface TimelineItem {
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  tags: string[];
}

export default function Experience() {
  const workExperience: TimelineItem[] = [
    {
      title: "Software Developer",
      subtitle: "Webandcrafts",
      duration: "2024 - Present",
      description:
        "Lead frontend feature design and implementation. Collaborate with cross-functional product and design teams to translate complex requirements into modern, performant, and responsive interfaces. Spearhead performance optimization initiatives reducing load time and improving Core Web Vitals.",
      tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Team Collaboration", "Performance Optimization"],
    },
    {
      title: "MERN Stack Developer",
      subtitle: "Zyfarer Innovations",
      duration: "2023 - 2024",
      description:
        "Architected and deployed full-stack web applications. Utilized MongoDB, Express.js, React.js, and Node.js to create scalable database-driven portals. Integrated RESTful APIs, payment gateways, and secure authentication flows.",
      tags: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Scalable Web Solutions"],
    },
    {
      title: "MERN Stack Trainee",
      subtitle: "Zyfarer Innovations",
      duration: "2022 - 2023",
      description:
        "Gained hands-on project development experience. Learned software development fundamentals, version control with Git, databases, and clean coding practices. Collaborated in Agile mock sprints to build full-stack projects.",
      tags: ["JavaScript", "HTML5 & CSS3", "Git & GitHub", "Agile Fundamentals", "MERN Basics"],
    },
  ];

  const educationHistory: TimelineItem[] = [
    {
      title: "Bachelor of Technology in Computer Science & Engineering",
      subtitle: "Anna University",
      duration: "2020 - 2024",
      description:
        "2024 Computer Science graduate. Focused on key core computing domains including Data Structures & Algorithms, Software Engineering, Object-Oriented Programming, Database Management Systems, and Web Application Architectures.",
      tags: ["Computer Science", "Algorithms & DS", "Software Engineering", "DBMS", "Core Computing"],
    },
    {
      title: "Higher Secondary Education (Biology Science)",
      subtitle: "Board of Higher Secondary Education, Kerala",
      duration: "2018 - 2020",
      description:
        "Completed science stream majoring in Biology Science. Built a strong foundation in physics, mathematics and biology fundamentals.",
      tags: ["Biology", "Mathematics", "Physics","Chemistry"],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/3 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-50/40 blur-3xl" />
      <div className="absolute bottom-1/3 left-0 translate-y-1/2 w-80 h-80 rounded-full bg-violet-50/30 blur-3xl" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Experience & Education
          </h2>
          <p className="text-slate-500 font-medium">My career journey and academic foundation</p>
          <div className="w-12 h-1 bg-indigo-600 mx-auto rounded-full mt-4" />
        </div>

        {/* ================= WORK EXPERIENCE SUBSECTION ================= */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-12 ml-4 md:ml-32">
            <span className="p-2 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
              <Briefcase size={20} />
            </span>
            <h3 className="text-xl font-bold text-slate-900">Work Experience</h3>
          </div>

          <div className="relative border-l border-slate-200 ml-4 md:ml-32">
            {workExperience.map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="mb-12 relative pl-8 md:pl-12 last:mb-0 group"
              >
                {/* Dot Icon */}
                <span className="absolute -left-4 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-indigo-600 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <Briefcase className="text-indigo-600" size={14} />
                </span>

                {/* Side Date (Desktop Only) */}
                <div className="hidden md:block absolute -left-44 top-2 w-36 text-right">
                  <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/50 inline-flex items-center gap-1 whitespace-nowrap">
                    <Calendar size={12} />
                    {item.duration}
                  </span>
                </div>

                {/* Card content */}
                <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-colors duration-300">
                  {/* Mobile Date */}
                  <div className="md:hidden mb-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/50 whitespace-nowrap">
                    <Calendar size={12} />
                    {item.duration}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>
                      <div className="text-sm font-semibold text-indigo-500">{item.subtitle}</div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100/80 rounded-md border border-slate-200/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= EDUCATION SUBSECTION ================= */}
        <div>
          <div className="flex items-center gap-3 mb-12 ml-4 md:ml-32">
            <span className="p-2 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
              <GraduationCap size={20} />
            </span>
            <h3 className="text-xl font-bold text-slate-900">Education</h3>
          </div>

          <div className="relative border-l border-slate-200 ml-4 md:ml-32">
            {educationHistory.map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="mb-12 relative pl-8 md:pl-12 last:mb-0 group"
              >
                {/* Dot Icon */}
                <span className="absolute -left-4 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-indigo-600 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <GraduationCap className="text-indigo-600" size={14} />
                </span>

                {/* Side Date (Desktop Only) */}
                <div className="hidden md:block absolute -left-44 top-2 w-36 text-right">
                  <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/50 inline-flex items-center gap-1 whitespace-nowrap">
                    <Calendar size={12} />
                    {item.duration}
                  </span>
                </div>

                {/* Card content */}
                <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-colors duration-300">
                  {/* Mobile Date */}
                  <div className="md:hidden mb-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/50 whitespace-nowrap">
                    <Calendar size={12} />
                    {item.duration}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h4>
                      <div className="text-sm font-semibold text-indigo-500">{item.subtitle}</div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100/80 rounded-md border border-slate-200/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

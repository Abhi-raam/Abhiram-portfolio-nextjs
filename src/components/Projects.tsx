"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Layers } from "lucide-react";
import { Github } from "@/components/BrandIcons";

interface Project {
  name: string;
  description: string;
  image: string;
  techStack: string[];
  category: "react" | "next" | "fullstack";
  liveUrl: string;
  githubUrl?: string;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<"all" | "react" | "next" | "fullstack">("all");

  const projects: Project[] = [
    {
      name: "Konecto",
      description: "An anonymous real-time chat platform supporting fast communication channels. Designed for frictionless, instant connections with full privacy features.",
      image: "/projects/konecto.png",
      techStack: ["React.js", "Node.js", "Express.js", "Socket.io", "Tailwind CSS"],
      category: "fullstack",
      liveUrl: "https://konecto-chat.vercel.app",
      githubUrl: "https://github.com/AbhiramSuresh/konecto-chat",
    },
    {
      name: "ScoreMate",
      description: "A comprehensive grading dashboard for students to calculate GPA, CGPA, and grade percentages. Features interactive weight adjustments and target trackers.",
      image: "/projects/scoremate.png",
      techStack: ["React.js", "Tailwind CSS", "JavaScript", "LocalStorage"],
      category: "react",
      liveUrl: "https://scoremate-gpa.vercel.app",
      githubUrl: "https://github.com/AbhiramSuresh/scoremate",
    },
    {
      name: "Dolist",
      description: "A premium project and task management dashboard designed for tracking sprints. Features interactive drag-and-drop boards, checklist progress, and statistics.",
      image: "/projects/dolist.png",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      category: "fullstack",
      liveUrl: "https://dolist-tasks.vercel.app",
      githubUrl: "https://github.com/AbhiramSuresh/dolist-tasks",
    },
    {
      name: "Learning Portal",
      description: "A interactive online education and quiz portal. Features student dashboards, lecture uploads, progress rings, and timed, gamified course assessments.",
      image: "/projects/learning.png",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase Auth", "Firestore"],
      category: "next",
      liveUrl: "https://learning-portal-edu.vercel.app",
      githubUrl: "https://github.com/AbhiramSuresh/learning-portal",
    },
    {
      name: "Windsor Vale",
      description: "A premium corporate marketing website built for Windsor Vale. Integrates a headless CMS for dynamic block creation, with custom page transitions.",
      image: "/projects/windsor.png",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Framer Motion"],
      category: "next",
      liveUrl: "https://windsorvale.com",
    },
    {
      name: "School Website",
      description: "An educational institution hub hosting event announcements, campus resources, and news. Features a complete admin portal for updating notifications.",
      image: "/projects/school.png",
      techStack: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      category: "fullstack",
      liveUrl: "https://school-portal-demo.vercel.app",
      githubUrl: "https://github.com/AbhiramSuresh/school-website",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const filters = [
    { label: "All Projects", value: "all" },
    { label: "Next.js", value: "next" },
    { label: "React.js", value: "react" },
    { label: "Full Stack", value: "fullstack" },
  ] as const;

  return (
    <section id="projects" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row md:items-center justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-slate-500 font-medium max-w-lg">
              A curated showcase of my engineering work, spanning frontend applications and robust full-stack systems.
            </p>
            <div className="w-12 h-1 bg-indigo-600 rounded-full mt-4" />
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/45 self-center lg:self-end">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.name}
                className="group flex flex-col h-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50/20 hover:bg-white hover:border-slate-200/80 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Image Showcase */}
                <div className="relative aspect-video w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/95 backdrop-blur-sm text-slate-800 border border-slate-100 shadow-sm">
                      <Layers size={10} className="text-indigo-500" />
                      {project.category === "next"
                        ? "Next.js"
                        : project.category === "react"
                        ? "React"
                        : "Full Stack"}
                    </span>
                  </div>
                </div>

                {/* Info Content */}
                <div className="flex flex-col flex-1 p-6 md:p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                        title="GitHub Repository"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

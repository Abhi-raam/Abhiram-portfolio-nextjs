"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { Github, Linkedin } from "@/components/BrandIcons";

interface HeroProps {
  name?: string;
  title?: string;
  bio1?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  imageUrl?: string;
}

export default function Hero({
  name,
  title,
  bio1,
  resumeUrl,
  githubUrl,
  linkedinUrl,
  imageUrl,
}: HeroProps) {
  if (!name) return null;
  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.querySelector("#projects");
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden bg-grid-pattern"
    >
      {/* Soft gradient background accents */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-200/40 blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-200/40 blur-3xl animate-blob [animation-delay:4s]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 mb-6 border border-indigo-100">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Available for full-time opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 bg-clip-text text-transparent">
              {name}
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl font-semibold text-indigo-950 mb-6"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            {bio1}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
          >
            <button
              onClick={handleScrollToProjects}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium shadow-md shadow-indigo-200 hover:from-indigo-500 hover:to-violet-500 hover:shadow-lg transition-all duration-200 group cursor-pointer"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={resumeUrl.endsWith(".pdf") ? "Abhiram_Suresh_Resume.pdf" : undefined}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium shadow-sm transition-all duration-200 cursor-pointer"
              >
                <FileText size={18} />
                Download Resume
              </a>
            )}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center lg:justify-start items-center gap-4 text-slate-400"
          >
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:text-slate-800 hover:bg-slate-50 transition-colors bg-white"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:text-slate-800 hover:bg-slate-50 transition-colors bg-white"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
          </motion.div>
        </div>

        {/* Profile Image Area */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="relative"
          >
            {/* Background glowing rings */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-full blur-xl opacity-20 scale-105 animate-pulse-slow" />
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl glass-card">
              <Image
                src={imageUrl || "/profile.png"}
                alt={name}
                fill
                priority
                sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                className="object-cover scale-102 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

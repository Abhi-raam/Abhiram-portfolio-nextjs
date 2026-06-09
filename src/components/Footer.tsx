"use client";

import React from "react";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/BrandIcons";

interface FooterProps {
  name?: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export default function Footer({
  name,
  email,
  linkedinUrl,
  githubUrl,
}: FooterProps) {
  if (!name) return null;
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
          
          {/* Logo / Brand (Column 1) */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start gap-3">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, "#home")}
              className="text-lg font-bold tracking-tight text-white flex items-center gap-2 group"
            >
              <span className="h-8 w-8 rounded-lg bg-linear-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-extrabold shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                {initials}
              </span>
              {name}
            </a>
            <p className="text-xs text-slate-500 text-center md:text-left">
              Software Engineer specializing in building modern web apps.
            </p>
          </div>

          {/* Quick Links (Column 2) */}
          <div className="col-span-2 lg:col-span-5 flex flex-col lg:flex-row flex-wrap justify-center lg:justify-start gap-2 md:gap-x-6 gap-y-2">
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, "#about")}
              className="text-xs hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#experience"
              onClick={(e) => handleLinkClick(e, "#experience")}
              className="text-xs hover:text-white transition-colors"
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, "#projects")}
              className="text-xs hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#skills"
              onClick={(e) => handleLinkClick(e, "#skills")}
              className="text-xs hover:text-white transition-colors"
            >
              Skills
            </a>
            <a
              href="#achievements"
              onClick={(e) => handleLinkClick(e, "#achievements")}
              className="text-xs hover:text-white transition-colors"
            >
              Achievements
            </a>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="text-xs hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Social Links (Column 3) */}
          <div className="col-span-5 lg:col-span-2 flex justify-center md:justify-end items-center gap-4">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-800/80 my-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-center sm:text-left">
          <div>
            &copy; {currentYear} {name}. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span>Built with React, Next.js, TypeScript, and Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

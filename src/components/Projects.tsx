"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS_DATA } from "@/data/siteData";

export interface ProjectItem {
  _id?: string;
  name?: string;
  index?: string;
  projectType?: "client" | "products" | string;
  category?: string;
  titlePrefix?: string;
  titleGhost?: string;
  namePrefix?: string;
  nameGhost?: string;
  title?: string;
  desc?: string;
  description?: string;
  image?: any;
  mobileImage?: any;
  shots?: Array<{ src: string; alt?: string }>;
  tech?: string[];
  techStack?: string[];
  liveUrl?: string;
  href?: string;
  githubUrl?: string;
  github?: string;
}

interface ProjectsProps {
  projects?: ProjectItem[];
}

export function Projects({ projects }: ProjectsProps) {
  const activeProjects = React.useMemo(() => {
    if (projects && projects.length > 0) {
      return projects;
    }
    return PROJECTS_DATA.items.client;
  }, [projects]);

  return (
    <section
      className="scene pt-[clamp(72px,9vw,150px)] px-[var(--gutter)] pb-[clamp(40px,4.5vw,80px)]"
      id="projects"
      aria-label="Selected Projects"
    >
      <div className="flex items-center justify-between gap-4 mb-[clamp(32px,4vw,64px)]">
        <h2 className="display display-l" aria-label="FEATURED PROJECT">
          <span aria-hidden="true">
            {PROJECTS_DATA.titleLetters.map((word, wIdx) => (
              <span key={wIdx}>
                {wIdx > 0 && " "}
                <span className="gw">
                  {word.map((item, cIdx) => (
                    <span
                      key={cIdx}
                      className={`gl ${item.ghost ? "ghost" : ""}`}
                    >
                      {item.text}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </span>
        </h2>
        <a
          className="circle-btn circle-btn--ne bg-[var(--paper)] !w-[clamp(52px,5.5vw,76px)] flex-none"
          href="#contact"
          aria-label="Start a project"
          onClick={(e) => e.currentTarget.blur()}
        >
          <svg viewBox="0 0 24 24" className="arr" aria-hidden="true">
            <path d="M4 12h16M15 7l5 5-5 5"></path>
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(18px,2vw,28px)] items-stretch max-w-[1440px] mx-auto">
          {activeProjects.map((proj, idx) => {
            // Determine shots
            let primarySrc = "";
            let secondarySrc = "";
            const p = proj as any;
            if (p.shots && p.shots[0]) {
              primarySrc = p.shots[0].src;
              secondarySrc = p.shots[1]?.src || "";
            } else if (typeof p.image === "string") {
              primarySrc = p.image;
              secondarySrc = typeof p.mobileImage === "string" ? p.mobileImage : "";
            } else if (p.image?.asset?.url) {
              primarySrc = p.image.asset.url;
              secondarySrc = p.mobileImage?.asset?.url || "";
            }

            const projectTitle =
              p.name ||
              p.title ||
              `Project ${idx + 1}`;

            const targetUrl = p.liveUrl || p.href;
            const githubUrl = p.githubUrl || p.github;
            const displayIndex = p.index || String(idx + 1).padStart(2, "0");
            const tags: string[] = p.tech || p.techStack || [];
            const shortDesc = p.desc || p.description || "";

            const displayUrl = targetUrl
              ? targetUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
              : githubUrl
              ? githubUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
              : `${projectTitle.toLowerCase().replace(/\s+/g, "")}.app`;

            return (
              <article
                key={p._id || p.index || idx}
                className="group bg-[var(--paper)] border border-[var(--hairline)] rounded-[18px] p-4 sm:p-5 flex flex-col justify-between h-full relative transition-all duration-300 ease-[var(--ease)] shadow-[0_4px_16px_-8px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-[#a3a3a3] hover:shadow-[0_16px_36px_-14px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.03)]"
              >
                {/* 1. Header: Meta, Title & Description */}
                <div className="flex flex-col mb-2.5 sm:mb-3">
                  <div className="flex justify-between items-center mb-1.5">
                    {proj.category && (
                      <span className="tracking-[0.07em] text-[#525252] border border-[var(--hairline)] rounded-full py-0.5 px-2 text-[9px] font-medium bg-black/[0.02]">
                        {proj.category}
                      </span>
                    )}
                    <span
                      className="text-[10.5px] text-[var(--muted)] tracking-[0.08em] font-medium ml-auto"
                      aria-hidden="true"
                    >
                      {displayIndex}
                    </span>
                  </div>

                  <h3 className="text-[clamp(16px,1.2vw,20px)] leading-[1.2] mb-0.5 text-[var(--ink)] font-normal">
                    <a
                      href={targetUrl || githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-inherit no-underline transition-opacity duration-200 hover:opacity-75"
                    >
                      {projectTitle}
                    </a>
                  </h3>

                  <p className="text-[#5a5a5a] text-[clamp(11px,0.85vw,12.5px)] leading-[1.4] normal-case max-w-[48ch] min-h-[2.8em] flex items-start">
                    {shortDesc}
                  </p>
                </div>

                {/* 2. Interactive Device & Browser Preview */}
                <div className="relative mb-3 rounded-xl overflow-hidden bg-[#eef0f2] border border-[var(--hairline)] shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]">
                  <div className="flex flex-col w-full">
                    <div className="h-6 sm:h-6.5 bg-[#f5f5f7] border-b border-[#e5e5e7] flex items-center justify-between px-2.5 gap-1.5">
                      <div className="flex items-center gap-1 flex-none" aria-hidden="true">
                        <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#ff5f56]"></span>
                        <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#ffbd2e]"></span>
                        <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#27c93f]"></span>
                      </div>
                      <div
                        className="flex-1 max-w-[180px] mx-auto bg-white border border-[#e2e2e4] rounded-full py-0.5 px-2 text-[8px] text-[#737373] text-center lowercase whitespace-nowrap overflow-hidden text-ellipsis tracking-[0.02em]"
                        title={targetUrl || githubUrl || displayUrl}
                      >
                        {displayUrl}
                      </div>
                      {targetUrl || githubUrl ? (
                        <a
                          href={targetUrl || githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-3.5 h-3.5 flex items-center justify-center text-[#737373] transition-all duration-200 hover:text-[var(--ink)] hover:translate-x-px hover:-translate-y-px"
                          aria-label={`Open ${projectTitle} in new tab`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-2.5 h-2.5 stroke-current fill-none stroke-[1.8px]"
                            aria-hidden="true"
                          >
                            <path d="M7 17L17 7M7 7h10v10"></path>
                          </svg>
                        </a>
                      ) : (
                        <div className="w-3.5 h-3.5" />
                      )}
                    </div>

                    {primarySrc ? (
                      <a
                        href={targetUrl || githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block no-underline cursor-pointer"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <div className="w-full aspect-[16/10] relative bg-[#f0f1f3] overflow-hidden">
                          <Image
                            alt={`${projectTitle} preview`}
                            src={primarySrc}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover object-top transition-transform duration-450 ease-[var(--ease)] group-hover:scale-[1.025]"
                          />
                        </div>
                      </a>
                    ) : (
                      <div className="w-full aspect-[16/10] bg-[#e2e2e4] flex items-center justify-center text-[#888] text-xs">
                        No Preview Available
                      </div>
                    )}
                  </div>

                  {/* Secondary mobile view preview if available */}
                  {secondarySrc && (
                    <div
                      className="absolute right-2.5 bottom-0 w-[clamp(42px,3.8vw,54px)] aspect-[9/18] rounded-t-[10px] border-2 border-white bg-black overflow-hidden shadow-[-3px_-3px_14px_rgba(0,0,0,0.14)] translate-y-1.5 group-hover:translate-y-0 group-hover:shadow-[-4px_-4px_18px_rgba(0,0,0,0.22)] transition-all duration-350 ease-[var(--ease)] z-[2]"
                      aria-hidden="true"
                    >
                      <Image
                        alt={`${projectTitle} mobile preview`}
                        src={secondarySrc}
                        fill
                        sizes="60px"
                        className="object-cover object-top"
                      />
                    </div>
                  )}
                </div>

                {/* 3. Tech Stack Chips */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2.5" aria-label="Technologies used">
                    {tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[#404040] bg-black/[0.035] border border-black/[0.07] rounded-full py-0.5 px-2 text-[9px] tracking-[0.05em] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 4. Action Controls: Live Demo & GitHub */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-auto pt-1">
                  {targetUrl && (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn h-9 sm:h-[38px] px-4 text-[10.5px] tracking-[0.06em] inline-flex items-center justify-center gap-1.5 font-medium rounded-full no-underline transition-all duration-250 ease-[var(--ease)] bg-[var(--ink-black)] text-white border border-[var(--ink-black)] hover:bg-transparent hover:text-[var(--ink)] w-full sm:w-auto"
                    >
                      <span>LIVE DEMO</span>
                      <svg
                        viewBox="0 0 24 24"
                        className="stroke-current fill-none stroke-[1.8px] transition-transform duration-250 ease-[var(--ease)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        width="13"
                        height="13"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7M7 7h10v10"></path>
                      </svg>
                    </a>
                  )}

                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 sm:h-[38px] px-4 text-[10.5px] tracking-[0.06em] inline-flex items-center justify-center gap-1.5 font-medium rounded-full no-underline transition-all duration-250 ease-[var(--ease)] bg-transparent text-[var(--ink)] border border-[var(--hairline)] hover:bg-black/[0.05] hover:border-[var(--ink)] w-full sm:w-auto"
                      aria-label={`View ${projectTitle} on GitHub`}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      <span>GITHUB</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
}

export default Projects;

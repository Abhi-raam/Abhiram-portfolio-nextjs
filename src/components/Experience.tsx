"use client";

import React from "react";
import { EXPERIENCE_DATA } from "@/data/siteData";

export interface ExperienceRole {
  period?: string;
  duration?: string;
  isCurrent?: boolean;
  role?: string;
  title?: string;
  company: string;
  type?: string;
  location?: string;
  description: string;
  highlights?: string[];
  tech?: string[];
  tags?: string[];
}

interface ExperienceProps {
  workExperience?: ExperienceRole[];
  lede?: string;
}

export function Experience({
  workExperience,
  lede = EXPERIENCE_DATA.lede,
}: ExperienceProps) {
  // Merge Sanity items with static defaults so all cards have complete details
  const roles = React.useMemo(() => {
    if (!workExperience || !Array.isArray(workExperience) || workExperience.length === 0) {
      return EXPERIENCE_DATA.roles;
    }

    return EXPERIENCE_DATA.roles.map((fallback, idx) => {
      const item =
        workExperience.find(
          (r) => (r.company || "").toLowerCase() === fallback.company.toLowerCase()
        ) || workExperience[idx] || {};

      // Prioritize modern fields from Sanity if they exist, otherwise use high-fidelity fallback
      const period =
        item.period && item.period.trim() && !item.period.toLowerCase().includes("dec 2024 - present")
          ? item.period
          : fallback.period;

      const isCurrent =
        item.isCurrent !== undefined && item.isCurrent !== null
          ? Boolean(item.isCurrent)
          : fallback.isCurrent !== undefined
          ? fallback.isCurrent
          : period.toLowerCase().includes("present");

      const role =
        item.role && item.role.trim() && item.role.toLowerCase() !== "software developer"
          ? item.role
          : fallback.role;

      const company = fallback.company || item.company;
      const type = item.type || fallback.type || "Full-Time";
      const location = item.location || fallback.location || "Kerala, India";

      const description =
        item.description && !item.description.includes("Lead frontend feature design")
          ? item.description
          : fallback.description;

      const highlights =
        item.highlights && Array.isArray(item.highlights) && item.highlights.length > 0
          ? item.highlights
          : fallback.highlights || [];

      const tech =
        item.tech && Array.isArray(item.tech) && item.tech.length > 0
          ? item.tech
          : fallback.tech || [];

      return {
        role,
        company,
        period,
        isCurrent,
        type,
        location,
        description,
        highlights,
        tech,
      };
    });
  }, [workExperience]);

  return (
    <section
      className="scene py-[clamp(72px,9vw,150px)] px-[var(--gutter)]"
      id="experience"
      aria-label="Work Experience"
    >
      <div className="text-center max-w-[900px] mx-auto mb-[clamp(48px,6vw,88px)]">
        <div className="mb-[clamp(20px,2.5vw,32px)]">
          <span className="pill tracking-[0.1em] py-1 px-4 text-[10.5px] text-[#555] border-[var(--hairline)] bg-black/[0.02]">
            CAREER TIMELINE
          </span>
        </div>

        <h2 className="display display-m" aria-label="WORK EXPERIENCE">
          <span aria-hidden="true">
            {EXPERIENCE_DATA.titleLetters.map((word, wIdx) => (
              <span key={word.map((item) => item.text).join("") + wIdx}>
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

        <div>
          <p className="lede text-[#555] max-w-[58ch] mx-auto mt-5">{lede}</p>
        </div>
      </div>

      <div className="relative max-w-[980px] mx-auto pb-5">
        <div
          className="hidden md:block absolute left-5 top-[29px] bottom-[30px] w-[2px] bg-gradient-to-b from-[var(--ink-black)] via-black/25 to-black/[0.06]"
          aria-hidden="true"
        ></div>

        <div className="flex flex-col gap-[clamp(24px,3.2vw,40px)]">
          {roles.map((item, idx) => (
            <div key={idx} className="group flex items-start gap-[clamp(16px,2.5vw,32px)] relative">
              {/* Timeline Connector & Node */}
               <div className="hidden md:flex relative justify-center items-center w-[42px] shrink-0 pt-[18px]" aria-hidden="true">
                <div
                  className={`w-3.5 h-3.5 rounded-full z-[2] relative transition-transform duration-300 ease-[var(--ease)] group-hover:scale-125 border-[2.5px] ${
                    item.isCurrent
                      ? 'bg-[#22c55e] border-[#22c55e]'
                      : 'bg-[var(--paper)] border-[var(--ink)]'
                  }`}
                >
                  {item.isCurrent && (
                    <span className="absolute -inset-[5px] rounded-full bg-[#22c55e]/40 animate-ping pointer-events-none"></span>
                  )}
                </div>
              </div>

              {/* Experience Card */}
              <div className="flex-1 bg-[var(--paper)] border border-[var(--hairline)] rounded-[20px] p-[clamp(20px,2.4vw,32px)] flex flex-col gap-[clamp(14px,1.6vw,20px)] transition-all duration-350 ease-[var(--ease)] shadow-[0_4px_16px_-8px_rgba(0,0,0,0.04)] group-hover:-translate-y-1 group-hover:border-[#999] group-hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.09),0_0_0_1px_rgba(0,0,0,0.03)]">
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center flex-wrap gap-2">
                    <span
                      className={`pill tracking-[0.07em] py-[3.5px] px-3 text-[10px] font-semibold inline-flex items-center gap-1.5 transition-colors ${
                        item.isCurrent
                          ? "!bg-[var(--ink-black)] !text-white !border-[var(--ink-black)]"
                          : "text-[var(--ink)] border-[var(--hairline)] bg-black/[0.02]"
                      }`}
                    >
                      {item.isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shrink-0"></span>}
                      {item.period}
                    </span>
                    <span className="pill tracking-[0.06em] py-[3px] px-2.5 text-[9.5px] text-[var(--muted)] border-[var(--hairline)]">
                      {item.type}
                    </span>
                  </div>

                  <span className="text-[11px] tracking-[0.05em] text-[var(--muted)] inline-flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {item.location}
                  </span>
                </div>

                {/* Role & Company */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                    <h3 className="text-[clamp(20px,1.8vw,26px)] leading-[1.15] text-[var(--ink)] m-0 font-normal">
                      {item.role}
                    </h3>
                    <span className="text-[clamp(13px,1.2vw,16px)] text-[#555] font-medium tracking-[0.03em]">
                      @ {item.company}
                    </span>
                  </div>

                  <p className="text-[#555] text-[clamp(12.5px,1.05vw,14.5px)] leading-[1.55] normal-case max-w-[68ch] m-0">
                    {item.description}
                  </p>

                  {/* Highlights / Accomplishments */}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="flex flex-col gap-2 list-none p-0 mt-1.5">
                      {item.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-[#444] leading-[1.55] normal-case text-[clamp(12px,0.95vw,13.5px)]">
                          <span className="text-[var(--ink-black)] text-[11px] shrink-0 mt-px" aria-hidden="true">▸</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Tech Stack Chips */}
                {item.tech && item.tech.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/[0.06]" aria-label="Technologies and tools used">
                    {item.tech.map((tool) => (
                      <span key={tool} className="text-[#404040] bg-black/[0.03] border border-black/[0.07] rounded-full py-[3px] px-2.5 text-[9.5px] tracking-[0.05em] font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;

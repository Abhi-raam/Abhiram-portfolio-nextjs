"use client";

import React from "react";
import { ABOUT_DATA } from "@/data/siteData";

interface StatItem {
  value: string;
  suffix?: string;
  label: string;
}

interface AboutProps {
  quote?: string;
  bio1?: string;
  stats?: StatItem[];
  ctaHref?: string;
}

export function About({
  quote,
  bio1,
  stats = ABOUT_DATA.stats,
  ctaHref = ABOUT_DATA.ctaHref,
}: AboutProps) {
  const displayQuote =
    (bio1 ? (bio1.startsWith("“") ? bio1 : `“${bio1}”`) : undefined) ||
    quote ||
    ABOUT_DATA.quote;

  const safeStats =
    stats && Array.isArray(stats) && stats.length > 0
      ? stats
      : ABOUT_DATA.stats;

  return (
    <section
      className="scene py-[clamp(72px,9vw,150px)] px-[var(--gutter)]"
      id="about"
      aria-label="About"
    >
      <div className="flex flex-col lg:flex-row flex-wrap justify-between items-start lg:items-end gap-6 lg:gap-[clamp(32px,5vw,96px)] mb-[clamp(56px,7vw,104px)]">
        <div className="flex-none flex items-center gap-[clamp(16px,2vw,32px)]">
          <h2 className="display display-l" aria-label="ABOUT">
            <span aria-hidden="true">
              <span className="gw">
                {ABOUT_DATA.titleLetters.map((item, idx) => (
                  <span
                    key={idx}
                    className={`gl ${item.ghost ? "ghost" : ""}`}
                  >
                    {item.text}
                  </span>
                ))}
              </span>
            </span>
          </h2>
          <a
            className="circle-btn circle-btn--ne bg-[var(--paper)] !w-[clamp(52px,5.5vw,76px)]"
            href={ctaHref}
            aria-label="Go to contact"
            onClick={(e) => e.currentTarget.blur()}
          >
            <svg viewBox="0 0 24 24" className="arr" aria-hidden="true">
              <path d="M4 12h16M15 7l5 5-5 5"></path>
            </svg>
          </a>
        </div>
        <div>
          <p className="lede text-left lg:text-right flex-none max-w-full lg:max-w-[44ch]">
            {displayQuote}
          </p>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 ${
          safeStats.length === 4
            ? "sm:grid-cols-4"
            : safeStats.length === 2
            ? "sm:grid-cols-2"
            : "sm:grid-cols-3"
        } w-full`}
      >
        {safeStats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center gap-3.5 py-[clamp(28px,3.6vw,52px)] px-4 border border-[var(--hairline)] sm:[&:not(:first-child)]:border-l-0 [&:not(:first-child)]:border-t-0 sm:[&:not(:first-child)]:border-t"
          >
            <b
              data-value={stat.value}
              data-suffix={stat.suffix || ""}
              className="font-normal text-[clamp(38px,4.8vw,68px)] leading-none"
            >
              {stat.value}
              {stat.suffix || ""}
            </b>
            <span className="text-[var(--ink)] tracking-[0.08em] text-[11px] micro">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;

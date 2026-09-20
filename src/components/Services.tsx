"use client";

import React from "react";
import { SERVICES_DATA } from "@/data/siteData";

export interface ServiceItem {
  _id?: string;
  number?: string;
  category?: string;
  titlePrefix?: string;
  titleGhost?: string;
  name?: string;
  description: string;
  chips?: Array<string | { label: string; featured?: boolean }>;
  layout?: "wide" | "compact" | string;
  href?: string;
  order?: number;
}

interface ServicesProps {
  services?: ServiceItem[];
  lede?: string;
}

export function Services({ services, lede = SERVICES_DATA.lede }: ServicesProps) {
  const items = services && services.length > 0 ? services : SERVICES_DATA.items;

  // Dynamically group based on Sanity "layout" field (fallback to first 2 wide, rest compact)
  const hasLayoutSpecified = items.some((item) => item.layout);
  const wideCards = hasLayoutSpecified
    ? items.filter((item) => item.layout === "wide")
    : items.slice(0, 2);
  const compactCards = hasLayoutSpecified
    ? items.filter((item) => item.layout !== "wide")
    : items.slice(2);

  return (
    <section
      className="scene pt-[clamp(40px,4.5vw,80px)] px-[var(--gutter)] pb-[clamp(72px,9vw,150px)]"
      id="services"
      aria-label="Services"
    >
      <div className="text-center max-w-[900px] mx-auto mb-[clamp(48px,6vw,88px)]">
        <h2 className="display display-m" aria-label="AREAS OF EXPERTISE">
          <span aria-hidden="true">
            {SERVICES_DATA.titleLines.map((line, lineIdx) => (
              <span key={lineIdx}>
                {lineIdx > 0 && <br />}
                {line.map((word, wordIdx) => (
                  <span key={wordIdx}>
                    {wordIdx > 0 && " "}
                    <span className="gw">
                      {word.map((item, charIdx) => (
                        <span
                          key={charIdx}
                          className={`gl ${item.ghost ? "ghost" : ""}`}
                        >
                          {item.char}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h2>
        <div>
          <p className="lede">{lede}</p>
        </div>
      </div>

      {/* Services Bento Container */}
      <div className="flex flex-col gap-5 max-w-[1240px] mx-auto w-full">
        {/* Top Row: 2 Wider Cards */}
        <div className="flex flex-col md:flex-row gap-5 w-full">
          {wideCards.map((serv, idx) => (
            <ServiceBentoCard
              key={(serv as any)._id || serv.number || idx}
              serv={serv}
              idx={idx}
              isWide={true}
            />
          ))}
        </div>

        {/* Bottom Row: Compact Cards */}
        {compactCards.length > 0 && (
          <div className="flex flex-col md:flex-row gap-5 w-full">
            {compactCards.map((serv, idx) => (
              <ServiceBentoCard
                key={(serv as any)._id || serv.number || idx + 2}
                serv={serv}
                idx={idx + 2}
                isWide={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceBentoCard({
  serv,
  idx,
  isWide,
}: {
  serv: ServiceItem;
  idx: number;
  isWide: boolean;
}) {
  const indexFormatted = serv.number || String(idx + 1).padStart(2, "0");
  const category = serv.category || "SPECIALTY";

  // Split title into bold prefix and ghost suffix
  let prefix = serv.titlePrefix;
  let ghost = serv.titleGhost;
  if (!prefix && serv.name) {
    const parts = serv.name.trim().split(" ");
    if (parts.length > 1) {
      ghost = parts.pop();
      prefix = parts.join(" ") + " ";
    } else {
      prefix = serv.name;
      ghost = "";
    }
  }

  return (
    <a
      href={serv.href || "#contact"}
      className={`group bg-white border border-[#e5e5e5] rounded-[26px] flex flex-col justify-between no-underline text-inherit relative transition-all duration-300 ease-[var(--ease)] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:border-[#cfcfcf] hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.09)] h-full ${
        isWide
          ? "flex-1 min-w-0 md:basis-1/2 p-[clamp(28px,2.8vw,36px)_clamp(24px,2.4vw,32px)] gap-[clamp(18px,2vw,24px)]"
          : "flex-1 min-w-0 md:basis-1/3 p-[clamp(24px,2.2vw,30px)_clamp(20px,1.8vw,26px)] gap-[clamp(18px,2vw,24px)]"
      }`}
      aria-label={`${prefix}${ghost}: ${category}`}
    >
      {/* Top Bar: Pill on left, circular arrow button on right */}
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-[7px] py-[4.5px] px-3.5 border border-[#e2e2e2] rounded-full text-[10.5px] tracking-[0.08em] font-medium text-[#737373] bg-white">
          <span className="text-[#666] font-semibold">{indexFormatted}</span>
          <span className="text-[#c4c4c4]">/</span>
          <span className="text-[#222] font-semibold">{category}</span>
        </span>
        <span
          className="w-9 h-9 rounded-full border border-[#e2e2e2] grid place-items-center text-[#222] bg-white transition-all duration-250 ease-[var(--ease)] shrink-0 group-hover:bg-[#0c0c0c] group-hover:border-[#0c0c0c] group-hover:text-white"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="transition-transform duration-250 ease-[var(--ease)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </span>
      </div>

      {/* Body: Dual-tone Title + Description */}
      <div className="flex flex-col gap-3">
        <h3
          className={`leading-[1.15] tracking-[-0.01em] uppercase m-0 ${
            isWide
              ? "text-[clamp(22px,2.1vw,27px)]"
              : "text-[clamp(19px,1.7vw,23px)]"
          }`}
        >
          <span className="text-[#0c0c0c] font-bold">{prefix}</span>
          {ghost && <span className="text-[#8c8c8c] font-normal">{ghost}</span>}
        </h3>
        <p className="text-[#737373] text-[clamp(10.5px,0.82vw,11.5px)] leading-[1.62] tracking-[0.03em] m-0 uppercase">
          {serv.description}
        </p>
      </div>

      {/* Bottom: Tag Chips */}
      {serv.chips && serv.chips.length > 0 && (
        <div className="flex flex-wrap gap-[7px] mt-auto pt-1">
          {serv.chips.map((chip, cIdx) => {
            const label = typeof chip === "string" ? chip : chip.label;
            const isFeatured =
              (typeof chip === "object" && chip.featured) ||
              (cIdx === 0 && typeof chip === "string");
            return (
              <span
                key={label || cIdx}
                className={`py-[4.5px] px-3 border rounded-full text-[9.5px] tracking-[0.05em] uppercase transition-colors duration-200 ${
                  isFeatured
                    ? "bg-[#0c0c0c] border-[#0c0c0c] text-white font-semibold"
                    : "bg-white border-[#e2e2e2] text-[#262626] font-medium"
                }`}
              >
                {label}
              </span>
            );
          })}
        </div>
      )}
    </a>
  );
}

export default Services;

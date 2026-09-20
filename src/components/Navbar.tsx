"use client";

import React, { useState } from "react";
import { NAVBAR_DATA } from "@/data/siteData";

interface NavbarProps {
  name?: string;
  wordmarkGhost?: string;
  wordmarkRest?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

export function Navbar({
  name,
  wordmarkGhost,
  wordmarkRest,
  githubUrl,
  linkedinUrl,
  email,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Compute wordmark from custom props or fallback to name/siteData
  let ghostLetter = wordmarkGhost || NAVBAR_DATA.wordmark.ghostLetter;
  let restOfName = wordmarkRest || NAVBAR_DATA.wordmark.restOfName;
  if (!wordmarkGhost && !wordmarkRest && name && name.length > 0) {
    ghostLetter = name[0];
    const firstName = name.split(" ")[0];
    restOfName = firstName.slice(1) + ".";
  }

  // Social links fallback with sanity props
  const socials = [
    {
      label: "GitHub",
      glyph: "GH",
      href: githubUrl || "https://github.com/Abhi-raam",
    },
    {
      label: "LinkedIn",
      glyph: "in",
      href: linkedinUrl || "https://www.linkedin.com/in/abhiram-suresh",
    },
    {
      label: "Contact",
      href: email ? `mailto:${email}` : "#contact",
      isEmailIcon: true,
    },
  ];

  const toggleMenu = (open: boolean) => {
    setMenuOpen(open);
    if (typeof document !== "undefined") {
      if (open) {
        document.body.classList.add("menu-open");
      } else {
        document.body.classList.remove("menu-open");
      }
    }
  };

  return (
    <>
      <a
        className="skip absolute -top-[60px] focus:top-6 left-6 z-[99] bg-[var(--ink-black)] text-white rounded-full tracking-[0.08em] py-3 px-6 text-[11px] transition-[top] duration-300 ease-[var(--ease)]"
        href="#main"
      >
        Skip to content
      </a>

      <header
        className="flex items-center justify-between gap-6 py-6 px-[var(--gutter)]"
        id="home"
      >
        <div className="flex items-center gap-[clamp(20px,4vw,56px)]">
          <a
            className="tracking-[0.04em] text-[17px] font-medium text-[var(--ink)] no-underline"
            href="#home"
          >
            <span className="ghost">{ghostLetter}</span>
            {restOfName}
          </a>
          <nav className="hidden lg:flex items-center gap-2" aria-label="Primary">
            {NAVBAR_DATA.links.map((link) => (
              <a
                key={link.href}
                className="pill tracking-[0.08em] h-[34px] px-[22px] text-[11px] no-underline"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {socials.map((soc) =>
            soc.isEmailIcon ? (
              <a
                key={soc.label}
                className="hidden sm:grid w-[42px] h-[42px] aspect-square rounded-full border border-[var(--hairline)] place-items-center transition-colors duration-200 hover:bg-[var(--ink-black)] hover:border-[var(--ink-black)] hover:text-white"
                href={soc.href}
                aria-label={soc.label}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[42%] h-[42%] stroke-current fill-none stroke-[1.3px]"
                  aria-hidden="true"
                >
                  <rect x="3.6" y="5.6" width="16.8" height="12.8" rx="2.6"></rect>
                  <path d="M4.4 7.4l7.6 5.8 7.6-5.8"></path>
                </svg>
              </a>
            ) : (
              <a
                key={soc.label}
                className="hidden sm:grid w-[42px] h-[42px] aspect-square rounded-full border border-[var(--hairline)] place-items-center transition-colors duration-200 hover:bg-[var(--ink-black)] hover:border-[var(--ink-black)] hover:text-white"
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={soc.label}
              >
                <span
                  className="text-[11px] font-medium leading-none select-none"
                  aria-hidden="true"
                >
                  {soc.glyph}
                </span>
              </a>
            )
          )}
          <button
            className="flex lg:hidden w-[42px] h-[42px] aspect-square rounded-full border border-[var(--hairline)] flex-col items-center justify-center transition-colors duration-200 hover:bg-[var(--ink-black)] hover:border-[var(--ink-black)] hover:text-white"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="menu"
            onClick={() => toggleMenu(!menuOpen)}
          >
            <span
              className="block w-4 h-[1.5px] my-[2.5px] bg-current rounded-[1px]"
              aria-hidden="true"
            ></span>
            <span
              className="block w-4 h-[1.5px] my-[2.5px] bg-current rounded-[1px]"
              aria-hidden="true"
            ></span>
            <span
              className="block w-4 h-[1.5px] my-[2.5px] bg-current rounded-[1px]"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-[var(--ink-black)] text-white flex flex-col justify-center items-center gap-[18px]"
          id="menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <button
            className="circle-btn menu-close absolute top-7 right-7 w-12 border-[var(--hairline-dark)] text-white"
            aria-label="Close menu"
            onClick={() => toggleMenu(false)}
          >
            <svg viewBox="0 0 24 24" className="arr" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6"></path>
            </svg>
          </button>
          {NAVBAR_DATA.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => toggleMenu(false)}
              className="tracking-[0.02em] rounded-[var(--radius-pill)] border border-transparent py-1.5 px-[34px] text-[clamp(28px,6vw,52px)] transition-colors hover:border-[var(--hairline-dark)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default Navbar;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { CONTACT_DATA } from "@/data/siteData";
import { getChannelBadge } from "@/components/BrandIcons";

export interface ChannelItem {
  id: string;
  type: string;
  label: string;
  value: string;
  displayValue: string;
  tag: string;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  featured?: boolean;
}

interface ContactFooterProps {
  email?: string;
  mobile?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  location?: string;
  availabilityStatus?: string;
  availabilityLocation?: string;
  scatterKeywords?: string[];
  channels?: ChannelItem[];
  legalCopyright?: string;
  legalCredit?: string;
}

export function ContactFooter({
  email = CONTACT_DATA.channels.find((c) => c.id === "email")?.value,
  mobile,
  linkedinUrl,
  githubUrl,
  location,
  availabilityStatus = CONTACT_DATA.availability.status,
  availabilityLocation = location || CONTACT_DATA.availability.location,
  scatterKeywords,
  channels,
  legalCopyright = CONTACT_DATA.legal.copyright,
  legalCredit = CONTACT_DATA.legal.credit,
}: ContactFooterProps) {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Build dynamic channels if custom props passed
  const activeChannels: ChannelItem[] = React.useMemo(() => {
    if (channels && Array.isArray(channels) && channels.length > 0) return channels;

    return [
      {
        id: "email",
        type: "email",
        label: "Email",
        value: email || "iabhiramsuresh@gmail.com",
        displayValue: email || "iabhiramsuresh@gmail.com",
        tag: "Direct Inbox",
        title: "Send an Email",
        description:
          "Reach out for project inquiries, opportunities, or collaborations.",
        href: `mailto:${email || "iabhiramsuresh@gmail.com"}`,
        actionLabel: "Write Email",
        featured: true,
      },
      {
        id: "whatsapp",
        type: "whatsapp",
        label: "WhatsApp",
        value: mobile || "+91 8156806105",
        displayValue: mobile || "+91 8156806105",
        tag: "Instant Chat",
        title: "Quick WhatsApp Message",
        description:
          "Reach out directly on WhatsApp for project inquiries and quick conversations.",
        href: `https://wa.me/${(mobile || "918156806105").replace(/\D/g, "")}`,
        actionLabel: "Open Chat",
        featured: false,
      },
      {
        id: "linkedin",
        type: "linkedin",
        label: "LinkedIn",
        value: linkedinUrl ? linkedinUrl.split("/in/")[1] || "abhiram-suresh" : "abhiram-suresh",
        displayValue: "/in/abhiram-suresh",
        tag: "Professional",
        title: "Connect on LinkedIn",
        description:
          "Connect with me professionally and explore my experience and projects.",
        href: linkedinUrl || "https://www.linkedin.com/in/abhiram-suresh",
        actionLabel: "View Profile",
        featured: false,
      },
      {
        id: "github",
        type: "github",
        label: "GitHub",
        value: githubUrl ? githubUrl.split(".com/")[1] || "Abhi-raam" : "Abhi-raam",
        displayValue: "@Abhi-raam",
        tag: "Code",
        title: "Explore GitHub Code",
        description: "Browse my repositories, projects, and development work.",
        href: githubUrl || "https://github.com/Abhi-raam",
        actionLabel: "View GitHub",
        featured: false,
      },
    ];
  }, [channels, email, mobile, linkedinUrl, githubUrl]);

  // Ambient particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;
    let animId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.45 + 0.15,
      });
    }

    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleCopyEmail = (emailStr: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(emailStr)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2400);
        })
        .catch(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2400);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = emailStr;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const emailChannel = activeChannels.find((c) => c.id === "email");
  const otherChannels = activeChannels.filter((c) => c.id !== "email");

  // Scatter keywords
  const activeKeywords = React.useMemo(() => {
    if (scatterKeywords && Array.isArray(scatterKeywords) && scatterKeywords.length > 0) {
      return scatterKeywords.map((name, idx) => {
        const defaultPositions = CONTACT_DATA.scatterKeywords;
        const pos = defaultPositions[idx % defaultPositions.length];
        return { name, left: pos.left, top: pos.top };
      });
    }
    return CONTACT_DATA.scatterKeywords;
  }, [scatterKeywords]);

  return (
    <section className="scene" id="contact" aria-label="Contact & Social Channels">
      <div className="relative py-[clamp(72px,9vw,140px)] px-6 sm:px-10 bg-[var(--ink-black)] text-white text-center overflow-hidden on-black">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 block"
          aria-hidden="true"
        ></canvas>

        <div
          className="scatter z-[1] h-[clamp(420px,60vw,760px)] bottom-auto"
          aria-hidden="true"
        >
          {activeKeywords.map((tag) => (
            <span key={tag.name} style={{ left: tag.left, top: tag.top }}>
              {tag.name}
            </span>
          ))}
        </div>

        <div className="relative z-[2] mx-auto">
          {/* Live Availability Status */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-[clamp(20px,2.5vw,32px)] z-[2] relative">
            <div className="inline-flex items-center gap-2.5 py-2 px-4.5 bg-white/[0.04] border border-white/12 rounded-full backdrop-blur-md text-[11px] tracking-[0.08em]">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]"></span>
              </span>
              <span className="text-[#e5e5e5] font-medium">
                {availabilityStatus}
              </span>
            </div>
            {availabilityLocation && (
              <div className="inline-flex items-center gap-1.5 py-2 px-4 text-[#8a8a8a] border border-white/[0.08] rounded-full tracking-[0.06em] text-[11px]">
                <svg
                  viewBox="0 0 24 24"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{availabilityLocation}</span>
              </div>
            )}
          </div>

          {/* Large Headline */}
          <h2
            className="text-white text-[clamp(52px,14.3vw,230px)] display mb-1 sm:mb-2"
            aria-label="LET'S TALK"
          >
            <span aria-hidden="true">
              {CONTACT_DATA.headlineLetters.map((word, wIdx) => (
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

          <p className="max-w-[58ch] text-[#9a9a9a] text-center mt-[clamp(20px,3vw,36px)] mx-auto mb-[clamp(32px,3.5vw,52px)] leading-[1.6] z-[2] relative lede">
            Have a project in mind, need a frontend developer, or just want to connect?
            <br />
            Reach out directly through any of the channels below.
          </p>

          {/* Bento Grid Showcase */}
          <div className="w-[min(100%,880px)] flex flex-col gap-[clamp(14px,1.6vw,20px)] mx-auto z-[2] relative">
            {/* Main Spotlight Card: Email */}
            {emailChannel && (
              <div className="relative text-left rounded-[var(--radius-card)] p-[clamp(22px,2.5vw,32px)] flex flex-col gap-[clamp(16px,1.8vw,22px)] overflow-hidden transition-all duration-300 ease-[var(--ease)] border border-white/10 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.015)_60%)] hover:border-white/30 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_16px_40px_-18px_rgba(0,0,0,0.6)]">
                <div
                  className="absolute -top-10 -right-10 w-[220px] h-[220px] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none"
                  aria-hidden="true"
                ></div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="tracking-[0.1em] text-[#d4d4d4] border border-white/[0.18] rounded-full py-1 px-3 text-[10px] micro">
                      {emailChannel.tag}
                    </span>
                    <span className="text-[#737373] tracking-[0.06em] micro">
                      Replies within 24 hours
                    </span>
                  </div>
                  <div
                    className="w-11 h-11 rounded-full border border-white/15 grid place-items-center text-white bg-white/[0.04]"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-white tracking-[-0.01em] text-[clamp(20px,2vw,28px)] leading-[1.05] display-m">
                    {emailChannel.title}
                  </h3>
                  <p className="text-[#8e8e8e] tracking-[0.02em] max-w-[52ch] leading-[1.5] lede">
                    {emailChannel.description}
                  </p>
                  <a
                    href={emailChannel.href}
                    className="text-[clamp(18px,2.5vw,32px)] text-white tracking-[-0.01em] mt-1.5 lowercase break-all inline-block transition-opacity duration-200 hover:opacity-80 hover:underline hover:underline-offset-[6px]"
                    aria-label={`Send email to ${emailChannel.value}`}
                  >
                    {emailChannel.displayValue}
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    className={`h-[clamp(40px,3.6vw,48px)] px-[clamp(18px,2vw,28px)] text-[clamp(10.5px,0.95vw,12.5px)] tracking-[0.06em] transition-all duration-250 ease-[var(--ease)] inline-flex items-center justify-center gap-2 rounded-full w-full sm:w-auto ${
                      copied
                        ? "!border-[#22c55e] !text-[#22c55e] !bg-[#22c55e]/[0.12]"
                        : "border border-white/25 text-white bg-transparent hover:border-white hover:bg-white/10"
                    }`}
                    onClick={() => handleCopyEmail(emailChannel.value)}
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>COPIED TO CLIPBOARD!</span>
                      </>
                    ) : (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                        </svg>
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={emailChannel.href}
                    className="group/mailBtn h-[clamp(40px,3.6vw,48px)] px-[clamp(18px,2vw,28px)] text-[clamp(10.5px,0.95vw,12.5px)] tracking-[0.06em] transition-all duration-250 ease-[var(--ease)] inline-flex items-center justify-center gap-2 rounded-full w-full sm:w-auto bg-white text-[var(--ink-black)] border border-white font-medium hover:bg-transparent hover:text-white no-underline"
                  >
                    <span>OPEN EMAIL APP</span>
                    <svg
                      viewBox="0 0 24 24"
                      className="stroke-current fill-none stroke-[1.8px] transition-transform duration-250 ease-[var(--ease)] group-hover/mailBtn:translate-x-1"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    >
                      <path d="M4 12h16M15 7l5 5-5 5"></path>
                    </svg>
                  </a>
                </div>
              </div>
            )}

            {/* Sub-grid of other channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[18px] w-full">
              {otherChannels.map((channel) => {
                const { badgeClass, Icon } = getChannelBadge(channel.type);
                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="group/ch relative text-left rounded-[var(--radius-card)] p-[clamp(18px,2vw,24px)] flex flex-col justify-between gap-3.5 min-h-[clamp(170px,17vw,210px)] text-inherit no-underline border border-white/10 bg-white/[0.025] transition-all duration-300 ease-[var(--ease)] overflow-hidden hover:border-white/30 hover:bg-white/[0.05] hover:-translate-y-1 hover:shadow-[0_16px_40px_-18px_rgba(0,0,0,0.6)]"
                    aria-label={`${channel.label}: ${channel.displayValue}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-10 h-10 rounded-full grid place-items-center border ${badgeClass}`}
                          aria-hidden="true"
                        >
                          <Icon size={21} />
                        </div>
                        <span className="tracking-[0.1em] text-[#d4d4d4] border border-white/[0.18] rounded-full py-1 px-3 text-[10px] micro">
                          {channel.tag}
                        </span>
                      </div>

                    <span
                      className="w-11 h-11 rounded-full border border-white/[0.18] text-white grid place-items-center transition-colors duration-200 group-hover/ch:bg-white group-hover/ch:border-white group-hover/ch:text-[var(--ink-black)]"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-[18px] h-[18px] stroke-current fill-none stroke-[1.4px]"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7M7 7h10v10"></path>
                      </svg>
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[#808080] tracking-[0.08em] font-medium micro">
                      {channel.displayValue}
                    </span>
                    <h4 className="text-white tracking-[-0.01em] text-[clamp(20px,2vw,26px)] leading-[1.1] mt-1 display-m">
                      {channel.label}
                    </h4>
                    <p className="text-[#8e8e8e] tracking-[0.02em] leading-[1.5] micro">
                      {channel.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-3.5 border-t border-white/[0.08] text-[#7a7a7a] tracking-[0.08em] transition-colors duration-200 group-hover/ch:text-white micro">
                    <span>{channel.actionLabel}</span>
                    <span className="text-[14px] transition-transform duration-250 ease-[var(--ease)] group-hover/ch:translate-x-1">
                      →
                    </span>
                  </div>
                </a>
              );
            })}
            </div>
          </div>
        </div>

        {/* Footer legal notes */}
        <div className="relative z-[2] text-[#8a8a8a] flex flex-wrap justify-between gap-4 mt-[clamp(24px,3vw,44px)] micro">
          <span>{legalCopyright}</span>
          <span>{legalCredit}</span>
        </div>
      </div>
    </section>
  );
}

export default ContactFooter;

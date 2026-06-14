"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Github, Linkedin } from "@/components/BrandIcons";

interface ContactProps {
  email?: string;
  mobile?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  location?: string;
}

export default function Contact({
  email,
  mobile,
  linkedinUrl,
  githubUrl,
  location,
}: ContactProps) {
  if (!email) return null;
  const contactInfo = [
    {
      icon: <Mail className="text-indigo-600" size={24} />,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    ...(linkedinUrl
      ? [
          {
            icon: <Linkedin className="text-blue-600" size={24} />,
            label: "LinkedIn",
            value: linkedinUrl.replace(/^https?:\/\/(www\.)?/, ""),
            href: linkedinUrl,
          },
        ]
      : []),
    ...(githubUrl
      ? [
          {
            icon: <Github className="text-slate-800" size={24} />,
            label: "GitHub",
            value: githubUrl.replace(/^https?:\/\/(www\.)?/, ""),
            href: githubUrl,
          },
        ]
      : []),
    ...(mobile
      ? [
          {
            icon: <Phone className="text-emerald-600" size={24} />,
            label: "Mobile",
            value: mobile,
            href: `tel:${mobile.replace(/[^0-9+]/g, '')}`,
          },
        ]
      : []),
    {
      icon: <MapPin className="text-rose-600" size={24} />,
      label: "Location",
      value: location,
    },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#home") {
      e.preventDefault();
      const el = document.querySelector("#home");
      if (el) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-violet-100/30 blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-slate-500 font-medium">
            Let&apos;s connect to discuss engineering roles, collaborations, or technical projects
          </p>
          <div className="w-12 h-1 bg-indigo-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Centered Grid of Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-100 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-md hover:border-slate-200/80 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                {info.icon}
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {info.label}
                </div>
                {info.href ? (
                  <a
                    href={info.href}
                    onClick={(e) => handleLinkClick(e, info.href!)}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors break-all"
                  >
                    {info.value}
                  </a>
                ) : (
                  <div className="text-sm font-semibold text-slate-700">{info.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

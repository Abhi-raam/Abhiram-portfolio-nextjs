"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, FolderGit2, Cpu, GitCommit } from "lucide-react";

interface StatItem {
  icon: string;
  value: string;
  label: string;
}

interface AboutProps {
  bio1?: string;
  bio2?: string;
  stats?: StatItem[];
  specialties?: string[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "briefcase":
      return <Briefcase className="text-indigo-600" size={24} />;
    case "folder":
      return <FolderGit2 className="text-violet-600" size={24} />;
    case "cpu":
      return <Cpu className="text-sky-600" size={24} />;
    case "commit":
      return <GitCommit className="text-emerald-600" size={24} />;
    default:
      return <Briefcase className="text-indigo-600" size={24} />;
  }
};

const getGradient = (iconName: string) => {
  switch (iconName) {
    case "briefcase":
      return "from-indigo-50 to-indigo-100/50";
    case "folder":
      return "from-violet-50 to-violet-100/50";
    case "cpu":
      return "from-sky-50 to-sky-100/50";
    case "commit":
      return "from-emerald-50 to-emerald-100/50";
    default:
      return "from-indigo-50 to-indigo-100/50";
  }
};

export default function About({
  bio1,
  bio2,
  stats = [],
  specialties,
}: AboutProps) {
  if (!bio1) return null;
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            About Me
          </h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto rounded-full" />
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Introduction text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-900">
              Passionate about building production-grade web solutions.
            </h3>
            
            <p className="text-slate-600 leading-relaxed">
              {bio1}
            </p>

            <p className="text-slate-600 leading-relaxed">
              {bio2}
            </p>

            {specialties && specialties.length > 0 && (
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialties.map((spec, specIdx) => (
                  <div key={specIdx} className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                    <span className="text-slate-700 font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Column 2: Stats cards grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {stats && stats.map((stat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-gradient-to-br ${getGradient(stat.icon)} border border-slate-100 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  {getIcon(stat.icon)}
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-950">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

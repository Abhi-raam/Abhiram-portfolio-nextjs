"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, FolderGit2, Cpu, GitCommit } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  gradient: string;
}

export default function About() {
  const stats: StatItem[] = [
    {
      icon: <Briefcase className="text-indigo-600" size={24} />,
      value: "2+ Years",
      label: "Exp in Web Dev",
      gradient: "from-indigo-50 to-indigo-100/50",
    },
    {
      icon: <FolderGit2 className="text-violet-600" size={24} />,
      value: "15+",
      label: "Completed Projects",
      gradient: "from-violet-50 to-violet-100/50",
    },
    {
      icon: <Cpu className="text-sky-600" size={24} />,
      value: "12+",
      label: "Technologies Mastered",
      gradient: "from-sky-50 to-sky-100/50",
    },
    {
      icon: <GitCommit className="text-emerald-600" size={24} />,
      value: "1.2k+",
      label: "GitHub Contributions",
      gradient: "from-emerald-50 to-emerald-100/50",
    },
  ];

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
              I am a 2024 Computer Science graduate who has transitioned into a highly focused
              Software Engineer, with a core expertise in modern frontend development. My passion
              lies in designing, building, and launching intuitive, sleek web applications that
              run seamlessly across all devices.
            </p>

            <p className="text-slate-600 leading-relaxed">
              With a solid foundation in React.js, Next.js, TypeScript, and Tailwind CSS, I build
              highly interactive interfaces. I am deeply concerned with writing clean, modular code
              and optimizing page speed and performance. My experience spans across collaborative,
              agile product teams as well as delivering key freelance solutions.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span className="text-slate-700 font-medium">Next.js & App Router Architecture</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span className="text-slate-700 font-medium">TypeScript Typings & Safety</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span className="text-slate-700 font-medium">Performance Optimization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span className="text-slate-700 font-medium">Progressive Web Apps (PWA)</span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Stats cards grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} border border-slate-100 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  {stat.icon}
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

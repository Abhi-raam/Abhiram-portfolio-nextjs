"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Monitor, Server, Wrench } from "lucide-react";

interface SkillItem {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools";
}

interface SkillsProps {
  skills?: SkillItem[];
}

export default function Skills({ skills = [] }: SkillsProps) {
  const categories = useMemo(() => [
    {
      title: "Frontend Development",
      icon: <Monitor className="text-indigo-600" size={20} />,
      color: "bg-indigo-600",
      bgColor: "bg-indigo-50",
      items: skills.filter((s) => s.category === "frontend"),
    },
    {
      title: "Backend & Database",
      icon: <Server className="text-violet-600" size={20} />,
      color: "bg-violet-600",
      bgColor: "bg-violet-50",
      items: skills.filter((s) => s.category === "backend"),
    },
    {
      title: "Tools & Deployments",
      icon: <Wrench className="text-emerald-600" size={20} />,
      color: "bg-emerald-600",
      bgColor: "bg-emerald-50",
      items: skills.filter((s) => s.category === "tools"),
    },
  ], [skills]);

  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Technical Skills
          </h2>
          <p className="text-slate-500 font-medium">Core tools and technologies I use to build projects</p>
          <div className="w-12 h-1 bg-indigo-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, catIdx) => (
            <div
              key={category.title}
              className="glass-card p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col h-full hover:border-slate-200 hover:shadow-md transition-all duration-300"
            >
              {/* Category Title Header */}
              <div className="flex items-center gap-3.5 mb-8">
                <div className={`w-10 h-10 rounded-xl ${category.bgColor} flex items-center justify-center`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{category.title}</h3>
              </div>

              {/* Progress Bars */}
              <div className="space-y-6 flex-1">
                {category.items.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{skill.name}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </div>
                    
                    {/* Track */}
                    <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden">
                      {/* Active Fill */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className={`h-full rounded-full ${category.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

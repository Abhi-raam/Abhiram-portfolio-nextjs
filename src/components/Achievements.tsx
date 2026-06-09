"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Zap, Database, Terminal, GraduationCap, Briefcase } from "lucide-react";

interface AchievementItem {
  icon: string;
  title: string;
  description: string;
}

interface AchievementsProps {
  achievements?: AchievementItem[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "award":
      return <Award className="text-amber-500" size={24} />;
    case "zap":
      return <Zap className="text-blue-500" size={24} />;
    case "database":
      return <Database className="text-emerald-500" size={24} />;
    case "terminal":
      return <Terminal className="text-indigo-500" size={24} />;
    case "graduation":
      return <GraduationCap className="text-violet-500" size={24} />;
    case "briefcase":
      return <Briefcase className="text-rose-500" size={24} />;
    default:
      return <Award className="text-amber-500" size={24} />;
  }
};

export default function Achievements({ achievements = [] }: AchievementsProps) {
  if (!achievements || achievements.length === 0) return null;
  return (
    <section id="achievements" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Key Achievements
          </h2>
          <p className="text-slate-500 font-medium">Milestones that highlight my dedication to software engineering</p>
          <div className="w-12 h-1 bg-indigo-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements && achievements.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={idx}
              className="p-6 md:p-8 rounded-2xl border border-slate-100 hover:border-slate-200/80 bg-slate-50/20 hover:bg-white flex flex-col gap-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100/50">
                {getIcon(item.icon)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

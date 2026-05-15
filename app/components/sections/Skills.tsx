"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { FadeIn } from "../animations/FadeIn";
import {
  Code2,
  Database,
  Cloud,
  Wrench,
  Globe,
  Sparkles,
  Braces,
  Server,
  Container,
  GitBranch,
  Terminal,
  Cpu,
  Zap,
  Layers,
} from "lucide-react";

import type { Dictionary } from "@/lib/i18n/dictionaries";

interface SkillsProps {
  dictionary: Dictionary;
}

export const Skills = ({ dictionary }: SkillsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  const skills = [
    {
      category: dictionary.skills.categories.frontend,
      items: dictionary.skills.items.frontend,
      icon: Braces,
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-blue-500/30",
      hoverBorder: "group-hover/card:border-blue-500",
      itemBorder: "border-blue-500/20 hover:border-blue-500/40",
      bgColor: "bg-blue-500/5",
      hoverBg: "hover:bg-blue-500/10",
    },
    {
      category: dictionary.skills.categories.backend,
      items: dictionary.skills.items.backend,
      icon: Server,
      color: "from-green-500 to-emerald-500",
      borderColor: "border-green-500/30",
      hoverBorder: "group-hover/card:border-green-500",
      itemBorder: "border-green-500/20 hover:border-green-500/40",
      bgColor: "bg-green-500/5",
      hoverBg: "hover:bg-green-500/10",
    },
    {
      category: dictionary.skills.categories.database,
      items: dictionary.skills.items.database,
      icon: Database,
      color: "from-purple-500 to-pink-500",
      borderColor: "border-purple-500/30",
      hoverBorder: "group-hover/card:border-purple-500",
      itemBorder: "border-purple-500/20 hover:border-purple-500/40",
      bgColor: "bg-purple-500/5",
      hoverBg: "hover:bg-purple-500/10",
    },
    {
      category: dictionary.skills.categories.devops,
      items: dictionary.skills.items.devops,
      icon: Container,
      color: "from-orange-500 to-red-500",
      borderColor: "border-orange-500/30",
      hoverBorder: "group-hover/card:border-orange-500",
      itemBorder: "border-orange-500/20 hover:border-orange-500/40",
      bgColor: "bg-orange-500/5",
      hoverBg: "hover:bg-orange-500/10",
    },
    {
      category: dictionary.skills.categories.other,
      items: dictionary.skills.items.other,
      icon: GitBranch,
      color: "from-yellow-500 to-amber-500",
      borderColor: "border-yellow-500/30",
      hoverBorder: "group-hover/card:border-yellow-500",
      itemBorder: "border-yellow-500/20 hover:border-yellow-500/40",
      bgColor: "bg-yellow-500/5",
      hoverBg: "hover:bg-yellow-500/10",
    },
    {
      category: dictionary.skills.categories.ai,
      items: dictionary.skills.items.ai,
      icon: Sparkles,
      color: "from-violet-500 to-indigo-500",
      borderColor: "border-violet-500/30",
      hoverBorder: "group-hover/card:border-violet-500",
      itemBorder: "border-violet-500/20 hover:border-violet-500/40",
      bgColor: "bg-violet-500/5",
      hoverBg: "hover:bg-violet-500/10",
    },
  ];

  // Additional tools/skills with translations
  const otherTools = [
    {
      icon: Terminal,
      name: dictionary.skills.additional_tools?.terminal || "Terminal",
      color: "text-gray-400",
    },
    {
      icon: Cpu,
      name:
        dictionary.skills.additional_tools?.system_design || "System Design",
      color: "text-primary-400",
    },
    {
      icon: Zap,
      name: dictionary.skills.additional_tools?.performance || "Performance",
      color: "text-yellow-400",
    },
    {
      icon: Layers,
      name: dictionary.skills.additional_tools?.architecture || "Architecture",
      color: "text-purple-400",
    },
  ];

  // Helper function to clean and split items
  const getTechItems = (itemsString: string) => {
    return itemsString
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  return (
    <section
      id="skills"
      ref={containerRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-50/50 to-transparent dark:from-secondary-900/20" />

      {/* Animated background orbs */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          opacity,
        }}
        className="absolute bottom-20 right-20 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] opacity-5" />

      <div className="container-custom mx-auto relative z-10">
        <SectionTitle
          title={dictionary.skills.title}
          subtitle={dictionary.skills.subtitle || "Technologies I work with"}
          align="center"
        />

        {/* Skills Grid - All cards same height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {skills.map((skill, index) => {
            const techItems = getTechItems(skill.items);

            return (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative group/card h-full"
                >
                  {/* Main card with colored border on hover - full height */}
                  <div
                    className={`relative bg-gradient-to-br from-secondary-900/90 to-secondary-800/90 backdrop-blur-sm rounded-2xl border-2 transition-all duration-300 h-full ${
                      skill.borderColor
                    } ${skill.hoverBorder} overflow-hidden`}
                  >
                    {/* Animated gradient border (subtle) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000" />

                    <div className="p-8 flex flex-col h-full">
                      {/* Header with icon and category */}
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-r ${skill.color} p-3 shadow-lg`}
                        >
                          <skill.icon className="w-full h-full text-white" />
                        </div>

                        {/* Proficiency indicator with translation */}
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i < 4 ? "bg-primary-400" : "bg-secondary-600"
                              }`}
                              title={
                                i < 4
                                  ? dictionary.skills.proficient || "Proficient"
                                  : dictionary.skills.learning || "Learning"
                              }
                            />
                          ))}
                        </div>
                      </div>

                      {/* Category title */}
                      <h3 className="text-2xl font-bold mb-6 text-white group-hover/card:gradient-text transition-all duration-300">
                        {skill.category}
                      </h3>

                      {/* ALL technology items in one unified list - flex-grow to push content */}
                      <div className="flex flex-wrap gap-2 mb-auto">
                        {techItems.map((tech: string, idx: number) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + idx * 0.03 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg border-2 ${skill.itemBorder} ${skill.bgColor} ${skill.hoverBg} text-secondary-200 hover:text-white transition-all duration-300 cursor-default flex items-center justify-center`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-3xl" />
                      <Sparkles
                        size={14}
                        className="absolute bottom-4 right-4 text-primary-400/30"
                      />

                      {/* Progress bar at bottom */}
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${skill.color} scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500 origin-left`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {/* Additional Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="gradient-text">
              {dictionary.skills.additional_title || "Additional"}
            </span>{" "}
            {dictionary.skills.tools_expertise || "Tools & Expertise"}
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {otherTools.map((tool, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group"
              >
                <div className="relative px-6 py-3 bg-secondary-900/50 backdrop-blur-sm rounded-xl border-2 border-secondary-800 hover:border-primary-500/50 transition-colors duration-300 flex items-center gap-3">
                  <tool.icon size={18} className={tool.color} />
                  <span className="text-sm font-medium text-secondary-300">
                    {tool.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            {
              label:
                dictionary.skills.stats?.years_experience || "Years Experience",
              value: dictionary.skills.stats?.years_experience_value || "10+",
              color: "from-blue-500 to-cyan-500",
              borderColor: "border-blue-500/30",
              hoverBorder: "hover:border-blue-500",
            },
            {
              label: dictionary.skills.stats?.technologies || "Technologies",
              value: dictionary.skills.stats?.technologies_value || "25+",
              color: "from-purple-500 to-pink-500",
              borderColor: "border-purple-500/30",
              hoverBorder: "hover:border-purple-500",
            },
            {
              label: dictionary.skills.stats?.projects || "Projects",
              value: dictionary.skills.stats?.projects_value || "50+",
              color: "from-green-500 to-emerald-500",
              borderColor: "border-green-500/30",
              hoverBorder: "hover:border-green-500",
            },
            {
              label:
                dictionary.skills.stats?.certifications || "Certifications",
              value: dictionary.skills.stats?.certifications_value || "5+",
              color: "from-orange-500 to-red-500",
              borderColor: "border-orange-500/30",
              hoverBorder: "hover:border-orange-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative group text-center"
            >
              <div
                className={`relative p-4 bg-secondary-900/30 backdrop-blur-sm rounded-2xl border-2 ${stat.borderColor} ${stat.hoverBorder} transition-colors duration-300`}
              >
                <div
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-secondary-400 mt-1">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

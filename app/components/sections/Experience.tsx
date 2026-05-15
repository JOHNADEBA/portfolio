"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import {
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  Code2,
  Building2,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface ExperienceProps {
  dictionary: Dictionary;
}

export const Experience = ({ dictionary }: ExperienceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const jobs = dictionary.experience.jobs;

  return (
    <section
      id="experience"
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-secondary-50/50 to-transparent dark:from-secondary-900/20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] opacity-5" />

      {/* Animated gradient orbs */}
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [100, -100]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]),
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]),
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
      />

      {/* Main timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary-500/20 to-transparent blur-sm" />
      </div>

      <div className="container-custom mx-auto relative z-10">
        <SectionTitle
          title={dictionary.experience.title}
          subtitle={dictionary.experience.subtitle}
          align="center"
        />

        <div className="relative mt-20">
          {jobs.map((job: any, index: number) => {
            const isEven = index % 2 === 0;

            // Parse date range
            const dateRange = job.role.split("|")[1]?.trim() || job.role;
            const [startDate, endDate] = dateRange.split(" - ");

            // Calculate progress for this item
            const progress = useTransform(
              scrollYProgress,
              [index / jobs.length, (index + 1) / jobs.length],
              [0, 1],
            );

            // Split company name and location (handles both - and —)
            const companyParts = job.company.split(/[-—]/).map((part: string) => part.trim());
            const companyName = companyParts[0] || job.company;
            const location = companyParts[1] || "Remote";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 mb-12 last:mb-0 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot with glow */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <motion.div style={{ scale: progress }} className="relative">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/30" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary-500"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>

                {/* Date card - closer to content */}
                <div className={`w-full lg:w-1/2 ${isEven ? "lg:pl-8" : "lg:pr-8"} mb-2 lg:mb-0 flex ${isEven ? "lg:justify-end" : "lg:justify-start"}`}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 backdrop-blur-sm border border-primary-500/20 ${
                      isEven ? "lg:ml-auto" : ""
                    }`}
                  >
                    <Calendar size={14} className="text-primary-400" />
                    <span className="text-xs sm:text-sm font-medium text-white">
                      {startDate} —{" "}
                      <span className="text-primary-400">{endDate}</span>
                    </span>
                    {endDate === "Present" && (
                      <span className="relative flex h-2 w-2 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* Content card */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative group"
                  >
                    {/* Glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                    {/* Main card */}
                    <div className="relative bg-gradient-to-br from-secondary-900/90 to-secondary-800/90 backdrop-blur-sm rounded-2xl border border-secondary-800 overflow-hidden">
                      {/* Animated gradient border */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <div className="p-5 sm:p-6">
                        {/* ========== FIXED HEADER FOR ALL SCREEN SIZES ========== */}
                        {/* Company + Role Header – reduced spacing */}
                        <div className="flex flex-col xl:flex-row xl:items-start gap-3 xl:gap-4 mb-4">
                          {/* Company icon - hidden below xl */}
                          <div className="hidden xl:block flex-shrink-0 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur-md opacity-50" />
                            <div className="relative w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-xl">
                              <Building2 className="text-white" size={24} />
                            </div>
                          </div>

                          {/* Main content */}
                          <div className="flex-1 flex flex-col xl:flex-row xl:items-start gap-3 xl:gap-4">
                            {/* Left: Company name + location */}
                            <div className="w-full xl:w-2/3">
                              <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 break-words">
                                {companyName}
                              </h3>
                              <div className="flex items-start gap-2 text-secondary-400 text-xs sm:text-sm">
                                <MapPin size={12} className="text-primary-400 flex-shrink-0 mt-0.5" />
                                <span className="break-words">{location}</span>
                              </div>
                            </div>

                            {/* Right: Role badge */}
                            <div className="w-full xl:w-1/3 xl:flex xl:justify-end">
                              <div className="inline-block px-3 py-1 bg-primary-500/10 rounded-full border border-primary-500/30">
                                <span className="text-xs font-medium text-primary-400 break-words text-center">
                                  {job.role.split("|")[0]?.trim()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* ========== END FIXED HEADER ========== */}

                        {/* Achievements list - reduced spacing */}
                        <ul className="space-y-2 sm:space-y-3 mb-4">
                          {job.points.map((point: string, idx: number) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-2 group/item"
                            >
                              <div className="relative mt-1 flex-shrink-0">
                                <div className="w-4 h-4 bg-primary-500/10 rounded-full flex items-center justify-center group-hover/item:bg-primary-500/20 transition-colors">
                                  <ArrowRight size={10} className="text-primary-400" />
                                </div>
                                <motion.div
                                  className="absolute inset-0 rounded-full bg-primary-500/20"
                                  animate={{ scale: [1, 1.5, 1] }}
                                  transition={{
                                    duration: 2,
                                    delay: idx * 0.2,
                                    repeat: Infinity,
                                  }}
                                />
                              </div>
                              <span className="text-secondary-300 text-xs sm:text-sm leading-relaxed flex-1">
                                {point}
                              </span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Tech stack - reduced spacing */}
                        {job.tech && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 pt-4 border-t border-secondary-800"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Code2 size={14} className="text-primary-400 flex-shrink-0" />
                              <span className="text-xs font-medium text-primary-400">
                                Technologies
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {job.tech
                                .split(",")
                                .map((tech: string, idx: number) => (
                                  <motion.span
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + idx * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="px-2 py-1 text-xs font-medium rounded-lg bg-secondary-800/50 border border-secondary-700 text-secondary-300 hover:border-primary-500/50 hover:text-primary-400 transition-all duration-300"
                                  >
                                    {tech.trim()}
                                  </motion.span>
                                ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Decorative sparkle */}
                        <Sparkles
                          size={14}
                          className="absolute bottom-3 right-3 text-primary-400/30"
                        />

                        {/* Progress indicator */}
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                          style={{ scaleX: progress }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
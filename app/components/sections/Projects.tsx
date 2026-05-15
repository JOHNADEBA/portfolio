"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Sparkles,
  Code2,
  Eye,
  Star,
  GitFork,
  Globe,
} from "lucide-react";
import { SectionTitle } from "../ui/SectionTitle";
import { Button } from "../ui/Button";
import { FadeIn } from "../animations/FadeIn";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface ProjectsProps {
  dictionary: Dictionary;
}

export const Projects = ({ dictionary }: ProjectsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  // Track image load errors
  const [imageErrors, setImageErrors] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  // Project images - you can take screenshots of your live apps
  const projectImages = [
    "/projects/data-viz.png",
    "/projects/team-chat.png",
    "/projects/ecommerce.png",
    "/projects/ai-store.png",
    "/projects/invoice-generator.png",
    "/projects/ai-email-client.png",
  ];

  // Handle image error
  const handleImageError = (index: number) => {
    setImageErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
  };

  // Deterministic values for stats based on project index
  const getProjectStats = (index: number) => {
    const stars = [42, 38, 27, 35, 48, 52][index % 6] || 30 + index * 3;
    const forks = [12, 8, 15, 10, 18, 14][index % 6] || 8 + index * 2;
    return { stars, forks };
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-50/50 to-transparent dark:from-secondary-900/20" />

      {/* Animated gradient orbs */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-20 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          opacity,
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] opacity-5" />

      <div className="container-custom mx-auto relative z-10">
        <SectionTitle
          title={dictionary.projects.title}
          subtitle={dictionary.projects.subtitle || "Some of my recent work"}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {dictionary.projects.items.map((project: any, index: number) => {
            const { stars, forks } = getProjectStats(index);
            const hasImageError = imageErrors[index];

            return (
              <FadeIn key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative group/card h-full"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur-xl opacity-0 group-hover/card:opacity-30 transition-opacity duration-500" />

                  {/* Main card */}
                  <div className="relative bg-gradient-to-br from-secondary-900/90 to-secondary-800/90 backdrop-blur-sm rounded-3xl border border-secondary-800 overflow-hidden h-full flex flex-col">
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000" />

                    {/* Project Image - with fallback */}
                    <div className="relative h-56 overflow-hidden flex-shrink-0">
                      {!hasImageError ? (
                        <>
                          {/* Actual project screenshot */}
                          <Image
                            src={projectImages[index]}
                            alt={project.title}
                            fill
                            className="object-cover object-top transition-transform duration-700 group-hover/card:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={() => handleImageError(index)}
                            loading="eager"
                          />

                          {/* Dark overlay for white images - buttons always visible now */}
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/90 via-secondary-900/50 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-300" />

                          {/* Additional dark overlay at top for light images */}
                          <div className="absolute inset-0 bg-black/20" />
                        </>
                      ) : (
                        /* Fallback gradient with project letter (original design) */
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600">
                          {/* Animated pattern */}
                          <div className="absolute inset-0 opacity-30">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-gradient-shift" />
                          </div>

                          {/* Project letter */}
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <span className="text-8xl font-bold text-white/20 group-hover/card:text-white/30 transition-all duration-500">
                              {project.title[0]}
                            </span>
                          </motion.div>

                          {/* Overlay for fallback */}
                          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/90 via-secondary-900/50 to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-300" />
                        </div>
                      )}

                      {/* Overlay with buttons on hover - always visible due to dark overlays */}
                      <motion.div className="absolute inset-0 bg-gradient-to-t from-secondary-900/90 via-secondary-900/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                        <div className="flex gap-3 translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                          <motion.a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-primary-500/20 hover:border-primary-500/50 transition-all"
                            aria-label={
                              dictionary.projects.view_project || "View project"
                            }
                          >
                            <Eye size={18} className="text-white" />
                          </motion.a>
                          <motion.a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-primary-500/20 hover:border-primary-500/50 transition-all"
                            aria-label={
                              dictionary.projects.source_code || "Source code"
                            }
                          >
                            <Code2 size={18} className="text-white" />
                          </motion.a>
                        </div>
                      </motion.div>

                      {/* Corner accents */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-white/10 to-transparent" />
                    </div>

                    {/* Content - flex-grow to push buttons to bottom */}
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Title with gradient on hover */}
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover/card:gradient-text transition-all duration-300">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-secondary-400 text-sm leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech tags with improved styling */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag: string, idx: number) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + idx * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary-800/50 border border-secondary-700 text-secondary-300 hover:border-primary-500/50 hover:text-primary-400 transition-all duration-300"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      {/* Project stats */}
                      <div className="flex items-center gap-4 mb-6 text-xs text-secondary-500">
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-500" />
                          <span>{stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork size={14} className="text-secondary-400" />
                          <span>{forks}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Code2 size={14} className="text-primary-400" />
                          <span>
                            {project.tags.length}{" "}
                            {dictionary.projects.tech_count || "tech"}
                          </span>
                        </div>
                      </div>

                      {/* Spacer to push buttons to bottom */}
                      <div className="flex-grow" />

                      {/* Action buttons */}
                      <div className="flex items-center gap-3 mt-auto">
                        <Button
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="md"
                          variant="gradient"
                          icon={<ExternalLink size={16} />}
                          iconPosition="right"
                          className="flex-1 group/btn"
                        >
                          {dictionary.projects.view_project || "Live Demo"}
                        </Button>
                        <Button
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="md"
                          variant="outline"
                          icon={<Github size={16} />}
                          className="flex-1 group/btn border-2 border-primary-500/30 hover:border-primary-500"
                        >
                          {dictionary.projects.source_code || "Code"}
                        </Button>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <Sparkles
                      size={16}
                      className="absolute top-4 right-4 text-primary-400/30"
                    />

                    {/* Progress indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative group/btn"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-xl opacity-0 group-hover/btn:opacity-50 transition-opacity duration-500" />

              <Button
                href="https://github.com/JOHNADEBA"
                target="_blank"
                rel="noopener noreferrer"
                size="xl"
                variant="gradient"
                icon={<Github size={20} />}
                iconPosition="left"
                className="relative px-8 py-3 text-base font-semibold rounded-full shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {dictionary.projects.view_all_on_git || "View all on GitHub"}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ExternalLink size={14} />
                  </motion.span>
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative group/btn"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-xl opacity-0 group-hover/btn:opacity-50 transition-opacity duration-500" />

              <Button
                href="https://devjayprojects.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                size="xl"
                variant="gradient"
                icon={<Globe size={20} />}
                iconPosition="left"
                className="relative px-8 py-3 text-base font-semibold rounded-full shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {dictionary.projects.view_more_projects ||
                    "View more projects"}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ExternalLink size={14} />
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

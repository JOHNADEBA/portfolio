"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SectionTitle } from "../ui/SectionTitle";
import { FadeIn } from "../animations/FadeIn";
import {
  Sparkles,
  Code2,
  Users,
  Target,
  Award,
  Rocket,
  Heart,
  Star,
  Github,
  Linkedin,
  Mail,
  Download,
} from "lucide-react";
import { Button } from "../ui/Button";

interface AboutProps {
  dictionary: any;
  lang: string;
}

export const About = ({ dictionary, lang }: AboutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const stats = [
    {
      icon: Award,
      label: dictionary.about.stats?.years_experience || "Years Experience",
      value: dictionary.about.stats?.years_experience_value || "8+",
      description:
        dictionary.about.stats?.years_experience_desc ||
        "In software development",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Rocket,
      label: dictionary.about.stats?.projects_completed || "Projects Completed",
      value: dictionary.about.stats?.projects_completed_value || "50+",
      description:
        dictionary.about.stats?.projects_completed_desc ||
        "Across various industries",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      label: dictionary.about.stats?.happy_clients || "Happy Clients",
      value: dictionary.about.stats?.happy_clients_value || "30+",
      description: dictionary.about.stats?.happy_clients_desc || "Worldwide",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Star,
      label: dictionary.about.stats?.technologies || "Technologies",
      value: dictionary.about.stats?.technologies_value || "20+",
      description: dictionary.about.stats?.technologies_desc || "In my toolkit",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const achievements = [
    {
      icon: Code2,
      text:
        dictionary.about.achievements?.launches ||
        "Collaborated on successful product launches",
    },
    {
      icon: Users,
      text:
        dictionary.about.achievements?.mentored || "Mentored junior developers",
    },
    {
      icon: Target,
      text:
        dictionary.about.achievements?.success_rate ||
        "100% project delivery success rate",
    },
  ];

  const techStack = [
    {
      name: dictionary.about.tech_stack?.javascript || "JavaScript",
      color: "bg-blue-500/20 border-blue-500/30 text-blue-400",
    },
    {
      name: dictionary.about.tech_stack?.typescript || "TypeScript",
      color: "bg-green-500/20 border-green-500/30 text-green-400",
    },
    {
      name: dictionary.about.tech_stack?.nodejs || "Node.js",
      color: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
    },
    {
      name: dictionary.about.tech_stack?.python || "Python",
      color: "bg-blue-400/20 border-blue-400/30 text-blue-300",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/JOHNADEBA",
      label: "GitHub",
      color: "hover:text-[#333]",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/john-adeba-794738117/",
      label: "LinkedIn",
      color: "hover:text-[#0077b5]",
    },
    {
      icon: Mail,
      href: "mailto:adebajohn@gmail.com",
      label: "Email",
      color: "hover:text-primary-500",
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-secondary-50/50 to-transparent dark:from-secondary-900/20"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] opacity-5" />

      {/* Animated gradient orbs */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          opacity,
        }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ scale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"
      />

      <div className="container-custom mx-auto relative z-10">
        <SectionTitle
          title={dictionary.about.title}
          subtitle={
            dictionary.about.subtitle ||
            "Get to know the person behind the code"
          }
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-20">
          {/* Left column - Image, Quote, and CTA Buttons */}
          <FadeIn delay={0.2}>
            <div className="space-y-8">
              {/* Image section */}
              <div className="relative max-w-md mx-auto">
                {/* Main image with floating animation */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <div className="relative w-64 h-64 md:w-72 md:h-72 mx-auto">
                    {/* Gradient border with animation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-full animate-gradient-shift bg-size-300 blur-sm" />

                    {/* Image container - circular with dark overlay for better contrast */}
                    <div className="absolute inset-[3px] bg-secondary-900 rounded-full overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src="/dp.png"
                          alt="John Adeba"
                          fill
                          className="object-cover scale-110 hover:scale-125 transition-transform duration-700"
                          sizes="(max-width: 768px) 256px, 288px"
                          priority
                        />
                        {/* Dark overlay to make white background less prominent */}
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/30 via-transparent to-transparent" />
                      </div>

                      {/* Rotating ring */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -inset-1 rounded-full border border-primary-500/30"
                      />
                    </div>
                  </div>

                  {/* Decorative rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-6 rounded-full border border-primary-500/10"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-10 rounded-full border border-secondary-500/10"
                  />
                </motion.div>

                {/* Tech stack badges - DESKTOP VERSION (exactly as before) */}
                <div className="absolute -right-12 top-1/2 -translate-y-1/2 space-y-3 z-20 hidden sm:block">
                  {techStack.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className={`${tech.color} backdrop-blur-sm border rounded-full px-4 py-2 shadow-xl`}
                    >
                      <span className="text-sm font-medium">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Experience badge - positioned exactly as before */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -left-8 bottom-0 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl p-4 shadow-2xl z-20"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-white font-bold text-xl">
                      {dictionary.about.stats?.years_experience_value || "8+"}
                    </p>
                    <p className="text-white/80 text-xs">
                      {dictionary.about.years_experience_short ||
                        "Years of\nExperience"}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Tech stack badges - MOBILE VERSION (below image, not overlapping) */}
              <div className="flex flex-wrap justify-center gap-2 mt-4 sm:hidden">
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className={`${tech.color} backdrop-blur-sm border rounded-full px-3 py-1.5 shadow-xl text-xs`}
                  >
                    <span className="font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>

              {/* Quote - exactly as before */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="relative p-6 rounded-2xl overflow-hidden max-w-md mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 animate-gradient-shift bg-size-300" />
                <div className="absolute inset-0 backdrop-blur-sm" />

                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl text-primary-400 font-serif">
                      "
                    </div>
                    <div className="flex-1">
                      <p className="text-base md:text-lg text-secondary-200 italic leading-relaxed">
                        {dictionary.about.quote ||
                          "Building scalable solutions with clean code and great user experiences"}
                      </p>
                      <div className="flex items-center gap-3 mt-4">
                        <div className="flex -space-x-2">
                          {socialLinks.map((social, i) => (
                            <motion.a
                              key={social.label}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ y: -3 }}
                              className={`w-8 h-8 rounded-full bg-secondary-800 border border-secondary-700 flex items-center justify-center ${social.color} transition-colors`}
                              aria-label={social.label}
                            >
                              <social.icon size={14} />
                            </motion.a>
                          ))}
                        </div>
                        <span className="text-sm text-secondary-400">
                          {dictionary.about.lets_connect || "Let's connect"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-2 right-4 text-6xl text-secondary-700/20 font-serif">
                  "
                </div>
              </motion.div>

              {/* Call to action buttons - exactly as before */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <Button
                  href={`/#contact`}
                  size="md"
                  variant="outline"
                  icon={<Mail size={16} />}
                  iconPosition="right"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full text-sm border-2 border-primary-500 text-white hover:bg-primary-500/10"
                >
                  {dictionary.about.work_together || "Let's Work Together"}
                </Button>

                <Button
                  href={`/${lang}/api/download-cv?lang=${lang}`}
                  size="md"
                  variant="outline"
                  icon={<Download size={16} />}
                  iconPosition="right"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full text-sm border-2 border-primary-500 text-white hover:bg-primary-500/10"
                >
                  {dictionary.about.download_resume || "Download Resume"}
                </Button>
              </motion.div>
            </div>
          </FadeIn>

          {/* Right column - Content (exactly as before) */}
          <FadeIn delay={0.3}>
            <div className="space-y-8">
              {/* Welcome badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-primary-400">
                  {dictionary.about.available || "Available for opportunities"}
                </span>
              </motion.div>

              {/* Title with animated gradient */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold leading-tight"
              >
                <span className="gradient-text">
                  {dictionary.about.creative || "Creative"}
                </span>
                <br />
                <span className="text-white">
                  {dictionary.about.problem_solver || "Problem Solver"}
                </span>
              </motion.h3>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="prose prose-lg dark:prose-invert max-w-none"
              >
                <p className="text-lg text-secondary-300 leading-relaxed">
                  {dictionary.about.description}
                </p>
              </motion.div>

              {/* Achievements list */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                {achievements.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 text-secondary-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                      <item.icon size={16} className="text-primary-400" />
                    </div>
                    <span className="text-base">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-4 mt-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                    />

                    <div className="relative bg-gradient-to-br from-secondary-900/50 to-secondary-800/50 backdrop-blur-sm rounded-2xl p-5 border border-secondary-800 hover:border-primary-500/50 transition-all duration-300">
                      <stat.icon className="w-6 h-6 mb-3 text-primary-400" />
                      <div className="text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-secondary-400 font-medium">
                        {stat.label}
                      </div>
                      <div className="text-xs text-secondary-500 mt-1">
                        {stat.description}
                      </div>

                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
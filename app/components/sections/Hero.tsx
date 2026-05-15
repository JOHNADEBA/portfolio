"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Code2,
  Globe,
  Rocket,
} from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface HeroProps {
  dictionary: Dictionary;
  lang: string;
}

export const Hero = ({ dictionary, lang }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/JOHNADEBA",
      label: "GitHub",
      color: "hover:text-[#333] dark:hover:text-white",
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

  const floatingIcons = [
    {
      Icon: Code2,
      delay: 0,
      x: "10%",
      y: "20%",
      size: 24,
      color: "text-primary-400",
    },
    {
      Icon: Globe,
      delay: 2,
      x: "80%",
      y: "30%",
      size: 32,
      color: "text-accent-400",
    },
    {
      Icon: Rocket,
      delay: 4,
      x: "70%",
      y: "70%",
      size: 28,
      color: "text-secondary-400",
    },
    {
      Icon: Sparkles,
      delay: 1,
      x: "20%",
      y: "80%",
      size: 20,
      color: "text-yellow-400",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary-950 via-secondary-900 to-primary-950"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, delay, x, y, size, color }, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={size} className={`${color} opacity-30`} />
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container-custom mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 mt-19 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 shadow-lg shadow-primary-500/10 hover:shadow-primary-500/20 hover:scale-105 transition-all duration-300 mb-8 group"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles
              size={18}
              className="text-primary-400 group-hover:text-primary-300 transition-colors"
            />
          </motion.div>

          <span className="text-sm font-medium text-secondary-200">
            {dictionary.hero.badge}
          </span>

          {/* Pulse dot */}
          <motion.span
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Name with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-6xl md:text-8xl font-bold mb-6"
        >
          <span className="gradient-text">{dictionary.hero.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-outfit text-2xl md:text-4xl text-secondary-300 mb-8"
        >
          {dictionary.hero.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-sans max-w-2xl mx-auto text-lg md:text-xl text-secondary-400 mb-12 leading-relaxed"
        >
          {dictionary.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <Button
            href={`/${lang}#projects`}
            size="lg"
            variant="gradient"
            icon={<Rocket size={18} />}
            iconPosition="right"
            className="px-8 py-4 rounded-full text-lg"
          >
            {dictionary.hero.cta.view_work}
          </Button>

          <Button
            href={`/${lang}#contact`}
            size="lg"
            variant="outline"
            icon={<Mail size={18} />}
            iconPosition="right"
            className="px-8 py-4 rounded-full text-lg border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10"
          >
            {dictionary.hero.cta.contact_me}
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center space-x-6"
        >
          {socialLinks.map(({ icon: Icon, href, label, color }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-4 rounded-full bg-secondary-800/50 backdrop-blur-sm border border-secondary-700/50 ${color} transition-all duration-300 hover:scale-110 hover:bg-secondary-700/50`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <Icon size={20} className="text-secondary-300" />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-secondary-800 text-secondary-300 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-secondary-700">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-10" // ↑ bottom-12 gives more breathing room
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <div className="flex flex-col items-center gap-1.5">
          {/* Bouncing dot inside a visible capsule */}
          <div className="w-6 h-10 rounded-full border-2 border-secondary-400/70 dark:border-secondary-600/70 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{ y: [0, 14, 0] }} // slightly bigger bounce for visibility
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-2 h-2 bg-primary-500 rounded-full" // larger dot, no mt
            />
          </div>

          {/* Arrow below – no negative bottom positioning needed */}
          <ArrowDown
            size={18}
            className="text-secondary-400 dark:text-secondary-500 animate-bounce-slow" // optional tailwind bounce
          />
        </div>
      </motion.div>

      {/* Mouse follower effect */}
      <motion.div
        className="absolute w-64 h-64 bg-primary-600 rounded-full filter blur-3xl opacity-10 pointer-events-none"
        animate={{
          x: mousePosition.x * 10,
          y: mousePosition.y * 10,
        }}
        transition={{ type: "spring", damping: 10 }}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </section>
  );
};

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionTitle = ({
  title,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) => {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold"
      >
        <span className="gradient-text">{title}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-lg text-secondary-600 dark:text-secondary-400"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

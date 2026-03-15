"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export const Card = ({
  children,
  className,
  hover = true,
  glow = false,
  onClick,
}: CardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        "relative group bg-white dark:bg-secondary-900 rounded-2xl overflow-hidden",
        "border border-secondary-200 dark:border-secondary-800",
        "shadow-lg hover:shadow-2xl",
        "transition-all duration-300",
        glow &&
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-500 before:to-accent-500 before:opacity-0 before:blur-xl before:transition-opacity before:duration-300 group-hover:before:opacity-50",
        className,
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-accent-500/0 to-secondary-500/0 group-hover:from-primary-500/5 group-hover:via-accent-500/5 group-hover:to-secondary-500/5 transition-all duration-500" />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

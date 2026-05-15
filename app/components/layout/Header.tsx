"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X, Download } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils/cn";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface HeaderProps {
  lang: string;
  dictionary: Dictionary;
}

export const Header = ({ lang, dictionary }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  // ── Add this effect to lock/unlock body scroll only on mobile ──
  useEffect(() => {
    // Only apply scroll lock on mobile screens
    const handleScrollLock = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        // If on desktop, always unlock scroll regardless of menu state
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        return;
      }

      // On mobile, apply scroll lock if menu is open
      if (isMobileMenuOpen) {
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }
      }
    };

    // Initial call
    handleScrollLock();

    // Add resize listener to handle screen size changes
    window.addEventListener("resize", handleScrollLock);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleScrollLock);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: dictionary.navigation.home, href: `/${lang}` },
    { name: dictionary.navigation.about, href: `/${lang}#about` },
    { name: dictionary.navigation.projects, href: `/${lang}#projects` },
    { name: dictionary.navigation.experience, href: `/${lang}#experience` },
    { name: dictionary.navigation.contact, href: `/${lang}#contact` },
  ];

  const isActive = (href: string) => {
    if (href === `/${lang}`) {
      return pathname === `/${lang}`;
    }
    return (
      pathname.includes(href.split("#")[0]) &&
      (typeof window !== "undefined"
        ? window.location.hash === href.split("#")[1]
        : false)
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-secondary-950/80 backdrop-blur-lg border-b border-secondary-800/50 shadow-lg shadow-secondary-950/50"
          : "bg-transparent",
      )}
    >
      <nav className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with profile image - hidden on mobile when menu is open */}
          <Link
            href={`/${lang}`}
            className={`relative group ${isMobileMenuOpen ? "pointer-events-none opacity-0 md:opacity-100 md:pointer-events-auto" : ""}`}
            aria-hidden={isMobileMenuOpen}
            tabIndex={isMobileMenuOpen ? -1 : 0}
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary-500 transition-all duration-300 shadow-lg">
              <Image
                src="/dp.png"
                alt="John Adeba"
                fill
                className="object-cover scale-110 group-hover:scale-125 transition-transform duration-500"
                sizes="(max-width: 768px) 48px, 56px"
                priority
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/30 to-secondary-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {/* Animated ring */}
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ filter: "blur(4px)" }}
            />
          </Link>

          {/* Desktop Navigation with hover effects */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-2">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.span
                    className={cn(
                      "relative z-10 text-base font-medium transition-colors duration-300",
                      active ? "text-primary-400" : "text-secondary-300",
                    )}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {item.name}
                  </motion.span>

                  {/* Background hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg -z-0"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      hoveredItem === item.name
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.2 }}
                  />

                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-4 right-4 h-0.5"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={
                      hoveredItem === item.name
                        ? { scaleX: 1, opacity: 1 }
                        : { scaleX: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-primary-500 to-secondary-500" />
                  </motion.div>

                  {/* Active indicator */}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={
                      hoveredItem === item.name
                        ? { opacity: 1 }
                        : { opacity: 0 }
                    }
                  >
                    <motion.div
                      className="absolute inset-0 -translate-x-full"
                      animate={
                        hoveredItem === item.name ? { x: ["0%", "200%"] } : {}
                      }
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </motion.div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right side buttons with hover effects */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.div whileTap={{ scale: 0.95 }} className="relative">
              <LanguageSwitcher currentLang={lang} />
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                href={`/${lang}/api/download-cv?lang=${lang}`}
                size="sm"
                variant="gradient"
                icon={<Download size={16} />}
                className="whitespace-nowrap relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {dictionary.navigation.download_cv}
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                    ],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button with better visibility */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: isMobileMenuOpen
                ? "rgba(139, 92, 246, 0.3)"
                : "rgba(139, 92, 246, 0.2)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "white",
              cursor: "pointer",
              zIndex: 60, // Higher than everything
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation with hover effects */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Full screen backdrop - covers everything including header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 md:hidden"
                style={{
                  backgroundColor: "hsl(222.2 84% 4.9%)",
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100vw",
                  height: "100vh",
                  zIndex: 45, // Below header but above content
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {/* Gradient overlays */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `
              radial-gradient(circle at 50% 0%, hsl(262.1 83.3% 57.8% / 0.15) 0%, transparent 50%),
              radial-gradient(circle at 0% 50%, hsl(199 89% 48% / 0.15) 0%, transparent 50%),
              radial-gradient(circle at 100% 50%, hsl(330 81% 60% / 0.15) 0%, transparent 50%)
            `,
                    pointerEvents: "none",
                  }}
                />

                {/* Grid overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundSize: "40px 40px",
                    pointerEvents: "none",
                  }}
                />
              </motion.div>

              {/* Mobile Menu Content - full screen with padding at top for X button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 md:hidden overflow-y-auto"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 50, // Same as header
                  backgroundColor: "transparent",
                  paddingTop: "80px", // Space for the X button
                }}
              >
                <div className="py-6 px-4 space-y-2">
                  {/* Profile info */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-4 py-4 border-b border-secondary-800/50"
                  >
                    <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary-500/50">
                      <Image
                        src="/dp.png"
                        alt="John Adeba"
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div>
                      <div className="font-display font-bold text-lg text-white">
                        John Adeba
                      </div>
                      <div className="text-sm text-secondary-400">
                        Senior Software Engineer
                      </div>
                    </div>
                  </motion.div>

                  {/* Navigation items */}
                  {navigation.map((item, index) => {
                    const active = isActive(item.href);
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="block py-3"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <motion.span
                            className={cn(
                              "text-base font-medium transition-colors duration-200",
                              active
                                ? "text-primary-400"
                                : "text-secondary-300 hover:text-white",
                            )}
                            whileHover={{ x: 8 }}
                          >
                            {item.name}
                          </motion.span>
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Footer section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="pt-6 mt-4 border-t border-secondary-800/50 space-y-4"
                  >
                    <div>
                      <LanguageSwitcher currentLang={lang} mobile />
                    </div>
                    <div>
                      <Button
                        href={`/${lang}/api/download-cv?lang=${lang}`}
                        size="md"
                        variant="gradient"
                        icon={<Download size={16} />}
                        className="w-full justify-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {dictionary.navigation.download_cv}
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

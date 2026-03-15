"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageSwitcherProps {
  currentLang: string;
  mobile?: boolean;
}

// Language definitions with translations
const languages = [
  {
    code: "en",
    name: {
      en: "English",
      sl: "Angleščina",
      de: "Englisch",
    },
    flag: "🇬🇧",
  },
  {
    code: "sl",
    name: {
      en: "Slovenian",
      sl: "Slovenščina",
      de: "Slowenisch",
    },
    flag: "🇸🇮",
  },
  {
    code: "de",
    name: {
      en: "German",
      sl: "Nemščina",
      de: "Deutsch",
    },
    flag: "🇩🇪",
  },
];

// Translation dictionary for the language switcher UI
const translations = {
  en: {
    selectLanguage: "Select language",
  },
  sl: {
    selectLanguage: "Izberite jezik",
  },
  de: {
    selectLanguage: "Sprache auswählen",
  },
};

export const LanguageSwitcher = ({
  currentLang,
  mobile = false,
}: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Get current translations based on the current language
  const t =
    translations[currentLang as keyof typeof translations] || translations.en;

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const switchLanguage = (langCode: string) => {
    const newPathname = pathname.replace(`/${currentLang}`, `/${langCode}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  // Get the current language's display name in the current UI language
  const getCurrentLanguageFlag = () => {
    const lang = languages.find((l) => l.code === currentLang);
    return lang?.flag || "🇬🇧";
  };

  if (mobile) {
    return (
      <div className="space-y-1">
        {languages.map((lang) => {
          const isActive = currentLang === lang.code;
          const displayName =
            lang.name[currentLang as keyof typeof lang.name] || lang.name.en;

          return (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "bg-primary-900/50 text-primary-400 border border-primary-800"
                  : "bg-secondary-900 text-secondary-300 hover:bg-secondary-800"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{displayName}</span>
                {isActive && (
                  <span className="ml-auto">
                    <Check size={14} className="text-green-500" />
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer ${
          isOpen
            ? "bg-primary-900/50 border border-primary-800"
            : "bg-secondary-900 hover:bg-secondary-800 border border-transparent"
        }`}
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <Globe size={18} className="text-secondary-300" />
        <span className="text-base">{getCurrentLanguageFlag()}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-1 w-48 rounded-lg shadow-2xl border border-primary-800 z-[9999] overflow-hidden"
            style={{
              backgroundColor: "#F0F9FF", // Dark blue background matching the app
            }}
          >
            {/* Header */}
            <div
              className="px-3 py-2 border-b border-primary-800/50"
              style={{ backgroundColor: "#020c28" }}
            >
              <p className="text-xs font-medium text-primary-400">
                {t.selectLanguage}
              </p>
            </div>

            {/* Language options */}
            <div className="p-1.5" style={{ backgroundColor: "#020c28" }}>
              {languages.map((lang) => {
                const isActive = currentLang === lang.code;
                const isHovered = hoveredLang === lang.code;
                // Get the language name in the current UI language
                const displayName =
                  lang.name[currentLang as keyof typeof lang.name] ||
                  lang.name.en;

                return (
                  <div
                    key={lang.code}
                    className="relative mb-0.5 last:mb-0"
                    onMouseEnter={() => setHoveredLang(lang.code)}
                    onMouseLeave={() => setHoveredLang(null)}
                  >
                    <button
                      onClick={() => switchLanguage(lang.code)}
                      className="w-full text-left px-2.5 py-2 rounded-md transition-colors duration-200 cursor-pointer relative z-10"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-lg">{lang.flag}</span>
                        <span
                          className={`text-sm font-medium ${isActive ? "text-primary-400" : "text-secondary-300"}`}
                        >
                          {displayName}
                        </span>

                        {/* Green check icon for active language */}
                        {isActive && (
                          <motion.span
                            className="ml-auto"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 30,
                            }}
                          >
                            <Check size={14} className="text-green-500" />
                          </motion.span>
                        )}
                      </span>
                    </button>

                    {/* Background hover effect - matching nav items */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-md -z-0"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        isHovered
                          ? { scale: 1, opacity: 1 }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.15 }}
                    />

                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-md overflow-hidden pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                    >
                      <motion.div
                        className="absolute inset-0 -translate-x-full"
                        animate={isHovered ? { x: ["0%", "200%"] } : {}}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </motion.div>
                    </motion.div>

                    {/* Active indicator background */}
                    {isActive && (
                      <div className="absolute inset-0 bg-primary-900/50 rounded-md -z-10" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

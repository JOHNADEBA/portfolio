"use client";

import Link from "next/link";
import { Heart, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface FooterProps {
  lang: string;
  dictionary: any;
}

export const Footer = ({ lang, dictionary }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/JOHNADEBA", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/john-adeba-794738117/",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:adebajohn@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-secondary-50 dark:bg-secondary-900 border-t border-secondary-200 dark:border-secondary-800">
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${lang}`} className="text-2xl font-bold">
              <span className="gradient-text">John Adeba</span>
            </Link>
            <p className="mt-4 text-secondary-600 dark:text-secondary-400 max-w-md">
              {dictionary.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {dictionary.footer.quick_links}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${lang}#about`}
                  className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                >
                  {dictionary.navigation.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#projects`}
                  className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                >
                  {dictionary.navigation.projects}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#experience`}
                  className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                >
                  {dictionary.navigation.experience}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}#contact`}
                  className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                >
                  {dictionary.navigation.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {dictionary.footer.contact}
            </h3>
            <ul className="space-y-2">
              <li className="text-secondary-600 dark:text-secondary-400">
                {dictionary.contact.info.phone}
              </li>
              <li>
                <a
                  href={`mailto:${dictionary.contact.info.email}`}
                  className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                >
                  {dictionary.contact.info.email}
                </a>
              </li>
              <li className="text-secondary-600 dark:text-secondary-400">
                {dictionary.contact.info.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-secondary-200 dark:border-secondary-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-600 dark:text-secondary-400 text-sm">
              © {currentYear} John Adeba. {dictionary.footer.rights}
            </p>

            <div className="flex items-center gap-2">
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
            </div>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

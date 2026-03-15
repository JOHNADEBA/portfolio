"use client";

import { useState, useRef, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  Clock,
  CheckCircle,
  MessageCircle,
  Github,
  Linkedin,
} from "lucide-react";
import { SectionTitle } from "../ui/SectionTitle";
import { Button } from "../ui/Button";
import { FadeIn } from "../animations/FadeIn";

interface ContactProps {
  dictionary: any;
  lang: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const Contact = ({ dictionary, lang }: ContactProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss success/error messages after 5 seconds
  useEffect(() => {
    if (submitStatus === "success" || submitStatus === "error") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setValidationErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors from server
        if (result.details) {
          const serverErrors: Record<string, string> = {};
          if (Array.isArray(result.details)) {
            result.details.forEach((err: any) => {
              serverErrors[err.field] = err.message;
            });
          } else {
            console.error("Server error details:", result.details);
          }
          setValidationErrors(serverErrors);
        }

        const errorMessage = result.error || "Failed to send message";
        console.error("API error:", errorMessage);
        throw new Error(errorMessage);
      }

      setSubmitStatus("success");
      reset(); // Clear form on success
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      text: dictionary.contact.info.phone,
      href: `tel:${dictionary.contact.info.phone}`,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      description: dictionary.contact.info.phone_label || "Call anytime",
    },
    {
      icon: Mail,
      text: dictionary.contact.info.email,
      href: `mailto:${dictionary.contact.info.email}`,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      description: dictionary.contact.info.email_label || "Always available",
    },
    {
      icon: MapPin,
      text: dictionary.contact.info.location,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      description:
        dictionary.contact.info.location_label || "Based in Ljubljana",
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
      id="contact"
      ref={containerRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-50/50 to-transparent dark:from-secondary-900/20" />

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

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] opacity-5" />

      <div className="container-custom mx-auto relative z-10">
        <SectionTitle
          title={dictionary.contact.title}
          subtitle={dictionary.contact.subtitle}
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
          {/* Contact Info - Enhanced */}
          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group h-full"
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-secondary-900/90 to-secondary-800/90 backdrop-blur-sm rounded-3xl border border-secondary-800 overflow-hidden h-full">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur-md opacity-50" />
                      <div className="relative w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                        <MessageCircle className="text-white" size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {dictionary.contact.get_in_touch || "Get in touch"}
                      </h3>
                      <p className="text-sm text-secondary-400">
                        {dictionary.contact.get_in_touch_subtitle ||
                          "I'd love to hear from you"}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info Cards */}
                  <div className="space-y-4 mb-8">
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        whileHover={{ x: 10, scale: 1.02 }}
                        className="relative group/item"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-md opacity-0 group-hover/item:opacity-20 transition-opacity`}
                        />
                        <div
                          className={`relative flex items-center gap-4 p-4 rounded-2xl border ${item.borderColor} ${item.bgColor} backdrop-blur-sm`}
                        >
                          <div
                            className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} p-3 flex-shrink-0 shadow-lg`}
                          >
                            <item.icon className="w-full h-full text-white" />
                          </div>
                          <div className="flex-1">
                            {item.href ? (
                              <a
                                href={item.href}
                                className="text-lg font-medium text-white hover:text-primary-400 transition-colors"
                              >
                                {item.text}
                              </a>
                            ) : (
                              <p className="text-lg font-medium text-white">
                                {item.text}
                              </p>
                            )}
                            <p className="text-sm text-secondary-400 mt-1">
                              {item.description}
                            </p>
                          </div>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="mb-8">
                    <p className="text-sm text-secondary-400 mb-3">
                      {dictionary.contact.connect_with_me || "Connect with me"}
                    </p>
                    <div className="flex gap-3">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -5, scale: 1.1 }}
                          className={`w-12 h-12 rounded-xl bg-secondary-800/50 border border-secondary-700 flex items-center justify-center ${social.color} transition-all duration-300 hover:border-primary-500/50`}
                        >
                          <social.icon
                            size={20}
                            className="text-secondary-300"
                          />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Response Time Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative p-4 rounded-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 animate-gradient-shift bg-size-300" />
                    <div className="absolute inset-0 backdrop-blur-sm" />
                    <div className="relative flex items-center gap-3">
                      <Clock size={20} className="text-primary-400" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {dictionary.contact.response_time ||
                            "⚡ Usually responds within"}
                        </p>
                        <p className="text-xs text-primary-400">
                          {dictionary.contact.response_time_value || "24 hours"}
                        </p>
                      </div>
                      <Sparkles
                        size={16}
                        className="ml-auto text-primary-400/50"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          {/* Contact Form - Enhanced */}
          <FadeIn delay={0.3}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group h-full"
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-secondary-900/90 to-secondary-800/90 backdrop-blur-sm rounded-3xl border border-secondary-800 overflow-hidden h-full">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur-md opacity-50" />
                      <div className="relative w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                        <Send className="text-white" size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {dictionary.contact.send_message || "Send a message"}
                      </h3>
                      <p className="text-sm text-secondary-400">
                        {dictionary.contact.send_message_subtitle ||
                          "I'll get back to you soon"}
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-secondary-300"
                      >
                        {dictionary.contact.name}
                      </label>
                      <div className="relative group/input">
                        <input
                          {...register("name", {
                            required:
                              dictionary.contact.name_required ||
                              "Name is required",
                          })}
                          type="text"
                          id="name"
                          className={`w-full px-4 py-3 bg-secondary-800/50 border ${
                            validationErrors.name
                              ? "border-red-500/50"
                              : "border-secondary-700"
                          } rounded-xl text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300`}
                          placeholder={
                            dictionary.contact.name_placeholder || "John Doe"
                          }
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      {(errors.name || validationErrors.name) && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-400 flex items-center gap-1"
                        >
                          <span className="w-1 h-1 bg-red-400 rounded-full" />
                          {errors.name?.message || validationErrors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-secondary-300"
                      >
                        {dictionary.contact.email}
                      </label>
                      <div className="relative group/input">
                        <input
                          {...register("email", {
                            required:
                              dictionary.contact.email_required ||
                              "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message:
                                dictionary.contact.email_invalid ||
                                "Invalid email address",
                            },
                          })}
                          type="email"
                          id="email"
                          className={`w-full px-4 py-3 bg-secondary-800/50 border ${
                            validationErrors.email
                              ? "border-red-500/50"
                              : "border-secondary-700"
                          } rounded-xl text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300`}
                          placeholder={
                            dictionary.contact.email_placeholder ||
                            "john@example.com"
                          }
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      {(errors.email || validationErrors.email) && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-400 flex items-center gap-1"
                        >
                          <span className="w-1 h-1 bg-red-400 rounded-full" />
                          {errors.email?.message || validationErrors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-secondary-300"
                      >
                        {dictionary.contact.message}
                      </label>
                      <div className="relative group/input">
                        <textarea
                          {...register("message", {
                            required:
                              dictionary.contact.message_required ||
                              "Message is required",
                          })}
                          id="message"
                          rows={5}
                          className={`w-full px-4 py-3 bg-secondary-800/50 border ${
                            validationErrors.message
                              ? "border-red-500/50"
                              : "border-secondary-700"
                          } rounded-xl text-white placeholder-secondary-500 focus:outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 resize-none`}
                          placeholder={
                            dictionary.contact.message_placeholder ||
                            "Your message..."
                          }
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      {(errors.message || validationErrors.message) && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-400 flex items-center gap-1"
                        >
                          <span className="w-1 h-1 bg-red-400 rounded-full" />
                          {errors.message?.message || validationErrors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Status Messages - with auto-dismiss */}
                    <AnimatePresence>
                      {submitStatus === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3"
                        >
                          <CheckCircle size={20} className="text-green-400" />
                          <span className="text-green-400 text-sm flex-1">
                            {dictionary.contact.success}
                          </span>
                          <button
                            onClick={() => setSubmitStatus("idle")}
                            className="text-green-400/50 hover:text-green-400 transition-colors"
                          >
                            ×
                          </button>
                        </motion.div>
                      )}

                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
                        >
                          <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                            !
                          </span>
                          <span className="text-red-400 text-sm flex-1">
                            {dictionary.contact.error}
                          </span>
                          <button
                            onClick={() => setSubmitStatus("idle")}
                            className="text-red-400/50 hover:text-red-400 transition-colors"
                          >
                            ×
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full group relative overflow-hidden py-4"
                        loading={isSubmitting}
                        icon={<Send size={18} />}
                        iconPosition="right"
                        variant="gradient"
                      >
                        <span className="relative z-10">
                          {isSubmitting
                            ? dictionary.contact.sending
                            : dictionary.contact.send}
                        </span>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </motion.div>

                    {/* Form Footer */}
                    <p className="text-xs text-center text-secondary-500 mt-4">
                      {dictionary.contact.form_footer ||
                        "I'll respond within 24 hours. No spam, ever."}
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>

        {/* Decorative Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center gap-8"
        >
          {[
            {
              label: dictionary.contact.stat_response_time || "Response Time",
              value: dictionary.contact.stat_response_time_value || "< 24h",
              color: "from-blue-500 to-cyan-500",
            },
            {
              label:
                dictionary.contact.stat_projects_discussed ||
                "Projects Discussed",
              value: dictionary.contact.stat_projects_discussed_value || "100+",
              color: "from-purple-500 to-pink-500",
            },
            {
              label: dictionary.contact.stat_happy_clients || "Happy Clients",
              value: dictionary.contact.stat_happy_clients_value || "95%",
              color: "from-green-500 to-emerald-500",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div
                className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
              >
                {stat.value}
              </div>
              <div className="text-xs text-secondary-500 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

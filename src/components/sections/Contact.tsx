"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  fadeInUp,
  staggerContainer,
  viewportSettings,
  buttonTap,
} from "@/lib/motion";

interface SocialLink {
  name: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/Brettberry07",
    icon: "/images/github-svgrepo-com 2-2.svg",
    ariaLabel: "Visit my GitHub profile",
  },
  {
    name: "Gmail",
    href: "mailto:brettberry07@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Brett,",
    icon: "/images/gmail-svgrepo-com 2-2.svg",
    ariaLabel: "Send me an email",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/brett-berry-a81b29329",
    icon: "/images/linkedin-svgrepo-com 2-2.svg",
    ariaLabel: "Connect with me on LinkedIn",
  },
];

export default function Contact() {
  return (
    <section
      className="relative min-h-[50vh] w-full overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/contact-image.png"
          alt="Misty forest background"
          fill
          className="object-cover grayscale"
          priority
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[50vh] flex-col items-centern justify-around px-6 py-16 md:py-24">
        <motion.div
          className="flex flex-col items-center text-center gap-y-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          {/* Section Title */}
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Find Me Here
          </motion.h2>

          {/* Section divider */}
          <motion.div
            variants={fadeInUp}
            className="h-1 w-16 rounded-full"
            style={{ backgroundColor: "rgba(115, 115, 224, 0.6)" }}
          />

          {/* Social Links */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex items-center gap-4 sm:gap-6 md:gap-10"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="group relative flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-200 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-36 lg:w-36"
                style={{ 
                  backgroundColor: "rgba(39, 39, 42, 0.9)",
                  border: "1px solid rgba(115, 115, 224, 0.2)",
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.05,
                  backgroundColor: "rgba(50, 50, 55, 0.95)",
                  borderColor: "rgba(115, 115, 224, 0.5)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={link.icon}
                  alt={link.name}
                  width={48}
                  height={48}
                  className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-20 lg:w-20 transition-all duration-200 group-hover:brightness-125"
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

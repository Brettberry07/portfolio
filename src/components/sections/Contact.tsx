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
    icon: "/github-svgrepo-com 2-2.svg",
    ariaLabel: "Visit my GitHub profile",
  },
  {
    name: "Gmail",
    href: "mailto:brettberry07@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Brett,",
    icon: "/gmail-svgrepo-com 2-2.svg",
    ariaLabel: "Send me an email",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/brett-berry-a81b29329",
    icon: "/linkedin-svgrepo-com 2-2.svg",
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
          src="/contact-image.png"
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
            className="text-4xl font-bold italic tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Find Me Here
          </motion.h2>

          {/* Social Links */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 flex items-center gap-6 md:gap-10"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="group relative flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-800/90 transition-all duration-300 hover:scale-110 hover:bg-zinc-700 md:h-24 md:w-24 lg:h-36 lg:w-36"
                whileHover={{ y: -5 }}
                whileTap={buttonTap}
              >
                <Image
                  src={link.icon}
                  alt={link.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 md:h-14 md:w-14 lg:h-24 lg:w-24 transition-all duration-300 group-hover:brightness-125"
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

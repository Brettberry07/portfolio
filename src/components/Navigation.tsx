"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { navAnimation } from "@/lib/motion";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show nav after scrolling past hero (approximately 100vh)
    setIsVisible(latest > 100);
  });

  return (
    <motion.header
      className="fixed left-1/2 top-4 z-50 w-[95%] -translate-x-1/2 md:top-6"
      variants={navAnimation}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <nav
        className="flex w-full items-center justify-center rounded-full px-8 py-5 md:px-12 md:py-6"
        style={{ backgroundColor: "rgba(90, 90, 120, 0.7)", backdropFilter: "blur(8px)" }}
        aria-label="Main navigation"
      >
        {/* Nav Links */}
        <ul className="flex items-center gap-4 md:gap-8">
          {navLinks.map((link, index) => (
            <li key={link.name} className="flex items-center gap-4 md:gap-8">
              <motion.a
                href={link.href}
                className="px-4 text-base font-medium tracking-wide text-white/90 transition-colors hover:text-white md:px-8 md:text-lg lg:text-xl"
                whileHover={{ opacity: 0.8 }}
                whileTap={{ scale: 0.98 }}
              >
                {link.name}
              </motion.a>
              {/* Divider */}
              {index < navLinks.length - 1 && (
                <div className="h-5 w-px bg-white/40 md:h-6" />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}

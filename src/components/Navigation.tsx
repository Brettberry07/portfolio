"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { navAnimation } from "@/lib/motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
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
      className="fixed left-0 right-0 top-0 z-50 px-6 py-4 md:px-12 md:py-6"
      variants={navAnimation}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <motion.a
          href="#"
          className="font-mono text-lg font-medium tracking-tight text-foreground"
          whileHover={{ opacity: 0.7 }}
          whileTap={{ scale: 0.98 }}
        >
          BB
        </motion.a>

        {/* Nav Links */}
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <motion.a
                href={link.href}
                className="text-sm tracking-wide text-muted transition-colors hover:text-foreground"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {link.name}
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Backdrop blur */}
      <div className="absolute inset-0 -z-10 bg-background/60 backdrop-blur-md" />
    </motion.header>
  );
}

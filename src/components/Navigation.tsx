"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { navAnimation } from "@/lib/motion";

const navLinks = [
  { name: "Home", href: "#home", sectionId: "home" },
  { name: "About", href: "#about", sectionId: "about" },
  { name: "Projects", href: "#work", sectionId: "work" },
  { name: "Contact", href: "#contact", sectionId: "contact" },
];

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show nav after scrolling past hero (approximately 100vh)
    setIsVisible(latest > 100);
  });

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.sectionId);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }

      // If at top of page, set to home
      if (window.scrollY < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    e.preventDefault();
    
    if (sectionId === "home") {
      // Scroll to top for home
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        const offsetTop = section.offsetTop - 100; // Account for nav height
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }
    
    setActiveSection(sectionId);
  };

  return (
    <motion.header
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2 md:top-6"
      variants={navAnimation}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <nav
        className="flex items-center justify-center rounded-full"
        style={{ 
          backgroundColor: "rgba(26, 26, 26, 0.85)", 
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          padding: "0.75rem 1.5rem",
        }}
        aria-label="Main navigation"
      >
        {/* Nav Links */}
        <ul className="flex items-center gap-1 md:gap-2">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.sectionId;
            
            return (
              <li key={link.name} className="flex items-center gap-1 md:gap-2 h-7">
                <motion.a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                  className="relative rounded-full text-sm font-medium tracking-wide transition-all duration-300 md:px-6 md:py-2.5 md:text-base"
                  style={{ 
                    color: isActive ? "#fff" : "rgba(255, 255, 255, 0.6)",
                    backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
                    padding: isActive ? "0.5rem 0.5rem" : "0.5rem 0.5rem",
                  }}
                  whileHover={{ 
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full"
                      style={{ backgroundColor: "#7373E0" }}
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
                {/* Divider */}
                {index < navLinks.length - 1 && (
                  <div 
                    className="h-4 w-px md:h-5" 
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}

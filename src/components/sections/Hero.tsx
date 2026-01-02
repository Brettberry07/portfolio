"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/quote-image.png"
          alt="Mountain landscape in grayscale"
          fill
          priority
          className="object-cover grayscale"
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute inset-0 bg-background/30" />
      </motion.div>

      {/* Quote Content */}
      <motion.div
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
        style={{ opacity }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeIn}
          className="mb-4 text-xs tracking-[0.3em] text-muted uppercase md:text-sm"
        >
          Portfolio
        </motion.p>

        <motion.blockquote
          variants={fadeInUp}
          className="max-w-md text-3xl font-light italic leading-relaxed tracking-wide text-foreground/90 md:max-w-lg md:text-4xl lg:max-w-4xl lg:text-7xl"
        >
          &ldquo;Building Solutions, Not Just Software&rdquo;
        </motion.blockquote>

        <motion.div
          variants={fadeIn}
          className="mt-8 h-px w-16 bg-muted/50"
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-widest text-muted/60 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-muted/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

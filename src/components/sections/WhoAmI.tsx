"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, fadeInLeft, fadeInRight, viewportSettings } from "@/lib/motion";

export default function WhoAmI() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: "#A5A5A5" }}
      aria-label="Who Am I section"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Top Row - Diamond and Image */}
        <div className="flex items-start justify-between gap-6 md:gap-12">
            {/* Diamond Shape - Left aligned - hidden on mobile */}
            <motion.div
            className="hidden items-center justify-center py-8 sm:flex md:py-16"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            >
            <div className="relative h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80">
              {/* Outer square */}
              <div
              className="absolute inset-0 border-2"
              style={{ 
                borderColor: "#444464",
                transform: "rotate(45deg)",
              }}
              />
              {/* Middle square */}
              <div
              className="absolute inset-6 border-2 md:inset-8"
              style={{ 
                borderColor: "#444464",
                transform: "rotate(45deg)",
              }}
              />
              {/* Inner square */}
              <div
              className="absolute inset-12 border-2 md:inset-16"
              style={{ 
                borderColor: "#444464",
                transform: "rotate(45deg)",
              }}
              />
            </div>
            </motion.div>

          {/* Mountain Image - Right aligned, floating */}
          <motion.div
            className="absolute top-4 right-4 flex flex-col items-end gap-2 md:top-6 md:right-6"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
              <div 
              className="relative aspect-4/3 w-64 overflow-hidden sm:w-80 md:w-md lg:w-xl"
              style={{ borderRadius: "20px" }}
            >
              <Image
                src="/name-transition-image.png"
                alt="Mountain landscape"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 448px, 576px"
              />
            </div>
            {/* Caption */}
            <p 
              className="text-sm tracking-wide md:text-lg lg:text-xl"
              style={{ color: "#555", fontFamily: "monospace" }}
            >
              Less Noise, More Impact
            </p>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h2
          className="absolute bottom-12 left-4 text-6xl font-bold tracking-tight sm:text-7xl md:bottom-24 md:left-12 md:text-9xl lg:text-[12rem]"
          style={{ color: "#1a1a1a" }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          Who Am I?
        </motion.h2>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, fadeInLeft, fadeInRight, viewportSettings } from "@/lib/motion";

export default function ProofTransition() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#A4A4A4" }}
      aria-label="Proof transition section"
    >
      <div className="mx-auto max-w-7xl px-8 md:px-16 lg:px-20">
        {/* Top Row - Image and Geometric Shape */}
        <div className="flex items-start justify-between gap-6 md:gap-12">
          {/* Mountain/Forest Image - Left aligned with margin from edge */}
          <motion.div
            className="absolute top-1/4 left-4 flex flex-col items-start gap-2 md:left-6"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <div 
              className="relative aspect-4/3 w-64 overflow-hidden sm:w-80 md:w-[28rem] lg:w-[36rem]"
              style={{ borderRadius: "20px" }}
            >
              <Image
                src="/project-transition-image.png"
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
              Learning By Creation
            </p>
          </motion.div>

          {/* Geometric Shape - Right aligned, hidden on mobile */}
          <motion.div
            className="absolute top-6 right-6 hidden items-center justify-center py-8 sm:flex md:py-16"
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
              }}
              />
              {/* Middle square */}
              <div
              className="absolute inset-6 border-2 md:inset-8"
              style={{ 
                borderColor: "#444464",
              }}
              />
              {/* Inner square */}
              <div
              className="absolute inset-12 border-2 md:inset-16"
              style={{ 
                borderColor: "#444464",
              }}
              />
            </div>
            </motion.div>


            {/* <motion.div
            className="flex items-start justify-end"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            >
            <div className="relative h-32 w-32 md:h-44 md:w-44 lg:h-56 lg:w-56">
              <div
              className="absolute inset-0 border-[3px]"
              style={{ borderColor: "#444464" }}
              />
              <div
              className="absolute inset-4 border-[3px] md:inset-5 lg:inset-6"
              style={{ borderColor: "#444464" }}
              />
              <div
              className="absolute inset-8 border-[3px] md:inset-10 lg:inset-12"
              style={{ borderColor: "#444464" }}
              />
            </div>
            </motion.div> */}
        </div>

        {/* Title - Bottom right, much larger */}
        <motion.h2
          className="absolute bottom-12 right-4 text-6xl font-bold tracking-tight sm:text-7xl md:bottom-16 md:right-6 md:text-9xl lg:text-[12rem]"
          style={{ color: "#1a1a1a" }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          Proof?
        </motion.h2>
      </div>
    </section>
  );
}

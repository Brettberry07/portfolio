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
            className="ml-4 mt-8 flex flex-col md:ml-8 md:mt-12 lg:ml-12 lg:mt-16"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <div 
              className="relative aspect-[4/3] w-64 overflow-hidden md:w-96 lg:w-[500px]"
              style={{ borderRadius: "20px" }}
            >
              <Image
                src="/project-transition-image.png"
                alt="Misty forest landscape"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 384px, 500px"
              />
            </div>
            {/* Caption */}
            <p className="mt-4 text-sm italic text-zinc-700 md:text-base">
              Learning By Creation
            </p>
          </motion.div>

          {/* Geometric Shape - Right aligned, larger */}
          <motion.div
            className="flex items-start justify-end"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <div className="relative h-32 w-32 md:h-44 md:w-44 lg:h-56 lg:w-56">
              {/* Outer square */}
              <div
                className="absolute inset-0 border-[3px]"
                style={{ borderColor: "#444464" }}
              />
              {/* Middle square */}
              <div
                className="absolute inset-4 border-[3px] md:inset-5 lg:inset-6"
                style={{ borderColor: "#444464" }}
              />
              {/* Inner square */}
              <div
                className="absolute inset-8 border-[3px] md:inset-10 lg:inset-12"
                style={{ borderColor: "#444464" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Title - Bottom right, much larger */}
        <motion.div
          className="mt-16 flex justify-end md:mt-24 lg:mt-32"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <h2 className="absolute bottom-16 right-6 font-sans text-7xl font-bold tracking-tight text-zinc-900 md:text-8xl lg:text-9xl">
            Proof?
          </h2>
        </motion.div>
      </div>
    </section>
  );
}

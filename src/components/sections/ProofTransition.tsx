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
            className="flex flex-col items-end"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <div className="absolute top-1/4 left-6 flex flex-col items-start gap-2">
              <div 
              className="relative aspect-4/3 w-48 overflow-hidden md:w-80 lg:w-xl"
              style={{ borderRadius: "20px" }}
              >
              <Image
                src="/project-transition-image.png"
                alt="Mountain landscape"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 320px, 384px"
              />
              </div>
              {/* Caption */}
              <p className="text-md tracking-wide text-zinc-700 md:text-lg lg:text-xl">
              Learning By Creation
              </p>
            </div>
          </motion.div>

          {/* Geometric Shape - Right aligned, larger */}
                        <motion.div
            className="absolute top-6 right-6 flex items-center justify-center py-8 md:py-16"
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

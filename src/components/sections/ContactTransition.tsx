"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, fadeInLeft, fadeInRight, viewportSettings } from "@/lib/motion";

export default function ContactTransition() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: "#A4A4A4" }}
      aria-label="Contact transition section"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Forest Image - Right aligned */}
        <motion.div
          className="absolute top-0 right-0"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <div 
            className="relative aspect-4/3 w-48 h-screen overflow-hidden md:w-80 lg:w-xl"
          >
            <Image
              src="/contact-transition-image.png"
              alt="Misty forest landscape"
              fill
              className="object-cover grayscale h-screen"
            />
          </div>
        </motion.div>

        {/* Left-aligned Container for Geometric Shape and Text */}
        <div className="absolute left-6 inset-0 flex items-center justify-start px-6 md:px-12">
          <div className="relative flex items-center justify-center">
            {/* Diamond Shape - Centered behind text */}
            <motion.div
              className="absolute left-[49%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <div className="relative h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80">
                {/* Outer square */}
                <div
                  className="absolute inset-0 border-[3px]"
                  style={{ 
                    borderColor: "#444464",
                  }}
                />
                {/* Middle square */}
                <div
                  className="absolute inset-6 border-[3px] md:inset-8"
                  style={{ 
                    borderColor: "#444464",
                    transform: "rotate(45deg)",
                  }}
                />
                {/* Inner square */}
                <div
                  className="absolute inset-12 border-[3px] md:inset-16"
                  style={{ 
                    borderColor: "#444464",
                  }}
                />
              </div>
            </motion.div>

            {/* Title and Caption - On top of geometric shape */}
            <motion.div
              className="relative z-10 text-left"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <h2 
                className="text-5xl font-bold tracking-tight md:text-7xl lg:text-9xl"
                style={{ color: "#1a1a1a" }}
              >
                Interested?
              </h2>
              <p 
                className="mt-2 text-md italic tracking-wide md:mt-4 md:text-lg lg:text-xl"
                style={{ color: "#555", fontFamily: "monospace" }}
              >
                Don&apos;t Blame You
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

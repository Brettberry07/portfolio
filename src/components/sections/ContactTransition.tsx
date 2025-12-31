"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, fadeInLeft, fadeInRight, viewportSettings } from "@/lib/motion";

export default function ContactTransition() {
  return (
    <section
      className="relative min-h-[70vh] w-full overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#A4A4A4" }}
      aria-label="Contact transition section"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center px-8 md:px-16 lg:px-20">
        {/* Left Side - Geometric Shape and Text */}
        <div className="relative flex-1">
          {/* Nested Diamond Shape */}
          <motion.div
            className="absolute left-1/4 top-0 -translate-x-1/2"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <div className="relative h-48 w-48 rotate-45 md:h-64 md:w-64 lg:h-80 lg:w-80">
              {/* Outer diamond */}
              <div
                className="absolute inset-0 border-[3px]"
                style={{ borderColor: "#444464" }}
              />
              {/* Middle diamond */}
              <div
                className="absolute inset-6 border-[3px] md:inset-8 lg:inset-10"
                style={{ borderColor: "#444464" }}
              />
              {/* Inner diamond */}
              <div
                className="absolute inset-12 border-[3px] md:inset-16 lg:inset-20"
                style={{ borderColor: "#444464" }}
              />
              {/* Innermost diamond */}
              <div
                className="absolute inset-[72px] border-[3px] md:inset-24 lg:inset-[120px]"
                style={{ borderColor: "#444464" }}
              />
            </div>
          </motion.div>

          {/* Title Text - Overlapping the diamond */}
          <motion.div
            className="relative z-10 pt-32 md:pt-40 lg:pt-48"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <h2 className="absolute bottom-16 left-6 font-sans text-6xl font-bold tracking-tight text-zinc-900 md:text-7xl lg:text-8xl">
              Interested?
            </h2>
            <p className="absolute bottom-6 left-6 mt-4 text-sm italic text-zinc-700 md:text-base">
              Don&apos;t Blame You
            </p>
          </motion.div>
        </div>

        {/* Right Side - Forest Image */}
        <motion.div
          className="flex-shrink-0"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <div 
            className="relative aspect-[3/4] w-48 overflow-hidden md:w-64 lg:w-80"
            style={{ borderRadius: "0" }}
          >
            <Image
              src="/contact-transition-image.png"
              alt="Misty forest landscape"
              fill
              className="object-cover grayscale"
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

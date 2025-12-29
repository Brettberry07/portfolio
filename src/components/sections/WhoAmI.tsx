"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, fadeInLeft, fadeInRight, viewportSettings } from "@/lib/motion";

export default function WhoAmI() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: "#E3E3E3" }}
      aria-label="Who Am I section"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Top Row - Diamond and Image */}
        <div className="flex items-start justify-between gap-6 md:gap-12">
          {/* Diamond Shape - Left aligned */}
          <motion.div
            className="flex items-center justify-center py-8 md:py-16"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <div className="relative h-32 w-32 md:h-48 md:w-48 lg:h-56 lg:w-56">
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
                className="absolute inset-4 border-2 md:inset-6"
                style={{ 
                  borderColor: "#444464",
                  transform: "rotate(45deg)",
                }}
              />
              {/* Inner square */}
              <div
                className="absolute inset-8 border-2 md:inset-12"
                style={{ 
                  borderColor: "#444464",
                  transform: "rotate(45deg)",
                }}
              />
            </div>
          </motion.div>

          {/* Mountain Image - Right aligned, floating */}
          <motion.div
            className="flex flex-col items-end"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            <div 
              className="relative aspect-[4/3] w-48 overflow-hidden md:w-80 lg:w-96"
              style={{ borderRadius: "20px" }}
            >
              <Image
                src="/who-am-I-image.png"
                alt="Mountain landscape"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 320px, 384px"
              />
            </div>
            {/* Caption */}
            <p className="mt-3 text-xs tracking-wide text-zinc-500 md:text-sm">
              Less Noise, More Impact
            </p>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h2
          className="mt-8 font-sans text-5xl font-bold tracking-tight text-zinc-900 md:mt-12 md:text-7xl lg:text-8xl"
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

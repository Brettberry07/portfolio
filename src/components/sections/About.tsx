"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  viewportSettings,
} from "@/lib/motion";

export default function About() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#949494" }}
      aria-label="About section"
    >
      {/* Background - Mountain image at bottom */}
      <div className="absolute inset-0 z-0">
        {/* Bottom 1/3 - mountain image */}
        <div 
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "35%" }}
        >
          <Image
            src="/who-am-I-image.png"
            alt="Mountain landscape background"
            fill
            className="object-cover object-top grayscale"
            sizes="100vw"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center py-16">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <motion.div
            className="flex flex-col items-stretch gap-8 md:flex-row md:items-center md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            {/* Circular Image - Left side */}
            <motion.div
              className="flex flex-shrink-0 justify-center md:justify-start"
              variants={fadeInLeft}
            >
              <div className="relative h-56 w-56 overflow-hidden rounded-full md:h-72 md:w-72 lg:h-96 lg:w-96">
                <Image
                  src="/personal-image.png"
                  alt="Brett Berry - Personal photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 224px, (max-width: 1024px) 288px, 384px"
                />
              </div>
            </motion.div>

            {/* Text Card - Right side, fills remaining space */}
            <motion.div
              className="flex-1"
              variants={fadeInRight}
            >
              <div 
                className="flex h-56 items-center p-8 md:h-72 md:p-10 lg:h-96 lg:p-12"
                style={{
                  backgroundColor: "rgba(200, 200, 200, 0.8)",
                  borderRadius: "20px",
                  backdropFilter: "blur(8px)",
                }}
              >
                <p 
                  className="text-lg leading-relaxed md:text-xl lg:text-2xl"
                  style={{ 
                    fontFamily: "monospace",
                    color: "#1a1a1a",
                  }}
                >
                  Text about me here lorem ipsum idk what else to type but I need
                  more space here to see the text on image
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
  viewportSettings,
} from "@/lib/motion";

const highlights = [
  "Full-stack developer with modern web technologies",
  "Built production-ready apps from search engines to robotics",
  "Focused on performance, UX, and clean architecture",
];

const stats = [
  { value: "6+", label: "Projects Built" },
  { value: "5+", label: "Technologies" },
  { value: "2025", label: "Starting U of A" },
];

export default function About() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden py-24"
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
            src="/images/who-am-I-image.png"
            alt="Mountain landscape background"
            fill
            className="object-cover object-bottom grayscale"
            sizes="100vw"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center py-16">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-12 lg:px-16">
          <motion.div
            className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            {/* Left Column - Image */}
            <motion.div
              className="flex justify-center md:justify-start"
              variants={fadeInLeft}
            >
              <div className="relative h-64 w-64 overflow-hidden rounded-2xl shadow-xl sm:h-80 sm:w-80 md:h-96 md:w-96">
                <Image
                  src="/images/greyscale-me.png"
                  alt="Brett Berry - Personal photo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                />
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              className="flex flex-col justify-center space-y-6"
              variants={fadeInRight}
            >
              {/* Intro Text */}
              <div 
                className="rounded-2xl p-5 md:p-6 lg:p-8"
                style={{
                  backgroundColor: "rgba(200, 200, 200, 0.5)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <p 
                  className="text-sm leading-relaxed md:text-base lg:text-lg"
                  style={{ 
                    fontFamily: "monospace",
                    color: "#1a1a1a",
                    lineHeight: "1.7",
                  }}
                >
                  I'm an enthusiastic software developer solving real-world problems through innovative technology. Self-taught with a passion for building web applications that are functional and user-friendly.
                </p>
                
                {/* Section divider */}
                <div className="my-4 md:my-5 h-px w-16 rounded-full" style={{ backgroundColor: "rgba(115, 115, 224, 0.5)" }} />
                
                {/* Highlights */}
                <ul className="space-y-2 md:space-y-3">
                  {highlights.map((highlight, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2 md:gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <span 
                        className="mt-1 md:mt-1.5 h-1.5 w-1.5 md:h-2 md:w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: "#7373E0" }}
                      />
                      <span 
                        className="text-xs md:text-sm lg:text-base"
                        style={{ color: "#333", fontFamily: "monospace", lineHeight: "1.5" }}
                      >
                        {highlight}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-2 md:gap-4"
                variants={fadeInUp}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="rounded-xl border p-3 md:p-4 text-center"
                    style={{
                      backgroundColor: "rgba(200, 200, 200, 0.4)",
                      borderColor: "rgba(115, 115, 224, 0.3)",
                      backdropFilter: "blur(4px)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -2, borderColor: "rgba(115, 115, 224, 0.6)" }}
                  >
                    <div 
                      className="text-xl font-bold md:text-2xl lg:text-3xl"
                      style={{ color: "#1a1a1a" }}
                    >
                      {stat.value}
                    </div>
                    <div 
                      className="mt-1 text-[10px] md:text-xs lg:text-sm"
                      style={{ color: "#555", fontFamily: "monospace" }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Education Note */}
              <p 
                className="text-center text-xs italic md:text-left md:text-sm lg:text-base"
                style={{ color: "#444", fontFamily: "monospace" }}
              >
                Upcoming freshman at University of Arkansas — Computer Science & Honors College
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

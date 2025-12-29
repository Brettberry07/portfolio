"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { viewportSettings } from "@/lib/motion";

export default function NameReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Circular text content - matching the design (repeated to fill circle)
  const circularText =
    "Rustacean • Nerd • Engineer • Debugger • Developer • Person • Student • Designer • Rustacean • Nerd • Engineer • Debugger • Developer • Person • Student • Designer • ";

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#E3E3E3" }}
      aria-label="Name reveal section"
    >
      {/* Centered Content Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        {/* Circular Text + Name Container */}
        <div className="relative flex items-center justify-center">
          {/* Rotating Circular Text */}
          <motion.div
            className="absolute"
            style={{
              rotate,
              width: "min(90vw, 550px)",
              height: "min(90vw, 550px)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportSettings}
            transition={{ duration: 1 }}
          >
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full"
              style={{ overflow: "visible" }}
            >
              <defs>
                <path
                  id="circlePathLarge"
                  d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                  fill="none"
                />
              </defs>
              <text
                fill="#000000"
                fontSize="11"
                fontWeight="600"
                letterSpacing="0.02em"
                fontFamily="system-ui, sans-serif"
              >
                <textPath href="#circlePathLarge" startOffset="0%">
                  {circularText}
                </textPath>
              </text>
            </svg>
          </motion.div>

          {/* Center Name */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportSettings}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 
              className="text-3xl font-bold tracking-wide md:text-4xl lg:text-5xl"
              style={{ 
                color: "#000000",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Brett Berry
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

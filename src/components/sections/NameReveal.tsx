"use client";

import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef } from "react";
import { viewportSettings } from "@/lib/motion";

export default function NameReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll-based rotation (fast spin when scrolling)
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  
  // Continuous slow rotation
  const baseRotation = useMotionValue(0);
  
  useAnimationFrame((_, delta) => {
    // Rotate at ~15 degrees per second for a slow, subtle spin
    const rotationSpeed = 15;
    baseRotation.set(baseRotation.get() + (delta / 1000) * rotationSpeed);
  });
  
  // Combine base rotation with scroll rotation
  const rotate = useTransform(
    [baseRotation, scrollRotate],
    ([base, scroll]) => (base as number) + (scroll as number)
  );

  // Circular text content - matching the design (repeated to fill circle)
  const circularText =
    "Rustacean • Engineer • Debugger • Developer • Nerd • Student • Designer • ";

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
              width: "min(90vw, 750px)",
              height: "min(90vw, 750px)",
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
                fontSize="15"
                fontWeight="600"
                letterSpacing="0.03em"
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
              className="text-4xl font-bold tracking-wide md:text-6xl lg:text-8xl"
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

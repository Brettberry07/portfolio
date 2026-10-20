"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function MotionProof() {
  const target = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start end", "end start"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

  return (
    <section ref={target} className="motion-panel" aria-labelledby="motion-title">
      <p className="motion-label">02 / MOTION FOR REACT</p>
      <motion.div
        data-testid="motion-proof"
        initial={false}
        animate={{ y: reduceMotion ? 0 : [10, 0] }}
        transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
      >
        <h2 id="motion-title">A little movement.<br />A solid foundation.</h2>
        <p>A subtle entrance and a line that follows the page scroll. Reduced motion keeps this study still.</p>
      </motion.div>
      <div className="scroll-track" aria-hidden="true">
        <motion.div data-testid="scroll-progress" className="scroll-progress" style={{ scaleX }} />
      </div>
    </section>
  );
}

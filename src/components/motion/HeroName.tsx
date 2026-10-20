"use client";

import { motion, useReducedMotion } from "motion/react";

export function HeroName() {
  const reduced = useReducedMotion();
  return <motion.h1 id="hero-title" initial={false} whileInView={reduced ? undefined : { y: [22, 0], opacity: [0.7, 1] }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>BRETT BERRY<span className="name-period">.</span></motion.h1>;
}

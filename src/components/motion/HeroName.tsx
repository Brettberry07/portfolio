"use client";

import { motion, useReducedMotion } from "motion/react";
import { revealTransition } from "./revealViewport";

export function HeroName() {
  const reduced = useReducedMotion();
  return <motion.h1 id="hero-title" initial={{ y: 14 }} animate={{ y: 0 }} transition={reduced ? { duration: 0 } : revealTransition}>BRETT BERRY<span className="name-period">.</span></motion.h1>;
}

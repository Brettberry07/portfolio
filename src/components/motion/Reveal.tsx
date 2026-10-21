"use client";

import { motion } from "motion/react";
import type { KeyboardEventHandler, ReactNode } from "react";
import { useMotionPreference } from "./useMotionPreference";
import { revealTransition, revealVariants, sequenceVariants, useRevealViewport } from "./revealViewport";

type RevealProps = { children: ReactNode; className?: string; delay?: number; onKeyDown?: KeyboardEventHandler<HTMLDivElement> };

export function Reveal({ children, className = "", delay = 0, onKeyDown }: RevealProps) {
  const reduced = useMotionPreference();
  const viewport = useRevealViewport();
  return <motion.div onKeyDown={onKeyDown} className={`entrance ${className}`} initial="rest" animate={reduced ? "enter" : undefined} whileInView="enter" viewport={viewport} variants={revealVariants} transition={reduced ? { duration: 0 } : { ...revealTransition, delay }}>{children}</motion.div>;
}

/** A stationary observer lets related children share a single entrance cue. */
export function RevealSequence({ children, className = "" }: Omit<RevealProps, "delay" | "onKeyDown">) {
  const reduced = useMotionPreference();
  const viewport = useRevealViewport();
  return <motion.div className={`entrance-sequence ${className}`} initial="rest" animate={reduced ? "enter" : undefined} whileInView="enter" viewport={{ ...viewport, amount: 0.45 }} variants={sequenceVariants}>{children}</motion.div>;
}

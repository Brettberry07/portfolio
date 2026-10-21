"use client";

import { useSyncExternalStore } from "react";
import type { Variants } from "motion/react";

const viewportHeight = () => window.innerHeight;
const serverHeight = () => 900;
function subscribeResize(notify: () => void) {
  window.addEventListener("resize", notify, { passive: true });
  return () => window.removeEventListener("resize", notify);
}

/** Observe the reading area, not the first pixels along the screen's bottom. */
export function useRevealViewport() {
  const height = useSyncExternalStore(subscribeResize, viewportHeight, serverHeight);
  // IntersectionObserver percentage margins are based on width, not height.
  return { once: true, amount: "some" as const, margin: `0px 0px -${Math.round(height * 0.38)}px 0px` as `${number}px ${number}px ${number}px ${number}px` };
}

export const revealTransition = { duration: 1.05, ease: [0.4, 0, 0.2, 1] as const };
// Content is always readable, including before hydration and without JavaScript.
// A real initial pose avoids jumping from the final layout back to a keyframe.
export const revealVariants: Variants = {
  rest: { y: 18 },
  enter: { y: 0 },
};
export const sequenceVariants: Variants = {
  rest: {},
  enter: { transition: { staggerChildren: 0.16 } },
};

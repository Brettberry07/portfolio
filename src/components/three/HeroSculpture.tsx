"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import "./hero.css";

const SculptureCanvas = dynamic(() => import("./SculptureCanvas"), { ssr: false });
class SculptureBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
export function HeroSculpture() {
  const [visible, setVisible] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 110]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 7]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return (
    <motion.div ref={host} className="hero-sculpture" style={{ y: reduced ? 0 : y, rotate: reduced ? 0 : rotate }} role="img" aria-label="A large matte-charcoal architectural sculpture with stepped volumes and rectangular openings">
      <motion.div className="sculpture-stage" initial={false} animate={{ y: reduced ? 0 : [24, 0] }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
      {/* Poster is rendered from this same CC BY sculpture. It stays available without JavaScript or WebGL. */}
      <div className="sculpture-poster" data-testid="scene-fallback" />
      <SculptureBoundary><SculptureCanvas visible={visible} /></SculptureBoundary>
      </motion.div>
    </motion.div>
  );
}

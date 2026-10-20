"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { useScroll, useTransform } from "motion/react";
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
  // This stationary target spans the hero. Never transform the canvas's HTML
  // ancestors: R3F measures their bounds and would resize the camera after scroll.
  const { scrollYProgress } = useScroll({ target: host, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const rotationX = useTransform(scrollYProgress, [0, 1], [0.06, 0.17]);
  const rotationY = useTransform(scrollYProgress, [0, 1], [-0.19, 0.03]);
  const x = useTransform(scrollYProgress, [0, 1], [0, 0.22]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 0.22]);
  const z = useTransform(scrollYProgress, [0, 1], [0, 0.12]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={host} className="hero-scene-boundary">
      <div className="hero-sculpture" role="img" aria-label="An oversized matte-black architectural knot of interlocking rectangular frames">
      <div className="sculpture-stage">
      {/* Poster is rendered from this same CC BY sculpture. It stays available without JavaScript or WebGL. */}
      <div className="sculpture-poster" data-testid="scene-fallback" />
      <SculptureBoundary><SculptureCanvas visible={visible} transforms={{ progress: scrollYProgress, scale, rotationX, rotationY, x, y, z }} /></SculptureBoundary>
      </div>
      </div>
    </div>
  );
}

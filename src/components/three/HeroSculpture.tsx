"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";

const SculptureCanvas = dynamic(() => import("./SculptureCanvas"), { ssr: false });
class SculptureBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
export function HeroSculpture() {
  const [visible, setVisible] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={host} className="hero-sculpture" role="img" aria-label="A suspended architectural loop sculpture in ribbed satin metal">
      {/* Poster is rendered from this same CC0 sculpture. It stays available without JavaScript or WebGL. */}
      <div className="sculpture-poster" data-testid="scene-fallback" />
      <SculptureBoundary><SculptureCanvas visible={visible} /></SculptureBoundary>
    </div>
  );
}

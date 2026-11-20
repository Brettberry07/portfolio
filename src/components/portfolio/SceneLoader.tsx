"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { desktopSceneQuery } from "./display-media";

const SharedScene = dynamic(() => import("./SharedScene"), { ssr: false });

export function SceneLoader() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;
    const media = matchMedia(desktopSceneQuery);
    let near = false;
    const sync = () => setEnabled(near && media.matches);
    const observer = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      sync();
    }, { rootMargin: "550px 0px" });
    observer.observe(stage);
    media.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);

  return <div className="scene-layer" ref={ref} aria-hidden="true">{enabled && <SharedScene />}</div>;
}

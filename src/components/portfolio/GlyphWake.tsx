"use client";

import { useEffect, useRef } from "react";
import { desktopSceneQuery } from "./display-media";

export function GlyphWake() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const art = canvas?.parentElement;
    if (!canvas || !art) return;
    const media = matchMedia(desktopSceneQuery);
    let stop: (() => void) | undefined;
    let request = 0;
    let inView = false;

    const sync = async () => {
      const generation = ++request;
      stop?.();
      stop = undefined;
      if (!media.matches || !inView || document.hidden) return;

      try {
        const { cloudWidth, cloudHeight, createGlyphRenderer } = await import("./glyph-art");
        if (request !== generation) return;
        const bounds = art.getBoundingClientRect();
        const dpr = Math.min(devicePixelRatio, 1.5);
        canvas.width = Math.min(cloudWidth, Math.round(bounds.width * dpr));
        canvas.height = Math.round(canvas.width * cloudHeight / cloudWidth);
        const renderer = createGlyphRenderer(canvas);
        if (!renderer) return;
        renderer.draw(0);
        art.dataset.glyphsLive = "";

        let frame = 0;
        let last = 0;
        let awakeUntil = 0;
        const paint = (now: number) => {
          if (now - last >= 31) {
            renderer.draw(now, last ? Math.min(.08, (now - last) / 1000) : 1 / 30);
            last = now;
          }
          frame = now < awakeUntil ? requestAnimationFrame(paint) : 0;
          if (!frame) {
            renderer.draw(0, .4);
            last = 0;
          }
        };
        const onPointer = (event: PointerEvent) => {
          if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
          const rect = canvas.getBoundingClientRect();
          renderer.point((event.clientX - rect.left) / rect.width * cloudWidth, (event.clientY - rect.top) / rect.height * cloudHeight);
          awakeUntil = performance.now() + 1450;
          if (!frame) frame = requestAnimationFrame(paint);
        };
        art.addEventListener("pointermove", onPointer);
        art.addEventListener("pointerleave", renderer.release);
        stop = () => {
          cancelAnimationFrame(frame);
          art.removeEventListener("pointermove", onPointer);
          art.removeEventListener("pointerleave", renderer.release);
          delete art.dataset.glyphsLive;
          canvas.width = canvas.height = 1;
        };
      } catch {
        // The first-paint poster stays visible if enhancement is unavailable.
      }
    };

    const intersection = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      void sync();
    }, { threshold: .02 });
    intersection.observe(art);
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      intersection.disconnect();
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      request++;
      stop?.();
    };
  }, []);

  return <canvas ref={ref} className="glyph-canvas" width={1} height={1} aria-hidden="true" />;
}

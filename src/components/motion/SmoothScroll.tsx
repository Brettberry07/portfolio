"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { useMotionPreference } from "./useMotionPreference";
import "lenis/dist/lenis.css";
import "./smooth-scroll.css";

const options = { autoRaf: false, lerp: 0.14, syncTouch: false, anchors: false, prevent: (node: HTMLElement) => node.tagName === "TEXTAREA" };

export function SmoothScroll({ children }: { children: ReactNode }) {
  const controller = useRef<LenisRef>(null);
  const reduced = useMotionPreference();

  useEffect(() => {
    // Run before Motion's read phase so useScroll sees this frame's native position.
    const update = ({ timestamp }: { timestamp: number }) => controller.current?.lenis?.raf(timestamp);
    if (!reduced) frame.setup(update, true);
    return () => cancelFrame(update);
  }, [reduced]);

  useEffect(() => {
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
      let target: HTMLElement | null;
      try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
      const lenis = controller.current?.lenis;
      if (!target || !lenis) return;
      // Capture before Next Link's default handler; keep real URLs and browser history.
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      lenis.scrollTo(target, {
        duration: 0.9,
        onComplete: () => {
          const addedTabIndex = !target.hasAttribute("tabindex");
          if (addedTabIndex) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          if (addedTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
        },
      });
    };
    document.addEventListener("click", navigate, true);
    return () => document.removeEventListener("click", navigate, true);
  }, []);

  // ReactLenis owns destruction; no second RAF and no synthetic touch inertia.
  return <ReactLenis root ref={controller} options={{ ...options, smoothWheel: !reduced }}>{children}</ReactLenis>;
}

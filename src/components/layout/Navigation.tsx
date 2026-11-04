"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useMotionPreference } from "@/components/motion/useMotionPreference";
import "./navigation.css";
import { useCallback, useEffect, useRef, useState } from "react";

const destinations = ["Home", "Projects", "Experience", "Contact"] as const;
export function Navigation({ caseStudy = false }: { caseStudy?: boolean }) {
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const reducedMotion = useMotionPreference();
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const arrivalY = useRef(0);
  const anchorDestination = useRef<string | null>(null);
  const [jumping, setJumping] = useState(false);
  const shouldHide = !jumping && hidden;
  const desktopMenu = useRef<HTMLElement>(null);
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const armIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    arrivalY.current = window.scrollY;
    idleTimer.current = setTimeout(() => {
      idleTimer.current = null;
      const keyboardFocus = desktopMenu.current?.querySelector(":focus-visible") || mobileMenu.current?.querySelector(":focus-visible");
      if (!mobileMenu.current?.open && !keyboardFocus) setHidden(true);
    }, 1500);
  }, []);
  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    let travel = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      const delta = y - previousY;
      previousY = y;
      if (anchorDestination.current) {
        travel = 0;
        return;
      }
      if (idleTimer.current && Math.abs(y - arrivalY.current) > 1) {
        clearTimeout(idleTimer.current);
        idleTimer.current = null;
      }
      if (y < 80 || mobileMenu.current?.open || desktopMenu.current?.querySelector(":focus-visible") || mobileMenu.current?.querySelector(":focus-visible")) {
        travel = 0;
        setHidden(false);
        if (delta < 0 && !mobileMenu.current?.open) armIdleTimer();
        return;
      }
      if (!delta) return;
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
      if (travel > 32) setHidden(true);
      else if (travel < -12) {
        setHidden(false);
        armIdleTimer();
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const revealForKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        if (idleTimer.current) clearTimeout(idleTimer.current);
        idleTimer.current = null;
        setHidden(false);
      }
    };
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("keydown", revealForKeyboard);
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("keydown", revealForKeyboard);
      cancelAnimationFrame(frame);
    };
  }, [armIdleTimer]);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (mobileMenu.current && !mobileMenu.current.contains(event.target as Node)) {
        mobileMenu.current.open = false;
      }
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);
  useEffect(() => {
    if (caseStudy) return;
    // Read the last section above the navigation's reading line, including
    // intermediate sections that share a destination after the work-first reorder.
    const ids = ["home", "projects", "about", "experience", "education", "toolkit", "contact"];
    const sections = ids.map((id) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;
    const update = () => {
      frame = 0;
      if (anchorDestination.current) return;
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const contact = document.getElementById("contact")?.getBoundingClientRect();
      const contactInView = contact && contact.top < window.innerHeight * 0.5 && contact.bottom > window.innerHeight * 0.5;
      const current = atBottom || contactInView ? "contact" : sections.findLast((section) => section.getBoundingClientRect().top <= 150)?.id ?? "home";
      const destination = current === "about" ? "projects" : ["education", "toolkit"].includes(current) ? "experience" : current;
      setActive((previous) => previous === destination ? previous : destination);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const startAnchor = (event: Event) => {
      const id = (event as CustomEvent<{ id: string }>).detail.id;
      if (!destinations.some((label) => label.toLowerCase() === id)) return;
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = null;
      setJumping(true);
      anchorDestination.current = id;
      setActive(id);
      setHidden(false);
    };
    const endAnchor = (event: Event) => {
      if ((event as CustomEvent<{ id: string }>).detail.id !== anchorDestination.current) return;
      const id = anchorDestination.current;
      anchorDestination.current = null;
      setActive(id);
      setJumping(false);
      setHidden(false);
      armIdleTimer();
    };
    const cancelAnchor = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = null;
      if (!anchorDestination.current) return;
      anchorDestination.current = null;
      setJumping(false);
      schedule();
    };
    const cancelWithWheel = (event: WheelEvent) => {
      if (event.deltaY) cancelAnchor();
    };
    let touchY: number | null = null;
    const trackTouch = (event: TouchEvent) => { touchY = event.touches[0]?.clientY ?? null; };
    const cancelWithTouch = (event: TouchEvent) => {
      const nextY = event.touches[0]?.clientY;
      if (touchY !== null && nextY !== undefined && nextY !== touchY) cancelAnchor();
      touchY = nextY ?? null;
    };
    const cancelWithKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest("input,textarea,select,[contenteditable=true]")) return;
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        cancelAnchor();
      }
    };
    document.addEventListener("portfolio:anchor-start", startAnchor);
    document.addEventListener("portfolio:anchor-end", endAnchor);
    window.addEventListener("wheel", cancelWithWheel, { passive: true });
    window.addEventListener("touchstart", trackTouch, { passive: true });
    window.addEventListener("touchmove", cancelWithTouch, { passive: true });
    document.addEventListener("keydown", cancelWithKey);
    const observer = new ResizeObserver(schedule);
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      document.removeEventListener("portfolio:anchor-start", startAnchor);
      document.removeEventListener("portfolio:anchor-end", endAnchor);
      window.removeEventListener("wheel", cancelWithWheel);
      window.removeEventListener("touchstart", trackTouch);
      window.removeEventListener("touchmove", cancelWithTouch);
      document.removeEventListener("keydown", cancelWithKey);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [caseStudy, armIdleTimer]);
  const links = destinations.map((label) => {
    const id = label.toLowerCase();
    return <Link key={id} href={`${caseStudy ? "/" : ""}#${id}`} className={active === id && !caseStudy ? "nav-link active" : "nav-link"} aria-current={active === id && !caseStudy ? "location" : undefined} onClick={() => {
      setActive(id);
      setHidden(false);
      if (mobileMenu.current?.open) {
        mobileMenu.current.open = false;
        mobileMenu.current.querySelector("summary")?.focus();
      }
    }}>{label}</Link>;
  });
  return (
    <>
    <motion.nav ref={desktopMenu} className="navigation" aria-label="Main navigation" inert={shouldHide} initial={false} animate={{ y: shouldHide ? "calc(-100% - 24px)" : 0 }} transition={{ duration: reducedMotion ? 0 : 0.22 }} onFocusCapture={() => { if (idleTimer.current) clearTimeout(idleTimer.current); idleTimer.current = null; setHidden(false); }}>
      {links}
    </motion.nav>
    <motion.details className="mobile-navigation" ref={mobileMenu} inert={shouldHide} initial={false} animate={{ y: shouldHide ? "calc(-100% - 24px)" : 0 }} transition={{ duration: reducedMotion ? 0 : 0.22 }} onFocusCapture={() => { if (idleTimer.current) clearTimeout(idleTimer.current); idleTimer.current = null; setHidden(false); }} onKeyDown={(event) => {
      if (event.key === "Escape") {
        event.currentTarget.open = false;
        event.currentTarget.querySelector("summary")?.focus();
      }
    }}>
      <summary>Menu <span className="menu-icon" aria-hidden="true" /></summary>
      <nav aria-label="Main navigation">{links}</nav>
    </motion.details>
    </>
  );
}

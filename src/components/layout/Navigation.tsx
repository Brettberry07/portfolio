"use client";

import Link from "next/link";
import "./navigation.css";
import { useEffect, useRef, useState } from "react";

const destinations = ["Home", "Projects", "Experience", "Contact"] as const;
export function Navigation({ caseStudy = false }: { caseStudy?: boolean }) {
  const [active, setActive] = useState("home");
  const mobileMenu = useRef<HTMLDetailsElement>(null);
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
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const current = atBottom ? "contact" : sections.findLast((section) => section.getBoundingClientRect().top <= 150)?.id ?? "home";
      const destination = current === "about" ? "projects" : ["education", "toolkit"].includes(current) ? "experience" : current;
      setActive((previous) => previous === destination ? previous : destination);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [caseStudy]);
  const links = destinations.map((label) => {
    const id = label.toLowerCase();
    return <Link key={id} href={`${caseStudy ? "/" : ""}#${id}`} className={active === id && !caseStudy ? "nav-link active" : "nav-link"} aria-current={active === id && !caseStudy ? "location" : undefined} onClick={() => {
      setActive(id);
      if (mobileMenu.current?.open) {
        mobileMenu.current.open = false;
        mobileMenu.current.querySelector("summary")?.focus();
      }
    }}>{label}</Link>;
  });
  return (
    <>
    <nav className="navigation" aria-label="Main navigation">
      {links}
    </nav>
    <details className="mobile-navigation" ref={mobileMenu} onKeyDown={(event) => {
      if (event.key === "Escape") {
        event.currentTarget.open = false;
        event.currentTarget.querySelector("summary")?.focus();
      }
    }}>
      <summary>Menu <span className="menu-icon" aria-hidden="true" /></summary>
      <nav aria-label="Main navigation">{links}</nav>
    </details>
    </>
  );
}

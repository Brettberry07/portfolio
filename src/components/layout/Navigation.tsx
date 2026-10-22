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
    const observer = new IntersectionObserver((entries) => {
      const entry = entries.find((item) => item.isIntersecting);
      if (entry) setActive(entry.target.id === "about" ? "home" : entry.target.id);
    }, { rootMargin: "-15% 0px -55% 0px" });
    ["home", "about", "projects", "experience", "contact"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
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

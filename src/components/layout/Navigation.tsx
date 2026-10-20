"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const destinations = ["Home", "Projects", "Experience", "Contact"] as const;
export function Navigation({ caseStudy = false }: { caseStudy?: boolean }) {
  const [active, setActive] = useState("home");
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
  return (
    <nav className="navigation" aria-label="Main navigation">
      {destinations.map((label) => {
        const id = label.toLowerCase();
        return <Link key={id} href={`${caseStudy ? "/" : ""}#${id}`} className={active === id && !caseStudy ? "nav-link active" : "nav-link"} aria-current={active === id && !caseStudy ? "location" : undefined} onClick={() => setActive(id)}>{label}</Link>;
      })}
    </nav>
  );
}

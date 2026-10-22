"use client";

import { Atom, Container, Gem, GitBranch, NotebookPen, Smartphone, Zap } from "lucide-react";
import { motion, useInView, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { useMotionPreference } from "@/components/motion/useMotionPreference";
import "./toolkit.css";

// Supplied SVG marks share the same color and motion system as the remaining Lucide glyphs.
const groups = [
  {
    title: "Languages",
    description: "From versatile scripting to lower-level systems, these are the languages I use to turn ideas into working software.",
    tools: [
      { name: "TypeScript", svg: "/icons/toolkit/typescript.svg", color: "#3178c6" },
      { name: "JavaScript", svg: "/icons/toolkit/javascript.svg", color: "#ac8400" },
      { name: "Python", svg: "/icons/toolkit/python.svg", color: "#3776ab" },
      { name: "C++", svg: "/icons/toolkit/cpp.svg", color: "#00599c" },
      { name: "Rust", svg: "/icons/toolkit/rust.svg", color: "#93552e" },
      { name: "Ruby", Icon: Gem, color: "#cc342d" },
    ],
  },
  {
    title: "Frontend & Product",
    description: "The frameworks I use to build thoughtful, responsive web and mobile experiences.",
    tools: [
      { name: "React", Icon: Atom, color: "#087ea4" },
      { name: "Next.js", svg: "/icons/toolkit/nextjs.svg", color: "#171717" },
      { name: "React Native", Icon: Smartphone, color: "#1684aa" },
      { name: "Tailwind CSS", svg: "/icons/toolkit/tailwindcss.svg", color: "#0891a5" },
    ],
  },
  {
    title: "Backend & Data",
    description: "The databases, frameworks, and services that power reliable applications and scalable systems.",
    tools: [
      { name: "PostgreSQL", svg: "/icons/toolkit/postgresql.svg", color: "#4169a1" },
      { name: "SQL", svg: "/icons/toolkit/sql.svg", color: "#3c697c" },
      { name: "Ruby on Rails", svg: "/icons/toolkit/rails.svg", color: "#cf222e" },
      { name: "Supabase", Icon: Zap, color: "#21875d" },
    ],
  },
  {
    title: "Infrastructure & Tools",
    description: "My development and deployment toolkit for building, testing, and shipping software.",
    tools: [
      { name: "Docker", Icon: Container, color: "#1d63ed" },
      { name: "Git", Icon: GitBranch, color: "#e34d32" },
      { name: "Jupyter", Icon: NotebookPen, color: "#c66620" },
    ],
  },
] as const;
const tools = groups.flatMap((group, category) => group.tools.map((tool, order) => ({ ...tool, category, order })));
// Three centered 5–7–5 columns interleave categories; phones fold them into rows.
const columns = [[0, 6, 2, 14, 7], [5, 10, 1, 9, 11, 15, 3], [8, 4, 12, 13, 16]];
const pinQuery = "(min-width: 601px) and (min-height: 780px), (max-width: 600px) and (min-height: 820px)";
function subscribe(notify: () => void) {
  const query = window.matchMedia(pinQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
const clientSnapshot = () => window.matchMedia(pinQuery).matches;
const serverSnapshot = () => false;

export function Toolkit() {
  const section = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridEntered = useInView(gridRef, { once: true, amount: 0.35 });
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const canPin = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const reducedMotion = useMotionPreference();
  const scrollEnabled = canPin && !reducedMotion;
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 110px", "end end"] });

  const updateActive = useCallback((value: number) => {
    if (!scrollEnabled) return;
    const next = Math.min(groups.length - 1, Math.floor(value * groups.length));
    const current = activeRef.current;
    // Small dead bands prevent repeated activation when reversing near a boundary.
    const boundary = (next > current ? next : next + 1) / groups.length;
    if (next !== current && Math.abs(value - boundary) > 0.012) {
      activeRef.current = next;
      setActive(next);
    }
  }, [scrollEnabled]);
  useMotionValueEvent(scrollYProgress, "change", updateActive);
  useEffect(() => {
    const frame = requestAnimationFrame(() => updateActive(scrollYProgress.get()));
    return () => cancelAnimationFrame(frame);
  }, [scrollYProgress, updateActive]);

  function goTo(index: number) {
    if (!section.current || !scrollEnabled) return;
    const bounds = section.current.getBoundingClientRect();
    const travel = bounds.height - window.innerHeight + 110;
    const position = bounds.top + window.scrollY - 110 + (index + 0.5) / groups.length * travel;
    if (lenis) lenis.scrollTo(position, { immediate: true });
    else window.scrollTo({ top: position, behavior: "instant" });
  }
  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = Math.min(index + 1, groups.length - 1);
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = Math.max(index - 1, 0);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = groups.length - 1;
    else return;
    event.preventDefault();
    goTo(next);
    buttons.current[next]?.focus({ preventScroll: true });
  }

  return (
    <section className="toolkit" ref={section} aria-labelledby="toolkit-title" data-scroll={scrollEnabled} data-active-category={active}>
      <h3 id="toolkit-title" className="toolkit-accessible-title">A selected toolkit</h3>
      <div className="toolkit-sticky">
        <div className="toolkit-layout">
          <div className="toolkit-editorial">
            <div className="toolkit-panels">
              {groups.map((group, index) => {
                const current = !scrollEnabled || index === active;
                return <motion.article className="toolkit-panel" key={group.title} id={`toolkit-panel-${index}`} aria-labelledby={`toolkit-heading-${index}`} aria-hidden={!current || undefined} inert={!current} initial={false} animate={{ opacity: current ? 1 : 0, y: current ? 0 : 6 }} transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.2, 0.7, 0.2, 1] }}>
                  <span className="mono toolkit-eyebrow">0{index + 1} / 04 <span>— TOOLKIT</span></span>
                  <h4 id={`toolkit-heading-${index}`}>{group.title}</h4>
                  <p>{group.description}</p>
                  <ul className="toolkit-tool-names" aria-label={`${group.title} technologies`}>{group.tools.map((tool) => <li key={tool.name}>{tool.name}</li>)}</ul>
                </motion.article>;
              })}
            </div>
            <nav className="toolkit-controls" aria-label="Explore the toolkit">
              {groups.map((group, index) => <button type="button" key={group.title} aria-label={`0${index + 1} ${group.title}`} aria-current={active === index ? "step" : undefined} aria-controls={`toolkit-panel-${index}`} ref={(element) => { buttons.current[index] = element; }} onClick={() => goTo(index)} onKeyDown={(event) => handleKey(event, index)} className={active === index ? "is-active" : undefined}><span className="mono">0{index + 1}</span></button>)}
              <span className="mono toolkit-scroll-cue" aria-hidden="true">SCROLL TO EXPLORE ↓</span>
            </nav>
          </div>
          <div ref={gridRef} className="toolkit-grid" role="group" aria-label="Technology icons; hover or focus for names">
            {columns.map((column, columnIndex) => <ul className="toolkit-column" key={columnIndex}>
              {column.map((toolIndex) => {
                const tool = tools[toolIndex];
                const highlighted = !scrollEnabled || (gridEntered && tool.category === active);
                return <li key={tool.name}>
                  <button type="button" className={`toolkit-tool ${highlighted ? "is-active" : ""}`} aria-label={tool.name} data-category={tool.category} onClick={(event) => event.currentTarget.focus()}>
                    <motion.span className="toolkit-icon" initial={false} animate={{ color: highlighted ? tool.color : "#b8b8b0", scale: highlighted && scrollEnabled ? 1.06 : 1 }} transition={{ duration: reducedMotion ? 0 : 0.3, delay: highlighted && scrollEnabled ? tool.order * 0.08 : 0, ease: [0.2, 0.7, 0.2, 1] }}>{"svg" in tool ? <span className="toolkit-supplied-icon" aria-hidden="true" style={{ maskImage: `url(${tool.svg})`, WebkitMaskImage: `url(${tool.svg})` }} /> : <tool.Icon size={42} strokeWidth={1.35} aria-hidden="true" />}</motion.span>
                    <span className="toolkit-tool-label" aria-hidden="true">{tool.name}</span>
                  </button>
                </li>;
              })}
            </ul>)}
          </div>
        </div>
      </div>
    </section>
  );
}

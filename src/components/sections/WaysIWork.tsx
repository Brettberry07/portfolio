"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { useMotionPreference } from "@/components/motion/useMotionPreference";
import "./ways-i-work.css";

const ways = [
  {
    title: "Software engineering", label: "ENGINEER",
    headline: "Complex underneath.", emphasis: "Effortless on the surface.",
    description: "Reliable applications, thoughtful infrastructure, and data systems built to handle the detail so people don’t have to.",
    projects: [{ title: "Tariff Ninja", slug: "tariff-ninja" }, { title: "Querry Berry", slug: "querry-berry" }],
  },
  {
    title: "Product development", label: "SHAPE",
    headline: "An idea is a start.", emphasis: "Make it useful.",
    description: "From the first question to a working prototype, I connect discovery, design, and engineering around what people actually need.",
    projects: [{ title: "Still On", slug: "still-on" }, { title: "Potential Energy Tech", slug: "potential-energy-tech" }],
  },
  {
    title: "Systems & automation", label: "SIMPLIFY",
    headline: "Find the friction.", emphasis: "Rethink the system.",
    description: "I look closely at how work gets done, find the bottlenecks, and build tools that make complicated operations simpler.",
    projects: [{ title: "Amazeum", slug: "amazeum" }, { title: "Tariff Ninja", slug: "tariff-ninja" }],
  },
  {
    title: "Client collaboration", label: "CONNECT",
    headline: "Good work starts", emphasis: "with listening.",
    description: "Working directly with the people behind a problem to understand the context, ask better questions, and shape a useful solution together.",
    projects: [{ title: "City of Bentonville Traffic", slug: "city-of-bentonville-traffic" }, { title: "Potential Energy Tech", slug: "potential-energy-tech" }],
  },
] as const;

const heightQuery = "(min-width: 601px) and (min-height: 651px)";
const mobileQuery = "(max-width: 600px)";
function subscribeMobile(notify: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
const mobileSnapshot = () => window.matchMedia(mobileQuery).matches;
function subscribe(notify: () => void) {
  const query = window.matchMedia(heightQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
const clientSnapshot = () => window.matchMedia(heightQuery).matches;
const serverSnapshot = () => false;
const start = 0.06;
const finish = 0.85;

export function WaysIWork() {
  const section = useRef<HTMLDivElement>(null);
  const carousel = useRef<HTMLDivElement>(null);
  const mobile = useSyncExternalStore(subscribeMobile, mobileSnapshot, serverSnapshot);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const canPin = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const reducedMotion = useMotionPreference();
  const scrollEnabled = canPin && !reducedMotion;
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 96px", "end end"] });
  const x = useTransform(scrollYProgress, [0, start, finish, 1], ["0%", "0%", "-75%", "-75%"]);
  const progress = useTransform(scrollYProgress, [start, finish], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!scrollEnabled) return;
    const next = Math.round(Math.max(0, Math.min(1, (value - start) / (finish - start))) * (ways.length - 1));
    setActive((current) => current === next ? current : next);
  });

  function goTo(index: number) {
    if (mobile && carousel.current) {
      carousel.current.scrollTo({ left: index * carousel.current.clientWidth, behavior: reducedMotion ? "instant" : "smooth" });
      return;
    }
    if (!section.current || !scrollEnabled) return;
    const bounds = section.current.getBoundingClientRect();
    const distance = bounds.height - window.innerHeight + 96;
    const position = bounds.top + window.scrollY - 96 + (start + index / (ways.length - 1) * (finish - start)) * distance;
    if (lenis) lenis.scrollTo(position, { immediate: true });
    else window.scrollTo({ top: position, behavior: "instant" });
  }

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = Math.min(index + 1, ways.length - 1);
    else if (event.key === "ArrowLeft") next = Math.max(index - 1, 0);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = ways.length - 1;
    else return;
    event.preventDefault();
    goTo(next);
    buttons.current[next]?.focus({ preventScroll: true });
  }

  return (
    <div className="ways-work" ref={section} data-scroll={scrollEnabled} data-mobile={mobile} aria-labelledby="ways-title">
      <div className="ways-sticky">
        <div className="ways-layer ways-layer-orange" aria-hidden="true" />
        <div className="ways-layer ways-layer-black" aria-hidden="true" />
        <div className="ways-layer ways-layer-charcoal" aria-hidden="true" />
        <div className="ways-surface">
          <header className="ways-heading">
            <div><span className="mono ways-eyebrow">A CONNECTED APPROACH</span><h3 id="ways-title">Ways I work<span>.</span></h3></div>
            <span className="mono ways-scroll-hint"><span className="ways-desktop-hint">SCROLL TO EXPLORE</span><span className="ways-mobile-hint">SWIPE TO EXPLORE</span> <ArrowDown size={14} aria-hidden="true" /></span>
          </header>
          <div className="ways-window" ref={carousel} onScroll={(event) => {
            if (!mobile) return;
            const { scrollLeft, clientWidth } = event.currentTarget;
            setActive(Math.max(0, Math.min(ways.length - 1, Math.round(scrollLeft / clientWidth))));
          }}>
            <motion.div className="ways-track" style={{ x: scrollEnabled ? x : 0 }}>
              {ways.map((way, index) => (
                <article className="ways-panel" id={`way-panel-${index}`} key={way.title} aria-labelledby={`way-title-${index}`} onFocusCapture={() => { if (active !== index) goTo(index); }}>
                  <div className="ways-panel-top"><span className="mono">0{index + 1} / {way.title}</span><span className="ways-glyph" aria-hidden="true">↗</span></div>
                  <div className="ways-statement"><h4 id={`way-title-${index}`}>{way.headline}<br /><em>{way.emphasis}</em></h4><p>{way.description}</p></div>
                  <div className="ways-folio" aria-hidden="true"><span>0{index + 1}</span><span className="mono">{way.label}</span></div>
                  <div className="ways-examples"><span className="mono">IN PRACTICE</span>{way.projects.map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}>{project.title}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}</div>
                </article>
              ))}
            </motion.div>
          </div>
          <nav className="ways-controls" aria-label="Explore ways I work">
            {ways.map((way, index) => <button type="button" key={way.title} className={active === index ? "is-active" : undefined} aria-label={`0${index + 1} ${way.title}`} aria-current={active === index ? "step" : undefined} aria-controls={`way-panel-${index}`} ref={(element) => { buttons.current[index] = element; }} onClick={() => goTo(index)} onKeyDown={(event) => handleKey(event, index)}><span className="mono">0{index + 1}</span><span>{way.title}</span></button>)}
          </nav>
          <div className="ways-progress" aria-hidden="true"><motion.span style={{ scaleX: scrollEnabled ? progress : 1 }} /></div>
        </div>
      </div>
    </div>
  );
}

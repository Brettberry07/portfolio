"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useMotionPreference } from "@/components/motion/useMotionPreference";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { experience } from "@/content/experience";
import { DoubleAABatteryIllustration, TradeGlobeIllustration } from "./ExperienceIllustrations";
import "./experience.css";

type ExperienceProps = { resumeHref?: string };

export function Experience({ resumeHref }: ExperienceProps) {
  const timeline = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [reached, setReached] = useState(-1);
  const reducedMotion = useMotionPreference();
  const geometry = useRef({ height: 1, nodes: [] as number[] });
  const { scrollYProgress } = useScroll({ target: timeline, offset: ["start 55%", "end 55%"] });

  function updateReadingPosition(progress: number) {
    const { height, nodes } = geometry.current;
    const filled = progress * height;
    const latest = nodes.findLastIndex((position) => filled >= position);
    setReached((previous) => previous === latest ? previous : latest);
    // A small dead band keeps artwork steady around a company boundary.
    setActive((previous) => {
      if (latest > previous && filled >= nodes[latest] + 16) return latest;
      if (latest < previous && filled < nodes[previous] - 16) return Math.max(0, latest);
      return previous;
    });
  }

  useMotionValueEvent(scrollYProgress, "change", updateReadingPosition);
  useEffect(() => {
    const element = timeline.current;
    if (!element) return;
    const measure = () => {
      geometry.current = {
        height: element.offsetHeight,
        nodes: Array.from(element.children).map((entry, index) => (entry as HTMLElement).offsetTop + (index === 0 ? 7 : 31)),
      };
      updateReadingPosition(scrollYProgress.get());
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    Array.from(element.children).forEach((entry) => observer.observe(entry));
    measure();
    return () => observer.disconnect();
  }, [scrollYProgress]);

  return <section className="experience section-wrap" id="experience" aria-labelledby="experience-title">
    <div className="section-topline mono"><span>03 / EXPERIENCE</span><span>Professional work.</span></div>
    <noscript><style>{`.exp-art-stage,.exp-timeline-fill{display:none!important}.exp-entry-art{display:block!important}.experience-intro{position:static!important}`}</style></noscript>
    <div className="experience-layout">
      <header className="experience-intro"><h2 className="section-title" id="experience-title">Built through<br /> experience.</h2>{resumeHref && <a className="quiet-link" href={resumeHref} download>Download résumé <ArrowDownToLine size={20} /></a>}
        <div className="exp-art-stage" aria-hidden="true" data-active-project={experience[active].projectSlug}>
          {experience.map((entry, index) => <motion.div key={entry.projectSlug} className="exp-art-stage__drawing" initial={false} animate={{ opacity: active === index ? 1 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.3 }}>{entry.projectSlug === "tariff-ninja" ? <TradeGlobeIllustration /> : <DoubleAABatteryIllustration />}</motion.div>)}
        </div>
      </header>
      <div className="exp-timeline-wrap">
        <motion.div className="exp-timeline-fill" aria-hidden="true" style={{ scaleY: reducedMotion ? 1 : scrollYProgress }} />
        <ol ref={timeline} className="exp-timeline" aria-label="Professional experience, most recent first">{experience.map((entry, index) => <li className={`exp-entry${index <= reached ? " is-reached" : ""}`} key={entry.company}>
        <Reveal><div className="exp-entry-heading"><div><p className="mono exp-date">{entry.dates}</p><h3>{entry.company}</h3><p className="exp-location">{entry.location}</p></div><div className="exp-entry-art" aria-hidden="true">{entry.projectSlug === "tariff-ninja" ? <TradeGlobeIllustration /> : <DoubleAABatteryIllustration />}</div></div>
        <ol className="exp-roles" aria-label={`Roles at ${entry.company}`}>{entry.roles.map((role) => <li key={role.title}><h4>{role.title}</h4><span>{role.dates}</span></li>)}</ol>
        <p className="exp-summary">{entry.summary}</p><p className="exp-impact"><strong>{entry.emphasis.value}</strong><span>{entry.emphasis.label}</span></p>
        <Link className="quiet-link" href={`/projects/${entry.projectSlug}`}>View case study <ArrowUpRight size={20} /></Link></Reveal>
      </li>)}</ol></div>
    </div>
  </section>;
}

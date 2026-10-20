"use client";

import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";

const ways = [
  {
    title: "Software engineering",
    description: "Building reliable applications, complex data systems, and the infrastructure behind them.",
    projects: [{ title: "Tariff Ninja", slug: "tariff-ninja" }, { title: "Querry Berry", slug: "querry-berry" }],
  },
  {
    title: "Product development",
    description: "Taking ideas from early discovery and prototyping through design and working software.",
    projects: [{ title: "Still On", slug: "still-on" }, { title: "Potential Energy Tech", slug: "potential-energy-tech" }],
  },
  {
    title: "Systems & automation",
    description: "Finding inefficiencies and creating tools that make complicated operations simpler.",
    projects: [{ title: "Amazeum", slug: "amazeum" }, { title: "Tariff Ninja", slug: "tariff-ninja" }],
  },
  {
    title: "Client collaboration",
    description: "Working directly with stakeholders to understand challenges, translate requirements, and deliver useful solutions.",
    projects: [{ title: "City of Bentonville Traffic", slug: "city-of-bentonville-traffic" }, { title: "Potential Energy Tech", slug: "potential-energy-tech" }],
  },
] as const;

export function WaysIWork() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % ways.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + ways.length - 1) % ways.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = ways.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className="ways-work" aria-labelledby="ways-title">
      <div className="ways-heading"><h3 id="ways-title">Ways I work.</h3><span className="mono">DIFFERENT LENSES. ONE CONNECTED APPROACH.</span><Plus size={17} strokeWidth={1} aria-hidden="true" /></div>
      <div className="ways-controls" role="tablist" aria-label="Ways I work">
        {ways.map((way, index) => (
          <button
            type="button"
            role="tab"
            className={`ways-tab${active === index ? " is-active" : ""}`}
            key={way.title}
            id={`way-tab-${index}`}
            aria-controls={`way-panel-${index}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            ref={(element) => { buttons.current[index] = element; }}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleKey(event, index)}
          >
            <span className="mono">0{index + 1}</span><span>{way.title}</span>
            {active === index && <motion.span className="ways-indicator" layoutId="ways-indicator" transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }} />}
          </button>
        ))}
      </div>

      <div className="ways-panels">
        {ways.map((way, index) => (
          <motion.div
            className="ways-panel"
            key={way.title}
            role="tabpanel"
            id={`way-panel-${index}`}
            aria-labelledby={`way-tab-${index}`}
            hidden={active !== index}
            tabIndex={0}
            initial={false}
            animate={{ opacity: active === index ? 1 : 0, y: active === index ? 0 : 8 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
          >
            <p className="ways-description">{way.description}</p>
            <div className="ways-examples"><span className="mono">SEE IT IN THE WORK</span>{way.projects.map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}>{project.title}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div>
          </motion.div>
        ))}
      </div>

      <noscript>
        <style>{`.ways-controls,.ways-panels{display:none!important}`}</style>
        <div className="ways-static">{ways.map((way, index) => <div className="ways-static-item" key={way.title}><h4><span className="mono">0{index + 1}</span>{way.title}</h4><p>{way.description}</p><div className="ways-examples">{way.projects.map((project) => <Link key={project.slug} href={`/projects/${project.slug}`}>{project.title}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div></div>)}</div>
      </noscript>
    </div>
  );
}

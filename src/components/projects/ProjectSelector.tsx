"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { motion, useReducedMotion } from "motion/react";
import "./project-selector.css";

export function ProjectSelector() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[active];
  const reducedMotion = useReducedMotion();
  const select = (index: number) => setActive((index + projects.length) % projects.length);

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % projects.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + projects.length) % projects.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = projects.length - 1;
    else return;
    event.preventDefault();
    select(next);
    buttons.current[next]?.focus({ preventScroll: true });
  }

  return (
    <section id="projects" className="selected-work" aria-labelledby="selected-work-title">
      <div className="container section-wrap">
        <div className="section-topline mono"><span>01 / SELECTED WORK</span><span>Engineering, in practice.</span></div>
        <header className="selected-work__heading"><h2 className="section-title" id="selected-work-title">Selected work.</h2><p>Client problems, independent projects,<br className="desktop-break" /> and the systems behind them.</p></header>
        <noscript><style>{`.project-interactive{display:none!important}`}</style><nav className="project-noscript" aria-label="Project case studies"><ol>{projects.map((entry) => <li key={entry.slug}><Link href={`/projects/${entry.slug}`}>{entry.id} / {entry.title}<ArrowUpRight size={20} /></Link></li>)}</ol></nav></noscript>
        <div className="project-explorer project-interactive">
          <p className="project-explorer__hint mono">SELECT A PROJECT</p>
          <div className="project-explorer__index">
            <ol className="project-list" aria-label="Select a project">
              {projects.map((entry, index) => <li key={entry.slug}>
                <button type="button" ref={(element) => { buttons.current[index] = element; }} className={`project-list__item${active === index ? " is-active" : ""}`} onClick={() => select(index)} onKeyDown={(event) => handleKey(event, index)} aria-pressed={active === index} aria-controls="active-project-card">
                  <span className="project-list__number mono">{entry.id}</span><span className="project-list__identity"><span>{entry.shortTitle ?? entry.title}</span>{index < 2 && <small>Professional engineering</small>}</span><ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </li>)}
            </ol>
          </div>
          <div className="project-mobile-select"><label className="mono" htmlFor="project-choice">SELECT A PROJECT</label><select id="project-choice" value={active} onChange={(event) => select(Number(event.target.value))}>{projects.map((entry, index) => <option key={entry.slug} value={index}>{entry.id} / {entry.shortTitle ?? entry.title}</option>)}</select></div>
          <div className="project-showcase" role="region" aria-label="Selected project preview">
            <div className="project-stack">
              {[2, 1, 0].map((depth) => {
                const index = (active + depth) % projects.length;
                const entry = projects[index];
                const isActive = depth === 0;
                const year = entry.period?.match(/20\d{2}/)?.[0];
                return (
                  <motion.article
                    key={entry.slug}
                    id={isActive ? "active-project-card" : undefined}
                    className={`project-card${isActive ? " is-front" : " is-behind"}`}
                    aria-labelledby={isActive ? "active-project-title" : undefined}
                    initial={false}
                    animate={{ x: `${depth * 3}%`, y: depth * -6, rotate: depth, scale: 1 - depth * 0.015 }}
                    transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ zIndex: 3 - depth }}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) > 45) select(active + (info.offset.x < 0 ? 1 : -1));
                    }}
                  >
                    {isActive ? <>
                      <header className="project-card__header">
                        <p className="project-card__metadata mono"><span>{entry.cover.category}</span>{year && <span>{year}</span>}</p>
                        <h3 id="active-project-title">{entry.shortTitle ?? entry.title}</h3>
                      </header>
                      <div className="project-card__content">
                        <p className={`project-card__focal${entry.cover.metric ? " is-metric" : ""}`}>{entry.cover.focal}</p>
                        <p className="project-card__explanation">{entry.cover.explanation}</p>
                      </div>
                      {entry.workflow && <div className="project-card__approach">
                        <p className="mono">APPROACH</p>
                        <ol aria-label={`${entry.shortTitle ?? entry.title} approach`}>{entry.workflow.map((step, stepIndex) => <li key={step.title}><span className="mono" aria-hidden="true">{String(stepIndex + 1).padStart(2, "0")}</span><span>{step.title}</span></li>)}</ol>
                      </div>}
                      <Link className="project-card__link" href={`/projects/${entry.slug}`}>View case study <ArrowUpRight size={22} aria-hidden="true" /></Link>
                    </> : <button className="project-card__peek mono" type="button" onClick={() => select(index)} aria-label={`Select ${entry.title}`} />}
                  </motion.article>
                );
              })}
            </div>
            <div className="project-showcase__controls"><p className="mono" aria-live="polite" aria-atomic="true">{project.id} / {String(projects.length).padStart(2, "0")}<span className="sr-only"> — {project.title}</span></p><div><span className="project-showcase__gesture">Drag to explore</span><button type="button" onClick={() => select(active - 1)} aria-label="Previous project"><ArrowLeft size={20} /></button><button type="button" onClick={() => select(active + 1)} aria-label="Next project"><ArrowRight size={20} /></button></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

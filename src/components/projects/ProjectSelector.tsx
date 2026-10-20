"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type PanInfo } from "motion/react";
import { ArrowDownLeft, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectArtwork } from "@/components/projects/ProjectArtwork";
import "./project-selector.css";

function relativePosition(index: number, active: number) {
  const distance = (index - active + projects.length) % projects.length;
  return distance > projects.length / 2 ? distance - projects.length : distance;
}

export function ProjectSelector() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const selectedProject = projects[active];

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    function keepSelectionVisible() {
      const item = list?.children[active] as HTMLElement | undefined;
      if (!list || !item || list.scrollWidth <= list.clientWidth) return;
      const left = item.offsetLeft;
      const right = left + item.offsetWidth;
      if (left < list.scrollLeft) {
        list.scrollTo({ left: Math.max(0, left - 4), behavior: reducedMotion ? "instant" : "smooth" });
      } else if (right > list.scrollLeft + list.clientWidth) {
        list.scrollTo({ left: right - list.clientWidth + 4, behavior: reducedMotion ? "instant" : "smooth" });
      }
    }
    keepSelectionVisible();
    const resizeObserver = new ResizeObserver(keepSelectionVisible);
    resizeObserver.observe(list);
    return () => resizeObserver.disconnect();
  }, [active, reducedMotion]);

  function select(index: number) {
    setActive((index + projects.length) % projects.length);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (["ArrowDown", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      select(active + 1);
    } else if (["ArrowUp", "ArrowLeft"].includes(event.key)) {
      event.preventDefault();
      select(active - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(projects.length - 1);
    }
  }

  function onDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 350) {
      select(active + (info.offset.x < 0 ? 1 : -1));
    }
  }

  return (
    <section id="projects" className="selected-work" aria-labelledby="selected-work-title">
      <div className="selected-work__eyebrow">
        <span>02 / SELECTED WORK</span>
        <span>Ideas made tangible.</span>
      </div>
      <motion.div className="selected-work__heading" initial={false} whileInView={reducedMotion ? undefined : { y: [24, 0] }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <h2 id="selected-work-title">Selected work<span>.</span></h2>
        <ArrowDownLeft aria-hidden="true" strokeWidth={1.2} />
      </motion.div>

      <noscript>
        <nav className="project-noscript" aria-label="Project case studies">
          <p>Explore the work.</p>
          <ol>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`}><span>{project.id}</span>{project.title}<ArrowUpRight size={20} aria-hidden="true" /></Link>
              </li>
            ))}
          </ol>
        </nav>
      </noscript>

      <div className="project-explorer" onKeyDown={onKeyDown}>
        <div className="project-explorer__index">
          <p className="project-explorer__hint" id="project-explorer-hint">Seven projects. Different perspectives.</p>
          <ol ref={listRef} className="project-list" aria-label="Select a project">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <button
                  type="button"
                  className={`project-list__item${active === index ? " is-active" : ""}`}
                  onClick={() => select(index)}
                  onMouseEnter={() => select(index)}
                  onFocus={() => select(index)}
                  aria-pressed={active === index}
                  aria-controls="active-project-card"
                >
                  <span className="project-list__number">{project.id}</span>
                  <span className="project-list__name">{project.title}</span>
                  {active === index ? <motion.span className="project-list__marker" layoutId="project-active-marker" aria-hidden="true" transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 32 }} /> : null}
                </button>
              </li>
            ))}
          </ol>
          <p className="project-explorer__instruction">Select a project. Explore the thinking.</p>
        </div>

        <div className="project-showcase" role="region" aria-roledescription="carousel" aria-label="Selected project showcase" aria-describedby="project-explorer-hint">
          <div className="project-stack">
            <div className="project-stack__geometry" aria-hidden="true" />
            {projects.map((project, index) => {
              const position = relativePosition(index, active);
              const isActive = position === 0;
              const isNext = position === 1;
              const isPrevious = position === -1;
              const visible = isActive || isNext || isPrevious;
              return (
                <motion.article
                  key={project.slug}
                  id={isActive ? "active-project-card" : undefined}
                  className={`project-stack__card${isActive ? " is-active" : " is-behind"}`}
                  aria-hidden={!visible}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isNext ? 32 : 66,
                    y: isActive ? 0 : isNext ? -22 : -42,
                    rotate: isActive ? -1.5 : isNext ? 3 : 7,
                    scale: isActive ? 1.015 : isNext ? 0.98 : 0.95,
                    opacity: isActive ? 1 : visible ? 0.65 : 0,
                  }}
                  transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 190, damping: 27 }}
                  style={{ zIndex: isActive ? 3 : isNext ? 2 : 1, visibility: visible ? "visible" : "hidden" }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={reducedMotion ? 0 : 0.12}
                  onDragEnd={onDragEnd}
                >
                  {isActive ? (
                    <>
                      <div className="project-card__masthead">
                        <span>PROJECT / {project.id}</span>
                        <span className="project-card__cross" aria-hidden="true">+</span>
                      </div>
                      <motion.div className="project-card__art" initial={false} animate={reducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: [0.2, 1], y: [14, 0], scale: [0.97, 1] }} transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}>
                        <ProjectArtwork project={project} variant="cover" accessible={false} />
                      </motion.div>
                      <motion.div className="project-card__content" initial={false} animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: [0.2, 1], y: [10, 0] }} transition={{ duration: 0.35, delay: 0.1 }}>
                        <div className="project-card__tags">
                          <span>{project.category || "Case study"}</span>
                          <span>{project.technologies.length ? project.technologies.slice(0, 2).join(" / ") : "Details forthcoming"}</span>
                        </div>
                        <h3>{project.title}</h3>
                        <p>{project.summary || "Case study details coming soon."}</p>
                        <Link href={`/projects/${project.slug}`} className="project-card__link" draggable={false}>
                          View case study <ArrowUpRight size={22} aria-hidden="true" />
                        </Link>
                      </motion.div>
                    </>
                  ) : (
                    <button className="project-card__peek" type="button" onClick={() => select(index)} tabIndex={visible ? 0 : -1} aria-label={`Select ${project.title}`}>
                      <div className="project-card__peek-art"><ProjectArtwork project={project} /></div>
                      <span>{project.id} / {project.title}</span>
                    </button>
                  )}
                </motion.article>
              );
            })}
          </div>
          <div className="project-showcase__controls">
            <span className="project-showcase__count" aria-live="polite" aria-atomic="true"><b>{selectedProject.id}</b><span>/ 07</span><span className="sr-only"> — {selectedProject.title}</span></span>
            <span className="project-showcase__swipe-hint">Drag to explore</span>
            <div className="project-showcase__arrows">
              <button type="button" onClick={() => select(active - 1)} aria-label="Previous project"><ArrowLeft size={20} aria-hidden="true" /></button>
              <button type="button" onClick={() => select(active + 1)} aria-label="Next project"><ArrowRight size={20} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

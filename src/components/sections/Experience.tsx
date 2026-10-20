"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { education, experience, leadership } from "@/content/experience";
import "./experience.css";

type ExperienceProps = { resumeHref?: string };

export function Experience({ resumeHref }: ExperienceProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 65%"] });

  return (
    <section className="experience refined-experience section-wrap" id="experience" aria-labelledby="experience-title">
      <div className="section-topline">
        <span className="mono">03 / EXPERIENCE</span>
        <span className="mono">THE THINKING BEHIND THE MAKING</span>
      </div>
      <div className="exp-professional">
        <Reveal className="exp-intro">
          <h2 id="experience-title">Built on<br /><span className="subtle-ink">perspective.</span></h2>
          <p>From a conversation with a client to the systems behind a product. I connect the details to the bigger picture.</p>
          {resumeHref ? (
            <a className="exp-resume" href={resumeHref} download><ArrowDown size={15} aria-hidden="true" /> Download résumé</a>
          ) : (
            /* Add the actual file at public/resume/brett-berry-resume.pdf, then set siteAssets.resumeHref. */
            <span className="exp-resume exp-resume-unavailable" aria-disabled="true"><ArrowDown size={15} aria-hidden="true" /> Résumé file forthcoming</span>
          )}
          <div className="exp-perspective" aria-hidden="true"><i /><i /><i /></div>
        </Reveal>
        <div className="exp-timeline-wrap" ref={timelineRef}>
          <motion.span className="exp-progress" aria-hidden="true" style={{ scaleY: scrollYProgress }} />
        <ol className="exp-timeline" aria-label="Professional experience, most recent first">
          {experience.map((entry, index) => (
            <motion.li className="exp-entry" key={entry.company} initial={false} whileInView={reducedMotion ? undefined : { y: [22, 0] }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <motion.span className="exp-node" aria-hidden="true" initial={false} whileInView={reducedMotion ? undefined : { scale: [0.7, 1] }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
              <div className="exp-entry-meta mono"><span>{entry.dates}</span><span>0{index + 1}</span></div>
              <h3>{entry.company}</h3>
              <span className="exp-location mono">{entry.location}</span>
              <ol className="exp-roles" aria-label={`Roles at ${entry.company}`}>
                {entry.roles.map((role) => <li key={role.title}><h4>{role.title}</h4><span>{role.dates}</span></li>)}
              </ol>
              <ul className="exp-highlights">{entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              <div className="exp-impact"><strong>{entry.emphasis.value}</strong><span>{entry.emphasis.label}</span></div>
              <Link className="exp-project-link" href={`/projects/${entry.projectSlug}`}>Inside the project <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </motion.li>
          ))}
        </ol>
        </div>
      </div>
      <div className="exp-foundation">
        <Reveal className="exp-foundation-intro">
          <span className="mono exp-eyebrow">A FOUNDATION IN CURIOSITY</span>
          <h3>Always<br /><span className="subtle-ink">learning.</span></h3>
          <p>Engineering in the classroom. Building, competing, and collaborating beyond it.</p>
          <motion.div className="exp-organic" aria-hidden="true" initial={false} whileInView={reducedMotion ? undefined : { y: [22, 0], rotate: [-15, -8] }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <svg viewBox="0 0 200 220"><path d="M77 8C117-8 177 20 176 61C175 101 213 130 185 173C160 212 102 232 67 205C41 185 45 154 24 137C-1 117-4 83 21 55C38 35 49 19 77 8Z" fill="currentColor" /></svg>
            <i />
          </motion.div>
        </Reveal>
        <div className="exp-supporting">
          <div className="exp-education" aria-labelledby="education-title">
            <h3 className="mono exp-subtitle" id="education-title">EDUCATION</h3>
            {education.map((entry) => (
              <Reveal className="exp-school" key={entry.institution}>
                <span className="mono exp-school-date">{entry.dates}</span>
                <h4>{entry.institution}{entry.location ? <span>{entry.location}</span> : null}</h4>
                <p>{entry.qualification}</p>
                <span className="exp-school-detail">{entry.detail}</span>
                <span className="mono exp-gpa">{entry.note}</span>
              </Reveal>
            ))}
          </div>
          <div className="exp-leadership" aria-labelledby="leadership-title">
            <h3 className="mono exp-subtitle" id="leadership-title">BEYOND THE DAY JOB</h3>
            <ul className="exp-recognition">{leadership.map((entry) => <li key={entry.organization}><h4>{entry.organization}</h4><span className="exp-recognition-context">{entry.context}</span><p>{entry.description}</p></li>)}</ul>
          </div>
        </div>
      </div>
      <Reveal className="exp-toolkit"><span className="mono">A SELECTED TOOLKIT</span><p>TypeScript, React, Next.js, PostgreSQL, and Docker. Systems and data work in Rust, C++, and Python.</p><Link href="#projects">See them in the work <ArrowUpRight size={16} aria-hidden="true" /></Link></Reveal>
    </section>
  );
}

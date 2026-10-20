"use client";

import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { education, experience, leadership } from "@/content/experience";
import "./experience.css";

type ExperienceProps = { resumeHref?: string };

// Approved résumé toolkit plus the documented Still On product stack.
const skillGroups = [
  { name: "Languages", tools: ["TypeScript", "JavaScript", "Python", "C++", "Rust", "Ruby"] },
  { name: "Frontend & Product", tools: ["React", "Next.js", "React Native", "Tailwind CSS"] },
  { name: "Backend & Data", tools: ["PostgreSQL", "SQL", "Ruby on Rails", "Supabase"] },
  { name: "Infrastructure & Tools", tools: ["Docker", "Git", "Jupyter"] },
] as const;

/** One repeatable vector pattern; dot radii grow into a solid field, without animated DOM dots. */
function HalftoneTransition() {
  const dotField = (spacing: number, rows: number) => Array.from({ length: rows }, (_, row) => {
    const radius = 0.18 + Math.pow(row / (rows - 1), 1.65) * spacing * 0.87;
    const x = spacing / 2;
    const y = row * spacing + spacing / 2;
    return `M${x - radius},${y}a${radius},${radius} 0 1,0 ${radius * 2},0a${radius},${radius} 0 1,0 -${radius * 2},0`;
  }).join("");

  return <div className="skills-halftone" aria-hidden="true">
    <svg className="halftone-desktop" width="100%" height="360" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="skills-dots-desktop" width="18" height="360" patternUnits="userSpaceOnUse"><path d={dotField(18, 20)} /></pattern></defs>
      <rect width="100%" height="360" fill="url(#skills-dots-desktop)" /><rect y="350" width="100%" height="10" />
    </svg>
    <svg className="halftone-mobile" width="100%" height="252" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="skills-dots-mobile" width="14" height="252" patternUnits="userSpaceOnUse"><path d={dotField(14, 18)} /></pattern></defs>
      <rect width="100%" height="252" fill="url(#skills-dots-mobile)" /><rect y="242" width="100%" height="10" />
    </svg>
  </div>;
}

export function Experience({ resumeHref }: ExperienceProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 65%"] });

  return (
    <><section className="experience refined-experience section-wrap" id="experience" aria-labelledby="experience-title">
      <div className="section-topline">
        <span className="mono">03 / EXPERIENCE</span>
        <span className="mono">THE THINKING BEHIND THE MAKING</span>
      </div>
      <div className="exp-professional">
        <Reveal className="exp-intro">
          <h2 id="experience-title">Built on<br /><span className="subtle-ink">perspective.</span></h2>
          <p>From a conversation with a client to the systems behind a product. I connect the details to the bigger picture.</p>
          {resumeHref ? (
            <a className="exp-resume" href={resumeHref} download><span>Download My Résumé</span><ArrowDownToLine size={19} aria-hidden="true" /></a>
          ) : (
            /* Add the actual file at public/resume/brett-berry-resume.pdf, then set siteAssets.resumeHref. */
            <span className="exp-resume exp-resume-unavailable" aria-disabled="true"><span>Résumé file forthcoming</span><ArrowDownToLine size={19} aria-hidden="true" /></span>
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
            <svg viewBox="0 -40 620 650"><path className="exp-organic-underlay" d="M-55 68C11-44 142-30 193 36C245 103 296 3 378 36C466 72 417 173 482 221C553 274 632 335 566 433C502 527 401 455 321 508C217 578 94 533 70 445C45 358-59 397-86 302C-108 225-110 162-55 68Z" /><path d="M-80 95C-14-17 109-12 160 54C212 121 270 15 352 48C440 84 391 186 456 234C527 287 599 348 533 446C469 540 379 464 299 517C195 587 63 535 39 447C14 360-80 406-107 311C-129 234-135 189-80 95Z" fill="currentColor" /></svg>
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
      <div className="exp-toolkit" aria-labelledby="toolkit-title">
        <Reveal className="exp-toolkit-intro">
          <span className="mono exp-eyebrow">A SELECTED TOOLKIT</span>
          <h3 id="toolkit-title">The tools<br />behind<br /><span className="subtle-ink">the work.</span></h3>
          <p>Different problems call for different tools. These are the technologies I use to turn ideas into working systems.</p>
          <Link href="#projects">See them in the work <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <div className="exp-toolkit-frame" aria-hidden="true"><i /><i /><i /></div>
        </Reveal>
        <div className="exp-skills">
          {skillGroups.map((group, index) => <Reveal className="exp-skill-group" key={group.name} delay={index * 0.045}>
            <div className="exp-skill-label"><span className="mono">0{index + 1}</span><h4>{group.name}</h4></div>
            <ul>{group.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
          </Reveal>)}
        </div>
      </div>
    </section>
    <HalftoneTransition /></>
  );
}

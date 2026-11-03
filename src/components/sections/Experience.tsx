import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { experience } from "@/content/experience";
import { DoubleAABatteryIllustration, TradeGlobeIllustration } from "./ExperienceIllustrations";
import "./experience.css";

type ExperienceProps = { resumeHref?: string };

export function Experience({ resumeHref }: ExperienceProps) {
  return <section className="experience section-wrap" id="experience" aria-labelledby="experience-title">
    <div className="section-topline mono"><span>03 / EXPERIENCE</span><span>Professional work.</span></div>
    <div className="experience-layout">
      <header className="experience-intro"><h2 className="section-title" id="experience-title">Built through<br /> experience.</h2>{resumeHref && <a className="quiet-link" href={resumeHref} download>Download résumé <ArrowDownToLine size={20} /></a>}</header>
      <ol className="exp-timeline" aria-label="Professional experience, most recent first">{experience.map((entry) => <li className="exp-entry" key={entry.company}>
        <Reveal><div className="exp-entry-heading"><div><p className="mono exp-date">{entry.dates}</p><h3>{entry.company}</h3><p className="exp-location">{entry.location}</p></div><div className="exp-entry-art" aria-hidden="true">{entry.projectSlug === "tariff-ninja" ? <TradeGlobeIllustration /> : <DoubleAABatteryIllustration />}</div></div>
        <ol className="exp-roles" aria-label={`Roles at ${entry.company}`}>{entry.roles.map((role) => <li key={role.title}><h4>{role.title}</h4><span>{role.dates}</span></li>)}</ol>
        <p className="exp-summary">{entry.summary}</p><p className="exp-impact"><strong>{entry.emphasis.value}</strong><span>{entry.emphasis.label}</span></p>
        <Link className="quiet-link" href={`/projects/${entry.projectSlug}`}>View case study <ArrowUpRight size={20} /></Link></Reveal>
      </li>)}</ol>
    </div>
  </section>;
}

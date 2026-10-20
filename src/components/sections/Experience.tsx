import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { experience } from "@/content/experience";

type ExperienceProps = { resumeHref?: string };

export function Experience({ resumeHref }: ExperienceProps) {
  const confirmedExperience = experience.filter((entry) => entry.confirmed);

  return (
    <section className="experience section-wrap" id="experience" aria-labelledby="experience-title">
      <div className="section-topline">
        <span className="mono">03 / EXPERIENCE</span>
        <span className="mono">THE THINKING BEHIND THE MAKING</span>
      </div>
      <div className="experience-layout">
        <Reveal className="experience-intro">
          <h2 id="experience-title">Built on<br /><span className="subtle-ink">perspective.</span></h2>
          <p>Engineering, product, and direct collaboration.<br />Different lenses. A practical approach.</p>
          {resumeHref ? (
            <a className="resume-pending" href={resumeHref} download><ArrowDown size={16} aria-hidden="true" /> Download résumé</a>
          ) : (
            <span className="resume-pending"><ArrowDown size={16} aria-hidden="true" /> Résumé coming soon</span>
          )}
          <div className="mini-sculpture" aria-hidden="true"><i /><i /><i /></div>
        </Reveal>
        <Reveal className="experience-timeline">
          {confirmedExperience.length ? (
            <ol className="m-0 list-none p-0" aria-label="Professional experience, most recent first">
              {confirmedExperience.map((entry) => (
                <li className="timeline-entry" key={`${entry.company}-${entry.role}-${entry.dates}`}>
                  <span className="timeline-node" aria-hidden="true" />
                  <span className="mono timeline-label">{entry.dates}</span>
                  <h3>{entry.company}</h3>
                  <p>{entry.role}</p>
                  {entry.highlights.length > 0 && (
                    <ul className="mt-5 list-disc space-y-2 pl-4 text-sm leading-7 text-[var(--text-secondary)]">
                      {entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <div className="timeline-entry">
              <span className="timeline-node" aria-hidden="true" />
              <span className="mono timeline-label">THE PROFESSIONAL CHAPTER</span>
              <h3>A little more context.<br />Coming soon.</h3>
              <p>My professional timeline is being prepared, with roles, organizations, and the work behind them.</p>
              <span className="mono timeline-pending">VERIFIED EXPERIENCE &amp; DATES FORTHCOMING</span>
            </div>
          )}
          <a className="timeline-invitation" href="#projects"><span>In the meantime,<br /><strong>get to know the work.</strong></span><ArrowUpRight size={28} strokeWidth={1.3} aria-hidden="true" /></a>
        </Reveal>
      </div>
    </section>
  );
}

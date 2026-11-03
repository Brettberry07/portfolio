import { education, leadership } from "@/content/experience";
import "./education.css";

export function Education() {
  return <section className="education section-wrap support-section" id="education" aria-labelledby="education-title">
    <div className="section-topline mono"><span>04 / EDUCATION & ACTIVITIES</span><span>Learning through doing.</span></div>
    <div className="education-layout"><div><h2 className="section-title-small" id="education-title">Always learning.</h2>
      {education.map((entry) => <div className="education-school" key={entry.institution}><p className="mono">{entry.dates}</p><h3>{entry.institution}</h3><p>{entry.qualification} · {entry.location}</p><p>{entry.detail}</p><p>{entry.note}</p></div>)}
    </div><div><h3 className="education-activities-title">Teams & activities</h3><ul className="education-activities">{leadership.map((entry) => <li key={entry.organization}><div><h4>{entry.organization}</h4><p>{entry.context}</p></div><p>{entry.description}</p></li>)}</ul>
    </div></div>
  </section>;
}

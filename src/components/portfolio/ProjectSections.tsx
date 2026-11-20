import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { artPath, demoPhases, Device, PhoneDisplay, TariffDisplay } from "./DeviceArt";
import { SceneLoader } from "./SceneLoader";

export const featuredProjects = [
  { id: "tariff-ninja", title: "Tariff Ninja", area: "Trade software" },
  { id: "city-of-bentonville-traffic", title: "City of Bentonville Traffic", area: "Civic research" },
  { id: "still-on", title: "Still On", area: "Independent product" },
] as const;

const [tariff, traffic, stillOn] = featuredProjects;

function CaseLink({ slug, title }: { slug: string; title: string }) {
  return (
    <Link className="folio-text-link" prefetch={false} href={`/projects/${slug}`} aria-label={`${title} case study`}>
      Case study <ArrowUpRight aria-hidden="true" size={16} />
    </Link>
  );
}

export function ProjectSections() {
  return (
    <div className="project-run" id="projects" tabIndex={-1}>
      <SceneLoader />
      <section className="folio-project folio-project--tariff" id={tariff.id} aria-labelledby="tariff-title" tabIndex={-1} data-scene="tariff">
        <div className="folio-wrap project-inner">
          <div className="project-copy">
            <p className="folio-label project-kicker">{tariff.area}</p>
            <h2 id="tariff-title">{tariff.title}</h2>
            <p className="project-lede">AI-assisted tariff classification with a specialist in the loop.</p>
            <p>I built a workflow that helps trade teams find and review suggested tariff headings. I went on to lead engineering planning and delivery across the platform.</p>
          </div>
          <figure className="project-visual tariff-visual">
            <Device kind="monitor"><TariffDisplay /></Device>
            <figcaption className="folio-label visual-caption">Illustrative classification <span aria-hidden="true">/</span> Steel bottle → insulated vacuum vessels</figcaption>
          </figure>
          <div className="project-notes tariff-notes">
            <dl className="tariff-proof">
              <div><dt>Data infrastructure</dt><dd><strong>1.5M+</strong> items supported</dd></div>
              <div><dt>My role</dt><dd>Engineer <span aria-hidden="true">→</span><span className="sr-only"> to </span> Lead</dd></div>
            </dl>
            <CaseLink slug={tariff.id} title={tariff.title} />
          </div>
        </div>
      </section>

      <section className="folio-project folio-project--traffic" id={traffic.id} aria-labelledby="traffic-title" tabIndex={-1} data-scene="traffic">
        <div className="folio-wrap project-inner">
          <div className="project-copy traffic-copy">
            <p className="folio-label project-kicker">Highway 102 · Bentonville, AR</p>
            <h2 id="traffic-title">{traffic.title}</h2>
            <ol className="traffic-beats">
              <li><h3>Camera data</h3><p>I cleaned months of Highway 102 camera data.</p></li>
              <li><h3>Model and timing</h3><p>I built and trained the model. We compared allowable signal cycles using Level of Service.</p></li>
              <li className="traffic-results">
                <h3 className="folio-label">Simulated results</h3>
                <dl>
                  <div><dt>less average wait</dt><dd>≈10 sec</dd></div>
                  <div><dt>with improved Level of Service grades</dt><dd>2 sections</dd></div>
                </dl>
              </li>
            </ol>
            <p>We won the pitch competition, presented to Bentonville’s transportation team and mayor, and joined a follow-up panel.</p>
            <CaseLink slug={traffic.id} title={traffic.title} />
          </div>
          <figure className="project-visual traffic-visual">
            <div className="traffic-stills">
              <figure>
                <Image src={`${artPath}/traffic-existing.webp`} width={540} height={338} sizes="(min-width: 901px) 45vw, 90vw" alt="A car waits at the first signal on an illustrated stretch of Highway 102." />
                <figcaption><b>Existing timing</b><span>Car waits at the signal</span></figcaption>
              </figure>
              <figure>
                <Image src={`${artPath}/traffic-proposed.webp`} width={540} height={338} sizes="(min-width: 901px) 45vw, 90vw" alt="The same car clears the intersection under illustrated proposed timing." />
                <figcaption><b>Proposed timing</b><span>Car proceeds sooner</span></figcaption>
              </figure>
            </div>
            <figcaption className="folio-label visual-caption">Illustrated corridor <span aria-hidden="true">/</span> Timing comparison</figcaption>
          </figure>
        </div>
      </section>

      <section className="folio-project folio-project--still" id={stillOn.id} aria-labelledby="still-title" tabIndex={-1} data-scene="still">
        <div className="folio-wrap project-inner">
          <div className="project-copy still-copy">
            <div className="project-summary">
              <p className="folio-label project-kicker">{stillOn.area} · MVP</p>
              <h2 id="still-title">{stillOn.title}</h2>
              <p className="project-lede">A simpler way to confirm or reschedule plans.</p>
              <p>I’m building a mobile app for the moment a plan might change. One reminder lets people check in, see who’s coming, or suggest a different time.</p>
            </div>
            <fieldset className="meeting-demo">
              <legend className="folio-label">Try the meeting flow</legend>
              <div className="meeting-options">
                {demoPhases.map(({ id, label }) => (
                  <label key={id}>
                    <input type="radio" name="meeting-phase" value={id} defaultChecked={id === "reminder"} aria-describedby={`meeting-${id}`} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
              {demoPhases.map(({ id, description }) => (
                <p key={id} id={`meeting-${id}`} className={`demo-description demo-description--${id}`}>{description}</p>
              ))}
            </fieldset>
            <div className="still-case-link"><CaseLink slug={stillOn.id} title={stillOn.title} /></div>
          </div>
          <figure className="project-visual phone-visual">
            <Device kind="handheld"><PhoneDisplay /></Device>
            <figcaption className="folio-label visual-caption">Illustrative product demo</figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectArtwork } from "@/components/projects/ProjectArtwork";
import { getProjectBySlug, projects } from "@/content/projects";
import "./case-studies.css";

type CaseStudyProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return {
    title: project ? project.title : "Project not found",
    description: project?.summary ?? `Explore ${project?.title ?? "selected work"} from Brett Berry. Case study details coming soon.`,
  };
}

export default async function CaseStudy({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((entry) => entry.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="case-page" id="top">
      <a className="case-skip" href="#case-main">Skip to case study</a>
      <header className="case-header">
        <Link className="case-brand" href="/" aria-label="Brett Berry home">BRETT BERRY<span aria-hidden="true">↗</span></Link>
        <nav className="case-nav" aria-label="Main navigation">
          <Link href="/#home">Home</Link>
          <Link href="/#projects" aria-current="page">Projects</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#contact">Contact <ArrowUpRight size={12} aria-hidden="true" /></Link>
        </nav>
      </header>

      <main id="case-main">
        <section className="case-hero" aria-labelledby="case-title">
          <Link className="case-back" href="/#projects"><ArrowLeft size={15} aria-hidden="true" /> Back to selected work</Link>
          <div className="case-hero-meta">
            <span className="case-label">SELECTED WORK / {project.id}</span>
            <span className="case-label">{project.category ?? "PROJECT ARCHIVE"}</span>
          </div>
          <Reveal className="case-title-row">
            <h1 id="case-title">{project.title}<span className="case-title-dot">.</span></h1>
            <span className="case-large-index" aria-hidden="true">{project.id}</span>
          </Reveal>
          <div className="case-hero-bottom">
            <p>{project.summary ?? "Case study details coming soon."}</p>
            <a className="case-read" href="#overview">Explore the project <ArrowDown size={17} aria-hidden="true" /></a>
          </div>
        </section>

        <figure className="case-cover">
          {project.heroImage ? (
            <div className="case-real-visual"><Image src={project.heroImage} alt={`${project.title} project visual`} fill sizes="(max-width: 600px) 92vw, 90vw" priority /></div>
          ) : <ProjectArtwork project={project} variant="detail" accessible />}
          <figcaption><span>{project.heroImage ? "PROJECT VISUAL" : "EDITORIAL ILLUSTRATION"} / {project.id}</span><span>{project.heroImage ? project.title : "Concept artwork · not a product screenshot"}</span></figcaption>
        </figure>

        {project.highlights?.length ? <Reveal className="case-highlights">{project.highlights.map((highlight, highlightIndex) => <div key={highlight.label}><span className="case-label">0{highlightIndex + 1} / PROJECT FOCUS</span><strong>{highlight.value}</strong><p>{highlight.label}</p></div>)}</Reveal> : null}

        <section className="case-section case-overview" id="overview" aria-labelledby="overview-title">
          <div className="case-section-marker"><span>01 / OVERVIEW</span><ArrowDown size={16} aria-hidden="true" /></div>
          <Reveal className="case-section-body">
            <h2 id="overview-title">The work,<br />in context.</h2>
            <p className="case-lead">{project.overview ?? "The full story of this project will be shared here, from the initial context to the decisions behind the work."}</p>
            <dl className="case-facts">
              <div><dt>ROLE</dt><dd>{project.role ?? "Details forthcoming"}</dd></div>
              <div><dt>PROJECT TYPE</dt><dd>{project.category ?? "Details forthcoming"}</dd></div>
              {project.period ? <div><dt>WHEN</dt><dd>{project.period}</dd></div> : null}
              <div><dt>CONTEXT</dt><dd className="case-status"><span aria-hidden="true" />{project.stage ?? "Project in development"}</dd></div>
            </dl>
          </Reveal>
        </section>

        <section className="case-section" aria-labelledby="problem-title">
          <div className="case-section-marker"><span>02 / THE PROBLEM</span></div>
          <Reveal className="case-section-body case-text-body">
            <h2 id="problem-title">Where it began.</h2>
            <p>{project.problem ?? "The problem, audience, and project constraints will be documented in the full case study."}</p>
          </Reveal>
        </section>

        <section className="case-section" aria-labelledby="approach-title">
          <div className="case-section-marker"><span>03 / ROLE & APPROACH</span></div>
          <Reveal className="case-section-body case-text-body">
            <h2 id="approach-title">Decisions that<br />shaped the work.</h2>
            <p>{project.approach ?? "Brett’s contribution, collaboration, and key design and engineering decisions will be shared here."}</p>
          </Reveal>
        </section>

        <section className="case-solution" aria-labelledby="solution-title">
          <div className="case-solution-top"><span className="case-label">04 / THE SOLUTION</span><span className="case-label">{project.id} — {String(projects.length).padStart(2, "0")}</span></div>
          <h2 id="solution-title">From the idea<br />to the actual.</h2>
          <p>{project.solution ?? "The build, key features, and project visuals will appear in the complete case study."}</p>
          {project.workflow?.length ? <Reveal><ol className="case-workflow" aria-label="Project approach">{project.workflow.map((step, stepIndex) => <li key={step.title}><span className="case-label">0{stepIndex + 1}</span><h3>{step.title}<ArrowUpRight size={22} aria-hidden="true" /></h3><p>{step.description}</p></li>)}</ol></Reveal> : null}
          <span className="case-solution-caption">A closer look at the thinking behind the work.</span>
        </section>

        <section className="case-section" aria-labelledby="outcomes-title">
          <div className="case-section-marker"><span>05 / OUTCOMES & LEARNING</span></div>
          <Reveal className="case-section-body case-text-body">
            <h2 id="outcomes-title">What came<br />out of it.</h2>
            <p>{project.results ?? "Verified outcomes, impact, and lessons learned will be included with the full project story."}</p>
          </Reveal>
        </section>

        <section className="case-section case-tools-section" aria-labelledby="tools-title">
          <div className="case-section-marker"><span>06 / TOOLS & LINKS</span></div>
          <Reveal className="case-section-body case-text-body">
            <h2 id="tools-title">Behind the build.</h2>
            {project.technologies.length ? (
              <ul className="case-tools" aria-label="Technologies used">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
            ) : <p>Tools and technologies will be added with the full case study.</p>}
            {project.toolsNote ? <p className="case-tools-note">{project.toolsNote}</p> : null}
            {project.links?.length ? <ul className="case-external-links">{project.links.map((link) => <li key={link.href}><a href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={18} aria-hidden="true" /></a></li>)}</ul> : null}
          </Reveal>
        </section>

        {project.contentNote ? <aside className="case-content-note"><span className="case-label">A NOTE ON THE VISUALS & SCOPE</span><p>{project.contentNote}</p></aside> : null}

        <nav className="case-project-navigation" aria-label="More projects">
          <Link className="case-previous" href={`/projects/${previous.slug}`}><span className="case-label"><ArrowLeft size={14} aria-hidden="true" /> PREVIOUS / {previous.id}</span><span>{previous.title}</span></Link>
          <Link className="case-next" href={`/projects/${next.slug}`}><span className="case-label">NEXT PROJECT / {next.id} <ArrowRight size={14} aria-hidden="true" /></span><span>{next.title}</span></Link>
        </nav>

        <section className="case-contact" aria-labelledby="case-contact-title">
          <span className="case-label">HAVE SOMETHING IN MIND?</span>
          <Link href="/#contact" className="case-contact-link"><h2 id="case-contact-title">Let’s make<br />what’s next.</h2><span className="case-contact-arrow"><ArrowUpRight aria-hidden="true" /></span></Link>
          <div className="case-contact-footer"><span>BRETT BERRY © {new Date().getFullYear()}</span><a href="#top">BACK TO TOP ↑</a></div>
        </section>
      </main>
    </div>
  );
}

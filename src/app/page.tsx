import type { Metadata } from "next";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import { CloudPoster } from "@/components/portfolio/DeviceArt";
import { GlyphWake } from "@/components/portfolio/GlyphWake";
import { featuredProjects, ProjectSections } from "@/components/portfolio/ProjectSections";
import { Button } from "@/components/ui/button";
import { education } from "@/content/experience";
import { siteAssets, siteUrl } from "@/content/site";
import "./portfolio.css";

export const metadata: Metadata = { alternates: { canonical: siteUrl } };

export default function Home() {
  const { resumeHref, publicEmail, socialLinks } = siteAssets;
  const emailHref = publicEmail ? `mailto:${publicEmail}` : undefined;

  return (
    <div className="portfolio" id="home">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="folio-header">
        <div className="folio-wrap folio-header-inner">
          <a className="folio-wordmark" href="#home" aria-label="Brett Berry home">bb<span>.</span></a>
          <nav className="folio-nav" aria-label="Main navigation">
            <a href="#projects">Work</a>
            {resumeHref && <a href={resumeHref}>Résumé <ArrowUpRight size={14} aria-hidden="true" /></a>}
            <Button asChild variant="outline" size="compact"><a href="#contact">Contact</a></Button>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="folio-hero" aria-labelledby="hero-title">
          <div className="folio-wrap hero-inner">
            <div className="hero-introduction">
              <p className="folio-label hero-role"><span aria-hidden="true" />Software Engineer</p>
              <h1 id="hero-title">Brett<br />Berry<span aria-hidden="true">.</span></h1>
              <p className="hero-intro">I like taking open-ended problems and turning them into software people can use.</p>
              <div className="hero-actions">
                <Button asChild><a href="#projects">View work <ArrowDown aria-hidden="true" /></a></Button>
                {resumeHref && <Button asChild variant="outline"><a href={resumeHref}>Résumé <ArrowUpRight aria-hidden="true" /></a></Button>}
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="hero-reticle"><span /><span /><span /><span /></div>
              <div className="glyph-volume">
                <CloudPoster priority />
                <GlyphWake />
              </div>
            </div>
          </div>
          <nav className="folio-wrap work-index" aria-label="Featured work">
            <span className="folio-label">Featured work</span>
            {featuredProjects.map(({ id, title }) => (
              <a key={id} href={`#${id}`}>{title}<ArrowUpRight size={16} aria-hidden="true" /></a>
            ))}
          </nav>
        </section>

        <ProjectSections />

        <section className="folio-wrap about-bridge" id="experience" aria-labelledby="about-title" tabIndex={-1}>
          <h2 id="about-title" className="folio-label">About &amp; experience</h2>
          <p>I study at the {education[0].institution}. I’m drawn to work that starts with a conversation and ends with something people can use.</p>
        </section>

        <section className="folio-contact" id="contact" aria-labelledby="contact-title" tabIndex={-1}>
          <div className="contact-volume" aria-hidden="true"><CloudPoster /></div>
          <div className="folio-wrap contact-inner">
            <div className="contact-card">
              <div>
                <p className="folio-label project-kicker">Contact</p>
                <h2 id="contact-title">Let’s talk.</h2>
                <p>Want to talk through how I built something here?</p>
              </div>
              <div className="contact-actions">
                {emailHref && <Button asChild><a href={emailHref}>Email me <ArrowUpRight aria-hidden="true" /></a></Button>}
                <ul aria-label="Résumé and profiles">
                  {resumeHref && <li><a href={resumeHref}>Résumé <ArrowUpRight size={14} aria-hidden="true" /></a></li>}
                  {socialLinks.map(({ label, href }) => <li key={href}><a href={href}>{label} <ArrowUpRight size={14} aria-hidden="true" /></a></li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="folio-wrap folio-footer">
        <a href="#home" className="folio-footer-name">Brett Berry</a>
        <a href="#home" className="folio-text-link">Back to top <ArrowUp size={15} aria-hidden="true" /></a>
      </footer>
    </div>
  );
}

import { siteAssets } from "@/content/site";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Reveal } from "@/components/motion/Reveal";
import { HeroName } from "@/components/motion/HeroName";
import { About } from "@/components/sections/About";
import { HeroSculpture } from "@/components/three/HeroSculpture";
import { ProjectSelector } from "@/components/projects/ProjectSelector";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Toolkit } from "@/components/sections/Toolkit";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />
      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <header className="masthead page-gutter">
            <a href="#home" className="wordmark" aria-label="Brett Berry home">bb.</a>
          </header>
          <div className="hero-heading page-gutter">
            <HeroName />
          </div>
          <HeroSculpture />
          <div className="hero-copy page-gutter">
            <Reveal delay={0.16}>
              <p className="hero-tagline">Building<br /> what&apos;s next.</p>
              <p className="hero-description">I build web applications, data systems, and tools with the people who use them.</p>
              <a className="text-link" href="#projects">Explore the work <span className="round-arrow"><ArrowUpRight size={19} /></span></a>
            </Reveal>
          </div>
          <p className="hero-credits mono"><a href="https://sketchfab.com/3d-models/complex-geometric-frames-and-curved-lines-model-287051b7796d4a94b5970f79cd4fc8e5">GEOMETRIC FRAMES BY OMER</a> · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> · ADAPTED</p>
          <div className="hero-bottom page-gutter"><a className="mono scroll-cue" href="#projects"><ArrowDown size={14} /> SCROLL TO EXPLORE</a></div>
        </section>

        <ProjectSelector />
        <About />

        <Experience resumeHref={siteAssets.resumeHref} />
        <Education />
        <Toolkit />
        <Contact publicEmail={siteAssets.publicEmail} socialLinks={siteAssets.socialLinks} enabled={Boolean(process.env.RESEND_API_KEY?.trim() && process.env.CONTACT_TO_EMAIL?.trim() && process.env.CONTACT_FROM_EMAIL?.trim())} />
      </main>
      <footer className="site-footer"><div className="footer-inner container"><a href="#home" className="footer-name">BRETT BERRY</a><span className="mono">© 2026 · BUILDING WHAT&apos;S NEXT.</span><div className="footer-profiles"><a href={`mailto:${siteAssets.publicEmail}`}>Email</a>{siteAssets.socialLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</div><a href="#home" className="mono back-top">BACK TO TOP <ArrowUpRight size={16} /></a></div><p className="footer-credits mono container"><a href="https://sketchfab.com/3d-models/complex-geometric-frames-and-curved-lines-model-287051b7796d4a94b5970f79cd4fc8e5">GEOMETRIC FRAMES BY OMER</a> · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> · ADAPTED</p></footer>
    </>
  );
}

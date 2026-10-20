import { siteAssets } from "@/content/site";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Reveal } from "@/components/motion/Reveal";
import { HeroName } from "@/components/motion/HeroName";
import { About } from "@/components/sections/About";
import { HeroSculpture } from "@/components/three/HeroSculpture";
import { ProjectSelector } from "@/components/projects/ProjectSelector";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navigation />
      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <header className="masthead page-gutter">
            <a href="#home" className="wordmark" aria-label="Brett Berry home">bb<span>✳</span></a>
            <span className="mono masthead-note">INDEPENDENT MIND.<br />MULTIDISCIPLINARY BUILDER.</span>
            <span className="mono edition">PORTFOLIO — 2026</span>
          </header>
          <div className="hero-heading page-gutter">
            <div className="hero-kicker mono"><span className="status-dot" /> ENGINEERING × PRODUCT × POSSIBILITY</div>
            <HeroName />
          </div>
          <div className="hero-grid" aria-hidden="true"><span>+</span><span>+</span><span>+</span><span>+</span></div>
          <HeroSculpture />
          <div className="hero-copy page-gutter">
            <Reveal>
              <p className="hero-tagline">Building<br /> what&apos;s <span className="next-word">next<svg viewBox="0 0 220 20" aria-hidden="true"><path d="M3 13C58 2 134 4 214 9" /></svg></span>.</p>
              <p className="hero-description">Software, product, and systems.<br />Built around real-world problems.</p>
              <a className="text-link" href="#projects">Explore the work <span className="round-arrow"><ArrowUpRight size={19} /></span></a>
            </Reveal>
          </div>
          <div className="sculpture-caption mono"><span className="blue-square" /> FORM / FUNCTION / FORWARD</div>
          <p className="hero-credits mono"><a href="https://sketchfab.com/3d-models/complex-geometric-frames-and-curved-lines-model-287051b7796d4a94b5970f79cd4fc8e5">GEOMETRIC FRAMES BY OMER</a> · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> · ADAPTED</p>
          <div className="hero-bottom page-gutter"><a className="mono scroll-cue" href="#about"><ArrowDown size={14} /> SCROLL TO EXPLORE</a><span className="mono">A DIFFERENT PERSPECTIVE.</span><span className="mono">01 — 05</span></div>
        </section>

        <About />

        <ProjectSelector />

        <Experience resumeHref={siteAssets.resumeHref} />
        <Contact publicEmail={siteAssets.publicEmail} socialLinks={siteAssets.socialLinks} enabled={Boolean(process.env.RESEND_API_KEY?.trim() && process.env.CONTACT_TO_EMAIL?.trim() && process.env.CONTACT_FROM_EMAIL?.trim())} />
      </main>
      <footer className="site-footer page-gutter"><a href="#home" className="footer-name">BRETT BERRY</a><span className="mono">© 2026 · BUILT WITH INTENTION.</span><div className="footer-profiles"><a href="mailto:brettberry07@gmail.com">Email</a><a href="https://github.com/Brettberry07">GitHub</a><a href="https://www.linkedin.com/in/brett-berry-a81b29329/">LinkedIn</a></div><a href="#home" className="mono back-top">BACK TO TOP <ArrowUpRight size={15} /></a></footer>
    </>
  );
}

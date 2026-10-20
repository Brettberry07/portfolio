import Image from "next/image";
import { siteAssets } from "@/content/site";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Reveal } from "@/components/motion/Reveal";
import { HeroSculpture } from "@/components/three/HeroSculpture";
import { ProjectSelector } from "@/components/projects/ProjectSelector";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

const capabilities = ["Software engineering", "Product development", "Systems & automation", "Client collaboration"];

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
            <h1 id="hero-title">BRETT BERRY<span className="name-period">.</span></h1>
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
          <div className="hero-bottom page-gutter"><a className="mono scroll-cue" href="#about"><ArrowDown size={14} /> SCROLL TO EXPLORE</a><span className="mono">A DIFFERENT PERSPECTIVE.</span><span className="mono">01 — 05</span></div>
        </section>

        <section className="about section-wrap" id="about" aria-labelledby="about-title">
          <div className="section-topline"><span className="mono">01 / A LITTLE CONTEXT</span><span className="mono">THE PERSON BEHIND THE PROJECTS</span></div>
          <div className="about-layout">
            <Reveal className="portrait-composition">
              <div className="portrait-placeholder" role={siteAssets.portrait ? undefined : "img"} aria-label={siteAssets.portrait ? undefined : "Reserved for Brett Berry’s portrait. Photograph coming soon."}>
                {siteAssets.portrait ? <Image src={siteAssets.portrait.src} alt={siteAssets.portrait.alt} fill sizes="(max-width:600px) 80vw, 40vw" className="portrait-photo" /> : <>
                <div className="portrait-arch"><span>bb.</span></div>
                <div className="portrait-mark mono">A WORK IN<br />PERSPECTIVE.</div>
                <Plus className="portrait-plus" strokeWidth={1} aria-hidden="true" />
                <span className="portrait-status mono">PORTRAIT FORTHCOMING</span></>}
              </div>
              <span className="portrait-caption mono">BRETT BERRY / ALWAYS BUILDING</span>
              <svg className="about-organic" viewBox="0 0 130 145" aria-hidden="true"><path d="M54 5C84-11 122 14 118 42C114 67 141 96 115 124C90 150 53 142 38 116C23 90-9 87 4 54C13 31 28 20 54 5Z" fill="currentColor" /></svg>
            </Reveal>
            <Reveal className="about-copy" delay={0.06}>
              <h2 id="about-title">Curiosity connects<br />the dots.<br /><span className="subtle-ink">I build what&apos;s<br className="desktop-break" /> between them.</span></h2>
              <p>I&apos;m Brett, a multidisciplinary builder working at the intersection of engineering, product, and practical problem-solving.</p>
              <p>My approach starts with people: understanding the problem, working directly with clients, and connecting ideas across domains to build something useful.</p>
              <a className="quiet-link" href="#contact">Good things start with a conversation <ArrowUpRight size={17} /></a>
            </Reveal>
          </div>
          <div className="capabilities" aria-label="Areas of focus">{capabilities.map((item, index) => <div key={item}><span className="mono">0{index + 1}</span><span>{item}</span><ArrowDownRight size={20} strokeWidth={1.3} aria-hidden="true" /></div>)}</div>
        </section>

        <ProjectSelector />

        <Experience resumeHref={siteAssets.resumeHref} />
        <Contact publicEmail={siteAssets.publicEmail} socialLinks={siteAssets.socialLinks} enabled={Boolean(process.env.RESEND_API_KEY?.trim() && process.env.CONTACT_TO_EMAIL?.trim() && process.env.CONTACT_FROM_EMAIL?.trim())} />
      </main>
      <footer className="site-footer page-gutter"><a href="#home" className="footer-name">BRETT BERRY</a><span className="mono">© 2026 · BUILT WITH INTENTION.</span><a href="#home" className="mono back-top">BACK TO TOP <ArrowUpRight size={15} /></a></footer>
    </>
  );
}

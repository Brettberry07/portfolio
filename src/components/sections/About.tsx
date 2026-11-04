import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteAssets } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { WaysIWork } from "./WaysIWork";
import "./about.css";

export function About() {
  return <section className="about section-wrap" id="about" aria-labelledby="about-title">
    <div className="section-topline mono"><span>02 / ABOUT & APPROACH</span><span>Understand first. Then build.</span></div>
    <div className={`about-layout${siteAssets.portrait ? " has-portrait" : ""}`}>
      {siteAssets.portrait && <figure className="about-portrait"><Image src={siteAssets.portrait.src} alt={siteAssets.portrait.alt} width={480} height={560} sizes="(max-width: 600px) calc(100vw - 48px), 30vw" /></figure>}
      <Reveal><h2 className="section-title" id="about-title">Software, shaped<br className="desktop-break" /> by real problems.</h2></Reveal>
      <Reveal className="about-copy"><p>I&apos;m Brett, a Computer Science student at the University of Arkansas. I work with clients to turn research and requirements into useful software—from trade infrastructure to battery analytics.</p><a className="quiet-link" href={`mailto:${siteAssets.publicEmail}`}>Get in touch <ArrowUpRight size={20} /></a></Reveal>
    </div>
    <WaysIWork />
  </section>;
}

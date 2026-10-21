"use client";

import { revealTransition, revealVariants, useRevealViewport } from "@/components/motion/revealViewport";

import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { siteAssets } from "@/content/site";
import { Reveal, RevealSequence } from "@/components/motion/Reveal";
import { WaysIWork } from "./WaysIWork";
import "./about.css";

export function About() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const viewport = useRevealViewport();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const organicY = useTransform(scrollYProgress, [0, 1], [25, -35]);
  const organicRotate = useTransform(scrollYProgress, [0, 1], [-24, -8]);

  return (
    <section className="about about-refined section-wrap" id="about" aria-labelledby="about-title" ref={section}>
      <div className="section-topline">
        <span className="mono">01 / A LITTLE CONTEXT</span>
        <span className="mono">THE PERSON BEHIND THE PROJECTS</span>
      </div>

      <div className="about-layout">
        <div className="portrait-composition">
          <div className="portrait-architecture" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none">
              <path d="M22 63 101 20l77 43v86l-79 43-77-43V63Z M22 63l77 43 79-43 M99 106v86 M62 42l77 43v85 M62 85l77-43 M62 85v85" />
            </svg>
          </div>
          <motion.div
            className="portrait-reveal entrance"
            initial={{ scale: 0.985 }}
            animate={reducedMotion ? { scale: 1 } : undefined}
            whileInView={{ scale: 1 }}
            viewport={viewport}
            transition={revealTransition}
          >
            <div className="portrait-placeholder" role={siteAssets.portrait ? undefined : "img"} aria-label={siteAssets.portrait ? undefined : "Reserved for Brett Berry’s portrait. Photograph coming soon."}>
              {siteAssets.portrait ? (
                <Image src={siteAssets.portrait.src} alt={siteAssets.portrait.alt} fill sizes="(max-width:600px) 80vw, 40vw" className="portrait-photo" />
              ) : (
                <>
                  <div className="portrait-arch"><span>bb.</span></div>
                  <div className="portrait-mark mono">A WORK IN <br />PERSPECTIVE.</div>
                  <Plus className="portrait-plus" strokeWidth={1} aria-hidden="true" />
                  <span className="portrait-status mono">PORTRAIT FORTHCOMING</span>
                </>
              )}
            </div>
          </motion.div>
          <span className="portrait-caption mono">BRETT BERRY / ALWAYS BUILDING</span>
          <motion.div className="about-organic" aria-hidden="true" style={{ y: organicY, rotate: organicRotate }}>
            <svg viewBox="-5 -13 150 165">
              <path className="about-organic-layer" d="M54 5C84-11 122 14 118 42C114 67 141 96 115 124C90 150 53 142 38 116C23 90-9 87 4 54C13 31 28 20 54 5Z" transform="translate(12 -9)" />
              <path d="M54 5C84-11 122 14 118 42C114 67 141 96 115 124C90 150 53 142 38 116C23 90-9 87 4 54C13 31 28 20 54 5Z" fill="currentColor" />
            </svg>
          </motion.div>
        </div>

        <div className="about-copy">
          <RevealSequence>
          <h2 id="about-title">
            <span className="about-heading-line"><motion.span className="entrance" variants={revealVariants} transition={revealTransition}>Curiosity connects <br />the dots.</motion.span></span>
            <span className="about-heading-line subtle-ink"><motion.span className="entrance" variants={revealVariants} transition={revealTransition}>I build what&apos;s <br />between them.</motion.span></span>
          </h2>
          </RevealSequence>
          <Reveal className="about-prose">
            <p>I&apos;m Brett, a computer science student and multidisciplinary builder working at the intersection of software, product development, and practical problem-solving.</p>
            <p>I take ideas from early conversations through research, design, and engineering to something people can actually use. My work spans large-scale data systems, AI applications, robotics, battery analytics, and operational improvements.</p>
            <p>I&apos;m most interested in the problem behind a request: working directly with the people experiencing it, and building something that makes a measurable difference.</p>
            <a className="quiet-link" href="#contact">Good things start with a conversation <ArrowUpRight size={17} /></a>
          </Reveal>
        </div>
      </div>

      <WaysIWork />
    </section>
  );
}

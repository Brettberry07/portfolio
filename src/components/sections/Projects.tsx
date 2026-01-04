"use client";

import { motion, PanInfo, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { fadeInLeft, viewportSettings } from "@/lib/motion";
import Image from "next/image";

interface ProjectHighlight {
  text: string;
}

interface Project {
  id: number;
  name: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  headline: string;
  headlineHighlights: string[];
  fullDescription: string;
  highlights: ProjectHighlight[];
  image: string;
  link?: string;
  showExternalLink?: boolean;
}

const projects: Project[] = [
  {
    id: 0,
    name: "Querry Berry",
    title: "Querry Berry",
    description: "Custom search engine built with Next.js, Prisma and PostgreSQL. Implements a BM25+ ranking pipeline, a custom tokenizer, and a high-throughput web scraper/indexer.",
    tags: ["Next.js", "Prisma", "TypeScript", "PostgreSQL", "BM25+", "Node.js", "Python"],
    color: "#7373E0",
    headline: "Built a production-ready search engine from the ground up with custom indexing and ranking.",
    headlineHighlights: ["BM25+ ranking", "custom tokenizer", "multi-worker scraper"],
    fullDescription: "Querry Berry is a full-stack search engine: Next.js + TypeScript frontend, Prisma + PostgreSQL backend, and a custom search API that exposes high-performance BM25+ queries. I wrote a tokenizer optimized for NDJSON ingestion (CommonJS), and a multi-async-worker web scraper in Python that respects robots.txt, tracks domains/timeout, and seeded from 200+ start domains — ultimately collecting 500K+ pages for the index.",
    highlights: [
      { text: "Implemented BM25+ ranking and custom ranking signals in the query API to improve recall and precision for short queries." },
      { text: "Authored a lightweight tokenizer in CommonJS that emits NDJSON for fast streaming ingestion into PostgreSQL." },
      { text: "Built a multithreaded/multi-async-worker Python scraper that enforces robots.txt, domain visit tracking and per-domain timeouts; started from a 200+ domain seed and collected 500K+ pages." },
      { text: "Designed the Next.js frontend in TypeScript + TailwindCSS with fast client-side querying UX and server-side ranking endpoints." },
      { text: "Exposed a custom search API that supports paging, filters, and relevance tuning for downstream apps." },
    ],
    image: "/querry-berry-image.png",
    link: "https://github.com/Brettberry07/querry-berry",
    showExternalLink: true,
  },
  {
    id: 1,
    name: "Context Message",
    title: "Context Message",
    description: "Realtime, context-aware messaging app with a zoomable 'mind map' view of conversation contexts, end-to-end encryption, and session-based JWT auth.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "NestJS", "WebSocket", "E2E Encryption", "JWT"],
    color: "#4CAF50",
    headline: "Realtime messaging rethought — zoom out to see the conversation's context map.",
    headlineHighlights: ["context-aware", "end-to-end encrypted", "mind map UI"],
    fullDescription: "Context Message is a Next.js + Tailwind frontend with a NestJS backend that enables realtime chat plus 'context zoom' — a mind-map visualization showing topics and contexts you’ve discussed. Messages are end-to-end encrypted, sessions use JWT-based auth, and the app maintains context metadata so users can step back and navigate conversations at the topic level rather than only by message stream.",
    highlights: [
      { text: "Frontend built with Next.js + TypeScript + Tailwind; interactive mind-map UI that visualizes conversation contexts and how topics connect over time." },
      { text: "Backend implemented in NestJS with WebSocket-based realtime messaging and JWT session authentication." },
      { text: "End-to-end encryption across messages; keys are managed client-side to ensure message privacy." },
      { text: "Context-awareness pipeline stores topic metadata and allows users to 'zoom out' from a thread into a navigable graph of past contexts." },
      { text: "Designed message schema so contexts, tags, and timestamps are queryable for fast context loading and UI rendering." },
    ],
    image: "/context-message.png",
  },
  {
    id: 2,
    name: "COB Traffic",
    title: "COB Traffic",
    description: "Traffic optimization and timing-plan generator using PyTorch. Produces HCM2010-compliant timing plans and adaptive adjustments based on event and live-count data.",
    tags: ["Python", "PyTorch", "Jupyter", "Traffic Engineering", "HCM2010"],
    color: "#FF6B6B",
    headline: "Machine learning that generates HCM2010-compliant signal timing plans and adapts to city events.",
    headlineHighlights: ["HCM2010 compliance", "event-aware adjustments", "presented to city officials"],
    fullDescription: "COB Traffic is a machine learning pipeline (PyTorch) that ingests traffic counts and timing-plan/value analyses and outputs optimized signal timing plans for different periods. I built multiple Jupyter notebooks analyzing Bentonville, AR data, produced an interpretable model that fits HCM2010 standards, and demonstrated the results to the mayor and city traffic engineers as part of a competition — sharing the model and findings with the city for real-world use.",
    highlights: [
      { text: "Developed a PyTorch model that recommends optimized timing plans (phases, offsets, splits) and conforms to HCM2010 methodologies." },
      { text: "Created two Jupyter notebooks that document the data pipeline, analysis, and results for Bentonville, AR traffic — used in a city-level presentation." },
      { text: "Model includes light adaptive logic to nudge timings based on real-time traffic counts and scheduled/unscheduled events (e.g., concerts, game days)." },
      { text: "Presented findings to city officials and traffic engineers; shared code, notebooks, and models with the municipality after winning the competition." },
      { text: "Combined domain knowledge (traffic operations) with ML to produce interpretable, deployable timing plans." },
    ],
    image: "/COB-traffic.png",
    link: "https://github.com/Brettberry07/COB-Traffic-Project",
    showExternalLink: true,
  },
  {
    id: 3,
    name: "BLk0ut",
    title: "BLk0ut",
    description: "VEX V5 competition robot built with PROS (C++). Features odometry, PID, and a custom autonomous path editor built in ElectronJS.",
    tags: ["C++", "PROS", "VEX V5", "Electron", "Monte Carlo Localization", "PID"],
    color: "#FFB347",
    headline: "Competition-grade VEX robot with full odometry, Monte Carlo localization and a custom path editor.",
    headlineHighlights: ["odometry + MCL", "pure-pursuit path follower", "competition awards"],
    fullDescription: "BLk0ut is a VEX V5 robot I programmed in C++ using the PROS framework. It tracks position with two tracking wheels and an IMU, uses two distance sensors for obstacle awareness, and runs Monte Carlo Localization against the field map. Motion control uses PID loops and a custom path follower (pure pursuit). I also built an ElectronJS desktop tool to design Bezier-based paths, attach tasks to path segments (e.g., intake active from 40–60%), and export those paths to the robot. The robot won Innovation and other design awards and qualified for higher-level competition.",
    highlights: [
      { text: "Embedded control and firmware written in C++ with PROS; precise closed-loop control with tuned PID controllers." },
      { text: "Full-field odometry using dual tracking wheels + IMU and Monte Carlo Localization for robust pose estimation on the match field." },
      { text: "Custom path follower implementing pure-pursuit for smooth path tracking and heading control." },
      { text: "ElectronJS path-design tool: draw Bezier curves, assign actions to path segments, and export path+task metadata to the robot." },
      { text: "Competitive outcomes: won Innovation (and previous design/innovation awards), qualifying for worlds level competitions." },
    ],
    image: "/BLk0ut-pather.png",
    link: "https://github.com/Brettberry07/RoboticsClub_BLACKOUT",
    showExternalLink: true,
  },
  {
    id: 4,
    name: "Fig",
    title: "Fig",
    description: "Custom programming language implemented in Rust. Includes lexer, parser, AST, evaluator, strong typing, an interpreter, a VSCode syntax extension, and a project CLI.",
    tags: ["Rust", "Language Design", "Compiler", "Interpreter", "VSCode Extension", "CLI"],
    color: "#9B59B6",
    headline: "Designed and implemented a strongly-typed interpreted language from lexer to editor tooling.",
    headlineHighlights: ["custom language", "VSCode syntax", "Rust implementation"],
    fullDescription: "Fig is a custom programming language I built in Rust: lexer, parser, AST, evaluator, type system and interpreter. The language supports standard control flow (if/else if/else), for/while loops, nested scopes, functions, variable reassignment, arithmetic (PEMDAS), print statements, and an escape hatch that allows embedding or calling raw Rust code. I also created a VSCode syntax-highlighting extension and a CLI (`fig create <project>` and `fig run`) to scaffold and run Fig projects.",
    highlights: [
      { text: "Implemented the lexer, parser and AST in Rust, plus a runtime evaluator and a static/strong typing pass." },
      { text: "Language features: arithmetic with operator precedence (PEMDAS), variable scope, functions, for/while loops, nested control flow and print I/O." },
      { text: "Built a VSCode extension for syntax highlighting and basic snippets to improve DX for Fig developers." },
      { text: "CLI tooling: `fig create new` templates, `fig run` interpreter runner, and a simple project structure generator." },
      { text: "Designed a Rust interoperability layer that exposes raw Rust snippets from Fig code for performance-critical operations." },
    ],
    image: "/fig-example.png",
    link: "https://github.com/Brettberry07/fig-lang",
    showExternalLink: true,
  },
  {
    id: 5,
    name: "Portfolio Site",
    title: "Portfolio Website",
    description:
      "Responsive portfolio website built with Next.js, TypeScript, and TailwindCSS. Features Lenis smooth scrolling and Framer Motion animations, with the full prototype designed in Figma.",
    tags: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "Lenis",
      "Figma",
      "Responsive",
    ],
    color: "#2D6CDF",
    headline:
      "Designed in Figma, built in Next.js — a responsive portfolio with smooth scrolling and motion-driven storytelling.",
    headlineHighlights: ["Figma", "Next.js", "responsive", "Lenis", "Framer Motion"],
    fullDescription:
      "This portfolio website was built as a polished, responsive experience that works across mobile and desktop. I designed the full layout and interactions in Figma first, then implemented it using Next.js (App Router) with TypeScript and TailwindCSS. Smooth scrolling is handled via a Lenis provider, and section transitions + UI motion are implemented with Framer Motion for consistent, performant animations.",
    highlights: [
      {
        text: "Designed and prototyped the full site in Figma before implementation to lock in layout, spacing, and interaction details.",
      },
      {
        text: "Implemented with Next.js + TypeScript and styled with TailwindCSS for a clean, maintainable UI system.",
      },
      {
        text: "Mobile-first responsive layout that adapts cleanly from small screens to desktop without changing content.",
      },
      {
        text: "Integrated Lenis smooth scrolling via a provider for a more premium navigation feel.",
      },
      {
        text: "Used Framer Motion for entrance animations, transitions, and micro-interactions with reusable variants.",
      },
    ],
    image: "/figma-screenshot.png",
    link: "https://www.figma.com/design/iAIP71pgOX4RqJmSZBJwsy/Portfolio?node-id=0-1&t=InfL1ZmXGKydC5Rg-1",
    showExternalLink: true,
  },
  {
    id: 6,
    name: "Splash Mobile App",
    title: "Splash Mobile App",
    description: "Enterprise mobile app prototype and data-reporting system proposed to C-suite leadership. Built with React Native, NestJS, and real Sonny’s API data.",
    tags: ["React Native", "NestJS", "Enterprise", "APIs", "Email Automation", "System Design"],
    color: "#1ABC9C",
    headline: "Enterprise mobile prototype pitched from managers to COO with live operational data.",
    headlineHighlights: ["C-suite proposal", "enterprise prototype", "live data reporting"],
    fullDescription: "Splash is an enterprise mobile application prototype developed and pitched internally to C-suite leadership. The project progressed through multiple executive levels — from managers to VP of Marketing and ultimately the COO. The app was built in React Native and paired with a NestJS backend. After the VP of Marketing review, we were granted access to a restricted Playground API, which led to a pivot toward building an automated reporting system to demonstrate value before investment.",
    highlights: [
      { text: "Designed and developed a React Native prototype showcasing store-level performance data for enterprise stakeholders." },
      { text: "Presented the project to managers, VP of Marketing, and COO, iterating on scope and value proposition at each stage." },
      { text: "After VP approval, gained access to the Playground API and pivoted to building an automated performance emailer to validate ROI before full investment." },
      { text: "Built a NestJS backend that ingested real Sonny’s API data, formatted metrics, and generated HTML-based, spreadsheet-style emails." },
      { text: "Implemented automated email reports delivering formatted performance summaries to internal teams, including Excel-compatible data exports." },
      { text: "Planned full system architecture including AWS backend infrastructure, API request handling for Sonny’s rate-limited endpoints, and third-party oil API integrations." },
      { text: "Produced a detailed ‘can & can’t’ feasibility list outlining API limitations, infrastructure costs, and scalability constraints." },
      { text: "Project concluded at proposal stage due to funding constraints, with architecture and implementation plans fully documented." },
    ],
    image: "/design.png",
  },

];


// Card dimensions - responsive
const CARD_WIDTH = 420;
const CARD_HEIGHT = 520;
const CARD_GAP = 40;

// Mobile card dimensions
const MOBILE_CARD_WIDTH = 300;
const MOBILE_CARD_HEIGHT = 420;

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number>(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);

  const handleProjectSelect = (index: number) => {
    setActiveProject(index);
  };

  const handleViewProject = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedProject(index);
  };

  const handleCloseExpanded = () => {
    setExpandedProject(null);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 80;
    const velocity = info.velocity.y;
    const offset = info.offset.y;
    
    let newIndex = activeProject;
    
    if (Math.abs(velocity) > 300 || Math.abs(offset) > threshold) {
      const direction = (velocity + offset * 0.5) > 0 ? -1 : 1;
      newIndex = activeProject + direction;
    }
    
    // Clamp to valid range
    newIndex = Math.max(0, Math.min(projects.length - 1, newIndex));
    setActiveProject(newIndex);
  };

  // Calculate card position in the vertical stack
  const getCardTransform = (index: number) => {
    const diff = index - activeProject;
    
    // Y position - stack cards vertically with offset
    const baseY = diff * (CARD_HEIGHT * 0.35 + CARD_GAP);
    
    // X offset - selected card at 0, unselected cards fan out to the right
    const xOffset = diff === 0 ? 0 : Math.abs(diff) * 80 + 60;
    
    // Scale - active card is largest
    const scale = diff === 0 ? 1 : Math.max(0.75, 1 - Math.abs(diff) * 0.12);
    
    // Rotation - subtle tilt based on position
    const rotation = diff * -3;
    
    // Opacity
    const opacity = Math.max(0.4, 1 - Math.abs(diff) * 0.25);
    
    // Z-index
    const zIndex = 20 - Math.abs(diff);
    
    return { y: baseY, x: xOffset, scale, rotation, opacity, zIndex };
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#E3E3E3" }}
      aria-label="Projects section"
    >
      {/* Decorative Corner Elements */}
      <div
        className="absolute left-0 top-0 h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 50%, transparent 50%)",
        }}
      />
      <div
        className="absolute right-0 top-0 h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64"
        style={{
          background: "linear-gradient(225deg, #1a1a1a 50%, transparent 50%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64"
        style={{
          background: "linear-gradient(45deg, #1a1a1a 50%, transparent 50%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64"
        style={{
          background: "linear-gradient(315deg, #1a1a1a 50%, transparent 50%)",
        }}
      />

      {/* Section Header - Centered at Top */}
      <motion.div 
        className="absolute left-1/2 top-12 z-20 -translate-x-1/2 md:top-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportSettings}
        transition={{ duration: 0.6 }}
      >
        <p 
          className="text-sm tracking-[0.3em] uppercase md:text-base"
          style={{ color: "#666" }}
        >
          Featured Work
        </p>
      </motion.div>

      {/* Main Content Container - Two Column Layout for Desktop */}
      <div className="relative z-10 mx-auto hidden min-h-screen max-w-450 items-center px-8 md:flex md:px-16 lg:px-32">
        
        {/* Left Side - Selector Panel */}
        <motion.div
          className="relative z-30 max-w-lg shrink-0 w-[120%]"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{ padding: "1rem" }}
        >
          {/* Selector Container */}
          <div 
            className="rounded-3xl p-10 md:p-12 h-80"
            style={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "rgba(210, 210, 210, 0.6)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(200, 200, 200, 0.5)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
              padding: "0.5rem",
            }}
          >
            <p 
              className="mb-10 text-base tracking-[0.25em] uppercase md:text-lg"
              style={{ color: "#555", fontFamily: "monospace" }}
            >
              Projects
            </p>
            
            <div className="flex flex-col space-y-5 pl-4">
              {projects.map((project, index) => (
                <motion.button
                  key={project.id}
                  className="group relative flex items-center gap-6 rounded-2xl py-5 pl-8 pr-6 text-left transition-all duration-300"
                  onClick={() => handleProjectSelect(index)}
                  onMouseEnter={() => handleProjectSelect(index)}
                  style={{
                    backgroundColor: activeProject === index ? "rgba(0, 0, 0, 0.08)" : "transparent",
                  }}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active Indicator Line */}
                  <motion.div
                    className="absolute -left-4 top-1/2 h-10 w-1.5 -translate-y-1/2 rounded-full"
                    style={{ backgroundColor: project.color }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: activeProject === index ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                  
                  {/* Project Number */}
                  <span 
                    className="w-10 text-lg font-mono font-semibold md:text-xl"
                    style={{ 
                      color: activeProject === index ? project.color : "#999",
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Project Name */}
                  <span
                    className="text-xl font-semibold transition-all duration-300 md:text-2xl"
                    style={{
                      color: activeProject === index ? "#1a1a1a" : "#555",
                    }}
                  >
                    {project.name}
                  </span>

                  {/* Arrow */}
                  <motion.span
                    className="ml-auto text-2xl"
                    style={{ color: project.color }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: activeProject === index ? 1 : 0,
                      x: activeProject === index ? 0 : -10,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <span 
                className="text-sm md:text-base"
                style={{ color: "#888", fontFamily: "monospace" }}
              >
                Hover to preview
              </span>
              <span style={{ color: "#bbb" }}>•</span>
              <span 
                className="text-sm md:text-base"
                style={{ color: "#888", fontFamily: "monospace" }}
              >
                Drag cards to explore
              </span>
            </div>

            {/* Progress Dots */}
            <div className="mt-8 flex justify-center gap-3">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  className="h-3 rounded-full transition-all duration-300"
                  style={{
                    width: activeProject === index ? "32px" : "12px",
                    backgroundColor: activeProject === index 
                      ? projects[activeProject].color 
                      : "#c0c0c0",
                  }}
                  onClick={() => handleProjectSelect(index)}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Card Carousel - positioned at ~75% from left */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 lg:right-[10%]">
          <motion.div 
            ref={containerRef}
            className="relative cursor-grab active:cursor-grabbing"
            style={{ 
              width: CARD_WIDTH + 100,
              height: "90vh",
              touchAction: "none",
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
          >
            {projects.map((project, index) => {
              const transform = getCardTransform(index);
              
              return (
                <motion.div
                  key={project.id}
                  className="absolute cursor-pointer"
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    left: "50%",
                    marginLeft: -CARD_WIDTH / 2,
                    top: "50%",
                    marginTop: -CARD_HEIGHT / 2,
                    zIndex: transform.zIndex,
                  }}
                  animate={{
                    y: transform.y,
                    x: transform.x,
                    scale: hoveredCard === index && index === activeProject ? 1.03 : transform.scale,
                    opacity: transform.opacity,
                    rotateZ: transform.rotation,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => handleProjectSelect(index)}
                >
                  {/* Card */}
                  <motion.div
                    className="relative h-full w-full rounded-4xl"
                    style={{
                      backgroundColor: "#1a1a1a",
                      border: `2px solid ${hoveredCard === index ? project.color : "#2a2a2a"}`,
                      boxShadow: hoveredCard === index 
                        ? `0 40px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px ${project.color}50`
                        : "0 30px 60px rgba(0, 0, 0, 0.3)",
                      padding: "2.5rem",
                    }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card Header */}
                    <div className="mb-6 flex items-start justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold"
                        style={{ 
                          backgroundColor: `${project.color}20`,
                          color: project.color,
                        }}
                      >
                        *
                      </div>
                      <span 
                        className="text-xs tracking-wider uppercase"
                        style={{ color: "#555", fontFamily: "monospace" }}
                      >
                        Project {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="mb-5 text-3xl font-bold md:text-4xl"
                      style={{ color: "#fff" }}
                    >
                      {project.title}
                    </h3>

                    {/* Description - clipped */}
                    <p
                      className="line-clamp-6 text-base leading-relaxed md:text-lg"
                      style={{
                        color: "#999",
                        fontFamily: "monospace",
                        lineHeight: 1.7,
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Tags - positioned at bottom above button */}
                    <div style={{ position: "absolute", bottom: "7.5rem", left: "2.5rem", right: "2.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full px-3 py-1.5 text-xs"
                          style={{
                            backgroundColor: "#2a2a2a",
                            color: "#bbb",
                            fontFamily: "monospace",
                            padding: "0.25rem 0.75rem",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      className="rounded-xl py-3 text-sm font-semibold transition-colors"
                      style={{
                        position: "absolute",
                        bottom: "2.5rem",
                        left: "2.5rem",
                        right: "2.5rem",
                        backgroundColor: project.color,
                        color: "#fff",
                      }}
                      whileHover={{ scale: 1.02, opacity: 0.9 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => handleViewProject(index, e)}
                    >
                      View Project
                    </motion.button>

                    {/* Decorative gradient */}
                    <div 
                      className="absolute -right-24 -top-24 h-48 w-48 rounded-full opacity-25 blur-3xl"
                      style={{ backgroundColor: project.color }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout - Horizontal Scrollable Cards */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-4 px-4 py-20 md:hidden">
        {/* Mobile Header */}
        <p 
          className="text-sm tracking-[0.25em] uppercase"
          style={{ color: "#555", fontFamily: "monospace" }}
        >
          Projects
        </p>

        {/* Horizontal Scroll Container */}
        <div 
          className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="shrink-0 snap-center"
              style={{
                width: MOBILE_CARD_WIDTH,
                height: MOBILE_CARD_HEIGHT,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Card */}
              <div
                className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: `2px solid ${project.color}30`,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  padding: "1.5rem",
                }}
              >
                {/* Card Header */}
                <div className="mb-4 flex shrink-0 items-start justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold"
                    style={{ 
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                    }}
                  >
                    *
                  </div>
                  <span 
                    className="text-xs tracking-wider uppercase"
                    style={{ color: "#555", fontFamily: "monospace" }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="mb-3 shrink-0 text-2xl font-bold"
                  style={{ color: "#fff" }}
                >
                  {project.title}
                </h3>

                {/* Description - clipped */}
                <div className="mb-4 min-h-0 flex-1 overflow-hidden">
                  <p
                    className="line-clamp-4 text-sm leading-relaxed"
                    style={{
                      color: "#999",
                      fontFamily: "monospace",
                      lineHeight: 1.6,
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Tags - limited display */}
                <div className="mb-4 flex shrink-0 flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2 py-1 text-xs"
                      style={{
                        backgroundColor: "#2a2a2a",
                        color: "#bbb",
                        fontFamily: "monospace",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span
                      className="rounded-full px-2 py-1 text-xs"
                      style={{
                        backgroundColor: "#2a2a2a",
                        color: "#bbb",
                        fontFamily: "monospace",
                      }}
                    >
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <motion.button
                  className="shrink-0 rounded-xl py-3 text-sm font-semibold"
                  style={{
                    backgroundColor: project.color,
                    color: "#fff",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => handleViewProject(index, e)}
                >
                  View Project
                </motion.button>

                {/* Decorative gradient */}
                <div 
                  className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full opacity-20 blur-2xl"
                  style={{ backgroundColor: project.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Dots for Mobile */}
        <div className="flex justify-center gap-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: project.color + "60" }}
            />
          ))}
        </div>
      </div>

      {/* Expanded Project Modal */}
      <AnimatePresence>
        {expandedProject !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={handleCloseExpanded}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 flex h-[95vh] md:h-[90vh] w-full max-w-[95vw] md:max-w-[90vw] flex-col md:flex-row rounded-3xl overflow-hidden\"
              style={{ backgroundColor: "#1a1a1a" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 25,
                duration: 0.5 
              }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className="absolute z-20 flex h-10 w-10 items-center justify-center rounded-full text-xl text-white"
                style={{ backgroundColor: `${projects[expandedProject].color}90`, top: "1rem", right: "1rem" }}
                onClick={handleCloseExpanded}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                ×
              </motion.button>

              {/* Left Content - Scrollable (full width on mobile) */}
              <div 
                className="flex w-full flex-col justify-start overflow-y-auto md:w-1/2 h-full overscroll-contain"
                style={{ padding: "1.5rem", paddingTop: "3rem" }}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                {/* Content wrapper */}
                <div className="flex-1 flex flex-col">
                    <motion.span
                    className="mb-4 md:mb-6 inline-block rounded-full w-fit text-xs uppercase tracking-widest"
                    style={{ 
                      backgroundColor: `${projects[expandedProject].color}20`,
                      color: projects[expandedProject].color,
                      fontFamily: "monospace",
                      padding: "0.5rem 0.5rem",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    >
                    Highlights
                    </motion.span>

                  {/* Headline with highlights */}
                  <motion.h2
                    className="mb-4 md:mb-6 text-lg font-bold leading-tight sm:text-xl md:text-3xl lg:text-4xl"
                    style={{ color: "#fff" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    {projects[expandedProject].headline.split(" ").map((word, i) => {
                      const isHighlight = projects[expandedProject].headlineHighlights.some(
                        highlight => highlight.toLowerCase().includes(word.toLowerCase())
                      );
                      return (
                        <span 
                          key={i} 
                          style={{ color: isHighlight ? projects[expandedProject].color : "#fff" }}
                        >
                          {word}{" "}
                        </span>
                      );
                    })}
                  </motion.h2>

                  {/* Full Description */}
                  <motion.p
                    className="mb-6 md:mb-8 text-sm md:text-base leading-relaxed"
                    style={{ color: "#888", fontFamily: "monospace" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {projects[expandedProject].fullDescription}
                  </motion.p>

                  {/* Highlights List */}
                  <div className="space-y-3 md:space-y-4">
                    {projects[expandedProject].highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 md:gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.1 }}
                      >
                        <div
                          className="mt-0.5 flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: projects[expandedProject].color }}
                        >
                          <svg
                            className="h-2.5 w-2.5 md:h-3 md:w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p 
                          className="text-xs leading-relaxed sm:text-sm md:text-base"
                          style={{ color: "#aaa" }}
                        >
                          {highlight.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom Link - only shown if showExternalLink is true */}
                  {projects[expandedProject].showExternalLink && projects[expandedProject].link && (
                    <motion.a
                      href={projects[expandedProject].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 md:mt-10 inline-flex items-center gap-2 pb-4 text-sm"
                      style={{ color: projects[expandedProject].color, fontFamily: "monospace" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ x: 5 }}
                    >
                      View More →
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Right Image */}
              <motion.div
                className="relative hidden w-1/2 md:block"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div 
                  className="absolute overflow-hidden rounded-2xl"
                  style={{ backgroundColor: "#0d0d0d", top: "2.5rem", right: "2.5rem", bottom: "2.5rem", left: "1rem" }}
                >
                  <div className="relative h-full w-full p-6">
                    <Image
                      src={projects[expandedProject].image}
                      alt={projects[expandedProject].title}
                      fill
                      className="object-contain"
                      style={{ opacity: 0.95 }}
                    />
                  </div>

                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
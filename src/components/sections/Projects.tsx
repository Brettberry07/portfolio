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
}

const projects: Project[] = [
  {
    id: 0,
    name: "Querry Berry",
    title: "Querry Berry",
    description: "Custom Made Search Engine Using NextJS and Prisma. Full-stack application with advanced search algorithms and real-time indexing.",
    tags: ["Next.js", "Prisma", "TypeScript", "PostgreSQL"],
    color: "#7373E0",
    headline: "Built a custom search engine from scratch for seamless data discovery.",
    headlineHighlights: ["custom search engine", "from scratch"],
    fullDescription: "Querry Berry is a full-stack search engine built with Next.js and Prisma, featuring advanced search algorithms, real-time indexing, and a beautiful UI for discovering content quickly.",
    highlights: [
      { text: "Lead developer on the project. Built the entire frontend and backend from scratch using Next.js 14 and Prisma ORM." },
      { text: "Implemented advanced search algorithms with fuzzy matching, typo tolerance, and semantic search capabilities." },
      { text: "Outcome: A fast, reliable search engine that indexes content in real-time and delivers results in under 100ms." },
      { text: "Deployed to production serving 1000+ daily queries with 99.9% uptime." },
    ],
    image: "/design.png",
    link: "https://github.com",
  },
  {
    id: 1,
    name: "Context Message",
    title: "Context Message",
    description: "Real-time messaging application with context awareness. Features smart notifications and AI-powered conversation insights.",
    tags: ["Next.js", "WebSocket", "NestJS"],
    color: "#4CAF50",
    headline: "Created an AI-powered messaging platform with context-aware features.",
    headlineHighlights: ["AI-powered", "context-aware"],
    fullDescription: "Context Message is a real-time messaging application that uses AI to understand conversation context, providing smart replies, sentiment analysis, and intelligent notifications.",
    highlights: [
      { text: "Architected the WebSocket infrastructure handling 10,000+ concurrent connections with sub-50ms latency." },
      { text: "Integrated OpenAI GPT-4 for smart reply suggestions and conversation summarization features." },
      { text: "Outcome: A messaging platform that reduces response time by 40% through AI-assisted communication." },
      { text: "Built with React, Node.js, and PostgreSQL with end-to-end encryption." },
    ],
    image: "/design.png",
  },
  {
    id: 2,
    name: "COB Traffic",
    title: "COB Traffic",
    description: "Traffic analysis and monitoring dashboard. Real-time data visualization with predictive analytics for traffic flow optimization.",
    tags: ["Python", "Pytorch", "PostgreSQL"],
    color: "#FF6B6B",
    headline: "Developed a traffic monitoring system with predictive analytics.",
    headlineHighlights: ["traffic monitoring", "predictive analytics"],
    fullDescription: "COB Traffic is a comprehensive traffic analysis dashboard that uses machine learning to predict traffic patterns and optimize flow in real-time.",
    highlights: [
      { text: "Built the data pipeline processing 1M+ data points daily from IoT sensors across the city." },
      { text: "Implemented predictive models with 94% accuracy for traffic congestion forecasting." },
      { text: "Outcome: Reduced average commute time by 15% in pilot zones through optimized signal timing." },
      { text: "Dashboard built with D3.js featuring real-time updates and interactive visualizations." },
    ],
    image: "/design.png",
  },
  {
    id: 3,
    name: "BLk0ut",
    title: "BLk0ut",
    description: "Robotics control interface and telemetry system. Low-latency control with real-time sensor data streaming.",
    tags: ["C++", "Arduino", "React"],
    color: "#FFB347",
    headline: "Engineered a low-latency robotics control system.",
    headlineHighlights: ["low-latency", "robotics control"],
    fullDescription: "Vex Robot is a comprehensive robotics control interface featuring real-time telemetry, autonomous navigation, and a React-based dashboard for monitoring and control.",
    highlights: [
      { text: "Developed the embedded firmware in C++ achieving <10ms control loop latency." },
      { text: "Built a React dashboard for real-time sensor visualization and remote control capabilities." },
      { text: "Outcome: Won 2nd place in regional VEX Robotics competition with autonomous navigation features." },
      { text: "Implemented PID controllers and path planning algorithms for precise movement." },
    ],
    image: "/design.png",
  },
  {
    id: 4,
    name: "Fig",
    title: "Fig",
    description: "Developer productivity tool for terminal workflows. Autocomplete, shortcuts, and workflow automation for CLI.",
    tags: ["Rust", "TypeScript", "Shell"],
    color: "#9B59B6",
    headline: "Built a developer productivity tool for terminal power users.",
    headlineHighlights: ["developer productivity", "terminal power users"],
    fullDescription: "Fig enhances terminal workflows with intelligent autocomplete, custom shortcuts, and workflow automation, making CLI work faster and more enjoyable.",
    highlights: [
      { text: "Core contributor to the autocomplete engine, adding support for 200+ CLI tools." },
      { text: "Built in Rust for maximum performance with TypeScript for the configuration layer." },
      { text: "Outcome: Reduced average command typing time by 60% through intelligent suggestions." },
      { text: "Open-source project with 5,000+ GitHub stars and active community." },
    ],
    image: "/design.png",
  },
];

// Card dimensions
const CARD_WIDTH = 420;
const CARD_HEIGHT = 520;
const CARD_GAP = 40;

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

      {/* Main Content Container - Two Column Layout */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-450 items-center px-8  md:px-16 lg:px-32">
        
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
                    className="relative h-full w-full rounded-[2rem]"
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

                    {/* Description */}
                    <p
                      className="text-base leading-relaxed md:text-lg"
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
              className="relative z-10 flex h-[90vh] w-full max-w-[90vw] rounded-3xl"
              style={{ backgroundColor: "#1a1a1a" }}
              initial={{ scale: 0.9, rotateY: -90, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.9, rotateY: 90, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 25,
                duration: 0.5 
              }}
            >
              {/* Close Button */}
              <motion.button
                className="absolute z-20 flex h-10 w-10 items-center justify-center rounded-full text-xl text-white"
                style={{ backgroundColor: `${projects[expandedProject].color}90`, top: "2.5rem", right: "2.5rem" }}
                onClick={handleCloseExpanded}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                ×
              </motion.button>

              {/* Left Content - Scrollable */}
              <div 
                className="flex w-full flex-col justify-between overflow-y-auto md:w-1/2 h-full"
                style={{ padding: "2.5rem" }}
              >
                {/* Content wrapper */}
                <div className="flex-1 flex flex-col justify-between">
                    <motion.span
                    className="mb-6 inline-block rounded-full w-fit text-xs uppercase tracking-widest"
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
                    className="mb-6 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl"
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
                    className="mb-8 text-base leading-relaxed"
                    style={{ color: "#888", fontFamily: "monospace" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {projects[expandedProject].fullDescription}
                  </motion.p>

                  {/* Highlights List */}
                  <div className="space-y-4">
                    {projects[expandedProject].highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.1 }}
                      >
                        <div
                          className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: projects[expandedProject].color }}
                        >
                          <svg
                            className="h-3 w-3 text-white"
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
                          className="text-sm leading-relaxed md:text-base"
                          style={{ color: "#aaa" }}
                        >
                          {highlight.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom Link */}
                  <motion.a
                    href={projects[expandedProject].link || "#"}
                    className="mt-10 inline-flex items-center gap-2 pb-4 text-sm"
                    style={{ color: projects[expandedProject].color, fontFamily: "monospace" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ x: 5 }}
                  >
                    View on GitHub →
                  </motion.a>
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
                  style={{ backgroundColor: "#0a1628", top: "2.5rem", right: "2.5rem", bottom: "2.5rem", left: "1rem" }}
                >
                  <Image
                    src={projects[expandedProject].image}
                    alt={projects[expandedProject].title}
                    fill
                    className="object-cover"
                    style={{ opacity: 0.9 }}
                  />

                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { fadeInLeft, viewportSettings } from "@/lib/motion";

interface Project {
  id: number;
  name: string;
  title: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 0,
    name: "Querry Berry",
    title: "Querry Berry",
    description: "Custom Made Search Engine Using NextJS and Prisma",
  },
  {
    id: 1,
    name: "Context Message",
    title: "Context Message",
    description: "Real-time messaging application with context awareness",
  },
  {
    id: 2,
    name: "COB Traffic",
    title: "COB Traffic",
    description: "Traffic analysis and monitoring dashboard",
  },
  {
    id: 3,
    name: "Vex Robot",
    title: "Vex Robot",
    description: "Robotics control interface and telemetry system",
  },
  {
    id: 4,
    name: "Fig",
    title: "Fig",
    description: "Developer productivity tool for terminal workflows",
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number>(0);

  const handleProjectHover = (index: number) => {
    setActiveProject(index);
  };

  // Calculate rotation for each card in a clockwise circle
  const getCardStyle = (index: number) => {
    const totalProjects = projects.length;
    const anglePerProject = 360 / totalProjects;
    
    // Calculate the angle offset based on active project
    const baseAngle = index * anglePerProject;
    const activeAngle = activeProject * anglePerProject;
    let angleDiff = baseAngle - activeAngle;
    
    // Normalize to -180 to 180
    if (angleDiff > 180) angleDiff -= 360;
    if (angleDiff < -180) angleDiff += 360;
    
    // Convert to radians for position calculation
    // Start from 0 degrees (right/3 o'clock position) and go clockwise
    const angleInRadians = (angleDiff * Math.PI) / 180;
    
    // Large circular path - cards rotate around a wheel
    const radiusX = 200; // Horizontal movement 
    const radiusY = 450; // Vertical radius to create the wheel effect
    
    // Calculate position on the circle
    // x uses cos so active card is at the rightmost point
    // y uses sin for vertical positioning
    const x = -Math.cos(angleInRadians) * radiusX + radiusX; // Offset so active is at right edge
    const y = Math.sin(angleInRadians) * radiusY;
    
    // Card rotation - cards tilt as they go around, upright in the middle
    const cardRotation = angleDiff * 0.4; // Tilt based on position (40% of angle)
    
    // Determine visibility and scale based on position in the circle
    const isFront = Math.abs(angleDiff) < 10;
    const isNearFront = Math.abs(angleDiff) <= 90;
    const isVisible = Math.abs(angleDiff) <= 150;
    
    const scale = isFront ? 1 : isNearFront ? 0.85 : 0.7;
    const opacity = isFront ? 1 : isNearFront ? 0.9 : isVisible ? 0.6 : 0;
    const zIndex = Math.round(20 - Math.abs(angleDiff) / 10);

    return {
      x,
      y,
      scale,
      opacity,
      zIndex,
      cardRotation,
      isVisible,
    };
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#E3E3E3" }}
      aria-label="Projects section"
    >
      {/* Decorative Black Triangles */}
      {/* Top Left */}
      <div
        className="absolute left-0 top-0 h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 50%, transparent 50%)",
        }}
      />
      {/* Top Right */}
      <div
        className="absolute right-0 top-0 h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64"
        style={{
          background: "linear-gradient(225deg, #1a1a1a 50%, transparent 50%)",
        }}
      />
      {/* Bottom Left */}
      <div
        className="absolute bottom-0 left-0 h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64"
        style={{
          background: "linear-gradient(45deg, #1a1a1a 50%, transparent 50%)",
        }}
      />
      {/* Bottom Right */}
      <div
        className="absolute bottom-0 right-0 h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64"
        style={{
          background: "linear-gradient(315deg, #1a1a1a 50%, transparent 50%)",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen items-center">
        {/* Project List - Left Side */}
        <motion.div
          className="absolute left-8 z-30 flex flex-col justify-center space-y-2 md:left-16 md:space-y-3 lg:left-24"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              className="group flex items-center gap-3 py-2 text-left transition-all duration-300"
              onMouseEnter={() => handleProjectHover(index)}
              onClick={() => handleProjectHover(index)}
            >
              {/* Arrow indicator */}
              <motion.span
                className="text-lg font-bold"
                style={{ color: "#7373E0" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: activeProject === index ? 1 : 0,
                  x: activeProject === index ? 0 : -10,
                }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
              <motion.span
                className="font-sans font-bold transition-all duration-300"
                animate={{
                  color: activeProject === index ? "#7373E0" : "#1a1a1a",
                  fontSize: activeProject === index ? "1.75rem" : "1.25rem",
                }}
                transition={{ duration: 0.3 }}
              >
                {project.name}
              </motion.span>
            </motion.button>
          ))}
        </motion.div>

        {/* Rotating Cards - Right side, vertical carousel */}
        <div 
          className="absolute right-8 top-1/2 -translate-y-1/2 md:right-16 lg:right-24"
        >
          {projects.map((project, index) => {
            const style = getCardStyle(index);
            return (
              <motion.div
                key={project.id}
                className="absolute w-48 md:w-56 lg:w-64"
                style={{
                  right: 0,
                  top: "50%",
                  marginTop: "-180px", // Half of card height to center
                }}
                animate={{
                  x: style.x,
                  y: style.y,
                  scale: style.scale,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <div
                  className="h-72 rounded-xl p-6 shadow-2xl md:h-80 md:p-8 lg:h-96"
                  style={{
                    backgroundColor: "#2a2a2a",
                    border: "3px solid #3a3a3a",
                  }}
                >
                  <h3
                    className="mb-4 text-xl font-bold md:text-2xl"
                    style={{ color: "#7373E0" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed md:text-base"
                    style={{
                      color: "#a0a0a0",
                      fontFamily: "monospace",
                    }}
                  >
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

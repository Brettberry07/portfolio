"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const codeSnippets = [
  { id: 1, src: "/code-snippet-1.png", alt: "Code snippet 1" },
  { id: 2, src: "/code-snippet-2.png", alt: "Code snippet 2" },
  { id: 3, src: "/code-snippet-3.png", alt: "Code snippet 3" },
  { id: 4, src: "/code-snippet-4.png", alt: "Code snippet 4" },
  { id: 5, src: "/code-snippet-5.png", alt: "Code snippet 5" },
  { id: 6, src: "/code-snippet-6.png", alt: "Code snippet 6" },
];

interface MarqueeRowProps {
  items: typeof codeSnippets;
  direction?: "left" | "right";
}

function MarqueeRow({ items, direction = "left" }: MarqueeRowProps) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className={`flex items-center gap-14 md:gap-20 lg:gap-24 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{ width: "fit-content" }}
      >
        {duplicatedItems.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            className="group relative h-44 w-72 shrink-0 overflow-hidden rounded-xl bg-zinc-800 shadow-xl md:h-52 md:w-88 lg:h-64 lg:w-105"
            whileHover={{ scale: 1.03, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover object-center transition-all duration-500 group-hover:brightness-110"
              sizes="(max-width: 768px) 288px, (max-width: 1024px) 352px, 420px"
            />
            {/* Subtle border */}
            <div className="absolute inset-0 rounded-xl border border-white/10 transition-all duration-300 group-hover:border-white/20" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Proof() {
  const topRowItems = codeSnippets.slice(0, 3);
  const bottomRowItems = codeSnippets.slice(3, 6);

  return (
    <section
      className="relative flex w-full flex-col justify-center overflow-hidden py-20 md:py-28 lg:py-32"
      style={{ backgroundColor: "#3B394A" }}
      aria-label="Code showcase section"
    >
      {/* Marquee Rows */}
      <div className="space-y-10 md:space-y-14 lg:space-y-16">
        <div className="w-screen h-4"></div>
        <MarqueeRow items={topRowItems} direction="left" />
        <div className="w-screen h-4"></div>
        <MarqueeRow items={bottomRowItems} direction="right" />
        <div className="w-screen h-4"></div>
      </div>
    </section>
  );
}

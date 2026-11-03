import Link from "next/link";
import { Atom, Container, Gem, GitBranch, NotebookPen, Smartphone, Zap, ArrowUpRight } from "lucide-react";
import "./toolkit.css";

const groups = [
  {
    title: "Languages",
    description: "From versatile scripting to lower-level systems, these are the languages I use to turn ideas into working software.",
    tools: [
      { name: "TypeScript", svg: "/icons/toolkit/typescript.svg", color: "#3178c6" },
      { name: "JavaScript", svg: "/icons/toolkit/javascript.svg", color: "#ac8400" },
      { name: "Python", svg: "/icons/toolkit/python.svg", color: "#3776ab" },
      { name: "C++", svg: "/icons/toolkit/cpp.svg", color: "#00599c" },
      { name: "Rust", svg: "/icons/toolkit/rust.svg", color: "#93552e" },
      { name: "Ruby", Icon: Gem, color: "#cc342d" },
    ],
  },
  {
    title: "Frontend & Product",
    description: "The frameworks I use to build thoughtful, responsive web and mobile experiences.",
    tools: [
      { name: "React", Icon: Atom, color: "#087ea4" },
      { name: "Next.js", svg: "/icons/toolkit/nextjs.svg", color: "#171717" },
      { name: "React Native", Icon: Smartphone, color: "#1684aa" },
      { name: "Tailwind CSS", svg: "/icons/toolkit/tailwindcss.svg", color: "#0891a5" },
    ],
  },
  {
    title: "Backend & Data",
    description: "The databases, frameworks, and services that power reliable applications and scalable systems.",
    tools: [
      { name: "PostgreSQL", svg: "/icons/toolkit/postgresql.svg", color: "#4169a1" },
      { name: "SQL", svg: "/icons/toolkit/sql.svg", color: "#3c697c" },
      { name: "Ruby on Rails", svg: "/icons/toolkit/rails.svg", color: "#cf222e" },
      { name: "Supabase", Icon: Zap, color: "#21875d" },
    ],
  },
  {
    title: "Infrastructure & Tools",
    description: "My development and deployment toolkit for building, testing, and shipping software.",
    tools: [
      { name: "Docker", Icon: Container, color: "#1d63ed" },
      { name: "Git", Icon: GitBranch, color: "#e34d32" },
      { name: "Jupyter", Icon: NotebookPen, color: "#c66620" },
    ],
  },
] as const;

const projectExamples: Record<string, { title: string; slug: string }> = {
  Rust: { title: "Fig", slug: "fig" },
  Ruby: { title: "Tariff Ninja", slug: "tariff-ninja" },
  "Ruby on Rails": { title: "Tariff Ninja", slug: "tariff-ninja" },
  SQL: { title: "Tariff Ninja", slug: "tariff-ninja" },
  Python: { title: "City of Bentonville Traffic", slug: "city-of-bentonville-traffic" },
  Jupyter: { title: "City of Bentonville Traffic", slug: "city-of-bentonville-traffic" },
  "Tailwind CSS": { title: "Querry Berry", slug: "querry-berry" },
  React: { title: "Amazeum", slug: "amazeum" },
  JavaScript: { title: "Amazeum", slug: "amazeum" },
  TypeScript: { title: "Still On", slug: "still-on" },
  "React Native": { title: "Still On", slug: "still-on" },
  Supabase: { title: "Still On", slug: "still-on" },
  "Next.js": { title: "Querry Berry", slug: "querry-berry" },
  PostgreSQL: { title: "Querry Berry", slug: "querry-berry" },
  Docker: { title: "Querry Berry", slug: "querry-berry" },
};

export function Toolkit() {
  return <section className="toolkit section-wrap support-section" id="toolkit" aria-labelledby="toolkit-title">
    <div className="section-topline mono"><span>05 / TOOLKIT</span><span>Tools in service of the work.</span></div>
    <div className="toolkit-heading"><h2 className="section-title-small" id="toolkit-title">A selected toolkit.</h2><p>Selected tools, linked to the projects where I use them.</p></div>
    <div className="toolkit-groups">{groups.map((group) => <div className="toolkit-group" key={group.title}><h3>{group.title}</h3><ul>{group.tools.map((tool) => {
      const example = projectExamples[tool.name];
      return <li key={tool.name}><span className="toolkit-icon" aria-hidden="true">{"svg" in tool ? <span style={{ maskImage: `url(${tool.svg})`, WebkitMaskImage: `url(${tool.svg})` }} /> : <tool.Icon size={24} strokeWidth={1.5} />}</span>{example ? <Link href={`/projects/${example.slug}`} aria-label={`${tool.name} — ${example.title}`}>{tool.name}<ArrowUpRight size={14} /></Link> : <span>{tool.name}</span>}</li>;
    })}</ul></div>)}</div>
  </section>;
}

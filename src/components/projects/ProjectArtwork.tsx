import type { Project } from "@/content/projects";
import "./project-artwork.css";

type ProjectArtworkProps = {
  project: Pick<Project, "id" | "title" | "workflow">;
  variant?: "cover" | "detail";
  className?: string;
  accessible?: boolean;
};

/** A documented workflow, never a simulated interface or measured chart. */
export function ProjectArtwork({ project, variant = "cover", className = "", accessible = false }: ProjectArtworkProps) {
  return <div className={`project-artwork project-artwork--${variant} ${className}`} role={accessible ? "img" : undefined} aria-label={accessible ? `${project.title}: workflow diagram. ${project.workflow?.map((step) => step.title).join(" → ")}. Not a product screenshot.` : undefined} aria-hidden={accessible ? undefined : true}>
    <div className="project-artwork__label mono"><span>WORKFLOW DIAGRAM / {project.id}</span></div>
    <ol className="project-artwork__steps">{project.workflow?.map((step, index) => <li key={step.title}><span className="project-artwork__node mono">0{index + 1}</span><strong>{step.title}</strong><span className="project-artwork__description">{step.description}</span></li>)}</ol>
    <p className="project-artwork__caption mono">Not a product screenshot</p>
  </div>;
}

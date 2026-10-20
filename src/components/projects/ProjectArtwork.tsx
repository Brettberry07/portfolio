import type { Project } from "@/content/projects";
import "./project-artwork.css";

type ProjectArtworkProps = {
  project: Pick<Project, "id" | "title">;
  variant?: "cover" | "detail";
  className?: string;
  accessible?: boolean;
};

/** Original geometric concept artwork, not a screenshot or a project deliverable. */
export function ProjectArtwork({
  project,
  variant = "cover",
  className = "",
  accessible = false,
}: ProjectArtworkProps) {
  const number = Number(project.id);

  return (
    <div
      className={`project-artwork project-artwork-${variant} project-artwork-art${number} ${className}`}
      role={accessible ? "img" : undefined}
      aria-label={accessible ? `Geometric concept artwork for ${project.title}; not a project screenshot` : undefined}
      aria-hidden={accessible ? undefined : true}
    >
      <div className="project-artwork-grid" />
      <div className="project-artwork-orbit" />
      <svg className="project-artwork-structure" viewBox="0 0 600 450" fill="none">
        <defs>
          <linearGradient id={`face-${project.id}-${variant}`} x1="180" y1="100" x2="460" y2="380" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f7f5ec" />
            <stop offset="1" stopColor="#adada4" />
          </linearGradient>
          <linearGradient id={`side-${project.id}-${variant}`} x1="360" y1="80" x2="470" y2="350" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b8d84" />
            <stop offset="1" stopColor="#5c5f56" />
          </linearGradient>
          <filter id={`shadow-${project.id}-${variant}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>
        <ellipse cx="310" cy="385" rx="138" ry="17" fill="#000" opacity=".23" filter={`url(#shadow-${project.id}-${variant})`} />
        <g className="project-artwork-object">
          <path d="M174 141 340 90 427 143 260 196Z" fill="#f0f0e7" />
          <path d="M260 196 427 143 427 311 260 365Z" fill={`url(#side-${project.id}-${variant})`} />
          <path d="M174 141 260 196 260 365 174 309Z" fill={`url(#face-${project.id}-${variant})`} />
          <path d="M194 154 340 110 407 150 261 197Z" fill="#d3d5c9" />
          <path d="M194 154 261 197 261 341 194 297Z" fill="#e0e1d8" />
          <path d="M261 197 407 150 407 295 261 341Z" fill="#3d4137" />
          <path d="M214 168 340 130 387 157 260 199Z" fill="#f0f0e7" />
          <path d="M214 168 260 199 260 317 214 286Z" fill="#f5f3e9" />
          <path d="M260 199 387 157 387 279 260 317Z" fill="#777e6d" />
          <path d="M236 181 340 151 366 167 260 201Z" fill="#b6bcac" />
          <path d="M236 181 260 201 260 294 236 277Z" fill="#d9dccf" />
          <path d="M260 201 366 167 366 262 260 294Z" fill="#22271e" />
          <path d="M174 141 260 196 427 143M260 196V365" stroke="#fff" strokeOpacity=".4" />
        </g>
        <path className="project-artwork-guide" d="M100 355H480M130 370V80M470 100H323M340 83V110" stroke="currentColor" strokeWidth=".6" />
        <circle cx="130" cy="355" r="3" fill="currentColor" />
      </svg>
      <span className="project-artwork-marker">{project.id} / SELECTION</span>
      <span className="project-artwork-cross">+</span>
      <span className="project-artwork-caption">STUDY IN FORM</span>
      <span className="project-artwork-concept">CONCEPT ARTWORK</span>
    </div>
  );
}

/**
 * Canonical project inventory. Only titles and slugs are confirmed.
 * Add public, approved project details here; omitted fields stay unpublished.
 */
export type Project = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  category?: string;
  role?: string;
  technologies: string[];
  status: "draft" | "verified";
  heroImage?: string;
  overview?: string;
  problem?: string;
  approach?: string;
  solution?: string;
  results?: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  { id: "01", slug: "querry-berry", title: "Querry Berry", technologies: [], status: "draft" },
  { id: "02", slug: "fig", title: "Fig", technologies: [], status: "draft" },
  { id: "03", slug: "tariff-ninja", title: "Tariff Ninja", technologies: [], status: "draft" },
  { id: "04", slug: "potential-energy-tech", title: "Potential Energy Tech", technologies: [], status: "draft" },
  { id: "05", slug: "amazeum", title: "Amazeum", technologies: [], status: "draft" },
  { id: "06", slug: "still-on", title: "Still On", technologies: [], status: "draft" },
  { id: "07", slug: "city-of-bentonville-traffic", title: "City of Bentonville Traffic", technologies: [], status: "draft" },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

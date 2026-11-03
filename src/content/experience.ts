/** Approved résumé facts supplied by Brett in the October 2026 refinement brief. */
export type Experience = {
  company: string;
  location: string;
  dates: string;
  roles: readonly { title: string; dates: string }[];
  summary: string;
  emphasis: { value: string; label: string };
  projectSlug: string;
};

export const experience: readonly Experience[] = [
  {
    company: "Tariff Ninja",
    location: "Bentonville, Arkansas",
    dates: "FEB — SEP 2026",
    roles: [
      { title: "Lead Software Engineer", dates: "July – September 2026" },
      { title: "Software Engineer", dates: "February – July 2026" },
    ],
    summary: "Built AI-assisted trade tools, item infrastructure, and internal applications in direct collaboration with clients.",
    emphasis: { value: "1.5M+", label: "items supported by the data infrastructure" },
    projectSlug: "tariff-ninja",
  },
  {
    company: "Potential Energy Tech",
    location: "Bentonville, Arkansas",
    dates: "JAN — MAY 2026",
    roles: [
      { title: "Software Engineer Intern", dates: "January – May 2026" },
    ],
    summary: "Developed battery-analysis software and contributed to cloud architecture, SaaS planning, and subscription pricing.",
    emphasis: { value: "1.2M+", label: "data points processed in under a second" },
    projectSlug: "potential-energy-tech",
  },
];

export const education = [
  {
    institution: "University of Arkansas",
    location: "Fayetteville",
    dates: "EXPECTED MAY 2030",
    qualification: "B.S. Computer Science",
    detail: "Minors in Innovation & Entrepreneurship and Mathematics",
    note: "4.0 GPA",
  },
] as const;

export const leadership = [
  { organization: "RIOT Robotics", context: "University of Arkansas", description: "Developing a low-cost impact-detection vest for a local business." },
  { organization: "Competitive Programming Club", context: "Founder · Bentonville West", description: "Seven statewide and national awards." },
  { organization: "Science Olympiad", context: "Senior Captain · Bentonville West", description: "Three national qualifications and state awards." },
  { organization: "VEX Robotics", context: "Engineering & competition", description: "Arkansas State and two regional Innovate Awards; World Championship qualification." },
  { organization: "Arkansas Hog Hacks", context: "Hackathon recognition", description: "Most Creative Award; sixth overall as a high-school team." },
] as const;

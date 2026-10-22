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
    summary: "Led the development of AI-powered customs and trade software, building large-scale data infrastructure, automated workflows, and customer-focused tools.",
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
    summary: "Developed high-performance battery analysis software and contributed to the architecture and product strategy of a data-driven SaaS platform.",
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
  { organization: "Competitive Programming Club", context: "Founder · Bentonville West", description: "Founded the club and led it to seven statewide and national awards." },
  { organization: "Science Olympiad", context: "Senior Captain · Bentonville West", description: "Led the team to three national qualifications and state awards." },
  { organization: "VEX Robotics", context: "Engineering & competition", description: "Arkansas State Innovate Award, two regional Innovate Awards, and World Championship qualification." },
  { organization: "Arkansas Hog Hacks", context: "Hackathon recognition", description: "Most Creative Award and sixth overall as a high-school team." },
] as const;

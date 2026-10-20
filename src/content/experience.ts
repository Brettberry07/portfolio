/** Approved résumé facts supplied by Brett in the October 2026 refinement brief. */
export type Experience = {
  company: string;
  location: string;
  dates: string;
  roles: readonly { title: string; dates: string }[];
  highlights: readonly string[];
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
    highlights: [
      "Developed human-in-the-loop, retrieval-augmented AI classification for HTS codes, customs filings, tariff-saving opportunities, and tariff-risk forecasting.",
      "Built data infrastructure for document processing, item management, and freight tracking, alongside a full-stack lead allocation tool with company search, scoring, and Apollo integration.",
      "Worked directly with clients to define requirements, led engineering planning, and coordinated technical implementation across projects.",
    ],
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
    highlights: [
      "Developed a battery-analysis web platform spanning multiple file formats and test types, with a high-performance calculation system.",
      "Contributed to SaaS planning, cloud storage architecture, and subscription pricing strategy—connecting engineering decisions with the product around them.",
    ],
    emphasis: { value: "1.2M+", label: "data points processed in under a second" },
    projectSlug: "potential-energy-tech",
  },
];

export const education = [
  {
    institution: "University of Arkansas",
    location: "Fayetteville",
    dates: "EXPECTED MAY 2030",
    qualification: "B.S. Computer Engineering",
    detail: "Minor in Innovation & Entrepreneurship",
    note: "4.0 GPA",
  },
  {
    institution: "Bentonville West High School",
    location: "",
    dates: "GRADUATED MAY 2026",
    qualification: "High Honors",
    detail: "Ignite Professional Studies · Technology Strand",
    note: "4.25 GPA",
  },
] as const;

export const leadership = [
  { organization: "RIOT Robotics", context: "University of Arkansas", description: "Developing a low-cost impact-detection vest for a local business." },
  { organization: "Competitive Programming Club", context: "Founder · Bentonville West", description: "Founded the club and led it to seven statewide and national awards." },
  { organization: "Science Olympiad", context: "Senior Captain · Bentonville West", description: "Led the team to three national qualifications and state awards." },
  { organization: "VEX Robotics", context: "Engineering & competition", description: "Arkansas State Innovate Award, two regional Innovate Awards, and World Championship qualification." },
  { organization: "Arkansas Hog Hacks", context: "Hackathon recognition", description: "Most Creative Award and sixth overall as a high-school team." },
] as const;

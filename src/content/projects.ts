/**
 * Canonical portfolio content. Project facts were supplied by Brett on 2026-10-20.
 * Fig additionally checked against the local Rust/fig and figlang documentation.
 * "verified" describes the source of the copy, never public deployment status.
 */
export type Project = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  category?: string;
  role?: string;
  period?: string;
  stage?: string;
  technologies: string[];
  toolsNote?: string;
  status: "draft" | "verified";
  heroImage?: string;
  overview?: string;
  problem?: string;
  approach?: string;
  solution?: string;
  results?: string;
  highlights?: { value: string; label: string }[];
  workflow?: { title: string; description: string }[];
  contentNote?: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "01", slug: "querry-berry", title: "Querry Berry",
    summary: "A custom search engine, from raw language to searchable data. Built around a lexer and an index of 2.3 million unique tokens collected by a custom async web crawler.",
    category: "Search & data systems", role: "Full-stack development", period: "June–July 2025", stage: "Search engineering project",
    technologies: ["Next.js", "PostgreSQL", "Docker"], status: "verified",
    overview: "Querry Berry is a full-stack search engine with a Next.js application and a Dockerized PostgreSQL backend. The project explores the complete path from crawling the web for links, to processing text, storing an index, and retrieving useful results.",
    problem: "Search depends on work that happens long before a query is entered. Text must be broken into useful units, indexed consistently, and organized so it can be retrieved. The challenge was to build that underlying system alongside the application people interact with.",
    approach: "I worked across the full stack: the web crawler,the search interface, backend data infrastructure, custom lexer, and indexing pipeline. The focus was understanding how those parts fit together rather than treating search as a frontend feature.",
    solution: "A custom lexer and indexing pipeline process text into searchable tokens. PostgreSQL provides the data foundation, Docker defines the backend environment, and Next.js connects the search experience to the retrieval system.",
    results: "The indexing pipeline handled more than 2.3 million unique tokens. The result is an end-to-end engineering project spanning language processing, data infrastructure, and search retrieval.",
    highlights: [{ value: "2.3M+", label: "unique tokens processed" }, { value: "Full stack", label: "interface, indexing & storage" }],
    workflow: [
      { title: "Tokenize", description: "Custom lexer processes the source text." },
      { title: "Index", description: "An indexing pipeline organizes unique tokens." },
      { title: "Retrieve", description: "Search connects the interface to stored data." },
    ],
    contentNote: "Original interface captures and a public repository link are still to be added. The visual above is an editorial illustration of the indexing concept.",
  },
  {
    id: "02", slug: "fig", title: "Fig",
    summary: "A scripting language built in Rust. A lexer, parser, evaluator, and small CLI make the journey from source code to execution visible.",
    category: "Language & developer tools", role: "Language & tooling development", stage: "Language development project",
    technologies: ["Rust", "Cargo", "VS Code syntax grammar"], status: "verified",
    overview: "Fig is a small scripting language implemented in Rust. It includes a lexer, parser, evaluator, and CLI that can run .fg files or scaffold a new Fig project.",
    problem: "Language design turns a compact piece of syntax into a chain of concrete decisions: how to recognize tokens, represent a program, resolve values, and execute it. Fig is a way to work directly with those boundaries and the tooling around them.",
    approach: "The implementation separates tokenization, parsing, evaluation, environments, and value types. I also developed a separate VS Code syntax-highlighting extension for .fg files.",
    solution: "The Rust project provides the language pipeline and the fig run and fig new CLI commands. A separate TextMate grammar and editor theme supply syntax highlighting in VS Code.",
    results: "The implementation connects source files to an evaluator and provides a small command-line workflow around the language. The companion extension contributes syntax highlighting.",
    highlights: [{ value: "Rust", label: "language implementation" }, { value: "Source → run", label: "lexer, parser & evaluator" }],
    workflow: [
      { title: "Lex", description: "Recognize the tokens in .fg source." },
      { title: "Parse", description: "Build a representation of the program." },
      { title: "Evaluate", description: "Execute through the interpreter and CLI." },
    ],
    contentNote: "Editor captures and public repository links are still to be added. The terminal is a concept illustration of the CLI workflow.",
  },
  {
    id: "03", slug: "tariff-ninja", title: "Tariff Ninja",
    summary: "Human-in-the-loop AI for trade classification, supported by data systems for 1.5 million+ items and client-facing engineering.",
    category: "AI & trade infrastructure", role: "Software Engineer → Lead Software Engineer", period: "February–September 2026", stage: "Professional engineering engagement",
    technologies: ["AI retrieval", "Data infrastructure", "Apollo integration"], status: "verified",
    toolsNote: "These are verified system capabilities and integrations. The underlying language and framework stack has not been specified.",
    overview: "At Tariff Ninja, I developed across AI-assisted classification, trade data infrastructure, and full-stack internal tools. I joined as a Software Engineer in February 2026 and progressed to Lead Software Engineer in July, concluding the engagement in September 2026.",
    problem: "Trade workflows combine complex classification decisions, changing tariff exposure, documents, freight information, and item records. Useful systems need to connect those moving parts while keeping people involved in decisions that require judgment.",
    approach: "I partnered directly with clients to define requirements and deliver features. As Lead Software Engineer, I led engineering planning, platform development, and technical implementation across projects while coordinating the engineering work.",
    solution: "I developed a human-in-the-loop retrieval-augmented classification system for HTS codes, tariff-saving opportunities, automated customs filings, and tariff-risk forecasting. I also worked on document processing, item management, and freight tracking, and built a full-stack lead allocation and qualification application with algorithmic company search, scoring, and Apollo integration.",
    results: "The data infrastructure supported more than 1.5 million items. The work combined technical scale, direct client collaboration, full-stack delivery, and increasing engineering responsibility.",
    highlights: [{ value: "1.5M+", label: "items supported by data infrastructure" }, { value: "Engineer → Lead", label: "role progression during 2026" }],
    workflow: [
      { title: "Understand", description: "Define workflows and requirements with clients." },
      { title: "Connect", description: "Bring item, document, and freight information together." },
      { title: "Classify", description: "Support trade decisions with AI and human review." },
    ],
    contentNote: "Client-approved interface captures, a detailed framework stack, and public links have not been supplied. The classification and freight illustration is conceptual.",
  },
  {
    id: "04", slug: "potential-energy-tech", title: "Potential Energy Tech",
    summary: "Battery analytics built for real test data. A calculation system processes 1.2 million+ data points in under a second.",
    category: "Battery analytics & product", role: "Software Engineer Intern", period: "January–May 2026", stage: "Professional internship",
    technologies: ["Battery analysis", "Calculation systems", "Cloud storage planning"], status: "verified",
    toolsNote: "The verified scope is the analytics platform and architecture work. Specific implementation libraries have not been supplied.",
    overview: "Potential Energy Tech is a battery-analysis web platform supporting multiple file formats and test types. My internship brought together performance engineering, technical product development, and the practical planning needed for a SaaS business.",
    problem: "Battery testing produces substantial datasets in different formats. A useful analysis platform needs to handle that variation while keeping calculation time short enough to support an efficient working experience.",
    approach: "I developed the web platform and engineered its calculation system, focusing on processing performance across battery-test data. Alongside implementation, I contributed to SaaS planning, cloud storage architecture, and subscription pricing strategy.",
    solution: "The platform brings battery data from multiple file formats and test types into a web-based analysis workflow. Its calculation system supports sub-second processing of more than 1.2 million data points, connecting technical performance with a practical product experience.",
    results: "The calculation system achieved sub-second processing of 1.2 million+ data points. My contribution also extended into cloud storage architecture and product and pricing planning.",
    highlights: [{ value: "< 1 second", label: "processing time" }, { value: "1.2M+", label: "data points processed" }],
    workflow: [
      { title: "Import", description: "Work across multiple file formats and test types." },
      { title: "Calculate", description: "Process substantial battery-test datasets quickly." },
      { title: "Analyze", description: "Bring the results into a web analysis platform." },
    ],
    contentNote: "Approved product screenshots and detailed implementation tools are still to be added. The cells and chart are illustrative, not a real test result.",
  },
  {
    id: "05", slug: "amazeum", title: "McMillon Innovation Studios & The Amazeum",
    summary: "Understanding how a growing organization picks, packs, and ships—and where practical operational improvements can make a difference.",
    category: "Operations & systems analysis", role: "Operational research & analysis", stage: "McMillon Innovation Studios engagement", period: "Fall 2026",
    technologies: ["Shopify", "Stock Savvy", "Workflow analysis"], status: "verified",
    toolsNote: "Shopify and Stock Savvy are systems involved in the organization's workflows, not software platforms built as part of this project.",
    overview: "Being apart of the McMillon Innovation Studios gave me the oppurtunity to collaborate with The Aamzeum, this project involves the Scott Family Amazeum in Bentonville and its fulfillment operations. As order volume grows, the work examines how picking, packing, inventory, and shipping workflows can scale with the organization.",
    problem: "Growth puts pressure on the details of daily operations: where inventory lives, how orders are picked, how packing flows, and how information moves between systems. Understanding those details comes before proposing a new tool or process.",
    approach: "The focus is stakeholder interviews, understanding warehouse workflows, and studying inventory handling and fulfillment processes. Shopify and Stock Savvy are part of the existing operational context.",
    solution: "The project translates operational findings into opportunities for practical improvement. It examines bottlenecks and the relationship between people, physical inventory, and the systems supporting picking, packing, and shipping.",
    results: "The project builds an understanding of fulfillment operations and identifies directions for practical improvement. The work remains focused on analysis; implementation and measured operational outcomes are still to be established.",
    highlights: [{ value: "People + systems", label: "stakeholders, inventory & fulfillment" }, { value: "Research first", label: "understanding before implementation" }],
    workflow: [
      { title: "Listen", description: "Interview stakeholders about daily operational needs." },
      { title: "Map", description: "Understand inventory, picking, packing, and shipping." },
      { title: "Improve", description: "Translate bottlenecks into practical opportunities." },
    ],
    contentNote: "An approved workflow map, research artifacts, and any implemented outcomes are still to be added. The warehouse drawing is a conceptual operational illustration.",
  },
  {
    id: "06", slug: "still-on", title: "Still On",
    summary: "A meeting companion that makes a simple question easier to answer: are we still on? An independent product and MVP project.",
    category: "Independent product / MVP", role: "Product thinking & development", stage: "Independent product / MVP",
    technologies: ["Expo / React Native", "TypeScript", "Supabase", "Calendar integrations"], status: "verified",
    toolsNote: "This is the project's technology direction. Calendar integrations and the features described are product concepts, not a claim that every integration is complete.",
    overview: "Still On is an independent meeting-companion product designed to reduce no-shows and make attendance confirmation easier. It explores how a quick check-in can replace an uncertain chain of messages before a meeting.",
    problem: "A calendar invitation does not always communicate whether people still plan to attend. Participants need a lightweight way to confirm, see a shared status, and communicate changes without adding more coordination work.",
    approach: "The project combines product discovery and technical implementation around the moment before a meeting. Its technology direction is Expo and React Native with TypeScript, Supabase, and calendar integrations.",
    solution: "The product and MVP scope includes quick meeting check-ins, push-notification confirmations, meeting-status visibility, and rescheduling workflows. Google and Microsoft calendar integration are part of the product direction. The aim is simpler communication between participants.",
    results: "Still On brings product thinking and technical implementation together around a focused coordination problem. It remains an independent product and MVP project, with feature and integration scope evolving through development.",
    highlights: [{ value: "One quick check-in", label: "the core product interaction" }, { value: "MVP", label: "independent product development" }],
    workflow: [
      { title: "Connect", description: "Calendar integration is part of the product direction." },
      { title: "Check in", description: "Make confirming attendance a quick interaction." },
      { title: "Coordinate", description: "Share status and make rescheduling simpler." },
    ],
    contentNote: "The phone visual is an illustrative UI concept, not a production screenshot. Feature completion, live integrations, and a public release link are still to be confirmed.",
  },
  {
    id: "07", slug: "city-of-bentonville-traffic", title: "City of Bentonville Traffic",
    summary: "Machine learning and traffic-data analysis in service of a community question: how could signal timing work better?",
    category: "Machine learning & civic research", role: "Model development, analysis & presentation", period: "November–December 2025", stage: "Civic research project",
    technologies: ["Machine learning", "Data analysis", "Data visualization"], status: "verified",
    toolsNote: "The underlying language and machine-learning libraries have not been specified.",
    overview: "This project used machine learning to analyze traffic patterns and evaluate traffic-signal timing improvements in Bentonville. It combined processing and visualizing traffic data with communicating the research to local decision-makers.",
    problem: "Signal timing is an engineering problem with a visible effect on everyday life. Traffic data can help evaluate opportunities, but the analysis also needs to be clear and useful to people making decisions about the community.",
    approach: "I developed a machine-learning model, processed and visualized traffic data, and translated the work into a presentation for a nontechnical audience.",
    solution: "A traffic-analysis model and supporting visualizations were used to explore traffic patterns and evaluate potential signal-timing improvements. The research and findings were presented to the City of Bentonville Traffic Department and the Mayor.",
    results: "The research reached the Traffic Department and Mayor through a direct presentation.",
    highlights: [{ value: "Data → decisions", label: "engineering for a community problem" }, { value: "City presentation", label: "Traffic Department & Mayor" }],
    workflow: [
      { title: "Process", description: "Prepare and visualize traffic data." },
      { title: "Model", description: "Analyze patterns and evaluate signal timing." },
      { title: "Communicate", description: "Present findings to local decision-makers." },
    ],
    contentNote: "Approved research charts, model details, and presentation visuals have not been supplied. The intersection graphic is conceptual and does not represent a measured traffic outcome.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Supply only Brett-approved assets and public profile links. Undefined fields stay honestly unavailable. */
export const siteAssets: {
  portrait?: { src: string; alt: string };
  resumeHref?: string;
  publicEmail?: string;
  socialLinks: readonly { label: string; href: string }[];
} = {
  // portrait: { src: "/images/about-brett.jpg", alt: "Brett Berry" },
  resumeHref: "/resume/brett-berry-resume.pdf",
  socialLinks: [],
};

/** Supply only Brett-approved assets and public profile links. Undefined fields stay honestly unavailable. */
export const siteAssets: {
  portrait?: { src: string; alt: string };
  resumeHref?: string;
  publicEmail?: string;
  socialLinks: readonly { label: string; href: string }[];
} = {
  // portrait: { src: "/images/about-brett.jpg", alt: "Brett Berry" },
  resumeHref: "/resume/brett-berry-resume.pdf",
  publicEmail: "brettberry07@gmail.com",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/Brettberry07" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/brett-berry-a81b29329/" },
  ],
};

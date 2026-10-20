import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const display = localFont({ src: "../../public/fonts/inter-tight-latin.woff2", variable: "--font-display", weight: "400 700", display: "swap" });
const mono = localFont({ src: "../../public/fonts/dm-mono-latin.woff2", variable: "--font-mono", weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Brett Berry — Building what's next.", template: "%s — Brett Berry" },
  description: "Brett Berry. A multidisciplinary portfolio at the intersection of engineering, product, and practical problem-solving. Building what's next.",
  openGraph: { title: "Brett Berry — Building what's next.", description: "Engineering, product, and practical problem-solving. Explore selected work by Brett Berry.", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${mono.variable}`}><body><SmoothScroll>{children}</SmoothScroll></body></html>;
}

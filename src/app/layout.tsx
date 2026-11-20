import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteUrl } from "@/content/site";
import "./globals.css";

const display = localFont({ src: "../../public/fonts/inter-tight-latin.woff2", variable: "--font-display", weight: "400 700", display: "swap" });
const mono = localFont({ src: "../../public/fonts/dm-mono-latin.woff2", variable: "--font-mono", weight: "400", display: "swap" });
const title = "Brett Berry · Software Engineer";
const description = "Software engineering portfolio of Brett Berry. Explore work in tariff classification, traffic signal modeling, and mobile product development.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s — Brett Berry" },
  description,
  openGraph: { title, description, type: "website", siteName: "Brett Berry" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${mono.variable}`}><body><noscript><style>{`.entrance{transform:none!important;clip-path:none!important}`}</style></noscript>{children}</body></html>;
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brett Berry | Developer & Engineer",
  description:
    "Building Solutions, Not Just Software. Portfolio of Brett Berry - a developer focused on crafting exceptional digital experiences.",
  keywords: [
    "developer",
    "engineer",
    "portfolio",
    "web development",
    "frontend",
    "react",
    "next.js",
  ],
  authors: [{ name: "Brett Berry" }],
  openGraph: {
    title: "Brett Berry | Developer & Engineer",
    description: "Building Solutions, Not Just Software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScrollProvider>
          {/* Grain overlay */}
          <div className="grain" aria-hidden="true" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

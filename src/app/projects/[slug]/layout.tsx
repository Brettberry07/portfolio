import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export default function CaseStudyLayout({ children }: { children: ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}

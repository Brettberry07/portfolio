import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import "./ways-i-work.css";

export function WaysIWork() {
  return <div className="approach" aria-labelledby="approach-title">
    <header><h3 className="section-title-small" id="approach-title">From conversation to system.</h3><p className="mono">IN PRACTICE / TARIFF NINJA</p></header>
    <ol className="approach-steps">
      <li><span className="mono">01 / PROBLEM</span><p>Customs teams need to connect classifications, documents, freight, and item records.</p></li>
      <li><span className="mono">02 / DECISION</span><p>I worked with clients to define requirements, then built AI-assisted classification with human review.</p></li>
      <li><span className="mono">03 / EVIDENCE</span><p>Infrastructure supporting <strong>1.5 million+ items</strong>; promoted from Software Engineer to Lead Software Engineer.</p></li>
    </ol>
    <Link className="quiet-link" href="/projects/tariff-ninja">Read the case study <ArrowUpRight size={20} /></Link>
  </div>;
}

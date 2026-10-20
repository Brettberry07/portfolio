import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./case-studies.css";

export default function ProjectNotFound() {
  return (
    <main className="case-not-found">
      <span className="case-label">404 / PROJECT NOT FOUND</span>
      <h1>A different<br />direction.</h1>
      <p>This project isn’t in the archive.</p>
      <Link className="case-back" href="/#projects"><ArrowLeft size={17} aria-hidden="true" /> Explore selected work</Link>
    </main>
  );
}

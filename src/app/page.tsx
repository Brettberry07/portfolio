import { MotionProof } from "@/components/motion/MotionProof";
import { ScenePreview } from "@/components/three/ScenePreview";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:px-12 sm:py-16">
      <header className="preview-header">
        <span>BB / PORTFOLIO</span>
        <span>01 — FOUNDATION</span>
      </header>
      <section className="intro" aria-labelledby="name">
        <p className="eyebrow">Technical preview · Step 1</p>
        <h1 id="name">BRETT BERRY</h1>
        <p className="tagline">Building what&apos;s next.</p>
        <p className="description">
          A small working study of the portfolio&apos;s rendering and motion systems.
          The final design comes next.
        </p>
      </section>
      <section className="proof-grid" aria-label="Rendering and motion previews">
        <figure className="scene-panel">
          <ScenePreview />
          <figcaption><span>01 / WEBGL</span> Procedural frame study</figcaption>
        </figure>
        <MotionProof />
      </section>
      <footer className="preview-footer">
        <p>Foundation only. No projects or contact form yet.</p>
        <p>Next.js · Motion · React Three Fiber</p>
      </footer>
    </main>
  );
}

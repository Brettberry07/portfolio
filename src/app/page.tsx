import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import WhoAmI from "@/components/sections/WhoAmI";
import NameReveal from "@/components/sections/NameReveal";
import About from "@/components/sections/About";
import ProofTransition from "@/components/sections/ProofTransition";
import Proof from "@/components/sections/Proof";
import Projects from "@/components/sections/Projects";
import ContactTransition from "@/components/sections/ContactTransition";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <section id="about">
          <WhoAmI />
          <NameReveal />
          <About />
        </section>
        <section id="work">
          <ProofTransition />
          <Proof />
          <Projects />
        </section>
        <section id="contact">
          <ContactTransition />
          <Contact />
        </section>
      </main>
    </>
  );
}

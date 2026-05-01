import { useEffect, useRef } from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import PhysicsTags from "./components/PhysicsTags";
import "./App.css";

const App = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const introTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      introTimeline
        .from(".intro-mark", {
          opacity: 0,
          scale: 0.65,
          duration: 0.7,
        })
        .from(
          ".hero-intro__text",
          {
            opacity: 0,
            y: 28,
            duration: 0.85,
          },
          "-=0.4",
        )
        .from(
          ".resume-pill",
          {
            opacity: 0,
            y: -18,
            duration: 0.8,
          },
          "-=0.65",
        )
        .from(
          ".physics-tags-container",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3",
        )
        .from(
          ".hero-name__text",
          {
            opacity: 0,
            yPercent: 20,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.25",
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="portfolio-page">
      <div className="page-noise" aria-hidden="true" />

      <header className="hero-header">
        <div className="hero-intro">
          <span className="intro-mark" aria-hidden="true">
            <ArrowDownLeft size={18} strokeWidth={1.7} />
          </span>
          <p className="hero-intro__text">
            Product designer who actually gives a fu*k about the product.
          </p>
        </div>

        <a className="resume-pill" href="#">
          View Resume
          <ArrowUpRight size={18} strokeWidth={1.75} />
        </a>
      </header>

      {/* Physics playground — tags fall, collide, and rest on the line above the name */}
      <section className="hero-stage" aria-label="Highlights">
        <PhysicsTags />
      </section>

      <section className="hero-name" aria-label="Name">
        <h1 className="hero-name__text">Ishant Sinha</h1>
      </section>
    </main>
  );
};

export default App;

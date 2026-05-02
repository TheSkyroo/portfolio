import { useEffect, useRef } from "react";
import { CornerDownRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import PortfolioChat from "./components/PortfolioChat";
import PhysicsTags from "./components/PhysicsTags";
import CustomCursor from "./components/CustomCursor";
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
        )
        .from(
          ".snapshot-section",
          {
            opacity: 0,
            y: 42,
            duration: 0.9,
          },
          "-=0.3",
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="portfolio-page">
      <CustomCursor />
      <div className="page-noise" aria-hidden="true" />
      <PortfolioChat />

      <header className="hero-header">
        <div className="hero-intro">
          <span className="intro-mark" aria-hidden="true">
            <CornerDownRight size={18} strokeWidth={2} />
          </span>
          <p className="hero-intro__text">Engineer who knows how to cook.</p>
        </div>

        <a
          className="resume-pill"
          target="_blank"
          href="https://drive.google.com/file/d/1EHxskocqcvlWY15GOlQYolY3-gvh7EAS/view?usp=sharing"
        >
          View Resume
          <ArrowUpRight size={20} strokeWidth={1.75} />
        </a>
      </header>

      {/* Physics playground — tags fall, collide, and rest on the line above the name */}
      <section className="hero-stage" aria-label="Highlights">
        <PhysicsTags />
      </section>

      <section className="hero-name" aria-label="Name">
        <h1 className="hero-name__text">
          <span className="hero-name__code">console.log</span>
          <span className="hero-name__quotes">("</span>
          <span className="hero-name__inner">Ishant Sinha</span>
          <span className="hero-name__quotes">")</span>
        </h1>
      </section>

      <section className="snapshot-section" aria-label="Intro snapshot">
        <div className="snapshot-section__accent" aria-hidden="true">
          <span className="snapshot-section__ring" />
          <span className="snapshot-section__arrow">
            <CornerDownRight size={22} strokeWidth={1.6} />
          </span>
        </div>

        <div className="snapshot-section__headline">
          <p>
            Hi, I&apos;m Ishant. I build clean, fast products that make complexity feel
            simple.
          </p>
        </div>

        <div className="snapshot-section__copy">
          <p>
            Full-stack developer focused on React, Next.js, Node.js, product
            thinking, performance, and interfaces that feel sharp without being
            overdesigned.
          </p>
        </div>
      </section>
    </main>
  );
};

export default App;

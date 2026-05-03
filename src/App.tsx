import { useEffect, useRef, useState } from "react";
import { CornerDownRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import PortfolioChat from "./components/PortfolioChat";
import PhysicsTags from "./components/PhysicsTags";
import CustomCursor from "./components/CustomCursor";
import FeatureBento from "./components/FeatureBento";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import "./App.css";

const App = () => {
  const rootRef = useRef<HTMLElement>(null);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const breakpointKey =
    windowWidth < 400 ? "verysmall" : windowWidth < 560 ? "small" : "desktop";

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
          "-=0.35",
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="portfolio-page">
      <CustomCursor />
      <div className="page-noise" aria-hidden="true" />
      <PortfolioChat />

      <a
        href="https://drive.google.com/file/d/1EHxskocqcvlWY15GOlQYolY3-gvh7EAS/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-resume-pill"
      >
        <span className="resume-pill-view-text">View </span>Resume
        <ArrowUpRight size={14} strokeWidth={1.5} />
      </a>

      <header className="hero-header mt-2">
        <div className="hero-intro">
          <CornerDownRight size={18} strokeWidth={2} className="opacity-50" />
          <p className="hero-intro__text">Engineer who knows how to cook.</p>
        </div>
      </header>

      {/* Physics playground — tags fall, collide, and rest on the line above the name */}
      <section className="hero-stage" aria-label="Highlights">
        <PhysicsTags key={breakpointKey} />
      </section>

      <section className="hero-name" aria-label="Name">
        <h1 className="hero-name__text">
          <span className="hero-name__code">console.log</span>
          <span className="hero-name__quotes">("</span>
          <span className="hero-name__inner">Ishant Sinha</span>
          <span className="hero-name__quotes">")</span>
        </h1>
      </section>

      <hr className="section-divider" />

      <section className="snapshot-section" aria-label="Intro snapshot">
        <div className="snapshot-section__accent" aria-hidden="true">
          <span className="snapshot-section__arrow">
            <CornerDownRight size={22} strokeWidth={1.6} />
          </span>
        </div>

        <div className="snapshot-section__headline mb-16">
          <p>
            Hi, I&apos;m Ishant. I build clean, fast products that make
            complexity feel simple.
          </p>
        </div>

        <div className="snapshot-section__copy mb-16">
          <p>
            Full-stack developer building scalable, real-time applications with
            React, Next.js, and Node.js, with a focus on performance, system
            design, and AI-powered features
          </p>
        </div>

        <hr className="section-divider" />
        <FeatureBento />

        <hr className="section-divider" />
        <Skills />
      </section>

      <hr className="section-divider" />
      <Footer className="!mt-14" />
    </main>
  );
};

export default App;

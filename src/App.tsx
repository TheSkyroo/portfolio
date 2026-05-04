import { useEffect, useRef, useState } from "react";
import { CornerDownRight, ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import PortfolioChat from "./components/PortfolioChat";
import PhysicsTags from "./components/PhysicsTags";
import CustomCursor from "./components/CustomCursor";
import FeatureBento from "./components/FeatureBento";
import Footer from "./components/Footer";
import Skills from "./components/Skills";
import ReadersRobin from "./components/ReadersRobin";
import Streamify from "./components/Streamify";
import CollegeConnection from "./components/CollegeConnection";
import MemeLab from "./components/MemeLab";
import "./App.css";

const App = () => {
  const rootRef = useRef<HTMLElement>(null);
  const [showReadersRobin, setShowReadersRobin] = useState(false);
  const [showStreamify, setShowStreamify] = useState(false);
  const [showCollegeConnection, setShowCollegeConnection] = useState(false);
  const [showMemeLab, setShowMemeLab] = useState(false);

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
    if (showReadersRobin || showStreamify || showCollegeConnection || showMemeLab) return; // Don't run intro animations if details are shown

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
  }, [showReadersRobin, showStreamify, showCollegeConnection, showMemeLab]);

  useEffect(() => {
    if (showReadersRobin || showStreamify || showCollegeConnection || showMemeLab) {
      window.scrollTo(0, 0);
    }
  }, [showReadersRobin, showStreamify, showCollegeConnection, showMemeLab]);

  return (
    <main ref={rootRef} className="portfolio-page">
      <CustomCursor />
      <div className="page-noise" aria-hidden="true" />

      {showReadersRobin ? (
        <div className="relative">
          <button
            onClick={() => setShowReadersRobin(false)}
            className="fixed top-10 right-10 z-[100] p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all group"
            aria-label="Close details"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <ReadersRobin />
        </div>
      ) : showStreamify ? (
        <div className="relative">
          <button
            onClick={() => setShowStreamify(false)}
            className="fixed top-10 right-10 z-[100] p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all group"
            aria-label="Close details"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <Streamify />
        </div>
      ) : showCollegeConnection ? (
        <div className="relative">
          <button
            onClick={() => setShowCollegeConnection(false)}
            className="fixed top-10 right-10 z-[100] p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all group"
            aria-label="Close details"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <CollegeConnection />
        </div>
      ) : showMemeLab ? (
        <div className="relative">
          <button
            onClick={() => setShowMemeLab(false)}
            className="fixed top-10 right-10 z-[100] p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all group"
            aria-label="Close details"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <MemeLab />
        </div>
      ) : (
        <>
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
            <FeatureBento 
              onOpenReadersRobin={() => setShowReadersRobin(true)} 
              onOpenStreamify={() => setShowStreamify(true)}
              onOpenCollegeConnection={() => setShowCollegeConnection(true)}
              onOpenMemeLab={() => setShowMemeLab(true)}
            />

            <hr className="section-divider" />
            <Skills />
          </section>

          <hr className="section-divider" />
          <Footer className="!mt-14" />
        </>
      )}
    </main>
  );
};

export default App;

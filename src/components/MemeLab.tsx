import { useEffect } from "react";
import { ArrowUpRight, Camera, Code, Cpu, Hand, Layers, Layout, Monitor, Sparkles, User } from "lucide-react";
import PhilosophySection from "./PhilosophySection";

const MemeLab = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-[#f2ede5] p-6 md:p-12 lg:p-20 font-sans selection:bg-white/10 selection:text-white">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-4 space-y-6">
        <h1 className="font-display text-6xl font-medium tracking-tighter text-white sm:text-7xl lg:text-8xl text-center">
          <span className="text-white/40">Meme</span> Lab
        </h1>
        <p className="appDetails-section__copy mt-5 text-center">
          An interactive, browser-based experience that transforms your physical
          gestures into a real-time meme reaction board using computer vision.
          Built with Vanilla JavaScript and Google MediaPipe Holistic, Meme Lab
          draws a real-time, futuristic blue wireframe over your body, acting as
          a custom gesture-recognition engine.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-4">
        {/* Core Concept & Architecture */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-start mt-1">
            <PhilosophySection
              title="Core Philosophy"
              items={[
                {
                  icon: <User />,
                  text: "Full body landmark tracking for expressive interaction",
                },
                {
                  icon: <Hand />,
                  text: "Precise finger-point and gesture detection",
                },
                {
                  icon: <Monitor />,
                  text: "Futuristic blue wireframe overlay visualization",
                },
                {
                  icon: <Layout />,
                  text: "Instant meme image injection based on triggers",
                },
                {
                  icon: <Cpu />,
                  text: "Lightweight, zero-framework Vanilla JS implementation",
                },
              ]}
            />

            <PhilosophySection
              title="Technical Specification"
              items={[
                { icon: <Cpu />, text: "Client-side MediaPipe Inference" },
                {
                  icon: <Monitor />,
                  text: "High-FPS Canvas Wireframe Rendering",
                },
                {
                  icon: <Sparkles />,
                  text: "Interactive Real-time Visual Cues",
                },
                { icon: <Layers />, text: "Layered Low-latency Canvas System" },
                { icon: <Camera />, text: "Webcam Stream Landmark Extraction" },
                {
                  icon: <Code />,
                  text: "Zero-dependency Vanilla Architecture",
                },
              ]}
            />
          </div>
        </section>

        {/* Development Status */}
        <section className="space-y-6 mt-4">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl text-center">
            <span className="text-white/40">Development</span> Status
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl font-sans mx-auto text-center">
              Meme Lab is a fully functional experimental project showcasing the
              power of browser-based computer vision without the overhead of
              heavy frameworks. It demonstrates real-time physical interaction
              and gesture-based control in a purely client-side environment.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Computer Vision",
                "MediaPipe",
                "Vanilla JS",
                "Gestures",
                "Interactive",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[0.65rem] font-mono uppercase tracking-[0.2em] text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <a
                href="https://fahhhhhhhh.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/20 bg-[#f2ede5] !text-[#090909] font-semibold  transition-all hover:scale-105 active:scale-95"
              >
                Visit Live Site
                <ArrowUpRight
                  size={20}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href="https://github.com/TheSkyroo/fahhhhhhhh"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
              >
                Source Code
                <ArrowUpRight
                  size={20}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-20 pt-12 border-t border-white/5 text-center text-white/20 text-xs font-mono uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} Meme Lab Case Study
      </footer>
    </div>
  );
};

export default MemeLab;

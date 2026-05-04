import { useEffect } from "react";
import { ArrowUpRight, Code, Cpu, Globe, Layers, Layout, MessageSquare, Palette, ShieldCheck, Video, Zap } from "lucide-react";
import PhilosophySection from "./PhilosophySection";

const Streamify = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-[#f2ede5] p-6 md:p-12 lg:p-20 font-sans selection:bg-white/10 selection:text-white">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-4 space-y-6">
        <h1 className="font-display text-6xl font-medium tracking-tighter text-white sm:text-7xl lg:text-8xl text-center">
          <span className="text-white/40">Streamify</span> Engine
        </h1>
        <p className="appDetails-section__copy mt-5 text-center">
          A high-performance communication engine facilitating HD video calls and
          sub-second latency messaging, built for the modern web. Engineered
          with scalability in mind, utilizing React 19 and the Stream SDK to
          provide a production-ready communication experience with premium
          UI/UX.
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
                  icon: <ShieldCheck />,
                  text: "Robust multi-step onboarding flow for secure entry",
                },
                {
                  icon: <Palette />,
                  text: "Dynamic theme engine for personalized experiences",
                },
                {
                  icon: <Video />,
                  text: "Premium UI/UX tailored for high-performance video",
                },
                {
                  icon: <MessageSquare />,
                  text: "Highly scalable messaging architecture",
                },
                {
                  icon: <Cpu />,
                  text: "React 19 optimized for performance and stability",
                },
              ]}
            />

            <PhilosophySection
              title="Technical Specification"
              items={[
                { icon: <Video />, text: "High-Performance WebRTC Video Engine" },
                { icon: <Zap />, text: "Sub-second Latency Messaging Backbone" },
                { icon: <Globe />, text: "Globally Distributed Edge Infrastructure" },
                { icon: <ShieldCheck />, text: "Enterprise-grade Auth & Encryption" },
                { icon: <Layout />, text: "Responsive Premium React 19 Frontend" },
                { icon: <Palette />, text: "Advanced Dynamic Theme Management" },
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
              Streamify is a production-ready application showcasing the
              intersection of scalability and premium design. It features a
              complete communication suite with advanced theme management and
              globally distributed infrastructure.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "React 19",
                "Stream SDK",
                "WebRTC",
                "Scalability",
                "Premium UX",
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
                href="https://streamify-pvt-1.onrender.com/"
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
                href="https://github.com/TheSkyroo/streamify_PVT"
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
        &copy; {new Date().getFullYear()} Streamify Case Study
      </footer>
    </div>
  );
};

export default Streamify;

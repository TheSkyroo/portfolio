import { useEffect } from "react";
import { ArrowUpRight, Camera, Code, Cpu, Eye, Hand, Layers, Layout, Monitor, Sparkles, User } from "lucide-react";

const MemeLab = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white p-6 md:p-12 lg:p-20 font-sans selection:bg-white selection:text-black">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-20 space-y-6 text-center md:text-left">
        <h1 className="detail_Header__text">Meme Lab</h1>
        <p className="appDetails-section__copy mt-5">
          An interactive, browser-based experience that transforms your physical
          gestures into a real-time meme reaction board using computer vision.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-24">
        {/* Core Concept & Architecture */}
        <section className="space-y-24">
          <div className="space-y-8">
            <h2 className="font-display text-4xl mt-20 mb-20 font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl">
              <span className="text-white/40">The</span> Engine
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl">
              Built with Vanilla JavaScript and Google MediaPipe Holistic, Meme
              Lab draws a real-time, futuristic blue wireframe over your body,
              acting as a custom gesture-recognition engine.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Eye className="mb-6 text-blue-400" />
                <h3 className="text-xl font-medium mb-2">Holistic Tracking</h3>
                <p className="text-white/50 leading-relaxed">
                  Real-time tracking of body, hands, and face landmarks with
                  sub-millisecond precision.
                </p>
              </div>
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Camera className="mb-6 text-purple-400" />
                <h3 className="text-xl font-medium mb-2">Gesture Engine</h3>
                <p className="text-white/50 leading-relaxed">
                  Custom logic to translate physical movements into specific
                  meme triggers.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-semibold flex items-center gap-3">
              <Sparkles className="text-blue-500" />
              Core Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: <User size={20} />,
                  text: "Full body landmark tracking for expressive interaction",
                },
                {
                  icon: <Hand size={20} />,
                  text: "Precise finger-point and gesture detection",
                },
                {
                  icon: <Monitor size={20} />,
                  text: "Futuristic blue wireframe overlay visualization",
                },
                {
                  icon: <Layout size={20} />,
                  text: "Instant meme image injection based on triggers",
                },
                {
                  icon: <Cpu size={20} />,
                  text: "Lightweight, zero-framework Vanilla JS implementation",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-6 rounded-2xl hover:bg-white/5 transition-colors border border-white/5 hover:border-white/10 bg-white/[0.02]"
                >
                  <span className="text-white/40 mt-1">{item.icon}</span>
                  <span className="text-white/80 leading-relaxed">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specification */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold flex items-center gap-3 justify-center">
            <Code className="text-blue-500" />
            Technical Specification
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-bold text-white/90 mb-4 text-center md:text-left">
                Tech Stack
              </h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex justify-between">
                  <span>Core</span>{" "}
                  <span className="text-white/40 text-xs">
                    Vanilla JavaScript
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Vision</span>{" "}
                  <span className="text-white/40 text-xs">
                    MediaPipe Holistic
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Markup</span>{" "}
                  <span className="text-white/40 text-xs">HTML5 / CSS3</span>
                </li>
                <li>Real-time Canvas Rendering</li>
                <li>Low-latency webcam streaming</li>
                <li>Dynamic Image Injection</li>
              </ul>
            </div>

            <div className="space-y-6 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-bold text-white/90 mb-4 flex items-center gap-2">
                <Cpu size={18} /> Processing & Design
              </h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <Cpu size={14} className="text-blue-500/50" />
                  Client-side inference for privacy
                </li>
                <li className="flex items-center gap-2">
                  <Monitor size={14} className="text-green-500/50" />
                  High-FPS wireframe rendering
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles size={14} className="text-yellow-500/50" />
                  Interactive visual feedback
                </li>
                <li className="flex items-center gap-2">
                  <Layers size={14} className="text-red-500/50" />
                  Layered Canvas architecture
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Development Status */}
        <section className="p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/5 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <h2 className="text-2xl font-semibold">Development Status</h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Meme Lab is a fully functional experimental project showcasing the
            power of browser-based computer vision without the overhead of heavy
            frameworks.
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
                className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <a
              href="https://fahhhhhhhh.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              Visit Live Site
              <ArrowUpRight size={20} />
            </a>
            <a
              href="https://github.com/TheSkyroo/fahhhhhhhh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              Source Code
              <ArrowUpRight size={20} />
            </a>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-32 pt-12 border-t border-white/5 text-center text-white/20 text-sm">
        &copy; {new Date().getFullYear()} Meme Lab Case Study
      </footer>
    </div>
  );
};

export default MemeLab;

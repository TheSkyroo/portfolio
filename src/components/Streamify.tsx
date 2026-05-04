import { useEffect } from "react";
import { ArrowUpRight, Code, Cpu, Globe, Layers, Layout, MessageSquare, Palette, ShieldCheck, Video, Zap } from "lucide-react";

const Streamify = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white p-6 md:p-12 lg:p-20 font-sans selection:bg-white selection:text-black">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-20 space-y-6 text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          Streamify
        </h1>
        <p className="text-xl md:text-2xl text-white/60 max-w-3xl leading-relaxed">
          A high-performance communication engine facilitating HD video calls and sub-second latency messaging, built for the modern web.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-24">
        {/* Core Concept & Architecture */}
        <section className="space-y-24">
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold flex items-center gap-3">
              <Layers className="text-blue-500" />
              The Engine
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl">
              Streamify is engineered with scalability in mind, utilizing React 19 and the Stream SDK to provide a production-ready communication experience with premium UI/UX.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Video className="mb-6 text-blue-400" />
                <h3 className="text-xl font-medium mb-2">HD Video Calls</h3>
                <p className="text-white/50 leading-relaxed">Crystal clear video communication powered by Stream SDK infrastructure.</p>
              </div>
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Zap className="mb-6 text-yellow-400" />
                <h3 className="text-xl font-medium mb-2">Real-time Messaging</h3>
                <p className="text-white/50 leading-relaxed">Sub-second latency for seamless text-based conversations.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-semibold flex items-center gap-3">
              <Code className="text-blue-500" />
              Core Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: <ShieldCheck size={20} />, text: "Robust multi-step onboarding flow for secure entry" },
                { icon: <Palette size={20} />, text: "Dynamic theme engine for personalized experiences" },
                { icon: <Video size={20} />, text: "Premium UI/UX tailored for high-performance video" },
                { icon: <MessageSquare size={20} />, text: "Highly scalable messaging architecture" },
                { icon: <Cpu size={20} />, text: "React 19 optimized for performance and stability" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl hover:bg-white/5 transition-colors border border-white/5 hover:border-white/10 bg-white/[0.02]">
                  <span className="text-white/40 mt-1">{item.icon}</span>
                  <span className="text-white/80 leading-relaxed">{item.text}</span>
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
              <h3 className="text-xl font-bold text-white/90 mb-4">Frontend Technologies</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex justify-between"><span>React</span> <span className="text-white/40 text-xs">19.0.0</span></li>
                <li className="flex justify-between"><span>Stream SDK</span> <span className="text-white/40 text-xs">Latest</span></li>
                <li className="flex justify-between"><span>Tailwind CSS</span> <span className="text-white/40 text-xs">Modern</span></li>
                <li>Framer Motion Animations</li>
                <li>Responsive Layouts</li>
                <li>Dynamic Theme Handling</li>
              </ul>
            </div>

            <div className="space-y-6 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-bold text-white/90 mb-4">Features & Services</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <Globe size={14} className="text-blue-500/50" />
                  Globally distributed edge network
                </li>
                <li className="flex items-center gap-2">
                  <Video size={14} className="text-green-500/50" />
                  WebRTC Video Infrastructure
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-purple-500/50" />
                  Persistent Chat History
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-red-500/50" />
                  Enterprise-grade Authentication
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
            Streamify is a production-ready application showcasing the intersection of scalability and premium design. It features a complete communication suite with advanced theme management.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
             {["React 19", "Stream SDK", "WebRTC", "Scalability", "Premium UX"].map(tag => (
               <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/40">
                 {tag}
               </span>
             ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <a
              href="https://streamify-pvt-1.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              Visit Live Site
              <ArrowUpRight size={20} />
            </a>
            <a
              href="https://github.com/TheSkyroo/streamify_PVT"
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
        &copy; {new Date().getFullYear()} Streamify Case Study
      </footer>
    </div>
  );
};

export default Streamify;

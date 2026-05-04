import { useEffect } from "react";
import { ArrowUpRight, Code, Cpu, Globe, Layers, Layout, MessageSquare, Palette, ShieldCheck, Video, Zap } from "lucide-react";

const Streamify = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-[#f2ede5] p-6 md:p-12 lg:p-20 font-sans selection:bg-white/10 selection:text-white">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-20 space-y-6">
        <h1 className="detail_Header__text">Streamify</h1>
        <p className="appDetails-section__copy mt-5">
          A high-performance communication engine facilitating HD video calls and sub-second latency messaging, built for the modern web.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-32">
        {/* Core Concept & Architecture */}
        <section>
          <div className="space-y-12">
            <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl">
              <span className="text-white/40">The</span> Engine
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl font-sans">
              Streamify is engineered with scalability in mind, utilizing React 19 and the Stream SDK to provide a production-ready communication experience with premium UI/UX.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="group p-8 rounded-2xl border border-white/10 bg-zinc-950/50 backdrop-blur-sm hover:bg-zinc-900/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Video className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-sans font-medium mb-3">HD Video Calls</h3>
                <p className="text-white/50 leading-relaxed font-sans">Crystal clear video communication powered by Stream SDK infrastructure.</p>
              </div>
              <div className="group p-8 rounded-2xl border border-white/10 bg-amber-500/5 backdrop-blur-sm hover:bg-amber-500/10 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="text-amber-400" />
                </div>
                <h3 className="text-2xl font-sans font-medium mb-3">Real-time Messaging</h3>
                <p className="text-white/50 leading-relaxed font-sans">Sub-second latency for seamless text-based conversations.</p>
              </div>
            </div>
          </div>

          <div className="mt-32 space-y-12">
            <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl">
              <span className="text-white/40">Core</span> Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: <ShieldCheck size={20} />, text: "Robust multi-step onboarding flow for secure entry" },
                { icon: <Palette size={20} />, text: "Dynamic theme engine for personalized experiences" },
                { icon: <Video size={20} />, text: "Premium UI/UX tailored for high-performance video" },
                { icon: <MessageSquare size={20} />, text: "Highly scalable messaging architecture" },
                { icon: <Cpu size={20} />, text: "React 19 optimized for performance and stability" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-xl hover:bg-white/5 transition-all border border-white/5 hover:border-white/10 bg-white/[0.02]">
                  <span className="text-white/40 mt-1">{item.icon}</span>
                  <span className="text-white/80 leading-relaxed font-sans">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specification */}
        <section className="space-y-16">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl text-center">
            <span className="text-white/40">Technical</span> Specification
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8 p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-mono uppercase tracking-[0.2em] text-white/40 mb-8">Frontend Technologies</h3>
              <ul className="space-y-6">
                {[
                  { label: "React", value: "19.0.0" },
                  { label: "SDK", value: "Stream Video" },
                  { label: "Styling", value: "Tailwind CSS" },
                  { label: "Animation", value: "Framer Motion" },
                  { label: "Layouts", value: "Responsive" },
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <span className="text-white/50 font-sans">{item.label}</span>
                    <span className="text-white font-mono text-sm">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8 p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-mono uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center gap-3">
                <Code size={18} /> Features & Services
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: <Globe size={16} className="text-blue-500" />, title: "Edge Network", desc: "Globally distributed infrastructure" },
                  { icon: <Video size={16} className="text-emerald-500" />, title: "WebRTC", desc: "High-performance video engine" },
                  { icon: <MessageSquare size={16} className="text-purple-500" />, title: "Persistence", desc: "Reliable chat history storage" },
                  { icon: <ShieldCheck size={16} className="text-rose-500" />, title: "Security", desc: "Enterprise-grade authentication" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/5">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <div className="text-white font-medium font-sans">{item.title}</div>
                      <div className="text-white/40 text-sm font-sans">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Development Status */}
        <section className="p-12 md:p-20 rounded-[3rem] border border-white/10 bg-zinc-950 text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-display font-medium tracking-tight text-white">Development Status</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed font-sans">
              Streamify is a production-ready application showcasing the intersection of scalability and premium design. It features a complete communication suite with advanced theme management.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
               {["React 19", "Stream SDK", "WebRTC", "Scalability", "Premium UX"].map(tag => (
                 <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[0.65rem] font-mono uppercase tracking-[0.2em] text-white/40">
                   {tag}
                 </span>
               ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-10">
              <a
                href="https://streamify-pvt-1.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#f2ede5] text-[#090909] font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                Visit Live Site
                <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/TheSkyroo/streamify_PVT"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
              >
                Source Code
                <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-32 pt-12 border-t border-white/5 text-center text-white/20 text-xs font-mono uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} Streamify Case Study
      </footer>
    </div>
  );
};

export default Streamify;

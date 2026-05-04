import { useEffect } from "react";
import { ArrowUpRight, Book, Code, Cpu, Database, Globe, Layers, Layout, Server, Share2, Sparkles, UserCheck, X } from "lucide-react";
import clsx from "clsx";

const ReadersRobin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-white/10 selection:text-white font-sans">
      {/* Background Noise/Gradients */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.02)_0%,transparent_50%)]" />

      <main className="relative max-w-6xl mx-auto px-6 py-20 md:px-12 lg:py-32">
        {/* Header Section */}
        <header className="mb-32 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
            <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            Social Reading Platform
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9]">
            Reader&apos;s <span className="text-white/40 italic">Robin</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 max-w-3xl leading-tight font-light tracking-tight">
            A full-stack social reading ecosystem built with Next.js and Express. Bridging the gap between book discovery and AI-powered learning.
          </p>
        </header>

        <div className="space-y-40">
          {/* Architecture Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
              <h2 className="font-display text-4xl md:text-5xl tracking-tighter">The <span className="text-white/40">Ecosystem</span></h2>
              <p className="text-white/40 leading-relaxed font-light">
                Designed as a reader-first product, split into two standalone high-performance applications.
              </p>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500 group">
                <Layout className="mb-10 text-white/20 group-hover:text-white/60 transition-colors" size={32} />
                <h3 className="font-display text-3xl mb-4">Frontend</h3>
                <p className="text-white/40 leading-relaxed text-sm">Next.js 14, React 18, Tailwind CSS, GSAP, Zustand. Optimized for sub-second page transitions.</p>
              </div>
              <div className="p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500 group">
                <Server className="mb-10 text-white/20 group-hover:text-white/60 transition-colors" size={32} />
                <h3 className="font-display text-3xl mb-4">Backend</h3>
                <p className="text-white/40 leading-relaxed text-sm">Express, MongoDB, JWT, SambaNova AI. Robust authentication and AI-driven content analysis.</p>
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="space-y-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl tracking-tighter mb-6">Core <span className="text-white/40">Philosophy</span></h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: <UserCheck size={20} />, title: "Personalized", text: "Onboarding based on genres and authors" },
                { icon: <Book size={20} />, title: "Discoverable", text: "Shelf of seeded and imported books" },
                { icon: <Layout size={20} />, title: "Lightweight", text: "Reading tracker: To Read, Reading, Completed" },
                { icon: <Cpu size={20} />, title: "Intelligent", text: "AI-powered vocabulary scroll adapted to difficulty" },
                { icon: <Share2 size={20} />, title: "Social", text: "Reader matching and profile privacy systems" },
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all group">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-6 text-white/30 group-hover:text-white/80 group-hover:border-white/20 transition-all">
                    {item.icon}
                  </div>
                  <h4 className="font-mono text-[0.65rem] uppercase tracking-widest text-white/30 mb-2">{item.title}</h4>
                  <p className="text-white/60 leading-tight tracking-tight text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Specs */}
          <section className="space-y-16">
            <h2 className="font-display text-4xl md:text-5xl tracking-tighter text-center italic">Technical <span className="not-italic text-white/40">Specs</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-10 rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent space-y-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-white/30">Frontend Stack</h3>
                <ul className="space-y-4">
                  {[
                    ["Next.js", "14.2.15"],
                    ["React", "18.3.1"],
                    ["Tailwind", "3.4.13"],
                    ["Zustand", "State"],
                    ["GSAP", "Motion"],
                  ].map(([name, ver]) => (
                    <li key={name} className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-white/80 font-medium">{name}</span>
                      <span className="font-mono text-[0.6rem] text-white/30 italic">{ver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-10 rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent space-y-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-white/30">Backend Stack</h3>
                <ul className="space-y-4">
                  {[
                    ["Express", "4.21.0"],
                    ["Mongoose", "8.7.1"],
                    ["JWT", "jsonwebtoken"],
                    ["SambaNova", "AI Engine"],
                    ["Bcryptjs", "Security"],
                  ].map(([name, ver]) => (
                    <li key={name} className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-white/80 font-medium">{name}</span>
                      <span className="font-mono text-[0.6rem] text-white/30 italic">{ver}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-10 rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent space-y-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-white/30">Infrastructure</h3>
                <ul className="space-y-4">
                  {[
                    ["MongoDB", "Persistence"],
                    ["Google Books", "Discovery"],
                    ["Open Library", "Metadata"],
                    ["Nodemailer", "SMTP"],
                    ["Identity", "OAuth 2.0"],
                  ].map(([name, ver]) => (
                    <li key={name} className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-white/80 font-medium">{name}</span>
                      <span className="font-mono text-[0.6rem] text-white/30 italic">{ver}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Status Section */}
          <section className="p-12 md:p-20 rounded-[3.5rem] border border-white/10 bg-white/[0.02] text-center space-y-10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="space-y-4">
              <h2 className="font-display text-4xl md:text-6xl tracking-tighter">Production <span className="text-white/40">Ready</span></h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light leading-tight">
                A fully developed ecosystem with a robust backend supporting persistence, validation, and AI-driven insights.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
               {["Persistence", "Validation", "Seeding", "Caching", "OAuth", "PWA"].map(tag => (
                 <span key={tag} className="px-4 py-1 rounded-full border border-white/5 bg-white/[0.03] font-mono text-[0.6rem] uppercase tracking-widest text-white/30">
                   {tag}
                 </span>
               ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href="https://reader-s-robin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
              >
                Launch Site
                <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/TheSkyroo/reader-s-robin"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-full border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
              >
                Source Code
                <Code size={20} className="text-white/40 group-hover:text-white transition-colors" />
              </a>
            </div>
          </section>
        </div>

        <footer className="mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[0.6rem] uppercase tracking-widest text-white/20">
          <span>&copy; {new Date().getFullYear()} Readers Robin</span>
          <span className="italic italic-not text-white/10 text-[0.5rem]">Optimized for high performance</span>
        </footer>
      </main>
    </div>
  );
};

export default ReadersRobin;

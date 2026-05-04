import { useEffect } from "react";
import { ArrowUpRight, BookOpen, Code, Database, FileText, Globe, Layers, Layout, Link2, Share2, Users } from "lucide-react";

const CollegeConnection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-white selection:bg-white/10 selection:text-white font-sans">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.05)_0%,transparent_50%),radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.03)_0%,transparent_50%)]" />

      <main className="relative max-w-6xl mx-auto px-6 py-20 md:px-12 lg:py-32">
        {/* Header Section */}
        <header className="mb-32 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
            <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
            Academic Networking
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9]">
            College <span className="text-white/40 italic">Connection</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 max-w-3xl leading-tight font-light tracking-tight">
            A unified academic network bridging the gap between students through profile discovery and centralized resource sharing.
          </p>
        </header>

        <div className="space-y-40">
          {/* Core Concept Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
              <h2 className="font-display text-4xl md:text-5xl tracking-tighter">The <span className="text-white/40">Network</span></h2>
              <p className="text-white/40 leading-relaxed font-light">
                Built with Next.js and PostgreSQL, fostering collaboration through a centralized student hub.
              </p>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500 group">
                <Users className="mb-10 text-white/20 group-hover:text-blue-400/60 transition-colors" size={32} />
                <h3 className="font-display text-3xl mb-4">Discovery</h3>
                <p className="text-white/40 leading-relaxed text-sm">Rich student profiles with social integration, designed to foster real-world academic relationships.</p>
              </div>
              <div className="p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl hover:bg-white/[0.04] transition-all duration-500 group">
                <BookOpen className="mb-10 text-white/20 group-hover:text-emerald-400/60 transition-colors" size={32} />
                <h3 className="font-display text-3xl mb-4">Repository</h3>
                <p className="text-white/40 leading-relaxed text-sm">A centralized academic vault for sharing notes and resources across all semesters and courses.</p>
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
                { icon: <Share2 size={20} />, title: "Collaborative", text: "Fostering academic growth through shared semester notes" },
                { icon: <Link2 size={20} />, title: "Connected", text: "Direct social media links for seamless off-platform networking" },
                { icon: <FileText size={20} />, title: "Organized", text: "Easy-to-access academic resource management hub" },
                { icon: <Users size={20} />, title: "Seamless", text: "Simplified profile creation and discovery flow" },
                { icon: <Layout size={20} />, title: "Intuitive", text: "Clean, high-performance UI built with Tailwind CSS" },
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-10 rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent space-y-8">
                <h3 className="font-mono text-xs uppercase tracking-widest text-white/30">Architecture Stack</h3>
                <ul className="space-y-4">
                  {[
                    ["Next.js", "App Router"],
                    ["PostgreSQL", "Supabase/Neon"],
                    ["Tailwind CSS", "Styling Engine"],
                    ["API Routes", "Backend Logic"],
                    ["SSR", "Performance"],
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
                    ["Relational Data", "Database Design"],
                    ["Vercel", "Edge Deployment"],
                    ["Social Auth", "Integration"],
                    ["Resource Sync", "Cloud Storage"],
                    ["Responsive", "Mobile-First"],
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
              <h2 className="font-display text-4xl md:text-6xl tracking-tighter">Community <span className="text-white/40">Hub</span></h2>
              <p className="text-white/40 max-w-2xl mx-auto text-lg font-light leading-tight">
                A production-ready platform designed to empower student communities with better resource access.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
               {["Next.js", "PostgreSQL", "Networking", "Notes", "Tailwind"].map(tag => (
                 <span key={tag} className="px-4 py-1 rounded-full border border-white/5 bg-white/[0.03] font-mono text-[0.6rem] uppercase tracking-widest text-white/30">
                   {tag}
                 </span>
               ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href="https://college-connection.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-95"
              >
                Launch Network
                <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/Mnkubusb/college_connection"
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
          <span>&copy; {new Date().getFullYear()} College Connection</span>
          <span className="italic italic-not text-white/10 text-[0.5rem]">Built for academic collaboration</span>
        </footer>
      </main>
    </div>
  );
};

export default CollegeConnection;

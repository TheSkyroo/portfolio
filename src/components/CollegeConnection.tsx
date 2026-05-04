import { useEffect } from "react";
import { ArrowUpRight, BookOpen, Code, Database, FileText, Globe, Layers, Layout, Link2, Share2, Users } from "lucide-react";
import PhilosophySection from "./PhilosophySection";

const CollegeConnection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-[#f2ede5] p-6 md:p-12 lg:p-20 font-sans selection:bg-white/10 selection:text-white">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-20 space-y-6">
        <h1 className="detail_Header__text">College Connection</h1>
        <p className="appDetails-section__copy mt-5">
          A unified academic network designed to bridge the gap between students through profile discovery and centralized resource sharing.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-32">
        {/* Core Concept & Architecture */}
        <section>
          <div className="space-y-12">
            <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl">
              <span className="text-white/40">The</span> Network
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl font-sans">
              Built with Next.js and PostgreSQL, College Connection provides a robust platform for students to foster relationships and academic collaboration in one centralized space.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="group p-8 rounded-2xl border border-white/10 bg-zinc-950/50 backdrop-blur-sm hover:bg-zinc-900/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-sans font-medium mb-3">Student Profiles</h3>
                <p className="text-white/50 leading-relaxed">Create and discover profiles with social media integration for seamless networking.</p>
              </div>
              <div className="group p-8 rounded-2xl border border-white/10 bg-zinc-950/50 backdrop-blur-sm hover:bg-zinc-900/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-sans font-medium mb-3">Academic Repository</h3>
                <p className="text-white/50 leading-relaxed">A centralized hub for accessing and sharing academic notes across all semesters.</p>
              </div>
            </div>
          </div>

          <div className="mt-32">
            <PhilosophySection 
              title="Core Philosophy"
              items={[
                { icon: <Share2 />, text: "Fostering collaboration through shared semester notes" },
                { icon: <Link2 />, text: "Direct social media links for off-platform connection" },
                { icon: <FileText />, text: "Easy-to-access academic resource management" },
                { icon: <Users />, text: "Simplified profile creation and discovery flow" },
                { icon: <Layout />, text: "Clean, intuitive UI built with Tailwind CSS" },
              ]}
            />
          </div>
        </section>

        {/* Technical Specification */}
        <section className="space-y-16">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl text-center">
            <span className="text-white/40">Technical</span> Specification
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8 p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-mono uppercase tracking-[0.2em] text-white/40 mb-8">Full-Stack Architecture</h3>
              <ul className="space-y-6">
                {[
                  { label: "Framework", value: "Next.js" },
                  { label: "Database", value: "PostgreSQL" },
                  { label: "Styling", value: "Tailwind CSS" },
                  { label: "Rendering", value: "Server-Side (SSR)" },
                  { label: "API", value: "Next.js Routes" },
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
                <Database size={18} /> Services & Infrastructure
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: <Database size={16} className="text-blue-500" />, title: "PostgreSQL", desc: "Relational data management" },
                  { icon: <Globe size={16} className="text-emerald-500" />, title: "Vercel", desc: "Cloud deployment & hosting" },
                  { icon: <Share2 size={16} className="text-purple-500" />, title: "Social APIs", desc: "Third-party integration" },
                  { icon: <FileText size={16} className="text-rose-500" />, title: "Note Storage", desc: "Academic asset management" },
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
              College Connection is a production-ready web application designed to empower student communities with better resource access and networking tools.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
               {["Next.js", "PostgreSQL", "Academic Notes", "Networking", "Tailwind"].map(tag => (
                 <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[0.65rem] font-mono uppercase tracking-[0.2em] text-white/40">
                   {tag}
                 </span>
               ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-10">
              <a
                href="https://college-connection.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#f2ede5] text-[#090909] font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                Visit Live Site
                <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/Mnkubusb/college_connection"
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
        &copy; {new Date().getFullYear()} College Connection Case Study
      </footer>
    </div>
  );
};

export default CollegeConnection;

import { useEffect } from "react";
import { ArrowUpRight, Book, Code, Cpu, Database, Globe, Layers, Layout, Server, Share2, Sparkles, UserCheck } from "lucide-react";
import PhilosophySection from "./PhilosophySection";

const ReadersRobin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-[#f2ede5] p-6 md:p-12 lg:p-20 font-sans selection:bg-white/10 selection:text-white">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-20 space-y-6">
        <h1 className="detail_Header__text">Reader&apos;s Robin</h1>
        <p className="appDetails-section__copy mt-5">
          A full-stack social reading app built with a Next.js frontend and an Express + MongoDB backend. It combines book discovery, onboarding based on reading taste, shelf management, and AI-powered learning.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-32">
        {/* Core Concept & Architecture */}
        <section>
          <div className="space-y-12">
            <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl">
              <span className="text-white/40">The</span> Ecosystem
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl font-sans">
              Reader&apos;s Robin is designed as a reader-first product, split into two standalone high-performance applications. It transforms the reading experience from a solitary activity into a social and educational journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="group p-8 rounded-2xl border border-white/10 bg-zinc-950/50 backdrop-blur-sm hover:bg-zinc-900/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layout className="text-white/40" />
                </div>
                <h3 className="text-2xl font-sans font-medium mb-3">Frontend</h3>
                <p className="text-white/50 leading-relaxed font-sans text-sm tracking-wide">Next.js 14, React 18, Tailwind CSS, GSAP, Zustand</p>
              </div>
              <div className="group p-8 rounded-2xl border border-white/10 bg-zinc-950/50 backdrop-blur-sm hover:bg-zinc-900/80 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Server className="text-white/40" />
                </div>
                <h3 className="text-2xl font-sans font-medium mb-3">Backend</h3>
                <p className="text-white/50 leading-relaxed font-sans text-sm tracking-wide">Express, MongoDB, JWT, SambaNova AI</p>
              </div>
            </div>
          </div>

          <div className="mt-32">
            <PhilosophySection 
              title="Core Philosophy"
              items={[
                { icon: <UserCheck />, text: "Personalized onboarding based on genres and authors" },
                { icon: <Book />, text: "Discoverable shelf of seeded and imported books" },
                { icon: <Layout />, text: "Lightweight tracker: To Read, Reading, Completed" },
                { icon: <Cpu />, text: "AI-powered vocabulary scroll adapted to difficulty" },
                { icon: <Share2 />, text: "Reader matching and profile privacy systems" },
              ]}
            />
          </div>
        </section>

        {/* Technical Specification */}
        <section className="space-y-16">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl text-center">
            <span className="text-white/40">Technical</span> Specification
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-8 p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-mono uppercase tracking-[0.2em] text-white/40 mb-8">Frontend Stack</h3>
              <ul className="space-y-5">
                {[
                  { label: "Next.js", value: "14.2.15" },
                  { label: "React", value: "18.3.1" },
                  { label: "Tailwind", value: "3.4.13" },
                  { label: "State", value: "Zustand" },
                  { label: "Animation", value: "GSAP" },
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-white/50 font-sans text-sm">{item.label}</span>
                    <span className="text-white font-mono text-xs">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8 p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-mono uppercase tracking-[0.2em] text-white/40 mb-8">Backend Stack</h3>
              <ul className="space-y-5">
                {[
                  { label: "Express", value: "4.21.0" },
                  { label: "Mongoose", value: "8.7.1" },
                  { label: "Auth", value: "JWT" },
                  { label: "AI", value: "SambaNova" },
                  { label: "Mail", value: "Nodemailer" },
                ].map((item, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-white/50 font-sans text-sm">{item.label}</span>
                    <span className="text-white font-mono text-xs">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8 p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-mono uppercase tracking-[0.2em] text-white/40 mb-8 flex items-center gap-3">
                <Database size={18} /> Services
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { icon: <Database size={14} className="text-emerald-500" />, title: "MongoDB", desc: "Persistence" },
                  { icon: <Globe size={14} className="text-blue-500" />, title: "Google Books", desc: "Discovery" },
                  { icon: <Book size={14} className="text-orange-500" />, title: "Open Library", desc: "Resources" },
                  { icon: <Server size={14} className="text-purple-500" />, title: "SMTP", desc: "OTP Service" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <div>{item.icon}</div>
                    <div>
                      <div className="text-white font-medium font-sans text-sm">{item.title}</div>
                      <div className="text-white/40 text-xs font-sans">{item.desc}</div>
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
              The app is now a fully developed, production-ready application, with a robust backend supporting persistence, validation, seeding, and caching, and a seamless frontend experience spanning authentication, onboarding, and profile management.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
               {["Persistence", "Validation", "Seeding", "Caching", "OAuth", "PWA"].map(tag => (
                 <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[0.65rem] font-mono uppercase tracking-[0.2em] text-white/40">
                   {tag}
                 </span>
               ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-10">
              <a
                href="https://reader-s-robin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#f2ede5] text-[#090909] font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
              >
                Visit Live Site
                <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/TheSkyroo/reader-s-robin"
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
        &copy; {new Date().getFullYear()} Reader&apos;s Robin Case Study
      </footer>
    </div>
  );
};

export default ReadersRobin;

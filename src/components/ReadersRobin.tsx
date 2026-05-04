import { useEffect } from "react";
import { ArrowUpRight, Book, Code, Cpu, Database, Globe, Layers, Layout, Server, Share2, Sparkles, UserCheck } from "lucide-react";

const ReadersRobin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white p-6 md:p-12 lg:p-20 font-sans selection:bg-white selection:text-black">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-20 space-y-6">
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          Reader&apos;s Robin
        </h1>
        <p className="text-xl md:text-2xl text-white/60 max-w-3xl leading-relaxed">
          A full-stack social reading app built with a Next.js frontend and an Express + MongoDB backend. It combines book discovery, onboarding based on reading taste, shelf management, and AI-powered learning.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-24">
        {/* Core Concept & Architecture */}
        <section className="space-y-24">
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold flex items-center gap-3">
              <Layers className="text-blue-500" />
              The Ecosystem
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl">
              Reader&apos;s Robin is designed as a reader-first product, split into two standalone high-performance applications. It transforms the reading experience from a solitary activity into a social and educational journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Layout className="mb-6 text-white/40" />
                <h3 className="text-xl font-medium mb-2">Frontend</h3>
                <p className="text-white/50 leading-relaxed">Next.js 14, React 18, Tailwind CSS, GSAP, Zustand</p>
              </div>
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Server className="mb-6 text-white/40" />
                <h3 className="text-xl font-medium mb-2">Backend</h3>
                <p className="text-white/50 leading-relaxed">Express, MongoDB, JWT, SambaNova AI</p>
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
                { icon: <UserCheck size={20} />, text: "Personalized onboarding based on genres and authors" },
                { icon: <Book size={20} />, text: "Discoverable shelf of seeded and imported books" },
                { icon: <Layout size={20} />, text: "Lightweight tracker: To Read, Reading, Completed" },
                { icon: <Cpu size={20} />, text: "AI-powered vocabulary scroll adapted to difficulty" },
                { icon: <Share2 size={20} />, text: "Reader matching and profile privacy systems" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl hover:bg-white/5 transition-colors border border-white/5 hover:border-white/10 bg-white/[0.02]">
                  <span className="text-white/40 mt-1">{item.icon}</span>
                  <span className="text-white/80 leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Grid */}
        <section className="space-y-12">
          <h2 className="text-3xl font-semibold flex items-center gap-3 justify-center">
            <Code className="text-blue-500" />
            Technical Specification
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Frontend Details */}
            <div className="space-y-6 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-bold text-white/90 mb-4">Frontend Stack</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex justify-between"><span>Next.js</span> <span className="text-white/40 text-xs">14.2.15</span></li>
                <li className="flex justify-between"><span>React</span> <span className="text-white/40 text-xs">18.3.1</span></li>
                <li className="flex justify-between"><span>Tailwind CSS</span> <span className="text-white/40 text-xs">3.4.13</span></li>
                <li>Zustand (State Management)</li>
                <li>GSAP (Landing Animations)</li>
                <li>React Hot Toast</li>
                <li>React Icons</li>
              </ul>
            </div>

            {/* Backend Details */}
            <div className="space-y-6 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-bold text-white/90 mb-4">Backend Stack</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex justify-between"><span>Express</span> <span className="text-white/40 text-xs">4.21.0</span></li>
                <li className="flex justify-between"><span>Mongoose</span> <span className="text-white/40 text-xs">8.7.1</span></li>
                <li className="flex justify-between"><span>JWT</span> <span className="text-white/40 text-xs">jsonwebtoken</span></li>
                <li>Bcryptjs Hashing</li>
                <li>Google Auth Library</li>
                <li>Nodemailer (OTP)</li>
                <li>SambaNova AI Integration</li>
              </ul>
            </div>

            {/* Services & Data */}
            <div className="space-y-6 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-bold text-white/90 mb-4 flex items-center gap-2">
                <Database size={18} /> Services
              </h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <Database size={14} className="text-green-500/50" />
                  MongoDB (Persistence)
                </li>
                <li className="flex items-center gap-2">
                  <Globe size={14} className="text-blue-500/50" />
                  Google Books API
                </li>
                <li className="flex items-center gap-2">
                  <Book size={14} className="text-orange-500/50" />
                  Open Library API
                </li>
                <li className="flex items-center gap-2">
                  <Server size={14} className="text-purple-500/50" />
                  SMTP Service (OTP)
                </li>
                <li className="flex items-center gap-2">
                  <UserCheck size={14} className="text-red-500/50" />
                  Google Identity Services
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Status Section */}
        <section className="p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/5 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <h2 className="text-2xl font-semibold">Development Status</h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
The app is now a fully developed, production-ready application, with a robust backend supporting persistence, validation, seeding, and caching, and a seamless frontend experience spanning authentication, onboarding, and profile management.          </p>
          <div className="flex flex-wrap justify-center gap-3">
             {["Persistence", "Validation", "Seeding", "Caching", "OAuth", "PWA"].map(tag => (
               <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/40">
                 {tag}
               </span>
             ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <a
              href="https://reader-s-robin.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              Visit Live Site
              <ArrowUpRight size={20} />
            </a>
            <a
              href="https://github.com/TheSkyroo/reader-s-robin"
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
        &copy; {new Date().getFullYear()} Reader&apos;s Robin Case Study
      </footer>
    </div>
  );
};

export default ReadersRobin;

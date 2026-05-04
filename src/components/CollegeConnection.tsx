import { useEffect } from "react";
import { ArrowUpRight, BookOpen, Code, Database, FileText, Globe, Layers, Layout, Link2, Share2, Users } from "lucide-react";

const CollegeConnection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white p-6 md:p-12 lg:p-20 font-sans selection:bg-white selection:text-black">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-20 space-y-6 text-center md:text-left">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          College Connection
        </h1>
        <p className="text-xl md:text-2xl text-white/60 max-w-3xl leading-relaxed">
          A unified academic network designed to bridge the gap between students through profile discovery and centralized resource sharing.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-24">
        {/* Core Concept & Architecture */}
        <section className="space-y-24">
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold flex items-center gap-3">
              <Layers className="text-blue-500" />
              The Network
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl">
              Built with Next.js and PostgreSQL, College Connection provides a robust platform for students to foster relationships and academic collaboration in one centralized space.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <Users className="mb-6 text-blue-400" />
                <h3 className="text-xl font-medium mb-2">Student Profiles</h3>
                <p className="text-white/50 leading-relaxed">Create and discover profiles with social media integration for seamless networking.</p>
              </div>
              <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <BookOpen className="mb-6 text-green-400" />
                <h3 className="text-xl font-medium mb-2">Academic Repository</h3>
                <p className="text-white/50 leading-relaxed">A centralized hub for accessing and sharing academic notes across all semesters.</p>
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
                { icon: <Share2 size={20} />, text: "Fostering collaboration through shared semester notes" },
                { icon: <Link2 size={20} />, text: "Direct social media links for off-platform connection" },
                { icon: <FileText size={20} />, text: "Easy-to-access academic resource management" },
                { icon: <Users size={20} />, text: "Simplified profile creation and discovery flow" },
                { icon: <Layout size={20} />, text: "Clean, intuitive UI built with Tailwind CSS" },
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
              <h3 className="text-xl font-bold text-white/90 mb-4 text-center md:text-left">Full-Stack Architecture</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex justify-between"><span>Framework</span> <span className="text-white/40 text-xs">Next.js</span></li>
                <li className="flex justify-between"><span>Database</span> <span className="text-white/40 text-xs">PostgreSQL</span></li>
                <li className="flex justify-between"><span>Styling</span> <span className="text-white/40 text-xs">Tailwind CSS</span></li>
                <li>Server-Side Rendering (SSR)</li>
                <li>API Routes for Profile Management</li>
                <li>Responsive Design Principles</li>
              </ul>
            </div>

            <div className="space-y-6 p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-xl font-bold text-white/90 mb-4 flex items-center gap-2">
                <Database size={18} /> Services & Infrastructure
              </h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <Database size={14} className="text-blue-500/50" />
                  PostgreSQL for relational data
                </li>
                <li className="flex items-center gap-2">
                  <Globe size={14} className="text-green-500/50" />
                  Vercel Deployment
                </li>
                <li className="flex items-center gap-2">
                  <Share2 size={14} className="text-purple-500/50" />
                  Social Integration APIs
                </li>
                <li className="flex items-center gap-2">
                  <FileText size={14} className="text-red-500/50" />
                  Note Storage & Retrieval
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
            College Connection is a production-ready web application designed to empower student communities with better resource access and networking tools.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
             {["Next.js", "PostgreSQL", "Academic Notes", "Networking", "Tailwind"].map(tag => (
               <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/40">
                 {tag}
               </span>
             ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <a
              href="https://college-connection.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              Visit Live Site
              <ArrowUpRight size={20} />
            </a>
            <a
              href="https://github.com/Mnkubusb/college_connection"
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
        &copy; {new Date().getFullYear()} College Connection Case Study
      </footer>
    </div>
  );
};

export default CollegeConnection;

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

        {/* Core Concept & Architecture */}
        <section>
          <div className="space-y-12">
            <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl">
              <span className="text-white/40">The</span> Network
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl font-sans">
              Built with <span className="text-white">Next.js</span> and <span className="text-white">PostgreSQL</span>, College Connection provides a robust platform for students to foster relationships and academic collaboration in one centralized space. It features <span className="text-white">Server-Side Rendering (SSR)</span> for performance and a seamless <span className="text-white">Tailwind-powered</span> interface.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-32">
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

            <PhilosophySection 
              title="Technical Specification"
              items={[
                { icon: <Layout />, text: "Next.js Framework & API Routes" },
                { icon: <Database />, text: "PostgreSQL Relational Database" },
                { icon: <Code />, text: "Tailwind CSS & Responsive Layouts" },
                { icon: <Layers />, text: "Server-Side Rendering (SSR) Logic" },
                { icon: <Globe />, text: "Social API Integration & Networking" },
                { icon: <FileText />, text: "Academic Note Management & Discovery" },
              ]}
            />
          </div>
        </section>

        {/* Development Status */}
        <section className="space-y-12 mt-20">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl">
            <span className="text-white/40">Development</span> Status
          </h2>
          
          <div className="space-y-10">
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl font-sans">
              College Connection is a production-ready web application designed to empower student communities with better resource access and networking tools.
            </p>
            <div className="flex flex-wrap gap-3">
               {["Next.js", "PostgreSQL", "Academic Notes", "Networking", "Tailwind"].map(tag => (
                 <span key={tag} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[0.65rem] font-mono uppercase tracking-[0.2em] text-white/40">
                   {tag}
                 </span>
               ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <a
                href="https://college-connection.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/20 bg-white text-[#090909] font-semibold transition-all hover:bg-[#f2ede5] hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
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

import { useEffect } from "react";
import { ArrowUpRight, Code, Database, FileText, Globe, Layers, Layout, Link2, Share2, Users } from "lucide-react";
import PhilosophySection from "./PhilosophySection";

const CollegeConnection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-[#f2ede5] p-6 md:p-12 lg:p-20 font-sans selection:bg-white/10 selection:text-white">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-4 space-y-6">
        <h1 className="font-display text-6xl font-medium tracking-tighter text-white sm:text-7xl lg:text-8xl text-center">
          <span className="text-white/40">College</span> Connection
        </h1>
        <p className="appDetails-section__copy mt-5 text-center">
          A unified academic network designed to bridge the gap between students
          through profile discovery and centralized resource sharing. Built with
          Next.js and PostgreSQL, College Connection provides a robust platform
          for students to foster relationships and academic collaboration in one
          centralized space.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-4">
        {/* Core Concept & Architecture */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-start mt-1">
            <PhilosophySection
              title="Core Philosophy"
              items={[
                {
                  icon: <Share2 />,
                  text: "Fostering collaboration through shared semester notes",
                },
                {
                  icon: <Link2 />,
                  text: "Direct social media links for off-platform connection",
                },
                {
                  icon: <FileText />,
                  text: "Easy-to-access academic resource management",
                },
                {
                  icon: <Users />,
                  text: "Simplified profile creation and discovery flow",
                },
                {
                  icon: <Layout />,
                  text: "Clean, intuitive UI built with Tailwind CSS",
                },
              ]}
            />

            <PhilosophySection
              title="Technical Specification"
              items={[
                { icon: <Database />, text: "Relational PostgreSQL Data Persistence" },
                { icon: <Globe />, text: "Server-Side Rendered Next.js Architecture" },
                { icon: <Layout />, text: "Optimized Tailwind CSS UI Framework" },
                { icon: <Layers />, text: "Scalable Vercel Cloud Infrastructure" },
                { icon: <Code />, text: "Robust Next.js API Route Handling" },
                { icon: <FileText />, text: "Centralized Academic Asset Management" },
              ]}
            />
          </div>
        </section>

        {/* Development Status */}
        <section className="space-y-6 mt-4">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl text-center">
            <span className="text-white/40">Development</span> Status
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl font-sans mx-auto text-center">
              College Connection is a production-ready web application designed to
              empower student communities with better resource access and
              networking tools. It simplifies the academic journey by providing
              one centralized hub for all collaborative needs.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Next.js",
                "PostgreSQL",
                "Academic Notes",
                "Networking",
                "Tailwind",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[0.65rem] font-mono uppercase tracking-[0.2em] text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <a
                href="https://college-connection.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/20 bg-[#f2ede5] !text-[#090909] font-semibold  transition-all hover:scale-105 active:scale-95"
              >
                Visit Live Site
                <ArrowUpRight
                  size={20}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href="https://github.com/Mnkubusb/college_connection"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
              >
                Source Code
                <ArrowUpRight
                  size={20}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-20 pt-12 border-t border-white/5 text-center text-white/20 text-xs font-mono uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} College Connection Case Study
      </footer>
    </div>
  );
};

export default CollegeConnection;

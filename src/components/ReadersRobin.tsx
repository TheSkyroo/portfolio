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
          A full-stack social reading app built with a Next.js frontend and an
          Express + MongoDB backend. It combines book discovery, onboarding
          based on reading taste, shelf management, and AI-powered learning.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-32">
        {/* Core Concept & Architecture */}
        <section>
          <div className="space-y-12">
            <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl text-center">
              <span className="text-white/40">The</span> Ecosystem
            </h2>
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl font-sans mx-auto text-center">
              Reader&apos;s Robin is designed as a reader-first product, split
              into two standalone high-performance applications: a{" "}
              <span className="text-white">Next.js 14</span> frontend and an{" "}
              <span className="text-white">Express + MongoDB</span> backend. It
              transforms the reading experience from a solitary activity into a
              social and educational journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mt-32">
            <PhilosophySection
              title="Core Philosophy"
              items={[
                {
                  icon: <UserCheck />,
                  text: "Personalized onboarding based on genres and authors",
                },
                {
                  icon: <Book />,
                  text: "Discoverable shelf of seeded and imported books",
                },
                {
                  icon: <Layout />,
                  text: "Lightweight tracker: To Read, Reading, Completed",
                },
                {
                  icon: <Cpu />,
                  text: "AI-powered vocabulary scroll adapted to difficulty",
                },
                {
                  icon: <Share2 />,
                  text: "Reader matching and profile privacy systems",
                },
              ]}
            />

            <PhilosophySection
              title="Technical Specification"
              items={[
                {
                  icon: <Layout />,
                  text: "Next.js 14, React 18 & Tailwind CSS",
                },
                {
                  icon: <Sparkles />,
                  text: "GSAP Motion & Zustand State Management",
                },
                {
                  icon: <Server />,
                  text: "Express, MongoDB & JWT Auth Architecture",
                },
                { icon: <Cpu />, text: "SambaNova AI Learning Integration" },
                {
                  icon: <Globe />,
                  text: "Google Books & Open Library Discovery APIs",
                },
                {
                  icon: <Database />,
                  text: "Scalable Persistence & SMTP Mail Services",
                },
              ]}
            />
          </div>
        </section>

        {/* Development Status */}
        <section className="space-y-12 mt-20">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl text-center">
            <span className="text-white/40">Development</span> Status
          </h2>

          <div className="space-y-10">
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl font-sans mx-auto text-center">
              The app is now a fully developed, production-ready application,
              with a robust backend supporting persistence, validation, seeding,
              and caching, and a seamless frontend experience spanning
              authentication, onboarding, and profile management.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "Persistence",
                "Validation",
                "Seeding",
                "Caching",
                "OAuth",
                "PWA",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[0.65rem] font-mono uppercase tracking-[0.2em] text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <a
                href="https://reader-s-robin.vercel.app/"
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
                href="https://github.com/TheSkyroo/reader-s-robin"
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

      <footer className="max-w-6xl mx-auto mt-32 pt-12 border-t border-white/5 text-center text-white/20 text-xs font-mono uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} Reader&apos;s Robin Case Study
      </footer>
    </div>
  );
};

export default ReadersRobin;

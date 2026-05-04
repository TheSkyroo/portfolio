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
      <header className="max-w-6xl mx-auto mb-4 space-y-6">
        <h1 className="font-display text-6xl font-medium tracking-tighter text-white sm:text-7xl lg:text-8xl text-center">
          <span className="text-white/40">Reader&apos;s</span> Robin
        </h1>

        <p className="appDetails-section__copy mt-5 text-center">
          Reader&apos;s Robin is a full-stack social reading platform designed
          to transform the solitary experience of reading into a dynamic,
          community-driven journey. Built with a modern Next.js frontend and a
          robust Node.js/Express backend, the application offers an immersive
          environment where users can discover new books, track their reading
          progress, and follow their favorite authors through a personalized
          recommendation engine. The platform distinguishes itself by
          integrating AI-powered vocabulary tools via OpenAI to enhance
          comprehension and utilizing Stream Chat for real-time social
          engagement, all wrapped in a premium, glassmorphic UI that prioritizes
          visual excellence and seamless user interaction.
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
        <section className="space-y-6 mt-4">
          <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl text-center">
            <span className="text-white/40">Development</span> Status
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-white/70 leading-relaxed max-w-4xl font-sans mx-auto text-center">
              The app is now a fully developed, production-ready application,
              with a robust backend supporting persistence, validation, seeding,
              and caching, and a seamless frontend experience spanning
              authentication, onboarding, and profile management.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
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

            <div className="flex flex-wrap justify-center gap-6 pt-4">
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

      <footer className="max-w-6xl mx-auto mt-20 pt-12 border-t border-white/5 text-center text-white/20 text-xs font-mono uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} Reader&apos;s Robin Case Study
      </footer>
    </div>
  );
};

export default ReadersRobin;

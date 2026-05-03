import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS_DATA = [
  {
    category: "Languages",
    skills: [
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "SQL",
      "Java",
      "Python",
      "C++",
    ],
  },
  {
    category: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Vite",
      "Zustand",
      "GSAP",
      "Daisy UI",
      "GSAP",
      "Matter.js",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Auth",
      "Auth.js",
      "OAuth 2.0",
    ],
  },
  {
    category: "Databases",
    skills: ["MongoDB", "PostgreSQL"],
  },
  {
    category: "Tools & Platforms",
    skills: [
      "Git",
      "GitHub",
      "AWS S3",
      "Vercel",
      "Render",
      "Jest",
      "MediaPipe",
      "WebRTC",
      "Sambanova",
      "Codex",
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const categories = gsap.utils.toArray(".skills-category");
      
      gsap.fromTo(
        categories,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="skills-section py-20" id="skills">
      <div className="mb-14">
        <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl">
          <span className="text-white/40">Technical</span> Arsenal
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILLS_DATA.map((item, idx) => (
          <div key={idx} className="skills-category group">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-5 group-hover:text-white/70 transition-colors">
              {item.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {item.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="skill-tag"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

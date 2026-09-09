import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Language icons
import { SiJavascript, SiHtml5, SiCss, SiMysql, SiCplusplus, SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";

// Frontend icons
import { SiReact, SiNextdotjs, SiTailwindcss, SiVite, SiGreensock } from "react-icons/si";
import { TbStack2 } from "react-icons/tb";
import { SiDaisyui } from "react-icons/si";

// Backend icons
import { SiNodedotjs, SiExpress, SiJsonwebtokens } from "react-icons/si";
import { TbApi, TbShieldLock } from "react-icons/tb";
import { SiAuth0 } from "react-icons/si";

// Database icons
import { SiMongodb, SiPostgresql } from "react-icons/si";

// Tools & Platforms icons
import { SiGit, SiGithub,  SiVercel, SiRender, SiJest, SiMediapipe, SiWebrtc } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbBrain, TbCode } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  icon: ReactNode;
}

interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript (ES6+)", icon: <SiJavascript /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS3", icon: <SiCss /> },
      { name: "SQL", icon: <SiMysql /> },
      { name: "Java", icon: <FaJava /> },
      { name: "Python", icon: <SiPython /> },
      { name: "C++", icon: <SiCplusplus /> },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React.js", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Vite", icon: <SiVite /> },
      { name: "Zustand", icon: <TbStack2 /> },
      { name: "GSAP", icon: <SiGreensock /> },
      { name: "Daisy UI", icon: <SiDaisyui /> },
      { name: "Matter.js", icon: <TbBrain /> },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "REST APIs", icon: <TbApi /> },
      { name: "JWT Auth", icon: <SiJsonwebtokens /> },
      { name: "Auth.js", icon: <SiAuth0 /> },
      { name: "OAuth 2.0", icon: <TbShieldLock /> },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "AWS S3", icon: <FaAws /> },
      { name: "Vercel", icon: <SiVercel /> },
      { name: "Render", icon: <SiRender /> },
      { name: "Jest", icon: <SiJest /> },
      { name: "MediaPipe", icon: <SiMediapipe /> },
      { name: "WebRTC", icon: <SiWebrtc /> },
      { name: "Sambanova", icon: <TbBrain /> },
      { name: "Codex", icon: <TbCode /> },
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
    <section ref={sectionRef} className="skills-section py-20 px-4 sm:px-8 lg:px-16 xl:px-24" id="skills">
      <div className="mb-14 text-center">
        <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl">
          <span className="text-white/40">Technical</span> Arsenal
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
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
                  <span className="skill-tag__icon">{skill.icon}</span>
                  {skill.name}
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

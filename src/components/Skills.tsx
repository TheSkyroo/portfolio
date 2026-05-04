import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MoveRight } from "lucide-react";

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
    skills: ["MongoDB", "PostgreSQL", "Redis", "Firebase"],
  },
  {
    category: "Tools & Platforms",
    skills: [
      "Git & GitHub",
      "AWS S3",
      "Vercel / Render",
      "Jest / Testing",
      "MediaPipe",
      "WebRTC",
      "SambaNova AI",
      "Docker",
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!section || !track || !viewport) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".skills-card");
      
      // 1. Initial Staggered Reveal on Section Hover
      const revealTl = gsap.timeline({ paused: true });
      revealTl.fromTo(
        cards,
        { 
          opacity: 0, 
          x: 100,
          scale: 0.9,
          rotateY: 20
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotateY: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out"
        }
      );

      // Trigger reveal on mouse enter of the whole section
      const handleMouseEnter = () => revealTl.play();
      section.addEventListener("mouseenter", handleMouseEnter);

      // 2. Horizontal Scroll Logic (GSAP smoothed)
      let scrollX = 0;
      const maxScroll = -(track.scrollWidth - viewport.offsetWidth);

      const updateScroll = (delta: number) => {
        scrollX -= delta;
        scrollX = Math.max(maxScroll, Math.min(0, scrollX));
        
        gsap.to(track, {
          x: scrollX,
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto"
        });
      };

      const handleWheel = (e: WheelEvent) => {
        // Only horizontal scroll if hovering the section
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          // Vertical wheel translates to horizontal move
          updateScroll(e.deltaY * 0.8);
        } else {
          updateScroll(e.deltaX * 0.8);
        }
        e.preventDefault();
      };

      viewport.addEventListener("wheel", handleWheel, { passive: false });

      // 3. Card Hover Scale Effects
      cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { 
            scale: 1.02, 
            borderColor: "rgba(255, 255, 255, 0.25)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            duration: 0.4, 
            ease: "power2.out" 
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { 
            scale: 1, 
            borderColor: "rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            duration: 0.4, 
            ease: "power2.out" 
          });
        });
      });

      // Mobile Swipe Logic (Simplified)
      let startX = 0;
      let currentX = 0;
      
      const handleTouchStart = (e: TouchEvent) => {
        startX = e.touches[0].clientX - scrollX;
      };

      const handleTouchMove = (e: TouchEvent) => {
        currentX = e.touches[0].clientX - startX;
        currentX = Math.max(maxScroll, Math.min(0, currentX));
        scrollX = currentX;
        gsap.set(track, { x: scrollX });
      };

      viewport.addEventListener("touchstart", handleTouchStart);
      viewport.addEventListener("touchmove", handleTouchMove);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="skills-section py-24 overflow-hidden" id="skills">
      <div className="flex items-end justify-between mb-16 px-2">
        <div className="space-y-4">
          <h2 className="font-display text-5xl font-medium tracking-tighter text-white sm:text-6xl lg:text-7xl">
            <span className="text-white/40">Technical</span> Arsenal
          </h2>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
            Scroll to explore <MoveRight size={14} className="animate-pulse" />
          </p>
        </div>
      </div>

      <div ref={viewportRef} className="skills-viewport relative cursor-grab active:cursor-grabbing">
        <div ref={trackRef} className="skills-track flex gap-6 px-2 w-max perspective-1000">
          {SKILLS_DATA.map((item, idx) => (
            <div key={idx} className="skills-card group relative w-[320px] sm:w-[400px] flex-shrink-0 p-8 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <div className="absolute top-8 right-8 text-white/5 font-display text-6xl pointer-events-none select-none">
                0{idx + 1}
              </div>
              
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/40 mb-8 group-hover:text-white/80 transition-colors">
                {item.category}
              </h3>
              
              <ul className="space-y-4">
                {item.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-3 text-white/70 group/item">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/item:bg-white/60 transition-colors" />
                    <span className="text-lg font-sans tracking-tight group-hover/item:text-white transition-colors">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

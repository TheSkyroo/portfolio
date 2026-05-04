import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { MoveRight } from "lucide-react";
import clsx from "clsx";

const SKILLS_DATA = [
  {
    category: "Languages",
    skills: [
      "JavaScript (ES6+)",
      "HTML5 / CSS3",
      "TypeScript",
      "Python / Java",
      "SQL / NoSQL",
    ],
  },
  {
    category: "Frontend",
    skills: [
      "React.js / Next.js",
      "Tailwind CSS",
      "GSAP Animations",
      "Framer Motion",
      "Redux / Zustand",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js / Express",
      "RESTful APIs",
      "JWT & Auth.js",
      "WebSockets",
      "Microservices",
    ],
  },
  {
    category: "Databases",
    skills: [
      "MongoDB / Mongoose",
      "PostgreSQL / Prisma",
      "Redis Caching",
      "Firebase / Supabase",
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      "Git & CI/CD",
      "Docker / Containers",
      "AWS / Vercel",
      "MediaPipe / AI",
      "Jest / Testing",
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const progressRef = useRef(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const updateCardPositions = useCallback((progress: number) => {
    const total = SKILLS_DATA.length;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // 1. Calculate relative position (-2.5 to 2.5)
      let relPos = (i - progress);
      while (relPos > 2.5) relPos -= total;
      while (relPos < -2.5) relPos += total;

      const absPos = Math.abs(relPos);
      
      // 2. Position and visual properties
      const targetX = relPos * 120; // Spacing for cleaner gaps
      const scale = relPos === 0 ? 1.2 : Math.max(0.8, 1.2 - absPos * 0.3);
      
      // Hide cards at far edges to prevent visible "jumps"
      const opacity = absPos > 2 ? 0 : relPos === 0 ? 1 : Math.max(0, 1 - absPos * 0.6);
      
      const zIndex = Math.round(10 - absPos * 2);
      const blur = absPos * 2;

      // Detect "jump" to prevent sliding across screen during loop
      const currentX = gsap.getProperty(card, "xPercent") as number;
      if (Math.abs(targetX - currentX) > 200) {
        gsap.set(card, { xPercent: targetX });
      }

      gsap.to(card, {
        xPercent: targetX,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
        filter: `blur(${blur}px)`,
      });
    });

    const wrappedActive = Math.round(progress % total + total) % total;
    setActiveIndex(wrappedActive);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Native wheel listener to prevent page scroll
    const handleWheel = (e: WheelEvent) => {
      // Prevent default page scroll
      e.preventDefault();
      
      const delta = e.deltaY || e.deltaX;
      progressRef.current += delta * 0.005;
      updateCardPositions(progressRef.current);
    };

    // Use { passive: false } to allow preventDefault()
    section.addEventListener("wheel", handleWheel, { passive: false });
    
    updateCardPositions(0);
    
    return () => {
      section.removeEventListener("wheel", handleWheel);
    };
  }, [updateCardPositions]);

  // Pointer/Drag logic
  const dragStartRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartRef.current;
    dragStartRef.current = e.clientX;
    progressRef.current -= delta * 0.01;
    updateCardPositions(progressRef.current);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    progressRef.current = Math.round(progressRef.current);
    updateCardPositions(progressRef.current);
  };

  return (
    <section 
      ref={sectionRef}
      className="skills-section relative py-32 overflow-hidden min-h-[700px] flex flex-col justify-center select-none"
      id="skills"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      <div className="text-center mb-16 px-4">
        <h2 className="font-display text-5xl font-medium tracking-tighter text-white sm:text-7xl mb-6">
          <span className="text-white/40">Technical</span> Arsenal
        </h2>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-white/20 flex items-center justify-center gap-3">
          Wheel or drag to rotate <MoveRight size={12} className="animate-pulse" />
        </p>
      </div>

      <div 
        ref={viewportRef}
        className="relative w-full h-[400px] flex items-center justify-center perspective-2000"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Edge masking for infinite illusion */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#090909] to-transparent z-40 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#090909] to-transparent z-40 pointer-events-none" />

        <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center">
          {SKILLS_DATA.map((item, idx) => (
            <div
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className={clsx(
                "absolute w-[280px] sm:w-[340px] p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-shadow duration-500",
                idx === activeIndex ? "hover:border-white/30" : ""
              )}
            >
              <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-white/40 mb-10 text-center">
                {item.category}
              </h3>
              
              <ul className="space-y-5">
                {item.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-3 text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <span className="text-lg font-sans tracking-tight leading-none">
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

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
      "Python",
      "SQL",
    ],
  },
  {
    category: "Frontend",
    skills: ["GSAP Animations", "Tailwind CSS", "React.js", "Next.js", "Redux"],
  },
  {
    category: "Backend",
    skills: [
      "Microservices",
      "JWT & Auth.js",
      "WebSockets",
      "RESTful APIs",
      "Express",
    ],
  },
  {
    category: "Databases",
    skills: ["Redis Caching", "PostgreSQL", "MongoDB", "Firebase", "Docker"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git & CI/CD", "MediaPipe", "Vercel", "AWS", "Jest"],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const progressRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const updateCardPositions = useCallback((progress: number) => {
    const total = SKILLS_DATA.length;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // Calculate relative position (-2.5 to 2.5 for 5 cards)
      let relPos = i - progress;
      while (relPos > 2.5) relPos -= total;
      while (relPos < -2.5) relPos += total;

      const absPos = Math.abs(relPos);

      // Positioning and styling
      const xOffset = relPos * 120;
      const scale = 1 - absPos * 0.15;
      const opacity = Math.max(0, 1 - absPos * 0.45);
      const zIndex = Math.round(100 - absPos * 20);
      const blur = absPos * 2.5;
      const rotateY = relPos * -15;

      // Jump detection for infinite looping
      const currentX = gsap.getProperty(card, "x") as number;
      if (Math.abs(xOffset - currentX) > 400) {
        gsap.set(card, { x: xOffset });
      }

      gsap.to(card, {
        x: xOffset,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
        filter: `blur(${blur}px)`,
        pointerEvents: "none",
      });
    });

    const wrappedActive = Math.round(progress % total + total) % total;
    setActiveIndex(wrappedActive);
  }, []);

  const move = useCallback((direction: number) => {
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    progressRef.current += direction;
    updateCardPositions(progressRef.current);

    gsap.delayedCall(0.5, () => {
      isAnimatingRef.current = false;
    });
  }, [updateCardPositions]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      if (Math.abs(delta) < 40) return;
      move(delta > 0 ? 1 : -1);
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    updateCardPositions(0);
    
    return () => {
      section.removeEventListener("wheel", handleWheel);
    };
  }, [move, updateCardPositions]);

  const dragStartRef = useRef(0);
  const dragAccumulatorRef = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartRef.current = e.clientX;
    dragAccumulatorRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isAnimatingRef.current) return;
    
    const delta = e.clientX - dragStartRef.current;
    dragAccumulatorRef.current += delta;
    dragStartRef.current = e.clientX;

    const threshold = 100;
    if (Math.abs(dragAccumulatorRef.current) > threshold) {
      move(dragAccumulatorRef.current > 0 ? -1 : 1);
      dragAccumulatorRef.current = 0;
    }
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
          Wheel or drag to shuffle{" "}
          <MoveRight size={12} className="animate-pulse" />
        </p>
      </div>

      <div
        ref={viewportRef}
        className="relative w-full h-[500px] flex items-center justify-center perspective-2000"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center">
          {SKILLS_DATA.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={clsx(
                "absolute w-[80vw] sm:w-[42vw] p-12 sm:p-16 rounded-[3rem] border border-white/10 bg-zinc-950/80 backdrop-blur-2xl transition-shadow duration-500 shadow-2xl",
                idx === activeIndex ? "border-white/20" : "",
              )}
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.5em] text-white/30 mb-12 text-center">
                {item.category}
              </h3>

              <ul className="space-y-6 flex flex-col items-center">
                {item.skills.map((skill, sIdx) => (
                  <li
                    key={sIdx}
                    className="flex items-center justify-center gap-4 text-white/80 group/item"
                  >
                    <span className="w-2 h-2 rounded-full bg-white/20 group-hover/item:bg-white/60 transition-colors" />
                    <span className="text-2xl sm:text-3xl font-sans tracking-tighter leading-none group-hover/item:text-white transition-colors">
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

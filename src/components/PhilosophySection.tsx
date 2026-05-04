import { useEffect, useRef, useState, useCallback, ReactNode } from "react";
import gsap from "gsap";
import { MoveRight } from "lucide-react";
import clsx from "clsx";

interface PhilosophyItem {
  icon: ReactNode;
  text: string;
}

interface PhilosophySectionProps {
  title: string;
  items: PhilosophyItem[];
}

const PhilosophySection = ({ title, items }: PhilosophySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const progressRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const updateCardPositions = useCallback((progress: number) => {
    const total = items.length;
    const wrappedActive = Math.round(progress % total + total) % total;
    setActiveIndex(wrappedActive);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      let relPos = i - progress;
      while (relPos > total / 2) relPos -= total;
      while (relPos < -total / 2) relPos += total;

      const absPos = Math.abs(relPos);

      const xOffset = relPos * 120;
      const scale = 1 - absPos * 0.15;
      const opacity = Math.max(0, 1 - absPos * 0.45);
      const zIndex = Math.round(100 - absPos * 20);
      const blur = absPos * 2.5;
      const rotateY = relPos * -15;

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
        pointerEvents: i === wrappedActive ? "auto" : "none",
      });
    });
  }, [items.length]);

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
      className="relative py-20 overflow-hidden min-h-[600px] flex flex-col justify-center select-none"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />

      <div className="text-center mb-16">
        <h2 className="font-display text-4xl font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl mb-4">
          <span className="text-white/40">{title.split(' ')[0]}</span> {title.split(' ').slice(1).join(' ')}
        </h2>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/20 flex items-center justify-center gap-3">
          Shuffle cards <MoveRight size={10} className="animate-pulse" />
        </p>
      </div>

      <div
        ref={viewportRef}
        className="relative w-full h-[400px] flex items-center justify-center perspective-2000"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <div className="relative w-full max-w-[1000px] h-full flex items-center justify-center">
          {items.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={clsx(
                "absolute w-[85vw] sm:w-[350px] p-10 rounded-[2.5rem] border border-white/10 bg-zinc-950/90 backdrop-blur-xl transition-shadow duration-500 shadow-2xl flex flex-col items-center justify-center text-center",
                idx === activeIndex ? "border-white/20" : "",
              )}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8">
                <div className="text-white/60 scale-[1.5]">
                  {item.icon}
                </div>
              </div>

              <p className="text-xl sm:text-2xl font-sans tracking-tight leading-snug text-white/90">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard from "./BentoCard";
import BentoTilt from "./BentoTilt";

gsap.registerPlugin(ScrollTrigger);

const BentoGrid = ({
  onOpenReadersRobin,
  onOpenStreamify,
  onOpenCollegeConnection,
  onOpenMemeLab,
}: {
  onOpenReadersRobin?: () => void;
  onOpenStreamify?: () => void;
  onOpenCollegeConnection?: () => void;
  onOpenMemeLab?: () => void;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const floatingButtonRef = useRef<HTMLButtonElement>(null);
  const [hoveredInfo, setHoveredInfo] = useState<{ label: string; onClick?: () => void } | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const button = floatingButtonRef.current;
    if (!grid || !button) return;

    const xTo = gsap.quickTo(button, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(button, "y", { duration: 0.5, ease: "power3" });
    const opacityTo = gsap.quickTo(button, "opacity", { duration: 0.4, ease: "power2.out" });

    gsap.set(button, { xPercent: -50, yPercent: -50, opacity: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };

    grid.addEventListener("mousemove", handleMouseMove);

    if (hoveredInfo) {
      opacityTo(1);
    } else {
      opacityTo(0);
    }

    return () => {
      grid.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hoveredInfo]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".bento-grid__item", grid);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 56 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: grid,
          start: "top 78%",
          once: true,
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="feature-bento mr:20 mb-20 px-4 sm:px-6 lg:px-8"
      aria-label="Selected Proje cts"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 lg:mb-14">
          <h2 className="font-display text-5xl mt-10 mb-10 sm:mt-20 sm:mb-20 font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl">
            <span className="text-white/40">Selected</span> Projects
          </h2>
        </div>
        <div
          ref={gridRef}
          className="relative grid h-auto w-full grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2"
        >
          <BentoTilt className="min-h-[24rem] sm:min-h-[24rem]">
            <BentoCard
              src=""
              title={<>Reader&apos;s Robin</>}
              description="Reader's Robin is an AI-enhanced social reading ecosystem that turns passive reading into an interactive journey. Featuring a SambaNova-powered literary companion, federated book discovery across multiple APIs, and a sleek, GSAP-powered interface, it provides a seamless full-stack experience for tracking progress, discovering similar readers, and mastering complex vocabulary in real-time."
              eyebrow="Social Reading Platform"
              variant="text"
              onButtonClick={onOpenReadersRobin}
              onMouseEnter={() =>
                setHoveredInfo({
                  label: "Details",
                  onClick: onOpenReadersRobin,
                })
              }
              onMouseLeave={() => setHoveredInfo(null)}
            />
          </BentoTilt>

          <BentoTilt className="min-h-[24rem] sm:min-h-[24rem]">
            <BentoCard
              src=""
              title={<>Streamify</>}
              description=" A high-performance communication engine facilitating HD video calls and sub-second latency messaging. Engineered with React 19 and the Stream SDK, it features a robust multi-step onboarding flow and dynamic theme engine, showcasing the intersection of production-ready scalability and premium UI/UX."
              eyebrow="Realtime Chat & Video Calls"
              variant="text"
              onButtonClick={onOpenStreamify}
              onMouseEnter={() =>
                setHoveredInfo({ label: "Details", onClick: onOpenStreamify })
              }
              onMouseLeave={() => setHoveredInfo(null)}
            />
          </BentoTilt>

          <BentoTilt className="min-h-[24rem] sm:min-h-[24rem]">
            <BentoCard
              src=""
              title={<>College connection</>}
              description="College Connection is a web application designed to help college students connect with each other. It allows students to create profiles, view others' profiles, and reach out through social media links. Additionally, it provides a centralized space to access and share academic notes for all semesters."
              eyebrow="Academic Network"
              variant="text"
              onButtonClick={onOpenCollegeConnection}
              onMouseEnter={() =>
                setHoveredInfo({
                  label: "Details",
                  onClick: onOpenCollegeConnection,
                })
              }
              onMouseLeave={() => setHoveredInfo(null)}
            />
          </BentoTilt>

          <BentoTilt className="min-h-[24rem] sm:min-h-[24rem]">
            <BentoCard
              src=""
              title={<>Meme lab</>}
              description="A gesture-based reaction board powered by computer vision. Your physical expressions are the controller, triggering iconic memes through real-time landmark tracking."
              eyebrow="AI Memes"
              variant="full"
              onButtonClick={onOpenMemeLab}
              onMouseEnter={() =>
                setHoveredInfo({ label: "Details", onClick: onOpenMemeLab })
              }
              onMouseLeave={() => setHoveredInfo(null)}
            />
          </BentoTilt>

          {/* Global Floating Button for the Grid */}
          <button
            ref={floatingButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              hoveredInfo?.onClick?.();
            }}
            className="pointer-events-none absolute left-0 top-0 z-50 flex items-center gap-3 rounded-full border border-white bg-white px-7 py-3 text-base font-semibold text-black opacity-0 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-[background-color,color,border-color] duration-300 hover:bg-white hover:text-black active:scale-95"
            style={{ willChange: "transform, opacity" }}
          >
            <span className="whitespace-nowrap tracking-tight">
              {hoveredInfo?.label || "Details"}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;

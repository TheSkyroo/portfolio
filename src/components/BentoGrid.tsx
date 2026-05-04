import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
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

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) {
      return;
    }

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".bento-grid__item", grid);
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(items, {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.set(items, {
        opacity: 0,
        y: 56,
      });

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

      items.forEach((item, index) => {
        const floatingNode =
          item.querySelector<HTMLElement>("[data-bento-float='true']") ?? item;

        gsap.to(floatingNode, {
          y: index % 2 === 0 ? -8 : 8,
          duration: 3.2 + index * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="feature-bento mb-20" aria-label="Selected Projects">
      <div className="mb-10 lg:mb-14">
        <h2 className="font-display text-4xl mt-20 mb-20 font-medium tracking-tighter text-white sm:text-5xl lg:text-6xl">
          <span className="text-white/40"> Selected</span> Projects
        </h2>
      </div>
      <div
        ref={gridRef}
        className="grid h-auto w-full grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2"
      >
        <BentoTilt className="min-h-[32rem] sm:min-h-[32rem]">
          <BentoCard
            src=""
            title={<>Reader&apos;s Robin</>}
            description="Reader's Robin is an AI-enhanced social reading ecosystem that turns passive reading into an interactive journey. Featuring a SambaNova-powered literary companion, federated book discovery across multiple APIs, and a sleek, GSAP-powered interface, it provides a seamless full-stack experience for tracking progress, discovering similar readers, and mastering complex vocabulary in real-time."
            eyebrow="Social Reading Platform"
            variant="text"
            buttonLabel="Details"
            onButtonClick={onOpenReadersRobin}
          />
        </BentoTilt>

        <BentoTilt className="min-h-[32rem] sm:min-h-[32rem]">
          <BentoCard
            src=""
            title={<>Streamify</>}
            description=" A high-performance communication engine facilitating HD video calls and sub-second latency messaging. Engineered with React 19 and the Stream SDK, it features a robust multi-step onboarding flow and dynamic theme engine, showcasing the intersection of production-ready scalability and premium UI/UX."
            eyebrow="Realtime Chat & Video Calls"
            variant="text"
            buttonLabel="Details"
            onButtonClick={onOpenStreamify}
          />
        </BentoTilt>

        <BentoTilt className="min-h-[32rem] sm:min-h-[32rem]">
          <BentoCard
            src=""
            title={<>College connection</>}
            description="College Connection is a web application designed to help college students connect with each other. It allows students to create profiles, view others' profiles, and reach out through social media links. Additionally, it provides a centralized space to access and share academic notes for all semesters."
            eyebrow="Academic Network"
            variant="text"
            buttonLabel="Details"
            onButtonClick={onOpenCollegeConnection}
          />
        </BentoTilt>

        <BentoTilt className="min-h-[32rem] sm:min-h-[32rem]">
          <BentoCard
            src=""
            title={<>Meme lab</>}
            description="A gesture-based reaction board powered by computer vision. Your physical expressions are the controller, triggering iconic memes through real-time landmark tracking."
            eyebrow="AI Memes"
            variant="full"
            buttonLabel="Details"
            onButtonClick={onOpenMemeLab}
          />
        </BentoTilt>
      </div>
    </section>
  );
};

export default BentoGrid;
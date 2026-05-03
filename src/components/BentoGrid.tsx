import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard from "./BentoCard";
import BentoTilt from "./BentoTilt";

gsap.registerPlugin(ScrollTrigger);

const BentoGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".bento-grid__item", grid);
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(items, { opacity: 0, y: 40 });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          once: true,
        },
      });

      items.forEach((item, index) => {
        const floatingNode =
          item.querySelector<HTMLElement>("[data-bento-float='true']") ?? item;

        gsap.to(floatingNode, {
          y: index % 2 === 0 ? -6 : 6,
          duration: 3 + index * 0.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="feature-bento px-4 sm:px-6 md:px-10 lg:px-16 mb-16 sm:mb-20"
      aria-label="Selected Projects"
    >
      <div className="mb-8 sm:mb-10 lg:mb-14">
        <h2 className="font-display mt-12 sm:mt-16 lg:mt-20 mb-10 sm:mb-14 lg:mb-20 font-medium tracking-tight text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="text-white/40"> Selected</span> Projects
        </h2>
      </div>

      <div
        ref={gridRef}
        className="grid w-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-2"
      >
        <BentoTilt className="bento-grid__item min-h-[240px] sm:min-h-[280px] md:min-h-[320px]">
          <BentoCard
            src=""
            title={<>reader&apos;s robin</>}
            description="A social reading platform with privacy controls, real-time messaging, auth, and an AI vocabulary layer built into the product flow."
            eyebrow="Deep Build"
            variant="text"
          >
            <a
              href="https://reader-s-robin.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/20 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Visit Site
              <ArrowUpRight
                size={16}
                className="sm:w-[18px] sm:h-[18px]"
                strokeWidth={1.8}
              />
            </a>
          </BentoCard>
        </BentoTilt>

        <BentoTilt className="bento-grid__item min-h-[240px] sm:min-h-[280px] md:min-h-[320px]">
          <BentoCard
            src=""
            title={<>streamify</>}
            description="Real-time chat and video work with JWT auth, stronger API response times, and backend systems that stay clean under pressure."
            eyebrow="Realtime"
            variant="text"
          >
            <a
              href="https://streamify-pvt-1.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/20 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Visit Site
              <ArrowUpRight
                size={16}
                className="sm:w-[18px] sm:h-[18px]"
                strokeWidth={1.8}
              />
            </a>
          </BentoCard>
        </BentoTilt>

        <BentoTilt className="bento-grid__item min-h-[240px] sm:min-h-[280px] md:min-h-[320px]">
          <BentoCard
            src=""
            title={<>College connection</>}
            description="An academic networking platform shaped around discovery, profile systems, and role-based access that worked for real students."
            eyebrow="Scale"
            variant="text"
          >
            <a
              href="https://college-connection.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/20 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Visit Site
              <ArrowUpRight
                size={16}
                className="sm:w-[18px] sm:h-[18px]"
                strokeWidth={1.8}
              />
            </a>
          </BentoCard>
        </BentoTilt>

        <BentoTilt className="bento-grid__item min-h-[240px] sm:min-h-[280px] md:min-h-[320px]">
          <BentoCard
            src=""
            title={<>Meme lab</>}
            description="A more cinematic tile for motion studies, visual polish, and interface experiments that push the portfolio past plain screenshots."
            eyebrow="Visual Pass"
            variant="full"
          >
            <a
              href="https://fahhhhhhhh.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-white/20 bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Visit Site
              <ArrowUpRight
                size={16}
                className="sm:w-[18px] sm:h-[18px]"
                strokeWidth={1.8}
              />
            </a>
          </BentoCard>
        </BentoTilt>
      </div>
    </section>
  );
};

export default BentoGrid;
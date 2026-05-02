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
        <BentoTilt className="min-h-[22rem] sm:min-h-[24rem]">
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
              className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Visit Site
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>
          </BentoCard>
        </BentoTilt>

        <BentoTilt className="min-h-[22rem] sm:min-h-[24rem]">
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
              className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Visit Site
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>
          </BentoCard>
        </BentoTilt>

        <BentoTilt className="min-h-[22rem] sm:min-h-[24rem]">
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
              className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Visit Site
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>
          </BentoCard>
        </BentoTilt>

        <BentoTilt className="min-h-[22rem] sm:min-h-[24rem]">
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
              className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Visit Site
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </a>
          </BentoCard>
        </BentoTilt>
      </div>
    </section>
  );
};

export default BentoGrid;

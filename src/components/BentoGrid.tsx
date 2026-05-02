import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard from "./BentoCard";
import BentoTilt from "./BentoTilt";

import connectionsPoster from "../assets/connections.png";
import labPoster from "../assets/fahhhh.png";
import readersRobinPoster from "../assets/readers robin.png";
import streamifyPoster from "../assets/streamify.png";

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
    <section className="feature-bento" aria-label="Selected work">
      <div
        ref={gridRef}
        className="grid h-auto w-full grid-cols-1 gap-5 sm:gap-6 lg:h-[135vh] lg:grid-cols-2 lg:grid-rows-3"
      >
        <BentoTilt>
          <BentoCard
            src=""
            title={<>reader&apos;s robin</>}
            description="A social reading platform with privacy controls, real-time messaging, auth, and an AI vocabulary layer built into the product flow."
            eyebrow="Deep Build"
            variant="text"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium text-white">
              Visit Site
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </div>
          </BentoCard>
        </BentoTilt>

        <BentoTilt>
          <BentoCard
            src=""
            title={<>streamify</>}
            description="Real-time chat and video work with JWT auth, stronger API response times, and backend systems that stay clean under pressure."
            eyebrow="Realtime"
            variant="text"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium text-white">
              Visit Site
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </div>
          </BentoCard>
        </BentoTilt>


 <BentoTilt>
          <BentoCard
            src=""
            title={<>College connection</>}
            description="An academic networking platform shaped around discovery, profile systems, and role-based access that worked for real students."
            eyebrow="Scale"
            variant="text"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium text-white">
              Visit Site
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </div>
          </BentoCard>
        </BentoTilt>


 <BentoTilt>
          <BentoCard
            src=""
            title={<>Meme lab</>}
            description="A more cinematic tile for motion studies, visual polish, and interface experiments that push the portfolio past plain screenshots."
            eyebrow="Visual Pass"
            variant="full"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium text-white">
              Visit Site
              <ArrowUpRight size={18} strokeWidth={1.8} />
            </div>
          </BentoCard>
        </BentoTilt>
        

      </div>
    </section>
  );
};

export default BentoGrid;

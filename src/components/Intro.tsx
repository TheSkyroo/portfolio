import { useRef } from "react";
import { CornerDownRight } from "lucide-react";
import Iam from "./Iam";

const IAM_QUOTES = [
  "I am the danger.",
  "I am Batman.",
  "I am vengeance",
  "I am inevitable.",
  "I am the one who knocks.",
  "I am the algorithm.",
  "I am Thor, son of Odin!",
  "I am Light Yagami…",
  "I am Monkey D. Luffy!",
  "I am Kratos.",
];

const Intro = () => {
  const introRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <hr className="section-divider" />

      <div className="snapshot-section__accent" aria-hidden="true">
        <span className="snapshot-section__arrow text-white/30">
          <CornerDownRight size={24} strokeWidth={1.5} />
        </span>
      </div>

      <div
        ref={introRef}
        className="relative col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start cursor-none"
        data-hide-cursor="true"
      >
        <Iam words={IAM_QUOTES} containerRef={introRef} />

        <div className="snapshot-section__headline mt-20 mb-20 ">
          <p className="font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.92] tracking-[-0.04em] text-[#f2ede5]">
            Hi, I&apos;m{" "}
            <span className="text-white/40 italic font-medium">Ishant.</span> I
            build clean, fast products that make complexity feel{" "}
            <span className="text-white/40 italic">simple.</span>
          </p>
        </div>

        <div className="snapshot-section__copy mt-20 mb-20">
          <p className="font-sans text-[clamp(1.1rem,1.6vw,1.8rem)] leading-[1.35] tracking-[-0.02em] text-[#f2ede5]/60">
            Full-stack developer building{" "}
            <span className="text-white/80">scalable</span>,{" "}
            <span className="text-white/80">real-time</span> applications with
            React, Next.js, and Node.js, with a focus on performance, system
            design, and AI-powered features.
          </p>
        </div>
      </div>
      <hr className="section-divider" />
    </>
  );
};

export default Intro;

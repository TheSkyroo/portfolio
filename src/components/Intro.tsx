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
  "I am Light Yagami… the god of this new world.",
  "I am Monkey D. Luffy, and I’m gonna be King of the Pirates!",
  "I am Kratos.",
];

const Intro = () => {
  const introRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={introRef} className="relative cursor-none mb-20">
      <div className="snapshot-section__accent" aria-hidden="true">
        <span className="snapshot-section__arrow">
          <CornerDownRight size={22} strokeWidth={1.6} />
        </span>
      </div>

      <Iam words={IAM_QUOTES} containerRef={introRef} />

      <div className="snapshot-section__headline mb-16">
        <p>
          Hi, I&apos;m Ishant. I build clean, fast products that make
          complexity feel simple.
        </p>
      </div>

      <div className="snapshot-section__copy mb-16">
        <p>
          Full-stack developer building scalable, real-time applications with
          React, Next.js, and Node.js, with a focus on performance, system
          design, and AI-powered features
        </p>
      </div>
    </div>
  );
};

export default Intro;

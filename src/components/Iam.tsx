import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import IshantImg from "../assets/Ishnat.png";

interface IamProps {
  words: string[];
  containerRef: React.RefObject<HTMLElement | null>;
}

const Iam = ({ words, containerRef }: IamProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Smooth GSAP Text Cycler (Slide + Fade)
  useEffect(() => {
    if (!words.length) return;

    const interval = setInterval(() => {
      const tl = gsap.timeline();

      tl.to(textRef.current, {
        opacity: 0,
        x: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % words.length);
          gsap.set(textRef.current, { x: 10 });
        },
      });

      tl.to(textRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [words]);

  // 2. High-Performance Mouse Follower
  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    const xTo = gsap.quickTo(button, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(button, "y", { duration: 0.6, ease: "power3" });
    const opacityTo = gsap.quickTo(button, "opacity", {
      duration: 0.4,
      ease: "power2.out",
    });
    const scaleTo = gsap.quickTo(button, "scale", {
      duration: 0.4,
      ease: "power3.out",
    });

    const getClampedPos = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const btnRect = button.getBoundingClientRect();
      const hw = btnRect.width / 2;
      const hh = btnRect.height / 2;

      return {
        x: Math.max(hw, Math.min(rect.width - hw, x)),
        y: Math.max(hh, Math.min(rect.height - hh, y)),
        isInside:
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y, isInside } = getClampedPos(e.clientX, e.clientY);

      if (isInside) {
        xTo(x);
        yTo(y);
        opacityTo(1);
        scaleTo(1);
      } else {
        opacityTo(0);
        scaleTo(0.8);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);

  return (
    <div
      ref={buttonRef}
      className="pointer-events-none absolute left-0 top-0 z-50 flex h-[350px] w-[260px] flex-col overflow-hidden rounded-[40px] border border-white/10 bg-[#121212]/90 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] opacity-0 backdrop-blur-2xl"
      style={{
        transform: "translate(-50%, -50%) scale(0.8)",
        willChange: "transform, opacity",
      }}
    >
      {/* Top Image Section */}
      <div className="m-4 mb-0 flex-grow overflow-hidden rounded-[32px] bg-gradient-to-br from-white/10 to-white/5 p-[1px]">
        <div className="h-full w-full overflow-hidden rounded-[31px] bg-[#1a1a1a]">
          <img
            src={IshantImg}
            alt="Ishant Sinha"
            className="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-110"
            style={{ mixBlendMode: "luminosity" }}
          />
        </div>
      </div>

      {/* Bottom Text Section */}
      <div className="flex flex-col px-6 py-5 text-[#f2ede5]">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30">
            Full Stack Developer
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display truncate text-xl font-medium italic leading-tight tracking-tight text-white/90">
              I am
            </span>
            {""}
            <span
              ref={textRef}
              className="font-display truncate text-xl font-medium italic leading-tight tracking-tight text-white/90"
            >
              {words[currentIndex]}
            </span>
          </div>
        </div>

        <p className="mt-4 text-[12px] leading-relaxed text-[#f2ede5]/50">
          A builder of ideas, where code meets imagination.
        </p>
      </div>

      {/* Decorative Scanline Effect */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20" />
    </div>
  );
};

export default Iam;

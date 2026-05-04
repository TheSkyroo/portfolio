import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % words.length);
          gsap.set(textRef.current, { y: 10 });
        }
      });
      
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });

    }, 1000);

    return () => clearInterval(interval);
  }, [words]);

  // 2. High-Performance Mouse Follower
  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    // Initial setup to avoid CSS conflict
    gsap.set(button, { xPercent: -50, yPercent: -50, scale: 0.8 });

    // Quick setters for performance (snappy like a real cursor)
    const xTo = gsap.quickTo(button, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(button, "y", { duration: 0.15, ease: "power3" });
    const opacityTo = gsap.quickTo(button, "opacity", { duration: 0.4, ease: "power2.out" });
    const scaleTo = gsap.quickTo(button, "scale", { duration: 0.4, ease: "power3.out" });

    const getClampedPos = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Ensure button stays within the container boundaries
      const btnRect = button.getBoundingClientRect();
      const hw = btnRect.width / 2;
      const hh = btnRect.height / 2;

      return {
        x: Math.max(hw, Math.min(rect.width - hw, x)),
        y: Math.max(hh, Math.min(rect.height - hh, y)),
        isInside: clientX >= rect.left && clientX <= rect.right && 
                  clientY >= rect.top && clientY <= rect.bottom
      };
    };

    let wasInside = false;
    const handleMouseMove = (e: MouseEvent) => {
      const { x, y, isInside } = getClampedPos(e.clientX, e.clientY);
      
      if (isInside) {
        if (!wasInside) {
          // Instantly teleport to cursor on first entry to avoid jumping from (0,0)
          gsap.set(button, { x, y });
          xTo(x);
          yTo(y);
          wasInside = true;
        }
        xTo(x);
        yTo(y);
        opacityTo(1);
        scaleTo(1);
      } else {
        if (wasInside) {
          wasInside = false;
          opacityTo(0);
          scaleTo(0.8);
        }
      }
    };

    // Use window listener for global tracking to ensure it doesn't "drop" the button
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [containerRef]);

  return (
    <div
      ref={buttonRef}
      className="pointer-events-none absolute left-0 top-0 z-50 flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-base font-semibold text-white opacity-0 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-[background-color,color,border-color] duration-300"
      style={{
        willChange: "transform, opacity",
      }}
    >
      <span 
        ref={textRef}
        className="whitespace-nowrap tracking-tight inline-block"
      >
        {words[currentIndex]}
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
    </div>
  );
};

export default Iam;

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FooterDetailProps {
  isVisible: boolean; // true for text mode, false for circle mode
  containerRef: React.RefObject<HTMLElement | null>;
}

const FOOTER_WORDS = [
  "You seem interested. Let’s talk",
  "Still here? That’s a good sign",
  "Curious minds build great things",
  "Something caught your eye, right?",
  "Let’s turn this into a conversation",
  "I think we’d build something great together",
  "Not just code, I build solutions",
  "If you’re impressed, imagine working together",
  "Let’s create something impactful",
  "Still scrolling? I’ll take that as a yes",
  "Go ahead, click. I don’t bite",
  "Let’s skip the formalities and build something cool",
  "Let’s build products people actually love",
  "I turn ideas into shipped products",
  "Let’s make your next project faster and better",
  "Great things happen when we connect",
  "I build. I optimize. I deliver.",
  "Let’s solve real problems together",
];

const FooterDetail = ({ isVisible, containerRef }: FooterDetailProps) => {
  const detailRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Text Cycler
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVisible) return;

      const tl = gsap.timeline();
      tl.to(textRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % FOOTER_WORDS.length);
          gsap.set(textRef.current, { y: 10 });
        },
      });
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isVisible]);

  // 2. High-performance Mouse Follower & Shape Morph
  useEffect(() => {
    const container = containerRef.current;
    const detail = detailRef.current;
    if (!container || !detail) return;

    const xTo = gsap.quickTo(detail, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(detail, "y", { duration: 0.6, ease: "power3" });

    gsap.set(detail, { xPercent: -50, yPercent: -50, opacity: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);

      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        gsap.to(detail, { opacity: 1, scale: 1, duration: 0.3 });
      } else {
        gsap.to(detail, { opacity: 0, scale: 0.8, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);

  // 3. Morph animation when isVisible changes
  useEffect(() => {
    const detail = detailRef.current;
    if (!detail) return;

    if (isVisible) {
      // Morph to Pill
      gsap.to(detail, {
        width: "auto",
        height: "auto",
        borderRadius: "999px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderWidth: "1px",
        padding: "1rem 2.25rem",
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      // Morph to Circle
      gsap.to(detail, {
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderWidth: "1px",
        padding: "0",
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [isVisible]);

  return (
    <div
      ref={detailRef}
      className="pointer-events-none absolute left-0 top-0 z-50 flex items-center justify-center border-white text-black shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-colors duration-300"
      style={{ 
        willChange: "transform, opacity, width, height, border-radius",
        overflow: "hidden"
      }}
    >
      <div 
        className="flex items-center justify-center"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.2s" }}
      >
        <span
          ref={textRef}
          className="whitespace-nowrap text-base font-bold tracking-tight font-sans"
        >
          {FOOTER_WORDS[currentIndex]}
        </span>
      </div>
    </div>
  );
};

export default FooterDetail;


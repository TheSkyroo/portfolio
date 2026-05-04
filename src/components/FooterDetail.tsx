import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FooterDetailProps {
  isVisible: boolean; // Renamed from label to reflect new logic
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

  // 1. Text Cycler (Slide + Fade) - inspired by Iam.tsx
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
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

  // 2. High-performance Mouse Follower
  useEffect(() => {
    const container = containerRef.current;
    const detail = detailRef.current;
    if (!container || !detail) return;

    const xTo = gsap.quickTo(detail, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(detail, "y", { duration: 0.6, ease: "power3" });
    const opacityTo = gsap.quickTo(detail, "opacity", {
      duration: 0.4,
      ease: "power2.out",
    });
    const scaleTo = gsap.quickTo(detail, "scale", {
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.set(detail, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.8 });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      xTo(x);
      yTo(y);

      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside && isVisible) {
        opacityTo(1);
        scaleTo(1);
      } else {
        opacityTo(0);
        scaleTo(0.8);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [containerRef, isVisible]);

  return (
    <div
      ref={detailRef}
      className="pointer-events-none absolute left-0 top-0 z-50 flex items-center gap-3 rounded-full font-bold border border-white bg-white px-9 py-4 text-base font-sans text-black opacity-0 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-[background-color,color,border-color] duration-300 hover:bg-white hover:text-black active:scale-95"
      style={{ willChange: "transform, opacity" }}
    >
      <span
        ref={textRef}
        className="whitespace-nowrap tracking-tight inline-block"
      >
        {FOOTER_WORDS[currentIndex]}
      </span>
    </div>
  );
};

export default FooterDetail;

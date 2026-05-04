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
  const iconRef = useRef<HTMLSpanElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Text Cycler
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVisible) return;

      const tl = gsap.timeline();
      tl.to(textRef.current, {
        opacity: 0,
        y: -8,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % FOOTER_WORDS.length);
          gsap.set(textRef.current, { y: 8, scale: 0.95 });
        },
      });
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isVisible]);

  // 2. High-performance Mouse Follower (Magnetic feel)
  useEffect(() => {
    const container = containerRef.current;
    const detail = detailRef.current;
    if (!container || !detail) return;

    const xTo = gsap.quickTo(detail, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(detail, "y", { duration: 0.4, ease: "power3" });

    gsap.set(detail, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0 });

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
        gsap.to(detail, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
        });
      } else {
        gsap.to(detail, {
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
          ease: "power2.in",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);

  // 3. Morph animation when isVisible changes (Premium feel)
  useEffect(() => {
    const detail = detailRef.current;
    if (!detail) return;

    if (isVisible) {
      // Morph to Pill
      gsap.to(detail, {
        width: "auto",
        height: "auto",
        borderRadius: "999px",
        backgroundColor: "#ffffff",
        padding: "0.85rem 2rem",
        duration: 0.5,
        ease: "elastic.out(1, 0.75)",
      });
      gsap.to(iconRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        delay: 0.1,
      });
    } else {
      // Morph to Circle
      gsap.to(detail, {
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        padding: "0",
        duration: 0.4,
        ease: "back.inOut(1.7)",
      });
      gsap.to(iconRef.current, { scale: 0, opacity: 0, duration: 0.2 });
    }
  }, [isVisible]);

  return (
    <div
      ref={detailRef}
      className="pointer-events-none absolute left-0 top-0 z-50 flex items-center justify-center border border-white/20 text-black shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
      style={{
        willChange: "transform, opacity, width, height, border-radius",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center gap-4"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <span
          ref={textRef}
          className="whitespace-nowrap text-sm font-bold tracking-[0.12em] font-sans uppercase"
        >
          {FOOTER_WORDS[currentIndex]}
        </span>
      </div>
    </div>
  );
};;

export default FooterDetail;


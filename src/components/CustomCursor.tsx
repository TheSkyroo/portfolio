import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current) return;

    // Use GSAP's quickTo for high-performance following
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.15,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.15,
      ease: "power3",
    });

    const onMouseMove = (e: MouseEvent) => {
      // Adjust offset by half the size of the cursor (e.g., 20px / 2 = 10)
      xTo(e.clientX - 10);
      yTo(e.clientY - 10);
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "20px",
        height: "20px",
        backgroundColor: "#000000",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 999999,
        mixBlendMode: "difference", // makes it look cool over different backgrounds
      }}
    />
  );
};

export default CustomCursor;

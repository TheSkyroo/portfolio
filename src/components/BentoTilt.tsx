import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import gsap from "gsap";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

const BentoTilt = ({ children, className }: BentoTiltProps) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = tiltRef.current;
    if (!element || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    gsap.set(element, {
      transformPerspective: 1400,
      transformStyle: "preserve-3d",
    });

    const rotateXTo = gsap.quickTo(element, "rotateX", {
      duration: 0.38,
      ease: "power3.out",
    });
    const rotateYTo = gsap.quickTo(element, "rotateY", {
      duration: 0.38,
      ease: "power3.out",
    });
    const scaleTo = gsap.quickTo(element, "scale", {
      duration: 0.38,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 0.38,
      ease: "power3.out",
    });

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      const relativeX = (event.clientX - bounds.left) / bounds.width;
      const relativeY = (event.clientY - bounds.top) / bounds.height;

      rotateYTo((relativeX - 0.5) * 13);
      rotateXTo((0.5 - relativeY) * 13);
      scaleTo(1.01);
      yTo(-6);
    };

    const handlePointerLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      scaleTo(1);
      yTo(0);
    };

    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={tiltRef}
      className={clsx("bento-grid__item relative will-change-transform", className)}
    >
      {children}
    </div>
  );
};

export default BentoTilt;

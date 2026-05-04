import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import gsap from "gsap";

type BentoCardVariant = "media" | "full" | "text";
type BentoCardTone = "neutral" | "violet";

interface BentoCardProps {
  src: string;
  title: ReactNode;
  description: string;
  isComingSoon?: boolean;
  posterSrc?: string;
  eyebrow?: string;
  variant?: BentoCardVariant;
  tone?: BentoCardTone;
  className?: string;
  children?: ReactNode;
  onButtonClick?: () => void;
  buttonLabel?: string;
}

const BentoCard = ({
  src,
  title,
  description,
  isComingSoon = false,
  posterSrc,
  eyebrow,
  variant = "media",
  tone = "neutral",
  className,
  children,
  onButtonClick,
  buttonLabel,
}: BentoCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
  const floatingButtonRef = useRef<HTMLButtonElement>(null);
  const mediaRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const glossRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) {
      return;
    }

    const allowHoverMotion =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(glossRef.current, {
        opacity: 0,
      });

      if (!allowHoverMotion) {
        gsap.set(descriptionRef.current, {
          y: 0,
          opacity: 1,
        });

        return;
      }

      gsap.set(descriptionRef.current, {
        y: 18,
        opacity: variant === "text" ? 0.9 : 0.74,
      });

      const hoverTimeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      if (mediaRef.current) {
        hoverTimeline.to(
          mediaRef.current,
          {
            scale: 1.12,
            duration: 0.9,
          },
          0,
        );
      }

      hoverTimeline
        .to(
          contentRef.current,
          {
            y: -14,
            duration: 0.55,
          },
          0,
        )
        .to(
          descriptionRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
          },
          0.05,
        )
        .to(
          glossRef.current,
          {
            opacity: 1,
            duration: 0.45,
          },
          0,
        );

      if (badgeRef.current) {
        hoverTimeline.to(
          badgeRef.current,
          {
            y: -4,
            duration: 0.4,
          },
          0,
        );
      }

      const handlePointerEnter = () => hoverTimeline.play();
      const handlePointerLeave = () => hoverTimeline.reverse();

      card.addEventListener("mouseenter", handlePointerEnter);
      card.addEventListener("mouseleave", handlePointerLeave);

      return () => {
        card.removeEventListener("mouseenter", handlePointerEnter);
        card.removeEventListener("mouseleave", handlePointerLeave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, [variant]);

  const showMedia = variant !== "text";

  useEffect(() => {
    const card = cardRef.current;
    const button = floatingButtonRef.current;
    if (!card || !button) return;

    const xTo = gsap.quickTo(button, "x", {
      duration: 0.6,
      ease: "power3",
    });
    const yTo = gsap.quickTo(button, "y", {
      duration: 0.6,
      ease: "power3",
    });
    const opacityTo = gsap.quickTo(button, "opacity", {
      duration: 0.4,
      ease: "power2.out",
    });
    const scaleTo = gsap.quickTo(button, "scale", {
      duration: 0.3,
      ease: "power3.out",
    });

    const getClampedPos = (clientX: number, clientY: number) => {
      const rect = card.getBoundingClientRect();
      const { width, height } = rect;
      
      let x = clientX - rect.left;
      let y = clientY - rect.top;

      const btnRect = button.getBoundingClientRect();
      const halfWidth = btnRect.width / 2;
      const halfHeight = btnRect.height / 2;

      return {
        x: Math.max(halfWidth, Math.min(width - halfWidth, x)),
        y: Math.max(halfHeight, Math.min(height - halfHeight, y)),
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getClampedPos(e.clientX, e.clientY);
      xTo(x);
      yTo(y);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Instantly set position before showing to avoid jump
      gsap.set(button, { x, y });
      xTo(x);
      yTo(y);
      
      opacityTo(1);
      scaleTo(1);
      card.addEventListener("mousemove", handleMouseMove);
    };

    const handleMouseLeave = () => {
      opacityTo(0);
      card.removeEventListener("mousemove", handleMouseMove);
    };

    const handleButtonMouseEnter = () => scaleTo(1.1);
    const handleButtonMouseLeave = () => scaleTo(1);

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mouseenter", handleButtonMouseEnter);
    button.addEventListener("mouseleave", handleButtonMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", handleButtonMouseEnter);
      button.removeEventListener("mouseleave", handleButtonMouseLeave);
    };
  }, [buttonLabel]);

  return (
    <article
      ref={cardRef}
      data-bento-float="true"
      className={clsx(
        "group relative h-full overflow-hidden rounded-2xl border shadow-[0_30px_80px_rgba(0,0,0,0.28)]",
        "border-white/10 bg-zinc-950",
        tone === "violet" &&
          "border-violet-300/20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_30%),linear-gradient(135deg,#7c3aed_0%,#4c1d95_48%,#12051f_100%)]",
        className,
      )}
    >
      {showMedia ? (
        <div className="absolute inset-0 overflow-hidden">
          {posterSrc ? (
            <img
              src={posterSrc}
              alt=""
              aria-hidden="true"
              className={clsx(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                videoFailed ? "opacity-100" : "opacity-35",
              )}
            />
          ) : null}

          <video
            ref={mediaRef}
            className={clsx(
              "absolute inset-0 h-full w-full object-cover scale-[1.03]",
              videoFailed ? "opacity-0" : "opacity-100",
            )}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setVideoFailed(true)}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,rgba(9,9,11,0.08)_0%,rgba(9,9,11,0.36)_36%,rgba(9,9,11,0.92)_100%)]" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.03),transparent_30%)]" />
      )}

      <div
        ref={glossRef}
        className="pointer-events-none absolute inset-0 bg-white/8 backdrop-blur-[2px]"
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {eyebrow ? (
              <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-white/70">
                {eyebrow}
              </span>
            ) : null}
          </div>

          {isComingSoon ? (
            <span
              ref={badgeRef}
              className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-emerald-200"
            >
              Coming Soon
            </span>
          ) : null}
        </div>

        <div
          ref={contentRef}
          className={clsx(
            "relative mt-auto",
            variant === "text" ? "max-w-[32rem]" : "max-w-[30rem]",
          )}
        >
          <h3
            className={clsx(
              "max-w-[10ch] text-[2.25rem] leading-[0.9] tracking-[-0.08em] text-white sm:text-[3rem]",
              variant === "full" && "max-w-[12ch] text-[2rem] sm:text-[2.6rem]",
              variant === "text" &&
                "max-w-[16ch] text-[2.6rem] sm:text-[3.6rem]",
            )}
          >
            {title}
          </h3>

          <p
            ref={descriptionRef}
            className={clsx(
              "mt-4 max-w-[30rem] text-sm leading-6 tracking-[-0.02em] text-white/78 sm:text-base",
              variant === "text" && "text-white/88",
            )}
          >
            {description}
          </p>

          {children ? <div className="mt-5">{children}</div> : null}
        </div>
      </div>

      {buttonLabel && (
        <button
          ref={floatingButtonRef}
          onClick={(e) => {
            e.stopPropagation();
            onButtonClick?.();
          }}
          className="pointer-events-auto absolute left-0 top-0 z-50 flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-base font-semibold text-white opacity-0 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-[background-color,color,border-color] duration-300 hover:bg-white hover:text-black active:scale-95"
          style={{
            transform: "translate(-50%, -50%)",
            willChange: "transform, opacity",
          }}
        >
          <span className="whitespace-nowrap tracking-tight">{buttonLabel}</span>
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
        </button>
      )}
    </article>
  );
};



export default BentoCard;

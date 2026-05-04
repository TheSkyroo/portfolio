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
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
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
  onMouseEnter,
  onMouseLeave,
}: BentoCardProps) => {
  const cardRef = useRef<HTMLElement>(null);
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

    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => onMouseEnter?.();
    const handleMouseLeave = () => onMouseLeave?.();

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [onMouseEnter, onMouseLeave]);

  return (
    <article
      ref={cardRef}
      data-bento-float="true"
      data-hide-cursor="true"
      className={clsx(
        "group relative h-full overflow-hidden rounded-2xl border shadow-[0_30px_80px_rgba(0,0,0,0.28)] cursor-none",
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
            src={src}
            loop
            muted
            autoPlay
            playsInline
            onCanPlay={() => setVideoFailed(false)}
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
      )}

      {/* Glass overlay */}
      <div
        ref={glossRef}
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.12),transparent_40%)]"
      />

      <div className="relative z-20 flex h-full flex-col justify-end p-8 sm:p-12">
        {eyebrow && (
          <div className="mb-6 flex items-center gap-3">
            <span
              ref={badgeRef}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/60 backdrop-blur-md"
            >
              {eyebrow}
            </span>
          </div>
        )}

        <div
          ref={contentRef}
          className={clsx(
            "transition-all duration-500",
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
    </article>
  );
};

export default BentoCard;

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
    if (!card) return;

    const allowHoverMotion =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(glossRef.current, { opacity: 0 });

      if (!allowHoverMotion) {
        gsap.set(descriptionRef.current, { y: 0, opacity: 1 });
        return;
      }

      gsap.set(descriptionRef.current, {
        y: 16,
        opacity: variant === "text" ? 0.9 : 0.8,
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      if (mediaRef.current) {
        tl.to(mediaRef.current, { scale: 1.08, duration: 0.6 }, 0);
      }

      tl.to(contentRef.current, { y: -10, duration: 0.4 }, 0)
        .to(descriptionRef.current, { y: 0, opacity: 1, duration: 0.4 }, 0.05)
        .to(glossRef.current, { opacity: 1, duration: 0.3 }, 0);

      if (badgeRef.current) {
        tl.to(badgeRef.current, { y: -3, duration: 0.3 }, 0);
      }

      const enter = () => tl.play();
      const leave = () => tl.reverse();

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);

      return () => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      };
    }, cardRef);

    return () => ctx.revert();
  }, [variant]);

  const showMedia = variant !== "text";

  return (
    <article
      ref={cardRef}
      className={clsx(
        "group relative w-full h-full min-h-[260px] sm:min-h-[320px] md:min-h-[360px] overflow-hidden rounded-xl sm:rounded-2xl border",
        "border-white/10 bg-zinc-950 shadow-lg sm:shadow-[0_20px_60px_rgba(0,0,0,0.3)]",
        tone === "violet" &&
          "border-violet-300/20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_30%),linear-gradient(135deg,#7c3aed_0%,#4c1d95_48%,#12051f_100%)]",
        className,
      )}
    >
      {showMedia ? (
        <div className="absolute inset-0 overflow-hidden">
          {posterSrc && (
            <img
              src={posterSrc}
              alt=""
              aria-hidden="true"
              className={clsx(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                videoFailed ? "opacity-100" : "opacity-40",
              )}
            />
          )}

          <video
            ref={mediaRef}
            className={clsx(
              "absolute inset-0 w-full h-full object-cover scale-[1.02]",
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

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/90" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      )}

      <div
        ref={glossRef}
        className="pointer-events-none absolute inset-0 bg-white/10 backdrop-blur-[1px]"
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 md:p-6">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {eyebrow && (
              <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] sm:text-xs uppercase tracking-widest text-white/70">
                {eyebrow}
              </span>
            )}
          </div>

          {isComingSoon && (
            <span
              ref={badgeRef}
              className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2.5 py-1 text-[10px] sm:text-xs uppercase tracking-widest text-emerald-200"
            >
              Coming Soon
            </span>
          )}
        </div>

        <div
          ref={contentRef}
          className={clsx(
            "mt-auto w-full",
            variant === "text"
              ? "max-w-full sm:max-w-md"
              : "max-w-full sm:max-w-lg",
          )}
        >
          <h3
            className={clsx(
              "text-[1.6rem] leading-tight tracking-tight text-white",
              "sm:text-[2.2rem] md:text-[2.6rem] lg:text-[3rem]",
              variant === "full" && "sm:text-[2rem] md:text-[2.4rem]",
              variant === "text" && "sm:text-[2.4rem] md:text-[3.2rem]",
            )}
          >
            {title}
          </h3>

          <p
            ref={descriptionRef}
            className={clsx(
              "mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-white/80",
              variant === "text" && "text-white/90",
            )}
          >
            {description}
          </p>

          {children && <div className="mt-4 sm:mt-5">{children}</div>}
        </div>
      </div>
    </article>
  );
};

export default BentoCard;
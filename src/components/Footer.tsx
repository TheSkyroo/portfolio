import { useState, useEffect } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";

const Footer = ({ className }: { className?: string }) => {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("ishaant69@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className={`relative flex flex-col items-center justify-center pt-14 pb-12 w-full ${className || ""}`}>
      <p className="text-[0.7rem] sm:text-xs font-mono tracking-[0.2em] text-white/70 uppercase mb-6">
        Let's get in touch
      </p>

      <a
        href="https://drive.google.com/file/d/1EHxskocqcvlWY15GOlQYolY3-gvh7EAS/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-white/5 hover:border-white/20 mb-16"
      >
        View Resume
        <ArrowUpRight
          size={16}
          strokeWidth={1.5}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>

      <div className="w-full overflow-hidden text-center">
        <h2 className="font-display mb-6 text-[clamp(2.5rem,10vw,8rem)] leading-none text-white/90 selection:bg-white/20">
          ishaant69@gmail.com
        </h2>
      </div>

      <button
        onClick={handleCopy}
        className="mt-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-mono text-white/80 transition-colors hover:bg-white/10"
      >
        {copied ? "Copied!" : "Copy Email"}
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {["LinkedIn", "Github", "Instagram"].map((platform) => (
          <a
            key={platform}
            href="#"
            className="rounded-full border border-white/15 px-6 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            {platform}
          </a>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-xs font-mono tracking-widest text-white/40">
          {time}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

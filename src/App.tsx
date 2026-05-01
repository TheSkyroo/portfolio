import React, { useEffect, useRef } from 'react';
import { ArrowDown, ExternalLink } from 'lucide-react';
import PhysicsTags from './components/PhysicsTags';
import gsap from 'gsap';
import heroImage from './assets/hero.png';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const resumeBtnRef = useRef<HTMLAnchorElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations
      gsap.from(navRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
      });

      gsap.from(resumeBtnRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });

      gsap.from(heroRef.current, {
        opacity: 0,
        scale: 0.7,
        y: 50,
        duration: 2,
        ease: 'expo.out',
        delay: 0.4
      });

      gsap.from(nameRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.8
      });

      gsap.from(scrollRef.current, {
        opacity: 0,
        duration: 1,
        delay: 1.5
      });

      // Ambient hero float
      gsap.to(heroRef.current, {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={containerRef}
      className="relative h-screen w-full bg-black flex flex-col items-center justify-between p-8 md:p-12 overflow-hidden selection:bg-purple-500/30 cursor-none"
    >
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 border border-purple-500/50 rounded-full pointer-events-none z-[100] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      
      {/* Texture Overlay */}
      <div className="grain pointer-events-none" />
      
      {/* Background Glow */}
      <div className="absolute inset-0 gradient-glow pointer-events-none opacity-50" />

      {/* Top Navigation */}
      <nav ref={navRef} className="w-full flex justify-between items-center z-50">
        <div className="text-sm font-bold tracking-[0.3em] uppercase">
          Ishant Sinha
        </div>
        <div className="hidden md:flex gap-10 text-xs font-medium tracking-widest uppercase text-white/50">
          <a href="#" className="hover:text-white transition-colors">Projects</a>
          <a href="#" className="hover:text-white transition-colors">Skills</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <a
          ref={resumeBtnRef}
          href="#"
          className="group flex items-center gap-2 px-6 py-2.5 border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all hover:bg-white hover:text-black glass-card"
        >
          View Resume
          <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </nav>

      {/* Hero Content Area */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center">
        {/* Description Headline (Top Leftish) */}
        <div 
          ref={headlineRef} 
          className="absolute top-10 left-0 max-w-[280px] md:max-w-[320px] z-30"
        >
          <h2 className="text-sm md:text-base font-medium leading-relaxed text-white/60">
            Web developer focused on delivering thoughtful, scalable, and user-centric solutions.
          </h2>
        </div>

        {/* Physics Layer */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <PhysicsTags nameBoundsRef={nameRef} />
        </div>

        {/* Hero Isometric Image */}
        <div 
          ref={heroRef}
          className="relative z-10 w-full max-w-[500px] md:max-w-[700px] aspect-square flex items-center justify-center"
        >
          <img 
            src={heroImage} 
            alt="Hero Graphic" 
            className="w-full h-full object-contain filter drop-shadow-[0_0_80px_rgba(168,85,247,0.4)]"
          />
        </div>

        {/* Large Name Text (Bottom Anchor) */}
        <div className="absolute bottom-0 w-full flex flex-col items-center z-30">
          <h1 
            ref={nameRef}
            className="text-7xl md:text-[10rem] lg:text-[14rem] font-serif leading-none tracking-tight pointer-events-auto bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-purple-200/20"
            style={{ 
              fontVariant: 'small-caps',
              WebkitTextStroke: '0.5px rgba(255,255,255,0.2)'
            }}
          >
            Ishant Sinha
          </h1>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full flex justify-between items-center z-50">
        <div ref={scrollRef}>
          <button className="w-12 h-12 flex items-center justify-center border border-white/5 rounded-full hover:bg-white/5 transition-colors glass-card">
            <ArrowDown size={18} className="animate-bounce text-purple-400" />
          </button>
        </div>
        <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">
          Scroll to explore
        </div>
      </div>
    </main>
  );
};

export default App;

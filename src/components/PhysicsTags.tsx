import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

interface TagProps {
  label: string;
  isActive?: boolean;
  isProfile?: boolean;
  imageUrl?: string;
}

const TAG_DATA: TagProps[] = [
  { label: 'Web developer' },
  { label: '2+ Years Exp' },
  { label: 'Next.js' },
  { label: 'React.js' },
  { label: 'Full Stack' },
  { label: 'GDG marketing lead', isActive: true },
  { label: '', isProfile: true, imageUrl: 'https://i.pravatar.cc/150?u=ishant' },
];

interface PhysicsTagsProps {
  nameBoundsRef: React.RefObject<HTMLHeadingElement | null>;
}

const PhysicsTags: React.FC<PhysicsTagsProps> = ({ nameBoundsRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tagsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 0.5; // Slightly lower gravity for "floaty" feel

    const render = Render.create({
      element: containerRef.current,
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Boundaries
    const ground = Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true });
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, -1000, width, 100, { isStatic: true });

    World.add(engine.world, [ground, leftWall, rightWall, ceiling]);

    let nameBody: Matter.Body | null = null;

    const updateNameBody = () => {
      if (nameBoundsRef.current) {
        const rect = nameBoundsRef.current.getBoundingClientRect();
        if (nameBody) World.remove(engine.world, nameBody);
        
        // Create a static body for the large text name
        nameBody = Bodies.rectangle(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          rect.width,
          rect.height,
          { 
            isStatic: true, 
            chamfer: { radius: 20 },
            render: { visible: false }
          }
        );
        World.add(engine.world, nameBody);
      }
    };

    updateNameBody();

    // Create Tag Bodies
    const bodies: Matter.Body[] = [];
    TAG_DATA.forEach((tag) => {
      const x = (Math.random() * 0.6 + 0.2) * width; // Center-ish horizontal scatter
      const y = -Math.random() * 800; // Drop from higher up
      
      let body;
      if (tag.isProfile) {
        body = Bodies.circle(x, y, 35, { 
          restitution: 0.7,
          friction: 0.1,
          frictionAir: 0.02,
          slop: 0.5
        });
      } else {
        const w = tag.label.length * 9 + 45;
        const h = 45;
        body = Bodies.rectangle(x, y, w, h, { 
          restitution: 0.7,
          friction: 0.1,
          frictionAir: 0.02,
          chamfer: { radius: 22 },
          angle: (Math.random() - 0.5) * 1
        });
      }
      bodies.push(body);
    });

    World.add(engine.world, bodies);

    // Mouse Interaction
    const mouse = Mouse.create(canvasRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.15,
        render: { visible: false }
      }
    });
    World.add(engine.world, mouseConstraint);

    // Disable scrolling interference
    (mouse as any).element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    (mouse as any).element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    // Sync Loop
    const update = () => {
      bodies.forEach((body, i) => {
        const element = tagsRef.current[i];
        if (element) {
          const { x, y } = body.position;
          const angle = body.angle;
          element.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
          element.style.top = '0px';
          element.style.left = '0px';
          element.style.position = 'absolute';
          element.style.marginTop = `-${element.offsetHeight / 2}px`;
          element.style.marginLeft = `-${element.offsetWidth / 2}px`;
        }
      });
      requestAnimationFrame(update);
    };
    update();

    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      updateNameBody();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Engine.clear(engine);
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engine.world, false);
    };
  }, [nameBoundsRef]);

  return (
    <div ref={containerRef} className="relative w-full h-full pointer-events-auto">
      {/* Invisible Canvas for Physics Interaction */}
      <canvas ref={canvasRef} className="absolute inset-0 cursor-grab active:cursor-grabbing opacity-0 z-30" />
      
      {/* Visual Tags */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {TAG_DATA.map((tag, i) => (
          <div
            key={i}
            ref={(el) => { tagsRef.current[i] = el; }}
            className={`
              flex items-center justify-center whitespace-nowrap
              ${tag.isProfile ? 'w-16 h-16 md:w-20 md:h-20 rounded-full' : 'px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg'}
              shadow-[0_8px_32px_rgba(0,0,0,0.3)]
              text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/80 transition-opacity duration-700
            `}
          >
            {tag.isProfile ? (
              <img 
                src={tag.imageUrl} 
                alt="Profile" 
                className="w-full h-full rounded-full border-2 border-purple-500/40 object-cover shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              />
            ) : (
              <div className="flex items-center gap-3">
                {tag.isActive && <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,1)]" />}
                {tag.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhysicsTags;

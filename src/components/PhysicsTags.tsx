import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

interface TagConfig {
  label: string;
  hasStatusDot?: boolean;
}

const TAGS: TagConfig[] = [
  { label: "Web Developer" },
  { label: "2+ Years Exp" },
  { label: "Next.js" },
  { label: "React.js" },
  { label: "Full Stack" },
  { label: "GDG Marketing Lead", hasStatusDot: true },
];

/* ── Helpers ────────────────────────────────────────── */

/** Measure how wide a tag pill will be once rendered. */
function measureTag(label: string, hasStatusDot: boolean): { w: number; h: number } {
  const span = document.createElement("span");
  span.style.cssText = `
    position:absolute;visibility:hidden;white-space:nowrap;
    font-family:"IBM Plex Mono",monospace;font-size:18px;
    letter-spacing:-0.04em;padding:0 32px;
  `;
  span.textContent = label;
  if (hasStatusDot) {
    // add space for the dot + gap
    span.textContent += "   •";
  }
  document.body.appendChild(span);
  const w = span.offsetWidth + 8; // small buffer
  document.body.removeChild(span);
  const h = 52;
  return { w: Math.max(w, 100), h };
}

/* ── Component ──────────────────────────────────────── */

const PhysicsTags = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [tagBodies, setTagBodies] = useState<
    { body: Matter.Body; tag: TagConfig; w: number; h: number }[]
  >([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 1.8, scale: 0.001 },
    });
    engineRef.current = engine;

    // Create renderer (invisible – we render with DOM)
    const render = Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });
    renderRef.current = render;

    // Hide the canvas – we draw our own DOM tags
    render.canvas.style.position = "absolute";
    render.canvas.style.top = "0";
    render.canvas.style.left = "0";
    render.canvas.style.pointerEvents = "none";
    render.canvas.style.opacity = "0";

    // Walls
    const wallThickness = 60;
    const floorY = height - 34; // floor sits slightly above the bottom, leaving a gap before the name

    const floor = Bodies.rectangle(width / 2, floorY + wallThickness / 2, width * 2, wallThickness, {
      isStatic: true,
      friction: 0.8,
      restitution: 0.15,
      render: { visible: false },
    });

    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 3, {
      isStatic: true,
      render: { visible: false },
    });

    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 3, {
      isStatic: true,
      render: { visible: false },
    });

    Composite.add(engine.world, [floor, leftWall, rightWall]);

    // Create tag bodies
    const createdBodies: { body: Matter.Body; tag: TagConfig; w: number; h: number }[] = [];

    TAGS.forEach((tag, i) => {
      const { w, h } = measureTag(tag.label, !!tag.hasStatusDot);

      // Spread tags across the width, start above the visible area
      const x = (width / (TAGS.length + 1)) * (i + 1) + (Math.random() - 0.5) * 40;
      const y = -80 - i * 70; // stagger vertically above viewport

      const body = Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: h / 2 }, // pill shape
        restitution: 0.25,
        friction: 0.4,
        frictionAir: 0.02,
        density: 0.002,
        render: { visible: false },
      });

      createdBodies.push({ body, tag, w, h });
      Composite.add(engine.world, body);
    });

    setTagBodies(createdBodies);

    // Mouse drag
    const mouse = Mouse.create(container);
    // Prevent page scroll when dragging inside the physics area
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.6,
        damping: 0.15,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    // Keep mouse in sync with render
    render.mouse = mouse;

    // Run
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    // Sync DOM tags to physics bodies
    const syncDOM = () => {
      setTagBodies((prev) => [...prev]); // trigger re-render
      animFrameRef.current = requestAnimationFrame(syncDOM);
    };
    animFrameRef.current = requestAnimationFrame(syncDOM);

    // Cursor feedback when hovering/dragging
    Events.on(mouseConstraint, "startdrag", () => {
      container.style.cursor = "grabbing";
    });
    Events.on(mouseConstraint, "enddrag", () => {
      container.style.cursor = "grab";
    });

    // Handle resize
    const handleResize = () => {
      const newW = container.offsetWidth;
      const newH = container.offsetHeight;

      render.canvas.width = newW;
      render.canvas.height = newH;
      render.options.width = newW;
      render.options.height = newH;

      // Move floor
      Matter.Body.setPosition(floor, {
        x: newW / 2,
        y: newH - 2 + wallThickness / 2,
      });

      // Move walls
      Matter.Body.setPosition(leftWall, { x: -wallThickness / 2, y: newH / 2 });
      Matter.Body.setPosition(rightWall, { x: newW + wallThickness / 2, y: newH / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="physics-tags-container"
      style={{ cursor: "grab" }}
    >
      {tagBodies.map(({ body, tag, w, h }) => (
        <div
          key={tag.label}
          className="physics-tag"
          style={{
            width: w,
            height: h,
            transform: `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`,
          }}
        >
          <span>{tag.label}</span>
          {tag.hasStatusDot && <span className="physics-tag__dot" />}
        </div>
      ))}
    </div>
  );
};

export default PhysicsTags;

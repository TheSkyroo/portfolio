import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

import crownImg from "../assets/crown.jpg";
import headphoneImg from "../assets/headphone.jpg";


type TagType = "text" | "icon" | "image";

interface TagConfig {
  type: TagType;
  label?: string;
  hasStatusDot?: boolean;
  icon?: React.ReactNode;
  imageSrc?: string;
}

const TAGS: TagConfig[] = [
  { type: "text", label: "Web Developer" },
  // {
  //   type: "icon",
  //   icon: <ArrowDown size={57} strokeWidth={3} color="#090909" />,
  // },
  { type: "text", label: "3+ Years Exp" },
  { type: "image", imageSrc: headphoneImg },
  { type: "image", imageSrc: crownImg },
  { type: "text", label: "Next.js" },
  // {
  //   type: "icon",
  //   icon: <Asterisk size={69} strokeWidth={3} color="#090909" />,
  // },
  { type: "text", label: "React.js" },
  { type: "text", label: "Full Stack" },
  { type: "text", label: "GDG Marketing Lead", hasStatusDot: true },
];

/* ── Helpers ────────────────────────────────────────── */

function getTagMetrics(width: number) {
  const isMedium = width < 1024 && width >= 560;
  const isSmall = width < 560;
  const isVerySmall = width < 400;

  let fontSize = 33;
  let paddingX = 60;
  let h = 93;
  let circleRadius = 66;

  if (isVerySmall) {
    fontSize = 12;
    paddingX = 12;
    h = 36;
    circleRadius = 24;
  } else if (isSmall) {
    fontSize = 15;
    paddingX = 18;
    h = 45;
    circleRadius = 30;
  } else if (isMedium) {
    fontSize = 22;
    paddingX = 36;
    h = 62;
    circleRadius = 44;
  }

  return { isSmall, isVerySmall, isMedium, fontSize, paddingX, h, circleRadius };
}

function measureTag(
  label: string,
  hasStatusDot: boolean,
  metrics: ReturnType<typeof getTagMetrics>,
): { w: number; h: number } {
  const span = document.createElement("span");
  span.style.cssText = `
    position:absolute;visibility:hidden;white-space:nowrap;
    font-family:"IBM Plex Mono",monospace;font-size:${metrics.fontSize}px;
    letter-spacing:-0.04em;padding:0 ${metrics.paddingX}px;
  `;
  span.textContent = label;
  if (hasStatusDot) {
    span.textContent += "   •";
  }
  document.body.appendChild(span);
  const w = span.offsetWidth + (metrics.isSmall ? 2 : 8);
  document.body.removeChild(span);

  return { w: Math.max(w, metrics.isVerySmall ? 40 : 100), h: metrics.h };
}

/* ── Component ──────────────────────────────────────── */

const PhysicsTags = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [tagBodies, setTagBodies] = useState<
    {
      body: Matter.Body;
      tag: TagConfig;
      w: number;
      h: number;
      isCircle: boolean;
      metrics: ReturnType<typeof getTagMetrics>;
    }[]
  >([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter;

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

    const floor = Bodies.rectangle(
      width / 2,
      floorY + wallThickness / 2,
      width * 2,
      wallThickness,
      {
        isStatic: true,
        friction: 0.8,
        restitution: 0.15,
        render: { visible: false },
      },
    );

    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height * 3,
      {
        isStatic: true,
        render: { visible: false },
      },
    );

    const rightWall = Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height * 3,
      {
        isStatic: true,
        render: { visible: false },
      },
    );

    const ceiling = Bodies.rectangle(
      width / 2,
      -wallThickness / 2,
      width * 2,
      wallThickness,
      {
        isStatic: true,
        friction: 0.8,
        restitution: 0.5,
        render: { visible: false },
      },
    );

    Composite.add(engine.world, [floor, leftWall, rightWall, ceiling]);

    // Create tag bodies
    const createdBodies: {
      body: Matter.Body;
      tag: TagConfig;
      w: number;
      h: number;
      isCircle: boolean;
      metrics: ReturnType<typeof getTagMetrics>;
    }[] = [];

    const metrics = getTagMetrics(width);

    TAGS.forEach((tag, i) => {
      let w: number, h: number, body: Matter.Body;
      let isCircle = false;
      const x =
        (width / (TAGS.length + 1)) * (i + 1) + (Math.random() - 0.5) * 40;
      const y = 60 + Math.random() * 40; // spawn inside the container below ceiling

      if (tag.type === "text") {
        const dims = measureTag(tag.label || "", !!tag.hasStatusDot, metrics);
        w = dims.w;
        h = dims.h;

        body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: h / 2 }, // pill shape
          restitution: 0.25,
          friction: 0.4,
          frictionAir: 0.02,
          density: 0.002,
          render: { visible: false },
        });
      } else {
        isCircle = true;
        const radius = metrics.circleRadius;
        w = radius * 2;
        h = radius * 2;

        body = Bodies.circle(x, y, radius, {
          restitution: 0.25,
          friction: 0.4,
          frictionAir: 0.02,
          density: 0.002,
          render: { visible: false },
        });
      }

      createdBodies.push({ body, tag, w, h, isCircle, metrics });
      Composite.add(engine.world, body);
    });

    setTagBodies(createdBodies);

    // Mouse drag
    const mouse = Mouse.create(container);
    const mouseWheelHandler = (
      mouse as Matter.Mouse & { mousewheel?: (event: Event) => void }
    ).mousewheel;

    // Prevent page scroll when dragging inside the physics area
    if (mouseWheelHandler) {
      mouse.element.removeEventListener("mousewheel", mouseWheelHandler);
      mouse.element.removeEventListener("DOMMouseScroll", mouseWheelHandler);
    }

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

    let isDragging = false;
    Events.on(mouseConstraint, "startdrag", () => {
      isDragging = true;
      container.style.cursor = "grabbing";
    });
    Events.on(mouseConstraint, "enddrag", () => {
      isDragging = false;
      const found = Matter.Query.point(
        createdBodies.map((b) => b.body),
        mouseConstraint.mouse.position,
      );
      container.style.cursor = found.length > 0 ? "grab" : "default";
    });
    Events.on(mouseConstraint, "mousemove", () => {
      if (isDragging) return;
      const found = Matter.Query.point(
        createdBodies.map((b) => b.body),
        mouseConstraint.mouse.position,
      );
      container.style.cursor = found.length > 0 ? "grab" : "default";
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

      // Move walls and ceiling
      Matter.Body.setPosition(leftWall, { x: -wallThickness / 2, y: newH / 2 });
      Matter.Body.setPosition(rightWall, {
        x: newW + wallThickness / 2,
        y: newH / 2,
      });
      Matter.Body.setPosition(ceiling, { x: newW / 2, y: -wallThickness / 2 });
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
    <div ref={sceneRef} className="physics-tags-container">
      {tagBodies.map(({ body, tag, w, h, isCircle, metrics }, index) => {
        const key = tag.label || tag.imageSrc || `icon-${index}`;
        return (
          <div
            key={key}
            className={`physics-tag ${isCircle ? "physics-tag--circle" : ""}`}
            style={{
              width: w,
              height: h,
              transform: `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`,
            }}
          >
            {tag.type === "text" && (
              <>
                <span style={{ fontSize: `${metrics.fontSize}px` }}>
                  {tag.label}
                </span>
                {tag.hasStatusDot && (
                  <span
                    className="physics-tag__dot"
                    style={{
                      transform: metrics.isSmall 
                        ? "scale(0.6)" 
                        : metrics.isMedium 
                          ? "scale(0.85)" 
                          : "none",
                    }}
                  />
                )}
              </>
            )}
            {tag.type === "icon" && tag.icon}
            {tag.type === "image" && tag.imageSrc && (
              <img
                src={tag.imageSrc}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  pointerEvents: "none",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PhysicsTags;
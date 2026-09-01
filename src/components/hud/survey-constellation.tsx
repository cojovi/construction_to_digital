"use client";

/**
 * DIGITAL TWIN STAGE
 * ---------------------------------------------------------------------------
 * Solid and glass surfaces establish the building first; survey particles,
 * a laser section plane, exploded BIM layers, and technical callouts provide
 * the motion-graphics layer without turning the house into decorative lights.
 */

import { useScroll } from "motion/react";
import { useEffect, useRef } from "react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

type Vec3 = { x: number; y: number; z: number };
type ScreenPoint = { x: number; y: number; depth: number };
type Material = "shell" | "glass" | "roof" | "slab" | "core";
type ModelFace = { points: readonly Vec3[]; material: Material; group: number };
type ModelEdge = { a: Vec3; b: Vec3; group: number; strength?: number };

const CYAN = "22, 200, 244";
const CYAN_HOT = "133, 240, 255";
const AMBER = "255, 181, 36";
const INK = "222, 247, 255";

const GROUP_OFFSETS: readonly Vec3[] = [
  { x: 0, y: -0.14, z: 0 },
  { x: -0.34, y: 0.05, z: 0.18 },
  { x: 0.38, y: 0.06, z: -0.2 },
  { x: 0, y: 0.48, z: 0 },
  { x: 0, y: 0.72, z: 0 },
];

function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeOutExpo(value: number) {
  return value >= 1 ? 1 : 1 - 2 ** (-10 * value);
}

function smooth(value: number) {
  const v = clamp(value);
  return v * v * (3 - 2 * v);
}

function box(
  min: Vec3,
  max: Vec3,
  material: Material,
  group: number,
): { faces: ModelFace[]; edges: ModelEdge[] } {
  const v = [
    { x: min.x, y: min.y, z: min.z },
    { x: max.x, y: min.y, z: min.z },
    { x: max.x, y: max.y, z: min.z },
    { x: min.x, y: max.y, z: min.z },
    { x: min.x, y: min.y, z: max.z },
    { x: max.x, y: min.y, z: max.z },
    { x: max.x, y: max.y, z: max.z },
    { x: min.x, y: max.y, z: max.z },
  ] as const;
  const faces: ModelFace[] = [
    { points: [v[0], v[1], v[2], v[3]], material, group },
    { points: [v[5], v[4], v[7], v[6]], material, group },
    { points: [v[4], v[0], v[3], v[7]], material, group },
    { points: [v[1], v[5], v[6], v[2]], material, group },
    { points: [v[3], v[2], v[6], v[7]], material, group },
    { points: [v[4], v[5], v[1], v[0]], material, group },
  ];
  const pairs = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ] as const;
  return {
    faces,
    edges: pairs.map(([a, b]) => ({ a: v[a], b: v[b], group })),
  };
}

function gableRoof(
  xMin: number,
  xMax: number,
  yEave: number,
  yRidge: number,
  zMin: number,
  zMax: number,
  group: number,
): { faces: ModelFace[]; edges: ModelEdge[] } {
  const zMid = (zMin + zMax) / 2;
  const v = [
    { x: xMin, y: yEave, z: zMin },
    { x: xMin, y: yRidge, z: zMid },
    { x: xMin, y: yEave, z: zMax },
    { x: xMax, y: yEave, z: zMin },
    { x: xMax, y: yRidge, z: zMid },
    { x: xMax, y: yEave, z: zMax },
  ] as const;
  const faces: ModelFace[] = [
    { points: [v[0], v[3], v[4], v[1]], material: "roof", group },
    { points: [v[1], v[4], v[5], v[2]], material: "roof", group },
    { points: [v[0], v[1], v[2]], material: "shell", group },
    { points: [v[3], v[5], v[4]], material: "shell", group },
  ];
  const pairs = [
    [0, 1], [1, 2], [0, 2], [3, 4], [4, 5], [3, 5],
    [0, 3], [1, 4], [2, 5],
  ] as const;
  return {
    faces,
    edges: pairs.map(([a, b]) => ({ a: v[a], b: v[b], group, strength: 1.2 })),
  };
}

function buildModel() {
  const pieces = [
    box({ x: -0.58, y: -0.48, z: -0.38 }, { x: 0.58, y: 0.18, z: 0.38 }, "core", 0),
    box({ x: -1.02, y: -0.48, z: -0.3 }, { x: -0.28, y: 0.04, z: 0.5 }, "shell", 1),
    box({ x: 0.38, y: -0.48, z: -0.5 }, { x: 1.02, y: 0.24, z: 0.3 }, "glass", 2),
    box({ x: -0.7, y: 0.18, z: -0.32 }, { x: 0.18, y: 0.52, z: 0.3 }, "glass", 3),
    gableRoof(-1.08, -0.22, 0.07, 0.36, -0.36, 0.56, 4),
    box({ x: 0.3, y: 0.24, z: -0.57 }, { x: 1.1, y: 0.3, z: 0.38 }, "roof", 4),
    box({ x: -0.72, y: -0.53, z: -0.5 }, { x: 1.08, y: -0.48, z: 0.54 }, "slab", 0),
  ];
  return {
    faces: pieces.flatMap((piece) => piece.faces),
    edges: pieces.flatMap((piece) => piece.edges),
  };
}

const MODEL = buildModel();
const SURVEY_POINTS = Array.from({ length: 290 }, (_, index) => {
  const angle = rand(index * 2.31) * Math.PI * 2;
  const radius = 0.9 + rand(index * 4.17 + 2) * 0.5;
  return {
    point: {
      x: Math.cos(angle) * radius,
      y: -0.5 + rand(index * 8.91 + 4) * 1.2,
      z: Math.sin(angle) * radius * 0.72,
    },
    phase: rand(index * 12.7 + 7) * Math.PI * 2,
    tone: rand(index * 19.3 + 9),
  };
});

export function SurveyConstellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 1;
    let height = 1;
    let dpr = 1;
    let raf = 0;
    let inViewport = true;
    let documentVisible = !document.hidden;
    let scrollProgress = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let intro = reduceMotion ? 1 : 0;
    let previous = performance.now();

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, width < 700 ? 1.5 : 1.8);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    resize();
    const monoFont = getComputedStyle(wrap).getPropertyValue("--hud-mono").trim() || "monospace";

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { inViewport = entry.isIntersecting; },
      { rootMargin: "120px" },
    );
    visibilityObserver.observe(wrap);
    const onVisibilityChange = () => { documentVisible = !document.hidden; };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const unsubscribe = scrollYProgress.on("change", (value) => { scrollProgress = value; });
    const onPointerMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => { targetX = 0; targetY = 0; };
    wrap.addEventListener("pointermove", onPointerMove, { passive: true });
    wrap.addEventListener("pointerleave", onPointerLeave);

    const transformedPoint = (source: Vec3, group: number, assembly: number, explode: number) => {
      const offset = GROUP_OFFSETS[group] ?? GROUP_OFFSETS[0];
      const roofLift = group === 4 ? explode * 0.19 : group === 3 ? explode * 0.075 : 0;
      const wingShift = group === 1 ? -explode * 0.055 : group === 2 ? explode * 0.075 : 0;
      return {
        x: source.x + offset.x * (1 - assembly) + wingShift,
        y: source.y + offset.y * (1 - assembly) + roofLift,
        z: source.z + offset.z * (1 - assembly),
      };
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!inViewport || !documentVisible) return;

      const dt = Math.min(48, Math.max(0, now - previous)) / 1000;
      previous = now;
      if (!reduceMotion) intro = clamp(intro + dt / 1.35);

      const assembly = reduceMotion ? 1 : easeOutExpo(intro);
      const explode = reduceMotion ? 0.38 : smooth(scrollProgress * 1.55);
      const time = reduceMotion ? 2.4 : now / 1000;
      pointerX += (targetX - pointerX) * (reduceMotion ? 1 : 0.045);
      pointerY += (targetY - pointerY) * (reduceMotion ? 1 : 0.045);

      const yaw = -0.64 + pointerX * 0.12 - explode * 0.1;
      const pitch = -0.29 + pointerY * 0.075 + explode * 0.06;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      const isCompact = width < 700;
      const radius = isCompact ? width * 0.27 : Math.min(width, height) * 0.31;
      const centerX = width * (isCompact ? 0.48 : 0.31);
      const centerY = height * 0.51;

      const project = (source: Vec3): ScreenPoint => {
        const rx = source.x * cosY + source.z * sinY;
        const rz = -source.x * sinY + source.z * cosY;
        const ry = source.y * cosX - rz * sinX;
        const depth = source.y * sinX + rz * cosX;
        const perspective = 1 / (1.08 + depth * 0.12);
        return { x: centerX + rx * radius * perspective, y: centerY - ry * radius * perspective, depth };
      };

      ctx.clearRect(0, 0, width, height);

      const bloom = ctx.createRadialGradient(centerX, centerY, radius * 0.08, centerX, centerY, radius * 1.35);
      bloom.addColorStop(0, `rgba(${CYAN}, 0.12)`);
      bloom.addColorStop(0.48, `rgba(${CYAN}, 0.035)`);
      bloom.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, width, height);

      // Survey ground plane.
      ctx.lineWidth = 0.65;
      for (let grid = -7; grid <= 7; grid += 1) {
        const alpha = grid === 0 ? 0.24 : 0.075;
        const a = project({ x: grid * 0.2, y: -0.54, z: -1.45 });
        const b = project({ x: grid * 0.2, y: -0.54, z: 1.45 });
        const c = project({ x: -1.45, y: -0.54, z: grid * 0.2 });
        const d = project({ x: 1.45, y: -0.54, z: grid * 0.2 });
        ctx.strokeStyle = `rgba(${CYAN}, ${alpha * assembly})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.moveTo(c.x, c.y); ctx.lineTo(d.x, d.y);
        ctx.stroke();
      }

      // Orbital calibration rings.
      ctx.save();
      ctx.translate(centerX, centerY + radius * 0.06);
      ctx.rotate(-0.18);
      ctx.setLineDash([3, 8]);
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = `rgba(${CYAN_HOT}, ${0.19 * assembly})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.2, radius * 0.47, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([1, 13]);
      ctx.strokeStyle = `rgba(${AMBER}, ${0.16 * assembly})`;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.89, radius * 0.78, 0.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      const projectedFaces = MODEL.faces.map((face) => {
        const screen = face.points.map((point) => project(transformedPoint(point, face.group, assembly, explode)));
        const depth = screen.reduce((total, point) => total + point.depth, 0) / screen.length;
        return { ...face, screen, depth };
      });
      projectedFaces.sort((a, b) => b.depth - a.depth);

      const materialFill: Record<Material, [number, number]> = {
        shell: [0.21, 0.085], glass: [0.16, 0.045], roof: [0.26, 0.11], slab: [0.18, 0.07], core: [0.19, 0.07],
      };

      for (const face of projectedFaces) {
        const [nearAlpha, farAlpha] = materialFill[face.material];
        const alpha = (nearAlpha + (face.depth + 1) * 0.026) * assembly;
        const gradient = ctx.createLinearGradient(
          face.screen[0].x, face.screen[0].y,
          face.screen[face.screen.length - 1].x, face.screen[face.screen.length - 1].y,
        );
        gradient.addColorStop(0, face.material === "roof"
          ? `rgba(${AMBER}, ${Math.max(farAlpha, alpha * 0.42)})`
          : `rgba(${CYAN_HOT}, ${Math.max(farAlpha, alpha)})`);
        gradient.addColorStop(1, face.material === "glass"
          ? `rgba(${CYAN}, ${Math.max(0.025, alpha * 0.23)})`
          : `rgba(2, 25, 34, ${Math.max(0.25, alpha * 1.9)})`);

        ctx.beginPath();
        ctx.moveTo(face.screen[0].x, face.screen[0].y);
        for (let index = 1; index < face.screen.length; index += 1) ctx.lineTo(face.screen[index].x, face.screen[index].y);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        if (face.material === "glass" && face.screen.length === 4) {
          ctx.save();
          ctx.clip();
          ctx.lineWidth = 0.55;
          ctx.strokeStyle = `rgba(${CYAN_HOT}, ${0.18 * assembly})`;
          for (let step = 1; step < 5; step += 1) {
            const t = step / 5;
            const left = { x: face.screen[0].x + (face.screen[3].x - face.screen[0].x) * t, y: face.screen[0].y + (face.screen[3].y - face.screen[0].y) * t };
            const right = { x: face.screen[1].x + (face.screen[2].x - face.screen[1].x) * t, y: face.screen[1].y + (face.screen[2].y - face.screen[1].y) * t };
            ctx.beginPath(); ctx.moveTo(left.x, left.y); ctx.lineTo(right.x, right.y); ctx.stroke();
          }
          ctx.restore();
        }
      }

      // Crisp primary members over translucent massing.
      ctx.save();
      ctx.lineJoin = "round";
      for (const edge of MODEL.edges) {
        const a = project(transformedPoint(edge.a, edge.group, assembly, explode));
        const b = project(transformedPoint(edge.b, edge.group, assembly, explode));
        const depth = (a.depth + b.depth) / 2;
        const depthAlpha = clamp(0.48 - depth * 0.15, 0.16, 0.62);
        ctx.strokeStyle = `rgba(${edge.group === 4 ? AMBER : CYAN_HOT}, ${depthAlpha * assembly})`;
        ctx.lineWidth = (edge.strength ?? 1) * (depth < 0 ? 1.05 : 0.72);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      ctx.restore();

      // Laser section plane.
      const scanCycle = reduceMotion ? 0.58 : (Math.sin(time * 0.72) + 1) / 2;
      const scanModelX = -1.12 + scanCycle * 2.24;
      const scanTop = project({ x: scanModelX, y: 0.78, z: 0 });
      const scanBottom = project({ x: scanModelX, y: -0.6, z: 0 });
      const scanGradient = ctx.createLinearGradient(scanTop.x - 22, 0, scanTop.x + 22, 0);
      scanGradient.addColorStop(0, "rgba(22, 200, 244, 0)");
      scanGradient.addColorStop(0.5, `rgba(${CYAN_HOT}, ${0.16 * assembly})`);
      scanGradient.addColorStop(1, "rgba(22, 200, 244, 0)");
      ctx.fillStyle = scanGradient;
      ctx.fillRect(scanTop.x - 26, Math.min(scanTop.y, scanBottom.y) - 15, 52, Math.abs(scanBottom.y - scanTop.y) + 30);
      ctx.strokeStyle = `rgba(${CYAN_HOT}, ${0.72 * assembly})`;
      ctx.lineWidth = 0.85;
      ctx.beginPath(); ctx.moveTo(scanTop.x, scanTop.y); ctx.lineTo(scanBottom.x, scanBottom.y); ctx.stroke();

      // Sparse survey returns define the scanned volume.
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let surveyIndex = 0; surveyIndex < SURVEY_POINTS.length; surveyIndex += isCompact ? 2 : 1) {
        const survey = SURVEY_POINTS[surveyIndex];
        const drift = reduceMotion ? 0 : Math.sin(time * 0.48 + survey.phase) * 0.012;
        const point = project({ x: survey.point.x + drift, y: survey.point.y + drift * 0.45, z: survey.point.z });
        const proximity = 1 - clamp(Math.abs(survey.point.x - scanModelX) / 0.34);
        const opacity = (0.08 + proximity * 0.63) * assembly;
        const color = survey.tone > 0.93 ? AMBER : survey.tone > 0.84 ? CYAN_HOT : CYAN;
        const size = 0.45 + proximity * 1.25;
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
      }
      ctx.restore();

      // Geometry-locked technical callouts.
      const callouts = isCompact ? [] : [
        { anchor: { x: -0.68, y: 0.42, z: 0.08 }, dx: -74, dy: -34, label: "ROOF // CLASSIFIED" },
        { anchor: { x: 0.78, y: 0.04, z: -0.38 }, dx: 46, dy: -24, label: "FACADE // SEGMENTED" },
        { anchor: { x: 0.12, y: -0.49, z: 0.42 }, dx: 54, dy: 46, label: "LEVEL 01 // RESOLVED" },
      ];
      ctx.font = `500 8px ${monoFont}`;
      ctx.textBaseline = "middle";
      for (const callout of callouts) {
        const anchor = project(callout.anchor);
        const endX = anchor.x + callout.dx;
        const endY = anchor.y + callout.dy;
        ctx.strokeStyle = `rgba(${CYAN_HOT}, ${0.34 * assembly})`;
        ctx.fillStyle = `rgba(${INK}, ${0.7 * assembly})`;
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(anchor.x, anchor.y); ctx.lineTo(endX, endY); ctx.lineTo(endX + (callout.dx < 0 ? -18 : 18), endY); ctx.stroke();
        ctx.beginPath(); ctx.arc(anchor.x, anchor.y, 2.1, 0, Math.PI * 2); ctx.fill();
        const textX = callout.dx < 0 ? endX - 21 - ctx.measureText(callout.label).width : endX + 21;
        ctx.fillText(callout.label, textX, endY - 6);
      }

      // Calibration ticks frame the object.
      ctx.save();
      ctx.translate(centerX, centerY);
      for (let tick = 0; tick < 36; tick += 3) {
        const angle = (tick / 36) * Math.PI * 2;
        const inner = radius * 1.13;
        const outer = inner + (tick % 9 === 0 ? 9 : 5);
        ctx.strokeStyle = `rgba(${tick % 9 === 0 ? AMBER : CYAN}, ${0.26 * assembly})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner * 0.62);
        ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer * 0.62);
        ctx.stroke();
      }
      ctx.restore();
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      unsubscribe();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduceMotion, scrollYProgress]);

  return (
    <div ref={wrapRef} className="hud-hero-stage">
      <div className="hud-twin-frame" aria-hidden="true"><span /><span /><span /><span /></div>
      <canvas
        ref={canvasRef}
        className="hud-constellation"
        role="img"
        aria-label="A futuristic construction digital twin: translucent architectural volumes assemble, separate into model layers, and are measured by a moving survey scan"
      />
      <div className="hud-stage-readout pos-tl"><small>Digital twin</small><strong>Geometry resolving</strong></div>
      <div className="hud-stage-readout pos-br"><small>Model state</small><strong>Survey calibrated</strong></div>
      <div className="hud-twin-legend" aria-hidden="true">
        <span><i className="cyan" />Structure</span>
        <span><i className="amber" />Roof plane</span>
        <span><i className="glass" />Envelope</span>
      </div>
      <div className="hud-twin-status" aria-hidden="true"><span>01</span><i /><strong>PHYSICAL CAPTURE</strong><i /><span>04</span></div>
    </div>
  );
}

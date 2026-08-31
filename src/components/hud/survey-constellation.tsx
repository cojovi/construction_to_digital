"use client";

/**
 * SURVEY CONSTELLATION
 * ---------------------------------------------------------------------------
 * A single particle field that carries the entire brand thesis in one gesture:
 *
 *   SCATTER  ->  3D WIREFRAME HOUSE  ->  ROOF PLAN  ->  DATA MATRIX
 *   (chaos)      (physical work)        (survey)       (digital leverage)
 *
 * Every particle is assigned an independent target per shape. The frame blends
 * between two adjacent shapes, and the wireframe edges are drawn from BOTH
 * shapes' adjacency lists at complementary alpha, so the structure itself
 * appears to morph rather than cross-fade.
 *
 * Stage 0 -> 1 is driven by an intro spring on mount.
 * Stage 1 -> 3 is driven by hero scroll progress.
 */

import { useScroll, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type Vec = { x: number; y: number; z: number; edge: number };

const CYAN = [22, 200, 244] as const;
const CYAN_HOT = [133, 240, 255] as const;
const AMBER = [255, 181, 36] as const;
const MAGENTA = [255, 61, 120] as const;

/** Deterministic hash-based PRNG so SSR and client agree and frames are stable. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** Distribute `count` points along a polyline edge list, tagging edge ownership. */
function alongEdges(
  edges: readonly (readonly [number, number, number, number, number, number])[],
  count: number,
): Vec[] {
  const lengths = edges.map(([ax, ay, az, bx, by, bz]) =>
    Math.hypot(bx - ax, by - ay, bz - az),
  );
  const total = lengths.reduce((a, b) => a + b, 0);
  const out: Vec[] = [];

  edges.forEach((edge, edgeIndex) => {
    const [ax, ay, az, bx, by, bz] = edge;
    const share = Math.max(2, Math.round((lengths[edgeIndex] / total) * count));
    for (let i = 0; i < share; i += 1) {
      const t = share === 1 ? 0 : i / (share - 1);
      out.push({
        x: ax + (bx - ax) * t,
        y: ay + (by - ay) * t,
        z: az + (bz - az) * t,
        edge: edgeIndex,
      });
    }
  });

  // Normalize to exactly `count` entries.
  while (out.length > count) out.pop();
  while (out.length < count) {
    const donor = out[out.length - 1] ?? { x: 0, y: 0, z: 0, edge: -1 };
    out.push({ x: donor.x, y: donor.y, z: donor.z, edge: -1 });
  }
  return out;
}

/* --------------------------------------------------------------------------
   SHAPE 1 — gable house, 3D wireframe
   -------------------------------------------------------------------------- */
const HX = 0.84;
const HZ = 0.54;
const Y_FLOOR = -0.44;
const Y_EAVE = 0.08;
const Y_RIDGE = 0.52;

type E = readonly [number, number, number, number, number, number];

const HOUSE_EDGES: readonly E[] = [
  // floor slab
  [-HX, Y_FLOOR, -HZ, HX, Y_FLOOR, -HZ],
  [HX, Y_FLOOR, -HZ, HX, Y_FLOOR, HZ],
  [HX, Y_FLOOR, HZ, -HX, Y_FLOOR, HZ],
  [-HX, Y_FLOOR, HZ, -HX, Y_FLOOR, -HZ],
  // corner posts
  [-HX, Y_FLOOR, -HZ, -HX, Y_EAVE, -HZ],
  [HX, Y_FLOOR, -HZ, HX, Y_EAVE, -HZ],
  [HX, Y_FLOOR, HZ, HX, Y_EAVE, HZ],
  [-HX, Y_FLOOR, HZ, -HX, Y_EAVE, HZ],
  // eave ring
  [-HX, Y_EAVE, -HZ, HX, Y_EAVE, -HZ],
  [HX, Y_EAVE, -HZ, HX, Y_EAVE, HZ],
  [HX, Y_EAVE, HZ, -HX, Y_EAVE, HZ],
  [-HX, Y_EAVE, HZ, -HX, Y_EAVE, -HZ],
  // gables + ridge
  [-HX, Y_EAVE, -HZ, 0, Y_RIDGE, -HZ],
  [HX, Y_EAVE, -HZ, 0, Y_RIDGE, -HZ],
  [-HX, Y_EAVE, HZ, 0, Y_RIDGE, HZ],
  [HX, Y_EAVE, HZ, 0, Y_RIDGE, HZ],
  [0, Y_RIDGE, -HZ, 0, Y_RIDGE, HZ],
  // door on the front elevation
  [-0.15, Y_FLOOR, -HZ, -0.15, -0.09, -HZ],
  [-0.15, -0.09, -HZ, 0.15, -0.09, -HZ],
  [0.15, -0.09, -HZ, 0.15, Y_FLOOR, -HZ],
  // window on the front elevation
  [0.4, -0.3, -HZ, 0.68, -0.3, -HZ],
  [0.68, -0.3, -HZ, 0.68, -0.06, -HZ],
  [0.68, -0.06, -HZ, 0.4, -0.06, -HZ],
  [0.4, -0.06, -HZ, 0.4, -0.3, -HZ],
  // ridge beam drop
  [0, Y_RIDGE, 0, 0, Y_EAVE, 0],
];

/* --------------------------------------------------------------------------
   SHAPE 2 — roof plan, orthographic top-down with dimension string
   -------------------------------------------------------------------------- */
const PLAN_EDGES: readonly E[] = [
  // roof outline
  [-0.86, -0.5, 0, 0.86, -0.5, 0],
  [0.86, -0.5, 0, 0.86, 0.5, 0],
  [0.86, 0.5, 0, -0.86, 0.5, 0],
  [-0.86, 0.5, 0, -0.86, -0.5, 0],
  // ridge
  [-0.44, 0, 0, 0.44, 0, 0],
  // hips
  [-0.86, -0.5, 0, -0.44, 0, 0],
  [-0.86, 0.5, 0, -0.44, 0, 0],
  [0.86, -0.5, 0, 0.44, 0, 0],
  [0.86, 0.5, 0, 0.44, 0, 0],
  // dimension string
  [-0.86, 0.76, 0, 0.86, 0.76, 0],
  [-0.86, 0.7, 0, -0.86, 0.82, 0],
  [0.86, 0.7, 0, 0.86, 0.82, 0],
  // vertical dimension
  [1.02, -0.5, 0, 1.02, 0.5, 0],
  [0.96, -0.5, 0, 1.08, -0.5, 0],
  [0.96, 0.5, 0, 1.08, 0.5, 0],
];

export function SurveyConstellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

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

    const isSmall = window.matchMedia("(max-width: 700px)").matches;
    const COUNT = isSmall ? 620 : 1080;

    /* ---- Precompute per-shape targets ---------------------------------- */
    const houseTargets = alongEdges(HOUSE_EDGES, COUNT);
    const planTargets = alongEdges(PLAN_EDGES, COUNT);

    const scatterTargets: Vec[] = Array.from({ length: COUNT }, (_, i) => {
      const a = rand(i * 1.3) * Math.PI * 2;
      const b = Math.acos(2 * rand(i * 2.7 + 9) - 1);
      const r = 0.55 + rand(i * 3.1 + 4) * 0.85;
      return {
        x: Math.sin(b) * Math.cos(a) * r,
        y: Math.cos(b) * r * 0.72,
        z: Math.sin(b) * Math.sin(a) * r,
        edge: -1,
      };
    });

    const COLS = isSmall ? 16 : 26;
    const ROWS = Math.ceil(COUNT / COLS);
    const matrixTargets: Vec[] = Array.from({ length: COUNT }, (_, i) => {
      const c = i % COLS;
      const r = Math.floor(i / COLS);
      return {
        x: (c / (COLS - 1) - 0.5) * 1.86,
        y: (r / Math.max(1, ROWS - 1) - 0.5) * 1.34,
        z: 0,
        edge: -1,
      };
    });

    /* ---- Particle state ------------------------------------------------- */
    const px = new Float32Array(COUNT);
    const py = new Float32Array(COUNT);
    const seeded = new Float32Array(COUNT);
    const tone = new Uint8Array(COUNT);

    for (let i = 0; i < COUNT; i += 1) {
      px[i] = (rand(i * 5.1) - 0.5) * 2.4;
      py[i] = (rand(i * 7.7 + 3) - 0.5) * 2.4;
      seeded[i] = rand(i * 11.3 + 17);
      const roll = rand(i * 13.9 + 41);
      tone[i] = roll > 0.94 ? 3 : roll > 0.8 ? 2 : roll > 0.72 ? 1 : 0;
    }

    /* ---- Sizing --------------------------------------------------------- */
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* ---- Pointer parallax ----------------------------------------------- */
    let pointerX = 0;
    let pointerY = 0;
    let targetPX = 0;
    let targetPY = 0;

    const onPointer = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      targetPX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetPY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    /* ---- Stage blending -------------------------------------------------- */
    let scrollP = 0;
    const unsubscribe = scrollYProgress.on("change", (v) => {
      scrollP = v;
    });

    let intro = reduceMotion ? 1 : 0;
    let raf = 0;
    let t0 = performance.now();

    const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);
    const smooth = (v: number) => v * v * (3 - 2 * v);

    const draw = (now: number) => {
      // Clamp to a non-negative delta: the first rAF timestamp can precede the
      // `t0` captured at effect setup, which would drive `intro` negative and
      // push the stage index below zero.
      const dt = Math.min(48, Math.max(0, now - t0)) / 1000;
      t0 = now;
      const time = now / 1000;

      if (intro < 1) intro = Math.min(1, Math.max(0, intro + dt / 1.9));

      // Stage index: 0=scatter 1=house 2=plan 3=matrix
      const introStage = easeOut(intro);
      const stage = intro < 1 ? introStage : 1 + Math.min(1, scrollP / 0.9) * 2;

      // Hard-clamp the pool indices — the draw loop must never index outside
      // the four shape pools regardless of timing or scroll weirdness.
      const lower = Math.min(2, Math.max(0, Math.floor(stage)));
      const upper = Math.min(3, lower + 1);
      const mix = smooth(Math.min(1, Math.max(0, stage - lower)));

      const pools = [scatterTargets, houseTargets, planTargets, matrixTargets];
      const poolA = pools[lower];
      const poolB = pools[upper];

      // Pointer easing
      pointerX += (targetPX - pointerX) * 0.045;
      pointerY += (targetPY - pointerY) * 0.045;

      // Rotation only matters while the house is on screen.
      const houseWeight = lower === 0 ? mix : lower === 1 ? 1 - mix : 0;
      const spin = reduceMotion ? 0.55 : time * 0.22 + pointerX * 0.42;
      const tilt = reduceMotion ? -0.2 : -0.2 + pointerY * 0.16;

      const cs = Math.cos(spin);
      const sn = Math.sin(spin);
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.4;

      const project = (v: Vec, weight: number) => {
        // Blend between rotated-3D and flat presentation by shape weight.
        const rx = v.x * cs + v.z * sn;
        const rz = -v.x * sn + v.z * cs;
        const ry = v.y * ct - rz * st;
        const rz2 = v.y * st + rz * ct;

        const fx = v.x;
        const fy = v.y;

        const bx = fx + (rx - fx) * weight;
        const by = fy + (ry - fy) * weight;
        const bz = rz2 * weight;

        const persp = 1 / (1 + bz * 0.34);
        return { sx: bx * persp, sy: -by * persp, depth: bz };
      };

      ctx.clearRect(0, 0, w, h);

      // Blend each particle toward its interpolated target.
      const bufX = new Float32Array(COUNT);
      const bufY = new Float32Array(COUNT);
      const bufD = new Float32Array(COUNT);

      for (let i = 0; i < COUNT; i += 1) {
        const a = project(poolA[i], lower === 1 ? 1 : lower === 0 ? mix : 0);
        const b = project(poolB[i], upper === 1 ? 1 : upper === 0 ? mix : 0);

        let tx = a.sx + (b.sx - a.sx) * mix;
        let ty = a.sy + (b.sy - a.sy) * mix;
        const depth = a.depth + (b.depth - a.depth) * mix;

        // Idle shimmer keeps the field alive without reading as jitter.
        if (!reduceMotion) {
          const wobble = 0.008 + 0.02 * (1 - houseWeight);
          tx += Math.sin(time * 0.8 + seeded[i] * 31.4) * wobble;
          ty += Math.cos(time * 0.65 + seeded[i] * 17.9) * wobble;
        }

        const sx = cx + tx * R;
        const sy = cy + ty * R;

        // Spring toward target — staggered by seed so the swarm arrives in waves.
        const k = reduceMotion ? 1 : 0.055 + seeded[i] * 0.055;
        px[i] += (sx - px[i]) * (reduceMotion ? 1 : Math.min(1, k * (dt * 60)));
        py[i] += (sy - py[i]) * (reduceMotion ? 1 : Math.min(1, k * (dt * 60)));

        bufX[i] = px[i];
        bufY[i] = py[i];
        bufD[i] = depth;
      }

      /* ---- Wireframe edges (both shapes, complementary alpha) ---------- */
      const strokePass = (pool: Vec[], alpha: number) => {
        if (alpha <= 0.01) return;
        ctx.beginPath();
        for (let i = 0; i < COUNT - 1; i += 1) {
          if (pool[i].edge < 0 || pool[i].edge !== pool[i + 1].edge) continue;
          const dx = bufX[i + 1] - bufX[i];
          const dy = bufY[i + 1] - bufY[i];
          if (dx * dx + dy * dy > 9000) continue;
          ctx.moveTo(bufX[i], bufY[i]);
          ctx.lineTo(bufX[i + 1], bufY[i + 1]);
        }
        ctx.strokeStyle = `rgba(${CYAN[0]}, ${CYAN[1]}, ${CYAN[2]}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      strokePass(poolA, (1 - mix) * 0.4);
      strokePass(poolB, mix * 0.4);

      /* ---- Particles, batched by tone ---------------------------------- */
      const palettes = [CYAN, CYAN_HOT, AMBER, MAGENTA] as const;

      for (let toneIndex = 0; toneIndex < palettes.length; toneIndex += 1) {
        const [r, g, b] = palettes[toneIndex];
        ctx.beginPath();
        for (let i = 0; i < COUNT; i += 1) {
          if (tone[i] !== toneIndex) continue;
          const near = 1 - Math.min(1, Math.max(0, (bufD[i] + 0.6) / 1.4));
          const size = 0.9 + near * 1.5;
          ctx.moveTo(bufX[i] + size, bufY[i]);
          ctx.arc(bufX[i], bufY[i], size, 0, Math.PI * 2);
        }
        const baseAlpha = toneIndex === 0 ? 0.85 : toneIndex === 1 ? 0.95 : 0.9;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${baseAlpha})`;
        ctx.fill();
      }

      /* ---- Bloom pass on the hot particles ------------------------------ */
      if (!reduceMotion) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        for (let i = 0; i < COUNT; i += 4) {
          const pulse = 0.5 + 0.5 * Math.sin(time * 1.6 + seeded[i] * 24);
          if (pulse < 0.72) continue;
          ctx.moveTo(bufX[i] + 3.4, bufY[i]);
          ctx.arc(bufX[i], bufY[i], 3.4, 0, Math.PI * 2);
        }
        ctx.fillStyle = "rgba(22, 200, 244, 0.09)";
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      unsubscribe();
    };
  }, [reduceMotion, scrollYProgress]);

  return (
    <div ref={wrapRef} className="hud-hero-stage">
      <canvas
        ref={canvasRef}
        className="hud-constellation"
        role="img"
        aria-label="An animated particle field that assembles into a three-dimensional wireframe house, flattens into a roof plan, and resolves into a data matrix"
      />
      <div className="hud-stage-readout pos-tl">
        <small>Survey mode</small>
        <strong>Physical &rarr; Digital</strong>
      </div>
      <div className="hud-stage-readout pos-br">
        <small>Point cloud</small>
        <strong>Scale verified</strong>
      </div>
    </div>
  );
}

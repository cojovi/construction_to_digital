"use client";

/**
 * MOTION PRIMITIVES
 * ---------------------------------------------------------------------------
 * The shared vocabulary for the SURVEY // LIVE INSTRUMENT surface. Every
 * primitive honors prefers-reduced-motion by collapsing to its static form.
 *
 * Motion vocabulary is deliberately narrow — two springs and one easing curve:
 *   SNAP   spring(420, 32)  — gestures, reticle, tilt
 *   SETTLE spring(260, 26)  — entrances, layout
 *   GLIDE  cubic(0.22, 1, 0.36, 1) — long reveals, sweeps
 */

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

export const SNAP = { type: "spring", stiffness: 420, damping: 32 } as const;
export const SETTLE = { type: "spring", stiffness: 260, damping: 26 } as const;
export const GLIDE = [0.22, 1, 0.36, 1] as const;

/* ==========================================================================
   LIFT — the default scroll entrance
   ========================================================================== */

export function Lift({
  children,
  className,
  delay = 0,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduceMotion = useHydratedReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.78, delay, ease: GLIDE }}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   SCRAMBLE TEXT — decode-on-reveal, the instrument resolving a reading
   ========================================================================== */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>*#";

export function ScrambleText({
  text,
  className,
  duration = 900,
  startDelay = 0,
}: {
  text: string;
  className?: string;
  duration?: number;
  startDelay?: number;
}) {
  const reduceMotion = useHydratedReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (reduceMotion || !inView) return;

    let raf = 0;
    let start = 0;

    const timer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const progress = Math.min(1, (now - start) / duration);
        const settled = Math.floor(progress * text.length);

        let next = "";
        for (let i = 0; i < text.length; i += 1) {
          const char = text[i];
          if (char === " ") next += " ";
          else if (i < settled) next += char;
          else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }

        setOutput(next);
        if (progress < 1) raf = requestAnimationFrame(tick);
        else setOutput(text);
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [duration, inView, reduceMotion, startDelay, text]);

  return (
    <span ref={ref} className={className}>
      {reduceMotion ? text : output}
    </span>
  );
}

/* ==========================================================================
   HOLO CARD — pointer-tracked 3D tilt with a sheen that follows the cursor
   ========================================================================== */

export function HoloCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useHydratedReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), SNAP);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), SNAP);

  const sheenX = useTransform(mx, (v) => `${v * 100}%`);
  const sheenY = useTransform(my, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(circle 320px at ${sheenX} ${sheenY}, rgba(22, 200, 244, 0.14), transparent 70%)`;

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width);
    my.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
    >
      <motion.div
        className="hud-holo-sheen"
        style={reduceMotion ? undefined : { background: sheen }}
      />
      <div className="hud-holo-scan" />
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   COUNT UP — instrument readouts that spin to their value
   ========================================================================== */

export function CountUp({
  to,
  suffix = "",
  decimals = 0,
  duration = 1500,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const reduceMotion = useHydratedReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion || !inView) return;

    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / duration);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, inView, reduceMotion]);

  // Derived during render — no setState needed for the static case.
  const value = reduceMotion ? to : to * progress;

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix ? <sup>{suffix}</sup> : null}
    </span>
  );
}

/* ==========================================================================
   TELEMETRY MARQUEE — seamless infinite scroll (two tracks, transform only)
   ========================================================================== */

export type TelemetryItem = { label: string; value: string };

export function TelemetryMarquee({
  items,
  speed = 46,
}: {
  items: readonly TelemetryItem[];
  speed?: number;
}) {
  const reduceMotion = useHydratedReducedMotion();

  const row = (keyPrefix: string) => (
    <>
      {items.map((item) => (
        <span key={`${keyPrefix}-${item.label}`} className="hud-marquee-item">
          <em />
          {item.label}
          <b>{item.value}</b>
        </span>
      ))}
    </>
  );

  if (reduceMotion) {
    return (
      <div className="hud-marquee" aria-hidden="true">
        <div className="hud-marquee-track">{row("static")}</div>
      </div>
    );
  }

  const animation = {
    animate: { x: ["0%", "-100%"] },
    transition: { duration: speed, ease: "linear" as const, repeat: Infinity },
  };

  return (
    <div className="hud-marquee" aria-hidden="true">
      <motion.div className="hud-marquee-track" {...animation}>
        {row("a")}
      </motion.div>
      <motion.div className="hud-marquee-track" {...animation}>
        {row("b")}
      </motion.div>
    </div>
  );
}

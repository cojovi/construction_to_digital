"use client";

/**
 * RETICLE CURSOR
 * ---------------------------------------------------------------------------
 * A surveyor's crosshair that trails the pointer on a spring, expands over
 * interactive targets, and reads out live viewport coordinates. Fine pointers
 * only — hidden on touch via CSS and never mounted under reduced motion.
 */

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

export function ReticleCursor() {
  const reduceMotion = useHydratedReducedMotion();
  const [state, setState] = useState({ enabled: false, hot: false, x: 0, y: 0 });

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 900, damping: 46, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 900, damping: 46, mass: 0.35 });

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);

      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          const el = document.elementFromPoint(event.clientX, event.clientY);
          setState({
            enabled: true,
            hot: Boolean(el?.closest("a, button, [role='tab'], [data-hot]")),
            x: Math.round(event.clientX),
            y: Math.round(event.clientY),
          });
        });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [rawX, rawY, reduceMotion]);

  if (!state.enabled) return null;

  return (
    <motion.div className="hud-reticle" style={{ x, y }} aria-hidden="true">
      <motion.div
        className="hud-reticle-ring"
        animate={{ scale: state.hot ? 1.5 : 1, opacity: state.hot ? 1 : 0.45 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      />
      <i />
      <i />
      <i />
      <i />
      <b />
      <span className="hud-reticle-tag">
        {String(state.x).padStart(4, "0")}.{String(state.y).padStart(4, "0")}
      </span>
    </motion.div>
  );
}

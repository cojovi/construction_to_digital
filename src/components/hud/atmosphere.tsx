"use client";

/**
 * ATMOSPHERE
 * ---------------------------------------------------------------------------
 * The fixed environmental stack behind every page:
 *   - a perspective grid that drifts and *stretches with scroll velocity*
 *   - two chromatic glows (cyan signal / amber approval)
 *   - CRT scanlines and SVG feTurbulence grain
 *
 * The velocity reaction is the detail that sells "instrument": scroll fast and
 * the world smears, stop and it settles. Transform-only, never layout.
 */

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

export function Atmosphere() {
  const reduceMotion = useHydratedReducedMotion();
  const { scrollY } = useScroll();

  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 220, damping: 44, mass: 0.4 });

  const skew = useTransform(smoothVelocity, [-2600, 0, 2600], [3.2, 0, -3.2], {
    clamp: true,
  });
  const stretch = useTransform(smoothVelocity, [-2600, 0, 2600], [1.09, 1, 1.09], {
    clamp: true,
  });
  const drift = useTransform(scrollY, [0, 3200], [0, -110]);

  return (
    <div className="hud-atmos" aria-hidden="true">
      {reduceMotion ? (
        <div className="hud-atmos-grid" />
      ) : (
        <motion.div
          className="hud-atmos-grid"
          style={{ y: drift, skewY: skew, scaleY: stretch }}
        />
      )}

      <div className="hud-atmos-glow" />
      <div className="hud-atmos-scan" />

      <svg className="hud-atmos-grain">
        <filter id="hud-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hud-grain)" />
      </svg>
    </div>
  );
}

/** Corner registration marks — the viewport frames itself like a drawing sheet. */
export function FrameMarks() {
  return (
    <div className="hud-frame" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

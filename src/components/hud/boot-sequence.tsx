"use client";

/**
 * BOOT SEQUENCE
 * ---------------------------------------------------------------------------
 * A three-second instrument power-on that reads as a system coming online
 * rather than a loading spinner. Runs once per browser session (sessionStorage)
 * so navigating back to the homepage does not re-gate the visitor.
 *
 * Skipped entirely under prefers-reduced-motion.
 */

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

const LINES = [
  { label: "Survey link", value: "ONLINE", gate: false },
  { label: "Plan ingest", value: "READY", gate: false },
  { label: "Supplier index", value: "SYNCED", gate: false },
  { label: "Approval gate", value: "ARMED", gate: true },
] as const;

const KEY = "c2d-hud-boot";

export function BootSequence() {
  const reduceMotion = useHydratedReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;

    try {
      window.sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode — boot once, no persistence */
    }

    document.documentElement.style.overflow = "hidden";

    // Scheduled rather than synchronous: keeps the effect a subscription to an
    // external system (the timer) instead of a cascading render trigger.
    const open = window.setTimeout(() => setStep(-1), 0);
    const timers = LINES.map((_, index) =>
      window.setTimeout(() => setStep(index + 1), 380 + index * 430),
    );
    const done = window.setTimeout(() => {
      setStep(-2);
      document.documentElement.style.overflow = "";
    }, 2450);

    return () => {
      window.clearTimeout(open);
      timers.forEach(window.clearTimeout);
      window.clearTimeout(done);
      document.documentElement.style.overflow = "";
    };
  }, [reduceMotion]);

  // step: 0 = not started, -1 = booting (no lines yet), 1..n = lines shown,
  // -2 = finished. Derived rather than a second piece of state.
  const active = step === -1 || step > 0;
  const visibleLines = step > 0 ? step : 0;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="boot"
          className="hud-boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="hud-boot-inner">
            <div className="hud-boot-log">
              <AnimatePresence>
                {LINES.slice(0, visibleLines).map((line) => (
                  <motion.p
                    key={line.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <span>{line.label}</span>
                    <b className={line.gate ? "gate" : undefined}>{line.value}</b>
                  </motion.p>
                ))}
              </AnimatePresence>
            </div>

            <div className="hud-boot-track">
              <motion.div
                className="hud-boot-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>

            <div className="hud-boot-meta">
              <span>Construction to Digital</span>
              <span>Initializing</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

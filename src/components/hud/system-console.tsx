"use client";

/**
 * SYSTEM CONSOLE
 * ---------------------------------------------------------------------------
 * The interactive core of the page. Four products presented as selectable
 * channels on an instrument, with:
 *   - a `layoutId` indicator rail that physically slides between channels
 *   - an animated signal-flow diagram redrawn per system (SVG dash offset)
 *   - staggered capability readouts that decode in on channel change
 *   - full roving-tabindex keyboard support (arrows / home / end)
 */

import Link from "next/link";
import {
  ArrowRightIcon,
  BlueprintIcon,
  CalendarCheckIcon,
  CubeFocusIcon,
  ReceiptIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { solutions, type SolutionIcon as SolutionIconName } from "@/lib/solutions";
import { GLIDE, SETTLE } from "./motion-primitives";
import { useHydratedReducedMotion } from "./use-hydrated-reduced-motion";

function ChannelIcon({ name, size = 22 }: { name: SolutionIconName; size?: number }) {
  const props = { size, weight: "light" as const, "aria-hidden": true };
  switch (name) {
    case "blueprint":
      return <BlueprintIcon {...props} />;
    case "materials":
      return <CubeFocusIcon {...props} />;
    case "operations":
      return <CalendarCheckIcon {...props} />;
    case "billing":
      return <ReceiptIcon {...props} />;
  }
}

export function SystemConsole() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useHydratedReducedMotion();
  const active = solutions[index];

  function move(next: number) {
    const normalized = (next + solutions.length) % solutions.length;
    setIndex(normalized);
    window.requestAnimationFrame(() => {
      document.getElementById(`channel-${solutions[normalized].slug}`)?.focus();
    });
  }

  return (
    <div className="hud-console">
      <div className="hud-channels" role="tablist" aria-label="Construction to Digital systems">
        {solutions.map((solution, i) => (
          <button
            key={solution.slug}
            id={`channel-${solution.slug}`}
            className="hud-channel"
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-controls={`panel-${solution.slug}`}
            tabIndex={i === index ? 0 : -1}
            data-active={i === index}
            onClick={() => setIndex(i)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                event.preventDefault();
                move(i + 1);
              }
              if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                event.preventDefault();
                move(i - 1);
              }
              if (event.key === "Home") {
                event.preventDefault();
                move(0);
              }
              if (event.key === "End") {
                event.preventDefault();
                move(solutions.length - 1);
              }
            }}
          >
            {i === index && (
              <motion.span
                className="hud-channel-live"
                layoutId="channel-live"
                transition={reduceMotion ? { duration: 0 } : SETTLE}
              />
            )}
            <span className="hud-channel-num">0{i + 1}</span>
            <span className="hud-channel-icon">
              <ChannelIcon name={solution.icon} />
            </span>
            <span className="hud-channel-copy">
              <strong>{solution.shortName}</strong>
              <small>{solution.category}</small>
            </span>
            <ArrowRightIcon className="hud-channel-arrow" size={16} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="hud-console-screen">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={active.slug}
            id={`panel-${active.slug}`}
            className="hud-panel hud-console-panel"
            role="tabpanel"
            aria-labelledby={`channel-${active.slug}`}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: GLIDE }}
          >
            <div className="hud-panel-edge">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="hud-console-top">
              <span className="hud-status">
                <i />
                {active.status}
              </span>
              <span className="hud-mono">SYS / 0{index + 1} — {active.slug.toUpperCase()}</span>
            </div>

            <SignalFlow name={active.shortName} icon={active.icon} reduce={Boolean(reduceMotion)} />

            <p className="hud-eyebrow">{active.eyebrow}</p>
            <h3 className="hud-h3" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}>
              {active.headline}
            </h3>
            <p className="hud-copy" style={{ marginBottom: 26 }}>{active.summary}</p>

            <motion.ul
              className="hud-caps"
              initial={reduceMotion ? false : "hidden"}
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } } }}
            >
              {active.capabilities.slice(0, 4).map((capability) => (
                <motion.li
                  key={capability}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    show: { opacity: 1, x: 0, transition: SETTLE },
                  }}
                >
                  <i />
                  {capability}
                </motion.li>
              ))}
            </motion.ul>

            <div className="hud-console-foot">
              <Link className="hud-link" href={`/solutions/${active.slug}`}>
                Open {active.shortName}
                <ArrowRightIcon size={15} weight="bold" aria-hidden="true" />
              </Link>
              <span className="hud-mono" style={{ color: "var(--hud-quiet)" }}>
                {active.integrations.length} integrations
              </span>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   SIGNAL FLOW — INPUT -> [system] -> OUTPUT with a REVIEW branch.
   The paths draw themselves on every channel change; a packet rides the wire.
   -------------------------------------------------------------------------- */

function SignalFlow({
  name,
  icon,
  reduce,
}: {
  name: string;
  icon: SolutionIconName;
  reduce: boolean;
}) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 0.8, delay: 0.1 + i * 0.14, ease: GLIDE }, opacity: { duration: 0.2 } },
    }),
  };

  return (
    <div className="hud-flow" aria-hidden="true">
      <svg viewBox="0 0 660 210" preserveAspectRatio="none" className="hud-flow-svg">
        <motion.path
          d="M92 78 H262"
          custom={0}
          variants={reduce ? undefined : draw}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
        />
        <motion.path
          d="M398 78 H568"
          custom={1}
          variants={reduce ? undefined : draw}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
        />
        <motion.path
          d="M330 122 V166 H568 V102"
          custom={2}
          variants={reduce ? undefined : draw}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
          className="branch"
        />
        {!reduce && (
          <motion.circle
            r="3.4"
            className="packet"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0], cx: [92, 262, 398, 568], cy: [78, 78, 78, 78] }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.9, ease: "linear", delay: 0.9 }}
          />
        )}
      </svg>

      <span className="hud-flow-node in">Input</span>
      <span className="hud-flow-core">
        <ChannelIcon name={icon} size={19} />
        {name}
      </span>
      <span className="hud-flow-node out">Output</span>
      <span className="hud-flow-node review">Human review</span>
    </div>
  );
}

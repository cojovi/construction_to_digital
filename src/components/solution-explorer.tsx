"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  BlueprintIcon,
  CalendarCheckIcon,
  CubeFocusIcon,
  ReceiptIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { solutions, type SolutionIcon as SolutionIconName } from "@/lib/solutions";

function ExplorerIcon({ name }: { name: SolutionIconName }) {
  const props = { size: 23, weight: "light" as const, "aria-hidden": true };

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

export function SolutionExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const active = solutions[activeIndex];

  function moveSelection(nextIndex: number) {
    const normalized = (nextIndex + solutions.length) % solutions.length;
    setActiveIndex(normalized);
    window.requestAnimationFrame(() => {
      document.getElementById(`solution-tab-${solutions[normalized].slug}`)?.focus();
    });
  }

  return (
    <div className="solution-explorer">
      <div className="solution-tabs" role="tablist" aria-label="Construction to Digital solutions">
        {solutions.map((solution, index) => (
          <button
            key={solution.slug}
            id={`solution-tab-${solution.slug}`}
            className="solution-tab"
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`solution-panel-${solution.slug}`}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                event.preventDefault();
                moveSelection(index + 1);
              }
              if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                event.preventDefault();
                moveSelection(index - 1);
              }
              if (event.key === "Home") {
                event.preventDefault();
                moveSelection(0);
              }
              if (event.key === "End") {
                event.preventDefault();
                moveSelection(solutions.length - 1);
              }
            }}
          >
            <span className="solution-tab-index">0{index + 1}</span>
            <span className="solution-tab-icon">
              <ExplorerIcon name={solution.icon} />
            </span>
            <span className="solution-tab-copy">
              <strong>{solution.shortName}</strong>
              <small>{solution.category}</small>
            </span>
            <ArrowRightIcon className="solution-tab-arrow" size={18} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="solution-panel-wrap">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={active.slug}
            id={`solution-panel-${active.slug}`}
            className="solution-panel"
            role="tabpanel"
            aria-labelledby={`solution-tab-${active.slug}`}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
          >
            <div className="panel-head">
              <span className="status-label">
                <span aria-hidden="true" />
                {active.status}
              </span>
              <span className="mono-label">SYSTEM / 0{activeIndex + 1}</span>
            </div>

            <div className="system-diagram" aria-hidden="true">
              <div className="diagram-grid" />
              <div className="diagram-node node-input">INPUT</div>
              <div className="diagram-core">
                <ExplorerIcon name={active.icon} />
                <span>{active.shortName}</span>
              </div>
              <div className="diagram-node node-review">REVIEW</div>
              <div className="diagram-node node-output">OUTPUT</div>
              <svg viewBox="0 0 640 260" preserveAspectRatio="none">
                <path d="M74 130 H238" />
                <path d="M402 130 H560" />
                <path d="M320 180 V226 H560" />
              </svg>
            </div>

            <p className="eyebrow">{active.eyebrow}</p>
            <h3>{active.headline}</h3>
            <p className="panel-summary">{active.summary}</p>
            <ul className="capability-list">
              {active.capabilities.slice(0, 3).map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
            <Link className="text-link" href={`/solutions/${active.slug}`}>
              Explore {active.shortName}
              <ArrowRightIcon size={17} weight="bold" aria-hidden="true" />
            </Link>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}

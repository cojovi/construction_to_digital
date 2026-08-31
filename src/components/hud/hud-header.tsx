"use client";

/**
 * HUD HEADER
 * ---------------------------------------------------------------------------
 * Sticky instrument bar: brand lockup, underline-sweep nav, a live UTC clock
 * readout that proves the page is a running system, and an animated drawer.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { demoMailto, navigation, siteConfig } from "@/lib/site";
import { GLIDE } from "./motion-primitives";

export function HudHeader() {
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(
        [now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()]
          .map((n) => String(n).padStart(2, "0"))
          .join(":"),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="hud-header">
      <div className="hud-shell hud-header-inner">
        <Link className="hud-brand" href="/" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/brand/construction-to-digital-mark.png"
            alt=""
            width={1106}
            height={765}
            sizes="34px"
            priority
          />
          <span className="hud-brand-type">
            <strong>Construction</strong>
            <span>to Digital</span>
          </span>
        </Link>

        <nav className="hud-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hud-header-right">
          <span className="hud-clock">
            <i />
            {clock} UTC
          </span>

          <a
            className="hud-btn"
            style={{ minHeight: 42, padding: "11px 18px", fontSize: 10 }}
            href={demoMailto}
            data-analytics-event="generate_lead"
            data-analytics-location="header"
          >
            {siteConfig.primaryCta}
            <ArrowUpRightIcon size={14} weight="bold" aria-hidden="true" />
          </a>

          <button
            className="hud-burger"
            type="button"
            aria-expanded={open}
            aria-controls="hud-drawer"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XIcon size={19} /> : <ListIcon size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="drawer"
            id="hud-drawer"
            className="hud-drawer"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: GLIDE }}
          >
            <nav className="hud-shell" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <a
                className="hud-btn"
                href={demoMailto}
                data-analytics-event="generate_lead"
                data-analytics-location="mobile_navigation"
                onClick={() => setOpen(false)}
              >
                {siteConfig.primaryCta}
                <ArrowUpRightIcon size={15} weight="bold" aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

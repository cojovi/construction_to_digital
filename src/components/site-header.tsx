"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { demoMailto, navigation, siteConfig } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand-lockup" href="/" aria-label="Construction to Digital home">
          <Image
            className="brand-mark"
            src="/brand/construction-to-digital-mark.png"
            alt=""
            width={1106}
            height={765}
            sizes="44px"
          />
          <span className="brand-type">
            <strong>CONSTRUCTION</strong>
            <span>to DIGITAL</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          className="button button-small header-cta"
          href={demoMailto}
          data-analytics-event="generate_lead"
          data-analytics-location="header"
        >
          {siteConfig.primaryCta}
          <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <XIcon size={22} /> : <ListIcon size={22} />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className="mobile-nav"
        data-open={open}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <nav className="shell" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <a
            className="button"
            href={demoMailto}
            data-analytics-event="generate_lead"
            data-analytics-location="mobile_navigation"
            onClick={() => setOpen(false)}
          >
            {siteConfig.primaryCta}
            <ArrowUpRightIcon size={17} weight="bold" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}

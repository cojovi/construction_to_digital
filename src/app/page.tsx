import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  DatabaseIcon,
  FileTextIcon,
  RulerIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/ssr";
import { BlueprintVisual } from "@/components/blueprint-visual";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { SolutionExplorer } from "@/components/solution-explorer";
import { SolutionIcon } from "@/components/solution-icon";
import { solutions } from "@/lib/solutions";
import { demoMailto, siteConfig } from "@/lib/site";

const workflow = ["Plans", "Quantities", "Pricing", "Jobs", "Billing"];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const frictionPoints = [
  {
    index: "01",
    title: "Plans become a measuring queue.",
    copy: "Every estimate waits for someone to find the scale, read the roof, count the parts, and re-key the result.",
  },
  {
    index: "02",
    title: "Supplier data arrives speaking different languages.",
    copy: "Product names, units, and prices change from file to file while estimating and purchasing need one answer.",
  },
  {
    index: "03",
    title: "Job truth stays trapped behind filters.",
    copy: "Simple work-order, crew, and scheduling questions interrupt the people who know where to click.",
  },
  {
    index: "04",
    title: "Billing context crosses too many systems.",
    copy: "Invoice status, vendor bills, payments, and aging data demand a scavenger hunt before a decision can happen.",
  },
] as const;

const process = [
  {
    number: "01",
    title: "Map the real workflow",
    copy: "We start with the people, handoffs, source systems, exceptions, and approval points that exist today.",
  },
  {
    number: "02",
    title: "Connect the source of truth",
    copy: "The product queries the system where the fact actually lives instead of inventing another disconnected database.",
  },
  {
    number: "03",
    title: "Build the review gate",
    copy: "Low confidence, consequential changes, and external communication stay visible and human-approved.",
  },
  {
    number: "04",
    title: "Ship, observe, improve",
    copy: "Launch a focused workflow, learn from real use, and expand only where the next connection earns its place.",
  },
] as const;

export default function Home() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Construction to Digital solutions",
    itemListElement: solutions.map((solution, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteConfig.url}/solutions/${solution.slug}`,
      name: solution.name,
      description: solution.summary,
    })),
  };

  return (
    <main id="main-content">
      <JsonLd data={itemListSchema} />

      <section className="hero section" id="top">
        <div className="shell hero-grid">
          <Reveal className="hero-copy">
            <p className="eyebrow">AI systems for construction operations</p>
            <h1>
              <span>Physical work.</span>
              <span>Digital leverage.</span>
            </h1>
            <p className="hero-lede">
              Query billing and work orders, normalize supplier pricing, and move
              plans toward review-ready takeoffs with human approval where it matters.
            </p>
            <div className="hero-actions">
              <a
                className="button"
                href={demoMailto}
                data-analytics-event="generate_lead"
                data-analytics-location="hero"
              >
                {siteConfig.primaryCta}
                <ArrowUpRightIcon size={18} weight="bold" aria-hidden="true" />
              </a>
              <a className="button button-ghost" href="#solutions">
                {siteConfig.secondaryCta}
                <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <Reveal className="hero-media" delay={0.12}>
            <BlueprintVisual />
          </Reveal>
        </div>

        <div className="shell workflow-rail" aria-label="Connected construction workflow">
          {workflow.map((step, index) => (
            <div key={step} className="workflow-step">
              <span>0{index + 1}</span>
              <strong>{step}</strong>
              {index < workflow.length - 1 && <ArrowRightIcon size={14} aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      <section className="section friction-section">
        <div className="shell">
          <Reveal className="section-heading split-heading">
            <div>
              <p className="eyebrow">The operating gap</p>
              <h2>The handoffs are where good work slows down.</h2>
            </div>
            <p>
              Construction teams do not need another general-purpose dashboard.
              They need focused systems that read the artifact, find the live
              record, and prepare the next decision.
            </p>
          </Reveal>

          <div className="friction-grid">
            {frictionPoints.map((point, index) => (
              <Reveal key={point.index} className={`friction-item friction-${index + 1}`} delay={index * 0.05}>
                <span className="friction-index">{point.index}</span>
                <h3>{point.title}</h3>
                <p>{point.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section feature-section" id="solutions">
        <div className="shell flagship-grid">
          <Reveal className="feature-media blueprint-frame">
            <Image
              src="/images/roofing-takeoff.jpg"
              alt="Residential roof plan with cyan takeoff geometry, a gloved estimator hand, and a scale ruler"
              width={1344}
              height={768}
              sizes="(max-width: 899px) calc(100vw - 40px), 58vw"
            />
            <div className="frame-corners" aria-hidden="true" />
            <div className="image-tag tag-top">SHEET A5.2 / ROOF PLAN</div>
            <div className="image-tag tag-bottom"><span /> SCALE CHECK REQUIRED</div>
          </Reveal>

          <Reveal className="flagship-copy" delay={0.08}>
            <div className="product-number">01 / FLAGSHIP SYSTEM</div>
            <p className="eyebrow">The Drafting Table</p>
            <h2>Make the plan set useful before it reaches the estimating queue.</h2>
            <p>
              Upload residential blueprints, verify drawing scale, extract roof
              and elevation measurements, score confidence, and produce a
              consistent takeoff for review and export.
            </p>
            <ul className="check-list">
              <li><CheckIcon size={17} weight="bold" aria-hidden="true" /> Scale verification before measurement</li>
              <li><CheckIcon size={17} weight="bold" aria-hidden="true" /> Confidence shown with every result</li>
              <li><CheckIcon size={17} weight="bold" aria-hidden="true" /> Human review when the plans are ambiguous</li>
            </ul>
            <Link className="text-link" href="/solutions/drafting-table">
              Explore The Drafting Table
              <ArrowRightIcon size={17} weight="bold" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section explorer-section">
        <div className="shell">
          <Reveal className="section-heading split-heading">
            <div>
              <p className="eyebrow">Four focused products</p>
              <h2>One operating layer for the work that keeps moving.</h2>
            </div>
            <p>
              Each system owns a defined job. Together they connect the path from
              plan intake and material cost to field execution and financial closeout.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <SolutionExplorer />
          </Reveal>
        </div>
      </section>

      <section className="section material-section">
        <div className="shell material-grid">
          <Reveal className="material-copy">
            <div className="product-number">02 / DATA PRODUCT</div>
            <p className="eyebrow">Construction Material Intelligence</p>
            <h2>Turn supplier files into a pricing system.</h2>
            <p>
              Normalize inconsistent vendor exports into a dated, auditable
              pricing history that estimating, purchasing, job costing, and ERP
              workflows can all use.
            </p>
            <div className="data-points">
              <div><DatabaseIcon size={23} weight="light" aria-hidden="true" /><span><strong>Canonical schema</strong>One format across supplier files</span></div>
              <div><RulerIcon size={23} weight="light" aria-hidden="true" /><span><strong>Price history</strong>See current cost in context</span></div>
              <div><FileTextIcon size={23} weight="light" aria-hidden="true" /><span><strong>Clean exports</strong>CSV and JSON for downstream systems</span></div>
            </div>
            <Link className="text-link" href="/solutions/material-intelligence">
              Explore Material Intelligence
              <ArrowRightIcon size={17} weight="bold" aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal className="material-media" delay={0.08}>
            <Image
              src="/images/material-intelligence.jpg"
              alt="Roofing shingles, lumber, panels, insulation, and fasteners connected by cyan supplier data lines"
              width={1344}
              height={768}
              sizes="(max-width: 899px) calc(100vw - 40px), 54vw"
            />
            <div className="material-readout">
              <p>INGEST</p><strong>Supplier file</strong>
              <ArrowRightIcon size={16} aria-hidden="true" />
              <p>NORMALIZE</p><strong>Canonical record</strong>
              <ArrowRightIcon size={16} aria-hidden="true" />
              <p>EXPORT</p><strong>Pricing data</strong>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section control-section" id="approach">
        <div className="shell control-grid">
          <Reveal className="control-copy">
            <p className="eyebrow">Human-approved automation</p>
            <h2>Automate the busywork. Keep control of the decisions.</h2>
            <p>
              The system can retrieve the record, measure the plan, compare the
              prices, and prepare the action. Your team keeps the approval point
              wherever the consequence is real.
            </p>
            <a className="button button-ghost" href="#process">
              See the build process
              <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal className="control-diagram" delay={0.1}>
            <div className="control-ring ring-one" aria-hidden="true" />
            <div className="control-ring ring-two" aria-hidden="true" />
            <div className="control-core">
              <ShieldCheckIcon size={44} weight="light" aria-hidden="true" />
              <strong>Human approval</strong>
              <span>before consequential action</span>
            </div>
            {[
              ["QUERY", "Pull live context"],
              ["VERIFY", "Check confidence"],
              ["PREPARE", "Draft the next step"],
              ["EXPORT", "Send approved output"],
            ].map(([label, copy], index) => (
              <div key={label} className={`orbit-node orbit-${index + 1}`}>
                <span>0{index + 1}</span>
                <strong>{label}</strong>
                <small>{copy}</small>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section architecture-section">
        <div className="shell">
          <Reveal className="section-heading architecture-heading">
            <p className="eyebrow">Connected by design</p>
            <h2>Use the systems you already trust. Add intelligence at the handoff.</h2>
          </Reveal>

          <Reveal className="architecture-map" delay={0.08}>
            <div className="architecture-track" aria-hidden="true" />
            {solutions.map((solution, index) => (
              <Link key={solution.slug} className="architecture-node" href={`/solutions/${solution.slug}`}>
                <span className="architecture-index">0{index + 1}</span>
                <SolutionIcon name={solution.icon} size={27} />
                <strong>{solution.shortName}</strong>
                <small>{solution.category}</small>
                <ArrowUpRightIcon size={16} aria-hidden="true" />
              </Link>
            ))}
          </Reveal>

          <Reveal className="integration-row" delay={0.12}>
            {[
              "Blueprint PDF",
              "Supplier data",
              "ECi Bolt",
              "QuickBooks",
              "Billtrust",
              "NetSuite",
              "Email",
              "Voice",
              "Chat",
            ].map((integration) => <span key={integration}>{integration}</span>)}
          </Reveal>
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="shell">
          <Reveal className="section-heading split-heading">
            <div>
              <p className="eyebrow">From bottleneck to working product</p>
              <h2>Start narrow. Connect deeply. Expand from evidence.</h2>
            </div>
            <p>
              Advanced does not mean bloated. The strongest construction system
              solves one high-frequency job, connects to the real source of truth,
              and earns the right to do more.
            </p>
          </Reveal>
          <div className="process-list">
            {process.map((step, index) => (
              <Reveal key={step.number} className="process-row" delay={index * 0.05}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section" id="demo">
        <div className="shell">
          <Reveal className="cta-panel">
            <div className="cta-grid" aria-hidden="true" />
            <p className="eyebrow">Your workflow is the brief</p>
            <h2>Show us where the work stalls.</h2>
            <p>
              Bring the current process, the tools it touches, and the handoff
              that keeps breaking. We will map the smallest useful system worth building.
            </p>
            <div className="cta-actions">
              <a
                className="button"
                href={demoMailto}
                data-analytics-event="generate_lead"
                data-analytics-location="final_cta"
              >
                {siteConfig.primaryCta}
                <ArrowUpRightIcon size={18} weight="bold" aria-hidden="true" />
              </a>
              <a className="text-link" href={`mailto:${siteConfig.contactEmail}`}>
                Email a project brief
                <ArrowRightIcon size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

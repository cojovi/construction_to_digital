import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/ssr";
import { JsonLd } from "@/components/json-ld";
import { SolutionIcon } from "@/components/solution-icon";
import {
  CountUp,
  HoloCard,
  Lift,
  ScrambleText,
  TelemetryMarquee,
} from "@/components/hud/motion-primitives";
import { SurveyConstellation } from "@/components/hud/survey-constellation";
import { SystemConsole } from "@/components/hud/system-console";
import { solutions } from "@/lib/solutions";
import { demoMailto, siteConfig } from "@/lib/site";

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

const telemetry = [
  { label: "Plan intake", value: "PDF / SHEET SET" },
  { label: "Scale check", value: "VERIFIED FIRST" },
  { label: "Supplier files", value: "NORMALIZED" },
  { label: "Job system", value: "ECi BOLT" },
  { label: "Ledger", value: "QUICKBOOKS" },
  { label: "Receivables", value: "BILLTRUST" },
  { label: "Approval", value: "HUMAN GATED" },
  { label: "Export", value: "CSV / JSON" },
] as const;

const friction = [
  {
    index: "01",
    title: "Plans become a measuring queue.",
    copy: "Every estimate waits for someone to find the scale, read the roof, count the parts, and re-key the result into a spreadsheet.",
    status: "Queued",
  },
  {
    index: "02",
    title: "Supplier data speaks four languages.",
    copy: "Product names, units, and prices shift from file to file while estimating and purchasing both need one answer.",
    status: "Unreconciled",
  },
  {
    index: "03",
    title: "Job truth stays behind filters.",
    copy: "Simple work-order, crew, and scheduling questions interrupt the two people who know where to click.",
    status: "Blocked",
  },
  {
    index: "04",
    title: "Billing context spans three systems.",
    copy: "Invoice status, vendor bills, payments, and aging demand a scavenger hunt before a decision can happen.",
    status: "Fragmented",
  },
] as const;

const pipeline = [
  { key: "PLN", label: "Plans", copy: "Sheet sets and elevations" },
  { key: "QTY", label: "Quantities", copy: "Measured and confidence-scored" },
  { key: "PRC", label: "Pricing", copy: "Normalized supplier cost" },
  { key: "JOB", label: "Jobs", copy: "Crews, stages, schedule" },
  { key: "BIL", label: "Billing", copy: "Invoices and closeout" },
] as const;

const metrics = [
  { value: 4, suffix: "", label: "Production systems", decimals: 0 },
  { value: 100, suffix: "%", label: "Consequential actions gated", decimals: 0 },
  { value: 0, suffix: "", label: "Measurements trusted before scale check", decimals: 0 },
  { value: 12, suffix: "+", label: "Systems connected at the handoff", decimals: 0 },
] as const;

const buildProcess = [
  {
    number: "01",
    title: "Map the real workflow",
    copy: "We start with the people, handoffs, source systems, exceptions, and approval points that exist today — not the org chart version.",
  },
  {
    number: "02",
    title: "Connect the source of truth",
    copy: "The product queries the system where the fact actually lives instead of inventing another disconnected database to fall out of sync.",
  },
  {
    number: "03",
    title: "Build the review gate",
    copy: "Low confidence, consequential changes, and external communication stay visible and human-approved. The gate is a feature, not a limitation.",
  },
  {
    number: "04",
    title: "Ship, observe, expand",
    copy: "Launch one focused workflow, learn from real use, and connect the next system only where it earns its place.",
  },
] as const;

const integrations = [
  "Blueprint PDF",
  "Supplier CSV",
  "ECi Bolt",
  "QuickBooks",
  "Billtrust",
  "NetSuite",
  "AgentMail",
  "Google Chat",
  "Voice",
  "Webhooks",
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
    <main className="hud-main" id="main-content">
      <JsonLd data={itemListSchema} />

      {/* ==================================================================
          HERO — the constellation carries the thesis
          ================================================================== */}
      <section className="hud-hero" id="top">
        <div className="hud-shell hud-hero-grid">
          <div className="hud-hero-copy">
            <Lift y={18}>
              <p className="hud-eyebrow">AI systems for construction operations</p>
            </Lift>

            <Lift delay={0.08} y={22}>
              <h1 className="hud-hero-title">
                <span>Physical work.</span>
                <span className="dim">Digital leverage.</span>
              </h1>
            </Lift>

            <Lift delay={0.16} y={18}>
              <p className="hud-lede">
                Query billing and work orders in plain language, normalize supplier
                pricing into one schema, and move plan sets toward review-ready
                takeoffs — with a human approval gate wherever the consequence is real.
              </p>
            </Lift>

            <Lift delay={0.24} y={16}>
              <div className="hud-hero-actions">
                <a
                  className="hud-btn"
                  href={demoMailto}
                  data-analytics-event="generate_lead"
                  data-analytics-location="hero"
                >
                  {siteConfig.primaryCta}
                  <ArrowUpRightIcon size={15} weight="bold" aria-hidden="true" />
                </a>
                <a className="hud-btn hud-btn-ghost" href="#systems">
                  {siteConfig.secondaryCta}
                  <ArrowRightIcon size={15} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </Lift>

            <Lift delay={0.34} y={12}>
              <div className="hud-hero-scroll">
                <i />
                Scroll to resolve the model
              </div>
            </Lift>
          </div>

          <SurveyConstellation />
        </div>
      </section>

      <TelemetryMarquee items={telemetry} />

      {/* ==================================================================
          THE OPERATING GAP
          ================================================================== */}
      <section className="hud-section">
        <div className="hud-shell">
          <Lift>
            <div className="hud-index-rail">
              <span>Section 01</span>
              <i />
              <span>The operating gap</span>
            </div>
          </Lift>

          <div className="hud-head">
            <Lift>
              <h2 className="hud-h2">
                <ScrambleText text="The handoffs" /> are where good work slows down.
              </h2>
            </Lift>
            <Lift delay={0.1}>
              <p className="hud-copy">
                Construction teams do not need another general-purpose dashboard.
                They need focused systems that read the artifact, find the live
                record, and prepare the next decision — then stop and ask.
              </p>
            </Lift>
          </div>

          <div className="hud-ledger">
            {friction.map((point, index) => (
              <Lift key={point.index} delay={index * 0.06}>
                <div className="hud-ledger-row">
                  <span className="hud-ledger-index">{point.index}</span>
                  <h3 className="hud-h3" style={{ margin: 0 }}>{point.title}</h3>
                  <p className="hud-copy">{point.copy}</p>
                  <span className="hud-ledger-status">
                    <i />
                    {point.status}
                  </span>
                </div>
              </Lift>
            ))}
          </div>

          <Lift delay={0.1}>
            <div className="hud-rail">
              <div className="hud-rail-line" aria-hidden="true" />
              <div className="hud-rail-packet" aria-hidden="true" />
              <div className="hud-rail-packet delay" aria-hidden="true" />
              <div className="hud-rail-nodes">
                {pipeline.map((node) => (
                  <div key={node.key} className="hud-rail-node">
                    <span className="hud-rail-dot">
                      <span>{node.key}</span>
                    </span>
                    <strong>{node.label}</strong>
                    <small>{node.copy}</small>
                  </div>
                ))}
              </div>
            </div>
          </Lift>
        </div>
      </section>

      {/* ==================================================================
          FLAGSHIP — The Drafting Table
          ================================================================== */}
      <section className="hud-section">
        <div className="hud-shell">
          <Lift>
            <div className="hud-index-rail">
              <span>Section 02</span>
              <i />
              <span>Flagship system</span>
            </div>
          </Lift>

          <div className="hud-split">
            <Lift>
              <div className="hud-media">
                <Image
                  src="/images/roofing-takeoff.jpg"
                  alt="Residential roof plan with cyan takeoff geometry, a gloved estimator hand, and a scale ruler"
                  width={1344}
                  height={768}
                  sizes="(max-width: 1000px) calc(100vw - 40px), 52vw"
                />
                <div className="hud-media-veil" aria-hidden="true" />
                <div className="hud-media-grid" aria-hidden="true" />
                <div className="hud-media-sweep" aria-hidden="true" />
                <div className="hud-media-tag tl">
                  <i />
                  Sheet A5.2 / roof plan
                </div>
                <div className="hud-media-tag br">
                  <i />
                  Scale check required
                </div>
              </div>
            </Lift>

            <Lift delay={0.1}>
              <div>
                <p className="hud-eyebrow">01 / Blueprint to takeoff</p>
                <h2 className="hud-h2">
                  Make the plan set useful before it reaches the estimating queue.
                </h2>
                <p className="hud-copy">
                  Upload residential blueprints, verify drawing scale, extract roof
                  and elevation measurements, score confidence on every result, and
                  produce a consistent takeoff ready for review and export.
                </p>

                <ul className="hud-checks">
                  <li>
                    <CheckIcon size={15} weight="bold" aria-hidden="true" />
                    Scale verification before any measurement
                  </li>
                  <li>
                    <CheckIcon size={15} weight="bold" aria-hidden="true" />
                    Confidence attached to every extracted value
                  </li>
                  <li>
                    <CheckIcon size={15} weight="bold" aria-hidden="true" />
                    Ambiguous scope surfaced, never guessed
                  </li>
                </ul>

                <Link className="hud-link" href="/solutions/drafting-table">
                  Open The Drafting Table
                  <ArrowRightIcon size={15} weight="bold" aria-hidden="true" />
                </Link>
              </div>
            </Lift>
          </div>
        </div>
      </section>

      {/* ==================================================================
          SYSTEM CONSOLE
          ================================================================== */}
      <section className="hud-section" id="systems">
        <span id="solutions" aria-hidden="true" />
        <div className="hud-shell">
          <Lift>
            <div className="hud-index-rail">
              <span>Section 03</span>
              <i />
              <span>Four focused systems</span>
            </div>
          </Lift>

          <div className="hud-head">
            <Lift>
              <h2 className="hud-h2">
                One operating layer for the work that keeps moving.
              </h2>
            </Lift>
            <Lift delay={0.1}>
              <p className="hud-copy">
                Each system owns a defined job. Together they connect the path from
                plan intake and material cost through field execution to financial
                closeout. Select a channel to inspect it.
              </p>
            </Lift>
          </div>

          <Lift delay={0.08}>
            <SystemConsole />
          </Lift>
        </div>
      </section>

      {/* ==================================================================
          SOLUTION CARDS — holographic tilt grid
          ================================================================== */}
      <section className="hud-section">
        <div className="hud-shell">
          <Lift>
            <div className="hud-index-rail">
              <span>Section 04</span>
              <i />
              <span>The portfolio</span>
            </div>
          </Lift>

          <div className="hud-holo-grid">
            {solutions.map((solution, index) => (
              <Lift key={solution.slug} delay={index * 0.06}>
                <HoloCard className="hud-holo">
                  <div className="hud-holo-top">
                    <span className="hud-holo-num">0{index + 1}</span>
                    <span className="hud-holo-icon">
                      <SolutionIcon name={solution.icon} size={20} />
                    </span>
                  </div>
                  <p className="hud-holo-cat">{solution.category}</p>
                  <h3 className="hud-holo-name">{solution.shortName}</h3>
                  <p className="hud-holo-sum">{solution.summary}</p>
                  <Link href={`/solutions/${solution.slug}`} className="hud-holo-foot">
                    {solution.status}
                    <ArrowUpRightIcon size={14} weight="bold" aria-hidden="true" />
                  </Link>
                </HoloCard>
              </Lift>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          METRICS
          ================================================================== */}
      <section className="hud-section">
        <div className="hud-shell">
          <Lift>
            <div className="hud-stats">
              {metrics.map((metric) => (
                <div key={metric.label} className="hud-stat">
                  <div className="hud-stat-value">
                    <CountUp
                      to={metric.value}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                    />
                  </div>
                  <p className="hud-stat-label">{metric.label}</p>
                </div>
              ))}
            </div>
          </Lift>
        </div>
      </section>

      {/* ==================================================================
          THE APPROVAL GATE
          ================================================================== */}
      <section className="hud-section" id="approach">
        <div className="hud-shell">
          <Lift>
            <div className="hud-index-rail">
              <span>Section 05</span>
              <i />
              <span>Human-approved automation</span>
            </div>
          </Lift>

          <div className="hud-split hud-split-flip">
            <Lift>
              <div className="hud-gate" aria-hidden="true">
                <div className="hud-gate-ring r1" />
                <div className="hud-gate-ring r2" />
                <div className="hud-gate-ring r3" />
                <div className="hud-gate-orbiter" />
                <div className="hud-gate-orbiter b" />
                <div className="hud-gate-core">
                  <svg className="hud-gate-hex" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon points="50,1 99,25.5 99,74.5 50,99 1,74.5 1,25.5" />
                  </svg>
                  <ShieldCheckIcon size={28} weight="light" />
                  <strong>Approval</strong>
                  <small>Required</small>
                </div>
                <div className="hud-gate-node n1">
                  <b>Query</b>
                  <small>Pull live context</small>
                </div>
                <div className="hud-gate-node n2">
                  <b>Verify</b>
                  <small>Score confidence</small>
                </div>
                <div className="hud-gate-node n3">
                  <b>Prepare</b>
                  <small>Draft the next step</small>
                </div>
                <div className="hud-gate-node n4">
                  <b>Export</b>
                  <small>Send approved output</small>
                </div>
              </div>
            </Lift>

            <Lift delay={0.1}>
              <div>
                <p className="hud-eyebrow">The trust model</p>
                <h2 className="hud-h2">
                  Automate the busywork. Keep control of the decisions.
                </h2>
                <p className="hud-copy" style={{ marginBottom: 24 }}>
                  The system retrieves the record, measures the plan, compares the
                  prices, and prepares the action. Your team keeps the approval point
                  wherever the consequence is real — payments, external sends,
                  rescheduling, and anything the model scored low.
                </p>
                <p className="hud-copy" style={{ marginBottom: 32 }}>
                  Nothing consequential leaves the building without a human saying yes.
                  That is not a limitation we apologize for; it is the reason the
                  output is usable.
                </p>
                <a className="hud-btn hud-btn-ghost" href="#process">
                  See the build process
                  <ArrowRightIcon size={15} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </Lift>
          </div>
        </div>
      </section>

      {/* ==================================================================
          BUILD PROCESS
          ================================================================== */}
      <section className="hud-section" id="process">
        <div className="hud-shell">
          <Lift>
            <div className="hud-index-rail">
              <span>Section 06</span>
              <i />
              <span>From bottleneck to product</span>
            </div>
          </Lift>

          <div className="hud-head">
            <Lift>
              <h2 className="hud-h2">
                Start narrow. Connect deeply. Expand from evidence.
              </h2>
            </Lift>
            <Lift delay={0.1}>
              <p className="hud-copy">
                Advanced does not mean bloated. The strongest construction system
                solves one high-frequency job, connects to the real source of truth,
                and earns the right to do more.
              </p>
            </Lift>
          </div>

          <div className="hud-steps">
            {buildProcess.map((step, index) => (
              <Lift key={step.number} delay={index * 0.05}>
                <div className="hud-step">
                  <span className="hud-step-num">
                    <b>{step.number}</b>
                    Phase
                  </span>
                  <h3 className="hud-h3" style={{ margin: 0 }}>{step.title}</h3>
                  <p className="hud-copy">{step.copy}</p>
                </div>
              </Lift>
            ))}
          </div>

          <Lift delay={0.12}>
            <div style={{ marginTop: "clamp(40px, 5vw, 72px)" }}>
              <p className="hud-eyebrow">Connected by design</p>
              <div className="hud-chips">
                {integrations.map((integration) => (
                  <span key={integration} className="hud-chip">
                    <i />
                    {integration}
                  </span>
                ))}
              </div>
            </div>
          </Lift>
        </div>
      </section>

      {/* ==================================================================
          CTA
          ================================================================== */}
      <section className="hud-section" id="demo">
        <div className="hud-shell">
          <Lift>
            <div className="hud-cta">
              <div className="hud-cta-grid" aria-hidden="true" />
              <p className="hud-eyebrow">Your workflow is the brief</p>
              <h2 className="hud-h2" style={{ maxWidth: "20ch", marginInline: "auto" }}>
                Show us where the work stalls.
              </h2>
              <p className="hud-lede">
                Bring the current process, the tools it touches, and the handoff that
                keeps breaking. We will map the smallest useful system worth building.
              </p>
              <div className="hud-cta-actions">
                <a
                  className="hud-btn"
                  href={demoMailto}
                  data-analytics-event="generate_lead"
                  data-analytics-location="final_cta"
                >
                  {siteConfig.primaryCta}
                  <ArrowUpRightIcon size={15} weight="bold" aria-hidden="true" />
                </a>
                <a className="hud-link" href={`mailto:${siteConfig.contactEmail}`}>
                  Email a project brief
                  <ArrowRightIcon size={15} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Lift>
        </div>
      </section>
    </main>
  );
}

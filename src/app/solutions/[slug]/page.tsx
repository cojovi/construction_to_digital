import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CaretRightIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react/ssr";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { SolutionIcon } from "@/components/solution-icon";
import { getSolution, solutions } from "@/lib/solutions";
import { demoMailto, siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    return {};
  }

  const canonical = `/solutions/${solution.slug}`;

  return {
    title: solution.seoTitle,
    description: solution.seoDescription,
    alternates: { canonical },
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
    openGraph: {
      type: "website",
      url: canonical,
      title: solution.seoTitle,
      description: solution.seoDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: `${solution.name} by Construction to Digital`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: solution.seoTitle,
      description: solution.seoDescription,
      images: ["/twitter-image.jpg"],
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    notFound();
  }

  const related = solutions.filter((item) => item.slug !== solution.slug).slice(0, 3);
  const canonical = `${siteConfig.url}/solutions/${solution.slug}`;
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}/#service`,
      name: solution.name,
      serviceType: solution.category,
      description: solution.seoDescription,
      url: canonical,
      provider: { "@id": `${siteConfig.url}/#organization` },
      areaServed: "United States",
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Construction contractors and operations teams",
      },
      termsOfService: "Demo and implementation scope available by consultation",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Solutions",
          item: `${siteConfig.url}/#solutions`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: solution.name,
          item: canonical,
        },
      ],
    },
  ];

  return (
    <main id="main-content">
      <JsonLd data={schema} />

      <section className="section solution-hero">
        <div className="shell">
          <nav className="solution-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <CaretRightIcon size={11} aria-hidden="true" />
            <Link href="/#solutions">Solutions</Link>
            <CaretRightIcon size={11} aria-hidden="true" />
            <span aria-current="page">{solution.shortName}</span>
          </nav>

          <div className="solution-hero-grid">
            <Reveal className="solution-hero-copy">
              <p className="eyebrow">{solution.eyebrow}</p>
              <h1>{solution.headline}</h1>
              <p>{solution.detail}</p>
              <div className="solution-status-row">
                <span>{solution.status}</span>
                <span>{solution.category}</span>
                <span>Human-approved</span>
              </div>
              <div className="hero-actions">
                <a
                  className="button"
                  href={demoMailto}
                  data-analytics-event="generate_lead"
                  data-analytics-location="solution_hero"
                  data-analytics-product={solution.slug}
                >
                  {siteConfig.primaryCta}
                  <ArrowUpRightIcon size={18} weight="bold" aria-hidden="true" />
                </a>
                <a className="button button-ghost" href="#capabilities">
                  See capabilities
                  <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal className="solution-visual" delay={0.1}>
              {solution.image ? (
                <>
                  <Image
                    src={solution.image}
                    alt={solution.imageAlt ?? ""}
                    width={1344}
                    height={768}
                    sizes="(max-width: 1020px) calc(100vw - 64px), 46vw"
                    preload
                  />
                  <div className="solution-visual-overlay" aria-hidden="true" />
                </>
              ) : (
                <div className="solution-glyph">
                  <SolutionIcon name={solution.icon} size={68} />
                </div>
              )}
              <div className="solution-readout">
                <span>Operating principle</span>
                <strong>Pull context → verify → prepare → approve</strong>
              </div>
            </Reveal>
          </div>

          <Reveal className="solution-proof" delay={0.14}>
            <strong>Why it is different:</strong> {solution.proof}
          </Reveal>
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="shell detail-grid">
          <Reveal className="detail-sticky">
            <p className="eyebrow">Inside the system</p>
            <h2>Purpose-built around the full handoff.</h2>
            <p>
              This is not a loose prompt wrapped around a generic model. The
              product knows what to retrieve, what context to show, and where a
              person must stay in the loop.
            </p>
          </Reveal>

          <div className="capability-grid">
            {solution.capabilities.map((capability, index) => (
              <Reveal key={capability} className="capability-card" delay={index * 0.04}>
                <span>CAP / 0{index + 1}</span>
                <h3>{capability}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="shell detail-grid">
          <Reveal className="detail-sticky">
            <p className="eyebrow">Working sequence</p>
            <h2>From request to reviewable output.</h2>
            <p>
              The workflow stays legible so operators know where the data came
              from, what the system prepared, and what still needs judgment.
            </p>
          </Reveal>

          <Reveal>
            <ol className="workflow-list">
              {solution.workflow.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal className="section-heading split-heading">
            <div>
              <p className="eyebrow">Built-in boundaries</p>
              <h2>Automation that knows when to stop.</h2>
            </div>
            <p>
              Guardrails are part of the product architecture, not a disclaimer
              added after the workflow is already autonomous.
            </p>
          </Reveal>

          <div className="guardrail-grid">
            {solution.safeguards.map((safeguard, index) => (
              <Reveal key={safeguard} className="guardrail-card" delay={index * 0.06}>
                <ShieldCheckIcon size={30} weight="light" aria-hidden="true" />
                <p>{safeguard}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="integration-row" delay={0.12}>
            {solution.integrations.map((integration) => (
              <span key={integration}>{integration}</span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section process-section">
        <div className="shell">
          <Reveal className="section-heading split-heading">
            <div>
              <p className="eyebrow">The connected portfolio</p>
              <h2>Keep following the work.</h2>
            </div>
            <p>
              Explore the systems that connect to the workflow before and after {solution.shortName}.
            </p>
          </Reveal>

          <div className="related-solutions">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.05}>
                <Link className="related-card" href={`/solutions/${item.slug}`}>
                  <SolutionIcon name={item.icon} size={28} />
                  <span>
                    <strong>{item.shortName}</strong>
                    <small>{item.category}</small>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="shell">
          <Reveal className="cta-panel">
            <div className="cta-grid" aria-hidden="true" />
            <p className="eyebrow">See it against your workflow</p>
            <h2>Bring the process you run today.</h2>
            <p>
              We will walk through where {solution.shortName} fits, what it needs
              to connect to, and which approval points should stay with your team.
            </p>
            <div className="cta-actions">
              <a
                className="button"
                href={demoMailto}
                data-analytics-event="generate_lead"
                data-analytics-location="solution_final_cta"
                data-analytics-product={solution.slug}
              >
                {siteConfig.primaryCta}
                <ArrowUpRightIcon size={18} weight="bold" aria-hidden="true" />
              </a>
              <Link className="text-link" href="/#solutions">
                View all solutions
                <ArrowRightIcon size={17} weight="bold" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

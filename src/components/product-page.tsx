import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon, CheckIcon, PlusIcon } from "@phosphor-icons/react/ssr";
import { JsonLd } from "@/components/json-ld";
import { SolutionIcon } from "@/components/solution-icon";
import { getSolution, solutions } from "@/lib/solutions";
import { productDetails } from "@/lib/product-details";
import { demoMailto, siteConfig } from "@/lib/site";

export function productMetadata(slug: string): Metadata {
  const product = getSolution(slug);
  if (!product) notFound();
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: product.href },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url: product.href,
      type: "website",
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: product.name }],
    },
    twitter: { card: "summary_large_image", title: product.seoTitle, description: product.seoDescription },
  };
}

export function ProductPage({ slug }: { slug: string }) {
  const product = getSolution(slug);
  const detail = productDetails[slug];
  if (!product || !detail) notFound();
  const companion = getSolution(detail.companion.slug);
  const number = String(solutions.indexOf(product) + 1).padStart(2, "0");
  const canonical = `${siteConfig.url}${product.href}`;

  return (
    <main className="hud-main product-page" data-product-theme={product.theme} id="main-content">
      <JsonLd data={[
        {
          "@context": "https://schema.org", "@type": "Service", "@id": `${canonical}#service`,
          name: product.name, url: canonical, description: product.seoDescription,
          serviceType: product.category, areaServed: "United States",
          provider: { "@id": `${siteConfig.url}/#organization` },
        },
        {
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: product.name, item: canonical },
          ],
        },
      ]} />

      <section className="product-hero" aria-labelledby="product-title">
        <div className="hud-shell">
          <nav className="product-breadcrumb hud-mono" aria-label="Breadcrumb">
            <Link href="/#solutions">All systems</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{product.shortName}</span>
          </nav>
          <div className="product-identity">
            <span className="product-symbol"><SolutionIcon name={product.icon} size={25} /></span>
            <span>{product.name}</span>
            <span className="product-system-code hud-mono">System / {number}</span>
          </div>
          <div className="product-hero-grid">
            <div className="product-hero-copy">
              <p className="hud-eyebrow">{product.eyebrow}</p>
              <h1 id="product-title">{product.headline}</h1>
              <p className="product-intro">{product.detail}</p>
              <div className="product-actions">
                <a className="hud-btn" href={demoMailto} data-analytics-event="contact_click" data-analytics-product={product.slug} data-analytics-location="product_hero">
                  Request a {product.shortName} demo <ArrowUpRightIcon size={16} aria-hidden="true" />
                </a>
                <a className="hud-link" href="#workflow">See how it works <ArrowDownIcon size={15} aria-hidden="true" /></a>
              </div>
              <p className="product-audience hud-mono">{detail.audience}</p>
            </div>

            <aside className="product-sequence" aria-label={`${product.shortName} workflow overview`}>
              <div className="product-sequence-head hud-mono"><span>The connected workflow</span><span>{number} / C2D</span></div>
              <h2>{detail.outcome}</h2>
              <ol>
                {detail.sequence.map((step, index) => (
                  <li key={step.label}>
                    <span className="product-step-number hud-mono">0{index + 1}</span>
                    <div><h3>{step.label}</h3><p>{step.description}</p></div>
                  </li>
                ))}
              </ol>
              <div className="product-sequence-foot hud-mono"><span className="product-dot" />Setup handled. Your team in control.</div>
            </aside>
          </div>
          <div className="product-connectors" aria-label="Connected systems and formats">
            <span className="hud-mono">Works with</span>
            {product.integrations.map((integration) => <span key={integration}>{integration}</span>)}
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="hud-shell">
          <div className="hud-index-rail"><span>01 / Built around your work</span><i /><span>{product.shortName}</span></div>
          <div className="product-benefits">
            {detail.benefits.map((benefit, index) => (
              <article key={benefit.title}>
                <span className="product-benefit-index hud-mono">0{index + 1}</span>
                <h2>{benefit.title}</h2><p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="product-section" id="workflow">
        <div className="hud-shell product-workflow-grid">
          <div>
            <p className="hud-eyebrow">02 / How it works</p>
            <h2 className="hud-h2">One clear path.<br /><span className="product-accent">Less manual work.</span></h2>
            <p className="hud-copy">{product.proof}</p>
          </div>
          <ol className="product-workflow">
            {product.workflow.map((step, index) => <li key={step}><span className="hud-mono">0{index + 1}</span><h3>{step}</h3><ArrowRightIcon size={17} aria-hidden="true" /></li>)}
          </ol>
        </div>
      </section>

      <section className="product-section">
        <div className="hud-shell product-scope-grid">
          <div>
            <p className="hud-eyebrow">03 / Inside your system</p>
            <h2 className="hud-h2">Built for the job.</h2>
            <ul className="product-capabilities">
              {product.capabilities.map((capability) => <li key={capability}><CheckIcon size={17} aria-hidden="true" />{capability}</li>)}
            </ul>
          </div>
          <div className="product-review">
            <span className="hud-mono">Your team keeps the final say</span>
            <h3>Automation with a clear review point.</h3>
            <ul>{product.safeguards.map((guard) => <li key={guard}>{guard}</li>)}</ul>
            <p>We configure the workflow around your systems, access, and the decisions your team needs to own.</p>
          </div>
        </div>
      </section>

      {companion && <section className="product-section product-companion-section">
        <div className="hud-shell product-companion">
          <span className="product-companion-icon"><SolutionIcon name={companion.icon} size={44} /></span>
          <div><p className="hud-eyebrow">Better connected / {companion.shortName}</p><h2>{detail.companion.title}</h2><p>{detail.companion.description}</p></div>
          <Link className="hud-link" href={companion.href}>Explore {companion.shortName}<ArrowUpRightIcon size={17} aria-hidden="true" /></Link>
        </div>
      </section>}

      <section className="product-section">
        <div className="hud-shell product-faq-grid">
          <div><p className="hud-eyebrow">04 / Before you get started</p><h2 className="hud-h2">Good questions.<br />Clear answers.</h2></div>
          <div className="product-faq">
            {detail.questions.map((item) => <details key={item.question}><summary>{item.question}<PlusIcon size={19} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="product-section product-final">
        <div className="hud-shell">
          <p className="hud-eyebrow">Your workflow. Your next step.</p>
          <h2>See {product.shortName}<br /><span className="product-accent">at work for your business.</span></h2>
          <p>Bring the process you run today. We will walk through the fit, the setup, and what your team can do next.</p>
          <a className="hud-btn" href={demoMailto} data-analytics-event="contact_click" data-analytics-product={product.slug} data-analytics-location="product_footer">Request a demo<ArrowUpRightIcon size={17} aria-hidden="true" /></a>
          <div className="product-other-links" aria-label="Other construction tools">
            {solutions.filter((item) => item.slug !== product.slug).map((item) => <Link key={item.slug} href={item.href}>{item.shortName}<ArrowRightIcon size={14} aria-hidden="true" /></Link>)}
          </div>
          <p className="product-location hud-mono">Fort Worth, Texas / Serving contractors nationwide</p>
        </div>
      </section>
    </main>
  );
}

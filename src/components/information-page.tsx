import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import type { InformationPage as PageContent } from "@/lib/information-pages";
import { demoMailto } from "@/lib/site";

export function InformationPage({ page }: { page: PageContent }) {
  return (
    <main id="main-content" className="hud-main hud-document">
      <div className="hud-shell">
        <header className="hud-document-header">
          <p className="hud-eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="hud-copy">{page.description}</p>
          <a className="hud-link" href={`/${page.slug}.md`}>Read as Markdown ↗</a>
        </header>
        <div className="hud-document-sections">
          {page.sections.map((section, index) => (
            <section key={section.title} aria-labelledby={`section-${index}`}>
              <span className="hud-mono hud-document-index" aria-hidden="true">0{index + 1}</span>
              <div>
                <h2 id={`section-${index}`}>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items && (
                  <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
                )}
                {section.links && (
                  <ul className="hud-document-links">
                    {section.links.map((link) => (
                      <li key={link.href}><Link href={link.href}>{link.label} ↗</Link></li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
        <a className="hud-btn hud-btn-primary" href={demoMailto} data-analytics-event="generate_lead" data-analytics-location={page.slug}>
          Request a demo <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
        </a>
      </div>
    </main>
  );
}

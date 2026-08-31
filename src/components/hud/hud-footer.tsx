import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { solutions } from "@/lib/solutions";
import { demoMailto, navigation, siteConfig } from "@/lib/site";

export function HudFooter() {
  return (
    <footer className="hud-footer" id="about">
      <div className="hud-shell hud-footer-top">
        <div>
          <Image
            className="hud-footer-mark"
            src="/brand/construction-to-digital-mark.png"
            alt="Construction to Digital logo mark"
            width={1106}
            height={765}
            sizes="96px"
          />
          <p className="hud-eyebrow">{siteConfig.tagline}</p>
          <h2 className="hud-h2" style={{ maxWidth: "18ch" }}>
            Built by someone who knows the workflow.
          </h2>
          <p className="hud-copy" style={{ marginBottom: 30 }}>
            Construction to Digital builds practical AI systems around the handoffs
            that cost contractors time: plans, materials, jobs, and billing. Every
            product ships with the review gate already in it.
          </p>
          <a
            className="hud-link"
            href={demoMailto}
            data-analytics-event="generate_lead"
            data-analytics-location="footer"
          >
            {siteConfig.primaryCta}
            <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <div className="hud-footer-cols">
          <div>
            <p>Systems</p>
            {solutions.map((solution) => (
              <Link key={solution.slug} href={`/solutions/${solution.slug}`}>
                {solution.shortName}
              </Link>
            ))}
          </div>
          <div>
            <p>Navigate</p>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="hud-shell hud-footer-bottom">
        <span>© {new Date().getFullYear()} Construction to Digital</span>
        <span>Fort Worth, Texas — built for the trades</span>
        <Link href="/#top">Return to top ↑</Link>
      </div>
    </footer>
  );
}

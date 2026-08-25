import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { solutions } from "@/lib/solutions";
import { demoMailto, navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="about">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Image
            className="footer-mark"
            src="/brand/construction-to-digital-mark.png"
            alt="Construction to Digital logo mark"
            width={1106}
            height={765}
            sizes="160px"
          />
          <p className="eyebrow">{siteConfig.tagline}</p>
          <h2>Built by someone who knows the workflow, not just the software.</h2>
          <p>
            Construction to Digital develops practical AI agents and workflow
            products around the handoffs that cost contractors time: plans,
            materials, jobs, and billing.
          </p>
          <a
            className="text-link"
            href={demoMailto}
            data-analytics-event="generate_lead"
            data-analytics-location="footer"
          >
            {siteConfig.primaryCta}
            <ArrowUpRightIcon size={18} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <div className="footer-links">
          <div>
            <p className="footer-label">Solutions</p>
            {solutions.map((solution) => (
              <Link key={solution.slug} href={`/solutions/${solution.slug}`}>
                {solution.shortName}
              </Link>
            ))}
          </div>
          <div>
            <p className="footer-label">Navigate</p>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Construction to Digital</p>
        <p>Fort Worth, Texas. Built for the trades.</p>
        <Link href="/#top">Back to top</Link>
      </div>
    </footer>
  );
}

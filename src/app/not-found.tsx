import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <div className="not-found-grid" aria-hidden="true" />
      <div className="shell not-found-inner">
        <p className="eyebrow">404 / Outside the plan set</p>
        <h1>This page is not on the drawings.</h1>
        <p>
          The route may have moved, or the link may be incomplete. Return to the
          main site and pick up the workflow from there.
        </p>
        <Link className="button" href="/">
          <ArrowLeftIcon size={18} weight="bold" aria-hidden="true" />
          Return home
        </Link>
        <nav className="not-found-recovery" aria-label="Find a published page">
          <Link href="/contact">Contact</Link>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="/llms.txt">Agent content index</a>
        </nav>
      </div>
    </main>
  );
}

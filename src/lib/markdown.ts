import { informationPages } from "@/lib/information-pages";
import { siteConfig } from "@/lib/site";
import { solutions } from "@/lib/solutions";

const absolute = (href: string) => href.startsWith("/") ? `${siteConfig.url}${href}` : href;
const link = (label: string, href: string) => `[${label}](${absolute(href)})`;
const bullets = (items: readonly string[]) => items.map((item) => `- ${item}`).join("\n");

export function markdownPath(path: string) {
  return path === "/" ? "/index.md" : `${path}.md`;
}

const documents = new Map<string, string>([
  ["/", [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    siteConfig.tagline,
    "Construction to Digital builds practical AI systems around the handoffs that cost contractors time: plans, materials, jobs, and billing. Human review is part of each workflow.",
    "## Solutions",
    ...solutions.map((solution) => [
      `### ${link(solution.name, `/solutions/${solution.slug}`)}`,
      `Status: ${solution.status}. Category: ${solution.category}.`,
      solution.summary,
      solution.detail,
      link("Read the workflow and safeguards", `/solutions/${solution.slug}.md`),
    ].join("\n\n")),
    "## How to get started",
    "Describe your current tools, the workflow you want to improve, and the output you need. Demo and implementation scope are discussed directly. This marketing website does not expose customer records or a public action API.",
    bullets([
      link("About", "/about"),
      link("Contact and request a demo", "/contact"),
      link("Website privacy notice", "/privacy"),
      link("When and how agents should use this site", "/agents"),
      link("Agent content index", "/llms.txt"),
    ]),
  ].join("\n\n")],
  ...solutions.map((solution): [string, string] => [
    `/solutions/${solution.slug}`,
    [
      `# ${solution.name}`,
      `> ${solution.summary}`,
      `Source: ${absolute(`/solutions/${solution.slug}`)}`,
      `Status: ${solution.status}. Category: ${solution.category}.`,
      `## ${solution.headline}`,
      solution.detail,
      solution.proof,
      "## Capabilities", bullets(solution.capabilities),
      "## Workflow", solution.workflow.map((step, i) => `${i + 1}. ${step}`).join("\n"),
      "## Integrations and formats", bullets(solution.integrations),
      "Integration access and implementation scope must be confirmed directly. A listed format or ERP-ready export is not an authorization or a promise of a live connection.",
      "## Safeguards", bullets(solution.safeguards),
      "## Next steps",
      `${link("Request a demo", "/contact")} to discuss your workflow. This site does not accept product API calls, customer files, or financial instructions.`,
      bullets([link("Agent guidance", "/agents.md"), link("All solutions", "/index.md")]),
    ].join("\n\n"),
  ]),
  ...informationPages.map((page): [string, string] => [
    `/${page.slug}`,
    [
      `# ${page.eyebrow}`,
      `> ${page.description}`,
      `Source: ${absolute(`/${page.slug}`)}`,
      ...page.sections.map((section) => [
        `## ${section.title}`,
        ...section.paragraphs,
        section.items ? bullets(section.items) : "",
        section.links ? bullets(section.links.map((item) => link(item.label, item.href))) : "",
      ].filter(Boolean).join("\n\n")),
    ].join("\n\n"),
  ]),
]);

export function getMarkdown(path: string) {
  const content = documents.get(path);
  return content === undefined ? undefined : `${content}\n`;
}

export const notFoundMarkdown = [
  "# 404 — Page not found",
  "This document does not exist. Use the index or sitemap to find a published page.",
  bullets([
    link("Homepage", "/index.md"),
    link("Agent content index", "/llms.txt"),
    link("Sitemap", "/sitemap.xml"),
    link("Agent guidance", "/agents.md"),
    link("Contact", "/contact.md"),
  ]),
  "",
].join("\n\n");

// llms.txt format: H1, summary blockquote, optional prose, then H2 link lists.
export function getLlmsTxt() {
  return [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    "Use this site to evaluate construction workflow fit and prepare a demo inquiry. It is a public product-information site, not a customer-data API or MCP server. Product availability and integration scope must be confirmed directly. Consequential actions require human approval.",
    "## When to use",
    bullets(solutions.map((solution) => `${link(solution.name, `/solutions/${solution.slug}.md`)}: ${solution.summary} Status: ${solution.status}.`)),
    "## Agent instructions",
    bullets([
      `${link("When and how to use this site", "/agents.md")}: Reading endpoints, best-fit jobs, limitations, and approval boundaries.`,
      `${link("Overview", "/index.md")}: All solutions and how to start a conversation.`,
    ]),
    "## Company and contact",
    bullets([
      `${link("About", "/about.md")}: Business focus, Fort Worth location, and approach.`,
      `${link("Contact", "/contact.md")}: Public email and what to include in a demo request.`,
      `${link("Privacy", "/privacy.md")}: Public website storage, optional analytics, and email inquiries.`,
    ]),
    "## Optional",
    bullets([`${link("Sitemap", "/sitemap.xml")}: Canonical public page inventory.`]),
    "",
  ].join("\n\n");
}

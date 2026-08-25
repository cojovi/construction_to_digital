export const siteConfig = {
  name: "Construction to Digital",
  shortName: "C2D",
  domain: "constructiontodigital.com",
  url: "https://constructiontodigital.com",
  contactEmail: "jarvisstone@agentmail.to",
  description:
    "Construction workflow software and custom AI agents for blueprint takeoffs, supplier pricing, contractor operations, and billing.",
  tagline: "Physical work. Digital leverage.",
  primaryCta: "Request a demo",
  secondaryCta: "Explore solutions",
} as const;

export const navigation = [
  { label: "Solutions", href: "/#solutions" },
  { label: "How it works", href: "/#approach" },
  { label: "Build process", href: "/#process" },
  { label: "About", href: "/#about" },
] as const;

export const demoMailto = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
  "Construction to Digital demo request",
)}&body=${encodeURIComponent(
  "Company:\n\nCurrent tools:\n\nWorkflow I want to improve:\n\nBest way to reach me:\n",
)}`;

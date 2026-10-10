export type SolutionIcon = "blueprint" | "materials" | "operations" | "billing";
export type ProductTheme = "cyan" | "amber" | "red" | "green";

export type Solution = {
  slug: string;
  href: `/${string}`;
  theme: ProductTheme;
  name: string;
  shortName: string;
  category: string;
  status: string;
  icon: SolutionIcon;
  eyebrow: string;
  headline: string;
  summary: string;
  detail: string;
  proof: string;
  image?: string;
  imageAlt?: string;
  capabilities: readonly string[];
  workflow: readonly string[];
  integrations: readonly string[];
  safeguards: readonly string[];
  seoTitle: string;
  seoDescription: string;
};

export const solutions: readonly Solution[] = [
  {
    slug: "drafting-table",
    href: "/draftingtable",
    theme: "cyan",
    name: "The Drafting Table",
    shortName: "Drafting Table",
    category: "AI estimating system",
    status: "Configured for your team",
    icon: "blueprint",
    eyebrow: "Autonomous AI blueprint measurement",
    headline: "Your blueprints. Measured by AI.",
    summary:
      "An autonomous AI estimating agent that measures residential blueprints and produces roofing and gutter takeoffs for your team.",
    detail:
      "Upload a residential plan set and let your AI agent extract roof and gutter measurements, count components, and assemble the takeoff. Pair it with Material Tracker to turn those quantities into a priced bid. We handle setup; your team runs the workflow and reviews the result.",
    proof:
      "Designed around a real roofing and gutter estimating workflow, not a generic document chatbot.",
    image: "/images/roofing-takeoff.jpg",
    imageAlt:
      "Residential roof plan on a dark drafting table with cyan measurement geometry, a gloved hand, and a scale ruler",
    capabilities: [
      "Plan upload and sheet classification",
      "Scale-check workflow with manual verification",
      "Autonomous roof and gutter measurement",
      "Review flags for ambiguous results",
      "Structured CSV and JSON output",
      "Priced bids with Material Tracker",
    ],
    workflow: [
      "Upload a residential blueprint set",
      "Detect and verify scale per sheet",
      "Extract measurements and component counts",
      "Review confidence and flagged ambiguities",
      "Export the takeoff or price a bid with Material Tracker",
    ],
    integrations: ["Blueprint PDF", "Spreadsheet review", "CSV", "JSON", "Material pricing"],
    safeguards: [
      "Measurements are not trusted until scale is verified",
      "Low-confidence output is held for manual review",
      "Ambiguous install scope is surfaced instead of guessed",
    ],
    seoTitle: "Autonomous AI Blueprint Measurement & Roofing Takeoffs",
    seoDescription:
      "Let AI measure residential blueprints and produce roofing and gutter takeoffs. Pair Drafting Table with Material Tracker for priced bids. Setup handled for your team.",
  },
  {
    slug: "material-intelligence",
    href: "/materialtracker",
    theme: "amber",
    name: "Material Tracker",
    shortName: "Material Tracker",
    category: "Pricing data platform",
    status: "Active product",
    icon: "materials",
    eyebrow: "Supplier pricing intelligence",
    headline: "Know which price changed before the margin does.",
    summary:
      "Live supplier pricing for roofing teams, connected to the estimates, purchases, and systems that depend on it.",
    detail:
      "Connect authorized distributor accounts, bring current material prices into one dashboard, and feed those prices into your estimating workflow. Pair Material Tracker with Drafting Table to turn blueprint quantities into complete bids, using the supplier pricing available to your business.",
    proof:
      "Built around live roofing supplier price-list formats and the people who reconcile them.",
    image: "/images/material-intelligence.jpg",
    imageAlt:
      "Roofing shingles, lumber, sheet material, insulation, fasteners, and flashing connected by cyan pricing data lines",
    capabilities: [
      "Live distributor API pricing",
      "Canonical product normalization",
      "Historical price tracking",
      "Price-change comparison",
      "Schema-first CSV and JSON exports",
      "Estimating and ERP-ready data",
    ],
    workflow: [
      "Connect authorized supplier accounts or import price files",
      "Map fields into a canonical schema",
      "Compare against dated price history",
      "Review material and unit changes",
      "Export clean pricing data",
    ],
    integrations: ["Distributor APIs", "Drafting Table", "Supplier CSV", "Job costing", "NetSuite-ready", "CSV / JSON"],
    safeguards: [
      "Source vendor and effective date stay attached to pricing",
      "Normalization preserves the original record for audit",
      "Exports are reviewed before downstream import",
    ],
    seoTitle: "Construction Material Price Tracking Software",
    seoDescription:
      "Connect live roofing supplier pricing to your estimating workflow. Material Tracker pairs with Drafting Table for priced bids and supports purchasing and job costing.",
  },
  {
    slug: "project-agent",
    href: "/boltagent",
    theme: "red",
    name: "BoltAgent",
    shortName: "BoltAgent",
    category: "Contractor operations agent",
    status: "Deployed workflow",
    icon: "operations",
    eyebrow: "Field and office operations",
    headline: "Ask the schedule. Find the work that needs attention.",
    summary:
      "A specialist AI agent that queries contractor job-management data for work-order status, crew assignments, scheduling gaps, and stale builder jobs.",
    detail:
      "BoltAgent connects your office and field teams to ECi Bolt in plain language. Look up a work order, check its stage, find a crew assignment, and surface jobs that need attention without navigating multiple screens.",
    proof:
      "Deployed against a real contractor scheduling workflow with live API lookup as a core rule.",
    capabilities: [
      "Work-order lookup by number",
      "Live stage and status checks",
      "Crew assignment visibility",
      "Unscheduled work detection",
      "Stale builder-job follow-up",
      "Controlled job-note updates",
    ],
    workflow: [
      "Ask a work-order or scheduling question",
      "Pull current data from the job system",
      "Return stage, crew, dates, and next step",
      "Draft a note or follow-up when requested",
      "Require confirmation before consequential changes",
    ],
    integrations: ["ECi Bolt", "Chat", "Voice", "Google Chat", "CRM", "Webhooks"],
    safeguards: [
      "Job status is pulled live instead of assumed",
      "Missing records are reported clearly",
      "Rescheduling and closing work require human confirmation",
    ],
    seoTitle: "AI Contractor Scheduling and Work Order Agent",
    seoDescription:
      "BoltAgent gives contractors conversational access to live work orders, job status, crews, scheduling gaps, and builder follow-up workflows through ECi Bolt.",
  },
  {
    slug: "billing-agent",
    href: "/billingagent",
    theme: "green",
    name: "BillingAgent",
    shortName: "BillingAgent",
    category: "Financial operations agent",
    status: "Deployed workflow",
    icon: "billing",
    eyebrow: "Billing and finance operations",
    headline: "Ask a billing question without hunting through three systems.",
    summary:
      "Your AI assistant for invoice status, vendor bills, receivables, and financial questions across your connected systems.",
    detail:
      "BillingAgent connects natural-language requests to accounting and receivables data. It gathers live context, flags exceptions, and prepares the answer while keeping payments, approvals, and outbound communication behind explicit human confirmation.",
    proof:
      "Built for operational finance where complete context and approval boundaries matter more than flashy autonomy.",
    capabilities: [
      "Customer invoice status",
      "Vendor-bill anomaly review",
      "Accounts-receivable aging",
      "Vendor payment checks",
      "Unmatched transaction flags",
      "Voice and chat requests",
    ],
    workflow: [
      "Ask a billing or payment question",
      "Pull current records from connected systems",
      "Return amounts, dates, names, and status",
      "Flag discrepancies or missing context",
      "Request confirmation before any action",
    ],
    integrations: ["QuickBooks", "Billtrust", "NetSuite-ready", "Chat", "Voice", "AgentMail"],
    safeguards: [
      "Financial facts are pulled from source APIs",
      "Answers include amounts, dates, and account context",
      "No payment, approval, or external send happens without confirmation",
    ],
    seoTitle: "AI Billing Assistant for Construction Finance Teams",
    seoDescription:
      "BillingAgent connects natural language to invoice status, vendor bills, AR aging, payment checks, and reconciliation workflows with explicit human approval controls.",
  },
] as const;

export const solutionBySlug = new Map(
  solutions.map((solution) => [solution.slug, solution]),
);

export function getSolution(slug: string) {
  return solutionBySlug.get(slug);
}

// Keep every retired HTML / Markdown route pointed at the same public URL.
export const solutionRedirects: Record<string, string> = Object.fromEntries([
  ...solutions.map((solution) => [`/solutions/${solution.slug}`, solution.href]),
  ["/solutions/bolt-agent", "/boltagent"],
]);

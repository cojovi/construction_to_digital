export type SolutionIcon = "blueprint" | "materials" | "operations" | "billing";

export type Solution = {
  slug: string;
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
    name: "The Drafting Table",
    shortName: "Drafting Table",
    category: "AI estimating system",
    status: "Assisted pilot",
    icon: "blueprint",
    eyebrow: "Blueprint to takeoff",
    headline: "Plans in. Structured quantities out.",
    summary:
      "An assisted estimating workflow for turning residential plan sets into consistent, reviewable gutter takeoffs.",
    detail:
      "The workflow identifies elevations, extracts gutter measurements and component counts, and prepares spreadsheet-ready output. Scale checks and ambiguous results are routed to human review before material decisions move forward.",
    proof:
      "Designed around a real roofing and gutter estimating workflow, not a generic document chatbot.",
    image: "/images/roofing-takeoff.jpg",
    imageAlt:
      "Residential roof plan on a dark drafting table with cyan measurement geometry, a gloved hand, and a scale ruler",
    capabilities: [
      "Plan upload and sheet classification",
      "Scale-check workflow with manual verification",
      "Gutter and elevation measurement extraction",
      "Review flags for ambiguous results",
      "Structured CSV and JSON output",
      "Material pricing handoff",
    ],
    workflow: [
      "Upload a residential blueprint set",
      "Detect and verify scale per sheet",
      "Extract measurements and component counts",
      "Review confidence and flagged ambiguities",
      "Export a structured takeoff",
    ],
    integrations: ["Blueprint PDF", "Spreadsheet review", "CSV", "JSON", "Material pricing"],
    safeguards: [
      "Measurements are not trusted until scale is verified",
      "Low-confidence output is held for manual review",
      "Ambiguous install scope is surfaced instead of guessed",
    ],
    seoTitle: "AI Gutter Takeoff Software for Digital Blueprints",
    seoDescription:
      "The Drafting Table supports residential gutter takeoffs from digital blueprints with scale checks, structured output, and human review gates.",
  },
  {
    slug: "material-intelligence",
    name: "Construction Material Intelligence",
    shortName: "Material Intelligence",
    category: "Pricing data platform",
    status: "Active product",
    icon: "materials",
    eyebrow: "Supplier pricing intelligence",
    headline: "Know which price changed before the margin does.",
    summary:
      "A construction material pricing layer that normalizes supplier files, preserves price history, and prepares clean data for estimating and ERP workflows.",
    detail:
      "Different supplier exports become one consistent schema. Current and historical pricing can then support estimates, purchasing review, job costing, and clean downstream exports without another brittle spreadsheet handoff.",
    proof:
      "Built around live roofing supplier price-list formats and the people who reconcile them.",
    image: "/images/material-intelligence.jpg",
    imageAlt:
      "Roofing shingles, lumber, sheet material, insulation, fasteners, and flashing connected by cyan pricing data lines",
    capabilities: [
      "Multi-vendor CSV ingestion",
      "Canonical product normalization",
      "Historical price tracking",
      "Price-change comparison",
      "Schema-first CSV and JSON exports",
      "Estimating and ERP-ready data",
    ],
    workflow: [
      "Import supplier price files",
      "Map fields into a canonical schema",
      "Compare against dated price history",
      "Review material and unit changes",
      "Export clean pricing data",
    ],
    integrations: ["Supplier CSV", "Estimating", "Job costing", "NetSuite-ready", "CSV", "JSON"],
    safeguards: [
      "Source vendor and effective date stay attached to pricing",
      "Normalization preserves the original record for audit",
      "Exports are reviewed before downstream import",
    ],
    seoTitle: "Construction Material Price Tracking Software",
    seoDescription:
      "Normalize roofing supplier price lists, compare material pricing over time, and prepare auditable construction cost data for estimating, purchasing, job costing, and ERP import.",
  },
  {
    slug: "bolt-agent",
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
      "BoltAgent provides a conversational layer over ECi Bolt. Office and field teams can look up a work order, see its current stage, surface unscheduled work, add controlled notes, and prepare follow-up without navigating multiple screens.",
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
    name: "BillingAgent",
    shortName: "BillingAgent",
    category: "Financial operations agent",
    status: "Deployed workflow",
    icon: "billing",
    eyebrow: "Billing and finance operations",
    headline: "Ask a billing question without hunting through three systems.",
    summary:
      "A conservative financial operations agent for invoice status, vendor-bill review, aging visibility, payment checks, and reconciliation support.",
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

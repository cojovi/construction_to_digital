type ProductDetail = {
  audience: string;
  outcome: string;
  sequence: readonly { label: string; description: string }[];
  benefits: readonly { title: string; description: string }[];
  questions: readonly { question: string; answer: string }[];
  companion: { slug: string; title: string; description: string };
};

// Page-only detail stays out of the homepage's interactive console bundle.
export const productDetails: Record<string, ProductDetail> = {
  "drafting-table": {
    audience: "For production & tract roofing teams",
    outcome: "From a plan set to a bid you can work with.",
    sequence: [
      { label: "Blueprints in", description: "Residential roof plans, elevations, and drawing scale." },
      { label: "AI measures", description: "Roofing and gutter measurements, quantities, and component counts." },
      { label: "Bid prepared", description: "Connect Material Tracker pricing, review, and prepare your bid." },
    ],
    benefits: [
      { title: "Let the agent do the measuring.", description: "The AI reads the residential plan set and extracts roofing and gutter quantities. Your estimators can focus on scope and exceptions instead of starting every measurement by hand." },
      { title: "Keep the path to a bid connected.", description: "Pair the takeoff with Material Tracker to apply supplier pricing and prepare a complete bid. Your quantities and material costs become parts of the same workflow." },
      { title: "Make it your team's workflow.", description: "We configure the estimating agent around your business and handle setup. Your team then runs its own plan sets, reviews the output, and uses it in the tools it already works with." },
    ],
    questions: [
      { question: "What does autonomous blueprint measurement mean?", answer: "The agent reads the plan set and extracts measurements and counts for the takeoff. Drawing scale must be verified, and unclear scope is flagged for review. Your team reviews the result before using it for a bid or material order." },
      { question: "Can it produce a complete priced bid?", answer: "Yes. Drafting Table handles the roofing and gutter takeoff; pairing it with Material Tracker supplies pricing for the bid. During setup, we map the quantities, pricing inputs, and output to your estimating process." },
      { question: "Do you run each takeoff for us?", answer: "We set up your estimating agent so your team can operate it. The engagement starts with your plans, workflow, and desired output, then moves into a configured system your team uses itself." },
      { question: "Which plans and trades does it support?", answer: "The focus is residential roofing and gutters from digital blueprint PDFs. Other residential trade workflows can be discussed as custom implementations. Bring a representative plan set to establish fit." },
    ],
    companion: { slug: "material-intelligence", title: "The takeoff is only the beginning.", description: "Connect Material Tracker and turn measured roofing and gutter quantities into a priced bid using your supplier data." },
  },
  "material-intelligence": {
    audience: "For estimating & purchasing teams",
    outcome: "Current prices. Connected estimates.",
    sequence: [
      { label: "Connect suppliers", description: "Authorized distributor accounts and supported price files." },
      { label: "Track the price", description: "Products, units, source, and price changes in one place." },
      { label: "Price the work", description: "Feed estimating, purchasing, and your connected business systems." },
    ],
    benefits: [
      { title: "Move beyond the quarterly price sheet.", description: "Bring current pricing from supported distributor APIs into your dashboard. Keep the source and effective date visible so your team knows which price it is working with." },
      { title: "Make supplier data usable.", description: "Bring different product names, units, and supplier formats into a consistent structure. Compare changes and keep price history available for purchasing and estimating decisions." },
      { title: "Carry pricing into the next system.", description: "Use structured exports and configured API connections to support your estimating, accounting, and CRM workflows. Connection scope is mapped to the systems your team actually uses." },
    ],
    questions: [
      { question: "Which suppliers is this built around?", answer: "The initial distributor workflows are built around ABC Supply, QXO, and SRS. Available pricing and refresh behavior depend on your authorized account, distributor access, and the connection configured for your business." },
      { question: "How does it work with the estimator?", answer: "Drafting Table produces roofing and gutter takeoff quantities. Material Tracker supplies the pricing layer so the paired workflow can prepare a complete bid for your team to review." },
      { question: "Can we connect our accounting or CRM software?", answer: "Yes, integrations can be scoped around your existing workflow, including QuickBooks, NetSuite, and CRM systems. API availability and permissions determine the exact connection; structured CSV and JSON exports are also available." },
      { question: "Can we still use supplier price files?", answer: "Yes. Supplier CSV ingestion remains part of the workflow alongside supported API connections. Source records and effective dates stay attached so imported data can be distinguished from current connected pricing." },
    ],
    companion: { slug: "drafting-table", title: "Put your pricing to work on the next plan set.", description: "Pair Material Tracker with Drafting Table for autonomous blueprint measurement, roofing and gutter takeoffs, and priced bids." },
  },
  "project-agent": {
    audience: "For office teams & field operations",
    outcome: "The job answer, without the screen hunt.",
    sequence: [
      { label: "Ask the question", description: "A work order, a crew assignment, or a scheduling gap." },
      { label: "Read ECi Bolt", description: "Retrieve the current record from your connected job system." },
      { label: "Move work forward", description: "Get the answer, prepare follow-up, and confirm changes." },
    ],
    benefits: [
      { title: "Get straight to the work order.", description: "Ask for a job by work-order number and get its current stage, crew, and dates. Keep the answer grounded in the live job record." },
      { title: "Find work waiting on the next step.", description: "Surface unscheduled work and stale builder jobs before they disappear into the backlog. Give your team a focused view of what needs attention." },
      { title: "Bring field and office into the same conversation.", description: "Use chat or voice to retrieve job context and prepare notes or follow-up. Keep consequential scheduling and job changes behind your team's confirmation." },
    ],
    questions: [
      { question: "Is BoltAgent connected to ECi Bolt?", answer: "Yes. BoltAgent is a conversational layer configured against your authorized ECi Bolt data. It retrieves current work orders, stages, crew assignments, and scheduling information." },
      { question: "Can it change a schedule or close a job?", answer: "Consequential changes require confirmation. The agent can find the relevant record and prepare the next step, while your team keeps control of rescheduling and closing work." },
      { question: "Can it fit our current communication tools?", answer: "Chat, voice, Google Chat, and webhook-based workflows can be discussed during setup. We map the entry point and permissions to the tools your office and field teams use." },
      { question: "What happens if a job cannot be found?", answer: "Missing records are reported clearly. The agent should ask for the context it needs instead of inventing a status or assuming a crew assignment." },
    ],
    companion: { slug: "billing-agent", title: "Follow the job through to the invoice.", description: "Use BillingAgent to find invoice status, receivables, and payment context once the conversation moves from field work to finance." },
  },
  "billing-agent": {
    audience: "For construction finance & office teams",
    outcome: "Ask the billing question. Get the context.",
    sequence: [
      { label: "Ask in plain language", description: "Invoice status, vendor bills, aging, or payment questions." },
      { label: "Read the source", description: "Retrieve current records from your connected financial systems." },
      { label: "Review & act", description: "See the relevant details and confirm consequential actions." },
    ],
    benefits: [
      { title: "Find the invoice without the hunt.", description: "Ask about a customer invoice or vendor payment and get the relevant amounts, dates, names, and status from your connected records." },
      { title: "See the exceptions worth your time.", description: "Bring receivables aging, unusual vendor bills, and unmatched transactions into the conversation. Focus your review on the items that need attention." },
      { title: "Fit the way your office already works.", description: "Connect QuickBooks and your configured receivables workflow. Use chat or voice to ask questions, with approvals and external communication controlled by your team." },
    ],
    questions: [
      { question: "Does BillingAgent connect to QuickBooks?", answer: "Yes. BillingAgent uses authorized access to connected accounting records, including QuickBooks. The setup defines which companies, records, and actions the agent can access." },
      { question: "Can it work across more than one finance system?", answer: "The workflow can connect accounting and receivables context, including QuickBooks and Billtrust. Additional connections and NetSuite-ready exports are scoped to your implementation." },
      { question: "Does it make payments or send messages on its own?", answer: "Payments, approvals, and external messages require explicit confirmation. The agent retrieves the context and prepares the action so your team can make the decision." },
      { question: "How do we get started?", answer: "Start with the billing questions your team answers repeatedly and the systems involved. We map access, configure the agent, and walk through the review and approval points with your team." },
    ],
    companion: { slug: "project-agent", title: "Connect the billing question to the job.", description: "Explore BoltAgent for the work-order status, crew assignments, and scheduling context behind your construction operations." },
  },
};

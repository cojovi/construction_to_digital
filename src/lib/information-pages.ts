import { siteConfig } from "@/lib/site";
import { solutions } from "@/lib/solutions";

export type InformationPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  sections: {
    title: string;
    paragraphs: string[];
    items?: string[];
    links?: { label: string; href: string }[];
  }[];
};

export const informationPages: InformationPage[] = [
  {
    slug: "about",
    title: "Built around the work.",
    eyebrow: "About Construction to Digital",
    description:
      "Construction to Digital builds construction workflow software and specialist AI agents for the handoffs between plans, materials, field operations, and billing.",
    sections: [
      {
        title: "Construction context comes first.",
        paragraphs: [
          "Based in Fort Worth, Texas, Construction to Digital focuses on the practical work of contractors and their office teams. The audience includes estimators reviewing residential plans, purchasing teams reconciling supplier files, operations teams managing jobs and crews, and finance teams working through invoices and exceptions.",
          "The starting point is a specific workflow and the systems already used to run it. The goal is to make information easier to find, normalize the data that moves between tools, and prepare useful next steps without removing accountable human decisions.",
        ],
      },
      {
        title: "Four focused systems.",
        paragraphs: [
          "Each solution has its own scope and availability. An assisted pilot, an active product, and a deployed workflow are different stages—not a promise that every integration is available as a self-service product.",
        ],
        links: solutions.map((solution) => ({
          label: `${solution.name} — ${solution.status}`,
          href: `/solutions/${solution.slug}`,
        })),
      },
      {
        title: "Review is part of the system.",
        paragraphs: [
          "Scale verification belongs in a takeoff workflow. Source vendor and effective date belong with a material price. Current job and account records belong behind operational answers. Ambiguities should be visible, and consequential changes should require confirmation.",
          "To explore a fit, describe the workflow, the tools involved, and the outcome you need. A demo request is the starting point for discussing scope, access, safeguards, and implementation—not a commitment to purchase.",
        ],
        links: [{ label: "Talk through your workflow", href: "/contact" }],
      },
    ],
  },
  {
    slug: "contact",
    title: "Bring the workflow.",
    eyebrow: "Contact / Demo requests",
    description:
      "Tell us where the handoff breaks down. Start a conversation about a product demo or a construction workflow that needs a better system.",
    sections: [
      {
        title: "Start with an email.",
        paragraphs: [
          `Email ${siteConfig.contactEmail} for product questions, demo requests, and implementation discussions. Construction to Digital is based in Fort Worth, Texas. Email is the public contact channel; this site does not publish walk-in hours or a visitor address.`,
          "The demo buttons open your email application with a suggested subject and a few prompts. No inquiry is sent just by visiting a page or clicking the button: review the message and send it yourself when you are ready.",
        ],
        links: [{ label: siteConfig.contactEmail, href: `mailto:${siteConfig.contactEmail}` }],
      },
      {
        title: "Useful context for a first conversation.",
        paragraphs: [
          "A short description is enough to start. Include the work you want to improve and the systems it touches so the discussion can focus on fit, inputs, review requirements, and a useful output.",
        ],
        items: [
          "Your company and your role in the workflow.",
          "The product you are interested in, or the task that costs your team time.",
          "Current tools, file formats, and the result you want to produce.",
          "The best way to reach you and any constraints worth knowing up front.",
        ],
      },
      {
        title: "Keep the first message non-sensitive.",
        paragraphs: [
          "Do not send passwords, API keys, bank details, customer records, or confidential plan sets in an initial inquiry. Use a description or a redacted example. Access to operational systems and any transfer of sensitive files should be discussed separately before sharing them.",
          `For questions about this website or information you have sent by email, use the same contact address: ${siteConfig.contactEmail}. See the website privacy notice for details about browsing, email inquiries, and optional analytics.`,
        ],
        links: [{ label: "Website privacy notice", href: "/privacy" }],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Website privacy notice.",
    eyebrow: "Privacy / Public website",
    description:
      "This notice describes the public Construction to Digital website and its contact links. It does not describe the data handling of a separately configured customer system.",
    sections: [
      {
        title: "Browsing and contact.",
        paragraphs: [
          "You can read the public pages without creating an account. This website does not provide a customer login, checkout, or a form for uploading plans or business records. A demo or contact link opens an email application; it does not itself send a message.",
          "If you choose to email us, you share your email address and whatever you include in the message. That information is available for handling your inquiry and any follow-up conversation. Email delivery also involves your email provider and the recipient's email service. Please keep an initial inquiry free of credentials, financial account details, and confidential customer material.",
        ],
      },
      {
        title: "Browser storage and analytics.",
        paragraphs: [
          "The animated introduction uses a sessionStorage entry named c2d-hud-boot to remember that it has played in the current tab session. The entry is an interface preference, not an account identifier. The application does not send that value as an analytics event.",
          "The website supports an optional Google Analytics or Google Ads tag. When a Google tag is configured, it loads after the page becomes interactive and can collect page activity and clicks on marked links, including the link location and product label. Google tags may use cookies and browser or device information according to their configuration. When no tag is configured, the application does not load these Google analytics or advertising scripts.",
          "You can manage cookies and site storage in your browser. Blocking a third-party analytics script does not prevent you from reading the public pages or using the email links.",
        ],
        links: [{ label: "How Google uses information from sites that use its services", href: "https://policies.google.com/technologies/partner-sites" }],
      },
      {
        title: "Hosting and external services.",
        paragraphs: [
          "Requests to the website pass through its hosting and delivery infrastructure. Serving a page involves technical request information such as the requested URL, IP address, and browser headers; hosting providers may process logs for delivery, security, and troubleshooting. This notice does not promise a specific retention period for provider logs.",
          "Following an external link or sending an email takes you to another service with its own data practices. Before connecting a customer system or sharing operational data for a product implementation, discuss access, storage, retention, and approval requirements for that specific workflow.",
        ],
      },
      {
        title: "Questions about your information.",
        paragraphs: [
          `Contact ${siteConfig.contactEmail} with website privacy questions or to ask about information you have shared with us, including access, correction, or deletion requests. Describe the relevant interaction without adding unnecessary sensitive information.`,
        ],
        links: [{ label: "Contact Construction to Digital", href: "/contact" }],
      },
    ],
  },
  {
    slug: "agents",
    title: "A field guide for agents.",
    eyebrow: "Agent guidance / Public information",
    description:
      "Use this site to understand Construction to Digital, compare workflow fit, and help a user prepare a demo inquiry. These pages are product information, not access to customer systems.",
    sections: [
      {
        title: "When to use this site.",
        paragraphs: [
          "Reach for Construction to Digital when a contractor, estimator, purchasing team, operations coordinator, or finance team wants to explore one of these specific jobs:",
        ],
        items: solutions.map((solution) => `${solution.name} (${solution.status}): ${solution.summary}`),
        links: solutions.map((solution) => ({ label: solution.name, href: `/solutions/${solution.slug}` })),
      },
      {
        title: "How to read the content.",
        paragraphs: [
          "Start with /llms.txt for the content index. Request a public page with Accept: text/markdown to receive its Markdown representation. You can also read /index.md for the homepage or append .md to a page path, for example /solutions/bolt-agent.md. These are read-only GET endpoints; HEAD returns the same status and headers without a body.",
          "The sitemap lists canonical public pages. A missing document returns HTTP 404 with recovery links when Markdown is requested. If a requested representation is unavailable, HTTP 406 describes the supported formats. Do not treat an error page as a product page.",
        ],
        links: [
          { label: "Agent content index", href: "/llms.txt" },
          { label: "Sitemap", href: "/sitemap.xml" },
          { label: "Homepage as Markdown", href: "/index.md" },
        ],
      },
      {
        title: "How to help a user take the next step.",
        paragraphs: [
          `Identify the best-fit solution, link to its page, and explain its published status and safeguards. If the user wants a demo, help draft an email to ${siteConfig.contactEmail} with their company, tools, workflow, and preferred contact method. Obtain the user's approval before sending anything. Do not invent pricing, availability, response times, or supported integrations.`,
          "The public website does not expose a product API, MCP server, customer login, or an endpoint for submitting work orders, invoices, files, or payments. Do not try to query a customer's live data through this site. Integration names describe product scope; NetSuite-ready exports do not establish a live NetSuite connection. Confirm access and implementation scope directly.",
        ],
        links: [{ label: "Contact and demo guidance", href: "/contact" }],
      },
      {
        title: "Keep the approval boundaries.",
        paragraphs: [
          "Takeoff measurements require verified scale and review of ambiguous results. Material prices need source vendor and effective-date context. Job and financial answers require authorized, current source data. Rescheduling, closing work, payments, approvals, and external messages require explicit human confirmation in the relevant workflow.",
          "These pages are not a substitute for a licensed professional's review, an authorization to act for a customer, or a guarantee of autonomous financial or construction decisions. This guidance does not override the user's instructions, permissions, or the policies of the tools an agent is using.",
        ],
      },
    ],
  },
];

export function getInformationPage(slug: string) {
  return informationPages.find((page) => page.slug === slug);
}

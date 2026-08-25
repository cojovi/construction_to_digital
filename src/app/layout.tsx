import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { MarketingAnalytics } from "@/components/marketing-analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Construction to Digital | AI Systems Built for Contractors",
    template: "%s | Construction to Digital",
  },
  description: siteConfig.description,
  keywords: [
    "construction AI software",
    "custom AI agents for contractors",
    "construction workflow automation",
    "AI roofing takeoff software",
    "digital blueprint takeoff",
    "construction material price tracking",
    "contractor scheduling automation",
    "AI billing assistant",
    "QuickBooks AI agent",
    "ECi Bolt automation",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Construction to Digital | Physical Work. Digital Leverage.",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction to Digital | AI Systems Built for Contractors",
    description: siteConfig.description,
  },

  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#03080d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/construction-to-digital-logo.png`,
        description: siteConfig.description,
        areaServed: "United States",
        knowsAbout: [
          "Construction workflow automation",
          "Artificial intelligence agents",
          "Roofing takeoffs",
          "Construction material pricing",
          "Contractor operations",
          "Financial operations automation",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <JsonLd data={organizationSchema} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <MarketingAnalytics />
      </body>
    </html>
  );
}

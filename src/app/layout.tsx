import type { Metadata, Viewport } from "next";
import { Archivo, Chivo_Mono, Sora } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { MarketingAnalytics } from "@/components/marketing-analytics";
import { Atmosphere, FrameMarks } from "@/components/hud/atmosphere";
import { BootSequence } from "@/components/hud/boot-sequence";
import { HudFooter } from "@/components/hud/hud-footer";
import { HudHeader } from "@/components/hud/hud-header";
import { ReticleCursor } from "@/components/hud/reticle-cursor";
import { siteConfig } from "@/lib/site";
import "./globals.css";
import "./hud.css";

/**
 * Type system for SURVEY // LIVE INSTRUMENT:
 *   Archivo    — the display face. Grotesque with tight apertures; holds up at
 *                7rem with -0.048em tracking without turning into mush.
 *   Sora       — body. Geometric, slightly technical, reads cleanly at weight 300.
 *   Chivo Mono — every readout, label, and data string. This is the voice of
 *                the instrument.
 */
const displayFont = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const bodyFont = Sora({
  variable: "--font-body-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const monoFont = Chivo_Mono({
  variable: "--font-mono-data",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
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
      className={`hud-root ${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="hud-body">
        <JsonLd data={organizationSchema} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <BootSequence />
        <Atmosphere />
        <FrameMarks />
        <ReticleCursor />
        <HudHeader />
        {children}
        <HudFooter />
        <MarketingAnalytics />
      </body>
    </html>
  );
}

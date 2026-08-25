"use client";

import Script from "next/script";
import { useEffect } from "react";

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function MarketingAnalytics() {
  const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;

  useEffect(() => {
    if (!googleTagId) {
      return;
    }

    const trackClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLElement>("[data-analytics-event]");

      if (!link) {
        return;
      }

      (window as AnalyticsWindow).gtag?.(
        "event",
        link.dataset.analyticsEvent ?? "select_content",
        {
          event_category: "engagement",
          event_label: link.dataset.analyticsLocation,
          product: link.dataset.analyticsProduct,
        },
      );
    };

    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, [googleTagId]);

  if (!googleTagId) {
    return null;
  }

  const serializedId = JSON.stringify(googleTagId);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleTagId)}`}
        strategy="afterInteractive"
      />
      <Script id="construction-to-digital-google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${serializedId});`}
      </Script>
    </>
  );
}

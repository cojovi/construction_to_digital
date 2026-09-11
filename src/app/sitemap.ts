import type { MetadataRoute } from "next";
import { solutions } from "@/lib/solutions";
import { siteConfig } from "@/lib/site";
import { informationPages } from "@/lib/information-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${siteConfig.url}/images/hero-construction-digital.jpg`,
        `${siteConfig.url}/images/roofing-takeoff.jpg`,
        `${siteConfig.url}/images/material-intelligence.jpg`,
      ],
    },
    ...solutions.map((solution) => ({
      url: `${siteConfig.url}/solutions/${solution.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(solution.image
        ? { images: [`${siteConfig.url}${solution.image}`] }
        : {}),
    })),
    ...informationPages.map((page) => ({
      url: `${siteConfig.url}/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}

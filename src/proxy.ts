import { NextResponse, type NextRequest } from "next/server";
import { appendVary, negotiateDocument } from "@/lib/content-negotiation";
import { getMarkdown, markdownPath, notFoundMarkdown } from "@/lib/markdown";
import { siteConfig } from "@/lib/site";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const explicitMarkdown = path.endsWith(".md");

  // Files and framework internals retain their native representations. Unknown
  // document paths (including dotted names) still negotiate a recoverable 404.
  if (!explicitMarkdown && /\.(?:txt|xml|webmanifest|ico|png|jpe?g|webp|avif|gif|svg|css|js|map|woff2?|pdf)$/i.test(path)) {
    return NextResponse.next();
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    if (!explicitMarkdown) return NextResponse.next();
    return new Response("Method not allowed. Use GET or HEAD.\n", {
      status: 405,
      headers: { Allow: "GET, HEAD", "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const canonicalPath = explicitMarkdown
    ? path === "/index.md" ? "/" : path.slice(0, -3)
    : path;
  const markdown = getMarkdown(canonicalPath);
  const headers = new Headers();
  appendVary(headers, "Accept", "Accept-Encoding");
  const discovery = [`<${siteConfig.url}/llms.txt>; rel="describedby"; type="text/plain"`];
  if (markdown !== undefined) {
    discovery.push(`<${siteConfig.url}${markdownPath(canonicalPath)}>; rel="alternate"; type="text/markdown"`);
    if (explicitMarkdown) discovery.push(`<${siteConfig.url}${canonicalPath}>; rel="canonical"`);
  }
  headers.set("Link", discovery.join(", "));

  // Next's client-side navigation uses Flight, not a document representation.
  // Leave its Accept handling and response body to Next.js.
  if (!explicitMarkdown && request.headers.get("RSC") === "1") {
    return NextResponse.next({ headers });
  }

  // Explicit .md links work in browsers too, independently of Accept.
  const format = explicitMarkdown ? "markdown" : negotiateDocument(request.headers.get("Accept"));
  if (format === "html") return NextResponse.next({ headers });

  // Next appends these to HTML/Flight responses; direct responses do it here.
  appendVary(headers, "RSC", "Next-Router-State-Tree", "Next-Router-Prefetch", "Next-Router-Segment-Prefetch");

  // Never let a negotiated Markdown/error body populate an HTML cache entry.
  // Proxy executes before Next's static-page cache; HTML keeps its normal cache.
  headers.set("Cache-Control", "private, no-store");
  headers.set("CDN-Cache-Control", "no-store");
  headers.set("Vercel-CDN-Cache-Control", "no-store");

  if (format === null) {
    headers.set("Content-Type", "text/plain; charset=utf-8");
    return new Response(request.method === "HEAD" ? null :
      "406 Not Acceptable\nAvailable representations: text/html, text/markdown (UTF-8).\nRequest one of these types, or follow /llms.txt for explicit Markdown links.\n", {
      status: 406, headers,
    });
  }

  headers.set("Content-Type", "text/markdown; charset=utf-8");
  if (markdown === undefined) headers.set("X-Robots-Tag", "noindex");
  return new Response(request.method === "HEAD" ? null : markdown ?? notFoundMarkdown, {
    status: markdown === undefined ? 404 : 200,
    headers,
  });
}

export const config = {
  matcher: ["/((?!_next(?:/|$)|api(?:/|$)|brand(?:/|$)|images(?:/|$)|.well-known(?:/|$)).*)"],
};

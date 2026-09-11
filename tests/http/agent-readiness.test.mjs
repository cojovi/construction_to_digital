import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";

let baseUrl = process.env.C2D_TEST_URL;
let server;
let serverLog = "";
const pages = ["/", "/solutions/drafting-table", "/solutions/material-intelligence", "/solutions/bolt-agent", "/solutions/billing-agent", "/about", "/contact", "/privacy", "/agents"];
const mdPath = (path) => path === "/" ? "/index.md" : `${path}.md`;
const request = (path, accept = "text/html", options = {}) => fetch(new URL(path, baseUrl), {
  ...options, headers: { Accept: accept, ...options.headers }, signal: AbortSignal.timeout(15_000),
});
const vary = (response) => (response.headers.get("vary") ?? "").toLowerCase().split(",").map((token) => token.trim());

before(async () => {
  if (baseUrl) return;
  const probe = createServer();
  await new Promise((resolve, reject) => { probe.once("error", reject); probe.listen(0, "127.0.0.1", resolve); });
  const port = probe.address().port;
  await new Promise((resolve) => probe.close(resolve));
  baseUrl = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
    stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, NODE_ENV: "production" },
  });
  server.stdout.on("data", (chunk) => { serverLog += chunk; });
  server.stderr.on("data", (chunk) => { serverLog += chunk; });
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(`Server exited: ${serverLog}`);
    try {
      const response = await request("/robots.txt", "*/*");
      await response.text();
      if (response.ok) return;
    } catch { /* Wait until the production server is accepting requests. */ }
    await delay(100);
  }
  throw new Error(`Server did not start: ${serverLog}`);
});

after(async () => {
  if (!server || server.exitCode !== null) return;
  server.kill("SIGTERM");
  await new Promise((resolve) => server.once("exit", resolve));
});

for (const path of pages) {
  test(`${path}: HTML, negotiated Markdown, explicit Markdown, and HEAD`, async () => {
    const html = await request(path);
    assert.equal(html.status, 200);
    assert.match(html.headers.get("content-type"), /^text\/html/);
    assert.ok(vary(html).includes("accept"));
    assert.ok(vary(html).includes("rsc"));
    assert.match(html.headers.get("link"), /rel="alternate"; type="text\/markdown"/);
    const markup = await html.text();
    assert.match(markup, /id="main-content"/);
    assert.match(markup, /rel="canonical"/);

    const md = await request(path, "text/markdown");
    assert.equal(md.status, 200);
    assert.match(md.headers.get("content-type"), /^text\/markdown; charset=utf-8$/);
    assert.ok(vary(md).includes("accept"));
    assert.ok(vary(md).includes("accept-encoding"));
    assert.match(md.headers.get("cache-control"), /no-store/);
    assert.match(md.headers.get("cdn-cache-control"), /no-store/);
    const content = await md.text();
    assert.match(content, /^# /);
    assert.doesNotMatch(content, /<html|<script|self\.__next_f/);
    assert.ok(content.length > 500);
    assert.equal(md.headers.get("x-content-type-options"), "nosniff");

    const explicit = await request(mdPath(path));
    assert.equal(explicit.status, 200);
    assert.equal(await explicit.text(), content);
    assert.match(explicit.headers.get("link"), /rel="canonical"/);

    for (const route of [path, mdPath(path)]) {
      const head = await request(route, "text/markdown", { method: "HEAD" });
      assert.equal(head.status, 200);
      assert.equal(head.headers.get("content-type"), md.headers.get("content-type"));
      assert.equal(await head.text(), "");
    }
    // Alternating variants must never reuse a Markdown body as HTML.
    const htmlAgain = await request(path);
    assert.match(htmlAgain.headers.get("content-type"), /^text\/html/);
    await htmlAgain.arrayBuffer();
  });
}

for (const path of ["/audit-missing-page", "/solutions/not-a-product", "/nested/missing", "/missing.page", "/missing.md"]) {
  test(`${path}: real 404 and useful Markdown recovery`, async () => {
    for (const method of ["GET", "HEAD"]) {
      const response = await request(path, "text/markdown", { method });
      assert.equal(response.status, 404);
      assert.match(response.headers.get("content-type"), /^text\/markdown/);
      assert.equal(response.headers.get("x-robots-tag"), "noindex");
      const body = await response.text();
      if (method === "HEAD") assert.equal(body, "");
      else {
        assert.match(body, /^# 404/);
        assert.match(body, /\/llms\.txt/);
        assert.match(body, /\/sitemap\.xml/);
        assert.match(body, /\/contact\.md/);
      }
    }
    if (!path.endsWith(".md")) {
      const html = await request(path);
      assert.equal(html.status, 404);
      assert.match(await html.text(), /Agent content index/);
    }
  });
}

test("HTTP negotiation honors preference, exclusions, and unsupported types", async () => {
  for (const [accept, status, type] of [
    ["*/*", 200, "text/html"],
    ["text/markdown;q=0, */*", 200, "text/html"],
    ["text/markdown;q=0.1, text/html;q=0.9", 200, "text/html"],
    ["text/markdown;q=0.9, text/html;q=0.1", 200, "text/markdown"],
    ["text/html;q=0, */*", 200, "text/markdown"],
    ["application/json", 406, "text/plain"],
    ["text/html;q=0, text/markdown;q=0", 406, "text/plain"],
  ]) {
    const response = await request("/", accept);
    assert.equal(response.status, status, accept);
    assert.ok(response.headers.get("content-type").startsWith(type), accept);
    assert.ok(vary(response).includes("accept"));
    const body = await response.text();
    if (status === 406) assert.match(body, /text\/html, text\/markdown/);
  }
  const head = await request("/", "application/json", { method: "HEAD" });
  assert.equal(head.status, 406);
  assert.equal(await head.text(), "");
});

test("Next.js Flight navigation is not converted to Markdown or rejected", async () => {
  const response = await request("/about?_rsc=readiness-test", "text/x-component", { headers: { RSC: "1" } });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/x-component/);
  assert.ok(vary(response).includes("accept"));
  assert.ok(vary(response).includes("rsc"));
  assert.doesNotMatch(await response.text(), /^# /);
});

test("robots, sitemap, manifest, and llms.txt retain native formats", async () => {
  for (const [path, type, marker] of [
    ["/robots.txt", "text/plain", "Sitemap:"],
    ["/sitemap.xml", "application/xml", "<urlset"],
    ["/manifest.webmanifest", "application/manifest+json", "Construction to Digital"],
    ["/llms.txt", "text/plain", "## When to use"],
  ]) {
    const response = await request(path, "text/markdown");
    assert.equal(response.status, 200, path);
    assert.ok(response.headers.get("content-type").startsWith(type), path);
    assert.ok((await response.text()).includes(marker), path);
    const head = await request(path, "*/*", { method: "HEAD" });
    assert.equal(head.status, 200);
    assert.equal(await head.text(), "");
  }
});

test("sitemap inventory exactly matches public documents", async () => {
  const xml = await (await request("/sitemap.xml", "*/*")).text();
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  assert.deepEqual(paths.sort(), [...pages].sort());
});

test("llms.txt has the published structure and all document links resolve", async () => {
  const index = await (await request("/llms.txt", "*/*")).text();
  assert.match(index, /^# Construction to Digital\n\n> /);
  for (const section of index.split(/^## /m).slice(1)) {
    const entries = section.split("\n").slice(1).filter((line) => line.trim());
    assert.ok(entries.length > 0);
    for (const entry of entries) assert.match(entry, /^- \[.+\]\(https:\/\/.+\): .+/);
  }
  const links = [...index.matchAll(/\]\((https:\/\/[^)]+)\)/g)].map((match) => new URL(match[1]).pathname);
  assert.ok(links.includes("/agents.md"));
  for (const path of links) {
    const response = await request(path, "*/*");
    assert.equal(response.status, 200, path);
    await response.arrayBuffer();
  }
});

test("trust pages contain substantial shared content and truthful organization schema", async () => {
  for (const path of ["/about", "/contact", "/privacy"]) {
    const html = await (await request(path)).text();
    const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? "";
    assert.ok(main.replace(/<[^>]+>/g, "").length > 500);
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const org = schemas.flatMap((schema) => schema["@graph"] ?? []).find((item) => item["@type"] === "Organization");
    assert.equal(org.contactPoint["@type"], "ContactPoint");
    assert.equal(org.contactPoint.email, "jarvisstone@agentmail.to");
    assert.ok(org.contactPoint.contactType);
    assert.equal(org.address["@type"], "PostalAddress");
    assert.equal(org.address.addressLocality, "Fort Worth");
    assert.equal(org.address.addressRegion, "TX");
    assert.equal(org.address.addressCountry, "US");
    assert.equal(org.address.streetAddress, undefined);
    assert.equal(org.contactPoint.telephone, undefined);
  }
  const privacy = await (await request("/privacy", "text/markdown")).text();
  assert.match(privacy, /c2d-hud-boot/);
  assert.match(privacy, /optional Google Analytics or Google Ads/);
  const agents = await (await request("/agents", "text/markdown")).text();
  assert.match(agents, /does not expose a product API, MCP server/);
  assert.match(agents, /approval before sending/);
});

test("homepage navigation anchors, trust links, and static assets remain usable", async () => {
  const html = await (await request("/")).text();
  for (const path of ["/about", "/contact", "/privacy", "/agents"]) assert.ok(html.includes(`href="${path}"`));
  for (const anchor of ["top", "solutions", "systems", "approach", "process"]) assert.ok(html.includes(`id="${anchor}"`), anchor);
  const assets = new Set([...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"?]+)"/g)].map((match) => match[1]));
  assets.add("/brand/construction-to-digital-mark.png");
  for (const path of ["/apple-icon.png", "/icon.png", "/opengraph-image.jpg", "/twitter-image.jpg"]) assets.add(path);
  assert.ok(assets.size > 2);
  for (const path of assets) {
    const response = await request(path, "*/*");
    assert.equal(response.status, 200, path);
    assert.doesNotMatch(response.headers.get("content-type"), /text\/markdown/);
    await response.arrayBuffer();
  }
});

test("Markdown endpoints do not accept writes", { skip: Boolean(process.env.C2D_TEST_URL) }, async () => {
  const response = await request("/index.md", "text/markdown", { method: "POST" });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "GET, HEAD");
  await response.text();
});

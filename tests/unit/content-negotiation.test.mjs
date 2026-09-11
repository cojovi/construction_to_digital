import assert from "node:assert/strict";
import { test } from "node:test";
import { appendVary, negotiateDocument } from "../../src/lib/content-negotiation.ts";

const cases = [
  [null, "html"],
  ["*/*", "html"],
  ["text/*", "html"],
  ["text/html", "html"],
  ["text/markdown", "markdown"],
  ["TEXT/MARKDOWN; CHARSET=UTF-8", "markdown"],
  ["text/markdown; charset=\"utf-8\"", "markdown"],
  ["text/markdown, text/html", "markdown"],
  ["text/html, text/markdown", "html"],
  ["text/markdown;q=0.8, text/html;q=0.9", "html"],
  ["text/markdown;q=1, text/html;q=0.8", "markdown"],
  ["text/markdown;q=0, text/html", "html"],
  ["text/html;q=0, text/markdown", "markdown"],
  ["text/markdown;q=0, */*;q=1", "html"],
  ["text/html;q=0, */*;q=1", "markdown"],
  ["text/*;q=0, */*;q=1", null],
  ["text/*;q=0, text/markdown;q=0.5", "markdown"],
  ["text/html;q=0.1, text/*;q=0.9", "markdown"],
  ["text/markdown;q=0.1, text/*;q=0.9", "html"],
  ["text/html;q=0, text/markdown;q=0", null],
  ["*/*;q=0", null],
  ["", null],
  ["application/json", null],
  ["text/markdown;q=0", null],
  ["application/json, */*;q=0.2", "html"],
  ["text/markdown; charset=iso-8859-1", null],
  ["text/markdown; variant=unsupported, text/html;q=0.5", "html"],
  ["text/markdown; note=\"a,b;c\", text/html", "html"],
  ["text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8", "html"],
];

for (const [accept, expected] of cases) {
  test(`Accept ${JSON.stringify(accept)} selects ${expected ?? "406"}`, () => {
    assert.equal(negotiateDocument(accept), expected);
  });
}

test("Vary additions preserve Next.js tokens and avoid case-insensitive duplicates", () => {
  const headers = new Headers({ Vary: "RSC, next-router-state-tree, ACCEPT" });
  appendVary(headers, "Accept", "Accept-Encoding", "RSC");
  assert.equal(headers.get("Vary"), "RSC, next-router-state-tree, ACCEPT, Accept-Encoding");
});

test("Vary wildcard remains a wildcard", () => {
  const headers = new Headers({ Vary: "*" });
  appendVary(headers, "Accept");
  assert.equal(headers.get("Vary"), "*");
});

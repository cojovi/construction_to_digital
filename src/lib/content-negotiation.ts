import Negotiator from "negotiator";

const htmlType = "text/html; charset=utf-8";
const markdownType = "text/markdown; charset=utf-8";

// Prefer HTML when unconstrained; otherwise respect q, specificity, parameters,
// explicit exclusions, and client ordering with an established HTTP parser.
export function negotiateDocument(accept: string | null): "html" | "markdown" | null {
  const type = new Negotiator({ headers: { accept: accept ?? "*/*" } })
    .mediaType([htmlType, markdownType]);
  if (type === htmlType) return "html";
  if (type === markdownType) return "markdown";
  return null;
}

export function appendVary(headers: Headers, ...names: string[]) {
  const existing = (headers.get("Vary") ?? "").split(",").map((value) => value.trim()).filter(Boolean);
  if (existing.includes("*")) return;
  for (const name of names) {
    if (!existing.some((value) => value.toLowerCase() === name.toLowerCase())) existing.push(name);
  }
  headers.set("Vary", existing.join(", "));
}

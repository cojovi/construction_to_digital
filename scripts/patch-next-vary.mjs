import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

// Next 16.3.4's App Page entrypoint replaces Vary after Proxy/config headers
// run. Preserve those values so Accept negotiation is safe for shared caches.
// Keep this small compatibility fix version-checked; reassess on every upgrade.
const require = createRequire(import.meta.url);
const packagePath = require.resolve("next/package.json");
const { version } = JSON.parse(await readFile(packagePath, "utf8"));
if (version !== "16.3.4") {
  throw new Error(`Review the Next.js Vary compatibility patch for Next ${version} before installing.`);
}

const original = "res.setHeader('Vary', varyHeader);";
const patched = "res.appendHeader('Vary', varyHeader); // c2d: preserve negotiated response variants";
const files = [
  "dist/build/templates/app-page-runtime.js",
  "dist/esm/build/templates/app-page-runtime.js",
];

// Validate all targets before changing either. Repeated installs are harmless.
const targets = await Promise.all(files.map(async (file) => {
  const path = join(dirname(packagePath), file);
  const source = await readFile(path, "utf8");
  if (source.includes(patched)) return { path, source, changed: false };
  if (source.split(original).length !== 2) {
    throw new Error(`Next.js Vary patch target changed: ${file}. Review instead of silently skipping it.`);
  }
  return { path, source: source.replace(original, patched), changed: true };
}));
for (const target of targets) {
  if (target.changed) await writeFile(target.path, target.source);
}
console.log("Next.js Vary compatibility patch verified (16.3.4).");

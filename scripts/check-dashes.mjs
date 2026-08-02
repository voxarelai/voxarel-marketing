#!/usr/bin/env node
/**
 * Fails on any Unicode dash in src/. See _SPINE.md section 0.1.
 * The ASCII hyphen U+002D is allowed: it is correct in role-based,
 * 7-year, Gulf-to-India and in every Tailwind class on the site.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const ROOTS = ["src", "scripts"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".json", ".md"]);

/** Every Unicode dash that is not U+002D. */
const DASHES = new Map([
  [0x2010, "HYPHEN"],
  [0x2011, "NON-BREAKING HYPHEN"],
  [0x2012, "FIGURE DASH"],
  [0x2013, "EN DASH"],
  [0x2014, "EM DASH"],
  [0x2015, "HORIZONTAL BAR"],
  [0x2212, "MINUS SIGN"],
  [0x2e3a, "TWO-EM DASH"],
  [0x2e3b, "THREE-EM DASH"],
  [0xfe58, "SMALL EM DASH"],
  [0xfe63, "SMALL HYPHEN-MINUS"],
  [0xff0d, "FULLWIDTH HYPHEN-MINUS"],
]);

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry === "node_modules" || entry === ".next" || entry === "archive") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      yield* walk(full);
    } else if (EXTENSIONS.has(extname(full))) {
      yield full;
    }
  }
}

const findings = [];

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const char of line) {
        const code = char.codePointAt(0);
        const name = DASHES.get(code);
        if (name) {
          findings.push({
            file: relative(process.cwd(), file),
            line: i + 1,
            name,
            code: `U+${code.toString(16).toUpperCase().padStart(4, "0")}`,
            text: line.trim().slice(0, 100),
          });
        }
      }
    });
  }
}

if (findings.length === 0) {
  console.log("No Unicode dashes found. Writing standard holds.");
  process.exit(0);
}

console.error(`\nWriting standard violation. ${findings.length} Unicode dash(es) found.`);
console.error("_SPINE.md section 0.1: use a comma, a full stop, a colon or brackets.\n");
for (const f of findings) {
  console.error(`  ${f.file}:${f.line}  ${f.name} (${f.code})`);
  console.error(`    ${f.text}\n`);
}
process.exit(1);

#!/usr/bin/env node
/**
 * SEO invariants crawl. Run against a local production server (npm run build,
 * then npx next start -p 3100) or against production with BASE=https://www.voxarel.com.
 * Checks every sitemap URL plus /register and a 404: one h1, title, description,
 * canonical == og:url == self, twitter card mirrors openGraph, alt on every img,
 * valid JSON-LD, breadcrumbs start at Home, robots directives.
 *
 *   BASE=http://localhost:3100 npm run seo:check
 */
const BASE = process.env.BASE ?? "http://localhost:3100";
const SITE = "https://www.voxarel.com";
const dec = (s) => (s ?? "").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attr = (html, re) => { const m = html.match(re); return m ? dec(m[1]) : null; };
const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ""));
const extra = ["/register"];
const failures = [];
const staticPaths = new Set(urls.filter((u) => !u.startsWith("/shipping/") && !u.startsWith("/resources/")));
async function check(path) {
  const res = await fetch(`${BASE}${path}`, { headers: { "user-agent": "crawl-check" } });
  const html = await res.text();
  const f = [];
  if (res.status !== 200) f.push(`status ${res.status}`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) f.push(`h1 count ${h1}`);
  const title = attr(html, /<title>([^<]*)<\/title>/);
  if (!title) f.push("no title"); else if (/\| Voxarel \| Voxarel/.test(title)) f.push(`double suffix: ${title}`);
  if (title && title.length > 70 && staticPaths.has(path)) f.push(`title ${title.length} chars`);
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  if (!desc) f.push("no description"); else if (staticPaths.has(path) && (desc.length < 50 || desc.length > 160)) f.push(`description ${desc.length} chars`);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const self = `${SITE}${path === "/" ? "" : path}`;
  if (canonical !== self && canonical !== self + "/") f.push(`canonical ${canonical}`);
  const ogUrl = attr(html, /<meta property="og:url" content="([^"]*)"/);
  if (ogUrl !== self && ogUrl !== self + "/") f.push(`og:url ${ogUrl}`);
  const ogTitle = attr(html, /<meta property="og:title" content="([^"]*)"/);
  const twTitle = attr(html, /<meta name="twitter:title" content="([^"]*)"/);
  if (!ogTitle) f.push("no og:title"); if (ogTitle !== twTitle) f.push(`twitter:title mismatch (${twTitle})`);
  if (ogTitle && ogTitle !== title) f.push(`og:title != title (${ogTitle})`);
  const ogDesc = attr(html, /<meta property="og:description" content="([^"]*)"/);
  const twDesc = attr(html, /<meta name="twitter:description" content="([^"]*)"/);
  if (!ogDesc || !twDesc) f.push("missing og/twitter description"); else if (ogDesc !== twDesc) f.push("twitter:description mismatch");
  if (!/<meta property="og:image" content="https:\/\/www\.voxarel\.com\/og\.png"/.test(html)) f.push("og:image missing");
  if (!/<meta name="twitter:card" content="summary_large_image"/.test(html)) f.push("twitter:card missing");
  const imgs = html.match(/<img[^>]*>/g) || [];
  if (imgs.some((i) => !/\salt=/.test(i))) f.push("img without alt");
  const robots = attr(html, /<meta name="robots" content="([^"]*)"/);
  const gbot = attr(html, /<meta name="googlebot" content="([^"]*)"/);
  if (path === "/register") { if (!/noindex/.test(robots ?? "")) f.push(`register robots ${robots}`); }
  else { if (!/max-image-preview:large/.test(gbot ?? "")) f.push(`googlebot ${gbot}`); if (/noindex/.test(robots ?? "")) f.push("unexpected noindex"); }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data; try { data = JSON.parse(m[1]); } catch (e) { f.push("invalid JSON-LD"); continue; }
    const arr = Array.isArray(data) ? data : [data];
    for (const d of arr) if (d["@type"] === "BreadcrumbList" && d.itemListElement?.[0]?.name !== "Home") f.push("breadcrumb without Home");
  }
  if (path.startsWith("/shipping/") || path.startsWith("/resources/")) { if (!/"@type":"BreadcrumbList"/.test(html)) f.push("no BreadcrumbList"); }
  if (f.length) failures.push([path, f]);
}
const all = [...urls, ...extra];
let i = 0;
await Promise.all(Array.from({ length: 8 }, async () => { while (i < all.length) { const p = all[i++]; try { await check(p); } catch (e) { failures.push([p, [String(e)]]); } } }));
const nf = await fetch(`${BASE}/this-page-does-not-exist`);
const nfHtml = await nf.text();
const nfTitle = attr(nfHtml, /<title>([^<]*)<\/title>/);
console.log(`404: status ${nf.status}, title "${nfTitle}", noindex ${/noindex/.test(nfHtml)}`);
console.log(`checked ${all.length} URLs, failures: ${failures.length}`);
for (const [p, f] of failures) console.log(`  ${p}: ${f.join("; ")}`);
process.exit(failures.length || nf.status !== 404 ? 1 : 0);

# SEO status ledger

Audit run 2026-09-26 against production (www.voxarel.com) and source, then remediated in the same change set. This file is the single place to check what is verified, what was changed, and how to re-verify. Keep it updated when pages are added.

## The 20-point checklist

| # | Item | State on 2026-09-26 before work | What was done | How to re-check |
|---|---|---|---|---|
| 1 | sitemap.xml | Present, 518 URLs (`src/app/sitemap.ts`) | `lastModified` bumped for the pages whose content changed (hub, 500 lanes, 4 solution pages). Convention unchanged: bump by hand in the same change that edits a page | `curl -s https://www.voxarel.com/sitemap.xml \| grep -c "<loc>"` should equal static pages + lanes |
| 2 | robots.txt | Present, allows all + named AI crawlers | Added `Disallow: /api/` for `*` | `curl https://www.voxarel.com/robots.txt` |
| 3 | noindex | Only `/register` (intentional sign-up gate, out of the sitemap) | Kept. 404 page relies on the noindex Next adds automatically | `npm run seo:check` asserts no other page carries noindex |
| 4 | Canonical | Every page, via `metadataBase` | Unchanged; now produced by `pageMeta()` | `seo:check` asserts canonical == og:url == self |
| 5 | Meta titles | Present; every page hard-coded `\| Voxarel` | Root `title.template` (`%s \| Voxarel`); pages set bare titles; `about`, `features`, `register` use `{ absolute }`; 404 gets "Page not found" | `seo:check` asserts no double suffix |
| 6 | Meta descriptions | Present; 8 pages over 160 chars, 2 under 50 | All static pages now 109 to 160 chars; `/shipping` rewritten; `/privacy` and `/terms` lengthened to describe the page | `seo:check` asserts 50 to 160 chars on static pages |
| 7 | One H1 per page | Verified on every template | Unchanged | `seo:check` asserts exactly one `<h1>` on all 519 URLs |
| 8 | Heading hierarchy | No skipped levels anywhere (no h4+, every h3 under an h2) | New sections follow the same h2 then h3 pattern | grep `<h[1-6]` in `src/` |
| 9 | Alt text | Every image had alt | OG image alts are now page-specific (articles use the title) | `seo:check` asserts every `<img>` has alt |
| 10 | Schema markup | Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList (lanes, no Home), BlogPosting | Organization gains `telephone` and Instagram in `sameAs`; shared `breadcrumbSchema()` with Home on lanes and articles, mirrored by a visible `<Breadcrumbs />` | Rich Results Test on `/shipping/dubai-to-chennai`, an article, the homepage |
| 11 | Internal links | 250 of 500 lane pages had zero inbound links; hub HTML listed 24 lanes; footer had no `/shipping` link; solutions and lanes never cross-linked | `relatedLanes()` (cyclic neighbours) gives every lane 5 to 12 inbound links; server-rendered "All corridors by origin" index lists all 500 lanes on `/shipping`; footer links `/shipping`; 4 solution pages show 8 flagship lanes; every lane links to two solution pages; consolidation article links the hub | Built-HTML check (see below) |
| 12 | Broken links | None found (every href has a route, anchors exist, external hosts resolve) | Nothing to fix | `seo:check` plus a link crawler if pages are added |
| 13 | Image compression | og.png 246 KB, logos 24 KB and 52 KB, icon 36 KB | `npm run images:compress`: og.png 70 KB, logo 4.6 KB, white logo 13.6 KB, icon 10 KB, same dimensions, visually identical | `ls -l public/*.png src/app/icon.png` |
| 14 | Core Web Vitals | Lab (throttled mobile): LCP 1.2 to 1.75 s, CLS 0.00 to 0.02, TBT 120 to 270 ms | Homepage product mock now reveals via CSS (no opacity 0 until hydration); nav and footer logos get `sizes`; smaller images | Lighthouse mobile on `/`, `/shipping`, one lane after deploy; Search Console CWV report once field data exists |
| 15 | Mobile responsiveness | No horizontal overflow on 11 pages at 390 px | Nav and footer links get 24 px+ tap targets; 11 px label raised to 12 px; new index verified at 390 px | Playwright check (see below) |
| 16 | HTTPS | http to https 308, HSTS 2 years (Vercel), CSP `upgrade-insecure-requests`; apex to www was a 307 | Apex redirect set to 308 via the Vercel project domains API | `curl -I https://voxarel.com/` shows 308 to www |
| 17 | URL slugs | Lowercase, hyphenated, no trailing slash (308 to non-slash) | Nothing to fix | spot check `curl -I https://www.voxarel.com/shipping/` |
| 18 | OG image | Present but `/shipping` and `/register` inherited the homepage og:url, and every page's Twitter card showed the homepage title | Root `twitter` reduced to `{ card }` so Next fills it from each page's openGraph; every page now sets openGraph through `pageMeta()` | `seo:check` asserts twitter:title == og:title |
| 19 | Search Console | DNS TXT and HTML-file verification tokens present | Pending: add `claude-seo@st-courier-seo.iam.gserviceaccount.com` (Full) to the voxarel.com property, then run the API steps below | see "Search Console" |
| 20 | Backlink strategy | None | `docs/BACKLINK_STRATEGY.md` | quarterly review |

## Verified as already correct (no code change)

Sitemap present and complete, robots present, canonical on every page, one H1 everywhere, no heading skips, alt on every image, HTTPS enforced with HSTS, clean slugs, OG image present, Search Console tokens present, no broken internal links, no legacy v1 URLs needing redirects (v1 only had `/`, `/privacy`, `/terms`).

## Conventions introduced

- Metadata: `src/lib/metadata.ts` `pageMeta()`. Bare `title` (template adds the brand), `openGraph` without `title`, no `twitter` block. `generateMetadata` pages return `pageMeta()` too.
- Internal linking invariants: `lanes` in `src/lib/lanes.ts` must stay origin-major; `relatedLanes()` and `lanesByOrigin()` index into it. `CorridorIndex` renders all lanes server-side with `prefetch={false}`.
- Breadcrumbs: visible `<Breadcrumbs />` and `breadcrumbSchema()` always start with Home and use the same labels.
- Contact and social: only `src/lib/site.ts` holds the WhatsApp number, LinkedIn and Instagram URLs.

## How to re-verify

1. `npm run check:dashes && npm run lint && npm run build`
2. In another terminal: `npx next start -p 3100` (port 3000 is often taken by another local project)
3. `BASE=http://localhost:3100 npm run seo:check` (519 URLs, must report 0 failures)
4. Built-HTML link invariants (ad hoc, from `.next/server/app`): `/shipping.html` must contain 500 distinct `/shipping/<slug>` hrefs; every `shipping/<slug>.html` must receive at least 5 lane links from other lane pages and link to `/gulf-to-india-cargo` and `/freight-forwarding-software`; each of the four solution pages must contain 8 lane links plus `/shipping`.
5. Mobile: Playwright at 390 px (iPhone 12 profile) on `/`, `/features`, `/about`, `/shipping`, two lanes, a solution page, an article, `/demo`, `/track`: `document.documentElement.scrollWidth <= innerWidth`, no `header nav a` or `footer a` shorter than 24 px.
6. After deploy: `curl -I https://voxarel.com/` (308), Rich Results Test, Lighthouse mobile.

Results on 2026-09-26 (local production build): build 518 static pages; crawl 519 URLs, 0 failures; lane coverage 500/500 with inbound min 5 max 12; hub HTML 231 KB raw / 25.5 KB gzip with 500 lane links; 10 mobile pages clean.

## Search Console

Status: DNS TXT `google-site-verification` exists on the apex and `public/google004d4bae331972c0.html` is served, so the property should already be verified. Confirmation and sitemap submission are pending the service account grant.

Once `claude-seo@st-courier-seo.iam.gserviceaccount.com` has Full access on the voxarel.com property (Search Console, Settings, Users and permissions, Add user):

1. `sites.list` must show `sc-domain:voxarel.com` or `https://www.voxarel.com/`.
2. `sitemaps.submit` for `https://www.voxarel.com/sitemap.xml`, then `sitemaps.list` to confirm discovered URLs (expect 518).
3. URL inspection on `/`, `/shipping`, and three lanes; note verdict and last crawl.
4. Read the Links report for the backlink baseline and the Core Web Vitals report once 28 days of field data exist.

If the property is missing: add a Domain property for `voxarel.com` in Search Console and choose the DNS method; the TXT record already exists, so verification completes immediately.

## Known limits

- PageSpeed Insights public quota was exhausted on audit day; lab numbers came from a throttled Playwright run, not Lighthouse. Re-run Lighthouse after deploy and record scores here.
- The OG image keeps the launch design by decision (compressed only). `og-source.html` still describes the old headline and uses Poppins; update both before regenerating.

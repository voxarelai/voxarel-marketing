# Voxarel Marketing Site

Redesigned marketing site (v2). The previous dark-theme v1 site lives in `archive/voxarel-marketing-v1/` — it is excluded from the build (tsconfig `exclude` + `@source not` in globals.css) and must not be edited as part of the live site. V1 is also preserved as git tag `v1-design` / branch `archive/v1-design`.

## Tech Stack
- Next.js 15.5 (App Router, Server Components)
- React 19, TypeScript 5
- Tailwind CSS v4 (`@tailwindcss/postcss`, tokens via `@theme` in `src/app/globals.css`)
- Self-hosted fonts: Geist Sans and Geist Mono from the `geist` package (display `--font-display`, mono), Lato 400/700 from `src/fonts/` (body, `--font-lato`). The Poppins files in `src/fonts/` are only used by `og-source.html`. No CDN fonts.

## Commands
```bash
npm run dev              # Start dev server
npm run build            # Production build (also typechecks)
npm run check:dashes     # Fails on any Unicode dash in src/ or scripts/ (also a pre-commit hook + CI)
npm run images:compress  # Re-compress public/*.png and src/app/icon.png with sharp (dimensions unchanged)
npm run seo:check        # Crawl every sitemap URL on a local prod server and assert SEO invariants (BASE=http://localhost:3100)
```

## Path Alias
`@/*` maps to `./src/*`

## Project Structure
- `src/app/page.tsx` — homepage composed of section components
- Routes: `/` `/features` `/about` `/demo` `/track` `/register` (noindex) `/privacy` `/terms` `/resources` `/resources/[slug]` `/shipping` `/shipping/[lane]` (500 lanes) and 6 solution pages (`/cargo-management-software`, `/courier-management-software`, `/freight-forwarding-software`, `/3pl-software`, `/gulf-to-india-cargo`, `/logistics-software-uae`)
- `src/components/` — section components (Hero, Modules, Roles, ProofBar, PulseSection, TrackSection, CtaBand, Footer, Navigation, …)
- `src/lib/site.ts` — single source of truth for external URLs and contact info (console.voxarel.com, partners@voxarel.com, WhatsApp number, LinkedIn, Instagram, legal line)
- `src/lib/metadata.ts` — `pageMeta()` helper; every page sets a bare `title` (root template appends `| Voxarel`), `openGraph` without a title, and never a `twitter` block (Next fills it from openGraph)
- `src/lib/lanes.ts` — 500 corridor lanes (origin-major order; `relatedLanes`, `lanesByOrigin`, `flagshipCorridorLinks` depend on it)
- `src/lib/schema.ts` — JSON-LD (Organization, WebSite, SoftwareApplication, `breadcrumbSchema`)
- `docs/MARKETING_ANALYTICS_PLAN.md` — PostHog event plan
- `docs/SEO_STATUS.md` — SEO audit ledger (what is verified, what was fixed, how to re-check)
- `docs/BACKLINK_STRATEGY.md` — link-building plan
- `og-source.html` — source for regenerating `public/og.png` (then run `npm run images:compress`)

## Theme (brand tokens in globals.css @theme)
- Petrol `#104050` (deep `#0b2c36`, soft `#16455a`), ink `#16282e`
- Mint `#5fb5a2` (bright `#86d8c4`, deep `#2e8c7a`)
- Ivory `#fbfaf6`, tints `#f2f8f6` / `#eaf4f1`, hairline `#e2ece9`
- Light background (`#ffffff` body) — this is NOT the dark v1 theme

## Key Conventions
- Client components use `"use client"` directive
- No env vars required; external links come from `src/lib/site.ts`
- Deploys: pushing `main` (GitHub `voxarelai/voxarel-marketing`) auto-deploys via Vercel to **voxarels-projects/voxarel-marketing** → www.voxarel.com (voxarel.com 307s to www). Local `.vercel/` is linked to this project.
- Beware: a same-named `voxarel-marketing` project exists in the `zahid-sages-projects` Vercel team — that one belongs to the product monorepo's previews, NOT this site. Always use `--scope voxarels-projects` for CLI operations.

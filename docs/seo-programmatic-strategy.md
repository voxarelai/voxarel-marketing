# Voxarel programmatic SEO strategy

Research-backed plan (Aug 2026). Sources: deep-research run `wzsn2redh` (25 sources, 16/25 claims verified 3-0) + primary competitor sitemap analysis (Freightos, GoFreight, Shipthis, Shipsy).

## The thesis: don't fight head terms, own two gaps

The incumbents already own the head terms and outrank us on authority. We win by exploiting two **structural gaps** they leave open:

1. **The Gulf↔India corridor is uncontested.** Shipsy (the strongest UAE-ranking incumbent — $25M raised, Dubai ops, real UAE content cluster) ranks for "logistics software UAE" but has **zero India-corridor content** (verified: no India routes, no CEPA, no Gulf→India). Freightos proved the corridor template works globally (route index → region → country → city → lane). **Nobody is doing origin→destination corridor pages for our lane.** This is our fastest, most winnable play.

2. **AI answers cite review directories + citable content, not vendor blogs.** The "top logistics software in UAE" listicles that rank are self-serving vendor blogs (Locus ranks *itself* #1), all last-mile/enterprise-TMS — no freight-forwarding / cargo / Gulf-India tools. Beatable.

## What NOT to do (verified)

- **Don't chase "cargo/freight/logistics software" head terms** as primary targets — owned by high-DA incumbents (CargoWise, Shipsy, Locus). Use the 6 existing pages, but growth comes from long-tail.
- **Don't over-invest in `llms.txt`.** Every claim of llms.txt effectiveness was **refuted 0-3** in verification — no confirmed AI-vendor support, no measured citation uplift. Keep the one we have (cheap), but it is **not** a ranking lever. Real GEO levers: passage-level citability, review-directory listings, entity/brand mentions.
- **Don't spin thin pages.** Google's March-2024 **Scaled Content Abuse** policy mass-deindexes pages built to manipulate rankings (hundreds/thousands at once, recovery in months or never). The uniqueness bar is non-negotiable.

## The programmatic build, by effort-to-win

Emulate the **Zapier model**: high-value **hub** pages + a long tail of **combination** pages whose value is aggregation (integration pages = ~16% of Zapier's organic traffic).

### Priority 1 — Corridor pages (the wedge) — build first
- **URLs:** hub `/shipping/[country]` and lane `/shipping/[origin]-to-[destination]` (e.g. `/shipping/dubai-to-chennai`).
- **Unique data per page (the anti-thin-content moat):** sea/air transit time, distance, ports, chargeable-weight basis, dual currency (AED/INR), CEPA duty notes, common commodities, a live shipments frame. This lane-specific data is what makes each page genuinely unique.
- **Scale:** Gulf origins (Dubai, Sharjah, Abu Dhabi, Jebel Ali, Ajman) × top India destinations (Chennai, Cochin, Mumbai, Delhi, Bengaluru, Hyderabad, Kolkata, Ahmedabad) ≈ **40–80 lane pages + ~8 country/city hubs**. Expand to other corridors (Gulf→Pakistan, Gulf→Africa) later.
- Mockup: `mockups/seo-corridor.html`.

### Priority 2 — "[Competitor] alternative" pages — build second
- **URLs:** `/compare/[competitor]-alternative` (e.g. `/compare/cargowise-alternative`).
- **Why it works:** CargoWise's weakness is verified real (216+ modules, 6–12+ month implementation, users on <50%). GoFreight runs exactly this play and ranks. High commercial intent — searchers have wallet out.
- **Unique element:** honest side-by-side comparison table (+ trademark disclaimer).
- **Scale:** **~8–15 pages** (CargoWise, Magaya, Logi-Sys, Shipsy, GoFreight, Softlink/Logitude, Freightos, Rose Rocket, Shipthis).
- Mockup: `mockups/seo-comparison.html`.

### Priority 3 — Glossary / definition pages — build third
- **URLs:** `/glossary/[term]` (e.g. `/glossary/cargo-consolidation`).
- **Why:** builds topical authority + internal-linking equity, and the definition box is engineered as the passage AI Overviews/ChatGPT/Perplexity quote. GoFreight runs 58 of these.
- **Scale:** **~40–80 terms** (consolidation, groupage, LCL/FCL, AWB, HS code, demurrage, COD, CEPA, bill of lading…).
- Mockup: `mockups/seo-glossary.html`.

### Lower priority
- **City / vertical×geo pages** ("courier software Dubai") — contested by Shipsy; do after corridors prove out.
- **Knowledge-base / how-to** (GoFreight has 428) — biggest effort, do steadily as content, not a sprint.

## Penalty guardrails (make scale safe)

- **Cap page count to the data pipeline**, not a number. ~**100–200 templated pages** is the feasible band *when each has genuinely unique variables*. If we can't produce unique data for a lane, don't publish it.
- **Quality gate before publish** (conservative internal gates, not universal law): meaningful unique data, real word count, no near-duplicate lanes. Better 60 great corridor pages than 400 thin ones.
- **Internal linking:** hub → lane → related lanes; corridor pages ↔ matching vertical page (cargo/courier) ↔ relevant glossary terms. Every programmatic page links up to a hub and sideways to siblings.
- **Indexation:** submit via sitemap, monitor GSC index coverage; noindex any lane that ends up thin.

## GEO / AI-search plan (evidenced tactics only)

- **Get listed on the 5 directories that supply 88% of AI-Overview review citations:** Gartner Peer Insights (26%), **G2** (23%), **Capterra** (18%), Software Advice (13%), TrustRadius (8%). Listing is "a gate, not a ranker," and correct category placement matters. Brands cited in AI Overviews earn ~35% more organic clicks.
- **Make content citable:** lead every glossary/comparison/corridor page with a self-contained, quotable answer passage (we already do on the mockups). Intent matters: "review"/"software" queries cite directories ~40–49% of the time; "best/top" lists only ~17%.
- **Entity/brand mentions:** get Voxarel mentioned in third-party logistics roundups and directories (the neutral-authority gap the vendor listicles leave open).

## 90-day → 12-month roadmap

**Days 0–30 (foundation + first wedge):**
- Ship the **corridor template** as a dynamic route + a `lanes.ts` data file. Launch **~15 flagship Gulf→India lanes** (Dubai→Chennai/Cochin/Mumbai/Delhi/Bengaluru first) + India + UAE country hubs.
- Claim **G2, Capterra, Gartner Peer Insights** listings (correct category).
- Stand up an **AI Share-of-Voice panel**: 100–200 buyer-intent prompts, run weekly.

**Days 30–90 (scale the wedge + comparison):**
- Expand corridor pages to **40–60 lanes**; add the **comparison template** with 6–8 "[competitor] alternative" pages.
- Start **glossary** (~20 terms) for internal-linking + AI citability.
- Begin digital PR / directory citations for entity building.

**Months 4–12 (compound):**
- Corridor pages to the full **~80 lanes + hubs**; glossary to **~60 terms**; comparison to full set.
- Layer city/vertical×geo pages once corridors rank.
- Steady knowledge-base articles for topical authority.

## Metrics to track
- **AI Share of Voice** (mention-based, weekly, 100–200 prompt panel) — the primary GEO KPI.
- **GSC:** index coverage % of programmatic pages, impressions/clicks by corridor & comparison query, avg position for lane terms.
- **Directory presence** in AI Overviews for target queries.
- Leading indicator: number of lanes ranking top-10 for "[origin] to [destination] cargo/shipping".

## The one gap this can't fill
Real **search volume + keyword difficulty** for specific lane queries ("Dubai to Chennai cargo") needs a keyword tool. Options: connect **DataForSEO / GSC / Ahrefs** and run the `claude-seo` skills for live numbers, or launch corridors on strategic priority and let GSC reveal which lanes convert.

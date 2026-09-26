# Voxarel backlink strategy

Written 2026-09-26 as part of the SEO audit. Companion to `docs/seo-programmatic-strategy.md` (which covers the pages we build) and `docs/SEO_STATUS.md` (the audit ledger). No metrics in this file are invented: where a number is not yet known it is marked "baseline needed".

## Where we start

- The site is new (v2 launched August 2026) and has no link-building history. Baseline referring domains: baseline needed, read from the Search Console Links report once the property is confirmed (see SEO_STATUS.md).
- What we have to offer a linker: 500 corridor pages with lane-specific data, three long-form guides, a working public tracking tool, and a real production customer (ST Courier) on the Gulf to India corridor.
- What we do not have: a blog cadence, press coverage, directory listings, or a Google Business Profile.
- Positioning to stay consistent with everywhere (site copy, memory rule): lead with bookings, approval flows and operational control. Do not lead with cash on delivery.

## Principles

1. Relevance beats volume. A link from a UAE logistics association or an Indian freight publication is worth more than fifty generic SaaS directories.
2. Earn most links with assets people want to cite (data, tools, guides). Ask for the rest through relationships we already have (customer, partners, ecosystem).
3. Every link should point to the page that deserves it: the homepage for brand mentions, a lane page for corridor mentions, a guide for topic mentions. Do not funnel everything to the homepage.
4. Velocity that looks natural: a handful of new referring domains a month, sustained, is better than a burst.
5. Never pay for links, join link schemes, use private blog networks, or trade reciprocal links at scale. One-off partner reciprocity (customer to vendor) is fine.

## Tier 1: foundation citations (weeks 1 to 4, all free)

These do not move rankings much on their own, but they establish the entity, feed AI answer engines (review sites supply most AI Overview citations for software queries) and are prerequisites for everything below. Use identical name, description, logo, address (Dubai, UAE), email and the WhatsApp number everywhere.

Software directories, in priority order:
- G2 (category: logistics software or supply chain management)
- Capterra and GetApp and Software Advice (one Gartner Digital Markets submission covers all three)
- Gartner Peer Insights
- TrustRadius
- Crunchbase (company profile, founders, funding status, links to site and LinkedIn)
- Product Hunt (a launch post for the tracking page or the corridor directory)
- SaaSHub, AlternativeTo (position as an alternative to CargoWise, Magaya, Shipsy, GoFreight)
- Wellfound (company page; also useful for hiring)

Local and maps:
- Google Business Profile for the Dubai office (category: software company). Link to the homepage, add the WhatsApp number, post monthly.
- Bing Places and Apple Business Connect (import from Google).

Social profiles (already live, make sure each links back):
- LinkedIn company page: website field, "About" text mentioning the corridor.
- Instagram bio link to the homepage; consider a link-in-bio to /shipping.

Deliverable: a citation sheet (name, URL, login owner, status, date) kept alongside the tracking sheet at the end of this doc.

## Tier 2: ecosystem and customer links (weeks 2 to 8)

UAE ecosystem, each of which lists or profiles members and startups:
- Dubai Chamber of Digital Economy (member directory, startup programmes)
- Dubai SME and Dubai CommerCity (logistics and e-commerce free zone directories)
- in5 and Hub71 (if we join a programme, the profile page is a link)
- NAFL, the National Association of Freight and Logistics, UAE (associate membership and member listing)
- Sharjah Media City (Shams), our licensing free zone, sometimes profiles member companies

Customer and partner links:
- ST Courier: a "Powered by Voxarel" line in its website footer and on its tracking page, and a joint case study published on both sites. This is the single most credible link we can get. Draft the case study around bookings, approvals and month-end reconciliation, not cash on delivery.
- Vendors we use and can be a public reference for (Vercel, PostHog, Resend, Neon): each runs customer stories or showcase pages. Only pursue where the story is genuine.
- Any integration or channel partner (WhatsApp Business solution provider, payment gateway, insurance or customs broker) that has a partner directory.

## Tier 3: linkable assets (months 1 to 3, then ongoing)

Build things worth citing, then tell the people who would cite them.

1. Gulf to India transit-time index. We already generate sea and air transit bands, distances and gateway ports for 500 lanes. Publish a single reference page (for example `/shipping/transit-times`) with a sortable table and a downloadable CSV, refreshed quarterly. Pitch to Indian and Gulf trade press and to freight forwarders who write lane guides. Links land on the index and on individual lane pages.
2. India-UAE CEPA customs guide for cargo operators: what a certificate of origin does, which document sets clear fastest, common rejection reasons. CEPA content is thin on the open web and forwarders link to practical guides.
3. Cash on delivery reconciliation checklist (already a guide): turn the steps into a one-page downloadable checklist. Keep it as a supporting asset, not the headline.
4. Free public tools: the tracking page is already public. A small "chargeable weight calculator" (air and sea, per kg and per CBM) is a classic linkable utility for this niche and matches how lane pages already explain pricing.

For each asset: identify 20 to 40 pages that already link to a comparable resource (search the topic, look at who links to the top results), email the author with the specific improvement our version offers, and track replies in the sheet.

## Tier 4: digital PR and expert commentary (ongoing)

- Trade press, Gulf: Logistics Middle East, Supply Chain and Logistics Middle East, Zawya (press releases and company news), Khaleej Times and Gulf News business desks, Entrepreneur Middle East, Arabian Business.
- Trade press, India: Indian Transport and Logistics News (ITLN), Logistics Insider, Cargo Connect, The Hindu BusinessLine logistics coverage.
- Angles that get covered: a data story from the transit-time index (for example how inland Indian destinations add days versus coastal ports), the ST Courier operating story (from WhatsApp groups and spreadsheets to one system), CEPA utilisation among small forwarders.
- Reporter requests: sign up for HARO (Connectively), Qwoted and Featured.com and answer logistics, e-commerce fulfilment and UAE business questions with the founder as the named expert.
- Podcasts: logistics and supply chain shows with Gulf or India audiences (search the category on Apple Podcasts and Spotify; pitch the founder with two specific episode ideas). Show notes usually link.
- Speaking and events: Gulf logistics and e-commerce conferences list speakers with links.

## Tier 5: maintenance tactics

- Unlinked mention reclamation: monthly search for "Voxarel" and "voxarel.com" mentions without a link (Google, LinkedIn posts, news). Ask for the link.
- Entity signals: a Wikidata item for Voxarel (software, operated by Azraq Ventures LLC, Dubai) with official website and LinkedIn. Do not attempt a Wikipedia article; it will not meet notability yet.
- Broken link building in the niche: find dead logistics software or corridor resources that others still link to, offer our page as the replacement.
- Internal linking is the cheapest lever we control. Keep the corridor index, solution page corridor blocks and article cross-links in place as pages are added (see SEO_STATUS.md for the invariants the build checks).

## Anchor text and targets

- Brand links (directories, profiles, press mentions): "Voxarel", "Voxarel logistics platform", the bare URL.
- Corridor links: the lane name as written on the page, "Dubai to Chennai cargo", pointing to that lane page.
- Topic links: the guide or asset title, pointing to that guide.
- Avoid repeating the same exact-match commercial anchor ("logistics software UAE") across many domains.

## What not to do

- No purchased links, sponsored posts without a sponsored or nofollow attribute, or "guest post packages".
- No mass directory submissions beyond the curated list above.
- No link exchanges with unrelated sites, and no scaled reciprocal linking with freight forwarders.
- No press releases stuffed with keyword anchors; use plain brand links.

## 90-day cadence

- Weeks 1 to 2: complete Tier 1 citations, set up Google Business Profile, fix the LinkedIn and Instagram website fields, start the tracking sheet.
- Weeks 2 to 4: ST Courier footer link and case study draft; NAFL and Dubai Chamber applications; Product Hunt launch of the corridor directory.
- Weeks 4 to 8: publish the transit-time index and the CEPA guide; first outreach batch (40 targets); sign up for reporter-request services and answer weekly.
- Weeks 8 to 12: first data-story pitch to trade press; two podcast pitches; first unlinked-mention sweep; review what converted and double down.

## KPIs (monthly)

- Referring domains, total and new (Search Console Links report; optionally Ahrefs or Moz free tiers). Baseline needed.
- Links to lane pages versus homepage (aim for a growing share to deep pages).
- Directory listings live (count of Tier 1 completed).
- Press and podcast placements.
- Organic clicks and impressions for corridor queries (Search Console Performance, filter page contains /shipping/).

## Tracking sheet template

Keep one sheet (Google Sheets is fine) with these columns:

| Date | Target site | Page to link | Type (directory, customer, asset outreach, PR, mention) | Contact | Status (idea, pitched, replied, live, declined) | Live URL | Anchor | Notes |
|---|---|---|---|---|---|---|---|---|

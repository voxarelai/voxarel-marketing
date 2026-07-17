# Voxarel Website

The public marketing site for [voxarel.com](https://voxarel.com) — a standalone Next.js app,
completely separate from the main product monorepo (`Voxarel_AI_Main`).

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS v4 (brand tokens defined in `src/app/globals.css`)
- Poppins 800/700/600 + Lato 400/700, self-hosted in `src/fonts` (no font CDN dependency)

## Run it

```bash
npm install   # or pnpm install
npm run dev   # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

Deploys anywhere Next.js runs (Vercel: zero config).

## Where things live

| What | Where |
| --- | --- |
| Brand tokens (petrol/mint palette) | `src/app/globals.css` (`@theme`) |
| Fonts | `src/app/layout.tsx` (next/font/local) |
| External links (app, sign-in, tracking, demo email) | `src/lib/site.ts` |
| Page sections | `src/components/*.tsx`, composed in `src/app/page.tsx` |
| Logos / ST Courier logo | `public/` |

## Copy rules (from `Voxarel_Brand/Guidelines/brand-foundations.md`)

- Plain words, no jargon. Concrete over abstract.
- Every claim exists today or carries a year — no invented stats.
- The competition is WhatsApp groups and Excel, not other software.
- Hero copy, role value props and tagline are the approved brand-foundations wording.

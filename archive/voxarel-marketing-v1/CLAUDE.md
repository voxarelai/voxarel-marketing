# Voxarel Marketing Site

## Tech Stack
- Next.js 15.1.0 (App Router, Server Components)
- React 19, TypeScript 5.7
- Tailwind CSS 4.0 beta (`@tailwindcss/postcss`)
- Three.js + React Three Fiber (3D visualizations)
- Framer Motion (animations)
- Radix UI (accessible primitives)
- Lucide React (icons)

## Commands
```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # ESLint
```

## Path Alias
`@/*` maps to `./src/*`

## Project Structure
- `src/app/page.tsx` — single-page composition of all sections
- `src/components/index.ts` — barrel file for all components
- `src/components/ui/` — Radix-based UI primitives (button, card, tabs, badge, progress)
- `src/components/RoleShowcase/` — role data + 3D feature visualizations
- `src/components/DashboardFrame.tsx` — reusable app-preview chrome

## Theme
- Background: `#09090b` (dark)
- Accent: `#f97316` (orange)
- Fonts: Inter (body, `--font-inter`), Playfair Display (headings, `--font-playfair`)
- Light sections: Testimonial (`bg-white`), FooterCTA/Footer (`bg-[#fafafa]`)

## CSS Patterns (globals.css)
- `heading-serif` — Playfair Display with tight tracking
- `glass`, `glass-strong`, `glass-card` — glassmorphism effects
- `nav-pill-scrolled` — frosted glass nav on scroll
- `gradient-mesh`, `gradient-orb-*` — animated gradient backgrounds

## Key Conventions
- Client components use `"use client"` directive
- Images: use WebP format, Next.js `<Image>` where possible
- 3D components (ContainerComparison, RoleShowcase) are dynamically imported with `ssr: false`
- Contact form uses Formspree (env: `NEXT_PUBLIC_FORMSPREE_ID`)
- GA4 analytics via env: `NEXT_PUBLIC_GA4_MEASUREMENT_ID`

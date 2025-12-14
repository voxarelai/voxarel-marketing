# Architecture Documentation

## Executive Summary

**voxarel-marketing** is a single-page marketing website for Voxarel, an AI-powered logistics platform serving UAE freight forwarding operations. The site showcases product features, demonstrates the UI, and drives conversions through strategic CTAs.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Next.js 15.1.0                           │
│                       (App Router + RSC)                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Layout    │  │    Page     │  │      Components         │  │
│  │  (Server)   │  │  (Server)   │  │  (Server + Client)      │  │
│  │             │  │             │  │                         │  │
│  │ - Fonts     │  │ - Compose   │  │ - 10 Marketing Sections │  │
│  │ - Metadata  │  │   sections  │  │ - 5 UI Primitives       │  │
│  │ - Theme     │  │             │  │ - Animations            │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                        Tailwind CSS 4.0                         │
│              (Utility Classes + Custom Theme)                   │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Framer Motion  │  │    Radix UI     │  │   Lucide Icons  │  │
│  │  (Animations)   │  │  (Primitives)   │  │    (Iconset)    │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Design Patterns

### Component Architecture

1. **Server Components (Default)**
   - Static marketing sections (Features, Stats, Footer)
   - No client-side JavaScript
   - Optimal performance

2. **Client Components (`"use client"`)**
   - Interactive elements (Navigation, Hero, InteractiveDemo)
   - State management (scroll position, tabs)
   - Animations (Framer Motion)

3. **UI Primitives**
   - Radix UI for accessibility
   - CVA for variant management
   - Composable patterns

### Styling Architecture

```
globals.css
├── @theme                    # CSS custom properties
│   ├── --color-background   # Dark theme base
│   ├── --color-accent       # Orange (#f97316)
│   └── --font-*             # Typography
├── Base styles              # html, body defaults
├── Glass effects            # .glass, .glass-strong, .glass-card
├── Gradient mesh            # .gradient-mesh, .gradient-orb-*
├── Animations               # @keyframes, .animate-*
└── Utility classes          # .heading-serif, .glow
```

### Page Composition

```tsx
// src/app/page.tsx
<main>
  <Navigation />      // Sticky, scroll-aware
  <Hero />           // Full-screen, animated
  <TrustBar />       // Social proof
  <Stats />          // Metrics
  <Features />       // Value propositions
  <InteractiveDemo /> // Product preview
  <Testimonial />    // Customer story
  <FooterCTA />      // Conversion
  <Footer />         // Links
</main>
```

## Data Flow

```
┌──────────────────┐
│   Static Data    │  (Hardcoded in components)
│                  │
│ - Features array │
│ - Stats array    │
│ - Demo data      │
│ - Company list   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Components     │  (Render static + interactive)
│                  │
│ - Server render  │
│ - Client hydrate │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Browser        │  (Interactions)
│                  │
│ - Scroll events  │
│ - Tab selection  │
│ - Hover states   │
│ - Animations     │
└──────────────────┘
```

## Key Architectural Decisions

### 1. Next.js App Router
**Decision**: Use App Router over Pages Router
**Rationale**:
- Server Components for better performance
- Streaming and Suspense support
- Modern React 19 features
- Simplified layouts

### 2. Single-Page Design
**Decision**: Single page with section navigation
**Rationale**:
- Marketing site pattern
- Smooth scroll UX
- Simpler deployment
- Better conversion flow

### 3. Tailwind CSS 4.0 Beta
**Decision**: Use latest Tailwind beta
**Rationale**:
- CSS-first configuration
- Improved performance
- Modern CSS features
- Simplified setup

### 4. Radix UI Primitives
**Decision**: Radix over full component library
**Rationale**:
- Accessibility built-in
- Unstyled (full design control)
- Composable patterns
- Tree-shakeable

### 5. Framer Motion
**Decision**: Framer Motion for animations
**Rationale**:
- Declarative API
- React integration
- Production-ready
- Gesture support

## Performance Considerations

### Image Optimization
- Hero image: Full resolution for visual impact
- Logos: Multiple sizes (PNG, SVG)
- Next.js Image: `unoptimized: true` (manual control)

### Bundle Optimization
- Server Components reduce client JS
- Tree-shaking for unused code
- Code splitting by route (single route)

### Runtime Performance
- CSS animations (GPU-accelerated)
- Intersection Observer (scroll effects)
- Debounced scroll handlers

## Security Considerations

- No user input handling
- No API integrations
- Static content only
- CSP-ready architecture

## Relationship to Voxarel_AI_Main

```
┌─────────────────────────┐     ┌─────────────────────────┐
│   voxarel-marketing     │     │   Voxarel_AI_Main       │
│   (This project)        │     │   (READ-ONLY ref)       │
├─────────────────────────┤     ├─────────────────────────┤
│ - Marketing website     │────▶│ - Full application      │
│ - Product showcase      │ REF │ - Feature source        │
│ - Lead generation       │     │ - UI patterns           │
│                         │     │ - Business logic        │
└─────────────────────────┘     └─────────────────────────┘

Reference patterns:
- Feature descriptions from PRD
- UI patterns from components
- Value propositions from stories
- Technical capabilities from architecture

CRITICAL: Never modify Voxarel_AI_Main
```

## Future Considerations

### Potential Enhancements
- Blog/content section
- Pricing page
- Contact form with API
- Analytics integration
- A/B testing framework

### Scalability Path
- Multi-page expansion
- CMS integration
- Internationalization
- Dynamic content

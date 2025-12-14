# Component Inventory

## Marketing Section Components

| Component | File | Purpose | Key Features |
|-----------|------|---------|--------------|
| **Navigation** | `Navigation.tsx` | Sticky header navigation | Scroll-aware styling, mobile menu, logo swap on light sections |
| **Hero** | `Hero.tsx` | Full-screen hero section | Background image, announcement badge, headline, CTA |
| **TrustBar** | `TrustBar.tsx` | Client/partner logos | Horizontal logo display |
| **Stats** | `Stats.tsx` | Key metrics display | 3-column stats with labels |
| **Features** | `Features.tsx` | Feature cards grid | 4 feature cards with icons |
| **ProductDemo** | `ProductDemo.tsx` | How it works section | 4-step process, video placeholder |
| **InteractiveDemo** | `InteractiveDemo.tsx` | Live UI preview | Tabbed interface (Predictions, Tracking, Dashboard) |
| **ContainerComparison** | `ContainerComparison.tsx` | 3D container optimization demo | Before/After comparison, React Three Fiber 3D rendering |
| **RoleShowcase** | `RoleShowcase.tsx` | Role-based value proposition | Carousel of user roles with benefits |
| **Testimonial** | `Testimonial.tsx` | Customer testimonial | White background section, quote, photo placeholder |
| **FooterCTA** | `FooterCTA.tsx` | Final call-to-action | Gradient background, demo CTA |
| **Footer** | `Footer.tsx` | Site footer | Logo, links, copyright |

## UI Primitive Components

| Component | File | Variants | Props |
|-----------|------|----------|-------|
| **Button** | `ui/button.tsx` | default, destructive, outline, secondary, ghost, link | `variant`, `size`, `asChild` |
| **Card** | `ui/card.tsx` | - | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| **Badge** | `ui/badge.tsx` | default, secondary, destructive, outline, success, warning | `variant` |
| **Progress** | `ui/progress.tsx` | - | `value`, `indicatorClassName` |
| **Tabs** | `ui/tabs.tsx` | - | Tabs, TabsList, TabsTrigger, TabsContent |

## Component Details

### Navigation (`Navigation.tsx`)
- **Client Component** (`"use client"`)
- **State**: `mobileMenuOpen`, `scrolled`, `isOverLight`
- **Effects**: Scroll listener for glass effect and logo color swap
- **Features**:
  - Pill-style nav containers
  - Frosted glass on scroll
  - Dynamic logo (white/black based on section)
  - Mobile hamburger menu

### Hero (`Hero.tsx`)
- **Client Component** (`"use client"`)
- **Animation**: Framer Motion staggered entrance
- **Elements**:
  - Full-bleed background image (`/hero.png`)
  - Gradient overlay
  - Announcement badge (green dot + text)
  - Serif headline
  - Subheadline
  - Primary CTA button

### InteractiveDemo (`InteractiveDemo.tsx`)
- **Client Component** (`"use client"`)
- **State**: `selectedPrediction`, `activeTab`
- **Sub-components**:
  - `PredictionView` - Container fill rate predictions
  - `TrackingView` - Shipment timeline
  - `DashboardView` - Metrics overview
- **Features**:
  - Tabbed interface
  - Mock data for demo
  - Animated transitions
  - Glass card styling
  - Browser chrome frame

### ContainerComparison (`ContainerComparison.tsx`)
- **Client Component** (`"use client"`)
- **State**: `activeTab`, `showTooltip`
- **Sub-components**:
  - `Box3D` - Individual 3D box mesh
  - `ContainerFrame` - Wireframe container outline
  - `ContainerWithBoxes` - Rotating 3D container with boxes
  - `Scene` - Three.js scene with lighting
  - `ComparisonContent` - Tab content renderer
  - `StatsSidebar` - Optimization statistics panel
  - `TooltipBubble` - Floating info tooltip
- **Features**:
  - React Three Fiber for 3D rendering
  - Before/After/Compare tabs
  - Slow Y-axis rotation animation
  - Desktop mockup with app window chrome
  - Stats sidebar showing optimization metrics
  - 186 boxes (human packing) vs 250 boxes (AI optimized)
- **Dependencies**: `three`, `@react-three/fiber`, `framer-motion`

### RoleShowcase (`RoleShowcase.tsx`)
- **Client Component** (`"use client"`)
- **Purpose**: Displays value propositions for different user roles
- **Features**:
  - Carousel-style role selector
  - Role-specific benefits and features
  - Animated transitions between roles

### Features (`Features.tsx`)
- **Server Component**
- **Data**: Array of 4 features with icon, title, description
- **Icons**: Box, Truck, MessageSquare, BarChart3 (Lucide)
- **Layout**: Responsive grid (1→2→4 columns)

### Stats (`Stats.tsx`)
- **Server Component**
- **Data**: 3 stats with value, label, description
- **Layout**: 3-column grid with left borders

### Testimonial (`Testimonial.tsx`)
- **Server Component**
- **Unique**: White background (contrast section)
- **Placeholders**: Photo, company logo, quote text

## Utility Functions

### `cn()` (`lib/utils.ts`)
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
Merges Tailwind classes intelligently, avoiding conflicts.

## Component Patterns

### Section Structure
```tsx
<section className="py-24 bg-[#09090b]">
  <div className="max-w-7xl mx-auto px-6">
    {/* Section header */}
    <div className="mb-16">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 bg-orange-500 rounded-full" />
        <span className="text-sm text-zinc-400 uppercase tracking-wider">
          Section Label
        </span>
      </div>
      <h2 className="heading-serif text-4xl md:text-6xl text-white">
        Headline
      </h2>
    </div>
    {/* Section content */}
  </div>
</section>
```

### Framer Motion Entrance
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
>
```

### Glass Card
```tsx
<div className="glass-card rounded-xl p-4 hover:bg-white/[0.04] transition-all">
```

## Dependencies

| Package | Version | Used By |
|---------|---------|---------|
| `framer-motion` | 11.15.0 | Hero, InteractiveDemo, Navigation, ContainerComparison |
| `lucide-react` | 0.468.0 | Features, InteractiveDemo, Navigation, ContainerComparison |
| `three` | ^0.170.0 | ContainerComparison |
| `@react-three/fiber` | ^8.17.0 | ContainerComparison |
| `@react-three/drei` | ^9.117.0 | ContainerComparison |
| `@radix-ui/react-tabs` | 1.1.2 | InteractiveDemo, ui/tabs |
| `@radix-ui/react-progress` | 1.1.1 | InteractiveDemo, ui/progress |
| `@radix-ui/react-slot` | 1.1.1 | ui/button |
| `class-variance-authority` | 0.7.1 | ui/button, ui/badge |
| `clsx` | 2.1.1 | lib/utils |
| `tailwind-merge` | 2.6.0 | lib/utils |

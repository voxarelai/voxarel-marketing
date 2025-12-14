# Development Guide

## Prerequisites

- **Node.js** 18+ (20.x recommended)
- **Yarn** package manager
- **Git** for version control

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd voxarel-marketing

# Install dependencies
yarn install

# Start development server
yarn dev
```

## Development Commands

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server (http://localhost:3000) |
| `yarn build` | Build production bundle |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |

## Project Structure

```
src/
├── app/           # Next.js App Router (pages, layouts)
├── components/    # React components
│   └── ui/        # Reusable UI primitives
└── lib/           # Utilities
```

## Adding New Sections

1. Create component in `src/components/`:
```tsx
// src/components/NewSection.tsx
export function NewSection() {
  return (
    <section className="py-24 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Content */}
      </div>
    </section>
  );
}
```

2. Export from barrel file:
```tsx
// src/components/index.ts
export { NewSection } from "./NewSection";
```

3. Add to page:
```tsx
// src/app/page.tsx
import { NewSection } from "@/components";

export default function Home() {
  return (
    <main>
      {/* ... other sections */}
      <NewSection />
    </main>
  );
}
```

## Styling Guide

### Theme Variables (globals.css)

```css
@theme {
  --color-background: #09090b;
  --color-foreground: #fafafa;
  --color-muted: #71717a;
  --color-accent: #f97316;      /* Orange */
  --color-card: #18181b;
  --color-border: #27272a;
}
```

### Common Patterns

```tsx
// Section container
<section className="py-24 bg-[#09090b]">
  <div className="max-w-7xl mx-auto px-6">

// Serif heading
<h2 className="heading-serif text-4xl md:text-6xl text-white">

// Section label
<div className="flex items-center gap-2 mb-4">
  <span className="w-2 h-2 bg-orange-500 rounded-full" />
  <span className="text-sm text-zinc-400 uppercase tracking-wider">
    Label Text
  </span>
</div>

// Glass card
<div className="glass-card rounded-xl p-4">

// Primary CTA button
<a className="inline-flex items-center px-6 py-2.5 bg-white text-zinc-900 rounded-full font-medium text-sm hover:bg-zinc-100 transition-colors">
```

### Glassmorphism Classes

| Class | Effect |
|-------|--------|
| `.glass` | Standard glass effect |
| `.glass-strong` | Stronger blur + shadow |
| `.glass-card` | Card-specific glass |
| `.gradient-mesh` | Background gradient mesh |

### Animation Classes

| Class | Effect |
|-------|--------|
| `.animate-fade-in-up` | Fade in from below |
| `.animate-pulse-glow` | Pulsing glow effect |
| `.stagger-children` | Staggered child animations |

## UI Components

### Button
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Badge
```tsx
import { Badge } from "@/components/ui/badge";

<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
```

### Tabs
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## Framer Motion Animations

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>
```

## Environment Variables

No environment variables required for basic development.

For production, configure in Vercel Dashboard.

## Deployment

The site is designed for Vercel deployment:

```bash
# Build and preview locally
yarn build
yarn start

# Deploy to Vercel
vercel
```

---

## Reference: Voxarel_AI_Main (READ-ONLY)

When referencing the main application for patterns or content:

```bash
# Allowed: Reading files for reference
cat /Users/zahid/Voxarel_AI_Main/src/components/...

# NOT allowed: Any modifications
# NEVER edit, write, or delete files in Voxarel_AI_Main
```

Key reference locations:
- **Components**: `/Voxarel_AI_Main/src/components/`
- **UI Patterns**: `/Voxarel_AI_Main/docs/ux/`
- **Features**: `/Voxarel_AI_Main/docs/prd/`
- **Stories**: `/Voxarel_AI_Main/docs/stories/`

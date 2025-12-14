# Technology Stack

## voxarel-marketing (Primary Project)

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 15.1.0 | React framework with App Router |
| **Language** | TypeScript | 5.7.2 | Type-safe JavaScript |
| **UI Library** | React | 19.0.0 | Component-based UI |
| **Styling** | Tailwind CSS | 4.0.0-beta.8 | Utility-first CSS framework |
| **Animation** | Framer Motion | 11.15.0 | Production-ready animations |
| **3D Graphics** | Three.js | ^0.170.0 | 3D rendering engine |
| **3D React** | React Three Fiber | ^8.17.0 | React renderer for Three.js |
| **3D Helpers** | @react-three/drei | ^9.117.0 | Useful helpers for R3F |
| **Icons** | Lucide React | 0.468.0 | Icon library |
| **UI Primitives** | Radix UI | Various | Accessible component primitives |
| **Utilities** | clsx, tailwind-merge | 2.1.1, 2.6.0 | Class name utilities |
| **Variants** | class-variance-authority | 0.7.1 | Component variant management |
| **Linting** | ESLint | 9.16.0 | Code quality |
| **Package Manager** | Yarn | - | Dependency management |

### Radix UI Components Used
- `@radix-ui/react-tabs` (1.1.2) - Tab navigation
- `@radix-ui/react-progress` (1.1.1) - Progress indicators
- `@radix-ui/react-slot` (1.1.1) - Component composition

### Architecture Pattern
- **Component-based frontend** with Next.js App Router
- **Single-page marketing site** with section-based navigation
- **Dark theme** with glassmorphism effects
- **Responsive design** with mobile-first approach

---

## Voxarel_AI_Main (READ-ONLY Reference)

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 15.5.7 | Full-stack React framework |
| **Language** | TypeScript | 5.x | Type-safe JavaScript |
| **UI Library** | React | 19.1.2 | Component-based UI |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS |
| **State Management** | Zustand | 5.0.8 | Global state management |
| **Database** | PostgreSQL (Neon) | - | Serverless PostgreSQL |
| **ORM** | Drizzle ORM | 0.44.5 | Type-safe database access |
| **Authentication** | Clerk | 6.33.1 | User auth & management |
| **Real-time** | Ably | 2.14.0 | WebSocket messaging |
| **Email** | Resend | 3.5.0 | Transactional email |
| **Forms** | React Hook Form + Zod | 7.63.0, 4.1.11 | Form handling & validation |
| **Charts** | Recharts | 3.2.1 | Data visualization |
| **3D Graphics** | Three.js + React Three Fiber | 0.180.0, 9.4.0 | Container visualization |
| **PDF Generation** | React PDF, jsPDF | 4.3.1, 3.0.3 | Document generation |
| **Barcode/QR** | bwip-js, qrcode | 4.7.0, 1.5.4 | Label generation |
| **Rate Limiting** | Upstash | 2.0.6 | Redis-based rate limiting |
| **File Storage** | Vercel Blob | 2.0.0 | File uploads |
| **Deployment** | Vercel | - | Hosting & CI/CD |

### Architecture Pattern
- **Full-stack monolith** with API routes
- **Multi-tenant SaaS** with role-based access
- **Event-driven** real-time updates
- **Serverless** database and infrastructure

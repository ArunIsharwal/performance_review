# ReviewForge — Technical Architecture & Future Database Migration

## 1. Architectural Principles
ReviewForge is built with a clear separation of concerns, designed from the ground up to support immediate client-side demo persistence while enabling zero-friction transition to an enterprise database (such as MongoDB Atlas or PostgreSQL) in future development phases.

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  Next.js App Router (16.4.5), React 19, Tailwind CSS v4    │
│  Editorial Enterprise Identity (#17251F, #F7F7F2, #C8ED78)  │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    State & Context Layer                    │
│   StoreProvider & useStore (safe hydration, toast queue,    │
│   cross-tab storage event synchronization, demo role state) │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│             Repository & Intelligence Service Layer         │
│  DataRepository (abstract CRUD methods matching MongoDB APIs)│
│  LocalReviewSynthesizer (deterministic empirical engine)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                    Persistence Layer                        │
│  Current: LocalStorage (Browser Cache with Initial Seed)    │
│  Future Phase: MongoDB Atlas / Mongoose / PostgreSQL        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Directory Structure
```
360_synth/
├── docs/                      # Architectural and operational documentation
│   ├── ARCHITECTURE.md
│   ├── FEATURES.md
│   ├── IMPLEMENTATION_STATUS.md
│   ├── MOCK_DATA.md
│   ├── PROJECT_OVERVIEW.md
│   └── ROUTES.md
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (workspace)/       # Private workspace route group with AppShell layout
│   │   │   ├── ai-review-studio/
│   │   │   ├── analytics/
│   │   │   ├── approvals/
│   │   │   ├── dashboard/
│   │   │   ├── departments/
│   │   │   ├── employees/
│   │   │   │   └── [id]/
│   │   │   ├── feedback/
│   │   │   ├── manager-notes/
│   │   │   ├── okrs/
│   │   │   ├── review-cycles/
│   │   │   ├── reviews/
│   │   │   │   └── [id]/
│   │   │   ├── self-reflections/
│   │   │   ├── settings/
│   │   │   └── layout.tsx
│   │   ├── globals.css        # Centralized theme tokens and print styles
│   │   ├── layout.tsx         # Global HTML layout with StoreProvider
│   │   └── page.tsx           # Public marketing website
│   ├── components/
│   │   ├── layout/            # AppShell, Sidebar, Topbar, RoleSwitcher, SearchModal, NotificationDrawer
│   │   ├── marketing/         # Landing page sections (Hero, Problem, Solution, Pricing, etc.)
│   │   └── ui/                # Badge, Button, Card, Modal, ProgressBar, SearchInput, StatCard, Tabs, Toast
│   ├── lib/
│   │   ├── ai-synthesizer/    # LocalReviewSynthesizer engine
│   │   ├── mock-data/         # Initial seeded enterprise datasets
│   │   └── storage/           # DataRepository & useStore React hook
│   └── types/                 # Shared TypeScript models and interfaces
└── package.json
```

---

## 3. How to Connect MongoDB in a Future Phase
The frontend communicates exclusively through `DataRepository` static methods (`DataRepository.getEmployees()`, `DataRepository.savePerformanceReview()`, etc.).

To connect MongoDB in a future phase without touching the frontend components:
1. **Create Mongoose Models** in `src/models/` matching the TypeScript interfaces in `src/types/index.ts` (e.g. `EmployeeModel`, `ReviewModel`, `OKRModel`).
2. **Implement API Route Handlers** in `src/app/api/`:
   - `GET /api/employees` -> `await EmployeeModel.find({})`
   - `POST /api/reviews` -> `await ReviewModel.create(body)`
3. **Swap `DataRepository` Implementation:**
   Replace the internal `safeGet` and `safeSet` localStorage calls in `src/lib/storage/repository.ts` with standard `fetch('/api/...')` asynchronous requests.
4. The React context (`useStore`) and all feature UI components will continue to function identically with zero code changes.


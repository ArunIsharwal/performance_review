# ReviewForge — Premium AI-Powered 360° Performance Review Synthesizer

> **Turn scattered employee performance data into clear, evidence-backed annual performance reviews.**

ReviewForge is an enterprise performance review synthesizer built with **Next.js App Router**, **React 19**, **TypeScript**, and **Tailwind CSS**. It brings together quarterly OKRs, multi-rater 360° peer feedback, employee self-reflections, and manager observations to generate structured, fair, and evidence-backed performance reviews.

---

## 🚀 Key Highlights & Capabilities

- **Editorial Enterprise Intelligence:** A distinctive visual identity combining deep forest (`#17251F`), warm ivory (`#F7F7F2`), crisp white surfaces, electric lime accents (`#C8ED78`), and muted blue highlights (`#5876D8`).
- **AI Review Studio (Flagship 3-Panel Workspace):**
  - **Left Panel:** Target employee selector, timeline, and input counts (OKRs, peer reviews, manager notes, self-reflections).
  - **Center Panel:** 8 structured review sections with inline editing, section-level regeneration, and clickable evidence citation pills.
  - **Right Panel:** Live **Evidence Inspector** showing verbatim excerpts and metrics, alongside a **Quality & Governance Auditor** (calculates coverage scores, detects conflicting feedback, and flags missing data gaps).
- **100% Traceable Citations:** Statements link directly to verified empirical records (e.g. *Q2 OKR: 31.5% API latency reduction*).
- **Human-in-the-Loop Governance:** AI drafts require deliberate manager approval; reviews are never released automatically.
- **Privacy & Anonymity Controls:** Strict role filtering protects anonymous peer reviewers and hides private manager notes from employee-facing views.
- **Print & PDF Export:** Print-optimized report layout (`@media print`) on `/reviews/[id]` ready for browser PDF export.
- **Role Perspective Switcher:** Instantly simulate the platform as an **HR Administrator**, **Manager**, **Employee**, or **Peer Reviewer**.
- **Zero Database & Zero External API Dependencies:** Uses a fully typed local empirical repository with browser `localStorage` persistence and one-click demo data reset.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS v4 & Centralized Theme Variables
- **Icons:** Lucide React
- **Architecture:** Clean Repository Pattern (`DataRepository`) ready for drop-in MongoDB / PostgreSQL replacement

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Public Landing Page:** `http://localhost:3000`
- **Application Dashboard:** `http://localhost:3000/dashboard`
- **AI Review Studio:** `http://localhost:3000/ai-review-studio`

### 3. Run Production Build & Linting
```bash
# Type check and build
npm run build

# Run ESLint
npm run lint
```

---

## 🗺️ Application Routes

### Public Website
- `/` — Marketing landing page with product preview, problem statement, solution overview, feature grid, 5-step process, proposed $25 pricing hypothesis, FAQ, and footer.

### Private Workspace Shell
- `/dashboard` — HR executive dashboard with cycle progress, completion metrics, action queue, and deadlines.
- `/employees` — Employee directory with multi-filter search, sorting, pagination, and Add/Edit modals.
- `/employees/[id]` — Detailed profile with tabbed deep-dive (Summary, OKRs, Feedback, Reflections, Private Notes, History).
- `/departments` — Squad overview for Engineering, Product & Design, and Sales & Growth.
- `/review-cycles` — Evaluation cycle management with step-based creation modal.
- `/feedback` — 360-degree peer feedback center with 5-dimension rubric and strict anonymity protection.
- `/okrs` — Quarterly OKR tracking across Q1–Q4 with interactive progress updates.
- `/self-reflections` — Employee self-assessment workflow.
- `/manager-notes` — Private manager observation and coaching journal (role-restricted).
- `/ai-review-studio` — Flagship 3-panel document intelligence workspace with local synthesis engine.
- `/reviews` — Organization reviews index with cycle and approval status filtering.
- `/reviews/[id]` — Formal review report with signature blocks and print/PDF export.
- `/approvals` — Manager approval queue with deliberate sign-off and revision workflows.
- `/analytics` — Aggregated HR intelligence charts, department completion, and competency distributions.
- `/settings` — Organization profile, governance policies, notifications, demo role switcher, and factory reset.

---

## 📚 Project Documentation

Detailed architecture, entity models, and migration guides are documented in the `docs/` directory:
- [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md) — Executive summary, product vision, and core value proposition.
- [docs/FEATURES.md](docs/FEATURES.md) — Comprehensive feature catalog and capabilities breakdown.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Component architecture, state management, and future MongoDB integration guide.
- [docs/ROUTES.md](docs/ROUTES.md) — Complete routing map and role access specifications.
- [docs/MOCK_DATA.md](docs/MOCK_DATA.md) — Seeded datasets, entity relationships, and evidence-linking structures.
- [docs/IMPLEMENTATION_STATUS.md](docs/IMPLEMENTATION_STATUS.md) — Progress tracker for the 55–60% roadmap milestone.

---

## 🔒 Responsible AI & Governance

ReviewForge adheres to ethical AI principles:
- **No Automated Employment Actions:** AI assistance is strictly confined to drafting and data aggregation. Human managers retain full authority and legal accountability.
- **Traceable Attribution:** No performance claims are made without direct link to empirical evidence.
- **Confidentiality by Design:** Private notes and anonymous submissions are protected at the data repository boundary.

---

## 📄 License
Commercial demonstration prototype. Fictional enterprise simulation. All rights reserved.

# ReviewForge — Route Directory & Navigation Map

## 1. Public Routes
| Route | Component File | Description |
| :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Public marketing landing page introducing ReviewForge, problem statement, solution architecture, feature grid, 5-step process, proposed $25/employee pricing hypothesis, FAQ, and footer. |

---

## 2. Private Workspace Application Routes
All workspace routes share the enterprise `AppShell` defined in `src/app/(workspace)/layout.tsx`, including persistent collapsible sidebar navigation, top bar with breadcrumbs and workspace switcher, command palette (`⌘K`), notification drawer, and demo role perspective switcher.

| Route | Component File | Description | Access in Demo |
| :--- | :--- | :--- | :--- |
| `/dashboard` | `src/app/(workspace)/dashboard/page.tsx` | Main HR & management intelligence overview with metric cards, review cycle completion, department breakdown, manager action queue, and deadlines. | All Roles |
| `/employees` | `src/app/(workspace)/employees/page.tsx` | Searchable, filterable, and sortable directory of organization members with Add and Edit Employee modals. | All Roles |
| `/employees/[id]` | `src/app/(workspace)/employees/[id]/page.tsx` | Deep profile view with tabs for Summary, OKRs, 360 Feedback, Self-Reflection, Private Manager Notes (role-protected), and Review History. | All Roles (Notes restricted) |
| `/departments` | `src/app/(workspace)/departments/page.tsx` | Department overview showing Engineering, Product & Design, and Sales & Growth leads, team size, and OKR completion. | All Roles |
| `/review-cycles` | `src/app/(workspace)/review-cycles/page.tsx` | Lifecycle management for Annual, Mid-Year, and Quarterly evaluation cycles with a 3-step creation modal. | HR Admin & Manager |
| `/feedback` | `src/app/(workspace)/feedback/page.tsx` | 360-degree peer feedback center with submission inbox, pending requests, multi-dimension rating rubrics, and strict anonymity protection. | All Roles |
| `/okrs` | `src/app/(workspace)/okrs/page.tsx` | Quarterly objective and key result management across Q1–Q4 with progress updating and Add Objective modal. | All Roles |
| `/self-reflections` | `src/app/(workspace)/self-reflections/page.tsx` | Employee self-assessment workflow capturing major achievements, projects delivered, obstacles, skills, and future goals. | Employee, Manager, HR Admin |
| `/manager-notes` | `src/app/(workspace)/manager-notes/page.tsx` | Private manager observation and coaching journal with category tags. Strictly restricted from employee role views. | Manager & HR Admin Only |
| `/ai-review-studio` | `src/app/(workspace)/ai-review-studio/page.tsx` | Flagship 3-panel document workspace for synthesizing, editing, regenerating, and verifying evidence-linked annual reviews. | Manager & HR Admin |
| `/reviews` | `src/app/(workspace)/reviews/page.tsx` | Organization reviews index with status filtering (Draft, Pending Approval, Approved, Released) and search. | All Roles (Status filtered) |
| `/reviews/[id]` | `src/app/(workspace)/reviews/[id]/page.tsx` | Complete 8-section performance document with citation metadata, manager comments, signature block, and print-ready PDF export. | All Roles |
| `/approvals` | `src/app/(workspace)/approvals/page.tsx` | Manager sign-off queue with deliberate "Approve" and "Request Changes" revision workflows. | Manager & HR Admin |
| `/analytics` | `src/app/(workspace)/analytics/page.tsx` | Aggregated HR intelligence charts showing department completion, competency rubrics, and recurring performance themes. | HR Admin & Manager |
| `/settings` | `src/app/(workspace)/settings/page.tsx` | Organization profile, review governance, anonymity policies, notifications, demo role switcher, security audit trail, and factory reset. | All Roles |


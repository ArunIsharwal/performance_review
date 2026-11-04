# ReviewForge — Feature Catalog & Capabilities

## Overview of Implemented Modules (55–60% Milestone)

| Module | Route | Key Capabilities |
| :--- | :--- | :--- |
| **Public Landing Page** | `/` | Hero with interactive review preview, 5 problem cards, solution architecture, feature showcase, 5-step workflow, security & trust, $25 pricing hypothesis, FAQ accordion, sitemap footer. |
| **Dashboard** | `/dashboard` | 5 metric cards with trends, review completion progress bar, department performance table, manager action queue, upcoming deadlines, attention required cards, real-time audit trail. |
| **Employee Directory** | `/employees` | Search by name/email/ID, department filter, review status filter, sorting by name/join date/status, pagination, Add Employee modal, Edit Employee modal, direct profile links. |
| **Employee Profile** | `/employees/[id]` | Comprehensive profile banner, 6-tab deep dive (Performance Summary, Quarterly OKRs, 360 Feedback, Self-Reflection, Private Manager Notes [role-restricted], Review History), milestone timeline. |
| **Department Hub** | `/departments` | Department cards (Engineering, Product & Design, Sales & Growth), team leads, member counts, average OKR progress bars, direct department directory filter links. |
| **Review Cycles** | `/review-cycles` | Cycle status badges (Active, Completed, Draft), schedule dates, participant counts, completion progress bars, step-based 3-step modal to create new cycles. |
| **360° Peer Feedback** | `/feedback` | Multi-tab inbox (All, Submitted, Requests), 5-dimension rubric (Collaboration, Communication, Problem Solving, Technical, Leadership 1-5), qualitative feedback, strict anonymity toggle. |
| **Quarterly OKR Management**| `/okrs` | Quarterly pill selector (Q1, Q2, Q3, Q4, All), department & employee filters, Key Result progress tracking, interactive "Update Progress" prompt modal, Add Objective modal. |
| **Self-Reflections** | `/self-reflections`| Employee self-evaluation workflow, employee selector, major achievements, key projects, obstacles overcome, skills acquired, cross-team collaboration, development areas, future goals. |
| **Manager Notes** | `/manager-notes` | Private manager observation journal, category tags (Achievement, Problem Solving, Leadership, Delivery, Improvement), project/evidence links, strict access control (managers & HR only). |
| **AI Review Studio** | `/ai-review-studio` | Flagship 3-panel document workspace: Left (employee picker, evidence summary, raw input timeline), Center (8-section generated review editor with inline editing, section regeneration, evidence citation pills), Right (evidence inspector & quality/governance auditor). |
| **Review Management** | `/reviews` | Filter by cycle and approval status, search, summary metrics, direct links to Review Studio and formal review viewer. |
| **Review Document & PDF** | `/reviews/[id]` | Formal review viewer, 8 verified sections, citation metadata, manager comments textarea, formal signature block, print-ready CSS (`@media print`) for clean PDF export. |
| **Approval Workflow** | `/approvals` | Manager & HR queue, evidence coverage badges, executive summary preview, deliberate "Approve Review" action, "Request Changes" modal with revision commentary. |
| **Analytics & Reports** | `/analytics` | Cycle progress stats, department completion bars, 5-competency radar score bars, top synthesized organizational strengths, priority organizational coaching themes. |
| **Settings & Governance** | `/settings` | 5 tabs: Org Profile, Review & Feedback Governance (anonymity policy, dual sign-off), Notifications preferences, Demo Role switcher, Immutable security audit trail, Factory reset button. |

---

## Flagship Feature: Evidence-Linked Review Synthesis

In the **AI Review Studio** (`/ai-review-studio`):
1. **Deterministic Mock AI Engine:** Analyzes real seeded records for the selected employee (OKRs, peer feedback, self-reflections, manager notes).
2. **Clickable Evidence Citations:** Generated sentences feature interactive pills (e.g., `[Q2 OKR: 31.5% Latency Gain]`). Clicking any pill opens the **Evidence Inspector** in the right panel, displaying the source entity ID, date, verbatim excerpt, and metric backing.
3. **Quality & Compliance Auditor:** Automatically evaluates the evidence density, calculating an **Evidence Coverage Score** (e.g. 94%), checks for 0 unsupported claims, analyzes peer feedback variance to flag conflicting feedback, and warns if inputs are missing.
4. **Section Regeneration:** Managers can regenerate individual sections (e.g., *Areas for Development*) without overwriting their manual edits to other sections.


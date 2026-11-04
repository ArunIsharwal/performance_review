# ReviewForge — Project Overview

## 1. Executive Summary
**ReviewForge** is an AI-powered 360-degree performance review platform designed to turn scattered employee performance data into clear, evidence-backed annual performance reviews.

Traditional annual performance evaluations suffer from recency bias, data fragmentation across disparate tools (Jira, Slack, Notion, spreadsheets), and hours of manual writing by managers. ReviewForge establishes a single source of truth across:
- **Quarterly OKRs** (Q1–Q4 quantitative milestones)
- **360° Peer Feedback** (multi-rater 5-dimension rubric with strict anonymity protection)
- **Employee Self-Reflections** (personal project milestones, obstacles, and career aspirations)
- **Manager Private Observations** (incident triage notes and coaching journals strictly hidden from employees)
- **Manager Approval Workflows** (deliberate sign-off preventing automated release)

The product implements **Editorial Enterprise Intelligence**—a distinctive visual and cognitive design system pairing the clarity of prestigious editorial typography with high-density enterprise data usability.

---

## 2. Product Value Proposition
> *"Turn scattered employee performance data into clear, evidence-backed performance reviews."*

- **100% Traceable Evidence:** Every generated statement in the AI Review Studio is tied to an underlying `EvidenceReference` linking source type, ID, date, verbatim excerpt, and verified metrics.
- **Human-in-the-Loop Governance:** AI drafts never automatically reach employees. Evaluating managers review, calibrate, edit inline, regenerate individual sections on demand, and formally submit reviews to the approval queue.
- **Zero Hallucination Guarantee:** The local deterministic synthesis engine only synthesizes verified records present in the empirical mock repository. If records are missing (e.g. absent self-reflections), it explicitly flags data gaps instead of fabricating claims.
- **Strict Privacy Isolation:** Anonymity settings mask peer reviewer identities in employee views, and manager private notes are partitioned strictly away from direct reports.

---

## 3. Product Scope & Milestone
This release completes approximately **55–60% of the planned commercial product roadmap**, delivering an enterprise-ready, fully functional frontend simulation with:
- Public marketing landing page (`/`)
- Enterprise workspace app shell with collapsible navigation, command palette (`⌘K`), notifications drawer, and demo role switcher
- 12 comprehensive product modules (Dashboard, Directory, Profiles, Departments, Review Cycles, 360 Feedback, OKRs, Self-Reflections, Manager Notes, AI Review Studio, Reviews, Approvals, Analytics, Settings)
- Local deterministic mock AI synthesis engine (`Demo synthesis — local mock engine`)
- Browser localStorage state persistence with reset capability and zero external database or OpenAI API requirements.


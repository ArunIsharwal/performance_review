# ReviewForge — Mock Data Architecture & Entity Models

## 1. Data Design Strategy
ReviewForge uses a realistic, fully typed empirical mock dataset located in `src/lib/mock-data/`. No external database connection or API key is required.

The dataset includes:
- **12 Diverse Fictional Employees** spanning 3 departments (Engineering & Infrastructure, Product & Design, Sales & Growth).
- **Quarterly OKRs** tracking detailed quantitative Key Results across Q1, Q2, Q3, and Q4 of FY2026.
- **360° Peer Feedback Records** with 5-dimension ratings (Collaboration, Communication, Problem Solving, Technical Impact, Leadership 1-5), qualitative strengths, improvements, and anonymity flags.
- **Self-Reflections** detailing employee achievements, challenges faced, skills developed, and aspirations.
- **Confidential Manager Notes** categorized by Achievement, Problem Solving, Leadership, Delivery, Improvement.
- **Pre-Synthesized Performance Reviews** complete with clickable evidence citations.
- **Immutable Security Audit Trail** capturing system actions.
- **Organization Settings** defining corporate tenant policies.

---

## 2. Key Seed Records & Evidence Linking
A core differentiator in ReviewForge is that the AI review synthesizer draws strictly upon real seeded records rather than generating generic filler.

### Key Example: Rahul Deshmukh (`emp-002`)
- **Job Title:** Staff Backend Architect, Engineering & Infrastructure
- **Evaluated Period:** FY2026 Annual Review Cycle
- **Empirical Evidence Records:**
  - `okr-002` (Q2 2026): Key Result 3 — *Reduce core GraphQL and REST API response times by 30%* (Target: 30%, Actual: 31.5% achieved, 105% of goal).
  - `okr-001` (Q1 2026): Key Result 1 — *Migrate legacy synchronous queue to distributed Kafka cluster* (100% completed, drop rate reduced to 0.0008%).
  - `note-001` (June 2026): Manager observation by Dr. Aris Thorne — *Incident Handling during AWS AZ degradation* (Resolved pool leak in 8 mins).
  - `note-002` (June 2026): Manager observation — *Pivotal Q2 Latency Breakthrough* ($4,200/month infrastructure cost savings).
  - `fb-001` (October 2026): Peer feedback from Elena Rostova — *Rated 5/5 in Collaboration & Problem Solving*.
  - `ref-001` (October 2026): Self-reflection — *Documented desire to author formal Architecture Decision Records (ADRs)*.

When synthesizing Rahul's review in the **AI Review Studio**, these exact records are cited with dates, excerpts, and metric badges.

---

## 3. Client-Side Persistence & Reset
- Data is safely stored in browser `localStorage` using keys prefixed with `reviewforge_*`.
- State updates dispatch custom window events (`reviewforge_storage_updated`), ensuring synchronized reactive updates across all components and open tabs.
- The **"Reset Demo"** button (available in the top bar and in `/settings`) restores all collections back to the original factory seed at any time.
- Safe client-side hydration guards in `useStore` eliminate any React hydration mismatches.


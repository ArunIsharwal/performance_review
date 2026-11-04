import { SelfReflection } from '@/types';

export const INITIAL_SELF_REFLECTIONS: SelfReflection[] = [
  {
    id: 'ref-001',
    employeeId: 'emp-002', // Rahul Deshmukh
    reviewCycleId: 'cycle-2026-annual',
    period: 'FY2026',
    majorAchievements:
      'Spearheaded our core event broker migration to Apache Kafka with zero customer data loss. Directly drove our Q2 API optimization initiative, successfully reducing average API latency by 31.5% across all REST and GraphQL endpoints.',
    keyProjects:
      '1. Cloud Event Bus Modernization (Kafka & Schema Registry)\n2. Edge API Gateway Latency Overhaul\n3. Distributed Transaction Sagas for Multi-tenant Review Pipelines',
    challengesFaced:
      'Encountering unexpected network serialization bottlenecks under heavy multi-region replication in Q3. Required deep kernel socket tuning and refactoring our connection pooling logic.',
    skillsDeveloped: [
      'Apache Kafka Administration',
      'Rust Microservices',
      'Linux eBPF Network Tracing',
      'Distributed Caching Topologies'
    ],
    collaborationHighlights:
      'Partnered closely with Elena and Julian on the Review Studio streaming endpoint requirements. Mentored 2 junior engineers (Liam Chen and Priya Patel), conducting weekly 1-on-1 pairing sessions and over 60 architectural code reviews.',
    goalsAchieved:
      'Surpassed Q2 latency target (achieved 31.5% vs 30% goal), zero Sev-0 outages related to data persistence, and established automated vulnerability gates.',
    growthAreas:
      'I want to improve my external technical communication, specifically authoring structured Architecture Decision Records (ADRs) prior to sprint kickoff rather than relying on inline discussions.',
    futureGoals:
      'Lead our multi-region data residency architecture for European GDPR compliance in H1 2027 and present our review synthesis pipeline at an enterprise cloud conference.',
    submittedAt: '2026-10-15'
  },
  {
    id: 'ref-002',
    employeeId: 'emp-003', // Elena Rostova
    reviewCycleId: 'cycle-2026-annual',
    period: 'FY2026',
    majorAchievements:
      'Achieved 100% WCAG 2.1 AAA accessibility audit across our core component library. Reduced front-end bundle size by 28% through modern code-splitting and dynamic island hydration.',
    keyProjects:
      '1. ReviewForge Editorial Design System v2.0\n2. Real-Time Evidence Citation Inspector UI\n3. High-Contrast Accessible Data Visualization Suite',
    challengesFaced:
      'Balancing high-density data tables with strict accessibility contrast ratios and fluid responsive mobile views.',
    skillsDeveloped: [
      'Tailwind CSS v4 Engine',
      'WAI-ARIA Pattern Compliance',
      'Next.js Turbopack Optimization',
      'SVG Data Visualization Canvas'
    ],
    collaborationHighlights:
      'Weekly cross-functional syncs with Julian Mercer in Design and Sofia Al-Mansoor in Product to validate component micro-interactions with real customers.',
    goalsAchieved:
      'Completed all 45 component refactors, achieved sub-second Time to Interactive (TTI), and zero regression tickets during Q3 release.',
    growthAreas:
      'Deepen understanding of backend server-sent events (SSE) and WebSocket connection management for multi-user document collaboration.',
    futureGoals:
      'Steer front-end technical standards across all ReviewForge product lines and mentor incoming frontend apprentices.',
    submittedAt: '2026-10-19'
  }
];


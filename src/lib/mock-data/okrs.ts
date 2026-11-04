import { OKR } from '@/types';

export const INITIAL_OKRS: OKR[] = [
  // Rahul Deshmukh (emp-002) - Q1
  {
    id: 'okr-001',
    employeeId: 'emp-002',
    quarter: 'Q1',
    year: 2026,
    objective: 'Modernize Core Data Ingestion Pipeline & Event Bus',
    departmentId: 'dept-eng',
    overallProgress: 100,
    status: 'Completed',
    updatedAt: '2026-03-28',
    keyResults: [
      {
        id: 'kr-001',
        title: 'Migrate legacy synchronous queue to distributed Apache Kafka cluster',
        targetValue: 100,
        actualValue: 100,
        unit: '% completed',
        completionPercentage: 100,
        status: 'Completed'
      },
      {
        id: 'kr-002',
        title: 'Reduce pipeline ingest backpressure dropped events to 0.001%',
        targetValue: 0.001,
        actualValue: 0.0008,
        unit: '% drops',
        completionPercentage: 100,
        status: 'Completed'
      }
    ]
  },
  // Rahul Deshmukh (emp-002) - Q2 (Contains the key evidence mentioned in prompt!)
  {
    id: 'okr-002',
    employeeId: 'emp-002',
    quarter: 'Q2',
    year: 2026,
    objective: 'Accelerate API Gateway Throughput and Lower P99 Latencies',
    departmentId: 'dept-eng',
    overallProgress: 94,
    status: 'Completed',
    updatedAt: '2026-06-30',
    keyResults: [
      {
        id: 'kr-003',
        title: 'Reduce core GraphQL and REST API response times by 30%',
        targetValue: 30,
        actualValue: 31.5,
        unit: '% reduction',
        completionPercentage: 105,
        status: 'Completed'
      },
      {
        id: 'kr-004',
        title: 'Optimize Redis distributed caching layer hit ratio to >92%',
        targetValue: 92,
        actualValue: 89.4,
        unit: '% cache hit',
        completionPercentage: 97,
        status: 'Completed'
      },
      {
        id: 'kr-005',
        title: 'Publish zero-downtime database partitioning playbook for review tables',
        targetValue: 1,
        actualValue: 1,
        unit: 'playbook',
        completionPercentage: 100,
        status: 'Completed'
      }
    ]
  },
  // Rahul Deshmukh (emp-002) - Q3
  {
    id: 'okr-003',
    employeeId: 'emp-002',
    quarter: 'Q3',
    year: 2026,
    objective: 'Strengthen Cloud Infrastructure Security and Zero-Trust Auditing',
    departmentId: 'dept-eng',
    overallProgress: 88,
    status: 'Completed',
    updatedAt: '2026-09-29',
    keyResults: [
      {
        id: 'kr-006',
        title: 'Implement mTLS service mesh authentication across all internal microservices',
        targetValue: 100,
        actualValue: 100,
        unit: '% services',
        completionPercentage: 100,
        status: 'Completed'
      },
      {
        id: 'kr-007',
        title: 'Achieve automated vulnerability scanning in CI with zero high/critical issues',
        targetValue: 0,
        actualValue: 1,
        unit: 'vulnerabilities',
        completionPercentage: 80,
        status: 'On Track'
      }
    ]
  },
  // Rahul Deshmukh (emp-002) - Q4
  {
    id: 'okr-004',
    employeeId: 'emp-002',
    quarter: 'Q4',
    year: 2026,
    objective: 'Launch Real-Time Review Synthesis Worker Architecture',
    departmentId: 'dept-eng',
    overallProgress: 78,
    status: 'On Track',
    updatedAt: '2026-10-25',
    keyResults: [
      {
        id: 'kr-008',
        title: 'Deliver async batch synthesis workers processing 50 reviews concurrently',
        targetValue: 50,
        actualValue: 45,
        unit: 'workers',
        completionPercentage: 90,
        status: 'On Track'
      },
      {
        id: 'kr-009',
        title: 'Establish p95 processing time under 4.5 seconds for complete 360 reviews',
        targetValue: 4.5,
        actualValue: 5.2,
        unit: 'seconds',
        completionPercentage: 68,
        status: 'At Risk'
      }
    ]
  },

  // Elena Rostova (emp-003) - Q1 to Q3
  {
    id: 'okr-005',
    employeeId: 'emp-003',
    quarter: 'Q2',
    year: 2026,
    objective: 'Elevate Enterprise Design System Quality & WCAG Accessibility',
    departmentId: 'dept-eng',
    overallProgress: 95,
    status: 'Completed',
    updatedAt: '2026-06-25',
    keyResults: [
      {
        id: 'kr-010',
        title: 'Refactor 45 legacy UI components to WCAG 2.1 AAA accessible specifications',
        targetValue: 45,
        actualValue: 45,
        unit: 'components',
        completionPercentage: 100,
        status: 'Completed'
      },
      {
        id: 'kr-011',
        title: 'Cut initial client bundle size by 28% through dynamic route code-splitting',
        targetValue: 28,
        actualValue: 25,
        unit: '% reduction',
        completionPercentage: 89,
        status: 'Completed'
      }
    ]
  },

  // Julian Mercer (emp-006) - Product Design
  {
    id: 'okr-006',
    employeeId: 'emp-006',
    quarter: 'Q3',
    year: 2026,
    objective: 'Design Evidence-First Review Studio Experience & Usability Benchmarks',
    departmentId: 'dept-prod',
    overallProgress: 96,
    status: 'Completed',
    updatedAt: '2026-09-30',
    keyResults: [
      {
        id: 'kr-012',
        title: 'Complete 3 rounds of usability interviews with 18 enterprise HR directors',
        targetValue: 18,
        actualValue: 18,
        unit: 'interviews',
        completionPercentage: 100,
        status: 'Completed'
      },
      {
        id: 'kr-013',
        title: 'Raise System Usability Scale (SUS) score from 71 to >85 on review editor',
        targetValue: 85,
        actualValue: 88,
        unit: 'SUS score',
        completionPercentage: 104,
        status: 'Completed'
      }
    ]
  },

  // Sofia Al-Mansoor (emp-007) - Product Management
  {
    id: 'okr-007',
    employeeId: 'emp-007',
    quarter: 'Q2',
    year: 2026,
    objective: 'Deliver AI Evidence Extraction Specification and Calibration Workflow',
    departmentId: 'dept-prod',
    overallProgress: 91,
    status: 'Completed',
    updatedAt: '2026-06-28',
    keyResults: [
      {
        id: 'kr-014',
        title: 'Define traceable citation schema for 100% of generated review claims',
        targetValue: 100,
        actualValue: 100,
        unit: '% claims',
        completionPercentage: 100,
        status: 'Completed'
      },
      {
        id: 'kr-015',
        title: 'Achieve 90% manager approval rate on first generated draft review without rewrite',
        targetValue: 90,
        actualValue: 82,
        unit: '% first-pass rate',
        completionPercentage: 91,
        status: 'On Track'
      }
    ]
  },

  // Camila Rodriguez (emp-010) - Customer Success
  {
    id: 'okr-008',
    employeeId: 'emp-010',
    quarter: 'Q3',
    year: 2026,
    objective: 'Enterprise Account Retention and H2 Review Cycle Adoption',
    departmentId: 'dept-gtm',
    overallProgress: 98,
    status: 'Completed',
    updatedAt: '2026-09-28',
    keyResults: [
      {
        id: 'kr-016',
        title: 'Maintain 98% gross dollar retention across Tier-1 enterprise accounts',
        targetValue: 98,
        actualValue: 99.2,
        unit: '% GDR',
        completionPercentage: 101,
        status: 'Completed'
      },
      {
        id: 'kr-017',
        title: 'Onboard 14 enterprise customers into early-access 360 review cycle',
        targetValue: 14,
        actualValue: 14,
        unit: 'customers',
        completionPercentage: 100,
        status: 'Completed'
      }
    ]
  }
];


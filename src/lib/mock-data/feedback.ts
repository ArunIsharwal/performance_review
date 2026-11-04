import { FeedbackItem } from '@/types';

export const INITIAL_FEEDBACK: FeedbackItem[] = [
  // Feedback for Rahul Deshmukh (emp-002)
  {
    id: 'fb-001',
    reviewCycleId: 'cycle-2026-annual',
    targetEmployeeId: 'emp-002',
    targetEmployeeName: 'Rahul Deshmukh',
    providerEmployeeId: 'emp-003',
    providerEmployeeName: 'Elena Rostova',
    providerRole: 'Peer Engineer',
    isAnonymous: false,
    ratings: {
      collaboration: 5,
      communication: 4,
      problemSolving: 5,
      technicalContribution: 5,
      leadership: 4
    },
    strengths:
      'Rahul is a powerhouse architect. When the API response times were spiking during peak review traffic in May, he redesigned our caching strategy and reduced endpoint latency by over 30%. He is always approachable and explains complex backend internals with immense patience.',
    improvements:
      'Occasionally dives straight into solving architectural problems before documenting the RFC decisions in Notion for the broader team to review.',
    additionalComments:
      'Working alongside Rahul has elevated the technical standard of our entire squad.',
    submittedAt: '2026-10-18',
    status: 'Submitted'
  },
  {
    id: 'fb-002',
    reviewCycleId: 'cycle-2026-annual',
    targetEmployeeId: 'emp-002',
    targetEmployeeName: 'Rahul Deshmukh',
    providerEmployeeId: null,
    providerEmployeeName: 'Anonymous Colleague',
    providerRole: 'Cross-Functional Partner',
    isAnonymous: true,
    ratings: {
      collaboration: 4,
      communication: 4,
      problemSolving: 5,
      technicalContribution: 5,
      leadership: 4
    },
    strengths:
      'Exceptional depth in cloud data engineering. His Kafka migration cut event drops to virtually zero. Dependable during Sev-1 outages and maintains a calm, disciplined approach.',
    improvements:
      'Can sometimes be overly protective of service boundaries, making cross-team feature handoffs take an extra calibration cycle.',
    additionalComments:
      'A true pillar of technical excellence.',
    submittedAt: '2026-10-22',
    status: 'Submitted'
  },
  {
    id: 'fb-003',
    reviewCycleId: 'cycle-2026-annual',
    targetEmployeeId: 'emp-002',
    targetEmployeeName: 'Rahul Deshmukh',
    providerEmployeeId: 'emp-011',
    providerEmployeeName: 'Liam Chen',
    providerRole: 'Direct Report / Junior Peer',
    isAnonymous: false,
    ratings: {
      collaboration: 5,
      communication: 5,
      problemSolving: 5,
      technicalContribution: 5,
      leadership: 5
    },
    strengths:
      'Outstanding mentor. Rahul reviewed over 60 of my pull requests this year, providing constructive line-by-line feedback that taught me concurrency patterns and database indexing.',
    improvements:
      'Would love for Rahul to lead more public tech-talks and architecture brown-bags across the engineering department.',
    additionalComments:
      'The best tech lead I have worked with.',
    submittedAt: '2026-10-24',
    status: 'Submitted'
  },

  // Feedback for Elena Rostova (emp-003)
  {
    id: 'fb-004',
    reviewCycleId: 'cycle-2026-annual',
    targetEmployeeId: 'emp-003',
    targetEmployeeName: 'Elena Rostova',
    providerEmployeeId: 'emp-006',
    providerEmployeeName: 'Julian Mercer',
    providerRole: 'Product Designer',
    isAnonymous: false,
    ratings: {
      collaboration: 5,
      communication: 5,
      problemSolving: 4,
      technicalContribution: 5,
      leadership: 4
    },
    strengths:
      'Elena has transformed our design tokens into pixel-perfect accessible components. Her work on WCAG AAA compliance ensures ReviewForge meets the strictest procurement audits.',
    improvements:
      'Ensure design-dev handoff tickets include edge-case empty states earlier in the sprint.',
    additionalComments:
      'Consistently delivers beyond design specifications.',
    submittedAt: '2026-10-20',
    status: 'Submitted'
  },
  {
    id: 'fb-005',
    reviewCycleId: 'cycle-2026-annual',
    targetEmployeeId: 'emp-003',
    targetEmployeeName: 'Elena Rostova',
    providerEmployeeId: null,
    providerEmployeeName: 'Anonymous Colleague',
    providerRole: 'Peer Engineer',
    isAnonymous: true,
    ratings: {
      collaboration: 4,
      communication: 5,
      problemSolving: 4,
      technicalContribution: 5,
      leadership: 3
    },
    strengths:
      'Fastidious about bundle size and performance. Her dynamic import optimizations trimmed frontend load times significantly.',
    improvements:
      'Encourage Elena to take on more cross-squad architecture decisions.',
    additionalComments:
      'Reliable team contributor.',
    submittedAt: '2026-10-21',
    status: 'Submitted'
  },

  // Feedback for Julian Mercer (emp-006)
  {
    id: 'fb-006',
    reviewCycleId: 'cycle-2026-annual',
    targetEmployeeId: 'emp-006',
    targetEmployeeName: 'Julian Mercer',
    providerEmployeeId: 'emp-007',
    providerEmployeeName: 'Sofia Al-Mansoor',
    providerRole: 'Product Manager',
    isAnonymous: false,
    ratings: {
      collaboration: 5,
      communication: 5,
      problemSolving: 5,
      technicalContribution: 4,
      leadership: 5
    },
    strengths:
      'Julian is an editorial mastermind. The 3-panel Review Studio layout he conceived solved our highest customer friction point—connecting AI text directly to empirical data evidence.',
    improvements:
      'Needs more bandwidth to support mobile design variations earlier in product discovery.',
    additionalComments:
      'One of the most strategic designers in SaaS.',
    submittedAt: '2026-10-25',
    status: 'Submitted'
  }
];


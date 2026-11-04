import { PerformanceReview } from '@/types';

export const INITIAL_PERFORMANCE_REVIEWS: PerformanceReview[] = [
  {
    id: 'rev-001',
    employeeId: 'emp-002',
    employeeName: 'Rahul Deshmukh',
    jobTitle: 'Staff Backend Architect',
    departmentName: 'Engineering & Infrastructure',
    reviewCycleId: 'cycle-2026-annual',
    reviewCycleTitle: 'FY2026 Comprehensive Annual 360° Review',
    status: 'Pending Approval',
    overallRating: 4.8,
    evidenceCoverageScore: 94,
    synthesisEngine: 'Demo synthesis — local mock engine',
    generatedAt: '2026-10-26T14:32:00Z',
    lastUpdatedAt: '2026-10-27T09:15:00Z',
    sections: {
      overallSummary: {
        id: 'sec-sum-001',
        title: 'Overall Performance Summary',
        content:
          'Rahul Deshmukh had an outstanding FY2026, delivering foundational backend architecture transformations across data streaming, latency reduction, and microservice security. He demonstrated high operational discipline during cloud outages and acted as a core technical anchor for the engineering organization.',
        evidenceRefs: [
          {
            id: 'ev-001',
            sourceType: 'OKR',
            sourceId: 'okr-002',
            sourceTitle: 'Q2 OKR: Accelerate API Gateway Throughput',
            sourceDate: 'June 2026',
            excerpt: '31.5% API latency reduction achieved across core endpoints (surpassed 30% target).',
            metrics: '31.5% latency cut'
          },
          {
            id: 'ev-002',
            sourceType: 'ManagerObservation',
            sourceId: 'note-001',
            sourceTitle: 'Manager Note: Exemplary Incident Handling during AWS AZ Degradation',
            sourceDate: 'June 2026',
            excerpt: 'Identified connection pool leak in 8 mins and led failover with zero customer data loss.',
            metrics: '18 min total recovery'
          }
        ]
      },
      majorAchievements: {
        id: 'sec-ach-001',
        title: 'Major Achievements',
        content:
          'Rahul improved API performance by 31.5% during the review period, exceeding the quarterly 30% latency reduction benchmark. He spearheaded the migration of legacy synchronous event pipelines to an enterprise Apache Kafka cluster, virtually eliminating dropped events. Additionally, his caching architecture reduced monthly database IOPS infrastructure costs by $4,200.',
        evidenceRefs: [
          {
            id: 'ev-003',
            sourceType: 'OKR',
            sourceId: 'okr-002',
            sourceTitle: 'Q2 OKR: API Response Time Optimization',
            sourceDate: 'June 2026',
            excerpt: 'Target: 30% reduction. Actual: 31.5% reduction. Redis caching hit ratio reached 89.4%.',
            metrics: '31.5% reduction'
          },
          {
            id: 'ev-004',
            sourceType: 'OKR',
            sourceId: 'okr-001',
            sourceTitle: 'Q1 OKR: Modernize Core Ingestion Pipeline',
            sourceDate: 'March 2026',
            excerpt: 'Kafka migration completed; pipeline ingest backpressure dropped events lowered to 0.0008%.',
            metrics: '0.0008% drop rate'
          },
          {
            id: 'ev-005',
            sourceType: 'ManagerObservation',
            sourceId: 'note-002',
            sourceTitle: 'Manager Note: Pivotal Q2 Latency Breakthrough',
            sourceDate: 'June 2026',
            excerpt: 'Caching layer shaved off $4,200/month in egress and database IOPS costs.',
            metrics: '$4.2k monthly savings'
          }
        ]
      },
      keyStrengths: {
        id: 'sec-str-001',
        title: 'Key Strengths',
        content:
          'Deep expertise in distributed event-driven systems, acute incident triage under pressure, and systematic mentorship of junior engineering staff. 360 peer feedback repeatedly highlighted his patience in explaining architectural tradeoffs and conducting over 60 constructive pull request reviews.',
        evidenceRefs: [
          {
            id: 'ev-006',
            sourceType: 'PeerFeedback',
            sourceId: 'fb-003',
            sourceTitle: 'Peer Feedback from Liam Chen',
            sourceDate: 'October 2026',
            excerpt: 'Mentored junior engineers and reviewed 60+ pull requests with constructive guidance.',
            metrics: '5.0 / 5.0 rating'
          },
          {
            id: 'ev-007',
            sourceType: 'PeerFeedback',
            sourceId: 'fb-001',
            sourceTitle: 'Peer Feedback from Elena Rostova',
            sourceDate: 'October 2026',
            excerpt: 'Redesigned caching strategy during peak traffic; always approachable and immense patience.',
            metrics: '5.0 / 5.0 rating'
          }
        ]
      },
      collaborationAndCommunication: {
        id: 'sec-col-001',
        title: 'Collaboration and Communication',
        content:
          'Rahul works effectively across engineering and product squads. Peer feedback rates him 5/5 in collaboration and technical contribution. However, multiple colleagues and manager notes indicate an opportunity to transition informal verbal/Slack architecture agreements into published, formal RFC documents.',
        evidenceRefs: [
          {
            id: 'ev-008',
            sourceType: 'PeerFeedback',
            sourceId: 'fb-001',
            sourceTitle: 'Peer Feedback: Elena Rostova',
            sourceDate: 'October 2026',
            excerpt: 'Occasionally dives straight into solving problems before documenting RFC decisions in Notion.',
            metrics: 'Collaboration: 5/5'
          },
          {
            id: 'ev-009',
            sourceType: 'ManagerObservation',
            sourceId: 'note-003',
            sourceTitle: 'Manager Note: Coaching Junior Engineers & Knowledge Sharing Gap',
            sourceDate: 'September 2026',
            excerpt: 'Prefers informal Slack threads over publishing formalized RFCs. Encouraged to write formal RFCs.',
            metrics: 'Leadership observation'
          }
        ]
      },
      okrAchievementSummary: {
        id: 'sec-okr-001',
        title: 'OKR Achievement Summary',
        content:
          'Rahul concluded Q1, Q2, and Q3 with an aggregate 94% OKR completion rate. Q1 (Kafka event bus) achieved 100%. Q2 (API latency & Redis cache) reached 94% overall progress. Q3 (mTLS zero-trust audit) finished at 88%. Q4 (synthesis worker architecture) is currently tracking at 78% on pace.',
        evidenceRefs: [
          {
            id: 'ev-010',
            sourceType: 'OKR',
            sourceId: 'okr-001',
            sourceTitle: 'Q1 OKR Status: Completed (100%)',
            sourceDate: 'March 2026',
            excerpt: 'All key results met or surpassed.',
            metrics: '100% completion'
          },
          {
            id: 'ev-011',
            sourceType: 'OKR',
            sourceId: 'okr-002',
            sourceTitle: 'Q2 OKR Status: Completed (94%)',
            sourceDate: 'June 2026',
            excerpt: 'Key results 3, 4, and 5 successfully closed out.',
            metrics: '94% completion'
          }
        ]
      },
      areasForDevelopment: {
        id: 'sec-dev-001',
        title: 'Areas for Development',
        content:
          'Rahul must formalize architectural documentation before code implementation. Self-reflection and peer reviews both identify Architecture Decision Records (ADRs) as a key growth area. Additionally, scaling p95 processing latency for the Q4 worker pipeline requires focused profiling.',
        evidenceRefs: [
          {
            id: 'ev-012',
            sourceType: 'SelfReflection',
            sourceId: 'ref-001',
            sourceTitle: 'Self-Reflection by Rahul Deshmukh',
            sourceDate: 'October 2026',
            excerpt: 'Authoring structured Architecture Decision Records prior to sprint kickoff.',
            metrics: 'Self-identified growth'
          },
          {
            id: 'ev-013',
            sourceType: 'OKR',
            sourceId: 'okr-004',
            sourceTitle: 'Q4 OKR: Processing Latency Target',
            sourceDate: 'October 2026',
            excerpt: 'p95 processing time at 5.2s vs 4.5s target (At Risk).',
            metrics: '68% current progress'
          }
        ],
        isFlaggedForReview: false
      },
      futureGoals: {
        id: 'sec-fut-001',
        title: 'Future Goals',
        content:
          'For FY2027, Rahul plans to lead ReviewForge\'s European multi-region data residency architecture to ensure GDPR enterprise compliance, establish distributed tracing standards with OpenTelemetry, and represent the organization at a major systems conference.',
        evidenceRefs: [
          {
            id: 'ev-014',
            sourceType: 'SelfReflection',
            sourceId: 'ref-001',
            sourceTitle: 'Self-Reflection: Future Career Goals',
            sourceDate: 'October 2026',
            excerpt: 'Lead multi-region data residency architecture for European GDPR compliance in H1 2027.',
            metrics: 'Target H1 2027'
          }
        ]
      },
      managerRecommendations: {
        id: 'sec-rec-001',
        title: 'Manager Recommendations',
        content:
          'I strongly endorse Rahul for promotion from Staff Backend Architect to Principal Architect. His technical contributions have fundamentally stabilized our platform, and with the commitment to formalize RFC leadership, he will set the standard for our next generation of engineers.',
        evidenceRefs: [
          {
            id: 'ev-015',
            sourceType: 'ManagerObservation',
            sourceId: 'note-002',
            sourceTitle: 'Manager Note from Dr. Aris Thorne',
            sourceDate: 'June 2026',
            excerpt: 'Pivotal technical milestone delivered ahead of schedule with significant infrastructure savings.',
            metrics: 'Promotion endorsement'
          }
        ]
      }
    },
    managerFeedbackNotes: 'Review draft is evidence-backed and verified against Q1-Q4 OKRs. Ready for formal sign-off.',
    approverName: 'Dr. Aris Thorne'
  },

  // Elena Rostova (emp-003) - Approved review
  {
    id: 'rev-002',
    employeeId: 'emp-003',
    employeeName: 'Elena Rostova',
    jobTitle: 'Senior Frontend Engineer',
    departmentName: 'Engineering & Infrastructure',
    reviewCycleId: 'cycle-2026-annual',
    reviewCycleTitle: 'FY2026 Comprehensive Annual 360° Review',
    status: 'Approved',
    overallRating: 4.9,
    evidenceCoverageScore: 96,
    synthesisEngine: 'Demo synthesis — local mock engine',
    generatedAt: '2026-10-24T11:00:00Z',
    lastUpdatedAt: '2026-10-25T16:20:00Z',
    sections: {
      overallSummary: {
        id: 'sec-sum-002',
        title: 'Overall Performance Summary',
        content:
          'Elena Rostova demonstrated world-class frontend engineering leadership throughout FY2026. She steered our entire design system to full WCAG 2.1 AAA compliance and optimized page load benchmarks, proving that high accessibility and ultra-snappy performance can co-exist harmoniously.',
        evidenceRefs: [
          {
            id: 'ev-016',
            sourceType: 'OKR',
            sourceId: 'okr-005',
            sourceTitle: 'Q2 OKR: WCAG Accessibility and Design System',
            sourceDate: 'June 2026',
            excerpt: '100% of 45 components audited and certified accessible.',
            metrics: '100% achieved'
          }
        ]
      },
      majorAchievements: {
        id: 'sec-ach-002',
        title: 'Major Achievements',
        content:
          'Refactored 45 core enterprise UI components to meet WCAG 2.1 AAA standards. Slashed front-end bundle payloads by 28% through dynamic route code-splitting, leading to sub-second load times on heavy review dashboards.',
        evidenceRefs: [
          {
            id: 'ev-017',
            sourceType: 'OKR',
            sourceId: 'okr-005',
            sourceTitle: 'Q2 OKR: Performance & Bundle Size',
            sourceDate: 'June 2026',
            excerpt: 'Bundle size reduction achieved 25% (near 28% stretch goal).',
            metrics: '25% reduction'
          }
        ]
      },
      keyStrengths: {
        id: 'sec-str-002',
        title: 'Key Strengths',
        content:
          'Meticulous attention to design fidelity, deep knowledge of browser rendering performance, and high empathy for keyboard and assistive-tech users.',
        evidenceRefs: [
          {
            id: 'ev-018',
            sourceType: 'PeerFeedback',
            sourceId: 'fb-004',
            sourceTitle: 'Peer Feedback: Julian Mercer',
            sourceDate: 'October 2026',
            excerpt: 'Elena transformed our design tokens into pixel-perfect accessible components.',
            metrics: '5.0 / 5.0 rating'
          }
        ]
      },
      collaborationAndCommunication: {
        id: 'sec-col-002',
        title: 'Collaboration and Communication',
        content:
          'Exceptional cross-functional bridge between engineering and product design. She organized regular syncs with designers and researchers to refine real-world micro-interactions.',
        evidenceRefs: []
      },
      okrAchievementSummary: {
        id: 'sec-okr-002',
        title: 'OKR Achievement Summary',
        content:
          'Delivered 95% overall completion across quarterly accessibility and frontend performance initiatives.',
        evidenceRefs: []
      },
      areasForDevelopment: {
        id: 'sec-dev-002',
        title: 'Areas for Development',
        content:
          'Expand backend architectural exposure, specifically WebSocket and Server-Sent Event streaming protocols.',
        evidenceRefs: []
      },
      futureGoals: {
        id: 'sec-fut-002',
        title: 'Future Goals',
        content:
          'Lead design system governance across future ReviewForge mobile and native initiatives.',
        evidenceRefs: []
      },
      managerRecommendations: {
        id: 'sec-rec-002',
        title: 'Manager Recommendations',
        content:
          'Promote to Staff Frontend Engineer and position as company-wide frontend craft guild lead.',
        evidenceRefs: []
      }
    },
    approverName: 'Rahul Deshmukh',
    approvedAt: '2026-10-25T16:20:00Z'
  }
];


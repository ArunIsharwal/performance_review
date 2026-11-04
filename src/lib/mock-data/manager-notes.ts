import { ManagerNote } from '@/types';

export const INITIAL_MANAGER_NOTES: ManagerNote[] = [
  // Notes by Dr. Aris Thorne (emp-001) for Rahul Deshmukh (emp-002)
  {
    id: 'note-001',
    employeeId: 'emp-002',
    managerId: 'emp-001',
    managerName: 'Dr. Aris Thorne',
    title: 'Exemplary Incident Handling during June Database Failover',
    date: '2026-06-14',
    category: 'Problem Solving',
    description:
      'Rahul showed extraordinary composure during an unannounced AWS AZ degradation in us-east-1. He identified the connection pool leak within 8 minutes and orchestrated automated failover to us-west-2 with zero data loss or customer impact.',
    relatedProject: 'Edge API Gateway & High Availability',
    evidenceRef: 'Post-Mortem INC-4892 (Resolved in 18 mins)',
    isPrivateToManagers: true
  },
  {
    id: 'note-002',
    employeeId: 'emp-002',
    managerId: 'emp-001',
    managerName: 'Dr. Aris Thorne',
    title: 'Pivotal Q2 Latency Breakthrough (31.5% Gain)',
    date: '2026-06-29',
    category: 'Achievement',
    description:
      'Rahul exceeded his Q2 OKR target of 30% API response time reduction, hitting 31.5% across all core endpoints. The caching layer he designed shaved off $4,200/month in egress and database IOPS costs.',
    relatedProject: 'API Performance & Caching Architecture',
    evidenceRef: 'Q2 OKR Key Result 3 (31.5% latency reduction)',
    isPrivateToManagers: true
  },
  {
    id: 'note-003',
    employeeId: 'emp-002',
    managerId: 'emp-001',
    managerName: 'Dr. Aris Thorne',
    title: 'Coaching Junior Engineers & Knowledge Sharing Gap',
    date: '2026-09-12',
    category: 'Leadership',
    description:
      'Rahul is a stellar 1-on-1 mentor to Liam and Priya. However, he prefers informal Slack threads over publishing formalized RFCs. I have encouraged him to write 1 structured RFC per major architectural change before the annual calibration.',
    relatedProject: 'Engineering Culture & Documentation',
    evidenceRef: '1-on-1 Coaching Notes Q3',
    isPrivateToManagers: true
  },

  // Notes for Elena Rostova (emp-003)
  {
    id: 'note-004',
    employeeId: 'emp-003',
    managerId: 'emp-002',
    managerName: 'Rahul Deshmukh',
    title: 'Flawless WCAG 2.1 AAA Accessibility Execution',
    date: '2026-07-08',
    category: 'Delivery',
    description:
      'Elena single-handedly completed our component accessibility overhaul ahead of our SOC2 Type II and government procurement security audit. Every interactive element now supports screen readers and keyboard navigation seamlessly.',
    relatedProject: 'Design System & Accessibility Standards',
    evidenceRef: 'Accessibility Audit Pass Certificate #892',
    isPrivateToManagers: true
  },
  {
    id: 'note-005',
    employeeId: 'emp-003',
    managerId: 'emp-002',
    managerName: 'Rahul Deshmukh',
    title: 'Cross-Squad Design Alignment & Code Splitting',
    date: '2026-09-22',
    category: 'Collaboration',
    description:
      'Elena partnered with Julian from Product Design to streamline token sync between Figma and Tailwind. Front-end load time dropped 28% without sacrificing visual polish.',
    relatedProject: 'Front-End Performance Initiative',
    evidenceRef: 'Lighthouse Performance Score 98/100',
    isPrivateToManagers: true
  }
];


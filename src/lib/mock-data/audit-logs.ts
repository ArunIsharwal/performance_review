import { AuditLogItem } from '@/types';

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-001',
    timestamp: '2026-10-27T09:15:00Z',
    actorName: 'Dr. Aris Thorne',
    actorRole: 'manager',
    action: 'Requested Review Approval',
    target: 'Rahul Deshmukh (RF-1002)',
    details: 'Submitted FY2026 synthesized review to executive approval queue.'
  },
  {
    id: 'log-002',
    timestamp: '2026-10-26T14:32:00Z',
    actorName: 'Dr. Aris Thorne',
    actorRole: 'manager',
    action: 'Synthesized Review with Local Engine',
    target: 'Rahul Deshmukh (RF-1002)',
    details: 'Generated 8 review sections linking 15 verified empirical evidence items.'
  },
  {
    id: 'log-003',
    timestamp: '2026-10-25T16:20:00Z',
    actorName: 'Rahul Deshmukh',
    actorRole: 'manager',
    action: 'Approved Review',
    target: 'Elena Rostova (RF-1003)',
    details: 'Manager approved 360 review; sent to HR release calibration.'
  },
  {
    id: 'log-004',
    timestamp: '2026-10-24T10:14:00Z',
    actorName: 'Elena Rostova',
    actorRole: 'employee',
    action: 'Submitted Self-Reflection',
    target: 'Self (RF-1003)',
    details: 'Documented 45 WCAG component refactors and bundle size wins.'
  },
  {
    id: 'log-005',
    timestamp: '2026-10-20T08:30:00Z',
    actorName: 'Julian Mercer',
    actorRole: 'peer_reviewer',
    action: 'Submitted Peer Feedback',
    target: 'Elena Rostova (RF-1003)',
    details: 'Completed 5-dimension rubric evaluation.'
  },
  {
    id: 'log-006',
    timestamp: '2026-10-01T00:00:00Z',
    actorName: 'HR Administration',
    actorRole: 'hr_admin',
    action: 'Launched Review Cycle',
    target: 'FY2026 Comprehensive Annual 360° Review',
    details: 'Cycle initialized for 48 eligible organization members.'
  }
];


import { ReviewCycle } from '@/types';

export const INITIAL_REVIEW_CYCLES: ReviewCycle[] = [
  {
    id: 'cycle-2026-annual',
    title: 'FY2026 Comprehensive Annual 360° Review',
    period: 'FY2026',
    type: 'Annual 360°',
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    status: 'Active',
    eligibleEmployeesCount: 48,
    completedReviewsCount: 34,
    description: 'Company-wide annual review synthesizing all 4 quarters of OKRs, 360 peer feedback, manager observations, and self-reflections.'
  },
  {
    id: 'cycle-2026-q2-midyear',
    title: 'FY2026 Mid-Year Growth & Calibration Cycle',
    period: 'H1 2026',
    type: 'Mid-Year Calibration',
    startDate: '2026-06-01',
    endDate: '2026-07-15',
    status: 'Completed',
    eligibleEmployeesCount: 44,
    completedReviewsCount: 44,
    description: 'Mid-year milestone calibration focused on H1 goal achievement and second-half career trajectory development.'
  },
  {
    id: 'cycle-2027-q1-preview',
    title: 'FY2027 Q1 Goal Alignment & Check-in',
    period: 'Q1 2027',
    type: 'Quarterly Check-in',
    startDate: '2027-01-15',
    endDate: '2027-02-28',
    status: 'Draft',
    eligibleEmployeesCount: 52,
    completedReviewsCount: 0,
    description: 'Preliminary Q1 check-in cycle to baseline quarterly OKRs and leadership expectations.'
  }
];


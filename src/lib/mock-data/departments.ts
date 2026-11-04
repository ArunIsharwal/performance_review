import { Department } from '@/types';

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: 'dept-eng',
    name: 'Engineering & Infrastructure',
    code: 'ENG',
    headEmployeeId: 'emp-001',
    headName: 'Dr. Aris Thorne',
    employeeCount: 22,
    averageOkrCompletion: 88,
    description: 'Core software systems, cloud infrastructure, AI platform reliability, and data engineering.'
  },
  {
    id: 'dept-prod',
    name: 'Product & Design',
    code: 'PROD',
    headEmployeeId: 'emp-005',
    headName: 'Maya Lin-Vance',
    employeeCount: 14,
    averageOkrCompletion: 92,
    description: 'Product strategy, user experience research, design systems, and customer workflow architecture.'
  },
  {
    id: 'dept-gtm',
    name: 'Sales & Growth',
    code: 'GTM',
    headEmployeeId: 'emp-009',
    headName: 'Marcus Sterling',
    employeeCount: 12,
    averageOkrCompletion: 84,
    description: 'Enterprise client acquisition, customer expansion, sales engineering, and account retention.'
  }
];


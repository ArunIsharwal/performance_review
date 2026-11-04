export type UserRole = 'hr_admin' | 'manager' | 'employee' | 'peer_reviewer';

export interface Department {
  id: string;
  name: string;
  code: string;
  headEmployeeId: string;
  headName: string;
  employeeCount: number;
  averageOkrCompletion: number;
  description: string;
}

export type EmploymentStatus = 'Full-Time' | 'Part-Time' | 'Contractor';
export type ReviewStatus = 'Not Started' | 'In Progress' | 'Pending Approval' | 'Approved' | 'Released';

export interface Employee {
  id: string;
  employeeNumber: string;
  name: string;
  email: string;
  avatar: string;
  departmentId: string;
  departmentName: string;
  jobTitle: string;
  managerId: string | null;
  managerName: string | null;
  joinDate: string;
  employmentStatus: EmploymentStatus;
  reviewStatus: ReviewStatus;
  location: string;
  bio: string;
  skills: string[];
}

export type ReviewCycleStatus = 'Draft' | 'Active' | 'Completed';
export type ReviewType = 'Annual 360°' | 'Mid-Year Calibration' | 'Quarterly Check-in';

export interface ReviewCycle {
  id: string;
  title: string;
  period: string; // e.g., "FY2026"
  type: ReviewType;
  startDate: string;
  endDate: string;
  status: ReviewCycleStatus;
  eligibleEmployeesCount: number;
  completedReviewsCount: number;
  description: string;
}

export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export type OKRStatus = 'On Track' | 'At Risk' | 'Behind' | 'Completed';

export interface KeyResult {
  id: string;
  title: string;
  targetValue: number;
  actualValue: number;
  unit: string; // '%', 'ms', 'deals', etc.
  completionPercentage: number;
  status: OKRStatus;
}

export interface OKR {
  id: string;
  employeeId: string;
  quarter: Quarter;
  year: number;
  objective: string;
  departmentId: string;
  keyResults: KeyResult[];
  overallProgress: number;
  status: OKRStatus;
  updatedAt: string;
}

export interface FeedbackRating {
  collaboration: number; // 1-5
  communication: number; // 1-5
  problemSolving: number; // 1-5
  technicalContribution: number; // 1-5
  leadership: number; // 1-5
}

export interface FeedbackItem {
  id: string;
  reviewCycleId: string;
  targetEmployeeId: string;
  targetEmployeeName: string;
  providerEmployeeId: string | null; // null if anonymous
  providerEmployeeName: string; // "Anonymous Colleague" if isAnonymous
  providerRole: string; // "Peer", "Cross-Functional Partner", "Direct Report", "Manager"
  isAnonymous: boolean;
  ratings: FeedbackRating;
  strengths: string;
  improvements: string;
  additionalComments: string;
  submittedAt: string;
  status: 'Submitted' | 'Requested' | 'Declined';
}

export interface SelfReflection {
  id: string;
  employeeId: string;
  reviewCycleId: string;
  period: string;
  majorAchievements: string;
  keyProjects: string;
  challengesFaced: string;
  skillsDeveloped: string[];
  collaborationHighlights: string;
  goalsAchieved: string;
  growthAreas: string;
  futureGoals: string;
  submittedAt: string;
}

export type ManagerNoteCategory =
  | 'Achievement'
  | 'Collaboration'
  | 'Leadership'
  | 'Improvement'
  | 'Problem Solving'
  | 'Delivery';

export interface ManagerNote {
  id: string;
  employeeId: string;
  managerId: string;
  managerName: string;
  title: string;
  date: string;
  category: ManagerNoteCategory;
  description: string;
  relatedProject?: string;
  evidenceRef?: string;
  isPrivateToManagers: boolean; // Must always be true - hidden from employee views
}

export type EvidenceSourceType =
  | 'OKR'
  | 'PeerFeedback'
  | 'SelfReflection'
  | 'ManagerObservation'
  | 'ProjectMilestone';

export interface EvidenceReference {
  id: string;
  sourceType: EvidenceSourceType;
  sourceId: string;
  sourceTitle: string;
  sourceDate: string;
  excerpt: string;
  metrics?: string;
}

export interface ReviewSection {
  id: string;
  title: string;
  content: string;
  evidenceRefs: EvidenceReference[];
  isFlaggedForReview?: boolean;
  flagReason?: string;
}

export type ReviewApprovalStatus =
  | 'Draft'
  | 'Pending Approval'
  | 'Changes Requested'
  | 'Approved'
  | 'Released';

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  jobTitle: string;
  departmentName: string;
  reviewCycleId: string;
  reviewCycleTitle: string;
  status: ReviewApprovalStatus;
  overallRating: number; // 1.0 - 5.0
  evidenceCoverageScore: number; // percentage (e.g. 92%)
  synthesisEngine: string; // "Demo synthesis — local mock engine"
  generatedAt: string;
  lastUpdatedAt: string;
  sections: {
    overallSummary: ReviewSection;
    majorAchievements: ReviewSection;
    keyStrengths: ReviewSection;
    collaborationAndCommunication: ReviewSection;
    okrAchievementSummary: ReviewSection;
    areasForDevelopment: ReviewSection;
    futureGoals: ReviewSection;
    managerRecommendations: ReviewSection;
  };
  managerFeedbackNotes?: string;
  approverName?: string;
  approvedAt?: string;
  releasedAt?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  target: string;
  details: string;
}

export interface OrganizationSettings {
  name: string;
  industry: string;
  ratingScale: '1-5 Numeric' | '1-4 Descriptive' | 'Letter Scale';
  defaultCyclePeriod: string;
  anonymityPolicy: 'Strict Anonymity' | 'Optional Anonymity' | 'Transparent';
  allowEmployeeDirectRelease: boolean;
  requireDualManagerSignoff: boolean;
  notificationPreferences: {
    emailOnCycleStart: boolean;
    emailOnFeedbackRequest: boolean;
    emailOnReviewReady: boolean;
    slackDigestWeekly: boolean;
  };
}


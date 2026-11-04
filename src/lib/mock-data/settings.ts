import { OrganizationSettings } from '@/types';

export const INITIAL_SETTINGS: OrganizationSettings = {
  name: 'Acme Technologies Corporation',
  industry: 'Enterprise Software & Cloud Systems',
  ratingScale: '1-5 Numeric',
  defaultCyclePeriod: 'FY2026',
  anonymityPolicy: 'Strict Anonymity',
  allowEmployeeDirectRelease: false,
  requireDualManagerSignoff: true,
  notificationPreferences: {
    emailOnCycleStart: true,
    emailOnFeedbackRequest: true,
    emailOnReviewReady: true,
    slackDigestWeekly: true
  }
};


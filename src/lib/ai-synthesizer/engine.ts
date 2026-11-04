import {
  Employee,
  OKR,
  FeedbackItem,
  SelfReflection,
  ManagerNote,
  PerformanceReview,
  ReviewSection,
  EvidenceReference
} from '@/types';

export interface SynthesisInput {
  employee: Employee;
  reviewCycleTitle: string;
  reviewCycleId: string;
  okrs: OKR[];
  feedback: FeedbackItem[];
  selfReflection?: SelfReflection;
  managerNotes: ManagerNote[];
}

export interface SynthesisQualityCheck {
  overallCoverageScore: number;
  unsupportedClaimsCount: number;
  conflictingFeedbackDetected: boolean;
  conflictingDetails?: string;
  missingEvidenceFlags: string[];
}

export class LocalReviewSynthesizer {
  public static readonly ENGINE_LABEL = 'Demo synthesis — local mock engine';

  /**
   * Evaluates evidence quality and flags gaps prior to or during synthesis.
   */
  public static evaluateQuality(input: SynthesisInput): SynthesisQualityCheck {
    const missing: string[] = [];
    let coverage = 85;

    if (!input.selfReflection) {
      missing.push('Missing Employee Self-Reflection: Self-assessed achievements and growth goals unavailable.');
      coverage -= 20;
    }

    if (input.okrs.length === 0) {
      missing.push('Missing Quarterly OKRs: No empirical objective records found for this period.');
      coverage -= 30;
    } else if (input.okrs.length < 3) {
      missing.push(`Partial OKRs: Only ${input.okrs.length} quarter(s) logged out of 4.`);
      coverage -= 10;
    }

    if (input.feedback.length === 0) {
      missing.push('Missing Peer Feedback: Zero 360° peer submissions collected.');
      coverage -= 25;
    } else if (input.feedback.length < 2) {
      missing.push('Low Feedback Calibration: Only 1 peer review submitted (recommend at least 3).');
      coverage -= 10;
    }

    if (input.managerNotes.length === 0) {
      missing.push('Missing Manager Observations: No manager private observation journal entries recorded.');
      coverage -= 10;
    }

    // Check for conflicting peer feedback
    let conflicting = false;
    let conflictDetails: string | undefined = undefined;
    if (input.feedback.length >= 2) {
      const collabRatings = input.feedback.map(f => f.ratings.collaboration);
      const minC = Math.min(...collabRatings);
      const maxC = Math.max(...collabRatings);
      if (maxC - minC >= 3) {
        conflicting = true;
        conflictDetails = `Significant variance in collaboration ratings (ranging from ${minC}/5 to ${maxC}/5). Recommended manager reconciliation.`;
      }
    }

    return {
      overallCoverageScore: Math.max(10, Math.min(100, coverage)),
      unsupportedClaimsCount: 0,
      conflictingFeedbackDetected: conflicting,
      conflictingDetails: conflictDetails,
      missingEvidenceFlags: missing
    };
  }

  /**
   * Synthesizes a full evidence-backed 8-section review from deterministic records.
   */
  public static synthesizeFullReview(input: SynthesisInput): PerformanceReview {
    const quality = this.evaluateQuality(input);

    const overallSummary = this.synthesizeOverallSummary(input);
    const majorAchievements = this.synthesizeMajorAchievements(input);
    const keyStrengths = this.synthesizeKeyStrengths(input);
    const collaborationAndCommunication = this.synthesizeCollaboration(input);
    const okrAchievementSummary = this.synthesizeOKRs(input);
    const areasForDevelopment = this.synthesizeDevelopmentAreas(input);
    const futureGoals = this.synthesizeFutureGoals(input);
    const managerRecommendations = this.synthesizeManagerRecommendations(input);

    // Calculate overall rating estimate from OKRs and feedback
    let avgFeedback = 4.5;
    if (input.feedback.length > 0) {
      const allRatings = input.feedback.flatMap(f => [
        f.ratings.collaboration,
        f.ratings.communication,
        f.ratings.problemSolving,
        f.ratings.technicalContribution,
        f.ratings.leadership
      ]);
      avgFeedback = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
    }

    let avgOkr = 85;
    if (input.okrs.length > 0) {
      avgOkr = input.okrs.reduce((a, b) => a + b.overallProgress, 0) / input.okrs.length;
    }

    const calculatedRating = parseFloat(((avgFeedback * 0.6) + ((avgOkr / 20) * 0.4)).toFixed(1));

    return {
      id: `rev-${input.employee.id}-${Date.now().toString().slice(-4)}`,
      employeeId: input.employee.id,
      employeeName: input.employee.name,
      jobTitle: input.employee.jobTitle,
      departmentName: input.employee.departmentName,
      reviewCycleId: input.reviewCycleId,
      reviewCycleTitle: input.reviewCycleTitle,
      status: 'Draft',
      overallRating: Math.min(5.0, Math.max(1.0, calculatedRating)),
      evidenceCoverageScore: quality.overallCoverageScore,
      synthesisEngine: this.ENGINE_LABEL,
      generatedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      sections: {
        overallSummary,
        majorAchievements,
        keyStrengths,
        collaborationAndCommunication,
        okrAchievementSummary,
        areasForDevelopment,
        futureGoals,
        managerRecommendations
      },
      managerFeedbackNotes: 'Synthesized via local ReviewForge intelligence engine. Evidence citations linked.'
    };
  }

  /**
   * Regenerates a single targeted section without overwriting other edits.
   */
  public static regenerateSection(
    sectionKey: keyof PerformanceReview['sections'],
    input: SynthesisInput
  ): ReviewSection {
    switch (sectionKey) {
      case 'overallSummary':
        return this.synthesizeOverallSummary(input);
      case 'majorAchievements':
        return this.synthesizeMajorAchievements(input);
      case 'keyStrengths':
        return this.synthesizeKeyStrengths(input);
      case 'collaborationAndCommunication':
        return this.synthesizeCollaboration(input);
      case 'okrAchievementSummary':
        return this.synthesizeOKRs(input);
      case 'areasForDevelopment':
        return this.synthesizeDevelopmentAreas(input);
      case 'futureGoals':
        return this.synthesizeFutureGoals(input);
      case 'managerRecommendations':
        return this.synthesizeManagerRecommendations(input);
      default:
        throw new Error(`Unknown section key: ${sectionKey}`);
    }
  }

  // Section synthesizers
  private static synthesizeOverallSummary(input: SynthesisInput): ReviewSection {
    const { employee, okrs, managerNotes } = input;
    const evidenceRefs: EvidenceReference[] = [];

    const completedOkrs = okrs.filter(o => o.status === 'Completed').length;
    const keyNote = managerNotes[0];

    let content = `${employee.name} performed exceptionally in their role as ${employee.jobTitle} within ${employee.departmentName}. `;
    if (okrs.length > 0) {
      content += `Across ${okrs.length} evaluated quarters, they closed out ${completedOkrs} major objectives, demonstrating strong ownership of organizational deliverables. `;
      evidenceRefs.push({
        id: `ev-sum-okr-${Date.now()}`,
        sourceType: 'OKR',
        sourceId: okrs[0].id,
        sourceTitle: `${okrs[0].quarter} OKR: ${okrs[0].objective}`,
        sourceDate: `${okrs[0].quarter} ${okrs[0].year}`,
        excerpt: `Completed with ${okrs[0].overallProgress}% progress.`,
        metrics: `${okrs[0].overallProgress}% completion`
      });
    }

    if (keyNote) {
      content += `Observations from leadership highlight their decisive execution, such as: "${keyNote.title}".`;
      evidenceRefs.push({
        id: `ev-sum-mgr-${Date.now()}`,
        sourceType: 'ManagerObservation',
        sourceId: keyNote.id,
        sourceTitle: `Manager Note: ${keyNote.title}`,
        sourceDate: keyNote.date,
        excerpt: keyNote.description.substring(0, 120) + '...',
        metrics: keyNote.category
      });
    }

    return {
      id: `sec-sum-${Date.now()}`,
      title: 'Overall Performance Summary',
      content,
      evidenceRefs
    };
  }

  private static synthesizeMajorAchievements(input: SynthesisInput): ReviewSection {
    const { employee, okrs, selfReflection, managerNotes } = input;
    const evidenceRefs: EvidenceReference[] = [];
    const points: string[] = [];

    // Extract empirical achievements from Key Results
    okrs.forEach(okr => {
      okr.keyResults.forEach(kr => {
        if (kr.completionPercentage >= 90) {
          points.push(`Successfully delivered ${kr.title.toLowerCase()}, achieving ${kr.actualValue}${kr.unit} (target: ${kr.targetValue}${kr.unit}).`);
          evidenceRefs.push({
            id: `ev-ach-kr-${kr.id}`,
            sourceType: 'OKR',
            sourceId: okr.id,
            sourceTitle: `${okr.quarter} Key Result: ${kr.title}`,
            sourceDate: `${okr.quarter} ${okr.year}`,
            excerpt: `Target: ${kr.targetValue}${kr.unit}, Actual: ${kr.actualValue}${kr.unit} (${kr.completionPercentage}% achieved).`,
            metrics: `${kr.actualValue}${kr.unit}`
          });
        }
      });
    });

    // Check manager notes for achievements
    const achNotes = managerNotes.filter(n => n.category === 'Achievement' || n.category === 'Delivery');
    achNotes.forEach(note => {
      points.push(`Noted in manager observations: ${note.description}`);
      evidenceRefs.push({
        id: `ev-ach-note-${note.id}`,
        sourceType: 'ManagerObservation',
        sourceId: note.id,
        sourceTitle: `Manager Observation: ${note.title}`,
        sourceDate: note.date,
        excerpt: note.description,
        metrics: note.category
      });
    });

    if (selfReflection && selfReflection.majorAchievements) {
      points.push(`Self-reported milestone: ${selfReflection.majorAchievements.split('\n')[0]}`);
      evidenceRefs.push({
        id: `ev-ach-self-${selfReflection.id}`,
        sourceType: 'SelfReflection',
        sourceId: selfReflection.id,
        sourceTitle: 'Self-Reflection: Major Achievements',
        sourceDate: selfReflection.submittedAt,
        excerpt: selfReflection.majorAchievements.substring(0, 140) + '...'
      });
    }

    const content = points.length > 0
      ? `${employee.name}'s key achievements during this cycle include: ` + points.slice(0, 3).join(' ')
      : `No verified achievement records were located in the current cycle for ${employee.name}. Please ensure quarterly OKRs or manager notes are registered.`;

    return {
      id: `sec-ach-${Date.now()}`,
      title: 'Major Achievements',
      content,
      evidenceRefs,
      isFlaggedForReview: points.length === 0,
      flagReason: points.length === 0 ? 'Insufficient achievement evidence in mock records' : undefined
    };
  }

  private static synthesizeKeyStrengths(input: SynthesisInput): ReviewSection {
    const { employee, feedback, selfReflection } = input;
    const evidenceRefs: EvidenceReference[] = [];

    const strengthsList: string[] = [];
    feedback.forEach(fb => {
      if (fb.strengths) {
        strengthsList.push(fb.strengths);
        evidenceRefs.push({
          id: `ev-str-fb-${fb.id}`,
          sourceType: 'PeerFeedback',
          sourceId: fb.id,
          sourceTitle: `Feedback from ${fb.providerEmployeeName}`,
          sourceDate: fb.submittedAt,
          excerpt: fb.strengths.substring(0, 120) + '...',
          metrics: `Rated 5/5 in Technical & Problem Solving`
        });
      }
    });

    let content = `Consistently demonstrated high domain competence and intellectual agility. `;
    if (strengthsList.length > 0) {
      content += `Peer reviewers consistently emphasized: "${strengthsList[0]}"`;
      if (strengthsList.length > 1) {
        content += ` Additional feedback reinforced: "${strengthsList[1].substring(0, 120)}..."`;
      }
    } else {
      content += `Peer feedback records are pending for this cycle. Key skills verified on file include: ${employee.skills.join(', ')}.`;
    }

    if (selfReflection && selfReflection.skillsDeveloped.length > 0) {
      content += ` Expanded technical toolset with: ${selfReflection.skillsDeveloped.join(', ')}.`;
      evidenceRefs.push({
        id: `ev-str-self-${selfReflection.id}`,
        sourceType: 'SelfReflection',
        sourceId: selfReflection.id,
        sourceTitle: 'Self-Reflection: Skills Developed',
        sourceDate: selfReflection.submittedAt,
        excerpt: selfReflection.skillsDeveloped.join(', ')
      });
    }

    return {
      id: `sec-str-${Date.now()}`,
      title: 'Key Strengths',
      content,
      evidenceRefs
    };
  }

  private static synthesizeCollaboration(input: SynthesisInput): ReviewSection {
    const { employee, feedback, selfReflection } = input;
    const evidenceRefs: EvidenceReference[] = [];

    let avgCollab = 0;
    let avgComm = 0;
    if (feedback.length > 0) {
      avgCollab = feedback.reduce((sum, f) => sum + f.ratings.collaboration, 0) / feedback.length;
      avgComm = feedback.reduce((sum, f) => sum + f.ratings.communication, 0) / feedback.length;
    }

    let content = `${employee.name} maintains positive and constructive working relationships across squads. `;
    if (feedback.length > 0) {
      content += `Peer evaluations yielded an average Collaboration rating of ${avgCollab.toFixed(1)}/5.0 and Communication rating of ${avgComm.toFixed(1)}/5.0. `;
      evidenceRefs.push({
        id: `ev-collab-fb-${feedback[0].id}`,
        sourceType: 'PeerFeedback',
        sourceId: feedback[0].id,
        sourceTitle: `Peer Collaboration Rubric (n=${feedback.length})`,
        sourceDate: feedback[0].submittedAt,
        excerpt: `Collaboration: ${avgCollab.toFixed(1)}/5, Communication: ${avgComm.toFixed(1)}/5`,
        metrics: `${avgCollab.toFixed(1)} / 5.0`
      });
    }

    if (selfReflection && selfReflection.collaborationHighlights) {
      content += `In self-reflection, ${employee.name} highlighted: "${selfReflection.collaborationHighlights}"`;
      evidenceRefs.push({
        id: `ev-collab-self-${selfReflection.id}`,
        sourceType: 'SelfReflection',
        sourceId: selfReflection.id,
        sourceTitle: 'Self-Reflection: Collaboration Highlights',
        sourceDate: selfReflection.submittedAt,
        excerpt: selfReflection.collaborationHighlights.substring(0, 130) + '...'
      });
    }

    return {
      id: `sec-col-${Date.now()}`,
      title: 'Collaboration and Communication',
      content,
      evidenceRefs
    };
  }

  private static synthesizeOKRs(input: SynthesisInput): ReviewSection {
    const { okrs } = input;
    const evidenceRefs: EvidenceReference[] = [];

    if (okrs.length === 0) {
      return {
        id: `sec-okr-${Date.now()}`,
        title: 'OKR Achievement Summary',
        content: 'No formal quarterly OKRs were assigned or tracked in the system for this review cycle.',
        evidenceRefs: [],
        isFlaggedForReview: true,
        flagReason: 'Missing OKR data for evaluated period'
      };
    }

    const avgProgress = okrs.reduce((a, b) => a + b.overallProgress, 0) / okrs.length;
    let content = `Delivered an aggregate completion rate of ${avgProgress.toFixed(0)}% across ${okrs.length} recorded quarters. Breakdown: `;

    okrs.forEach(okr => {
      content += `${okr.quarter} (${okr.objective}): ${okr.overallProgress}% [${okr.status}]. `;
      evidenceRefs.push({
        id: `ev-okr-ref-${okr.id}`,
        sourceType: 'OKR',
        sourceId: okr.id,
        sourceTitle: `${okr.quarter} OKR: ${okr.objective}`,
        sourceDate: `${okr.quarter} ${okr.year}`,
        excerpt: `${okr.keyResults.length} Key Results tracked. Progress: ${okr.overallProgress}%. Status: ${okr.status}.`,
        metrics: `${okr.overallProgress}%`
      });
    });

    return {
      id: `sec-okr-${Date.now()}`,
      title: 'OKR Achievement Summary',
      content,
      evidenceRefs
    };
  }

  private static synthesizeDevelopmentAreas(input: SynthesisInput): ReviewSection {
    const { feedback, selfReflection, managerNotes, okrs } = input;
    const evidenceRefs: EvidenceReference[] = [];
    const areas: string[] = [];

    // Peer feedback improvement suggestions
    feedback.forEach(fb => {
      if (fb.improvements && fb.improvements.trim().length > 0) {
        areas.push(fb.improvements);
        evidenceRefs.push({
          id: `ev-dev-fb-${fb.id}`,
          sourceType: 'PeerFeedback',
          sourceId: fb.id,
          sourceTitle: `Feedback Improvement Note (${fb.providerEmployeeName})`,
          sourceDate: fb.submittedAt,
          excerpt: fb.improvements.substring(0, 130) + '...'
        });
      }
    });

    // Self reflection growth areas
    if (selfReflection && selfReflection.growthAreas) {
      areas.push(`Self-identified: ${selfReflection.growthAreas}`);
      evidenceRefs.push({
        id: `ev-dev-self-${selfReflection.id}`,
        sourceType: 'SelfReflection',
        sourceId: selfReflection.id,
        sourceTitle: 'Self-Reflection: Growth Areas',
        sourceDate: selfReflection.submittedAt,
        excerpt: selfReflection.growthAreas
      });
    }

    // Manager improvement notes
    const impNotes = managerNotes.filter(n => n.category === 'Improvement');
    impNotes.forEach(note => {
      areas.push(`Manager recommendation: ${note.description}`);
      evidenceRefs.push({
        id: `ev-dev-note-${note.id}`,
        sourceType: 'ManagerObservation',
        sourceId: note.id,
        sourceTitle: `Manager Note: ${note.title}`,
        sourceDate: note.date,
        excerpt: note.description
      });
    });

    // At-risk OKRs
    const atRiskOkrs = okrs.flatMap(o => o.keyResults.filter(kr => kr.status === 'At Risk' || kr.status === 'Behind'));
    atRiskOkrs.forEach(kr => {
      areas.push(`Key result calibration: ${kr.title} (current progress ${kr.completionPercentage}%).`);
    });

    let content = '';
    if (areas.length > 0) {
      content = 'Identified opportunities for continued growth include: ' + areas.slice(0, 3).join(' ');
    } else {
      content = 'No acute development deficits were flagged during this cycle. Continuous focus on expanding cross-organizational scope is advised.';
    }

    return {
      id: `sec-dev-${Date.now()}`,
      title: 'Areas for Development',
      content,
      evidenceRefs
    };
  }

  private static synthesizeFutureGoals(input: SynthesisInput): ReviewSection {
    const { selfReflection, employee } = input;
    const evidenceRefs: EvidenceReference[] = [];

    let content = `For the upcoming cycle, ${employee.name} should focus on expanding high-leverage architectural and strategic leadership. `;
    if (selfReflection && selfReflection.futureGoals) {
      content += `Aligned with their stated aspirations: "${selfReflection.futureGoals}"`;
      evidenceRefs.push({
        id: `ev-fut-self-${selfReflection.id}`,
        sourceType: 'SelfReflection',
        sourceId: selfReflection.id,
        sourceTitle: 'Self-Reflection: Future Goals',
        sourceDate: selfReflection.submittedAt,
        excerpt: selfReflection.futureGoals
      });
    }

    return {
      id: `sec-fut-${Date.now()}`,
      title: 'Future Goals',
      content,
      evidenceRefs
    };
  }

  private static synthesizeManagerRecommendations(input: SynthesisInput): ReviewSection {
    const { employee, managerNotes } = input;
    const evidenceRefs: EvidenceReference[] = [];

    const recNote = managerNotes.find(n => n.category === 'Leadership' || n.category === 'Achievement');
    let content = `Based on performance metrics, peer endorsements, and consistent delivery, ${employee.name} is recommended for continued advancement and expanded organizational autonomy. `;

    if (recNote) {
      content += `Supported by manager observation: "${recNote.title}".`;
      evidenceRefs.push({
        id: `ev-rec-note-${recNote.id}`,
        sourceType: 'ManagerObservation',
        sourceId: recNote.id,
        sourceTitle: `Manager Note: ${recNote.title}`,
        sourceDate: recNote.date,
        excerpt: recNote.description.substring(0, 130) + '...'
      });
    }

    return {
      id: `sec-rec-${Date.now()}`,
      title: 'Manager Recommendations',
      content,
      evidenceRefs
    };
  }
}

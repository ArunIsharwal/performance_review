'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storage/use-store';
import { PerformanceReview } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { EmptyState } from '@/components/ui/empty-state';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  MessageSquare,
  FileCheck2,
  ShieldCheck,
  Eye,
  Check,
  X
} from 'lucide-react';

export default function ApprovalsPage() {
  const { performanceReviews, savePerformanceReview, showToast, activeRole } = useStore();

  const [selectedReviewForChanges, setSelectedReviewForChanges] = useState<PerformanceReview | null>(null);
  const [changeNotes, setChangeNotes] = useState('');

  // Reviews requiring approval
  const pendingReviews = performanceReviews.filter(
    r => r.status === 'Pending Approval' || r.status === 'Changes Requested'
  );

  const approvedReviews = performanceReviews.filter(
    r => r.status === 'Approved' || r.status === 'Released'
  );

  const handleApprove = (review: PerformanceReview) => {
    savePerformanceReview({
      ...review,
      status: 'Approved',
      approverName: 'Dr. Aris Thorne (Manager)',
      approvedAt: new Date().toISOString()
    });
    showToast(`Approved performance review for ${review.employeeName}`, 'success');
  };

  const handleOpenRequestChanges = (review: PerformanceReview) => {
    setSelectedReviewForChanges(review);
    setChangeNotes(
      'Please strengthen Section 4 regarding Architecture Decision Records (ADRs) documentation before final sign-off.'
    );
  };

  const handleConfirmRequestChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReviewForChanges) return;

    savePerformanceReview({
      ...selectedReviewForChanges,
      status: 'Changes Requested',
      managerFeedbackNotes: changeNotes
    });

    showToast(
      `Requested revisions on review for ${selectedReviewForChanges.employeeName}`,
      'info'
    );
    setSelectedReviewForChanges(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E8E1]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#17251F]">
              Manager Review Approval Queue
            </h1>
            <Badge variant="amber">{pendingReviews.length} Pending</Badge>
          </div>
          <p className="text-xs text-[#747D75] mt-1">
            Deliberate manager and HR calibration workflow. Reviews must be formally approved before release.
          </p>
        </div>

        <Link href="/reviews">
          <Button variant="secondary" size="sm">
            View All Reviews ({performanceReviews.length})
          </Button>
        </Link>
      </div>

      {/* Governance Notice */}
      <div className="p-4 bg-[#FAFBF8] border border-[#E6E8E1] rounded-2xl flex items-start gap-3.5 text-xs text-[#747D75]">
        <ShieldCheck className="w-5 h-5 text-[#2C5E1A] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-[#17251F]">
            Mandatory Manager-in-the-Loop Governance
          </div>
          <p className="leading-relaxed">
            AI-assisted review drafts are never exposed to employees automatically. Each evaluation
            requires explicit human approval, verified evidence inspection, and executive sign-off.
          </p>
        </div>
      </div>

      {/* Pending Reviews Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold text-[#747D75] uppercase tracking-wider">
          Awaiting Sign-off ({pendingReviews.length})
        </h2>

        {pendingReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingReviews.map(review => (
              <Card key={review.id} className="flex flex-col justify-between hover:border-[#D0D4CA] transition-all">
                <CardHeader>
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={review.status === 'Changes Requested' ? 'rose' : 'amber'}
                        dot
                      >
                        {review.status}
                      </Badge>
                      <span className="text-[10px] text-[#747D75]">
                        Cycle: {review.reviewCycleTitle}
                      </span>
                    </div>
                    <CardTitle className="text-base mt-1.5">
                      {review.employeeName}
                    </CardTitle>
                    <CardDescription>
                      {review.jobTitle} • {review.departmentName}
                    </CardDescription>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-[#747D75]">Proposed Score:</span>
                    <div className="text-sm font-extrabold text-[#17251F]">
                      {review.overallRating} / 5.0
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Summary excerpt */}
                  <div className="p-3 bg-[#FAFBF8] rounded-xl border border-[#E6E8E1] space-y-1">
                    <span className="text-[10px] font-bold text-[#747D75] uppercase">
                      Executive Summary Preview
                    </span>
                    <p className="text-xs text-[#202820] leading-relaxed line-clamp-3">
                      {review.sections.overallSummary.content}
                    </p>
                  </div>

                  {/* Quality & Evidence Indicators */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-[#EEF9D1] border border-[#D6EFA0] rounded-lg">
                      <div className="text-[10px] text-[#2C5E1A] font-bold uppercase">Evidence Coverage</div>
                      <div className="text-sm font-bold text-[#2C5E1A] mt-0.5">
                        {review.evidenceCoverageScore}% Backed
                      </div>
                    </div>
                    <div className="p-2.5 bg-[#FAFBF8] border border-[#E6E8E1] rounded-lg">
                      <div className="text-[10px] text-[#747D75] font-bold uppercase">Unsupported Claims</div>
                      <div className="text-sm font-bold text-[#17251F] mt-0.5">
                        0 Flagged
                      </div>
                    </div>
                  </div>

                  {review.managerFeedbackNotes && (
                    <div className="p-2.5 bg-[#FEF6E7] border border-[#FBDCA8] rounded-lg text-xs text-[#92540D]">
                      <strong>Revision Note: </strong>
                      <span>{review.managerFeedbackNotes}</span>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="gap-2">
                  <Link href={`/reviews/${review.id}`} className="flex-1">
                    <Button size="sm" variant="secondary" className="w-full">
                      Inspect Details
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleOpenRequestChanges(review)}
                  >
                    Request Changes
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    leftIcon={<Check className="w-3.5 h-3.5 text-[#C8ED78]" />}
                    onClick={() => handleApprove(review)}
                  >
                    Approve
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<CheckCircle2 className="w-8 h-8 text-[#2C5E1A]" />}
            title="Approval Queue Clean"
            description="All synthesized performance reviews have been signed off by evaluating managers."
          />
        )}
      </div>

      {/* Previously Approved Reviews */}
      {approvedReviews.length > 0 && (
        <div className="space-y-3 pt-6 border-t border-[#E6E8E1]">
          <h2 className="text-xs font-bold text-[#747D75] uppercase tracking-wider">
            Approved & Calibrated Reviews ({approvedReviews.length})
          </h2>

          <div className="divide-y divide-[#E6E8E1] bg-white rounded-xl border border-[#E6E8E1] p-2">
            {approvedReviews.map(r => (
              <div key={r.id} className="p-3 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#17251F]">{r.employeeName}</div>
                  <div className="text-[11px] text-[#747D75]">{r.jobTitle} • Approved by: {r.approverName || 'Dr. Aris Thorne'}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={r.status === 'Released' ? 'blue' : 'lime'} dot>
                    {r.status}
                  </Badge>
                  <Link href={`/reviews/${r.id}`}>
                    <Button size="sm" variant="secondary">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Changes Modal */}
      <Modal
        isOpen={Boolean(selectedReviewForChanges)}
        onClose={() => setSelectedReviewForChanges(null)}
        title="Request Review Revision"
        description="Return review draft to the manager or synthesizer with specific revision notes."
        maxWidth="md"
      >
        <form onSubmit={handleConfirmRequestChanges} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#17251F] mb-1">
              Revision Notes & Areas to Recalibrate
            </label>
            <textarea
              rows={4}
              required
              value={changeNotes}
              onChange={e => setChangeNotes(e.target.value)}
              placeholder="e.g. Please rephrase Section 4 or include data from Q3 infrastructure audit..."
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl text-xs focus:ring-1 focus:ring-[#17251F]"
            />
          </div>

          <div className="pt-3 border-t border-[#E6E8E1] flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setSelectedReviewForChanges(null)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="danger" size="sm">
              Confirm Revision Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

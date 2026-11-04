'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/lib/storage/use-store';
import { PerformanceReview } from '@/types';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import {
  FileCheck2,
  Printer,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Send
} from 'lucide-react';

export default function ReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reviewId = params?.id as string;

  const { performanceReviews, savePerformanceReview, showToast } = useStore();

  const review = performanceReviews.find(r => r.id === reviewId);

  const [managerComments, setManagerComments] = useState(
    review?.managerFeedbackNotes || ''
  );

  if (!review) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <EmptyState
          icon={<FileCheck2 className="w-8 h-8 text-[#747D75]" />}
          title="Review Document Not Found"
          description="The requested review could not be located in the local repository."
          actionLabel="Back to Reviews"
          onAction={() => router.push('/reviews')}
        />
      </div>
    );
  }

  const sectionKeys: (keyof PerformanceReview['sections'])[] = [
    'overallSummary',
    'majorAchievements',
    'keyStrengths',
    'collaborationAndCommunication',
    'okrAchievementSummary',
    'areasForDevelopment',
    'futureGoals',
    'managerRecommendations'
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleSaveNotes = () => {
    savePerformanceReview({
      ...review,
      managerFeedbackNotes: managerComments
    });
    showToast('Saved manager review notes', 'success');
  };

  const handleApprove = () => {
    savePerformanceReview({
      ...review,
      status: 'Approved',
      approverName: 'Dr. Aris Thorne',
      approvedAt: new Date().toISOString()
    });
    showToast(`Approved performance review for ${review.employeeName}`, 'success');
  };

  const handleRelease = () => {
    savePerformanceReview({
      ...review,
      status: 'Released',
      releasedAt: new Date().toISOString()
    });
    showToast(`Released performance review to ${review.employeeName}`, 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header & Navigation Actions (Hidden during print) */}
      <div className="flex items-center justify-between no-print">
        <Link
          href="/reviews"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#747D75] hover:text-[#17251F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Reviews</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Printer className="w-3.5 h-3.5" />}
            onClick={handlePrint}
          >
            Export / Print PDF
          </Button>

          <Link href={`/ai-review-studio?employeeId=${review.employeeId}`}>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#17251F]" />}
            >
              Open in Studio
            </Button>
          </Link>

          {review.status === 'Pending Approval' && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-[#C8ED78]" />}
              onClick={handleApprove}
            >
              Approve Review
            </Button>
          )}

          {review.status === 'Approved' && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Send className="w-3.5 h-3.5 text-[#C8ED78]" />}
              onClick={handleRelease}
            >
              Release to Employee
            </Button>
          )}
        </div>
      </div>

      {/* Printable Formal Review Report Document */}
      <div className="bg-[#FFFFFF] border border-[#E6E8E1] rounded-2xl shadow-sm p-8 sm:p-12 space-y-8 card-print">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-[#17251F]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded bg-[#17251F] text-[#C8ED78] flex items-center justify-center font-bold text-xs">
                RF
              </div>
              <span className="font-bold text-sm tracking-tight text-[#17251F]">
                ReviewForge Enterprise Performance Document
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#17251F]">
              {review.employeeName}
            </h1>
            <p className="text-xs text-[#747D75] mt-0.5">
              {review.jobTitle} • {review.departmentName}
            </p>
          </div>

          <div className="text-right sm:text-right space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#747D75]">
              {review.reviewCycleTitle}
            </span>
            <div className="flex items-center sm:justify-end gap-2 mt-1">
              <span className="text-xs text-[#747D75]">Final Rating:</span>
              <span className="px-3 py-1 rounded-lg bg-[#17251F] text-[#C8ED78] font-extrabold text-sm">
                {review.overallRating} / 5.0
              </span>
            </div>
            <div className="text-[11px] font-semibold text-[#2C5E1A]">
              Evidence Coverage: {review.evidenceCoverageScore}%
            </div>
          </div>
        </div>

        {/* Metadata summary bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#747D75]">Review Status</span>
            <div className="font-bold text-[#17251F] mt-0.5">{review.status}</div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#747D75]">Generated On</span>
            <div className="font-mono text-[#17251F] mt-0.5">
              {new Date(review.generatedAt).toLocaleDateString()}
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#747D75]">Approver</span>
            <div className="font-semibold text-[#17251F] mt-0.5">
              {review.approverName || 'Pending Signoff'}
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#747D75]">Synthesis Engine</span>
            <div className="font-mono text-[10px] text-[#747D75] mt-0.5 truncate">
              {review.synthesisEngine}
            </div>
          </div>
        </div>

        {/* 8 Formal Sections */}
        <div className="space-y-7">
          {sectionKeys.map((k, index) => {
            const section = review.sections[k];
            return (
              <div key={k} className="space-y-2 print-avoid-break">
                <div className="flex items-center gap-2 pb-1 border-b border-[#E6E8E1]">
                  <span className="w-5 h-5 rounded-full bg-[#17251F] text-[#C8ED78] flex items-center justify-center font-bold text-[10px]">
                    {index + 1}
                  </span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#17251F]">
                    {section.title}
                  </h3>
                </div>

                <p className="text-xs text-[#202820] leading-relaxed">
                  {section.content}
                </p>

                {section.evidenceRefs.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {section.evidenceRefs.map(ev => (
                      <span
                        key={ev.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FAFBF8] border border-[#CADACD] text-[10px] text-[#17251F]"
                      >
                        <strong>{ev.sourceType}:</strong> {ev.sourceTitle}
                        {ev.metrics && (
                          <span className="font-bold text-[#2C5E1A]">({ev.metrics})</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Manager Comments & Signoff Section */}
        <div className="pt-6 border-t-2 border-[#E6E8E1] space-y-4 print-avoid-break">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#17251F]">
            Manager Comments & Final Sign-Off
          </h3>

          <div className="no-print">
            <textarea
              rows={3}
              value={managerComments}
              onChange={e => setManagerComments(e.target.value)}
              placeholder="Add manager calibration commentary or signing notes..."
              className="w-full p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl text-xs focus:ring-1 focus:ring-[#17251F]"
            />
            <div className="mt-2 flex justify-end">
              <Button size="sm" variant="secondary" onClick={handleSaveNotes}>
                Save Manager Comments
              </Button>
            </div>
          </div>

          <div className="print-only text-xs text-[#202820] italic">
            &quot;{managerComments || review.managerFeedbackNotes}&quot;
          </div>

          {/* Formal Signature Box */}
          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-[#E6E8E1] text-xs">
            <div>
              <span className="text-[10px] text-[#747D75] uppercase font-bold">
                Evaluating Manager
              </span>
              <div className="mt-4 pt-1 border-b border-[#202820] font-semibold text-[#17251F]">
                {review.approverName || 'Dr. Aris Thorne (VP of Engineering)'}
              </div>
              <div className="text-[10px] text-[#747D75] mt-1 font-mono">
                Date: {review.approvedAt ? new Date(review.approvedAt).toLocaleDateString() : 'Pending'}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[#747D75] uppercase font-bold">
                Employee Acknowledgment
              </span>
              <div className="mt-4 pt-1 border-b border-[#202820] font-semibold text-[#17251F]">
                {review.employeeName}
              </div>
              <div className="text-[10px] text-[#747D75] mt-1 font-mono">
                Status: {review.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

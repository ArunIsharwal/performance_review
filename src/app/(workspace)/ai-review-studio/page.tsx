'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useStore } from '@/lib/storage/use-store';
import {
  PerformanceReview,
  EvidenceReference
} from '@/types';
import { LocalReviewSynthesizer, SynthesisQualityCheck } from '@/lib/ai-synthesizer/engine';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Modal } from '@/components/ui/modal';
import {
  Sparkles,
  Save,
  AlertTriangle,
  RotateCcw,
  Target,
  MessageSquareQuote,
  FileText,
  Lock,
  Eye,
  Send
} from 'lucide-react';

function AIReviewStudioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramEmpId = searchParams?.get('employeeId');

  const {
    employees,
    reviewCycles,
    okrs,
    feedback,
    selfReflections,
    managerNotes,
    performanceReviews,
    savePerformanceReview,
    showToast
  } = useStore();

  // Active employee selection
  const [selectedEmpId, setSelectedEmpId] = useState<string>(
    paramEmpId || 'emp-002' // default to Rahul Deshmukh
  );
  const activeCycle = reviewCycles.find(c => c.status === 'Active') || reviewCycles[0];

  const employee = employees.find(e => e.id === selectedEmpId) || employees[0];

  // Employee evidence
  const empOkrs = okrs.filter(o => o.employeeId === employee.id);
  const empFeedback = feedback.filter(f => f.targetEmployeeId === employee.id);
  const empReflection = selfReflections.find(r => r.employeeId === employee.id);
  const empNotes = managerNotes.filter(n => n.employeeId === employee.id);

  // Look for existing review or initialize
  const existingReview = performanceReviews.find(
    r => r.employeeId === employee.id && r.reviewCycleId === activeCycle?.id
  );

  const [currentReview, setCurrentReview] = useState<PerformanceReview | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceReference | null>(null);
  const [activeRightTab, setActiveRightTab] = useState<'inspector' | 'quality'>('inspector');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Quality evaluation
  const [qualityCheck, setQualityCheck] = useState<SynthesisQualityCheck | null>(null);

  // Load review on mount or employee change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (existingReview) {
        setCurrentReview(existingReview);
        if (existingReview.sections.majorAchievements.evidenceRefs.length > 0) {
          setSelectedEvidence(existingReview.sections.majorAchievements.evidenceRefs[0]);
        }
      } else {
        // Synthesize default review using local mock engine
        const synth = LocalReviewSynthesizer.synthesizeFullReview({
          employee,
          reviewCycleId: activeCycle?.id || 'cycle-2026-annual',
          reviewCycleTitle: activeCycle?.title || 'FY2026 Comprehensive Annual 360° Review',
          okrs: empOkrs,
          feedback: empFeedback,
          selfReflection: empReflection,
          managerNotes: empNotes
        });
        setCurrentReview(synth);
        if (synth.sections.majorAchievements.evidenceRefs.length > 0) {
          setSelectedEvidence(synth.sections.majorAchievements.evidenceRefs[0]);
        }
      }

      const check = LocalReviewSynthesizer.evaluateQuality({
        employee,
        reviewCycleId: activeCycle?.id || 'cycle-2026-annual',
        reviewCycleTitle: activeCycle?.title || 'FY2026 Comprehensive Annual 360° Review',
        okrs: empOkrs,
        feedback: empFeedback,
        selfReflection: empReflection,
        managerNotes: empNotes
      });
      setQualityCheck(check);
    }, 0);

    return () => clearTimeout(timer);
  }, [selectedEmpId]);

  // Handle Full Review Generation
  const handleGenerateFullReview = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = LocalReviewSynthesizer.synthesizeFullReview({
        employee,
        reviewCycleId: activeCycle?.id || 'cycle-2026-annual',
        reviewCycleTitle: activeCycle?.title || 'FY2026 Comprehensive Annual 360° Review',
        okrs: empOkrs,
        feedback: empFeedback,
        selfReflection: empReflection,
        managerNotes: empNotes
      });
      setCurrentReview(generated);
      if (generated.sections.majorAchievements.evidenceRefs.length > 0) {
        setSelectedEvidence(generated.sections.majorAchievements.evidenceRefs[0]);
      }
      setIsGenerating(false);
      showToast('Synthesized complete 8-section review with evidence links', 'success');
    }, 600);
  };

  // Handle Section Regeneration
  const handleRegenerateSection = (sectionKey: keyof PerformanceReview['sections']) => {
    if (!currentReview) return;
    setRegeneratingSection(sectionKey);
    setTimeout(() => {
      const regenerated = LocalReviewSynthesizer.regenerateSection(sectionKey, {
        employee,
        reviewCycleId: activeCycle?.id || 'cycle-2026-annual',
        reviewCycleTitle: activeCycle?.title || 'FY2026 Comprehensive Annual 360° Review',
        okrs: empOkrs,
        feedback: empFeedback,
        selfReflection: empReflection,
        managerNotes: empNotes
      });

      setCurrentReview({
        ...currentReview,
        sections: {
          ...currentReview.sections,
          [sectionKey]: regenerated
        }
      });
      if (regenerated.evidenceRefs.length > 0) {
        setSelectedEvidence(regenerated.evidenceRefs[0]);
      }
      setRegeneratingSection(null);
      showToast(`Regenerated section "${regenerated.title}"`, 'info');
    }, 450);
  };

  // Update Section Content
  const handleContentChange = (
    sectionKey: keyof PerformanceReview['sections'],
    newContent: string
  ) => {
    if (!currentReview) return;
    setCurrentReview({
      ...currentReview,
      sections: {
        ...currentReview.sections,
        [sectionKey]: {
          ...currentReview.sections[sectionKey],
          content: newContent
        }
      }
    });
  };

  // Save Draft
  const handleSaveDraft = () => {
    if (!currentReview) return;
    savePerformanceReview({
      ...currentReview,
      status: 'Draft'
    });
  };

  // Approve & Send to Approval Queue
  const handleSendToApproval = () => {
    if (!currentReview) return;
    savePerformanceReview({
      ...currentReview,
      status: 'Pending Approval'
    });
    showToast('Submitted review draft to Executive Approval Queue', 'success');
    router.push('/approvals');
  };

  if (!currentReview) return null;

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

  return (
    <div className="space-y-4 max-w-[1700px] mx-auto pb-12">
      {/* Top Banner & Control Bar */}
      <div className="bg-[#FFFFFF] border border-[#E6E8E1] rounded-2xl p-4 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#EEF9D1] border border-[#D6EFA0] rounded-xl text-[#17251F]">
            <Sparkles className="w-5 h-5 text-[#17251F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[#17251F] tracking-tight">
                AI Performance Review Studio
              </h1>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#FAFBF8] border border-[#E6E8E1] text-[#747D75]">
                {LocalReviewSynthesizer.ENGINE_LABEL}
              </span>
            </div>
            <p className="text-xs text-[#747D75] mt-0.5">
              Empirical document synthesizer. All claims backed by verified OKRs, peer ratings, and manager notes.
            </p>
          </div>
        </div>

        {/* Global Studio Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            isLoading={isGenerating}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={handleGenerateFullReview}
          >
            Regenerate Full Review
          </Button>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Eye className="w-3.5 h-3.5" />}
            onClick={() => setIsPreviewOpen(true)}
          >
            Preview Document
          </Button>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Save className="w-3.5 h-3.5" />}
            onClick={handleSaveDraft}
          >
            Save Draft
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Send className="w-3.5 h-3.5 text-[#C8ED78]" />}
            onClick={handleSendToApproval}
          >
            Submit for Approval
          </Button>
        </div>
      </div>

      {/* 3-Panel Document Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ============================================================== */}
        {/* LEFT PANEL: Employee Context & Evidence Sources (3 cols)        */}
        {/* ============================================================== */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="p-4 space-y-4">
            {/* Employee Selector */}
            <div>
              <label className="block text-[11px] font-bold text-[#747D75] uppercase tracking-wider mb-1.5">
                Target Employee
              </label>
              <select
                value={selectedEmpId}
                onChange={e => setSelectedEmpId(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl text-xs font-semibold text-[#17251F] focus:ring-1 focus:ring-[#17251F]"
              >
                {employees.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name} — {e.jobTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee Snapshot */}
            <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#17251F] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#C8ED78]">
                  {employee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="font-bold text-xs text-[#17251F]">{employee.name}</div>
                  <div className="text-[11px] text-[#747D75]">{employee.jobTitle}</div>
                  <div className="text-[10px] text-[#747D75]">{employee.departmentName}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E6E8E1] flex items-center justify-between text-[11px] text-[#747D75]">
                <span>Review Status:</span>
                <Badge variant="lime" dot className="text-[10px]">
                  {currentReview.status}
                </Badge>
              </div>
            </div>

            {/* Evidence Source Overview */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold text-[#747D75] uppercase tracking-wider">
                Available Evidence Inputs
              </span>

              {/* OKRs */}
              <div className="p-2.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#17251F]">
                  <Target className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Quarterly OKRs</span>
                </div>
                <span className="font-bold text-[#17251F]">{empOkrs.length} Quarters</span>
              </div>

              {/* 360 Feedback */}
              <div className="p-2.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#17251F]">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-[#5876D8]" />
                  <span>360° Peer Feedback</span>
                </div>
                <span className="font-bold text-[#17251F]">{empFeedback.length} Reviews</span>
              </div>

              {/* Self Reflection */}
              <div className="p-2.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#17251F]">
                  <FileText className="w-3.5 h-3.5 text-[#2C5E1A]" />
                  <span>Self-Reflection</span>
                </div>
                <span className={`text-[10px] font-bold ${empReflection ? 'text-[#2C5E1A]' : 'text-[#9E2A2B]'}`}>
                  {empReflection ? 'Verified' : 'Pending'}
                </span>
              </div>

              {/* Manager Notes */}
              <div className="p-2.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#17251F]">
                  <Lock className="w-3.5 h-3.5 text-[#17251F]" />
                  <span>Manager Notes</span>
                </div>
                <span className="font-bold text-[#17251F]">{empNotes.length} Entries</span>
              </div>
            </div>

            {/* Quick Timeline Highlights */}
            <div className="space-y-2 pt-2 border-t border-[#E6E8E1]">
              <span className="text-[10px] font-bold text-[#747D75] uppercase tracking-wider">
                Raw Input Timeline
              </span>
              <div className="space-y-1.5 text-[11px] text-[#747D75]">
                {empOkrs.slice(0, 2).map(o => (
                  <div key={o.id} className="p-2 bg-[#FAFBF8] rounded border border-[#E6E8E1] truncate">
                    <strong className="text-[#17251F]">{o.quarter}:</strong> {o.objective}
                  </div>
                ))}
                {empNotes.slice(0, 1).map(n => (
                  <div key={n.id} className="p-2 bg-[#FAFBF8] rounded border border-[#E6E8E1] truncate">
                    <strong className="text-[#17251F]">Note:</strong> {n.title}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* ============================================================== */}
        {/* CENTER PANEL: Generated Review Editor (6 cols)                 */}
        {/* ============================================================== */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="border-[#E6E8E1] overflow-hidden">
            {/* Document Header */}
            <div className="px-6 py-4 bg-[#FAFBF8] border-b border-[#E6E8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#5876D8] uppercase tracking-wider">
                  Review Document Draft
                </span>
                <h2 className="text-base font-bold text-[#17251F]">
                  {employee.name} • FY2026 Annual Performance Review
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#747D75]">Overall Score:</span>
                <div className="px-2.5 py-1 rounded-lg bg-[#17251F] text-[#C8ED78] font-bold text-xs">
                  {currentReview.overallRating} / 5.0
                </div>
              </div>
            </div>

            {/* 8 Generated Sections */}
            <div className="p-6 space-y-6">
              {sectionKeys.map((key, index) => {
                const section = currentReview.sections[key];
                const isRegenerating = regeneratingSection === key;

                return (
                  <div
                    key={key}
                    className="p-4 rounded-xl border border-[#E6E8E1] bg-[#FFFFFF] hover:border-[#D0D4CA] transition-all space-y-3"
                  >
                    {/* Section Top Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#17251F] text-[#C8ED78] flex items-center justify-center text-[10px] font-bold">
                          {index + 1}
                        </span>
                        <h3 className="text-xs font-bold text-[#17251F]">
                          {section.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          disabled={isRegenerating}
                          onClick={() => handleRegenerateSection(key)}
                          className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-[#747D75] hover:text-[#17251F] hover:bg-[#F0F2EB] rounded-md transition-colors cursor-pointer disabled:opacity-50"
                          title="Regenerate this section using local mock engine"
                        >
                          <RotateCcw className={`w-3 h-3 ${isRegenerating ? 'animate-spin' : ''}`} />
                          <span>Regenerate</span>
                        </button>
                      </div>
                    </div>

                    {/* Editable Text Area */}
                    <textarea
                      rows={3}
                      value={section.content}
                      onChange={e => handleContentChange(key, e.target.value)}
                      className="w-full p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-lg text-xs text-[#202820] leading-relaxed focus:bg-white focus:ring-1 focus:ring-[#17251F] transition-all"
                    />

                    {/* Evidence Badges linking to inspector */}
                    {section.evidenceRefs.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold text-[#747D75] uppercase tracking-wider">
                          Linked Evidence Citations (Click to inspect)
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {section.evidenceRefs.map(ev => {
                            const isSelected = selectedEvidence?.id === ev.id;
                            return (
                              <button
                                key={ev.id}
                                onClick={() => {
                                  setSelectedEvidence(ev);
                                  setActiveRightTab('inspector');
                                }}
                                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#17251F] text-white border-[#17251F]'
                                    : 'bg-[#FAFBF8] text-[#17251F] border-[#CADACD] hover:bg-[#EEF9D1]'
                                }`}
                              >
                                {ev.sourceType === 'OKR' && (
                                  <Target className="w-3 h-3 text-[#D97706]" />
                                )}
                                {ev.sourceType === 'PeerFeedback' && (
                                  <MessageSquareQuote className="w-3 h-3 text-[#5876D8]" />
                                )}
                                {ev.sourceType === 'ManagerObservation' && (
                                  <Lock className="w-3 h-3 text-[#17251F]" />
                                )}
                                {ev.sourceType === 'SelfReflection' && (
                                  <FileText className="w-3 h-3 text-[#2C5E1A]" />
                                )}
                                <span className="truncate max-w-[200px]">
                                  {ev.sourceTitle}
                                </span>
                                {ev.metrics && (
                                  <span className="text-[9px] font-bold px-1 rounded bg-[#C8ED78] text-[#17251F]">
                                    {ev.metrics}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {section.isFlaggedForReview && (
                      <div className="p-2 bg-[#FEF6E7] border border-[#FBDCA8] rounded text-[11px] text-[#92540D] flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>{section.flagReason || 'Requires manager calibration.'}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ============================================================== */}
        {/* RIGHT PANEL: Evidence Inspector & Quality Auditor (3 cols)     */}
        {/* ============================================================== */}
        <div className="lg:col-span-3 space-y-4 sticky top-20">
          <Card className="p-4 space-y-4">
            {/* Tab switch between Inspector & Quality */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveRightTab('inspector')}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeRightTab === 'inspector'
                    ? 'bg-[#17251F] text-white shadow-2xs'
                    : 'text-[#747D75] hover:text-[#17251F]'
                }`}
              >
                Evidence Inspector
              </button>
              <button
                onClick={() => setActiveRightTab('quality')}
                className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeRightTab === 'quality'
                    ? 'bg-[#17251F] text-white shadow-2xs'
                    : 'text-[#747D75] hover:text-[#17251F]'
                }`}
              >
                Quality Auditor
              </button>
            </div>

            {/* TAB 1: Evidence Inspector */}
            {activeRightTab === 'inspector' && (
              <div className="space-y-4">
                {selectedEvidence ? (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E6E8E1]">
                      <Badge variant="lime" dot>
                        {selectedEvidence.sourceType}
                      </Badge>
                      <span className="text-[11px] font-mono text-[#747D75]">
                        {selectedEvidence.sourceDate}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#17251F]">
                        {selectedEvidence.sourceTitle}
                      </h4>
                      {selectedEvidence.metrics && (
                        <div className="mt-1 text-xs font-bold text-[#2C5E1A] bg-[#EEF9D1] px-2 py-0.5 rounded w-fit">
                          Verified Metric: {selectedEvidence.metrics}
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl space-y-1.5">
                      <span className="text-[10px] font-bold text-[#747D75] uppercase tracking-wider">
                        Verbatim Source Excerpt
                      </span>
                      <p className="text-xs text-[#202820] leading-relaxed italic">
                        &quot;{selectedEvidence.excerpt}&quot;
                      </p>
                    </div>

                    <div className="p-3 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl text-xs space-y-1 text-[#747D75]">
                      <div className="flex justify-between">
                        <span>Source Entity ID:</span>
                        <span className="font-mono text-[#17251F]">{selectedEvidence.sourceId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Traceability:</span>
                        <span className="font-semibold text-[#2C5E1A]">100% Backed</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-[#747D75]">
                    Click any linked evidence pill in the review to inspect its original record.
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Quality & Governance Auditor */}
            {activeRightTab === 'quality' && qualityCheck && (
              <div className="space-y-4 text-xs">
                {/* Coverage Score */}
                <div className="p-3.5 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl space-y-2">
                  <div className="flex items-center justify-between font-bold text-[#17251F]">
                    <span>Evidence Coverage</span>
                    <span className="text-base text-[#17251F] font-extrabold">
                      {qualityCheck.overallCoverageScore}%
                    </span>
                  </div>
                  <ProgressBar
                    value={qualityCheck.overallCoverageScore}
                    size="sm"
                    colorScheme={qualityCheck.overallCoverageScore > 80 ? 'forest' : 'amber'}
                  />
                  <p className="text-[10px] text-[#747D75]">
                    Empirical score calculated from OKRs, multi-rater feedback, and self-reflection presence.
                  </p>
                </div>

                {/* Audit Checklist */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#747D75] uppercase tracking-wider">
                    Governance Checklist
                  </span>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAFBF8] border border-[#E6E8E1]">
                    <span>Unsupported Claims</span>
                    <span className="font-bold text-[#2C5E1A]">0 Detected</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAFBF8] border border-[#E6E8E1]">
                    <span>Conflicting Feedback</span>
                    <span className="font-bold text-[#2C5E1A]">
                      {qualityCheck.conflictingFeedbackDetected ? 'Flagged' : 'None'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#FAFBF8] border border-[#E6E8E1]">
                    <span>Manager In The Loop</span>
                    <span className="font-bold text-[#17251F]">Mandatory</span>
                  </div>
                </div>

                {/* Missing Data Flags */}
                {qualityCheck.missingEvidenceFlags.length > 0 && (
                  <div className="p-3 bg-[#FEF6E7] border border-[#FBDCA8] rounded-xl space-y-1.5">
                    <div className="font-bold text-[#92540D] flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Data Gaps Identified</span>
                    </div>
                    {qualityCheck.missingEvidenceFlags.map((flag, idx) => (
                      <p key={idx} className="text-[10px] text-[#92540D]/90 leading-tight">
                        • {flag}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Performance Review Document Preview"
        description="Formatted preview ready for executive calibration and export."
        maxWidth="xl"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#17251F]">{employee.name}</h2>
              <p className="text-[11px] text-[#747D75]">{employee.jobTitle} • {employee.departmentName}</p>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-[#17251F]">Rating: {currentReview.overallRating} / 5.0</div>
              <Badge variant="lime" dot className="mt-1">{currentReview.status}</Badge>
            </div>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {sectionKeys.map((k, i) => (
              <div key={k} className="border-b border-[#E6E8E1] pb-3 last:border-b-0">
                <h4 className="font-bold text-[#17251F] mb-1">
                  {i + 1}. {currentReview.sections[k].title}
                </h4>
                <p className="text-[#747D75] leading-relaxed">
                  {currentReview.sections[k].content}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E6E8E1] flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setIsPreviewOpen(false)}>
              Close Preview
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsPreviewOpen(false);
                handleSendToApproval();
              }}
            >
              Submit for Approval
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function AIReviewStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-[#747D75]">
          Loading ReviewForge AI Review Studio workspace...
        </div>
      }
    >
      <AIReviewStudioContent />
    </Suspense>
  );
}

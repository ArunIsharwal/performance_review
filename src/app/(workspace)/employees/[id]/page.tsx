'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/lib/storage/use-store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { ProgressBar } from '@/components/ui/progress-bar';
import { EmptyState } from '@/components/ui/empty-state';
import {
  User,
  ArrowLeft,
  Sparkles,
  Building,
  Mail,
  MapPin,
  Calendar,
  Target,
  MessageSquareQuote,
  StickyNote,
  FileCheck2,
  Lock,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award
} from 'lucide-react';

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params?.id as string;

  const {
    employees,
    okrs,
    feedback,
    selfReflections,
    managerNotes,
    performanceReviews,
    activeRole
  } = useStore();

  const [activeTab, setActiveTab] = useState('overview');

  const employee = employees.find(e => e.id === employeeId);

  if (!employee) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <EmptyState
          icon={<User className="w-8 h-8 text-[#747D75]" />}
          title="Employee Not Found"
          description="The requested employee record does not exist or has been removed."
          actionLabel="Back to Employee Directory"
          onAction={() => router.push('/employees')}
        />
      </div>
    );
  }

  // Filter records for this employee
  const employeeOkrs = okrs.filter(o => o.employeeId === employee.id);
  const employeeFeedback = feedback.filter(f => f.targetEmployeeId === employee.id);
  const employeeReflection = selfReflections.find(r => r.employeeId === employee.id);
  // Manager notes: strictly filtered by activeRole in the repository/store
  const employeeNotes = (activeRole === 'manager' || activeRole === 'hr_admin')
    ? managerNotes.filter(n => n.employeeId === employee.id)
    : [];
  const employeeReviews = performanceReviews.filter(r => r.employeeId === employee.id);

  // Average OKR progress
  const avgOkr = employeeOkrs.length > 0
    ? Math.round(employeeOkrs.reduce((a, b) => a + b.overallProgress, 0) / employeeOkrs.length)
    : 0;

  // Tabs
  const tabs = [
    { id: 'overview', label: 'Performance Summary' },
    { id: 'okrs', label: 'Quarterly OKRs', count: employeeOkrs.length },
    { id: 'feedback', label: '360° Peer Feedback', count: employeeFeedback.length },
    { id: 'self-reflection', label: 'Self-Reflection', count: employeeReflection ? 1 : 0 },
    ...(activeRole === 'manager' || activeRole === 'hr_admin'
      ? [{ id: 'notes', label: 'Private Manager Notes', count: employeeNotes.length }]
      : []),
    { id: 'reviews', label: 'Review History', count: employeeReviews.length }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/employees"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#747D75] hover:text-[#17251F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Directory</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link href={`/ai-review-studio?employeeId=${employee.id}`}>
            <Button
              variant="accent"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#17251F]" />}
            >
              Synthesize Review in AI Studio
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Header Banner */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#17251F] text-white flex items-center justify-center font-bold text-xl ring-4 ring-[#EEF9D1]">
              {employee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-[#17251F]">{employee.name}</h1>
                <Badge variant="lime" dot>
                  {employee.reviewStatus}
                </Badge>
              </div>
              <p className="text-xs text-[#747D75] mt-0.5">
                {employee.jobTitle} • {employee.departmentName}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-[#747D75]">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {employee.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {employee.location}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5" />
                  Joined {employee.joinDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-end gap-1.5 p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl text-right">
            <span className="text-[10px] uppercase font-bold text-[#747D75]">
              Manager / Lead
            </span>
            <span className="text-xs font-semibold text-[#17251F]">
              {employee.managerName || 'Executive Committee'}
            </span>
            <span className="text-[10px] font-mono text-[#747D75]">
              ID: {employee.employeeNumber}
            </span>
          </div>
        </div>

        {/* Skills & Bio */}
        <div className="mt-5 pt-4 border-t border-[#E6E8E1] flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="text-xs text-[#747D75] max-w-2xl leading-relaxed">
            {employee.bio}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {employee.skills.map(s => (
              <span
                key={s}
                className="px-2 py-0.5 rounded-md bg-[#FAFBF8] border border-[#E6E8E1] text-[11px] font-medium text-[#17251F]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left summary stats */}
          <div className="md:col-span-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary & Calibration</CardTitle>
                <Badge variant="forest">Annual Overview</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl">
                    <span className="text-[10px] text-[#747D75] uppercase font-bold">
                      Average OKR Progress
                    </span>
                    <div className="text-xl font-bold text-[#17251F] mt-1">{avgOkr}%</div>
                    <ProgressBar value={avgOkr} size="sm" colorScheme="forest" className="mt-2" />
                  </div>
                  <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl">
                    <span className="text-[10px] text-[#747D75] uppercase font-bold">
                      360 Feedback
                    </span>
                    <div className="text-xl font-bold text-[#5876D8] mt-1">
                      {employeeFeedback.length} Reviews
                    </div>
                    <span className="text-[10px] text-[#747D75]">Multi-rater input</span>
                  </div>
                  <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl">
                    <span className="text-[10px] text-[#747D75] uppercase font-bold">
                      Review Status
                    </span>
                    <div className="text-base font-bold text-[#17251F] mt-1">
                      {employee.reviewStatus}
                    </div>
                    <span className="text-[10px] text-[#2C5E1A]">FY2026 Active</span>
                  </div>
                </div>

                <div className="p-4 bg-[#FAFBF8] rounded-xl border border-[#E6E8E1] space-y-2">
                  <span className="text-xs font-bold text-[#17251F]">
                    Synthesizer Evidence Readiness
                  </span>
                  <p className="text-xs text-[#747D75] leading-relaxed">
                    This employee has {employeeOkrs.length} quarterly OKR record(s), {employeeFeedback.length} peer feedback review(s), and {employeeReflection ? 'a submitted self-reflection' : 'no self-reflection yet'}. Ready for evidence-linked synthesis in the AI Review Studio.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Milestone & Achievement Timeline</CardTitle>
                <Award className="w-4 h-4 text-[#D97706]" />
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E6E8E1]">
                  <div className="relative">
                    <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#17251F] ring-4 ring-white" />
                    <span className="text-[11px] font-mono text-[#747D75]">October 2026</span>
                    <div className="text-xs font-bold text-[#17251F] mt-0.5">
                      Submitted Annual Self-Reflection
                    </div>
                    <p className="text-xs text-[#747D75] mt-1">
                      Documented major infrastructure deliveries and identified growth goals for upcoming year.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#C8ED78] ring-4 ring-white" />
                    <span className="text-[11px] font-mono text-[#747D75]">June 2026</span>
                    <div className="text-xs font-bold text-[#17251F] mt-0.5">
                      Surpassed Q2 API Latency Target (31.5% Gain)
                    </div>
                    <p className="text-xs text-[#747D75] mt-1">
                      Reduced P99 response times across core endpoints, saving monthly database IOPS costs.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#5876D8] ring-4 ring-white" />
                    <span className="text-[11px] font-mono text-[#747D75]">March 2026</span>
                    <div className="text-xs font-bold text-[#17251F] mt-0.5">
                      Completed Core Kafka Event Broker Migration
                    </div>
                    <p className="text-xs text-[#747D75] mt-1">
                      Zero dropped events achieved during high-throughput stress testing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar quick links */}
          <div className="md:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Synthesis Actions</CardTitle>
                <Sparkles className="w-4 h-4 text-[#17251F]" />
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-[#747D75] leading-relaxed">
                  Synthesize an evidence-backed annual review draft from all {employee.name}&apos;s records.
                </p>
                <Link href={`/ai-review-studio?employeeId=${employee.id}`} className="block">
                  <Button variant="accent" size="sm" className="w-full">
                    Launch Review Studio
                  </Button>
                </Link>
                {employeeReviews.length > 0 && (
                  <Link href={`/reviews/${employeeReviews[0].id}`} className="block">
                    <Button variant="secondary" size="sm" className="w-full">
                      View Existing Review ({employeeReviews[0].status})
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tab: OKRs */}
      {activeTab === 'okrs' && (
        <div className="space-y-4">
          {employeeOkrs.length > 0 ? (
            employeeOkrs.map(okr => (
              <Card key={okr.id} className="p-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6E8E1]">
                  <div>
                    <span className="text-[10px] font-bold text-[#5876D8] uppercase tracking-wider">
                      {okr.quarter} {okr.year} Objective
                    </span>
                    <h3 className="text-sm font-bold text-[#17251F] mt-0.5">
                      {okr.objective}
                    </h3>
                  </div>
                  <Badge variant={okr.status === 'Completed' ? 'lime' : 'forest'} dot>
                    {okr.overallProgress}% • {okr.status}
                  </Badge>
                </div>

                <div className="mt-4 space-y-3">
                  <span className="text-[10px] font-bold text-[#747D75] uppercase tracking-wider">
                    Key Results ({okr.keyResults.length})
                  </span>
                  {okr.keyResults.map(kr => (
                    <div
                      key={kr.id}
                      className="p-3 bg-[#FAFBF8] rounded-xl border border-[#E6E8E1] space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#17251F]">{kr.title}</span>
                        <span className="font-mono text-[#747D75]">
                          {kr.actualValue}{kr.unit} / {kr.targetValue}{kr.unit} ({kr.completionPercentage}%)
                        </span>
                      </div>
                      <ProgressBar value={kr.completionPercentage} size="sm" colorScheme="forest" />
                    </div>
                  ))}
                </div>
              </Card>
            ))
          ) : (
            <EmptyState
              icon={<Target className="w-8 h-8 text-[#747D75]" />}
              title="No OKRs Assigned"
              description="No quarterly objectives have been logged for this employee."
            />
          )}
        </div>
      )}

      {/* Tab: Feedback */}
      {activeTab === 'feedback' && (
        <div className="space-y-4">
          {employeeFeedback.length > 0 ? (
            employeeFeedback.map(fb => (
              <Card key={fb.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E6E8E1]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#17251F]">
                      {fb.isAnonymous && activeRole === 'employee'
                        ? 'Anonymous Colleague'
                        : fb.providerEmployeeName}
                    </span>
                    <span className="text-[11px] text-[#747D75]">
                      ({fb.providerRole})
                    </span>
                    {fb.isAnonymous && (
                      <Badge variant="outline" className="text-[10px]">
                        Anonymous Feedback
                      </Badge>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-[#747D75]">
                    {fb.submittedAt}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs py-1">
                  <div className="p-2 bg-[#FAFBF8] rounded-lg border border-[#E6E8E1]">
                    <div className="text-[10px] text-[#747D75]">Collab</div>
                    <div className="font-bold text-[#17251F]">{fb.ratings.collaboration}/5</div>
                  </div>
                  <div className="p-2 bg-[#FAFBF8] rounded-lg border border-[#E6E8E1]">
                    <div className="text-[10px] text-[#747D75]">Comm</div>
                    <div className="font-bold text-[#17251F]">{fb.ratings.communication}/5</div>
                  </div>
                  <div className="p-2 bg-[#FAFBF8] rounded-lg border border-[#E6E8E1]">
                    <div className="text-[10px] text-[#747D75]">Problem</div>
                    <div className="font-bold text-[#17251F]">{fb.ratings.problemSolving}/5</div>
                  </div>
                  <div className="p-2 bg-[#FAFBF8] rounded-lg border border-[#E6E8E1]">
                    <div className="text-[10px] text-[#747D75]">Technical</div>
                    <div className="font-bold text-[#17251F]">{fb.ratings.technicalContribution}/5</div>
                  </div>
                  <div className="p-2 bg-[#FAFBF8] rounded-lg border border-[#E6E8E1]">
                    <div className="text-[10px] text-[#747D75]">Leadership</div>
                    <div className="font-bold text-[#17251F]">{fb.ratings.leadership}/5</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-[#2C5E1A]">Key Strengths: </span>
                    <span className="text-[#202820]">{fb.strengths}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#92540D]">Areas for Improvement: </span>
                    <span className="text-[#202820]">{fb.improvements}</span>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <EmptyState
              icon={<MessageSquareQuote className="w-8 h-8 text-[#747D75]" />}
              title="No Peer Feedback"
              description="No 360 feedback reviews have been submitted for this employee yet."
            />
          )}
        </div>
      )}

      {/* Tab: Self-Reflection */}
      {activeTab === 'self-reflection' && (
        <div>
          {employeeReflection ? (
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E8E1]">
                <div>
                  <span className="text-[10px] font-bold text-[#5876D8] uppercase tracking-wider">
                    {employeeReflection.period} Self-Assessment
                  </span>
                  <h3 className="text-sm font-bold text-[#17251F]">
                    Submitted by {employee.name}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#747D75]">
                  {employeeReflection.submittedAt}
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-[#17251F] mb-1">Major Achievements</h4>
                  <p className="text-[#747D75] leading-relaxed whitespace-pre-line bg-[#FAFBF8] p-3 rounded-lg border border-[#E6E8E1]">
                    {employeeReflection.majorAchievements}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#17251F] mb-1">Key Projects Delivered</h4>
                  <p className="text-[#747D75] leading-relaxed whitespace-pre-line bg-[#FAFBF8] p-3 rounded-lg border border-[#E6E8E1]">
                    {employeeReflection.keyProjects}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#17251F] mb-1">Skills Developed</h4>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {employeeReflection.skillsDeveloped.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-[#EEF9D1] text-[#17251F] font-semibold text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-[#17251F] mb-1">Future Career Goals</h4>
                  <p className="text-[#747D75] leading-relaxed bg-[#FAFBF8] p-3 rounded-lg border border-[#E6E8E1]">
                    {employeeReflection.futureGoals}
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <EmptyState
              icon={<User className="w-8 h-8 text-[#747D75]" />}
              title="No Self-Reflection"
              description="This employee has not submitted an annual self-reflection for this cycle."
            />
          )}
        </div>
      )}

      {/* Tab: Private Manager Notes (Visible only to Manager & HR) */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="p-3 bg-[#FEF6E7] border border-[#FBDCA8] rounded-xl flex items-center gap-2.5 text-xs text-[#92540D]">
            <Lock className="w-4 h-4 shrink-0" />
            <span>
              <strong>Confidential Manager Journal:</strong> These observations are visible only to managers and HR administrators. They are strictly hidden from employees.
            </span>
          </div>

          {employeeNotes.length > 0 ? (
            employeeNotes.map(note => (
              <Card key={note.id} className="p-5 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#E6E8E1]">
                  <div>
                    <span className="text-[10px] font-bold text-[#92540D] bg-[#FEF6E7] px-2 py-0.5 rounded uppercase">
                      {note.category}
                    </span>
                    <h4 className="text-xs font-bold text-[#17251F] mt-1.5">
                      {note.title}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-[#747D75]">{note.date}</span>
                </div>
                <p className="text-xs text-[#747D75] leading-relaxed">
                  {note.description}
                </p>
                {note.evidenceRef && (
                  <div className="text-[11px] text-[#5876D8] font-mono pt-1">
                    Evidence Ref: {note.evidenceRef}
                  </div>
                )}
              </Card>
            ))
          ) : (
            <EmptyState
              icon={<StickyNote className="w-8 h-8 text-[#747D75]" />}
              title="No Manager Observations"
              description="No private observations have been logged for this employee."
            />
          )}
        </div>
      )}

      {/* Tab: Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {employeeReviews.length > 0 ? (
            employeeReviews.map(rev => (
              <Card key={rev.id} className="p-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#17251F]">
                      {rev.reviewCycleTitle}
                    </h3>
                    <Badge variant={rev.status === 'Approved' ? 'lime' : 'amber'} dot>
                      {rev.status}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-[#747D75] mt-1">
                    Rating: {rev.overallRating} / 5.0 • Evidence Score: {rev.evidenceCoverageScore}% • Engine: {rev.synthesisEngine}
                  </p>
                </div>
                <Link href={`/reviews/${rev.id}`}>
                  <Button size="sm" variant="secondary">
                    View Full Review
                  </Button>
                </Link>
              </Card>
            ))
          ) : (
            <EmptyState
              icon={<FileCheck2 className="w-8 h-8 text-[#747D75]" />}
              title="No Reviews Found"
              description="No synthesized performance reviews exist yet for this employee."
              actionLabel="Synthesize in AI Studio"
              onAction={() => router.push(`/ai-review-studio?employeeId=${employee.id}`)}
            />
          )}
        </div>
      )}
    </div>
  );
}


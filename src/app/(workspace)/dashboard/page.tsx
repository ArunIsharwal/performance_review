'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storage/use-store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import {
  Users,
  CalendarDays,
  FileCheck2,
  Clock,
  MessageSquareQuote,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Building,
  Target,
  ChevronRight
} from 'lucide-react';

export default function DashboardPage() {
  const {
    employees,
    reviewCycles,
    performanceReviews,
    feedback,
    departments,
    auditLogs,
    activeRole
  } = useStore();

  const activeCycle = reviewCycles.find(c => c.status === 'Active') || reviewCycles[0];
  const totalEmployees = employees.length;
  const completedReviews = performanceReviews.filter(
    r => r.status === 'Approved' || r.status === 'Released'
  ).length;
  const pendingReviews = performanceReviews.filter(
    r => r.status === 'Pending Approval' || r.status === 'Draft'
  ).length;
  const feedbackResponses = feedback.filter(f => f.status === 'Submitted').length;

  const completionPercentage = Math.round((completedReviews / Math.max(1, totalEmployees)) * 100);

  // Status counts
  const draftCount = performanceReviews.filter(r => r.status === 'Draft').length;
  const pendingApprovalCount = performanceReviews.filter(r => r.status === 'Pending Approval').length;
  const approvedCount = performanceReviews.filter(r => r.status === 'Approved').length;
  const releasedCount = performanceReviews.filter(r => r.status === 'Released').length;

  // Manager action queue: reviews pending approval
  const actionQueue = performanceReviews.filter(r => r.status === 'Pending Approval');

  // Employees requiring attention (e.g. review not started or pending feedback)
  const attentionEmployees = employees.filter(
    e => e.reviewStatus === 'Not Started' || e.reviewStatus === 'In Progress'
  ).slice(0, 4);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E8E1]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#17251F]">
              Performance Intelligence Overview
            </h1>
            <Badge variant="forest">Live Workspace</Badge>
          </div>
          <p className="text-xs text-[#747D75] mt-1">
            Active Cycle: <span className="font-semibold text-[#17251F]">{activeCycle?.title}</span> • Period: {activeCycle?.period}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/ai-review-studio">
            <Button
              variant="accent"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#17251F]" />}
            >
              Open AI Review Studio
            </Button>
          </Link>
          <Link href="/approvals">
            <Button variant="secondary" size="sm">
              Approval Queue ({actionQueue.length})
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          subtitle="Across 3 departments"
          icon={<Users className="w-4 h-4 text-[#17251F]" />}
        />
        <StatCard
          title="Active Review Cycle"
          value={activeCycle ? activeCycle.period : 'None'}
          subtitle={`${activeCycle?.eligibleEmployeesCount || 0} eligible participants`}
          badgeLabel={activeCycle?.status || 'Active'}
          icon={<CalendarDays className="w-4 h-4 text-[#5876D8]" />}
        />
        <StatCard
          title="Reviews Completed"
          value={completedReviews}
          change="+14% vs Q3"
          isPositive={true}
          subtitle={`${completionPercentage}% of organization`}
          icon={<FileCheck2 className="w-4 h-4 text-[#2C5E1A]" />}
        />
        <StatCard
          title="Reviews In Queue"
          value={pendingReviews}
          subtitle={`${actionQueue.length} awaiting sign-off`}
          icon={<Clock className="w-4 h-4 text-[#D97706]" />}
        />
        <StatCard
          title="Feedback Submitted"
          value={feedbackResponses}
          change="92% response rate"
          isPositive={true}
          subtitle="360° multi-rater inputs"
          icon={<MessageSquareQuote className="w-4 h-4 text-[#5876D8]" />}
        />
      </div>

      {/* Main Grid: Progress & Department Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col (8 cols): Progress + Depts + Action Queue */}
        <div className="lg:col-span-8 space-y-6">
          {/* Review Completion Progress Card */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Review Cycle Completion & Calibration</CardTitle>
                <CardDescription>
                  Tracking synthesis and manager sign-off progression for {activeCycle?.title}
                </CardDescription>
              </div>
              <Badge variant="lime" dot>
                On Schedule
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-[#17251F]">
                <span>Overall Cycle Progress</span>
                <span className="text-sm font-bold text-[#17251F]">{completionPercentage}%</span>
              </div>
              <ProgressBar value={completionPercentage} size="lg" colorScheme="forest" />

              {/* Status Breakdown Bar */}
              <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                <div className="p-2.5 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl">
                  <span className="text-[10px] text-[#747D75] uppercase font-bold">Drafts</span>
                  <div className="text-lg font-bold text-[#17251F] mt-0.5">{draftCount}</div>
                </div>
                <div className="p-2.5 bg-[#FEF6E7] border border-[#FBDCA8] rounded-xl">
                  <span className="text-[10px] text-[#92540D] uppercase font-bold">Pending Signoff</span>
                  <div className="text-lg font-bold text-[#92540D] mt-0.5">{pendingApprovalCount}</div>
                </div>
                <div className="p-2.5 bg-[#EEF9D1] border border-[#D6EFA0] rounded-xl">
                  <span className="text-[10px] text-[#2C5E1A] uppercase font-bold">Approved</span>
                  <div className="text-lg font-bold text-[#2C5E1A] mt-0.5">{approvedCount}</div>
                </div>
                <div className="p-2.5 bg-[#EEF2FC] border border-[#D3DDF6] rounded-xl">
                  <span className="text-[10px] text-[#344E9E] uppercase font-bold">Released</span>
                  <div className="text-lg font-bold text-[#344E9E] mt-0.5">{releasedCount}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Department-Wise Performance Breakdown */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Department-Wise Performance & OKR Calibration</CardTitle>
                <CardDescription>
                  Average goal achievement and review cycle progress across squads
                </CardDescription>
              </div>
              <Link href="/departments" className="text-xs text-[#5876D8] hover:underline font-medium">
                View all departments
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map(dept => {
                  return (
                    <div
                      key={dept.id}
                      className="p-3.5 rounded-xl border border-[#E6E8E1] bg-[#FAFBF8] hover:bg-[#FFFFFF] transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Building className="w-4 h-4 text-[#747D75]" />
                          <div>
                            <span className="text-xs font-bold text-[#17251F]">
                              {dept.name}
                            </span>
                            <span className="text-[11px] text-[#747D75] ml-2">
                              Lead: {dept.headName}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#17251F]">
                          {dept.employeeCount} Members
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="flex justify-between text-[11px] text-[#747D75] mb-1">
                            <span>Average OKR Progress</span>
                            <span className="font-semibold text-[#17251F]">{dept.averageOkrCompletion}%</span>
                          </div>
                          <ProgressBar value={dept.averageOkrCompletion} size="sm" colorScheme="lime" />
                        </div>
                        <div>
                          <div className="flex justify-between text-[11px] text-[#747D75] mb-1">
                            <span>Review Progress</span>
                            <span className="font-semibold text-[#17251F]">78%</span>
                          </div>
                          <ProgressBar value={78} size="sm" colorScheme="forest" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Manager Action Queue */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>Manager Action Queue</CardTitle>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#FEF6E7] text-[#92540D]">
                  {actionQueue.length} Pending
                </span>
              </div>
              <Link href="/approvals" className="text-xs text-[#5876D8] hover:underline font-medium">
                Open Approvals
              </Link>
            </CardHeader>
            <CardContent>
              {actionQueue.length > 0 ? (
                <div className="divide-y divide-[#E6E8E1]">
                  {actionQueue.map(review => (
                    <div
                      key={review.id}
                      className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#17251F] text-[#FFFFFF] flex items-center justify-center font-bold text-xs">
                          {review.employeeName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#17251F]">
                            {review.employeeName}
                          </div>
                          <div className="text-[11px] text-[#747D75]">
                            {review.jobTitle} • Score: {review.overallRating} • Evidence: {review.evidenceCoverageScore}%
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="amber" dot>
                          Pending Approval
                        </Badge>
                        <Link href={`/reviews/${review.id}`}>
                          <Button size="sm" variant="secondary">
                            Inspect
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-[#747D75]">
                  No reviews currently pending approval in this queue.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Col (4 cols): Deadlines, Attention Employees, Audit Log */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Deadlines Card */}
          <Card>
            <CardHeader>
              <CardTitle>Cycle Deadlines</CardTitle>
              <Badge variant="outline">Q4 Schedule</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#17251F]">
                    Peer Feedback Collection Closes
                  </div>
                  <div className="text-[11px] text-[#747D75] mt-0.5">
                    November 15, 2026 (11 days remaining)
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-[#5876D8] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#17251F]">
                    Manager Review Sign-Off Deadline
                  </div>
                  <div className="text-[11px] text-[#747D75] mt-0.5">
                    November 25, 2026
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#2C5E1A] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#17251F]">
                    Final HR Release to Employees
                  </div>
                  <div className="text-[11px] text-[#747D75] mt-0.5">
                    November 30, 2026
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employees Requiring Attention */}
          <Card>
            <CardHeader>
              <CardTitle>Attention Required</CardTitle>
              <span className="text-xs text-[#747D75]">
                {attentionEmployees.length} members
              </span>
            </CardHeader>
            <CardContent className="space-y-3">
              {attentionEmployees.map(emp => (
                <div
                  key={emp.id}
                  className="p-2.5 rounded-lg border border-[#E6E8E1] bg-[#FAFBF8] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#17251F] text-white flex items-center justify-center text-[10px] font-semibold">
                      {emp.name[0]}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#17251F]">{emp.name}</div>
                      <div className="text-[10px] text-[#747D75]">{emp.jobTitle}</div>
                    </div>
                  </div>
                  <Badge
                    variant={emp.reviewStatus === 'Not Started' ? 'rose' : 'amber'}
                  >
                    {emp.reviewStatus}
                  </Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link href="/employees" className="w-full flex items-center justify-between text-xs text-[#5876D8] hover:underline font-medium">
                <span>View employee directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </CardFooter>
          </Card>

          {/* Recent Audit Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Audit Trail</CardTitle>
              <Link href="/settings" className="text-[11px] text-[#747D75] hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {auditLogs.slice(0, 4).map(log => (
                <div key={log.id} className="text-xs space-y-0.5 border-b border-[#E6E8E1] pb-2 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#17251F]">{log.action}</span>
                    <span className="text-[10px] text-[#747D75]">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#747D75]">
                    {log.target} • by {log.actorName}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


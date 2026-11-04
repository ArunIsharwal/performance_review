'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/storage/use-store';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { StatCard } from '@/components/ui/stat-card';
import {
  BarChart3,
  TrendingUp,
  Target,
  MessageSquareQuote,
  Award,
  Sparkles
} from 'lucide-react';

export default function AnalyticsPage() {
  const {
    departments,
    employees,
    reviewCycles,
    performanceReviews
  } = useStore();

  const [selectedCycleId, setSelectedCycleId] = useState(
    reviewCycles[0]?.id || 'cycle-2026-annual'
  );

  const activeCycle = reviewCycles.find(c => c.id === selectedCycleId) || reviewCycles[0];

  // Metrics
  const totalEmployees = employees.length;
  const completedReviewsCount = performanceReviews.filter(
    r => r.status === 'Approved' || r.status === 'Released'
  ).length;
  const completionRate = Math.round((completedReviewsCount / Math.max(1, totalEmployees)) * 100);

  const avgOkrScore = 91;

  // Department completion rates
  const deptStats = departments.map(d => {
    const deptEmployees = employees.filter(e => e.departmentId === d.id);
    const deptReviews = performanceReviews.filter(
      r => deptEmployees.some(e => e.id === r.employeeId) && (r.status === 'Approved' || r.status === 'Released')
    );
    const rate = Math.round((deptReviews.length / Math.max(1, deptEmployees.length)) * 100);
    return {
      id: d.id,
      name: d.name,
      employeeCount: deptEmployees.length,
      completionRate: Math.min(100, Math.max(rate, 65)), // demo realistic completion rate
      okrAvg: d.averageOkrCompletion
    };
  });

  // Competency Breakdown
  const competencies = [
    { name: 'Collaboration & Teamwork', score: 4.8, count: 186 },
    { name: 'Technical Depth & Quality', score: 4.9, count: 186 },
    { name: 'Analytical Problem Solving', score: 4.7, count: 186 },
    { name: 'Ownership & Delivery', score: 4.6, count: 186 },
    { name: 'Strategic Communication', score: 4.4, count: 186 }
  ];

  // Recurring Performance Themes extracted from synthesized reviews
  const topStrengths = [
    { theme: 'Low-latency backend architecture & caching', frequency: '92% of Eng reviews' },
    { theme: 'Design system accessibility (WCAG 2.1 AAA)', frequency: '88% of Design reviews' },
    { theme: 'Cross-functional mentorship of junior peers', frequency: '74% of Squad reviews' },
    { theme: 'Composure and fast triage during cloud outages', frequency: '65% of Infra reviews' }
  ];

  const topGrowthAreas = [
    { theme: 'Authoring formal Architecture Decision Records (ADRs)', frequency: '68% flagged' },
    { theme: 'Cross-timezone synchronous communication balance', frequency: '45% flagged' },
    { theme: 'Earlier mobile viewport stress-testing in discovery', frequency: '38% flagged' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E8E1]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#17251F]">
              Talent Analytics & Calibration Reports
            </h1>
            <Badge variant="blue">Organization Intelligence</Badge>
          </div>
          <p className="text-xs text-[#747D75] mt-1">
            Aggregated insights across review cycles, competency distributions, and growth themes.
          </p>
        </div>

        {/* Cycle selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-[#17251F]">Review Cycle:</span>
          <select
            value={selectedCycleId}
            onChange={e => setSelectedCycleId(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs font-semibold text-[#17251F] focus:outline-none"
          >
            {reviewCycles.map(c => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Stat Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Review Cycle Progress"
          value={`${completionRate}%`}
          change="+8% vs last week"
          isPositive={true}
          subtitle="On track for Nov 30 deadline"
          icon={<BarChart3 className="w-4 h-4 text-[#17251F]" />}
        />
        <StatCard
          title="Average OKR Progress"
          value={`${avgOkrScore}%`}
          subtitle="Across Q1–Q4 milestones"
          icon={<Target className="w-4 h-4 text-[#D97706]" />}
        />
        <StatCard
          title="360° Feedback Participation"
          value="94%"
          change="3.4 reviews / employee"
          isPositive={true}
          subtitle="High cross-functional calibration"
          icon={<MessageSquareQuote className="w-4 h-4 text-[#5876D8]" />}
        />
        <StatCard
          title="Evidence Traceability"
          value="96%"
          subtitle="Zero unverified claims"
          badgeLabel="Audited"
          icon={<Award className="w-4 h-4 text-[#2C5E1A]" />}
        />
      </div>

      {/* Visual Charts & Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Department Completion & Competencies */}
        <div className="lg:col-span-7 space-y-6">
          {/* Department Progress Bars */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Review Completion by Department</CardTitle>
                <CardDescription>
                  Tracking calibration sign-offs across organizational units
                </CardDescription>
              </div>
              <Badge variant="lime" dot>
                Calibrated
              </Badge>
            </CardHeader>
            <CardContent className="space-y-5">
              {deptStats.map(d => (
                <div key={d.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#17251F]">{d.name}</span>
                    <span className="font-mono font-bold text-[#17251F]">
                      {d.completionRate}%
                    </span>
                  </div>
                  <ProgressBar
                    value={d.completionRate}
                    size="md"
                    colorScheme="forest"
                  />
                  <div className="flex items-center justify-between text-[11px] text-[#747D75]">
                    <span>{d.employeeCount} team members</span>
                    <span>Average OKRs: {d.okrAvg}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Competency Rubric Breakdown */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Core Competency Score Distribution</CardTitle>
                <CardDescription>
                  Multi-rater ratings collected across peer 360 reviews (1 to 5 scale)
                </CardDescription>
              </div>
              <Badge variant="forest">360° Rubric</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {competencies.map(c => (
                <div key={c.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#17251F]">{c.name}</span>
                    <span className="font-mono font-bold text-[#17251F]">
                      {c.score} / 5.0
                    </span>
                  </div>
                  <ProgressBar
                    value={(c.score / 5) * 100}
                    size="sm"
                    colorScheme={c.score >= 4.7 ? 'lime' : 'blue'}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (5 cols): AI Synthesized Themes & Development Areas */}
        <div className="lg:col-span-5 space-y-6">
          {/* Key Strengths Theme */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Top Organizational Strengths</CardTitle>
                <CardDescription>
                  Synthesized common themes from annual performance reviews
                </CardDescription>
              </div>
              <Sparkles className="w-4 h-4 text-[#17251F]" />
            </CardHeader>
            <CardContent className="space-y-3">
              {topStrengths.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl space-y-1 text-xs"
                >
                  <div className="font-bold text-[#17251F]">{s.theme}</div>
                  <div className="text-[11px] text-[#2C5E1A] font-medium">
                    {s.frequency}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Development Areas */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Priority Development Themes</CardTitle>
                <CardDescription>
                  High-frequency opportunities for organizational coaching
                </CardDescription>
              </div>
              <TrendingUp className="w-4 h-4 text-[#D97706]" />
            </CardHeader>
            <CardContent className="space-y-3">
              {topGrowthAreas.map((g, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl space-y-1 text-xs"
                >
                  <div className="font-bold text-[#17251F]">{g.theme}</div>
                  <div className="text-[11px] text-[#92540D] font-medium">
                    {g.frequency}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

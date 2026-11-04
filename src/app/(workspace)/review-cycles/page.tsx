'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/storage/use-store';
import { ReviewCycle, ReviewCycleStatus, ReviewType } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Modal } from '@/components/ui/modal';
import { EmptyState } from '@/components/ui/empty-state';
import {
  CalendarDays,
  Plus,
  Clock,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';

export default function ReviewCyclesPage() {
  const { reviewCycles, addReviewCycle, updateReviewCycle, employees } = useStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    period: 'FY2026',
    type: 'Annual 360°' as ReviewType,
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    description: '',
    status: 'Active' as ReviewCycleStatus,
    eligibleEmployeesCount: employees.length
  });

  const handleOpenCreate = () => {
    setActiveStep(1);
    setFormData({
      title: 'FY2026 Q4 Talent Calibration Cycle',
      period: 'FY2026',
      type: 'Annual 360°',
      startDate: '2026-11-01',
      endDate: '2026-12-15',
      description: 'End-of-year executive calibration across all engineering and product teams.',
      status: 'Active',
      eligibleEmployeesCount: employees.length
    });
    setIsCreateModalOpen(true);
  };

  const handleSaveCycle = (e: React.FormEvent) => {
    e.preventDefault();
    addReviewCycle(formData);
    setIsCreateModalOpen(false);
  };

  const statusVariant = (status: ReviewCycleStatus) => {
    switch (status) {
      case 'Active':
        return 'lime' as const;
      case 'Completed':
        return 'blue' as const;
      default:
        return 'outline' as const;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E8E1]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#17251F]">
            Review Cycle Management
          </h1>
          <p className="text-xs text-[#747D75] mt-1">
            Configure evaluation cycles, milestone schedules, and organization-wide calibration timelines.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={handleOpenCreate}
        >
          Create Review Cycle
        </Button>
      </div>

      {/* Cycle List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviewCycles.map(cycle => {
          const progressPercent = Math.round(
            (cycle.completedReviewsCount / Math.max(1, cycle.eligibleEmployeesCount)) * 100
          );

          return (
            <Card key={cycle.id} className="flex flex-col justify-between hover:border-[#D0D4CA] transition-all">
              <CardHeader>
                <div>
                  <span className="text-[10px] font-bold text-[#5876D8] uppercase tracking-wider">
                    {cycle.period} • {cycle.type}
                  </span>
                  <CardTitle className="text-sm mt-1">{cycle.title}</CardTitle>
                </div>
                <Badge variant={statusVariant(cycle.status)} dot>
                  {cycle.status}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-xs text-[#747D75] leading-relaxed">
                  {cycle.description}
                </p>

                {/* Dates */}
                <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl text-xs space-y-1.5">
                  <div className="flex justify-between text-[#747D75]">
                    <span>Start Date:</span>
                    <span className="font-mono text-[#17251F]">{cycle.startDate}</span>
                  </div>
                  <div className="flex justify-between text-[#747D75]">
                    <span>End Date:</span>
                    <span className="font-mono text-[#17251F]">{cycle.endDate}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-[#17251F]">
                    <span>Cycle Completion</span>
                    <span>
                      {cycle.completedReviewsCount} / {cycle.eligibleEmployeesCount} ({progressPercent}%)
                    </span>
                  </div>
                  <ProgressBar value={progressPercent} size="sm" colorScheme="forest" />
                </div>
              </CardContent>

              <CardFooter>
                <div className="flex items-center gap-1.5 text-xs text-[#747D75]">
                  <Users className="w-3.5 h-3.5" />
                  <span>{cycle.eligibleEmployeesCount} Eligible Employees</span>
                </div>
                <button
                  onClick={() => {
                    const newStatus: ReviewCycleStatus =
                      cycle.status === 'Active' ? 'Completed' : 'Active';
                    updateReviewCycle(cycle.id, { status: newStatus });
                  }}
                  className="text-xs font-semibold text-[#17251F] hover:text-[#5876D8] cursor-pointer"
                >
                  {cycle.status === 'Active' ? 'Mark Completed' : 'Reactivate'}
                </button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Step-Based Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Review Cycle"
        description="Step-based configuration for organizational performance cycle."
        maxWidth="lg"
      >
        <div className="mb-5 flex items-center justify-between border-b border-[#E6E8E1] pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                activeStep === 1 ? 'bg-[#17251F] text-white' : 'bg-[#E6E8E1] text-[#747D75]'
              }`}
            >
              1
            </span>
            <span className={activeStep === 1 ? 'font-bold text-[#17251F]' : 'text-[#747D75]'}>
              Cycle Details
            </span>
          </div>
          <div className="h-[1px] w-10 bg-[#E6E8E1]" />
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                activeStep === 2 ? 'bg-[#17251F] text-white' : 'bg-[#E6E8E1] text-[#747D75]'
              }`}
            >
              2
            </span>
            <span className={activeStep === 2 ? 'font-bold text-[#17251F]' : 'text-[#747D75]'}>
              Schedule & Dates
            </span>
          </div>
          <div className="h-[1px] w-10 bg-[#E6E8E1]" />
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                activeStep === 3 ? 'bg-[#17251F] text-white' : 'bg-[#E6E8E1] text-[#747D75]'
              }`}
            >
              3
            </span>
            <span className={activeStep === 3 ? 'font-bold text-[#17251F]' : 'text-[#747D75]'}>
              Participant Scope
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveCycle} className="space-y-4 text-xs">
          {activeStep === 1 && (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-[#17251F] mb-1">Cycle Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. FY2026 Annual 360 Review"
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#17251F] mb-1">Period</label>
                  <input
                    type="text"
                    required
                    value={formData.period}
                    onChange={e => setFormData({ ...formData, period: e.target.value })}
                    placeholder="e.g. FY2026"
                    className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#17251F] mb-1">Review Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value as ReviewType })}
                    className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
                  >
                    <option value="Annual 360°">Annual 360°</option>
                    <option value="Mid-Year Calibration">Mid-Year Calibration</option>
                    <option value="Quarterly Check-in">Quarterly Check-in</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#17251F] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Goals and expectations for this review cycle..."
                  className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
                />
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#17251F] mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#17251F] mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
                  />
                </div>
              </div>

              <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl text-xs text-[#747D75]">
                <Clock className="w-4 h-4 text-[#5876D8] mb-1" />
                <p>
                  Review cycles default to active status upon creation. Reviewers and managers will receive automated deadline alerts according to the configured dates.
                </p>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-[#17251F] mb-1">
                  Eligible Employees ({employees.length} available)
                </label>
                <div className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl text-xs">
                  <div className="font-semibold text-[#17251F] mb-1">
                    All Active Full-Time & Part-Time Employees
                  </div>
                  <p className="text-[#747D75]">
                    Scope covers {employees.length} members across Engineering, Product & Design, and Sales & Growth departments.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#EEF9D1] border border-[#D6EFA0] rounded-xl text-xs text-[#17251F]">
                <CheckCircle2 className="w-4 h-4 text-[#2C5E1A] mb-1" />
                <p className="font-semibold">Ready to Launch Cycle</p>
                <p className="text-[11px] text-[#2C5E1A] mt-0.5">
                  Click Launch Cycle to register and initialize review records in the local repository.
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[#E6E8E1] flex items-center justify-between">
            {activeStep > 1 ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {activeStep < 3 ? (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setActiveStep(activeStep + 1)}
              >
                Next Step
              </Button>
            ) : (
              <Button type="submit" variant="primary" size="sm">
                Launch Cycle
              </Button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
}


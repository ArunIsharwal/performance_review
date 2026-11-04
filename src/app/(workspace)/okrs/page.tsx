'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/storage/use-store';
import { OKR, KeyResult, Quarter, OKRStatus } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Modal } from '@/components/ui/modal';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Target,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  TrendingUp,
  Edit2,
  Users,
  Building
} from 'lucide-react';

export default function OKRsPage() {
  const { okrs, employees, departments, addOKR, updateOKR } = useStore();

  const [selectedQuarter, setSelectedQuarter] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedEmp, setSelectedEmp] = useState<string>('all');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingOkr, setEditingOkr] = useState<OKR | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    employeeId: employees[1]?.id || 'emp-002',
    quarter: 'Q4' as Quarter,
    year: 2026,
    objective: '',
    departmentId: departments[0]?.id || 'dept-eng',
    keyResults: [
      {
        id: 'kr-1',
        title: '',
        targetValue: 100,
        actualValue: 0,
        unit: '%',
        completionPercentage: 0,
        status: 'On Track' as OKRStatus
      }
    ]
  });

  // Filtered OKRs
  const filteredOkrs = okrs.filter(okr => {
    const matchesQ = selectedQuarter === 'all' || okr.quarter === selectedQuarter;
    const matchesDept = selectedDept === 'all' || okr.departmentId === selectedDept;
    const matchesEmp = selectedEmp === 'all' || okr.employeeId === selectedEmp;
    return matchesQ && matchesDept && matchesEmp;
  });

  const handleOpenAdd = () => {
    setFormData({
      employeeId: employees[1]?.id || 'emp-002',
      quarter: 'Q4',
      year: 2026,
      objective: 'Scale Review Generation Worker Throughput & Resilience',
      departmentId: departments[0]?.id || 'dept-eng',
      keyResults: [
        {
          id: `kr-${Date.now()}-1`,
          title: 'Benchmark 50 concurrent review syntheses under 4 seconds',
          targetValue: 50,
          actualValue: 35,
          unit: 'syntheses',
          completionPercentage: 70,
          status: 'On Track'
        },
        {
          id: `kr-${Date.now()}-2`,
          title: 'Establish zero-downtime deployment pipelines for workers',
          targetValue: 100,
          actualValue: 80,
          unit: '% pipeline',
          completionPercentage: 80,
          status: 'On Track'
        }
      ]
    });
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.objective) return;

    const totalPerc = formData.keyResults.reduce((acc, kr) => acc + kr.completionPercentage, 0);
    const overall = Math.round(totalPerc / Math.max(1, formData.keyResults.length));

    addOKR({
      employeeId: formData.employeeId,
      quarter: formData.quarter,
      year: formData.year,
      objective: formData.objective,
      departmentId: formData.departmentId,
      keyResults: formData.keyResults,
      overallProgress: overall,
      status: overall >= 90 ? 'Completed' : overall >= 60 ? 'On Track' : 'At Risk'
    });

    setIsAddModalOpen(false);
  };

  const handleUpdateProgress = (okr: OKR, krId: string, newActual: number) => {
    const updatedKrs = okr.keyResults.map(kr => {
      if (kr.id === krId) {
        const perc = Math.min(150, Math.round((newActual / Math.max(0.001, kr.targetValue)) * 100));
        return {
          ...kr,
          actualValue: newActual,
          completionPercentage: perc,
          status: (perc >= 90 ? 'Completed' : perc >= 60 ? 'On Track' : 'At Risk') as OKRStatus
        };
      }
      return kr;
    });

    const total = updatedKrs.reduce((a, b) => a + b.completionPercentage, 0);
    const overall = Math.round(total / updatedKrs.length);

    updateOKR(okr.id, {
      keyResults: updatedKrs,
      overallProgress: overall,
      status: overall >= 90 ? 'Completed' : overall >= 60 ? 'On Track' : 'At Risk'
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E8E1]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#17251F]">
              Quarterly OKR Management
            </h1>
            <Badge variant="forest">Empirical Evidence</Badge>
          </div>
          <p className="text-xs text-[#747D75] mt-1">
            Track quantitative goals across Q1, Q2, Q3, and Q4. Linked directly into synthesized annual reviews.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={handleOpenAdd}
        >
          Add Objective
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quarter Pill selector */}
          <div className="inline-flex rounded-lg border border-[#E6E8E1] p-0.5 bg-[#FAFBF8]">
            {['all', 'Q1', 'Q2', 'Q3', 'Q4'].map(q => (
              <button
                key={q}
                onClick={() => setSelectedQuarter(q)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  selectedQuarter === q
                    ? 'bg-[#17251F] text-white shadow-2xs'
                    : 'text-[#747D75] hover:text-[#17251F]'
                }`}
              >
                {q === 'all' ? 'All Quarters' : q}
              </button>
            ))}
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={e => setSelectedDept(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs text-[#202820] focus:outline-none"
          >
            <option value="all">All Departments</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Employee Filter */}
          <select
            value={selectedEmp}
            onChange={e => setSelectedEmp(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs text-[#202820] focus:outline-none"
          >
            <option value="all">All Employees</option>
            {employees.map(e => (
              <option key={e.id} value={e.id}>
                {e.name} ({e.jobTitle})
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs text-[#747D75] font-medium">
          Showing {filteredOkrs.length} Objective(s)
        </span>
      </div>

      {/* OKR Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOkrs.length > 0 ? (
          filteredOkrs.map(okr => {
            const owner = employees.find(e => e.id === okr.employeeId);

            return (
              <Card key={okr.id} className="flex flex-col justify-between hover:border-[#D0D4CA] transition-all">
                <CardHeader>
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="forest" className="font-mono text-[10px]">
                        {okr.quarter} {okr.year}
                      </Badge>
                      {owner && (
                        <span className="text-xs font-semibold text-[#17251F]">
                          {owner.name}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-sm mt-1.5 leading-snug">
                      {okr.objective}
                    </CardTitle>
                  </div>

                  <Badge
                    variant={
                      okr.status === 'Completed'
                        ? 'lime'
                        : okr.status === 'On Track'
                        ? 'forest'
                        : 'amber'
                    }
                    dot
                  >
                    {okr.overallProgress}% • {okr.status}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-[#17251F]">
                      <span>Objective Progress</span>
                      <span>{okr.overallProgress}%</span>
                    </div>
                    <ProgressBar value={okr.overallProgress} size="md" colorScheme="forest" />
                  </div>

                  {/* Key Results Details */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[10px] font-bold text-[#747D75] uppercase tracking-wider">
                      Key Results ({okr.keyResults.length})
                    </span>

                    {okr.keyResults.map(kr => (
                      <div
                        key={kr.id}
                        className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3 text-xs">
                          <span className="font-semibold text-[#17251F] leading-tight">
                            {kr.title}
                          </span>
                          <span className="shrink-0 font-mono text-[11px] font-bold text-[#17251F]">
                            {kr.completionPercentage}%
                          </span>
                        </div>

                        <ProgressBar
                          value={kr.completionPercentage}
                          size="sm"
                          colorScheme={kr.completionPercentage >= 90 ? 'lime' : 'blue'}
                        />

                        {/* Interactive actual value adjustment */}
                        <div className="flex items-center justify-between text-[11px] text-[#747D75] pt-1 border-t border-[#E6E8E1]/60">
                          <span>
                            Target: {kr.targetValue}{kr.unit} • Actual: {kr.actualValue}{kr.unit}
                          </span>
                          <button
                            onClick={() => {
                              const input = prompt(
                                `Update actual value for: "${kr.title}" (target: ${kr.targetValue}${kr.unit})`,
                                String(kr.actualValue)
                              );
                              if (input !== null) {
                                const parsed = parseFloat(input);
                                if (!isNaN(parsed)) {
                                  handleUpdateProgress(okr, kr.id, parsed);
                                }
                              }
                            }}
                            className="text-[#5876D8] hover:underline font-semibold cursor-pointer"
                          >
                            Update Progress
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter>
                  <div className="text-[11px] text-[#747D75]">
                    Updated on: <span className="font-mono text-[#17251F]">{okr.updatedAt}</span>
                  </div>
                  <span className="text-[10px] text-[#2C5E1A] bg-[#EEF9D1] px-2 py-0.5 rounded-full font-semibold">
                    Evidence Verified
                  </span>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <div className="md:col-span-2">
            <EmptyState
              icon={<Target className="w-8 h-8 text-[#747D75]" />}
              title="No OKRs found"
              description="No quarterly objectives match the selected filters."
            />
          </div>
        )}
      </div>

      {/* Add Objective Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Quarterly Objective"
        description="Register a quantitative objective and key results."
        maxWidth="lg"
      >
        <form onSubmit={handleSaveAdd} className="space-y-4 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-[#17251F] mb-1">Quarter</label>
              <select
                value={formData.quarter}
                onChange={e => setFormData({ ...formData, quarter: e.target.value as Quarter })}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
              >
                <option value="Q1">Q1</option>
                <option value="Q2">Q2</option>
                <option value="Q3">Q3</option>
                <option value="Q4">Q4</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-[#17251F] mb-1">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) || 2026 })}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#17251F] mb-1">Assigned Employee</label>
              <select
                value={formData.employeeId}
                onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
              >
                {employees.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#17251F] mb-1">Objective Title</label>
            <input
              type="text"
              required
              value={formData.objective}
              onChange={e => setFormData({ ...formData, objective: e.target.value })}
              placeholder="e.g. Modernize API Gateway & Reduce P99 Latencies"
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs focus:ring-1 focus:ring-[#17251F]"
            />
          </div>

          {/* Key Results list in modal */}
          <div className="space-y-3 pt-2">
            <span className="font-bold text-[#17251F] uppercase tracking-wider text-[11px]">
              Key Results
            </span>

            {formData.keyResults.map((kr, idx) => (
              <div key={kr.id} className="p-3 bg-[#FAFBF8] border border-[#E6E8E1] rounded-xl space-y-2">
                <input
                  type="text"
                  required
                  placeholder={`Key Result #${idx + 1} description`}
                  value={kr.title}
                  onChange={e => {
                    const updated = [...formData.keyResults];
                    updated[idx].title = e.target.value;
                    setFormData({ ...formData, keyResults: updated });
                  }}
                  className="w-full px-3 py-1.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs"
                />
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-[#747D75]">Target</label>
                    <input
                      type="number"
                      value={kr.targetValue}
                      onChange={e => {
                        const val = parseFloat(e.target.value) || 1;
                        const updated = [...formData.keyResults];
                        updated[idx].targetValue = val;
                        updated[idx].completionPercentage = Math.round((updated[idx].actualValue / val) * 100);
                        setFormData({ ...formData, keyResults: updated });
                      }}
                      className="w-full px-2 py-1 bg-[#FFFFFF] border border-[#E6E8E1] rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#747D75]">Actual</label>
                    <input
                      type="number"
                      value={kr.actualValue}
                      onChange={e => {
                        const val = parseFloat(e.target.value) || 0;
                        const updated = [...formData.keyResults];
                        updated[idx].actualValue = val;
                        updated[idx].completionPercentage = Math.round((val / updated[idx].targetValue) * 100);
                        setFormData({ ...formData, keyResults: updated });
                      }}
                      className="w-full px-2 py-1 bg-[#FFFFFF] border border-[#E6E8E1] rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#747D75]">Unit</label>
                    <input
                      type="text"
                      value={kr.unit}
                      onChange={e => {
                        const updated = [...formData.keyResults];
                        updated[idx].unit = e.target.value;
                        setFormData({ ...formData, keyResults: updated });
                      }}
                      className="w-full px-2 py-1 bg-[#FFFFFF] border border-[#E6E8E1] rounded text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E6E8E1] flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Objective
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


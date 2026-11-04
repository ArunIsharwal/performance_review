'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/storage/use-store';
import { Search, FileText, Target, ArrowRight, X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const { employees, okrs, performanceReviews } = useStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingEmployees = employees.filter(
    e =>
      e.name.toLowerCase().includes(q) ||
      e.jobTitle.toLowerCase().includes(q) ||
      e.departmentName.toLowerCase().includes(q)
  );

  const matchingReviews = performanceReviews.filter(
    r =>
      r.employeeName.toLowerCase().includes(q) ||
      r.reviewCycleTitle.toLowerCase().includes(q)
  );

  const matchingOkrs = okrs.filter(
    o => o.objective.toLowerCase().includes(q) || o.quarter.toLowerCase().includes(q)
  );

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div
        className="fixed inset-0 bg-[#17251F]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-[#FFFFFF] rounded-2xl border border-[#E6E8E1] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E6E8E1] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#747D75]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search employees, reviews, OKRs, or review cycles..."
            className="w-full bg-transparent text-sm text-[#202820] placeholder-[#747D75] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#747D75] hover:text-[#202820] hover:bg-[#F0F2EB] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-3 overflow-y-auto space-y-4">
          {/* Quick links when empty */}
          {!query && (
            <div className="px-3 py-2 text-xs text-[#747D75]">
              <span className="font-semibold text-[#17251F] uppercase tracking-wider text-[10px]">
                Quick Destinations
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavigate('/dashboard')}
                  className="p-2 text-left rounded-lg hover:bg-[#F0F2EB] text-[#202820] flex items-center justify-between cursor-pointer"
                >
                  <span>Dashboard Overview</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#747D75]" />
                </button>
                <button
                  onClick={() => handleNavigate('/ai-review-studio')}
                  className="p-2 text-left rounded-lg hover:bg-[#F0F2EB] text-[#202820] flex items-center justify-between cursor-pointer"
                >
                  <span>AI Review Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#747D75]" />
                </button>
                <button
                  onClick={() => handleNavigate('/employees')}
                  className="p-2 text-left rounded-lg hover:bg-[#F0F2EB] text-[#202820] flex items-center justify-between cursor-pointer"
                >
                  <span>Employee Directory</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#747D75]" />
                </button>
                <button
                  onClick={() => handleNavigate('/approvals')}
                  className="p-2 text-left rounded-lg hover:bg-[#F0F2EB] text-[#202820] flex items-center justify-between cursor-pointer"
                >
                  <span>Manager Approval Queue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#747D75]" />
                </button>
              </div>
            </div>
          )}

          {/* Employees */}
          {matchingEmployees.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-semibold text-[#747D75] uppercase tracking-wider">
                Employees ({matchingEmployees.length})
              </div>
              <div className="mt-1 space-y-0.5">
                {matchingEmployees.slice(0, 4).map(emp => (
                  <button
                    key={emp.id}
                    onClick={() => handleNavigate(`/employees/${emp.id}`)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#F0F2EB] text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#17251F] text-[#FFFFFF] flex items-center justify-center text-[10px] font-semibold">
                        {emp.name[0]}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#17251F]">{emp.name}</div>
                        <div className="text-[10px] text-[#747D75]">{emp.jobTitle} • {emp.departmentName}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#747D75] bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#E6E8E1]">
                      Profile
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Performance Reviews */}
          {matchingReviews.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-semibold text-[#747D75] uppercase tracking-wider">
                Performance Reviews ({matchingReviews.length})
              </div>
              <div className="mt-1 space-y-0.5">
                {matchingReviews.slice(0, 3).map(rev => (
                  <button
                    key={rev.id}
                    onClick={() => handleNavigate(`/reviews/${rev.id}`)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#F0F2EB] text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-[#5876D8]" />
                      <div>
                        <div className="text-xs font-semibold text-[#17251F]">{rev.employeeName}</div>
                        <div className="text-[10px] text-[#747D75]">{rev.reviewCycleTitle} • Score: {rev.overallRating}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-[#17251F] bg-[#EEF9D1] px-1.5 py-0.5 rounded border border-[#D6EFA0]">
                      {rev.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* OKRs */}
          {matchingOkrs.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-semibold text-[#747D75] uppercase tracking-wider">
                Quarterly OKRs ({matchingOkrs.length})
              </div>
              <div className="mt-1 space-y-0.5">
                {matchingOkrs.slice(0, 3).map(okr => (
                  <button
                    key={okr.id}
                    onClick={() => handleNavigate('/okrs')}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#F0F2EB] text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Target className="w-4 h-4 text-[#D97706]" />
                      <div>
                        <div className="text-xs font-semibold text-[#17251F]">{okr.objective}</div>
                        <div className="text-[10px] text-[#747D75]">{okr.quarter} {okr.year} • {okr.overallProgress}% Complete</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#747D75]">
                      {okr.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && matchingEmployees.length === 0 && matchingReviews.length === 0 && matchingOkrs.length === 0 && (
            <div className="py-8 text-center text-xs text-[#747D75]">
              No records found matching &quot;{query}&quot;.
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-[#FAFBF8] border-t border-[#E6E8E1] text-[11px] text-[#747D75] flex items-center justify-between">
          <span>Navigate with mouse or arrow keys</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}

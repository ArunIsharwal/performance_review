'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/storage/use-store';
import { ReviewApprovalStatus } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import {
  FileCheck2,
  Sparkles,
  Eye
} from 'lucide-react';

export default function ReviewsPage() {
  const { performanceReviews, reviewCycles } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCycle, setSelectedCycle] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredReviews = performanceReviews.filter(r => {
    const matchesSearch =
      r.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      r.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      r.departmentName.toLowerCase().includes(search.toLowerCase());

    const matchesCycle = selectedCycle === 'all' || r.reviewCycleId === selectedCycle;
    const matchesStatus = selectedStatus === 'all' || r.status === selectedStatus;

    return matchesSearch && matchesCycle && matchesStatus;
  });

  const statusVariant = (status: ReviewApprovalStatus) => {
    switch (status) {
      case 'Approved':
        return 'lime' as const;
      case 'Released':
        return 'blue' as const;
      case 'Pending Approval':
        return 'amber' as const;
      case 'Changes Requested':
        return 'rose' as const;
      default:
        return 'outline' as const;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E6E8E1]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#17251F]">
              Performance Reviews
            </h1>
            <Badge variant="forest">Synthesized Evaluations</Badge>
          </div>
          <p className="text-xs text-[#747D75] mt-1">
            Browse drafted, pending approval, calibrated, and released performance reviews.
          </p>
        </div>

        <Link href="/ai-review-studio">
          <Button
            variant="accent"
            size="sm"
            leftIcon={<Sparkles className="w-4 h-4 text-[#17251F]" />}
          >
            Create / Synthesize Review
          </Button>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5 flex-wrap">
          <SearchInput
            value={search}
            onChangeValue={setSearch}
            placeholder="Search reviews by employee or title..."
            className="w-full sm:w-72"
          />

          {/* Cycle filter */}
          <select
            value={selectedCycle}
            onChange={e => setSelectedCycle(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs text-[#202820] focus:outline-none"
          >
            <option value="all">All Review Cycles</option>
            {reviewCycles.map(c => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs text-[#202820] focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Approved">Approved</option>
            <option value="Released">Released</option>
            <option value="Changes Requested">Changes Requested</option>
          </select>
        </div>

        <span className="text-xs text-[#747D75] font-medium">
          Showing {filteredReviews.length} Review(s)
        </span>
      </div>

      {/* Reviews Table Card */}
      <Card className="overflow-hidden">
        {filteredReviews.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAFBF8] border-b border-[#E6E8E1] text-[#747D75] font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3.5">Employee</th>
                  <th className="px-4 py-3.5">Review Cycle</th>
                  <th className="px-4 py-3.5">Overall Rating</th>
                  <th className="px-4 py-3.5">Evidence Coverage</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E8E1]">
                {filteredReviews.map(rev => (
                  <tr key={rev.id} className="hover:bg-[#FAFBF8] transition-colors">
                    {/* Employee */}
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-[#17251F]">{rev.employeeName}</div>
                      <div className="text-[11px] text-[#747D75]">
                        {rev.jobTitle} • {rev.departmentName}
                      </div>
                    </td>

                    {/* Cycle */}
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-[#17251F]">{rev.reviewCycleTitle}</div>
                      <div className="text-[10px] font-mono text-[#747D75]">
                        Updated {new Date(rev.lastUpdatedAt).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded font-bold text-xs bg-[#17251F] text-[#C8ED78]">
                          {rev.overallRating}
                        </span>
                        <span className="text-[#747D75]">/ 5.0</span>
                      </div>
                    </td>

                    {/* Evidence Coverage */}
                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-[#2C5E1A] bg-[#EEF9D1] px-2 py-0.5 rounded-full text-[11px]">
                        {rev.evidenceCoverageScore}% Backed
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <Badge variant={statusVariant(rev.status)} dot>
                        {rev.status}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/reviews/${rev.id}`}>
                          <Button size="sm" variant="secondary" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                            View / Print
                          </Button>
                        </Link>
                        <Link href={`/ai-review-studio?employeeId=${rev.employeeId}`}>
                          <button
                            className="p-1.5 rounded-lg text-[#17251F] bg-[#EEF9D1] hover:bg-[#E5F5BE] transition-colors cursor-pointer"
                            title="Edit in Review Studio"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            icon={<FileCheck2 className="w-8 h-8 text-[#747D75]" />}
            title="No performance reviews found"
            description="No reviews matched the current filter criteria."
          />
        )}
      </Card>
    </div>
  );
}

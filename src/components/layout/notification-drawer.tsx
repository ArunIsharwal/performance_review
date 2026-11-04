'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/storage/use-store';
import { X, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const router = useRouter();
  const { performanceReviews, showToast } = useStore();

  if (!isOpen) return null;

  const pendingApprovals = performanceReviews.filter(r => r.status === 'Pending Approval');

  const notifications = [
    {
      id: 'notif-1',
      title: 'Review Awaiting Executive Approval',
      desc: `Rahul Deshmukh's FY2026 performance review draft is pending sign-off.`,
      time: '2 hours ago',
      type: 'approval',
      actionUrl: '/approvals'
    },
    {
      id: 'notif-2',
      title: 'FY2026 Review Cycle Milestone',
      desc: 'Annual evaluation calibration closes in 14 days (Nov 30, 2026).',
      time: '1 day ago',
      type: 'deadline',
      actionUrl: '/review-cycles'
    },
    {
      id: 'notif-3',
      title: '360° Peer Feedback Received',
      desc: 'Julian Mercer submitted feedback for Elena Rostova with 5/5 collaboration score.',
      time: '2 days ago',
      type: 'feedback',
      actionUrl: '/feedback'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#17251F]/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-[#FFFFFF] h-full shadow-2xl border-l border-[#E6E8E1] z-10 flex flex-col animate-in slide-in-from-right duration-200">
        <div className="px-5 py-4 border-b border-[#E6E8E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-[#17251F]">
              Action Queue & Alerts
            </h3>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#C8ED78] text-[#17251F]">
              {pendingApprovals.length + 2}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#747D75] hover:text-[#202820] hover:bg-[#F0F2EB] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action item banner */}
        {pendingApprovals.length > 0 && (
          <div className="p-4 bg-[#FEF6E7] border-b border-[#FBDCA8] flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-[#92540D]">
                {pendingApprovals.length} Review(s) Require Approval
              </div>
              <p className="text-[11px] text-[#92540D]/90 mt-0.5">
                Staff backend architect evaluation requires formal manager sign-off.
              </p>
              <Button
                size="sm"
                variant="primary"
                className="mt-2 text-xs"
                onClick={() => {
                  router.push('/approvals');
                  onClose();
                }}
              >
                Open Approval Queue
              </Button>
            </div>
          </div>
        )}

        {/* List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          <span className="text-[10px] font-semibold text-[#747D75] uppercase tracking-wider">
            Recent Activity & Reminders
          </span>

          {notifications.map(n => (
            <div
              key={n.id}
              onClick={() => {
                router.push(n.actionUrl);
                onClose();
              }}
              className="p-3 rounded-xl border border-[#E6E8E1] hover:border-[#D0D4CA] hover:bg-[#FAFBF8] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-[11px] text-[#747D75]">
                <div className="flex items-center gap-1.5 font-medium text-[#17251F]">
                  <Clock className="w-3 h-3 text-[#5876D8]" />
                  <span>{n.title}</span>
                </div>
                <span className="text-[10px]">{n.time}</span>
              </div>
              <p className="text-xs text-[#747D75] mt-1.5 leading-relaxed">
                {n.desc}
              </p>
              <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#17251F] group-hover:text-[#5876D8]">
                <span>View details</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAFBF8] border-t border-[#E6E8E1] flex items-center justify-between text-xs">
          <span className="text-[#747D75]">ReviewForge Alerts</span>
          <button
            onClick={() => {
              showToast('All notifications marked as read', 'info');
              onClose();
            }}
            className="text-[11px] text-[#5876D8] hover:underline cursor-pointer"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}

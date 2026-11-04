'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/storage/use-store';
import { RoleSwitcher } from './role-switcher';
import { SearchModal } from './search-modal';
import { NotificationDrawer } from './notification-drawer';
import {
  Bell,
  Search,
  RotateCcw,
  Building2,
  ChevronRight,
  Menu
} from 'lucide-react';

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export function Topbar({ onToggleSidebar }: TopbarProps) {
  const pathname = usePathname();
  const { resetAllDemoData, performanceReviews } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Derive breadcrumb from pathname
  const pathParts = pathname.split('/').filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const href = '/' + pathParts.slice(0, index + 1).join('/');
    const label = part
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return { href, label };
  });

  const pendingApprovalsCount = performanceReviews.filter(
    r => r.status === 'Pending Approval'
  ).length;

  return (
    <>
      <header className="h-14 border-b border-[#E6E8E1] bg-[#FFFFFF] px-4 md:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shrink-0">
        {/* Left: Mobile Menu Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 rounded-lg text-[#747D75] hover:text-[#202820] hover:bg-[#F0F2EB] cursor-pointer"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Org Workspace pill */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#FAFBF8] border border-[#E6E8E1] text-xs font-semibold text-[#17251F]">
            <Building2 className="w-3.5 h-3.5 text-[#747D75]" />
            <span>Acme Corp</span>
            <span className="text-[10px] font-normal text-[#747D75]">/ Enterprise</span>
          </div>

          <div className="hidden lg:block h-4 w-[1px] bg-[#E6E8E1]" />

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-[#747D75]">
            <Link
              href="/dashboard"
              className="hover:text-[#17251F] font-medium transition-colors"
            >
              ReviewForge
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.href}>
                <ChevronRight className="w-3 h-3 text-[#B4BAC0]" />
                <span
                  className={
                    idx === breadcrumbs.length - 1
                      ? 'font-semibold text-[#17251F]'
                      : 'hover:text-[#17251F] transition-colors'
                  }
                >
                  {crumb.label}
                </span>
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Center / Right: Global Search & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 pl-3 pr-4 py-1.5 bg-[#FAFBF8] hover:bg-[#F0F2EB] border border-[#E6E8E1] rounded-lg text-xs text-[#747D75] transition-all cursor-pointer w-36 sm:w-64 justify-between"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#747D75]" />
              <span className="truncate">Search ReviewForge...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#747D75] bg-[#FFFFFF] border border-[#E6E8E1] rounded">
              ⌘K
            </kbd>
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={() => {
              if (
                window.confirm(
                  'Reset demo state? This will restore mock employees, OKRs, and reviews to original factory seed.'
                )
              ) {
                resetAllDemoData();
              }
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#FFFFFF] hover:bg-[#F0F2EB] border border-[#E6E8E1] rounded-lg text-xs font-medium text-[#747D75] hover:text-[#17251F] transition-colors cursor-pointer"
            title="Reset demo data to initial seed state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2 rounded-lg text-[#747D75] hover:text-[#202820] hover:bg-[#F0F2EB] transition-colors cursor-pointer"
            aria-label="Open notifications"
          >
            <Bell className="w-4 h-4" />
            {pendingApprovalsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E11D48]" />
            )}
          </button>

          {/* Role Switcher */}
          <RoleSwitcher />

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-1 border-l border-[#E6E8E1]">
            <div className="w-8 h-8 rounded-full bg-[#17251F] text-[#FFFFFF] flex items-center justify-center text-xs font-semibold ring-2 ring-[#C8ED78]/60">
              AT
            </div>
          </div>
        </div>
      </header>

      {/* Global Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
}

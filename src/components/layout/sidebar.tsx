'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/storage/use-store';
import {
  LayoutDashboard,
  Users,
  Building,
  MessageSquareQuote,
  BookOpenCheck,
  CalendarDays,
  Target,
  FileCheck2,
  CheckCircle,
  Sparkles,
  BarChart3,
  Settings,
  StickyNote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  badgeVariant?: 'amber' | 'lime';
  isHighlight?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}: SidebarProps) {
  const pathname = usePathname();
  const { activeRole, performanceReviews, feedback } = useStore();

  const pendingApprovalsCount = performanceReviews.filter(
    r => r.status === 'Pending Approval'
  ).length;

  const pendingFeedbackCount = feedback.filter(f => f.status === 'Requested').length;

  // Navigation Items Grouped by Category
  const navGroups: NavGroup[] = [
    {
      title: 'OVERVIEW',
      items: [
        {
          label: 'Dashboard',
          href: '/dashboard',
          icon: <LayoutDashboard className="w-4 h-4 shrink-0" />
        }
      ]
    },
    {
      title: 'PEOPLE',
      items: [
        {
          label: 'Employees',
          href: '/employees',
          icon: <Users className="w-4 h-4 shrink-0" />
        },
        {
          label: 'Departments',
          href: '/departments',
          icon: <Building className="w-4 h-4 shrink-0" />
        },
        {
          label: 'Feedback',
          href: '/feedback',
          icon: <MessageSquareQuote className="w-4 h-4 shrink-0" />,
          badge: pendingFeedbackCount > 0 ? pendingFeedbackCount : undefined
        },
        {
          label: 'Self Reflections',
          href: '/self-reflections',
          icon: <BookOpenCheck className="w-4 h-4 shrink-0" />
        },
        // Manager notes is private to managers and HR admin
        ...(activeRole === 'manager' || activeRole === 'hr_admin'
          ? [
              {
                label: 'Manager Notes',
                href: '/manager-notes',
                icon: <StickyNote className="w-4 h-4 shrink-0" />
              }
            ]
          : [])
      ]
    },
    {
      title: 'PERFORMANCE',
      items: [
        {
          label: 'Review Cycles',
          href: '/review-cycles',
          icon: <CalendarDays className="w-4 h-4 shrink-0" />
        },
        {
          label: 'OKRs',
          href: '/okrs',
          icon: <Target className="w-4 h-4 shrink-0" />
        },
        {
          label: 'Performance Reviews',
          href: '/reviews',
          icon: <FileCheck2 className="w-4 h-4 shrink-0" />
        },
        // Approvals tab
        ...(activeRole === 'manager' || activeRole === 'hr_admin'
          ? [
              {
                label: 'Approvals',
                href: '/approvals',
                icon: <CheckCircle className="w-4 h-4 shrink-0" />,
                badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
                badgeVariant: 'amber' as const
              }
            ]
          : [])
      ]
    },
    {
      title: 'INTELLIGENCE',
      items: [
        {
          label: 'AI Review Studio',
          href: '/ai-review-studio',
          icon: <Sparkles className="w-4 h-4 shrink-0 text-[#17251F]" />,
          isHighlight: true
        },
        {
          label: 'Analytics & Reports',
          href: '/analytics',
          icon: <BarChart3 className="w-4 h-4 shrink-0" />
        }
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        {
          label: 'Settings',
          href: '/settings',
          icon: <Settings className="w-4 h-4 shrink-0" />
        }
      ]
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#FFFFFF] border-r border-[#E6E8E1] select-none">
      {/* Brand Header */}
      <div className="h-14 px-4 border-b border-[#E6E8E1] flex items-center justify-between shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#17251F] text-[#C8ED78] flex items-center justify-center font-bold text-sm tracking-tight shadow-xs group-hover:scale-105 transition-transform">
            RF
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#17251F] tracking-tight leading-none">
                Review<span className="text-[#5876D8]">Forge</span>
              </span>
              <span className="text-[10px] text-[#747D75] font-medium tracking-wider mt-0.5">
                360° SYNTHESIS
              </span>
            </div>
          )}
        </Link>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="md:hidden p-1 rounded-lg text-[#747D75] hover:text-[#202820] hover:bg-[#F0F2EB] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-5 scrollbar-thin">
        {navGroups.map(group => (
          <div key={group.title} className="space-y-0.5">
            {!isCollapsed && (
              <div className="px-2.5 py-1 text-[10px] font-bold text-[#747D75] uppercase tracking-wider">
                {group.title}
              </div>
            )}
            {group.items.map(item => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#17251F] text-[#FFFFFF] shadow-2xs'
                      : item.isHighlight
                      ? 'bg-[#EEF9D1] text-[#17251F] hover:bg-[#E5F5BE] font-semibold border border-[#D6EFA0]'
                      : 'text-[#202820] hover:bg-[#F7F7F2] hover:text-[#17251F]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={
                        isActive
                          ? 'text-[#C8ED78]'
                          : item.isHighlight
                          ? 'text-[#17251F]'
                          : 'text-[#747D75]'
                      }
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!isCollapsed && item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                        item.badgeVariant === 'amber'
                          ? 'bg-[#D97706] text-white'
                          : 'bg-[#C8ED78] text-[#17251F]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Info & Collapse Toggle */}
      <div className="p-3 border-t border-[#E6E8E1] bg-[#FAFBF8] shrink-0">
        {!isCollapsed && (
          <div className="mb-2 p-2 rounded-lg bg-[#FFFFFF] border border-[#E6E8E1] text-[10px] text-[#747D75] flex items-start gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5876D8] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#17251F]">Demo Engine</span>
              <p className="text-[9px] text-[#747D75] leading-tight mt-0.5">
                Deterministic mock AI review synthesizer.
              </p>
            </div>
          </div>
        )}

        {/* Desktop Collapse Button */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex w-full items-center justify-center p-1.5 rounded-lg text-[#747D75] hover:text-[#17251F] hover:bg-[#EFEFEA] transition-colors cursor-pointer text-xs"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-[#747D75]">
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Sidebar</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block shrink-0 transition-all duration-200 ${
          isCollapsed ? 'w-16' : 'w-60'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#17251F]/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

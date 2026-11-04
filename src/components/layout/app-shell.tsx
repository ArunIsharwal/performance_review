'use client';

import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { ToastContainer } from '@/components/ui/toast-container';
import { useStore } from '@/lib/storage/use-store';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isHydrated } = useStore();

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F2]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#17251F] text-[#C8ED78] flex items-center justify-center font-bold text-lg animate-pulse ring-2 ring-[#C8ED78]/30">
            RF
          </div>
          <span className="text-xs font-semibold text-[#747D75] tracking-wider uppercase">Loading Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F7F7F2] text-[#202820]">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Topbar onToggleSidebar={() => setIsMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Floating Notifications */}
      <ToastContainer />
    </div>
  );
}


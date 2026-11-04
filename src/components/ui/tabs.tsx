'use client';

import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  return (
    <div
      className={`flex items-center gap-1 border-b border-[#E6E8E1] overflow-x-auto scrollbar-none ${className}`}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              isActive
                ? 'border-[#17251F] text-[#17251F] font-semibold'
                : 'border-transparent text-[#747D75] hover:text-[#202820] hover:border-[#D0D4CA]'
            }`}
          >
            {tab.icon && (
              <span className={`w-3.5 h-3.5 ${isActive ? 'text-[#17251F]' : 'text-[#747D75]'}`}>
                {tab.icon}
              </span>
            )}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                  isActive ? 'bg-[#C8ED78] text-[#17251F]' : 'bg-[#EFEFEA] text-[#747D75]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}


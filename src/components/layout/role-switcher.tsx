'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/storage/use-store';
import { UserRole } from '@/types';
import { ShieldCheck, UserCheck, User, Users, ChevronDown } from 'lucide-react';

export function RoleSwitcher() {
  const { activeRole, setActiveRole } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: { id: UserRole; title: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'hr_admin',
      title: 'HR Administrator',
      desc: 'Full org control, review cycles, calibration & release',
      icon: <ShieldCheck className="w-4 h-4 text-[#17251F]" />
    },
    {
      id: 'manager',
      title: 'Manager',
      desc: 'Team reviews, private observations, approve drafts',
      icon: <UserCheck className="w-4 h-4 text-[#5876D8]" />
    },
    {
      id: 'employee',
      title: 'Employee',
      desc: 'Own goals, self-reflection & released reviews only',
      icon: <User className="w-4 h-4 text-[#2C5E1A]" />
    },
    {
      id: 'peer_reviewer',
      title: 'Peer Reviewer',
      desc: '360° feedback submissions, anonymous privacy',
      icon: <Users className="w-4 h-4 text-[#D97706]" />
    }
  ];

  const current = roles.find(r => r.id === activeRole) || roles[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 bg-[#FFFFFF] border border-[#E6E8E1] hover:border-[#D0D4CA] rounded-lg text-xs font-medium text-[#202820] shadow-2xs transition-all cursor-pointer"
        title="Switch demo role perspective"
      >
        <span className="p-1 rounded bg-[#F0F2EB]">{current.icon}</span>
        <div className="text-left hidden sm:block">
          <div className="text-[10px] text-[#747D75] uppercase tracking-wider leading-none">
            Role
          </div>
          <div className="text-xs font-semibold text-[#17251F] mt-0.5">
            {current.title}
          </div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-[#747D75] ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-72 bg-[#FFFFFF] border border-[#E6E8E1] rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in zoom-in-95">
          <div className="px-3 py-2 border-b border-[#E6E8E1] mb-1">
            <span className="text-xs font-semibold text-[#17251F]">
              Select Demo Role Perspective
            </span>
            <p className="text-[11px] text-[#747D75] mt-0.5 leading-snug">
              Changes view permissions, visible tabs, and access restrictions across ReviewForge.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            {roles.map(r => {
              const isSelected = r.id === activeRole;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setActiveRole(r.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#F0F2EB] text-[#17251F]' : 'hover:bg-[#FAFBF8] text-[#202820]'
                  }`}
                >
                  <span className="p-1.5 rounded-md bg-[#FFFFFF] border border-[#E6E8E1] shrink-0 mt-0.5">
                    {r.icon}
                  </span>
                  <div>
                    <div className="text-xs font-semibold flex items-center gap-2">
                      {r.title}
                      {isSelected && (
                        <span className="text-[10px] font-bold text-[#17251F] bg-[#C8ED78] px-1.5 py-0.2 rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#747D75] mt-0.5 leading-tight">
                      {r.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


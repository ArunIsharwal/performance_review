import React from 'react';
import { Card } from './card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  badgeLabel?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon,
  badgeLabel
}: StatCardProps) {
  return (
    <Card className="p-5 hover:border-[#D0D4CA] transition-all">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-[#747D75] uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className="p-2 bg-[#F0F2EB] text-[#17251F] rounded-lg">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-2xl font-bold tracking-tight text-[#17251F]">
          {value}
        </span>
        {change && (
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPositive
                ? 'bg-[#EEF9D1] text-[#2C5E1A]'
                : 'bg-[#FDF2F2] text-[#9E2A2B]'
            }`}
          >
            {isPositive ? '↑ ' : '↓ '}
            {change}
          </span>
        )}
      </div>

      {(subtitle || badgeLabel) && (
        <div className="mt-2 flex items-center justify-between text-xs text-[#747D75]">
          <span>{subtitle}</span>
          {badgeLabel && (
            <span className="text-[11px] font-medium text-[#17251F] bg-[#FAFBF8] px-1.5 py-0.5 rounded border border-[#E6E8E1]">
              {badgeLabel}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}


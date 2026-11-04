import React from 'react';
import { Button } from './button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center bg-[#FAFBF8] border border-dashed border-[#E6E8E1] rounded-2xl ${className}`}
    >
      <div className="p-3 bg-[#FFFFFF] border border-[#E6E8E1] text-[#747D75] rounded-xl shadow-xs mb-3">
        {icon}
      </div>
      <h4 className="text-sm font-semibold text-[#17251F]">{title}</h4>
      <p className="text-xs text-[#747D75] max-w-sm mt-1 mb-4 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button size="sm" variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}


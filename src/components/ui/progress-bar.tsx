import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  colorScheme?: 'forest' | 'lime' | 'blue' | 'amber';
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  showLabel = false,
  colorScheme = 'forest',
  className = ''
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  const fillColors = {
    forest: 'bg-[#17251F]',
    lime: 'bg-[#C8ED78]',
    blue: 'bg-[#5876D8]',
    amber: 'bg-[#D97706]'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1 text-xs text-[#747D75]">
          <span>Progress</span>
          <span className="font-semibold text-[#17251F]">{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-[#E6E8E1] rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${fillColors[colorScheme]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}


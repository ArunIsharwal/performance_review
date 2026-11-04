import React from 'react';

type BadgeVariant =
  | 'default'
  | 'forest'
  | 'lime'
  | 'sage'
  | 'blue'
  | 'amber'
  | 'rose'
  | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
}

export function Badge({
  variant = 'default',
  children,
  dot = false,
  className = '',
  ...props
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, { bg: string; dotColor?: string }> = {
    default: {
      bg: 'bg-[#F0F2EB] text-[#202820] border-[#E6E8E1]',
      dotColor: 'bg-[#747D75]'
    },
    forest: {
      bg: 'bg-[#17251F] text-[#FFFFFF] border-[#17251F]',
      dotColor: 'bg-[#C8ED78]'
    },
    lime: {
      bg: 'bg-[#EEF9D1] text-[#17251F] border-[#D6EFA0]',
      dotColor: 'bg-[#17251F]'
    },
    sage: {
      bg: 'bg-[#DDE8DF] text-[#17251F] border-[#CADACD]',
      dotColor: 'bg-[#526E55]'
    },
    blue: {
      bg: 'bg-[#EEF2FC] text-[#344E9E] border-[#D3DDF6]',
      dotColor: 'bg-[#5876D8]'
    },
    amber: {
      bg: 'bg-[#FEF6E7] text-[#92540D] border-[#FBDCA8]',
      dotColor: 'bg-[#D97706]'
    },
    rose: {
      bg: 'bg-[#FDF2F2] text-[#9E2A2B] border-[#F8C8C8]',
      dotColor: 'bg-[#E11D48]'
    },
    outline: {
      bg: 'bg-transparent text-[#747D75] border-[#E6E8E1]',
      dotColor: 'bg-[#747D75]'
    }
  };

  const current = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide transition-colors ${current.bg} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${current.dotColor || 'bg-current'}`}
        />
      )}
      {children}
    </span>
  );
}


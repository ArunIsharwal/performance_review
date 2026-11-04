import React from 'react';

type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] cursor-pointer';

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5'
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-[#17251F] text-[#FFFFFF] hover:bg-[#233830] focus:ring-[#17251F] shadow-sm',
    accent:
      'bg-[#C8ED78] text-[#17251F] font-semibold hover:bg-[#B7E05C] focus:ring-[#9DCF38] shadow-sm',
    secondary:
      'bg-[#FFFFFF] text-[#202820] border border-[#E6E8E1] hover:bg-[#F7F7F2] hover:border-[#D0D4CA] focus:ring-[#17251F]',
    ghost:
      'bg-transparent text-[#202820] hover:bg-[#EFEFEA] focus:ring-[#17251F]',
    danger:
      'bg-[#9E2A2B] text-white hover:bg-[#831F20] focus:ring-[#9E2A2B] shadow-sm',
    link:
      'bg-transparent text-[#5876D8] hover:underline p-0 h-auto font-normal focus:ring-0 active:scale-100'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}


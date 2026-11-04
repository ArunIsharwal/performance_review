import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeValue: (val: string) => void;
  placeholder?: string;
  showShortcut?: boolean;
}

export function SearchInput({
  value,
  onChangeValue,
  placeholder = 'Search...',
  showShortcut = true,
  className = '',
  ...props
}: SearchInputProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3 w-4 h-4 text-[#747D75] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChangeValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-14 py-2 bg-[#FFFFFF] border border-[#E6E8E1] rounded-lg text-xs text-[#202820] placeholder-[#747D75] focus:outline-none focus:ring-1 focus:ring-[#17251F] focus:border-[#17251F] transition-all"
        {...props}
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChangeValue('')}
          className="absolute right-3 p-0.5 text-[#747D75] hover:text-[#202820] rounded cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : showShortcut ? (
        <span className="absolute right-3 text-[10px] text-[#747D75] bg-[#F0F2EB] px-1.5 py-0.5 rounded border border-[#E6E8E1] font-mono pointer-events-none">
          /
        </span>
      ) : null}
    </div>
  );
}


'use client';

import React from 'react';
import { useStore } from '@/lib/storage/use-store';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-[#2C5E1A] shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-[#9E2A2B] shrink-0" />,
          warning: <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />,
          info: <Info className="w-4 h-4 text-[#5876D8] shrink-0" />
        };

        const bgStyles = {
          success: 'bg-[#EEF9D1] border-[#C8ED78] text-[#17251F]',
          error: 'bg-[#FDF2F2] border-[#F8C8C8] text-[#9E2A2B]',
          warning: 'bg-[#FEF6E7] border-[#FBDCA8] text-[#92540D]',
          info: 'bg-[#EEF2FC] border-[#D3DDF6] text-[#202820]'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-lg text-xs font-medium transition-all animate-in fade-in slide-in-from-bottom-2 ${
              bgStyles[toast.type]
            }`}
          >
            <div className="flex items-center gap-2.5">
              {icons[toast.type]}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded hover:bg-black/5 text-current opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}


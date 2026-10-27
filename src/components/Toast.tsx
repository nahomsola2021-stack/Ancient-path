import React, { useEffect, useRef, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    timerRef.current = window.setTimeout(onClose, 4000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onClose]);

  const bgColors = {
    success: 'bg-[#062e24] border-[#10b981]',
    error: 'bg-[#311417] border-[#ef4444]',
    info: 'bg-[#1a362f] border-[#cc6548]',
  };

  const dotColors = {
    success: 'bg-[#10b981]',
    error: 'bg-[#ef4444]',
    info: 'bg-[#cc6548]',
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl ${bgColors[type]} animate-slide-in`}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotColors[type]}`} />
      <span className="text-sm font-medium text-white">{message}</span>
      <button
        onClick={onClose}
        className="text-[#9ca3af] hover:text-white ml-2 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

interface UseToastReturn {
  show: (message: string, type?: 'success' | 'error' | 'info') => void;
  hide: () => void;
  ToastComponent: React.ReactNode;
}

export function useToast(): UseToastReturn {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const show = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const hide = () => setToast(null);

  const ToastComponent = toast ? (
    <Toast message={toast.message} type={toast.type} onClose={hide} />
  ) : null;

  return { show, hide, ToastComponent };
}
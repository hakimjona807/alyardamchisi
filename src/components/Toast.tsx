import React from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toast, dismissToast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-indigo-500 shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl max-w-sm text-xs text-slate-800 dark:text-slate-200">
        {getIcon()}
        <span className="flex-1 font-medium">{toast.message}</span>
        <button
          type="button"
          onClick={dismissToast}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-lg"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

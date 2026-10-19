import React from 'react';
import { useResort } from '../context/ResortContext';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const NotificationToast = () => {
  const { toast } = useResort();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className="flex items-center gap-3 bg-[#11241a] text-white border border-emerald-500/40 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl">
        {toast.type === 'error' ? (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        )}
        <span className="text-sm font-medium tracking-wide">{toast.message}</span>
      </div>
    </div>
  );
};

export default NotificationToast;

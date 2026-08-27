'use client';

import React from 'react';
import { create } from 'zustand';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastStore {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  showToast: (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    set({ toasts: [...get().toasts, { id, message, type }] });
    setTimeout(() => {
      get().removeToast(id);
    }, 3500);
  },
  removeToast: (id) => {
    set({ toasts: get().toasts.filter(t => t.id !== id) });
  }
}));

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-xl border text-sm font-medium ${
              toast.type === 'success'
                ? 'bg-slate-900 text-white border-slate-800 dark:bg-white dark:text-slate-950 dark:border-slate-100'
                : toast.type === 'error'
                ? 'bg-rose-900 text-white border-rose-800 dark:bg-rose-950 dark:text-rose-100 dark:border-rose-900'
                : 'bg-[#0148C3] text-white border-[#013ca6]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
              {toast.type === 'error' && <AlertCircle size={18} className="text-rose-400 shrink-0" />}
              {toast.type === 'info' && <Info size={18} className="text-blue-300 shrink-0" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'new' | 'bestseller' | 'discount' | 'member' | 'default' | 'outline' | 'success' | 'warning';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'sm',
  children,
  ...props
}) => {
  const base = 'inline-flex items-center font-bold uppercase tracking-wider rounded-full';

  const sizes = {
    sm: 'text-[10px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1'
  };

  const variants = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    new: 'bg-[#0148C3] text-white shadow-sm',
    bestseller: 'bg-amber-500 text-white shadow-sm',
    discount: 'bg-rose-500 text-white shadow-sm',
    member: 'bg-[#0148C3]/10 dark:bg-[#0148C3]/25 text-[#0148C3] dark:text-[#93c5fd] border border-[#0148C3]/30',
    outline: 'border border-slate-300 dark:border-[#273244] text-slate-700 dark:text-slate-300',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
  };

  return (
    <span className={twMerge(clsx(base, sizes[size], variants[variant], className))} {...props}>
      {children}
    </span>
  );
};

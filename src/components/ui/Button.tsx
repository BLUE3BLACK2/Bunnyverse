import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium uppercase tracking-editorial rounded-[4px] transition-all duration-150 focus:outline-none disabled:opacity-40 disabled:pointer-events-none cursor-pointer select-none';

    const variants = {
      primary: 'bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200',
      secondary: 'bg-[#F7F7F7] hover:bg-[#EAEAEA] text-black dark:bg-[#111111] dark:hover:bg-[#222222] dark:text-white',
      outline: 'border border-[#E5E5E5] dark:border-[#292929] bg-transparent hover:border-black dark:hover:border-white text-black dark:text-white',
      ghost: 'bg-transparent hover:bg-[#F7F7F7] dark:hover:bg-[#111111] text-black dark:text-white',
      danger: 'bg-black text-white dark:bg-white dark:text-black'
    };

    const sizes = {
      sm: 'text-[11px] px-3.5 py-2 gap-1.5',
      md: 'text-xs px-5 py-2.5 gap-2',
      lg: 'text-xs sm:text-sm px-6 py-3 gap-2.5',
      icon: 'p-2 w-8 h-8 rounded-[4px]'
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

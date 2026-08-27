import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg',
          className
        )
      )}
      {...props}
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] rounded-2xl p-3.5 space-y-3 overflow-hidden">
      <Skeleton className="w-full aspect-square rounded-xl" />
      <div className="space-y-2 pt-1">
        <Skeleton className="h-3 w-16 rounded-full" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-5 w-24 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

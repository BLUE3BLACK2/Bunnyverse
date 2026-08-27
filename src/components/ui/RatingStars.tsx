import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showCount?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewCount,
  size = 14,
  showCount = true
}) => {
  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= Math.floor(rating);
          const isHalf = star === Math.ceil(rating) && rating % 1 !== 0;

          return (
            <Star
              key={star}
              size={size}
              className={isFilled ? 'fill-amber-400 text-amber-400' : isHalf ? 'fill-amber-400/50 text-amber-400' : 'text-slate-300 dark:text-slate-600'}
            />
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {rating.toFixed(1)} {reviewCount !== undefined && `(${reviewCount})`}
        </span>
      )}
    </div>
  );
};

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';

interface EmptyStateProps {
  type?: 'cart' | 'wishlist' | 'search' | 'orders' | 'default';
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'default',
  title,
  description,
  actionText,
  actionHref,
  onActionClick
}) => {
  const configs = {
    cart: {
      title: 'Your shopping bag is empty.',
      description: 'Discover official apparel, photocards, and lightsticks for your collection.',
      actionText: 'START SHOPPING',
      actionHref: '/shop'
    },
    wishlist: {
      title: 'No saved items.',
      description: 'Save your favorite merchandise to purchase later.',
      actionText: 'EXPLORE SHOP',
      actionHref: '/shop'
    },
    search: {
      title: 'No products found.',
      description: "We couldn't find merchandise matching your current search or filters.",
      actionText: 'RESET FILTERS',
      actionHref: undefined
    },
    orders: {
      title: 'No orders placed yet.',
      description: "You haven't placed any orders yet. Start your BUNNYVERSE collection today.",
      actionText: 'EXPLORE SHOP',
      actionHref: '/shop'
    },
    default: {
      title: 'No items available.',
      description: 'Check back later for upcoming collection drops.',
      actionText: 'RETURN TO HOME',
      actionHref: '/'
    }
  };

  const current = configs[type] || configs.default;
  const finalTitle = title || current.title;
  const finalDesc = description || current.description;
  const finalActionText = actionText || current.actionText;
  const finalActionHref = actionHref !== undefined ? actionHref : current.actionHref;

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 my-6 max-w-md mx-auto">
      <div className="relative w-28 h-28 md:w-36 md:h-36 mb-5">
        <Image
          src="/brand/bunnies.png"
          alt="BUNNYVERSE"
          fill
          className="object-contain"
          priority
        />
      </div>

      <h3 className="text-base sm:text-lg font-medium uppercase tracking-tight text-black dark:text-white mb-1.5">
        {finalTitle}
      </h3>

      <p className="text-xs text-[#777777] dark:text-[#888888] mb-6 max-w-xs leading-relaxed">
        {finalDesc}
      </p>

      {finalActionHref ? (
        <Link href={finalActionHref}>
          <Button variant="primary" size="md">
            {finalActionText}
          </Button>
        </Link>
      ) : (
        <Button variant="primary" size="md" onClick={onActionClick}>
          {finalActionText}
        </Button>
      )}
    </div>
  );
};

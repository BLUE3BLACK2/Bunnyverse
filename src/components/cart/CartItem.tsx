'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-3 py-3.5 border-b border-[#E5E5E5] dark:border-[#292929] last:border-0">
      {/* Thumbnail */}
      <Link
        href={`/products/${item.product.slug}`}
        className="relative w-16 h-16 rounded-[2px] bg-[#F7F7F7] dark:bg-[#111111] overflow-hidden shrink-0 border border-[#E5E5E5] dark:border-[#292929]"
      >
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/products/${item.product.slug}`}
              className="text-xs font-normal text-black dark:text-white line-clamp-1 hover:underline"
            >
              {item.product.name}
            </Link>
            <button
              onClick={() => removeItem(item.id)}
              aria-label="Remove item"
              className="p-1 text-[#777777] hover:text-black dark:hover:text-white transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#777777] dark:text-[#888888]">
            {item.selectedSize && (
              <span className="border border-[#E5E5E5] dark:border-[#292929] px-1 rounded-[2px]">
                {item.selectedSize}
              </span>
            )}
            {item.selectedVariant && (
              <span className="border border-[#E5E5E5] dark:border-[#292929] px-1 rounded-[2px]">
                {item.selectedVariant}
              </span>
            )}
            {item.selectedMember && (
              <span className="uppercase text-black dark:text-white font-medium">
                {item.selectedMember}
              </span>
            )}
          </div>
        </div>

        {/* Quantity Controls & Price */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] bg-white dark:bg-black">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="p-1 hover:bg-[#F7F7F7] dark:hover:bg-[#111111] text-black dark:text-white"
            >
              <Minus size={11} />
            </button>
            <span className="px-2 text-xs font-mono text-black dark:text-white min-w-[20px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
              aria-label="Increase quantity"
              className="p-1 hover:bg-[#F7F7F7] dark:hover:bg-[#111111] text-black dark:text-white disabled:opacity-30"
            >
              <Plus size={11} />
            </button>
          </div>

          <span className="text-xs font-medium text-black dark:text-white">
            Rp{(item.product.price * item.quantity).toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </div>
  );
};

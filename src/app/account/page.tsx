'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Button } from '@/components/ui/Button';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'payments'>('profile');
  const { orders } = useDashboardStore();
  const { items: wishlistItems } = useWishlistStore();

  const user = {
    name: 'Alya Rahma',
    email: 'alya.rahma@example.com',
    phone: '+62 812 3456 7890',
    tier: 'VIP Bunnies Club',
    joinDate: 'January 2026',
    avatar: '/members/minji.jpg'
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen py-8 md:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Account Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-[4px] bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929]">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-[2px] overflow-hidden bg-neutral-200 dark:bg-neutral-800 border border-[#E5E5E5] dark:border-[#292929]">
              <Image src={user.avatar} alt={user.name} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-medium tracking-tight uppercase text-black dark:text-white">
                  {user.name}
                </h1>
                <span className="px-1.5 py-0.5 rounded-[2px] text-[9px] font-medium tracking-editorial uppercase bg-black text-white dark:bg-white dark:text-black">
                  {user.tier}
                </span>
              </div>
              <p className="text-xs text-[#777777] dark:text-[#888888]">
                {user.email} · Joined {user.joinDate}
              </p>
            </div>
          </div>

          <Link href="/wishlist">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Heart size={13} />
              <span>Wishlist ({wishlistItems.length})</span>
            </Button>
          </Link>
        </div>

        {/* Account Tabs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-1">
            {(
              [
                { id: 'profile' as const, label: 'Profile Overview', icon: User },
                { id: 'orders' as const, label: 'Order History', icon: Package },
                { id: 'addresses' as const, label: 'Saved Addresses', icon: MapPin },
                { id: 'payments' as const, label: 'Payment Methods', icon: CreditCard }
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[2px] text-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black font-medium'
                      : 'text-[#555555] dark:text-[#B5B5B5] hover:bg-[#F7F7F7] dark:hover:bg-[#111111]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={14} strokeWidth={1.5} />
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight size={13} />
                </button>
              );
            })}
          </div>

          {/* Main Tab Panel */}
          <div className="lg:col-span-9 bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-6 space-y-6">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                  Personal Profile
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#777777] block text-[10px] uppercase tracking-editorial">Legal Name</span>
                    <span className="font-medium text-black dark:text-white mt-0.5 block">{user.name}</span>
                  </div>
                  <div>
                    <span className="text-[#777777] block text-[10px] uppercase tracking-editorial">Email</span>
                    <span className="font-medium text-black dark:text-white mt-0.5 block">{user.email}</span>
                  </div>
                  <div>
                    <span className="text-[#777777] block text-[10px] uppercase tracking-editorial">Phone</span>
                    <span className="font-medium text-black dark:text-white mt-0.5 block">{user.phone}</span>
                  </div>
                  <div>
                    <span className="text-[#777777] block text-[10px] uppercase tracking-editorial">Club Tier</span>
                    <span className="font-medium text-black dark:text-white mt-0.5 block">{user.tier}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                  Order History ({orders.length})
                </h3>
                <div className="divide-y divide-[#E5E5E5] dark:divide-[#292929]">
                  {orders.map((o) => (
                    <div key={o.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-medium text-black dark:text-white">#{o.id}</span>
                        <span className="text-[#777777] text-[11px] block">{new Date(o.createdAt).toLocaleDateString()} · {o.items.length} items</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-black dark:text-white">Rp{o.total.toLocaleString('id-ID')}</span>
                        <Link href={`/track-order?orderId=${o.id}`} className="text-[11px] underline text-black dark:text-white">
                          Track
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                  Saved Addresses
                </h3>
                <div className="p-3 border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-[#555555] dark:text-[#B5B5B5]">
                  <span className="font-medium text-black dark:text-white block mb-1">Primary Residence</span>
                  <p>Sudirman Central Plaza Tower 2, Floor 14, Jakarta Selatan 12190</p>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                  Payment Methods
                </h3>
                <div className="p-3 border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-[#555555] dark:text-[#B5B5B5]">
                  <span className="font-medium text-black dark:text-white block mb-1">BCA Virtual Account</span>
                  <p>Auto-linked for express one-click checkout.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

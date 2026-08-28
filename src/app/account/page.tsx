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
  Settings,
  ChevronRight,
  Sun,
  Moon,
  Laptop,
  Check
} from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useThemeStore } from '@/store/themeStore';
import { Button } from '@/components/ui/Button';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'settings' | 'addresses' | 'payments'>('profile');
  const { orders } = useDashboardStore();
  const { items: wishlistItems, removeFromWishlist } = useWishlistStore();
  const { themeMode, setThemeMode, theme } = useThemeStore();

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
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-[4px] bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929]">
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

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setActiveTab('settings')}
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
            >
              <Settings size={13} />
              <span>Settings & Theme</span>
            </Button>
          </div>
        </div>

        {/* Account Tabs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-1">
            {(
              [
                { id: 'profile' as const, label: 'Profile Overview', icon: User, badge: undefined },
                { id: 'orders' as const, label: 'Order History', icon: Package, badge: orders.length },
                { id: 'wishlist' as const, label: 'Saved Wishlist', icon: Heart, badge: wishlistItems.length },
                { id: 'settings' as const, label: 'Settings & Theme', icon: Settings, badge: undefined },
                { id: 'addresses' as const, label: 'Saved Addresses', icon: MapPin, badge: undefined },
                { id: 'payments' as const, label: 'Payment Methods', icon: CreditCard, badge: undefined }
              ] as Array<{ id: 'profile' | 'orders' | 'wishlist' | 'settings' | 'addresses' | 'payments'; label: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>; badge?: number }>
            ).map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
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
                  <div className="flex items-center gap-1.5">
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black' : 'bg-neutral-200 dark:bg-neutral-800 text-[#555555] dark:text-[#B5B5B5]'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                    <ChevronRight size={13} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Tab Panel */}
          <div className="lg:col-span-9 bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-6 space-y-6">
            {/* 1. Profile Overview */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                  Personal Profile Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#777777] block text-[10px] uppercase tracking-editorial">Legal Name</span>
                    <span className="font-medium text-black dark:text-white mt-0.5 block">{user.name}</span>
                  </div>
                  <div>
                    <span className="text-[#777777] block text-[10px] uppercase tracking-editorial">Email Address</span>
                    <span className="font-medium text-black dark:text-white mt-0.5 block">{user.email}</span>
                  </div>
                  <div>
                    <span className="text-[#777777] block text-[10px] uppercase tracking-editorial">Contact Phone</span>
                    <span className="font-medium text-black dark:text-white mt-0.5 block">{user.phone}</span>
                  </div>
                  <div>
                    <span className="text-[#777777] block text-[10px] uppercase tracking-editorial">Fandom Tier</span>
                    <span className="font-medium text-black dark:text-white mt-0.5 block">{user.tier}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Order History */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                  Order History ({orders.length})
                </h3>
                {orders.length === 0 ? (
                  <p className="text-xs text-[#777777] dark:text-[#888888] py-4">No past orders found.</p>
                ) : (
                  <div className="divide-y divide-[#E5E5E5] dark:divide-[#292929]">
                    {orders.map((o) => (
                      <div key={o.id} className="py-3.5 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono font-medium text-black dark:text-white">#{o.id}</span>
                          <span className="text-[#777777] text-[11px] block">{new Date(o.createdAt).toLocaleDateString()} · {o.items.length} items</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono font-medium text-black dark:text-white">Rp{o.total.toLocaleString('id-ID')}</span>
                          <Link href={`/track-order?orderId=${o.id}`} className="text-[11px] underline text-black dark:text-white">
                            Track Order
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Wishlist Preview */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                  <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white">
                    Saved Wishlist Items ({wishlistItems.length})
                  </h3>
                  <Link href="/wishlist" className="text-xs underline text-black dark:text-white">
                    View Full Wishlist
                  </Link>
                </div>
                {wishlistItems.length === 0 ? (
                  <p className="text-xs text-[#777777] dark:text-[#888888] py-4">Your wishlist is currently empty.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-2.5 border border-[#E5E5E5] dark:border-[#292929] rounded-[2px]">
                        <div className="relative w-12 h-12 rounded-[2px] overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.slug}`} className="text-xs font-medium text-black dark:text-white hover:underline truncate block">
                            {item.name}
                          </Link>
                          <span className="text-xs font-mono text-[#777777] dark:text-[#888888]">
                            Rp{item.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-[11px] text-red-500 hover:underline shrink-0 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. Settings & Theme Selection (Section 13) */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                    Website Theme Preferences
                  </h3>
                  <p className="text-xs text-[#777777] dark:text-[#888888] mt-2">
                    Customize your visual shopping experience. Choose between Light, Dark, or System automated mode.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {/* Light Mode */}
                  <button
                    type="button"
                    onClick={() => setThemeMode('light')}
                    className={`p-4 rounded-[4px] border text-left transition-all cursor-pointer ${
                      themeMode === 'light'
                        ? 'border-black bg-white text-black dark:border-white shadow-xs'
                        : 'border-[#E5E5E5] dark:border-[#292929] bg-[#F7F7F7] dark:bg-[#111111] hover:border-black dark:hover:border-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Sun size={20} strokeWidth={1.5} className="text-black dark:text-white" />
                      {themeMode === 'light' && <Check size={16} className="text-black dark:text-white" strokeWidth={2.5} />}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-editorial block text-black dark:text-white">
                      LIGHT MODE
                    </span>
                    <span className="text-[11px] text-[#777777] dark:text-[#888888] mt-1 block">
                      Clean white editorial aesthetic
                    </span>
                  </button>

                  {/* Dark Mode */}
                  <button
                    type="button"
                    onClick={() => setThemeMode('dark')}
                    className={`p-4 rounded-[4px] border text-left transition-all cursor-pointer ${
                      themeMode === 'dark'
                        ? 'border-black bg-white text-black dark:bg-black dark:text-white dark:border-white shadow-xs'
                        : 'border-[#E5E5E5] dark:border-[#292929] bg-[#F7F7F7] dark:bg-[#111111] hover:border-black dark:hover:border-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Moon size={20} strokeWidth={1.5} className="text-black dark:text-white" />
                      {themeMode === 'dark' && <Check size={16} className="text-black dark:text-white" strokeWidth={2.5} />}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-editorial block text-black dark:text-white">
                      DARK MODE
                    </span>
                    <span className="text-[11px] text-[#777777] dark:text-[#888888] mt-1 block">
                      High-contrast deep black mode
                    </span>
                  </button>

                  {/* System Mode */}
                  <button
                    type="button"
                    onClick={() => setThemeMode('system')}
                    className={`p-4 rounded-[4px] border text-left transition-all cursor-pointer ${
                      themeMode === 'system'
                        ? 'border-black bg-white text-black dark:bg-black dark:text-white dark:border-white shadow-xs'
                        : 'border-[#E5E5E5] dark:border-[#292929] bg-[#F7F7F7] dark:bg-[#111111] hover:border-black dark:hover:border-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Laptop size={20} strokeWidth={1.5} className="text-black dark:text-white" />
                      {themeMode === 'system' && <Check size={16} className="text-black dark:text-white" strokeWidth={2.5} />}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-editorial block text-black dark:text-white">
                      SYSTEM
                    </span>
                    <span className="text-[11px] text-[#777777] dark:text-[#888888] mt-1 block">
                      Syncs with OS preferences ({theme})
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* 5. Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                  Saved Addresses
                </h3>
                <div className="p-3.5 border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-[#555555] dark:text-[#B5B5B5]">
                  <span className="font-medium text-black dark:text-white block mb-1">Primary Residence</span>
                  <p>Sudirman Central Plaza Tower 2, Floor 14, Jakarta Selatan 12190</p>
                </div>
              </div>
            )}

            {/* 6. Payment Methods */}
            {activeTab === 'payments' && (
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                  Payment Methods
                </h3>
                <div className="p-3.5 border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-[#555555] dark:text-[#B5B5B5]">
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

'use client';

import React, { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, Heart, Search, User, Menu, X, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { ThemeToggle } from './ThemeToggle';

const emptySubscribe = () => () => {};

const subscribeTheme = (callback: () => void) => {
  window.addEventListener('storage', callback);
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => {
    window.removeEventListener('storage', callback);
    observer.disconnect();
  };
};

const getThemeSnapshot = () => {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';
};

const getServerSnapshot = () => 'light';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { openDrawer } = useCartStore();
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);

  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const currentTheme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerSnapshot);

  const cartCount = isClient ? cartItems.reduce((acc, i) => acc + i.quantity, 0) : 0;
  const wishlistCount = isClient ? wishlistItems.length : 0;

  const popularSearches = [
    'Haerin',
    'Lightstick',
    'Bunny Hoodie',
    'Photocard',
    'Minji',
    'OT5',
    'Varsity Jacket',
    'Hanni'
  ];

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formQuery = (formData.get('search') as string || '').trim();
    const targetQuery = formQuery || searchQuery.trim();

    setIsSearchFocused(false);
    setIsMobileMenuOpen(false);

    if (targetQuery) {
      router.push(`/shop?search=${encodeURIComponent(targetQuery)}`);
    } else {
      router.push('/shop');
    }
  };

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    setIsSearchFocused(false);
    setIsMobileMenuOpen(false);
    router.push(`/shop?search=${encodeURIComponent(term.trim())}`);
  };

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'SHOP', href: '/shop' },
    { label: 'NEW ARRIVALS', href: '/new-arrivals' },
    { label: 'BEST SELLERS', href: '/best-sellers' },
    { label: 'CATEGORIES', href: '/categories' },
    { label: 'MEMBERS', href: '/members' },
    { label: 'DISCOUNT', href: '/discount' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-black border-b border-[#E5E5E5] dark:border-[#292929] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4 lg:gap-8">
          {/* Left: Mobile Toggle & Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1 text-black dark:text-white"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            <Link href="/" className="flex items-center">
              <div className="relative h-7 w-36 sm:w-44">
                <Image
                  src={currentTheme === 'dark' ? '/brand/logo-white.png' : '/brand/logo-black.png'}
                  alt="BUNNYVERSE"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 shrink-0">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href) && !link.href.includes('?'));

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[12px] tracking-nav transition-colors py-1 relative ${
                    isActive
                      ? 'text-black dark:text-white font-medium border-b border-black dark:border-white'
                      : 'text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white font-normal'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Box with Suggestions */}
          <div ref={searchContainerRef} className="hidden sm:block flex-1 max-w-xs md:max-w-sm lg:max-w-md relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                name="search"
                autoComplete="off"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search BUNNYVERSE merchandise..."
                className="w-full pl-3.5 pr-8 py-2 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] text-xs text-black dark:text-white placeholder-[#777777] dark:placeholder-[#888888] focus:outline-none focus:border-black dark:focus:border-white transition-colors"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white cursor-pointer p-1"
              >
                <Search size={14} strokeWidth={1.5} />
              </button>
            </form>

            {/* Popular Search Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] shadow-lg p-3 z-50">
                <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block mb-2">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleQuickSearch(term);
                      }}
                      onClick={() => handleQuickSearch(term)}
                      className="px-2.5 py-1 rounded-[2px] bg-[#F7F7F7] dark:bg-[#111111] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-xs text-[#555555] dark:text-[#B5B5B5] transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Utility Icons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile Search Button */}
            <Link
              href="/shop"
              aria-label="Search"
              className="sm:hidden p-2 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-[4px]"
            >
              <Search size={19} strokeWidth={1.5} />
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative p-2 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-[4px] transition-colors"
            >
              <Heart size={19} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white dark:bg-white dark:text-black text-[9px] font-medium rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link
              href="/account"
              aria-label="Account"
              className="p-2 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-[4px] transition-colors"
            >
              <User size={19} strokeWidth={1.5} />
            </Link>

            {/* Cart Button with Count Badge */}
            <button
              onClick={openDrawer}
              aria-label="Shopping Cart"
              className="relative p-2 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-[4px] transition-colors cursor-pointer"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white dark:bg-white dark:text-black text-[9px] font-medium rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60"
          />
          <div className="relative w-4/5 max-w-xs h-full bg-white dark:bg-black border-r border-[#E5E5E5] dark:border-[#292929] p-6 flex flex-col justify-between shadow-xl z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5] dark:border-[#292929]">
                <div className="relative h-6 w-32">
                  <Image
                    src={currentTheme === 'dark' ? '/brand/logo-white.png' : '/brand/logo-black.png'}
                    alt="BUNNYVERSE"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-black dark:text-white"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-4 relative">
                <input
                  type="text"
                  name="search"
                  autoComplete="off"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search merchandise..."
                  className="w-full pl-3 pr-8 py-2 bg-[#F7F7F7] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] text-xs text-black dark:text-white"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white cursor-pointer p-1"
                >
                  <Search size={14} />
                </button>
              </form>

              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 text-xs tracking-nav text-black dark:text-white hover:underline"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={13} className="text-[#777777]" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#292929] text-[11px] text-[#777777] dark:text-[#888888]">
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block mb-2 font-medium text-black dark:text-white hover:underline">
                Merchant Admin Dashboard →
              </Link>
              <span>BUNNYVERSE Fashion &copy; 2026</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

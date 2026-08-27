'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnnouncementBar } from './AnnouncementBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { ToastContainer } from '../ui/Toast';
import { useThemeStore } from '@/store/themeStore';

interface StorefrontShellProps {
  children: React.ReactNode;
}

export const StorefrontShell: React.FC<StorefrontShellProps> = ({ children }) => {
  const pathname = usePathname();
  const { initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <>
        {children}
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <ToastContainer />
    </>
  );
};

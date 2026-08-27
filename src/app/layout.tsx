import type { Metadata } from 'next';
import './globals.css';
import { StorefrontShell } from '@/components/layout/StorefrontShell';

export const metadata: Metadata = {
  title: 'BUNNYVERSE — Modern Concept Merchandise & Streetwear',
  description: 'Official fan merchandise e-commerce platform inspired by NewJeans and Bunnies worldwide.',
  icons: {
    icon: '/brand/favicon.png',
    apple: '/brand/favicon.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900 dark:bg-[#080B12] dark:text-slate-100 selection:bg-[#0148C3] selection:text-white">
        <StorefrontShell>
          {children}
        </StorefrontShell>
      </body>
    </html>
  );
}

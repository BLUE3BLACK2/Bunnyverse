'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { CheckCircle2, Truck, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useDashboardStore } from '@/store/dashboardStore';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'BV10293';
  const { orders } = useDashboardStore();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  useEffect(() => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen py-12 md:py-16 transition-colors">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Checkmark Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black text-white dark:bg-white dark:text-black mb-2">
          <CheckCircle2 size={28} />
        </div>

        {/* Heading */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
            TRANSACTION CONFIRMED
          </span>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-black dark:text-white">
            ORDER #{orderId}
          </h1>
          <p className="text-xs text-[#555555] dark:text-[#B5B5B5] max-w-sm mx-auto leading-relaxed">
            Thank you for your order! Your BUNNYVERSE merchandise has been scheduled for packaging and dispatch.
          </p>
        </div>

        {/* Order Card Details */}
        <div className="bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-6 text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
            <div>
              <span className="text-[10px] text-[#777777] block uppercase tracking-editorial">Order ID</span>
              <span className="text-sm font-mono font-medium text-black dark:text-white">
                #{orderId}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#777777] block uppercase tracking-editorial">Estimated Dispatch</span>
              <span className="text-xs font-medium text-black dark:text-white">
                2-3 Business Days
              </span>
            </div>
          </div>

          {/* Breakdown */}
          {order && (
            <div className="space-y-1.5 text-xs text-[#555555] dark:text-[#B5B5B5]">
              <div className="flex justify-between">
                <span>Customer</span>
                <span className="font-medium text-black dark:text-white">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Destination</span>
                <span className="font-medium text-black dark:text-white truncate max-w-xs">
                  {order.address}, {order.city}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment</span>
                <span className="font-medium text-black dark:text-white">{order.paymentDetail}</span>
              </div>
              <div className="flex justify-between text-xs font-medium text-black dark:text-white pt-2 border-t border-[#E5E5E5] dark:border-[#292929]">
                <span>Total Paid</span>
                <span>Rp{order.total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href={`/track-order?orderId=${orderId}`} className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full sm:w-auto gap-2 text-xs">
              <Truck size={14} />
              <span>TRACK ORDER</span>
            </Button>
          </Link>
          <Link href="/shop" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto gap-2 text-xs">
              <Home size={14} />
              <span>CONTINUE SHOPPING</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#777777]">Processing order confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

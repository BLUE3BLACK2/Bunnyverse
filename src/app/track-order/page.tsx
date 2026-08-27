'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  MapPin
} from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/Button';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const urlOrderId = searchParams.get('orderId') || '';
  const { orders } = useDashboardStore();

  const [searchQuery, setSearchQuery] = useState(urlOrderId || 'BV10293');
  const [activeQuery, setActiveQuery] = useState(urlOrderId || 'BV10293');

  const selectedOrder = useMemo(() => {
    const q = activeQuery.trim().toUpperCase().replace('#', '');
    return orders.find(
      (o) => o.id.toUpperCase() === q || o.trackingNumber.toUpperCase() === q
    );
  }, [orders, activeQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(searchQuery);
  };

  const handleSelectSample = (sampleId: string) => {
    setSearchQuery(sampleId);
    setActiveQuery(sampleId);
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen py-8 md:py-12 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
            LOGISTICS PROTOCOL
          </span>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-black dark:text-white">
            Track Your Order
          </h1>
          <p className="text-xs text-[#555555] dark:text-[#B5B5B5] max-w-sm mx-auto">
            Enter your Order ID (e.g. <strong>BV10293</strong>) to check live status.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-4 sm:p-5">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative flex-1 w-full">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777777]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. BV10293)"
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white placeholder-[#777777]"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto text-xs shrink-0"
            >
              TRACK PARCEL
            </Button>
          </form>

          {/* Quick sample chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#E5E5E5] dark:border-[#292929] text-xs text-[#777777]">
            <span>Sample Orders:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => handleSelectSample(o.id)}
                className="px-2 py-0.5 rounded-[2px] bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929] font-mono text-[10px] text-black dark:text-white hover:border-black transition-colors cursor-pointer"
              >
                #{o.id}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Order Results */}
        {selectedOrder ? (
          <div className="bg-white dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-6 space-y-6">
            {/* Top Details */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E5E5] dark:border-[#292929]">
              <div>
                <span className="text-[10px] text-[#777777] uppercase tracking-editorial block">Order Reference</span>
                <span className="text-base font-mono font-medium text-black dark:text-white">
                  #{selectedOrder.id}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#777777] uppercase tracking-editorial block">Courier Tracking</span>
                <span className="text-xs font-mono text-black dark:text-white">
                  {selectedOrder.trackingNumber}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#777777] uppercase tracking-editorial block">Status</span>
                <span className="text-xs uppercase font-medium text-black dark:text-white">
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            {/* Stepper Steps */}
            <div className="space-y-4">
              <span className="text-xs font-medium uppercase tracking-editorial text-black dark:text-white block">
                LOGISTICS TIMELINE
              </span>

              <div className="space-y-3">
                {selectedOrder.trackingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="mt-0.5">
                      {step.completed ? (
                        <CheckCircle2 size={15} className="text-black dark:text-white" />
                      ) : (
                        <Clock size={15} className="text-[#777777]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-black dark:text-white block">
                        {step.title}
                      </span>
                      <p className="text-[11px] text-[#777777] mt-0.5">
                        {step.description}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[#777777]">
                      {step.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination Info */}
            <div className="pt-4 border-t border-[#E5E5E5] dark:border-[#292929] text-xs text-[#555555] dark:text-[#B5B5B5] space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-black dark:text-white">
                <MapPin size={13} />
                <span>Destination:</span>
              </div>
              <p className="pl-4 text-[11px]">
                {selectedOrder.customerName} · {selectedOrder.phone} <br />
                {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.postalCode}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] text-xs text-[#777777]">
            <Package size={24} className="mx-auto mb-2 opacity-50" />
            <span>No order found matching query &ldquo;{activeQuery}&rdquo;.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#777777]">Loading Tracking System...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}

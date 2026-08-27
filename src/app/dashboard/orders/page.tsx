'use client';

import React, { useState } from 'react';
import {
  Search,
  Eye
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { useDashboardStore } from '@/store/dashboardStore';
import { Modal } from '@/components/ui/Modal';
import { Order, OrderStatus } from '@/types';
import { useToastStore } from '@/components/ui/Toast';

export default function DashboardOrdersPage() {
  const { orders, updateOrderStatus } = useDashboardStore();
  const { showToast } = useToastStore();

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    if (selectedStatus !== 'all' && o.status !== selectedStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!o.id.toLowerCase().includes(q) && !o.customerName.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    showToast(`Order #${orderId} status updated to "${status}"!`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader
        title="Order Management"
        subtitle="Manage customer orders, track fulfillment stages, and update shipment statuses."
      />

      <main className="p-6 space-y-6 flex-1">
        {/* Controls Bar */}
        <div className="bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Order ID or Customer..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0148C3]"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0148C3]"
            >
              <option value="all">All Statuses ({orders.length})</option>
              <option value="paid">Paid</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-[#273244] text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Payment Method</th>
                  <th className="py-3.5 px-4">Status & Update</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#273244]">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-extrabold text-[#0148C3] dark:text-[#60a5fa]">
                      #{o.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {o.customerName}
                      </span>
                      <span className="text-[11px] text-slate-400">{o.email}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-extrabold text-slate-900 dark:text-white">
                      Rp{o.total.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-300">
                      {o.paymentDetail}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase border focus:outline-none cursor-pointer ${
                          o.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                            : o.status === 'shipped'
                            ? 'bg-blue-500/10 text-blue-500 border-blue-500/30'
                            : o.status === 'cancelled'
                            ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => setViewingOrder(o)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0148C3] dark:text-[#93c5fd] hover:underline"
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Order Details View Modal */}
      <Modal isOpen={!!viewingOrder} onClose={() => setViewingOrder(null)} title={`Order #${viewingOrder?.id}`} maxWidth="lg">
        {viewingOrder && (
          <div className="space-y-6 text-xs sm:text-sm">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">Customer</span>
                <p className="font-bold text-slate-900 dark:text-white">{viewingOrder.customerName}</p>
                <p className="text-slate-500">{viewingOrder.email}</p>
                <p className="text-slate-500">{viewingOrder.phone}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">Shipping Destination</span>
                <p className="text-slate-700 dark:text-slate-300">{viewingOrder.address}</p>
                <p className="text-slate-700 dark:text-slate-300">{viewingOrder.city}, {viewingOrder.province} {viewingOrder.postalCode}</p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 block uppercase">Ordered Items</span>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {viewingOrder.items.map((i) => (
                  <div key={i.id} className="py-2 flex justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{i.product.name}</p>
                      <p className="text-[11px] text-slate-400">Qty: {i.quantity} {i.selectedSize && `· Size: ${i.selectedSize}`}</p>
                    </div>
                    <span className="font-mono font-bold">
                      Rp{(i.product.price * i.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
              <span className="font-bold text-slate-900 dark:text-white">Grand Total</span>
              <span className="text-lg font-mono font-extrabold text-[#0148C3] dark:text-[#60a5fa]">
                Rp{viewingOrder.total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

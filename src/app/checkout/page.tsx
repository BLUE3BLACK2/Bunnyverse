'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  User,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Building,
  QrCode
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/Button';
import { Order } from '@/types';

function generateOrderId(): string {
  return `BV${10000 + (Date.now() % 90000)}`;
}

function generatePaymentDetail(method: string, bank: string, wallet: string, cardNum: string): string {
  if (method === 'bank_transfer') {
    return `${bank} Virtual Account #880192847291`;
  } else if (method === 'ewallet') {
    return `${wallet} Quick QR`;
  }
  return `Card ending in ${cardNum.slice(-4) || '8888'}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    getSubtotal,
    getDiscount,
    getShippingCost,
    getTotal,
    clearCart,
    appliedCoupon
  } = useCartStore();
  const { addOrder } = useDashboardStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: 'DKI Jakarta',
    postalCode: '',
    shippingMethod: 'regular' as 'regular' | 'express',
    paymentMethod: 'bank_transfer' as 'bank_transfer' | 'ewallet' | 'credit_card',
    selectedBank: 'BCA',
    selectedWallet: 'GoPay',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const shipping = getShippingCost(formData.shippingMethod);
  const total = getTotal(formData.shippingMethod);

  // Validation function per step
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        errs.email = 'Email address is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errs.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        errs.phone = 'Phone number is required';
      } else if (formData.phone.replace(/\D/g, '').length < 9) {
        errs.phone = 'Please enter a valid phone number (at least 9 digits)';
      }
    }

    if (step === 2) {
      if (!formData.address.trim()) errs.address = 'Street address is required';
      if (!formData.city.trim()) errs.city = 'City name is required';
      if (!formData.postalCode.trim()) {
        errs.postalCode = 'Postal code is required';
      } else if (!/^\d{5}$/.test(formData.postalCode.trim())) {
        errs.postalCode = 'Postal code must be 5 digits';
      }
    }

    if (step === 4) {
      if (formData.paymentMethod === 'credit_card') {
        if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 16) {
          errs.cardNumber = 'Valid 16-digit card number is required';
        }
        if (!formData.cardExpiry.trim()) errs.cardExpiry = 'MM/YY required';
        if (!formData.cardCvv.trim() || formData.cardCvv.length < 3) errs.cardCvv = 'CVV required';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep((s) => (s + 1) as 1 | 2 | 3 | 4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        handleFinalPlaceOrder();
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => (s - 1) as 1 | 2 | 3 | 4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalPlaceOrder = () => {
    setIsSubmitting(true);
    const orderId = generateOrderId();
    const now = new Date().toISOString();
    const paymentDetail = generatePaymentDetail(
      formData.paymentMethod,
      formData.selectedBank,
      formData.selectedWallet,
      formData.cardNumber
    );

    const newOrder: Order = {
      id: orderId,
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      postalCode: formData.postalCode,
      shippingMethod: formData.shippingMethod,
      shippingCost: shipping,
      courier: formData.shippingMethod === 'express' ? 'J&T Express Super' : 'JNE Regular Official',
      estimatedDelivery: formData.shippingMethod === 'express' ? '1-2 Days' : '3-4 Days',
      paymentMethod: formData.paymentMethod,
      paymentDetail,
      items: [...items],
      subtotal,
      discount,
      discountCode: appliedCoupon?.code,
      total,
      status: 'paid',
      createdAt: now,
      trackingNumber: `TRK-BV-${orderId}`,
      trackingSteps: [
        {
          title: 'Order Placed & Verified',
          description: 'Payment successfully captured.',
          timestamp: now,
          completed: true,
          current: false
        },
        {
          title: 'Packaging & Quality Check',
          description: 'Toploader packing with holographic seals.',
          timestamp: 'In Progress',
          completed: true,
          current: true
        },
        {
          title: 'Dispatched with Courier',
          description: 'Dispatched from central vault warehouse.',
          timestamp: 'Pending',
          completed: false
        },
        {
          title: 'Delivered to Destination',
          description: 'Signed upon delivery.',
          timestamp: 'Pending',
          completed: false
        }
      ]
    };

    setTimeout(() => {
      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      router.push(`/checkout/success?orderId=${orderId}`);
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-medium tracking-tight text-black dark:text-white mb-2 uppercase">
          Your shopping bag is empty
        </h2>
        <p className="text-xs text-[#777777] dark:text-[#888888] mb-6">
          Add merchandise items before proceeding to checkout.
        </p>
        <Link href="/shop">
          <Button variant="primary">Explore Catalog</Button>
        </Link>
      </div>
    );
  }

  const steps = [
    { num: 1, label: 'Customer', icon: User },
    { num: 2, label: 'Shipping', icon: MapPin },
    { num: 3, label: 'Delivery', icon: Truck },
    { num: 4, label: 'Payment', icon: CreditCard }
  ];

  return (
    <div className="bg-white dark:bg-black min-h-screen py-8 md:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Checkout Header & Stepper */}
        <div className="space-y-4 max-w-xl mx-auto text-center">
          <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
            SECURE CHECKOUT
          </span>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight uppercase text-black dark:text-white">
            Order Protocol
          </h1>

          {/* Stepper Bar */}
          <div className="flex items-center justify-between relative pt-2">
            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-[1px] bg-[#E5E5E5] dark:bg-[#292929] -z-0" />
            {steps.map((s) => {
              const isCompleted = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              const Icon = s.icon;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-[2px] flex items-center justify-center text-xs transition-colors ${
                      isCompleted
                        ? 'bg-black text-white dark:bg-white dark:text-black'
                        : isCurrent
                        ? 'bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white'
                        : 'bg-[#F7F7F7] dark:bg-[#111111] text-[#777777] border border-[#E5E5E5] dark:border-[#292929]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={14} /> : <Icon size={14} strokeWidth={1.5} />}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-editorial ${
                      isCurrent ? 'font-medium text-black dark:text-white' : 'text-[#777777]'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Form (Left) + Order Summary Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Multi-Step Forms */}
          <div className="lg:col-span-7 bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-6 space-y-6">
            {/* STEP 1: Customer Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="border-b border-[#E5E5E5] dark:border-[#292929] pb-3">
                  <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white">
                    Step 1: Contact Information
                  </h3>
                  <p className="text-[11px] text-[#777777] mt-0.5">
                    Order confirmation and tracking details will be sent to this contact.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-editorial text-black dark:text-white mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Minji Bunny"
                      className="w-full px-3 py-2 bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white"
                    />
                    {errors.fullName && <p className="text-[10px] text-rose-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-editorial text-black dark:text-white mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. minji@bunnies.com"
                      className="w-full px-3 py-2 bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white"
                    />
                    {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-editorial text-black dark:text-white mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +62 812-3456-7890"
                      className="w-full px-3 py-2 bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white"
                    />
                    {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Shipping Destination Address */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="border-b border-[#E5E5E5] dark:border-[#292929] pb-3">
                  <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white">
                    Step 2: Shipping Destination
                  </h3>
                  <p className="text-[11px] text-[#777777] mt-0.5">
                    Please provide complete street address for courier dispatch.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-editorial text-black dark:text-white mb-1">
                      Complete Street Address *
                    </label>
                    <textarea
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. Sudirman Central Plaza Tower 2, Floor 14"
                      className="w-full px-3 py-2 bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white"
                    />
                    {errors.address && <p className="text-[10px] text-rose-500 mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-editorial text-black dark:text-white mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Jakarta Selatan"
                        className="w-full px-3 py-2 bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white"
                      />
                      {errors.city && <p className="text-[10px] text-rose-500 mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-editorial text-black dark:text-white mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="12190"
                        className="w-full px-3 py-2 bg-white dark:bg-black border border-[#E5E5E5] dark:border-[#292929] rounded-[2px] text-xs text-black dark:text-white"
                      />
                      {errors.postalCode && <p className="text-[10px] text-rose-500 mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Shipping Courier Method */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="border-b border-[#E5E5E5] dark:border-[#292929] pb-3">
                  <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white">
                    Step 3: Courier Selection
                  </h3>
                  <p className="text-[11px] text-[#777777] mt-0.5">
                    Select your preferred logistics fulfillment tier.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    onClick={() => setFormData({ ...formData, shippingMethod: 'regular' })}
                    className={`flex items-center justify-between p-3 rounded-[2px] border cursor-pointer transition-colors ${
                      formData.shippingMethod === 'regular'
                        ? 'border-black bg-white dark:bg-black dark:border-white'
                        : 'border-[#E5E5E5] dark:border-[#292929] bg-white/50 dark:bg-black/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={formData.shippingMethod === 'regular'}
                        onChange={() => setFormData({ ...formData, shippingMethod: 'regular' })}
                        className="accent-black dark:accent-white"
                      />
                      <div>
                        <span className="text-xs font-medium uppercase text-black dark:text-white block">
                          Standard Tracked Courier (JNE / SiCepat)
                        </span>
                        <span className="text-[10px] text-[#777777]">3-4 business days dispatch</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-medium text-black dark:text-white">
                      {subtotal >= 750000 ? 'FREE' : 'Rp25.000'}
                    </span>
                  </label>

                  <label
                    onClick={() => setFormData({ ...formData, shippingMethod: 'express' })}
                    className={`flex items-center justify-between p-3 rounded-[2px] border cursor-pointer transition-colors ${
                      formData.shippingMethod === 'express'
                        ? 'border-black bg-white dark:bg-black dark:border-white'
                        : 'border-[#E5E5E5] dark:border-[#292929] bg-white/50 dark:bg-black/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={formData.shippingMethod === 'express'}
                        onChange={() => setFormData({ ...formData, shippingMethod: 'express' })}
                        className="accent-black dark:accent-white"
                      />
                      <div>
                        <span className="text-xs font-medium uppercase text-black dark:text-white block">
                          Express Priority Overnight (J&T Express)
                        </span>
                        <span className="text-[10px] text-[#777777]">1-2 business days with insurance</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-medium text-black dark:text-white">
                      Rp50.000
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 4: Payment Simulation */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="border-b border-[#E5E5E5] dark:border-[#292929] pb-3">
                  <h3 className="text-xs uppercase font-medium tracking-editorial text-black dark:text-white">
                    Step 4: Payment Gateway
                  </h3>
                  <p className="text-[11px] text-[#777777] mt-0.5">
                    Select your simulated checkout transaction method.
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'bank_transfer', label: 'Virtual Account Bank Transfer (BCA / Mandiri / BNI)', icon: Building },
                    { id: 'ewallet', label: 'QRIS & Instant E-Wallet (GoPay / ShopeePay / OVO)', icon: QrCode },
                    { id: 'credit_card', label: 'Credit / Debit Card (Visa / Mastercard / JCB)', icon: CreditCard }
                  ].map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <label
                        key={pm.id}
                        onClick={() => setFormData({ ...formData, paymentMethod: pm.id as 'bank_transfer' | 'ewallet' | 'credit_card' })}
                        className={`flex items-center gap-3 p-3 rounded-[2px] border cursor-pointer transition-colors ${
                          formData.paymentMethod === pm.id
                            ? 'border-black bg-white dark:bg-black dark:border-white'
                            : 'border-[#E5E5E5] dark:border-[#292929] bg-white/50 dark:bg-black/50'
                        }`}
                      >
                        <input
                          type="radio"
                          checked={formData.paymentMethod === pm.id}
                          onChange={() => setFormData({ ...formData, paymentMethod: pm.id as 'bank_transfer' | 'ewallet' | 'credit_card' })}
                          className="accent-black dark:accent-white"
                        />
                        <Icon size={16} strokeWidth={1.5} className="text-black dark:text-white" />
                        <span className="text-xs text-black dark:text-white font-medium">
                          {pm.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Form Step Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E5E5E5] dark:border-[#292929]">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex items-center gap-1 text-xs uppercase tracking-editorial text-[#777777] hover:text-black dark:hover:text-white cursor-pointer"
                >
                  <ArrowLeft size={13} />
                  <span>PREVIOUS STEP</span>
                </button>
              ) : (
                <Link
                  href="/cart"
                  className="flex items-center gap-1 text-xs uppercase tracking-editorial text-[#777777] hover:text-black dark:hover:text-white"
                >
                  <ArrowLeft size={13} />
                  <span>BACK TO BAG</span>
                </Link>
              )}

              <Button
                type="button"
                onClick={handleNextStep}
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                className="text-xs"
              >
                {currentStep === 4 ? 'PLACE ORDER & PAY' : 'CONTINUE STEP'}
                <ArrowRight size={13} />
              </Button>
            </div>
          </div>

          {/* Right Column: Order Recap Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-5 space-y-4">
              <h3 className="text-xs font-medium uppercase tracking-editorial text-black dark:text-white pb-3 border-b border-[#E5E5E5] dark:border-[#292929]">
                BAG RECAP ({items.length} ITEMS)
              </h3>

              {/* Items List Preview */}
              <div className="divide-y divide-[#E5E5E5] dark:divide-[#292929] max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="relative w-10 h-10 rounded-[2px] overflow-hidden bg-white dark:bg-black shrink-0 border border-[#E5E5E5] dark:border-[#292929]">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="truncate">
                        <span className="font-normal text-black dark:text-white block truncate">
                          {item.product.name}
                        </span>
                        <span className="text-[10px] text-[#777777]">
                          Qty: {item.quantity} {item.selectedSize && `· Size: ${item.selectedSize}`}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-black dark:text-white shrink-0">
                      Rp{(item.product.price * item.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-[#E5E5E5] dark:border-[#292929]">
                <div className="flex justify-between text-[#777777] dark:text-[#888888]">
                  <span>Subtotal</span>
                  <span>Rp{subtotal.toLocaleString('id-ID')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#777777] dark:text-[#888888]">
                    <span>Coupon Discount</span>
                    <span>-Rp{discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#777777] dark:text-[#888888]">
                  <span>Shipping Cost ({formData.shippingMethod})</span>
                  <span>{shipping === 0 ? 'FREE' : `Rp${shipping.toLocaleString('id-ID')}`}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-black dark:text-white pt-2 border-t border-[#E5E5E5] dark:border-[#292929]">
                  <span>Total Amount</span>
                  <span>Rp{total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

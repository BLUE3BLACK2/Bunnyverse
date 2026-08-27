import { Order } from '@/types';
import { PRODUCTS } from './products';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'BV10293',
    customerName: 'Alya Rahma',
    email: 'alya.rahma@example.com',
    phone: '+6281234567890',
    address: 'Jl. Sudirman No. 45, Kebayoran Baru',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12190',
    shippingMethod: 'express',
    shippingCost: 45000,
    paymentMethod: 'bank_transfer',
    paymentDetail: 'BCA Virtual Account (88029381923)',
    items: [
      {
        id: 'lightstick-default',
        product: PRODUCTS[0], // Official Light Stick
        quantity: 1
      },
      {
        id: 'bunny-hoodie-L',
        product: PRODUCTS[3], // Bunny Hoodie
        quantity: 1,
        selectedSize: 'L'
      }
    ],
    subtotal: 1199000,
    discount: 119900,
    discountCode: 'BUNNY10',
    total: 1124100,
    status: 'shipped',
    createdAt: '2026-03-12T10:30:00Z',
    trackingNumber: 'JNE-BV99214012',
    trackingSteps: [
      {
        title: 'Order Confirmed',
        description: 'Payment verified and order submitted to warehouse.',
        timestamp: '12 Mar 2026, 10:30 WIB',
        completed: true
      },
      {
        title: 'Processing & Safe Packaging',
        description: 'Merchandise carefully packed with bubble wrap and Bunnyverse seal.',
        timestamp: '12 Mar 2026, 14:15 WIB',
        completed: true
      },
      {
        title: 'Shipped (In Transit)',
        description: 'Package handed over to Express Courier. En route to Jakarta distribution center.',
        timestamp: '13 Mar 2026, 08:45 WIB',
        completed: true,
        current: true
      },
      {
        title: 'Delivered',
        description: 'Package delivered to recipient.',
        timestamp: 'Estimated 14 Mar 2026',
        completed: false
      }
    ]
  },
  {
    id: 'BV10294',
    customerName: 'Bima Santoso',
    email: 'bima.s@example.com',
    phone: '+6281398765432',
    address: 'Jl. Dago Asri No. 12',
    city: 'Bandung',
    province: 'Jawa Barat',
    postalCode: '40135',
    shippingMethod: 'regular',
    shippingCost: 20000,
    paymentMethod: 'ewallet',
    paymentDetail: 'GoPay QRIS',
    items: [
      {
        id: 'photoshoot-tee-M',
        product: PRODUCTS[5], // Photoshoot Tee
        quantity: 2,
        selectedSize: 'M'
      }
    ],
    subtotal: 798000,
    discount: 0,
    total: 818000,
    status: 'processing',
    createdAt: '2026-03-13T09:15:00Z',
    trackingNumber: 'SICEPAT-BV8812903',
    trackingSteps: [
      {
        title: 'Order Confirmed',
        description: 'Payment received successfully via GoPay.',
        timestamp: '13 Mar 2026, 09:15 WIB',
        completed: true
      },
      {
        title: 'Processing',
        description: 'Order queue assigned to packaging team.',
        timestamp: '13 Mar 2026, 11:00 WIB',
        completed: true,
        current: true
      },
      {
        title: 'Shipped',
        description: 'Awaiting pickup by logistics partner.',
        timestamp: 'Pending',
        completed: false
      },
      {
        title: 'Delivered',
        description: 'Package delivered to recipient.',
        timestamp: 'Pending',
        completed: false
      }
    ]
  },
  {
    id: 'BV10295',
    customerName: 'Clarissa Wijaya',
    email: 'clarissa.w@example.com',
    phone: '+628176543210',
    address: 'Jl. Mayjend Sungkono No. 88',
    city: 'Surabaya',
    province: 'Jawa Timur',
    postalCode: '60225',
    shippingMethod: 'express',
    shippingCost: 45000,
    paymentMethod: 'credit_card',
    paymentDetail: 'Mastercard (•••• 4028)',
    items: [
      {
        id: 'concert-ready-bundle-default',
        product: PRODUCTS[19], // Concert Ready Bundle
        quantity: 1
      }
    ],
    subtotal: 949000,
    discount: 142350,
    discountCode: 'NEWJEANS',
    total: 851650,
    status: 'completed',
    createdAt: '2026-03-08T15:20:00Z',
    trackingNumber: 'JNE-BV7739102',
    trackingSteps: [
      {
        title: 'Order Confirmed',
        description: 'Credit card transaction authorized.',
        timestamp: '08 Mar 2026, 15:20 WIB',
        completed: true
      },
      {
        title: 'Processing',
        description: 'VIP Gift Box prepared and inspected.',
        timestamp: '08 Mar 2026, 17:00 WIB',
        completed: true
      },
      {
        title: 'Shipped',
        description: 'Express Air Courier dispatched.',
        timestamp: '09 Mar 2026, 09:30 WIB',
        completed: true
      },
      {
        title: 'Delivered',
        description: 'Delivered and signed by Clarissa Wijaya.',
        timestamp: '10 Mar 2026, 13:45 WIB',
        completed: true,
        current: true
      }
    ]
  }
];

export const getOrderById = (id: string): Order | undefined => {
  const cleanId = id.trim().toUpperCase().replace('#', '');
  return INITIAL_ORDERS.find(o => o.id.toUpperCase() === cleanId || o.trackingNumber.toUpperCase() === cleanId);
};

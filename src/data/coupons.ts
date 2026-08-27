import { Coupon } from '@/types';

export const COUPONS: Coupon[] = [
  {
    code: 'BUNNY10',
    discountPercent: 10,
    minSpend: 100000,
    description: '10% discount on any order over Rp100.000'
  },
  {
    code: 'NEWJEANS',
    discountPercent: 15,
    minSpend: 250000,
    description: '15% discount for NewJeans club members on orders over Rp250.000'
  },
  {
    code: 'FREESHIP',
    freeShipping: true,
    minSpend: 150000,
    description: 'Free standard shipping on orders over Rp150.000'
  },
  {
    code: 'BUNNY50K',
    discountAmount: 50000,
    minSpend: 300000,
    description: 'Rp50.000 instant cut on orders over Rp300.000'
  }
];

export const validateCoupon = (code: string, subtotal: number): { valid: boolean; coupon?: Coupon; error?: string } => {
  const cleanCode = code.trim().toUpperCase();
  const coupon = COUPONS.find(c => c.code === cleanCode);
  
  if (!coupon) {
    return { valid: false, error: 'Invalid coupon code. Try BUNNY10 or NEWJEANS.' };
  }
  
  if (subtotal < coupon.minSpend) {
    return {
      valid: false,
      error: `Minimum spend for code ${coupon.code} is Rp${coupon.minSpend.toLocaleString('id-ID')}`
    };
  }
  
  return { valid: true, coupon };
};

export interface Promotion {
  id: string;
  type: 'partner' | 'campaign' | 'bundle' | 'member';
  tag: string;
  partner: string;
  headline: string;
  subheadline: string;
  discount: string;
  description: string;
  code?: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  theme: {
    bg: string;
    border: string;
    headlineColor: string;
    subheadlineColor: string;
    descriptionColor: string;
    badgeBg: string;
    badgeText: string;
    partnerColor: string;
    btnBg: string;
    btnText: string;
    codeBg: string;
    codeBorder: string;
    codeText: string;
    imageBg: string;
    discountBadgeBg: string;
    discountBadgeText: string;
  };
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 'indodana-promo',
    type: 'partner',
    tag: 'PAYMENT PARTNER',
    partner: 'INDODANA PAYLATER',
    headline: 'TUMPUK PROMO 20%',
    subheadline: 'EXTRA SAVINGS ON OFFICIAL MERCH',
    discount: '20% OFF',
    description: 'Get an additional 20% instant cashback when checking out with Indodana on all fashion capsules & collector sets.',
    code: 'BUNNY20',
    ctaText: 'SHOP WITH INDODANA',
    ctaHref: '/discount',
    image: '/products/bunny-starter-pack.png',
    theme: {
      bg: '#142540',
      border: '#23385D',
      headlineColor: '#FBBF24', // Warm Amber Gold Serif
      subheadlineColor: '#F8FAFC',
      descriptionColor: '#CBD5E1',
      badgeBg: '#FBBF24',
      badgeText: '#0F172A',
      partnerColor: '#94A3B8',
      btnBg: '#FBBF24',
      btnText: '#0F172A',
      codeBg: '#0F172A',
      codeBorder: '#334155',
      codeText: '#FBBF24',
      imageBg: '#0F172A',
      discountBadgeBg: '#FBBF24',
      discountBadgeText: '#0F172A'
    }
  },
  {
    id: 'ovo-extra-discount',
    type: 'partner',
    tag: 'DIGITAL WALLET',
    partner: 'OVO REWARDS',
    headline: 'EXTRA 10% OFF',
    subheadline: 'INSTANT CASHBACK REWARDS',
    discount: '10% OFF',
    description: 'Enjoy an extra 10% discount up to Rp50.000 with OVO Cash on official apparel, lightsticks & accessories.',
    code: 'OVO10',
    ctaText: 'SHOP WITH OVO',
    ctaHref: '/discount',
    image: '/products/binky-bong-special.png',
    theme: {
      bg: '#83280B', // Rich Terracotta / Burnt Orange
      border: '#9E3716',
      headlineColor: '#FEF3C7', // Warm Cream Gold Serif
      subheadlineColor: '#FFEDD5',
      descriptionColor: '#FED7AA',
      badgeBg: '#FEF3C7',
      badgeText: '#7C2D12',
      partnerColor: '#FFEDD5',
      btnBg: '#FEF3C7',
      btnText: '#7C2D12',
      codeBg: '#431407',
      codeBorder: '#7C2D12',
      codeText: '#FEF3C7',
      imageBg: '#431407',
      discountBadgeBg: '#FEF3C7',
      discountBadgeText: '#7C2D12'
    }
  },
  {
    id: 'kredivo-installment',
    type: 'partner',
    tag: 'PAYLATER PRIVILEGE',
    partner: 'KREDIVO SPECIAL',
    headline: 'UP TO 25% OFF',
    subheadline: '0% INTEREST 3-MONTH INSTALLMENTS',
    discount: '25% OFF',
    description: 'Shop your dream NewJeans concert gear with 0% interest and save up to Rp150.000 instantly with Kredivo.',
    code: 'KREDIVO25',
    ctaText: 'CLAIM KREDIVO DEAL',
    ctaHref: '/discount',
    image: '/products/bunny-hoodie.png',
    theme: {
      bg: '#2E104D', // Imperial Deep Purple
      border: '#451B6E',
      headlineColor: '#FDE047', // Vibrant Gold Yellow Serif
      subheadlineColor: '#F5D0FE',
      descriptionColor: '#E9D5FF',
      badgeBg: '#FDE047',
      badgeText: '#3B0764',
      partnerColor: '#D8B4FE',
      btnBg: '#FDE047',
      btnText: '#3B0764',
      codeBg: '#1A052E',
      codeBorder: '#451B6E',
      codeText: '#FDE047',
      imageBg: '#1A052E',
      discountBadgeBg: '#FDE047',
      discountBadgeText: '#3B0764'
    }
  },
  {
    id: 'haerin-capsule-drop',
    type: 'member',
    tag: 'MEMBER CAPSULE',
    partner: 'HAERIN SIGNATURE',
    headline: 'HAERIN COLLECTION',
    subheadline: 'CAT CHARM STREETWEAR DROP',
    discount: 'NEW DROP',
    description: 'Explore the newest cat-charm aesthetic varsity jackets, photoshoot tees, and exclusive photocard binders.',
    code: 'HAERIN15',
    ctaText: 'EXPLORE HAERIN CAPSULE',
    ctaHref: '/members/haerin',
    image: '/members/haerin.jpg',
    theme: {
      bg: '#143825', // Deep Forest Pine Green
      border: '#1F5237',
      headlineColor: '#FCA5A5', // Warm Coral Pink Serif
      subheadlineColor: '#D1FAE5',
      descriptionColor: '#A7F3D0',
      badgeBg: '#FCA5A5',
      badgeText: '#064E3B',
      partnerColor: '#6EE7B7',
      btnBg: '#FCA5A5',
      btnText: '#064E3B',
      codeBg: '#082114',
      codeBorder: '#1F5237',
      codeText: '#FCA5A5',
      imageBg: '#082114',
      discountBadgeBg: '#FCA5A5',
      discountBadgeText: '#064E3B'
    }
  },
  {
    id: 'mandiri-promo-week',
    type: 'partner',
    tag: 'BANK PRIVILEGE',
    partner: 'MANDIRI WEEKEND',
    headline: 'EXTRA 15% OFF',
    subheadline: 'WEEKEND SHOPPING PRIVILEGE',
    discount: '15% OFF',
    description: 'Get extra 15% off with Mandiri Debit & Credit Card on all official NewJeans collections every weekend.',
    code: 'MANDIRI15',
    ctaText: 'SHOP MANDIRI DEALS',
    ctaHref: '/discount',
    image: '/products/varsity-jacket.png',
    theme: {
      bg: '#78350F', // Warm Golden Amber / Ochre
      border: '#92400E',
      headlineColor: '#FEF9C3', // Luminous Pale Gold Serif
      subheadlineColor: '#FEF3C7',
      descriptionColor: '#FDE68A',
      badgeBg: '#FEF9C3',
      badgeText: '#451A03',
      partnerColor: '#FCD34D',
      btnBg: '#FEF9C3',
      btnText: '#451A03',
      codeBg: '#451A03',
      codeBorder: '#92400E',
      codeText: '#FEF9C3',
      imageBg: '#451A03',
      discountBadgeBg: '#FEF9C3',
      discountBadgeText: '#451A03'
    }
  },
  {
    id: 'lightstick-concert-week',
    type: 'campaign',
    tag: 'OFFICIAL CONCERT GEAR',
    partner: 'BINKY BONG SPECIAL',
    headline: 'LIGHTSTICK WEEK',
    subheadline: 'FREE HOLOGRAPHIC STRAP',
    discount: 'FREE GIFT',
    description: 'Every Binky Bong official lightstick order comes with an exclusive limited edition holographic wrist strap & photocard.',
    code: 'BINKYGLOW',
    ctaText: 'SHOP LIGHTSTICKS',
    ctaHref: '/categories/lightsticks',
    image: '/products/binky-bong.png',
    theme: {
      bg: '#6B112B', // Luxury Deep Crimson / Ruby
      border: '#881B39',
      headlineColor: '#A7F3D0', // Mint Cream Serif
      subheadlineColor: '#FFE4E6',
      descriptionColor: '#FECDD3',
      badgeBg: '#A7F3D0',
      badgeText: '#4C0519',
      partnerColor: '#FDA4AF',
      btnBg: '#A7F3D0',
      btnText: '#4C0519',
      codeBg: '#3F0516',
      codeBorder: '#881B39',
      codeText: '#A7F3D0',
      imageBg: '#3F0516',
      discountBadgeBg: '#A7F3D0',
      discountBadgeText: '#4C0519'
    }
  }
];

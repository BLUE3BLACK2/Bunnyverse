import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

const DIRS = [
  path.join(PUBLIC_DIR, 'brand'),
  path.join(PUBLIC_DIR, 'members'),
  path.join(PUBLIC_DIR, 'hero'),
  path.join(PUBLIC_DIR, 'products'),
  path.join(PUBLIC_DIR, 'categories'),
  path.join(PUBLIC_DIR, 'banners'),
];

DIRS.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

// Clean Monochrome SVG Logo Generator
const createLogoSVG = ({ fill = '#000000', width = 360, height = 70 }) => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <text x="10" y="48" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="32" font-weight="600" fill="${fill}" letter-spacing="3">
    BUNNYVERSE
  </text>
</svg>
`;

// Clean Square 1:1 Editorial Member Visual
const createSquareHeroMemberSVG = ({ size = 800, name }) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2F2F2"/>
      <stop offset="100%" stop-color="#E5E5E5"/>
    </linearGradient>
    <radialGradient id="softStudioGlow" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#E5E5E5" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Clean Editorial Studio Canvas -->
  <rect width="${size}" height="${size}" fill="url(#bgGrad)"/>
  <circle cx="${size / 2}" cy="${size * 0.45}" r="${size * 0.42}" fill="url(#softStudioGlow)"/>

  <!-- Fashion Figure Silhouette with Luxury Monochrome Streetwear -->
  <g transform="translate(${size / 2}, ${size * 0.52})">
    <!-- Oversized Minimalist Crewneck Silhouette -->
    <path d="M -130 140 C -150 40, -80 -70, 0 -90 C 80 -70, 150 40, 130 140 Z" fill="#111111"/>
    <path d="M -170 80 C -190 -20, -130 -50, -80 -70" stroke="#111111" stroke-width="50" fill="none" stroke-linecap="round"/>
    <path d="M 170 80 C 190 -20, 130 -50, 80 -70" stroke="#111111" stroke-width="50" fill="none" stroke-linecap="round"/>
    
    <!-- Pants / Bottoms -->
    <path d="M -100 130 L -120 360 L -25 360 L -10 170 L 10 170 L 25 360 L 120 360 L 100 130 Z" fill="#222222"/>
    
    <!-- Head & Editorial Hairstyle -->
    <circle cx="0" cy="-150" r="54" fill="#D9B496"/>
    <circle cx="0" cy="-185" r="50" fill="#18181B"/>
    <ellipse cx="-24" cy="-205" rx="22" ry="36" fill="#18181B" transform="rotate(-15)"/>
    <ellipse cx="24" cy="-205" rx="22" ry="36" fill="#18181B" transform="rotate(15)"/>
    
    <!-- Minimalist Silver / Monochrome Earring -->
    <circle cx="-45" cy="-145" r="7" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
    <circle cx="45" cy="-145" r="7" stroke="#FFFFFF" stroke-width="2.5" fill="none"/>
  </g>

  <!-- Editorial Top Left Tag -->
  <text x="40" y="60" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="12" font-weight="500" fill="#555555" letter-spacing="2">
    BUNNYVERSE EDITORIAL // 0${name === 'Minji' ? 1 : name === 'Hanni' ? 2 : name === 'Danielle' ? 3 : name === 'Haerin' ? 4 : 5}
  </text>
  
  <!-- Subtle Name Watermark in Bottom Left -->
  <text x="40" y="${size - 40}" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="28" font-weight="600" fill="#111111" letter-spacing="3">
    ${name.toUpperCase()}
  </text>
</svg>
`;

// Clean Minimal Product Mockup Generator
const createCleanProductSVG = ({ width = 600, height = 600, iconType = 'apparel' }) => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#F7F7F7"/>
  <circle cx="${width / 2}" cy="${height / 2}" r="${width * 0.35}" fill="#FFFFFF"/>

  <!-- Minimal Product Silhouette -->
  <g transform="translate(${width / 2}, ${height / 2})">
    ${iconType === 'lightstick' ? `
      <!-- Official Lightstick -->
      <g transform="scale(1.2)">
        <rect x="-12" y="-20" width="24" height="110" rx="4" fill="#111111"/>
        <circle cx="0" cy="-55" r="46" fill="#FFFFFF" stroke="#111111" stroke-width="3"/>
        <!-- Inner Bunny silhouette -->
        <path d="M -14 -42 C -22 -75, -5 -85, -5 -55 Z" fill="#111111"/>
        <path d="M 14 -42 C 22 -75, 5 -85, 5 -55 Z" fill="#111111"/>
        <circle cx="0" cy="-48" r="14" fill="#111111"/>
      </g>
    ` : iconType === 'apparel' ? `
      <!-- Minimalist Streetwear Tee / Hoodie -->
      <g transform="scale(1.35)">
        <path d="M -65 -45 L -35 -65 L 35 -65 L 65 -45 L 52 -15 L 38 -20 L 38 65 L -38 65 L -38 -20 L -52 -15 Z" fill="#18181B"/>
        <path d="M -20 -65 Q 0 -48 20 -65" stroke="#333333" stroke-width="2" fill="none"/>
        <text x="0" y="5" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="10" font-weight="500" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">BUNNYVERSE</text>
      </g>
    ` : iconType === 'sneaker' ? `
      <!-- Street Runner -->
      <g transform="scale(1.3) translate(-10, 0)">
        <path d="M -70 25 C -50 25, -30 20, 10 -5 C 30 -15, 60 -10, 75 10 C 80 20, 75 35, 60 38 C 20 40, -40 40, -70 38 Z" fill="#18181B"/>
        <path d="M -65 38 L 70 38 L 65 48 L -65 48 Z" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="1"/>
      </g>
    ` : iconType === 'photocard' ? `
      <!-- Photocard -->
      <g transform="scale(1.3)">
        <rect x="-40" y="-60" width="80" height="120" rx="4" fill="#FFFFFF" stroke="#CCCCCC" stroke-width="1"/>
        <rect x="-34" y="-54" width="68" height="85" fill="#EEEEEE"/>
        <circle cx="0" cy="-12" r="18" fill="#18181B"/>
        <text x="0" y="50" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif" font-size="8" font-weight="500" fill="#555555" text-anchor="middle" letter-spacing="1">AUTHENTIC</text>
      </g>
    ` : iconType === 'headphone' ? `
      <!-- Headphones -->
      <g transform="scale(1.3)">
        <path d="M -45 0 C -45 -50, 45 -50, 45 0" stroke="#18181B" stroke-width="6" fill="none" stroke-linecap="round"/>
        <rect x="-54" y="-10" width="18" height="38" rx="4" fill="#18181B"/>
        <rect x="36" y="-10" width="18" height="38" rx="4" fill="#18181B"/>
      </g>
    ` : iconType === 'cap' ? `
      <!-- Cap -->
      <g transform="scale(1.3)">
        <path d="M -42 10 C -42 -30, 25 -30, 35 10 Z" fill="#18181B"/>
        <path d="M 25 8 C 45 8, 65 18, 70 26 C 50 26, 30 18, 15 15 Z" fill="#333333"/>
        <text x="-5" y="-5" font-family="'Helvetica Neue', Helvetica, sans-serif" font-size="8" font-weight="600" fill="#FFFFFF" text-anchor="middle">BV</text>
      </g>
    ` : `
      <!-- General Lifestyle -->
      <g transform="scale(1.3)">
        <rect x="-38" y="-38" width="76" height="76" rx="4" fill="#18181B"/>
        <circle cx="0" cy="0" r="14" fill="#FFFFFF"/>
      </g>
    `}
  </g>
</svg>
`;

async function generateAllAssets() {
  console.log('Generating clean ZALORA-inspired monochrome assets for BUNNYVERSE...');

  // 1. Logos
  const logoBlackSvg = createLogoSVG({ fill: '#000000' });
  await sharp(Buffer.from(logoBlackSvg)).png().toFile(path.join(PUBLIC_DIR, 'brand', 'logo-black.png'));
  await sharp(Buffer.from(logoBlackSvg)).png().toFile(path.join(PUBLIC_DIR, 'brand', 'logo.png'));
  await sharp(Buffer.from(logoBlackSvg)).png().toFile(path.join(PUBLIC_DIR, 'brand', 'favicon.png'));

  const logoWhiteSvg = createLogoSVG({ fill: '#FFFFFF' });
  await sharp(Buffer.from(logoWhiteSvg)).png().toFile(path.join(PUBLIC_DIR, 'brand', 'logo-white.png'));

  // 2. Square 1:1 Hero Members & Avatars
  const members = [
    { name: 'Minji', initial: 'M' },
    { name: 'Hanni', initial: 'H' },
    { name: 'Danielle', initial: 'D' },
    { name: 'Haerin', initial: 'H' },
    { name: 'Hyein', initial: 'H' }
  ];

  for (const m of members) {
    const slug = m.name.toLowerCase();
    const heroSquareSvg = createSquareHeroMemberSVG({ size: 800, name: m.name, initial: m.initial });
    await sharp(Buffer.from(heroSquareSvg)).png().toFile(path.join(PUBLIC_DIR, 'hero', `hero-${slug}.png`));
  }

  // 3. Products
  const products = [
    { file: 'binky-bong.png', title: 'Official Binky Bong Lightstick', category: 'Lightsticks', iconType: 'lightstick' },
    { file: 'binky-bong-special.png', title: 'Special Edition Lightstick', category: 'Lightsticks', iconType: 'lightstick' },
    { file: 'lightstick-pouch.png', title: 'Velvet Lightstick Pouch', category: 'Lightsticks', iconType: 'apparel' },
    { file: 'bunny-hoodie.png', title: 'BUNNY Signature Hoodie', category: 'Fashion', iconType: 'apparel' },
    { file: 'photoshoot-tee.png', title: 'Editorial Graphic Tee', category: 'Fashion', iconType: 'apparel' },
    { file: 'varsity-jacket.png', title: 'BUNNYVERSE Varsity Jacket', category: 'Fashion', iconType: 'apparel' },
    { file: 'denim-jacket.png', title: 'Vintage Wash Denim Trucker', category: 'Fashion', iconType: 'apparel' },
    { file: 'air-sneaker.png', title: 'Air Max 270 Street Runner', category: 'Fashion', iconType: 'sneaker' },
    { file: 'tokki-beanie.png', title: 'Knit Tokki Ear Beanie', category: 'Accessories', iconType: 'cap' },
    { file: 'bunny-cap.png', title: 'Embroidered Dad Cap', category: 'Accessories', iconType: 'cap' },
    { file: 'bunny-tote.png', title: 'Heavy Canvas Tote Bag', category: 'Accessories', iconType: 'lifestyle' },
    { file: 'crossbody-bag.png', title: 'Nylon Utility Crossbody Bag', category: 'Accessories', iconType: 'lifestyle' },
    { file: 'airpods-case.png', title: 'Silicone AirPods Pro Case', category: 'Accessories', iconType: 'lifestyle' },
    { file: 'photocard-album.png', title: 'How Sweet Photocard Set', category: 'Collectibles', iconType: 'photocard' },
    { file: 'hologram-pc.png', title: 'Special Holographic PC Pack', category: 'Collectibles', iconType: 'photocard' },
    { file: 'ot5-polaroid.png', title: 'Exclusive OT5 Polaroid Pack', category: 'Collectibles', iconType: 'photocard' },
    { file: 'acrylic-stand.png', title: 'Diorama Acrylic Standee', category: 'Collectibles', iconType: 'photocard' },
    { file: 'sound-headphones.png', title: 'Wireless Active Headphones', category: 'Lifestyle', iconType: 'headphone' },
    { file: 'tokki-tumbler.png', title: 'Stainless Steel Tokki Tumbler', category: 'Lifestyle', iconType: 'lifestyle' },
    { file: 'plush-cushion.png', title: 'Super Soft Plush Cushion', category: 'Lifestyle', iconType: 'lifestyle' },
    { file: 'ot5-ultimate-box.png', title: 'OT5 Ultimate Collector Box', category: 'Bundles', iconType: 'apparel' }
  ];

  for (const p of products) {
    const svg = createCleanProductSVG({ width: 600, height: 600, ...p });
    await sharp(Buffer.from(svg)).png().toFile(path.join(PUBLIC_DIR, 'products', p.file));
  }

  // 4. Categories
  const categories = [
    { file: 'lightsticks.png', title: 'Lightsticks', iconType: 'lightstick' },
    { file: 'fashion.png', title: 'Fashion', iconType: 'apparel' },
    { file: 'accessories.png', title: 'Accessories', iconType: 'cap' },
    { file: 'collectibles.png', title: 'Collectibles', iconType: 'photocard' },
    { file: 'lifestyle.png', title: 'Lifestyle', iconType: 'headphone' },
    { file: 'bundles.png', title: 'Bundles', iconType: 'apparel' }
  ];

  for (const c of categories) {
    const svg = createCleanProductSVG({ width: 600, height: 600, title: c.title, category: 'Category', iconType: c.iconType });
    await sharp(Buffer.from(svg)).png().toFile(path.join(PUBLIC_DIR, 'categories', c.file));
  }

  // 5. Clean Monochrome Banners
  const flashSaleSvg = `
  <svg width="1200" height="400" viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="400" fill="#111111"/>
    <g transform="translate(900, 200) scale(1.6)">
      <path d="M -70 25 C -50 25, -30 20, 10 -5 C 30 -15, 60 -10, 75 10 C 80 20, 75 35, 60 38 C 20 40, -40 40, -70 38 Z" fill="#FFFFFF"/>
    </g>
  </svg>
  `;
  await sharp(Buffer.from(flashSaleSvg)).png().toFile(path.join(PUBLIC_DIR, 'banners', 'flash-sale.png'));

  const newDropSvg = `
  <svg width="1200" height="400" viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="400" fill="#000000"/>
    <circle cx="950" cy="200" r="140" fill="#222222"/>
  </svg>
  `;
  await sharp(Buffer.from(newDropSvg)).png().toFile(path.join(PUBLIC_DIR, 'banners', 'new-drop.png'));

  // Brand Mascot
  const mascotSvg = createCleanProductSVG({ width: 500, height: 500, title: 'BUNNIES', category: 'Official', iconType: 'lifestyle' });
  await sharp(Buffer.from(mascotSvg)).png().toFile(path.join(PUBLIC_DIR, 'brand', 'bunnies.png'));
  await sharp(Buffer.from(mascotSvg)).png().toFile(path.join(PUBLIC_DIR, 'brand', 'bunnies-group.png'));

  console.log('All monochrome assets generated successfully!');
}

generateAllAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});

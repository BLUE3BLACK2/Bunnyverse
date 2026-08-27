import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-black min-h-screen py-10 md:py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
            CONCEPT PHILOSOPHY
          </span>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight uppercase text-black dark:text-white">
            About BUNNYVERSE
          </h1>
          <p className="text-xs sm:text-sm text-[#555555] dark:text-[#B5B5B5] max-w-xl mx-auto leading-relaxed">
            A clean, editorial fashion e-commerce storefront inspired by NewJeans and crafted for Bunnies worldwide.
          </p>
        </div>

        {/* Brand Showcase Banner */}
        <div className="relative aspect-[16/9] w-full rounded-[4px] overflow-hidden border border-[#E5E5E5] dark:border-[#292929] bg-[#F7F7F7] dark:bg-[#111111]">
          <Image
            src="/banners/new-drop.png"
            alt="BUNNYVERSE Brand Concept"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Vision & Design Philosophy */}
        <div className="space-y-4 text-[#555555] dark:text-[#B5B5B5] leading-relaxed text-xs sm:text-sm border-t border-[#E5E5E5] dark:border-[#292929] pt-8">
          <h2 className="text-lg sm:text-xl font-medium uppercase tracking-tight text-black dark:text-white">
            The Philosophy of BUNNYVERSE
          </h2>
          <p>
            BUNNYVERSE elevates fan merchandise into high-fashion everyday essentials. Rather than typical loud graphics, our collections focus on clean silhouettes, premium heavyweight fabrics, and subtle concept branding.
          </p>
          <p>
            With a strict monochrome visual system and dedicated member capsules, each drop represents an authentic collectible statement piece.
          </p>
        </div>

        {/* The 5 Members Curation */}
        <div className="space-y-4 pt-4 border-t border-[#E5E5E5] dark:border-[#292929]">
          <h3 className="text-base sm:text-lg font-medium uppercase tracking-tight text-black dark:text-white">
            Member-Curated Capsules
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: '01 Minji', role: 'Classic Chic & Sharp Tailoring', desc: 'Confidence with structured silhouettes, dad caps, and selvedge denim.' },
              { name: '02 Hanni', role: 'Playful Streetwear Comfort', desc: 'Vibrant oversized French Terry hoodies and signature accessories.' },
              { name: '03 Danielle', role: 'Collegiate Spirit & Sunshine Energy', desc: 'Varsity jackets and heavy canvas everyday carryall totes.' },
              { name: '04 Haerin', role: 'Cool Minimal Mystery & Sharp Cuts', desc: 'Vintage wash editorial graphic tees and acrylic collector standees.' },
              { name: '05 Hyein', role: 'High-Fashion Statement & Runway Poise', desc: 'Clean architectural outerwear, photocard binders, and journals.' }
            ].map((m) => (
              <div
                key={m.name}
                className="p-4 rounded-[4px] bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] space-y-1"
              >
                <span className="text-[10px] font-mono text-[#777777] dark:text-[#888888] uppercase block">
                  {m.name}
                </span>
                <h4 className="font-medium text-xs text-black dark:text-white">{m.role}</h4>
                <p className="text-[11px] text-[#777777] dark:text-[#888888]">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="space-y-4 pt-6 border-t border-[#E5E5E5] dark:border-[#292929]">
          <h3 className="text-base sm:text-lg font-medium uppercase tracking-tight text-black dark:text-white">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3 text-xs">
            {[
              {
                q: 'How does member filtering work in the catalog?',
                a: 'You can select any member in the Hero Showcase, Member tiles, or in the Shop filter sidebar to immediately see curated merchandise.'
              },
              {
                q: 'How are photocards and fragile goods protected during shipment?',
                a: 'All photocards are placed inside protective sleeves and rigid cardboard toploaders with bubble wrap cushioning.'
              },
              {
                q: 'Can I track my order in real-time?',
                a: 'Yes. Simply use our Track Order page with your Order ID (e.g. BV10293) or link from your confirmation receipt.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[4px] bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] space-y-1"
              >
                <h4 className="font-medium text-black dark:text-white">{faq.q}</h4>
                <p className="text-[#555555] dark:text-[#B5B5B5] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Return Button */}
        <div className="pt-4 text-center">
          <Link href="/shop">
            <Button variant="primary" size="md">
              <span>EXPLORE THE COLLECTION</span>
              <ArrowRight size={13} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

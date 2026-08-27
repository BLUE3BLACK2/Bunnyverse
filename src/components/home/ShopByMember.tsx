'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MEMBERS } from '@/data/members';

export const ShopByMember: React.FC = () => {
  const allMembersList = [
    ...MEMBERS,
    {
      id: 'group',
      name: 'OT5 Group',
      slug: 'group',
      role: 'Full Group',
      order: 6,
      color: '#000000',
      lightColor: '#F7F7F7',
      image: '/brand/bunnies-group.png',
      heroImage: '/brand/bunnies-group.png',
      description: 'Exclusive OT5 collection featuring all 5 members together.',
      shortBio: 'OT5 Complete Group Edition',
      quote: 'Together as One Bunnies.',
      featuredProductIds: ['bv-prod-020', 'bv-prod-016']
    }
  ];

  return (
    <section id="members" className="py-10 md:py-14 bg-white dark:bg-black transition-colors border-b border-[#E5E5E5] dark:border-[#292929]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-medium tracking-editorial text-[#777777] dark:text-[#888888] block">
              MEMBER CAPSULES
            </span>
            <h2 className="text-xl sm:text-2xl font-medium tracking-tight uppercase text-black dark:text-white">
              Shop by Member
            </h2>
          </div>

          <Link
            href="/members"
            className="flex items-center gap-1 text-xs tracking-editorial uppercase text-[#555555] dark:text-[#B5B5B5] hover:text-black dark:hover:text-white transition-colors"
          >
            <span>All Members</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Member Tiles Grid (6 Items) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {allMembersList.map((member) => (
            <Link
              key={member.id}
              href={`/members/${member.slug}`}
              className="group block bg-[#F7F7F7] dark:bg-[#0A0A0A] border border-[#E5E5E5] dark:border-[#292929] rounded-[4px] p-2.5 hover:border-black dark:hover:border-white transition-colors"
            >
              <div className="relative w-full aspect-square rounded-[2px] overflow-hidden bg-white dark:bg-black mb-2.5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#777777] dark:text-[#888888] block leading-none">
                    0{member.order}
                  </span>
                  <h3 className="text-xs font-medium tracking-nav uppercase text-black dark:text-white mt-0.5">
                    {member.name}
                  </h3>
                </div>
                <ArrowRight size={12} className="text-[#777777] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

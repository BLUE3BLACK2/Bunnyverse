'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Tag, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Modal } from './Modal';
import { PRODUCTS } from '@/data/products';
import { MEMBERS } from '@/data/members';
import { CATEGORIES } from '@/data/categories';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { products: [], members: [], categories: [] };

    const matchedProducts = PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.members.some(m => m.toLowerCase().includes(q))
    ).slice(0, 5);

    const matchedMembers = MEMBERS.filter(
      m => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q)
    );

    const matchedCategories = CATEGORIES.filter(
      c => c.name.toLowerCase().includes(q) || c.tag.toLowerCase().includes(q)
    );

    return {
      products: matchedProducts,
      members: matchedMembers,
      categories: matchedCategories
    };
  }, [query]);

  const hasResults =
    searchResults.products.length > 0 ||
    searchResults.members.length > 0 ||
    searchResults.categories.length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="space-y-4">
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-slate-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, members, apparel, photocards..."
            autoFocus
            className="w-full pl-12 pr-10 py-3.5 bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-[#0148C3] focus:bg-white dark:focus:bg-slate-900 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all text-sm md:text-base font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Popular Tags when empty */}
        {!query && (
          <div className="py-2 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Popular Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {['Light Stick', 'Haerin Tee', 'Varsity Jacket', 'Photocard Set', 'Hoodie', 'Minji'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            {/* Products */}
            {searchResults.products.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Products ({searchResults.products.length})
                </div>
                <div className="space-y-1.5">
                  {searchResults.products.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                          <Image src={p.image} alt={p.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#0148C3] transition-colors">
                            {p.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Rp{p.price.toLocaleString('id-ID')} · {p.categoryName}
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 group-hover:text-[#0148C3] transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Members */}
            {searchResults.members.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User size={12} /> Members
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {searchResults.members.map((m) => (
                    <Link
                      key={m.id}
                      href={`/shop?member=${m.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-200/80 dark:border-[#273244] hover:border-[#0148C3] transition-colors"
                    >
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                        <Image src={m.image} alt={m.name} fill className="object-cover" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{m.name}</p>
                        <p className="text-[10px] text-slate-400">Shop Collection</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {searchResults.categories.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Tag size={12} /> Categories
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchResults.categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/shop?category=${c.slug}`}
                      onClick={onClose}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0148C3]/10 text-[#0148C3] dark:text-[#93c5fd] hover:bg-[#0148C3]/20 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {!hasResults && (
              <div className="text-center py-8 text-slate-500 text-sm">
                {`No matching merchandise found for "${query}".`}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

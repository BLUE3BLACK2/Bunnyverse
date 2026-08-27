'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Product, CategoryId, MemberId } from '@/types';
import { useToastStore } from '@/components/ui/Toast';

export default function DashboardProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaults } = useDashboardStore();
  const { showToast } = useToastStore();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  // Form State for Add / Edit
  const [formState, setFormState] = useState({
    name: '',
    slug: '',
    category: 'fashion' as CategoryId,
    categoryName: 'Fashion & Apparel',
    price: 399000,
    originalPrice: 450000,
    stock: 25,
    members: ['haerin'] as MemberId[],
    description: '',
    image: '/products/photoshoot-tee.png'
  });

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.categoryName.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (selectedCat !== 'all' && p.category !== selectedCat) {
        return false;
      }
      return true;
    });
  }, [products, search, selectedCat]);

  const handleOpenAdd = () => {
    setFormState({
      name: '',
      slug: '',
      category: 'fashion',
      categoryName: 'Fashion & Apparel',
      price: 299000,
      originalPrice: 350000,
      stock: 30,
      members: ['minji'],
      description: 'Official BUNNYVERSE signature merchandise.',
      image: '/products/bunny-hoodie.png'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormState({
      name: p.name,
      slug: p.slug,
      category: p.category,
      categoryName: p.categoryName,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      stock: p.stock,
      members: p.members,
      description: p.description,
      image: p.image
    });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) return;

    const slug = formState.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    addProduct({
      name: formState.name,
      slug,
      description: formState.description,
      shortDescription: formState.description.slice(0, 80) + '...',
      price: Number(formState.price),
      originalPrice: Number(formState.originalPrice),
      discount: Math.round(((formState.originalPrice - formState.price) / formState.originalPrice) * 100) || undefined,
      category: formState.category,
      categoryName: formState.category === 'fashion' ? 'Fashion & Apparel' : formState.category === 'collectibles' ? 'Collectibles' : 'Merchandise',
      members: formState.members,
      image: formState.image,
      images: [formState.image],
      rating: 5.0,
      reviewCount: 1,
      stock: Number(formState.stock),
      isNew: true,
      tags: ['new', formState.category]
    });

    setIsAddModalOpen(false);
    showToast(`Created product "${formState.name}"!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      name: formState.name,
      price: Number(formState.price),
      originalPrice: Number(formState.originalPrice),
      stock: Number(formState.stock),
      category: formState.category,
      description: formState.description
    });

    setEditingProduct(null);
    showToast(`Updated product "${formState.name}"!`);
  };

  const handleConfirmDelete = () => {
    if (!deletingProduct) return;
    deleteProduct(deletingProduct.id);
    showToast(`Deleted product "${deletingProduct.name}"`, 'info');
    setDeletingProduct(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader
        title="Product Inventory Management"
        subtitle="Create, update, and manage products with real-time catalog synchronization."
      />

      <main className="p-6 space-y-6 flex-1">
        {/* Controls Bar */}
        <div className="bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] rounded-3xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products by title or category..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0148C3]"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#0148C3]"
            >
              <option value="all">All Categories</option>
              <option value="lightsticks">Lightsticks & Goods</option>
              <option value="fashion">Fashion & Apparel</option>
              <option value="accessories">Accessories</option>
              <option value="collectibles">Collectibles</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="bundles">Bundles</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetToDefaults} className="gap-1 text-xs">
              <RotateCcw size={14} /> Reset
            </Button>
            <Button variant="primary" size="md" onClick={handleOpenAdd} className="gap-1.5 text-xs font-extrabold">
              <Plus size={16} /> Add New Product
            </Button>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-[#273244] text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3.5 px-6">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Member</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-4">Price (IDR)</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#273244]">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                          <Image src={p.image} alt={p.name} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-slate-400">{p.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-300">
                      {p.categoryName}
                    </td>
                    <td className="py-3.5 px-4 font-bold uppercase text-[#0148C3] dark:text-[#93c5fd]">
                      {p.members.join(', ')}
                    </td>
                    <td className="py-3.5 px-4">
                      {p.stock <= 10 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                          <AlertTriangle size={11} />
                          <span>Low ({p.stock})</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          <CheckCircle2 size={11} />
                          <span>In Stock ({p.stock})</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      Rp{p.price.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          title="Edit product"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#0148C3] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setDeletingProduct(p)}
                          title="Delete product"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Product" maxWidth="lg">
        <form onSubmit={handleSaveAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormDataInput('name', e.target.value)}
              placeholder="e.g. Signature Denim Trucker"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0148C3]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Category
              </label>
              <select
                value={formState.category}
                onChange={(e) => setFormDataInput('category', e.target.value as CategoryId)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
              >
                <option value="fashion">Fashion & Apparel</option>
                <option value="lightsticks">Lightsticks</option>
                <option value="accessories">Accessories</option>
                <option value="collectibles">Collectibles</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="bundles">Bundles</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Member Association
              </label>
              <select
                value={formState.members[0] || 'group'}
                onChange={(e) => setFormDataInput('members', [e.target.value as MemberId])}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
              >
                <option value="minji">Minji</option>
                <option value="hanni">Hanni</option>
                <option value="danielle">Danielle</option>
                <option value="haerin">Haerin</option>
                <option value="hyein">Hyein</option>
                <option value="group">Group / OT5</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Price (IDR) *
              </label>
              <input
                type="number"
                required
                value={formState.price}
                onChange={(e) => setFormDataInput('price', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                value={formState.stock}
                onChange={(e) => setFormDataInput('stock', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formState.description}
              onChange={(e) => setFormDataInput('description', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save & Publish Product
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal isOpen={!!editingProduct} onClose={() => setEditingProduct(null)} title="Edit Product" maxWidth="lg">
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormDataInput('name', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Price (IDR) *
              </label>
              <input
                type="number"
                required
                value={formState.price}
                onChange={(e) => setFormDataInput('price', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                value={formState.stock}
                onChange={(e) => setFormDataInput('stock', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formState.description}
              onChange={(e) => setFormDataInput('description', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setEditingProduct(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deletingProduct} onClose={() => setDeletingProduct(null)} title="Delete Product" maxWidth="sm">
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {`Are you sure you want to delete "${deletingProduct?.name}"? This will remove it from the live catalog.`}
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setDeletingProduct(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmDelete}>
              Delete Product
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );

  function setFormDataInput<K extends keyof typeof formState>(field: K, val: (typeof formState)[K]) {
    setFormState((prev) => ({ ...prev, [field]: val }));
  }
}

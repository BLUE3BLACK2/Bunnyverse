'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Category } from '@/types';
import { useToastStore } from '@/components/ui/Toast';

export default function DashboardCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useDashboardStore();
  const { showToast } = useToastStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);

  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formTag, setFormTag] = useState('');

  const handleOpenAdd = () => {
    setFormName('');
    setFormDesc('');
    setFormTag('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setEditingCat(c);
    setFormName(c.name);
    setFormDesc(c.description);
    setFormTag(c.tag);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    addCategory({
      name: formName.trim(),
      slug: formName.toLowerCase().replace(/\s+/g, '-'),
      description: formDesc.trim() || 'Official merchandise category',
      tag: formTag.trim() || 'Official',
      image: '/categories/fashion.png'
    });

    setIsAddModalOpen(false);
    showToast(`Created category "${formName}"!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCat || !formName.trim()) return;

    updateCategory(editingCat.id, {
      name: formName.trim(),
      description: formDesc.trim(),
      tag: formTag.trim()
    });

    setEditingCat(null);
    showToast(`Updated category "${formName}"!`);
  };

  const handleDelete = (id: string, name: string) => {
    deleteCategory(id);
    showToast(`Deleted category "${name}"`, 'info');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader
        title="Category Architecture"
        subtitle="Organize product lines, collections, and catalog taxonomy."
      />

      <main className="p-6 space-y-6 flex-1">
        <div className="flex justify-between items-center bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] rounded-3xl p-5">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Catalog Categories ({categories.length})
            </h3>
            <p className="text-xs text-slate-400">Manage shop groupings and promotional tags.</p>
          </div>
          <Button variant="primary" size="sm" onClick={handleOpenAdd} className="gap-1.5 text-xs font-bold">
            <Plus size={16} /> Add Category
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#151B26] border border-slate-200/80 dark:border-[#273244] space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image src={c.image} alt={c.name} fill className="object-cover" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white uppercase">
                    {c.tag}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {c.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {c.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">/{c.slug}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(c)}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#0148C3] hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id, c.name)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Category" maxWidth="md">
        <form onSubmit={handleSaveAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Special Collabs"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Promotional Tag
            </label>
            <input
              type="text"
              value={formTag}
              onChange={(e) => setFormTag(e.target.value)}
              placeholder="e.g. Limited Edition"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Category
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editingCat} onClose={() => setEditingCat(null)} title="Edit Category" maxWidth="md">
        <form onSubmit={handleSaveEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Promotional Tag
            </label>
            <input
              type="text"
              value={formTag}
              onChange={(e) => setFormTag(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setEditingCat(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Update Category
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, Filter, Calendar, Edit2, Trash2 } from 'lucide-react';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import AddDevotionForm from '@/components/devotions/AddDevotionForm';
import EditDevotionForm from '@/components/devotions/EditDevotionForm';
import { getUserDevotions, deleteDevotion } from '@/lib/storage';
import type { Devotion } from '@/types';

export default function DevotionsPage() {
  const [devotions, setDevotions] = useState<Devotion[]>([]);
  const [filteredDevotions, setFilteredDevotions] = useState<Devotion[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDevotion, setEditingDevotion] = useState<Devotion | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadDevotions();
  }, []);

  useEffect(() => {
    filterDevotions();
  }, [devotions, searchQuery, selectedCategory]);

  const loadDevotions = () => {
    const userDevotions = getUserDevotions();
    setDevotions(userDevotions);
  };

  const filterDevotions = () => {
    let filtered = [...devotions];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(d =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.scripture.book.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(d => d.category === selectedCategory);
    }

    setFilteredDevotions(filtered);
  };

  const handleDelete = (devotionId: string) => {
    if (confirm('Are you sure you want to delete this devotion?')) {
      deleteDevotion(devotionId);
      loadDevotions();
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Not scheduled';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'general', label: 'General' },
    { value: 'anxiety-peace', label: 'Anxiety & Peace' },
    { value: 'work-ethics', label: 'Work & Ethics' },
    { value: 'rest-sabbath', label: 'Rest & Sabbath' },
    { value: 'relationships', label: 'Relationships' },
    { value: 'faith', label: 'Faith' },
    { value: 'prayer', label: 'Prayer' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader
        title="Devotions"
        rightAction={
          <button
            onClick={() => setShowAddForm(true)}
            aria-label="Add devotion"
            className="p-2 -mr-2 rounded-full active:scale-95 transition-transform"
          >
            <Plus className="w-5 h-5" />
          </button>
        }
      />

      <main className="px-4 py-6 pb-20">
        {/* Search and Filter Bar */}
        <div className="mb-6 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input
              type="text"
              placeholder="Search devotions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-primary"
            />
          </div>

          {/* Filter Button & Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-foreground/60">
            {filteredDevotions.length} {filteredDevotions.length === 1 ? 'devotion' : 'devotions'}
          </p>
        </div>

        {/* Devotions Grid */}
        {filteredDevotions.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <BookOpen className="w-16 h-16 text-primary/40 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {searchQuery || selectedCategory !== 'all' ? 'No devotions found' : 'No devotions yet'}
            </h2>
            <p className="text-foreground/60 max-w-sm mb-6">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Start building your devotional library by adding your first devotion'}
            </p>
            {!searchQuery && selectedCategory === 'all' && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium active:scale-95 transition-transform flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Devotion
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDevotions.map((devotion) => (
              <div
                key={devotion.id}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-1">
                      {devotion.category.replace('-', ' & ')}
                    </p>
                    <h3 className="text-lg font-bold text-foreground tracking-tight line-clamp-2">
                      {devotion.title}
                    </h3>
                  </div>
                </div>

                {/* Scripture Reference */}
                <div className="mb-3">
                  <p className="text-sm font-medium text-primary">
                    {devotion.scripture.book} {devotion.scripture.chapter}:
                    {devotion.scripture.verseStart}
                    {devotion.scripture.verseEnd && `-${devotion.scripture.verseEnd}`}
                  </p>
                  <p className="text-xs text-foreground/60 mt-1">
                    {devotion.scripture.translation}
                  </p>
                </div>

                {/* Content Preview */}
                <p className="text-sm text-foreground/70 line-clamp-3 mb-3">
                  {devotion.content}
                </p>

                {/* Tags */}
                {devotion.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {devotion.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs rounded-full bg-muted text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                    {devotion.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-xs text-foreground/60">
                        +{devotion.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Scheduled Date */}
                <div className="flex items-center gap-1 text-xs text-foreground/60 mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(devotion.scheduledDate)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <button
                    onClick={() => setEditingDevotion(devotion)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-muted text-foreground text-sm font-medium hover:bg-muted/80 active:scale-95 transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(devotion.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 active:scale-95 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Add Devotion Form Modal */}
      {showAddForm && (
        <AddDevotionForm
          onClose={() => setShowAddForm(false)}
          onSuccess={loadDevotions}
        />
      )}

      {/* Edit Devotion Form Modal */}
      {editingDevotion && (
        <EditDevotionForm
          devotion={editingDevotion}
          onClose={() => setEditingDevotion(null)}
          onSuccess={loadDevotions}
        />
      )}
    </div>
  );
}

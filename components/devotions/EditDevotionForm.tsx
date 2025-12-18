'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { updateDevotion } from '@/lib/storage';
import type { Devotion } from '@/types';

interface EditDevotionFormProps {
  devotion: Devotion;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditDevotionForm({ devotion, onClose, onSuccess }: EditDevotionFormProps) {
  const [formData, setFormData] = useState<{
    title: string;
    book: string;
    chapter: string;
    verseStart: string;
    verseEnd: string;
    translation: string;
    scriptureText: string;
    content: string;
    reflection: string;
    actionStep: string;
    category: string;
    tags: string;
    scheduledDate: string;
  }>({
    title: devotion.title,
    book: devotion.scripture.book,
    chapter: devotion.scripture.chapter.toString(),
    verseStart: devotion.scripture.verseStart.toString(),
    verseEnd: devotion.scripture.verseEnd?.toString() || '',
    translation: devotion.scripture.translation,
    scriptureText: devotion.scripture.text,
    content: devotion.content,
    reflection: devotion.reflection,
    actionStep: devotion.actionStep,
    category: devotion.category,
    tags: devotion.tags.join(', '),
    scheduledDate: devotion.scheduledDate
      ? new Date(devotion.scheduledDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updates: Partial<Devotion> = {
      title: formData.title,
      scheduledDate: formData.scheduledDate ? new Date(formData.scheduledDate) : undefined,
      scripture: {
        book: formData.book,
        chapter: parseInt(formData.chapter) || 1,
        verseStart: parseInt(formData.verseStart) || 1,
        verseEnd: formData.verseEnd ? parseInt(formData.verseEnd) : undefined,
        translation: formData.translation as any,
        text: formData.scriptureText,
      },
      content: formData.content,
      reflection: formData.reflection,
      actionStep: formData.actionStep,
      category: formData.category as any,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    updateDevotion(devotion.id, updates);
    onSuccess();
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-background w-full sm:max-w-2xl sm:rounded-lg max-h-[90vh] overflow-y-auto rounded-t-2xl">
        <div className="sticky top-0 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Edit Devotion</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted active:scale-95 transition-transform"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
            />
          </div>

          {/* Scripture Reference */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="book" className="block text-sm font-medium text-foreground mb-1">
                Book *
              </label>
              <input
                type="text"
                id="book"
                name="book"
                value={formData.book}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
              />
            </div>
            <div>
              <label htmlFor="chapter" className="block text-sm font-medium text-foreground mb-1">
                Chapter *
              </label>
              <input
                type="number"
                id="chapter"
                name="chapter"
                value={formData.chapter}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="verseStart" className="block text-sm font-medium text-foreground mb-1">
                Verse Start *
              </label>
              <input
                type="number"
                id="verseStart"
                name="verseStart"
                value={formData.verseStart}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
              />
            </div>
            <div>
              <label htmlFor="verseEnd" className="block text-sm font-medium text-foreground mb-1">
                Verse End (optional)
              </label>
              <input
                type="number"
                id="verseEnd"
                name="verseEnd"
                value={formData.verseEnd}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
              />
            </div>
          </div>

          <div>
            <label htmlFor="translation" className="block text-sm font-medium text-foreground mb-1">
              Translation
            </label>
            <select
              id="translation"
              name="translation"
              value={formData.translation}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
            >
              <option value="NIV">NIV</option>
              <option value="ESV">ESV</option>
              <option value="NLT">NLT</option>
              <option value="KJV">KJV</option>
              <option value="NKJV">NKJV</option>
              <option value="CSB">CSB</option>
            </select>
          </div>

          {/* Scripture Text */}
          <div>
            <label htmlFor="scriptureText" className="block text-sm font-medium text-foreground mb-1">
              Scripture Text *
            </label>
            <textarea
              id="scriptureText"
              name="scriptureText"
              value={formData.scriptureText}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary resize-none"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-foreground mb-1">
              Devotion Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={8}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary resize-none"
            />
          </div>

          {/* Reflection Question */}
          <div>
            <label htmlFor="reflection" className="block text-sm font-medium text-foreground mb-1">
              Reflection Question *
            </label>
            <textarea
              id="reflection"
              name="reflection"
              value={formData.reflection}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary resize-none"
            />
          </div>

          {/* Action Step */}
          <div>
            <label htmlFor="actionStep" className="block text-sm font-medium text-foreground mb-1">
              Action Step *
            </label>
            <textarea
              id="actionStep"
              name="actionStep"
              value={formData.actionStep}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
            >
              <option value="general">General</option>
              <option value="anxiety-peace">Anxiety & Peace</option>
              <option value="work-ethics">Work & Ethics</option>
              <option value="rest-sabbath">Rest & Sabbath</option>
              <option value="relationships">Relationships</option>
              <option value="faith">Faith</option>
              <option value="prayer">Prayer</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
            />
          </div>

          {/* Scheduled Date */}
          <div>
            <label htmlFor="scheduledDate" className="block text-sm font-medium text-foreground mb-1">
              Scheduled Date *
            </label>
            <input
              type="date"
              id="scheduledDate"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
            />
            <p className="text-xs text-foreground/60 mt-1">
              When should this devotion appear as your daily step?
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-md border border-border text-foreground font-medium active:scale-95 transition-transform"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-md bg-primary text-primary-foreground font-medium active:scale-95 transition-transform"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

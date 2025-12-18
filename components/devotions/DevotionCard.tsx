'use client';

import { memo } from 'react';
import { Clock, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Devotion } from '@/types';

interface DevotionCardProps {
  devotion: Devotion;
  isCompleted?: boolean;
  onStart?: () => void;
  className?: string;
}

function DevotionCard({
  devotion,
  isCompleted = false,
  onStart,
  className,
}: DevotionCardProps) {
  const getCategoryGradient = (category: string): React.CSSProperties => {
    const categoryMap: Record<string, { from: string; to: string }> = {
      'anxiety-peace': { from: 'var(--category-anxiety-from)', to: 'var(--category-anxiety-to)' },
      'work-ethics': { from: 'var(--category-work-from)', to: 'var(--category-work-to)' },
      'relationships': { from: 'var(--category-relationships-from)', to: 'var(--category-relationships-to)' },
      'social-justice': { from: 'var(--category-justice-from)', to: 'var(--category-justice-to)' },
      'rest-sabbath': { from: 'var(--category-sabbath-from)', to: 'var(--category-sabbath-to)' },
      'identity': { from: 'var(--category-identity-from)', to: 'var(--category-identity-to)' },
      'community': { from: 'var(--category-community-from)', to: 'var(--category-community-to)' },
      'purpose': { from: 'var(--category-purpose-from)', to: 'var(--category-purpose-to)' },
    };

    const colors = categoryMap[category] || { from: 'var(--primary)', to: 'var(--secondary)' };
    return {
      backgroundImage: `linear-gradient(to bottom right, ${colors.from}33, ${colors.to}33)`,
    };
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-card-bg',
        'p-6 transition-all duration-200',
        isCompleted ? 'opacity-60' : 'active:scale-[0.98]',
        className
      )}
    >
      {/* Completion Badge */}
      {isCompleted && (
        <div className="absolute top-4 right-4">
          <CheckCircle2 className="w-6 h-6 text-success fill-success/20" />
        </div>
      )}

      {/* Category Tag */}
      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-primary/10 text-xs font-normal uppercase tracking-wide text-foreground/60 mb-4">
        <BookOpen className="w-3 h-3" />
        <span>{devotion.category.replace('-', ' & ')}</span>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-foreground mb-3 pr-8 tracking-tight leading-tight">
        {devotion.title}
      </h3>

      {/* Scripture Reference */}
      <p className="text-sm font-normal text-foreground/70 mb-4">
        {devotion.scripture.book} {devotion.scripture.chapter}:
        {devotion.scripture.verseStart}
        {devotion.scripture.verseEnd && `-${devotion.scripture.verseEnd}`}
      </p>

      {/* Reading Time */}
      <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
        <Clock className="w-4 h-4" />
        <span>{devotion.readingTime} min read</span>
      </div>

      {/* Action Step Preview */}
      <div className="mb-6 p-4 rounded-md bg-muted">
        <p className="text-xs font-normal text-foreground/60 uppercase tracking-wide mb-2">
          Today&apos;s Action
        </p>
        <p className="text-base text-foreground leading-snug line-clamp-2">
          {devotion.actionStep}
        </p>
      </div>

      {/* CTA Button */}
      {!isCompleted && onStart && (
        <button
          onClick={onStart}
          aria-label={`Start devotion: ${devotion.title}`}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-white font-bold text-base tracking-tight transition-transform active:scale-[0.98]"
        >
          <span>Start Today&apos;s Step</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      )}

      {isCompleted && (
        <div className="flex items-center justify-center gap-2 py-3 text-success font-medium">
          <CheckCircle2 className="w-5 h-5" />
          <span>Completed</span>
        </div>
      )}
    </div>
  );
}

export default memo(DevotionCard);

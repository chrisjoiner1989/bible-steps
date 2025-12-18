'use client';

import { BookOpen } from 'lucide-react';
import MobileHeader from '@/components/layout/MobileHeader';

export default function DevotionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Devotions" />
      <main className="px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <BookOpen className="w-16 h-16 text-primary mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Devotions Library
          </h2>
          <p className="text-foreground/60 max-w-sm">
            Browse all devotional series, past steps, and themed collections
          </p>
        </div>
      </main>
    </div>
  );
}

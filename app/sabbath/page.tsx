'use client';

import { Moon } from 'lucide-react';
import MobileHeader from '@/components/layout/MobileHeader';

export default function SabbathPage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Sabbath" />
      <main className="px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <Moon className="w-16 h-16 text-primary mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Sabbath & Rest
          </h2>
          <p className="text-foreground/60 max-w-sm">
            Practice intentional rest, digital detox, and soul-restoring activities
          </p>
        </div>
      </main>
    </div>
  );
}

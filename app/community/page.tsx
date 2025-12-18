'use client';

import { Users } from 'lucide-react';
import MobileHeader from '@/components/layout/MobileHeader';

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Community" />
      <main className="px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <Users className="w-16 h-16 text-primary mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Your Community
          </h2>
          <p className="text-foreground/60 max-w-sm">
            Connect with accountability circles, share reflections, and support each other
          </p>
        </div>
      </main>
    </div>
  );
}

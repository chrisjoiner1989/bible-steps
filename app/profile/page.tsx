'use client';

import { User } from 'lucide-react';
import MobileHeader from '@/components/layout/MobileHeader';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader title="Profile" />
      <main className="px-4 py-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <User className="w-16 h-16 text-primary mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Your Profile
          </h2>
          <p className="text-foreground/60 max-w-sm">
            Manage settings, notifications, and track your spiritual journey
          </p>
        </div>
      </main>
    </div>
  );
}

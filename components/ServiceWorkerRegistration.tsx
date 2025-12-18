'use client';

import { useEffect, useState } from 'react';
import { registerServiceWorker, skipWaitingAndReload } from '@/lib/sw-register';

/**
 * Service Worker Registration Component
 * Handles registration and update notifications
 */
export default function ServiceWorkerRegistration() {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Register service worker on mount
    registerServiceWorker({
      onUpdate: (reg) => {
        console.log('New version available!');
        setRegistration(reg);
        setShowUpdatePrompt(true);
      },
      onSuccess: (reg) => {
        console.log('Service Worker active');
      },
      onError: (error) => {
        console.error('Service Worker error:', error);
      },
    });
  }, []);

  const handleUpdate = () => {
    if (registration) {
      skipWaitingAndReload(registration);
    }
  };

  const handleDismiss = () => {
    setShowUpdatePrompt(false);
  };

  if (!showUpdatePrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="mx-auto max-w-md rounded-lg border-2 border-primary bg-background p-4 shadow-float">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="font-bold text-foreground mb-1">Update Available</p>
            <p className="text-sm text-foreground/70">
              A new version of Bible Steps is ready. Reload to update.
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleUpdate}
            className="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm transition-transform active:scale-95"
          >
            Update Now
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 rounded-lg border-2 border-muted text-foreground font-semibold text-sm transition-transform active:scale-95"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}

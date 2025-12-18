'use client';

import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { addNetworkListeners, isOffline } from '@/lib/sw-register';

/**
 * Offline Indicator Component
 * Shows a banner when the user goes offline
 */
export default function OfflineIndicator() {
  const [offline, setOffline] = useState(false);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    // Check initial state
    setOffline(isOffline());

    // Add network listeners
    const cleanup = addNetworkListeners(
      () => {
        // Online
        setOffline(false);
        setShowReconnected(true);

        // Hide reconnected message after 3 seconds
        setTimeout(() => {
          setShowReconnected(false);
        }, 3000);
      },
      () => {
        // Offline
        setOffline(true);
        setShowReconnected(false);
      }
    );

    return cleanup;
  }, []);

  // Show reconnected message briefly
  if (showReconnected && !offline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top-5">
        <div className="bg-success text-white px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <Wifi className="w-5 h-5" />
            <span className="font-semibold text-sm">Back online</span>
          </div>
        </div>
      </div>
    );
  }

  // Show offline indicator
  if (offline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 animate-in slide-in-from-top-5">
        <div className="bg-foreground text-background px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <WifiOff className="w-5 h-5" />
            <span className="font-semibold text-sm">
              You&apos;re offline - Some features may be limited
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

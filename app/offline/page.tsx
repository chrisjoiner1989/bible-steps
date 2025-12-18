'use client';

import { WifiOff, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Offline Icon */}
        <div className="mb-6 flex justify-center">
          <div className="p-6 rounded-full bg-muted">
            <WifiOff className="w-16 h-16 text-foreground/40" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-black text-foreground mb-3 tracking-tight">
          You&apos;re Offline
        </h1>

        {/* Description */}
        <p className="text-base text-foreground/70 mb-8 leading-relaxed">
          No internet connection detected. Don&apos;t worry—previously viewed devotions are
          still available while you&apos;re offline.
        </p>

        {/* Cached Content Info */}
        <div className="p-6 rounded-lg border-2 border-muted bg-background mb-8">
          <h2 className="text-lg font-bold text-foreground mb-3">
            What&apos;s Available Offline
          </h2>
          <ul className="text-sm text-foreground/70 text-left space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">✓</span>
              <span>Your current streak and progress</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">✓</span>
              <span>Previously viewed devotions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">✓</span>
              <span>App navigation and layout</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground/30 font-bold mt-0.5">✗</span>
              <span className="text-foreground/50">New devotions (requires connection)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-foreground/30 font-bold mt-0.5">✗</span>
              <span className="text-foreground/50">Cloud sync (requires connection)</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-white font-bold text-base tracking-tight transition-transform active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="block w-full px-6 py-4 rounded-lg border-2 border-muted text-foreground font-bold text-base tracking-tight transition-transform active:scale-95"
          >
            View Cached Content
          </Link>
        </div>

        {/* Encouragement */}
        <div className="mt-8 p-4 rounded-lg bg-grace/20">
          <p className="text-sm text-foreground/70 leading-relaxed">
            <span className="font-bold text-foreground">Remember:</span> God&apos;s presence
            isn&apos;t dependent on WiFi. Take this time for quiet reflection.
          </p>
        </div>
      </div>
    </div>
  );
}

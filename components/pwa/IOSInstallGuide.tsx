'use client';

import { Share, Plus, X } from 'lucide-react';

interface IOSInstallGuideProps {
  onDismiss: () => void;
}

/**
 * iOS Safari Install Guide Component
 * Shows visual instructions for adding to home screen on iOS
 */
export default function IOSInstallGuide({ onDismiss }: IOSInstallGuideProps) {
  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="mx-auto max-w-md rounded-lg border-2 border-primary bg-background p-4 shadow-float">
        {/* Close button */}
        <button
          onClick={onDismiss}
          aria-label="Dismiss install guide"
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-foreground/60" />
        </button>

        {/* Header */}
        <div className="mb-4 pr-8">
          <h3 className="font-bold text-foreground mb-1">Install Bible Steps</h3>
          <p className="text-sm text-foreground/70">
            Add Bible Steps to your home screen for quick access and a native app experience.
          </p>
        </div>

        {/* Instructions */}
        <div className="space-y-3 mb-4">
          {/* Step 1 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-foreground text-sm">
                  Tap the Share button
                </p>
                <div className="p-1.5 rounded bg-background border border-muted">
                  <Share className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="text-xs text-foreground/60">
                Look for the share icon at the bottom of your browser
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-foreground text-sm">
                  Select &quot;Add to Home Screen&quot;
                </p>
                <div className="p-1.5 rounded bg-background border border-muted">
                  <Plus className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="text-xs text-foreground/60">
                Scroll down in the menu to find this option
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              3
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm mb-1">
                Tap &quot;Add&quot; to confirm
              </p>
              <p className="text-xs text-foreground/60">
                Bible Steps will appear on your home screen
              </p>
            </div>
          </div>
        </div>

        {/* Features callout */}
        <div className="p-3 rounded-lg bg-grace/20 border border-grace/30 mb-4">
          <p className="text-xs text-foreground font-semibold mb-2">
            Why install?
          </p>
          <ul className="text-xs text-foreground/70 space-y-1">
            <li className="flex items-center gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Works offline with cached content</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Full-screen experience without browser UI</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary font-bold">✓</span>
              <span>Quick access from home screen</span>
            </li>
          </ul>
        </div>

        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          className="w-full px-4 py-2.5 rounded-lg border-2 border-muted text-foreground font-semibold text-sm transition-transform active:scale-95"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}

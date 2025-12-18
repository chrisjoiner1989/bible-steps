'use client';

import { Download, X } from 'lucide-react';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import IOSInstallGuide from './IOSInstallGuide';

/**
 * PWA Install Prompt Component
 * Shows smart install prompts for both Android/Desktop and iOS
 */
export default function InstallPrompt() {
  const { canInstall, showPrompt, isIOSDevice, promptToInstall, dismissPrompt } =
    useInstallPrompt();

  // Don't show if can't install or prompt is hidden
  if (!canInstall || !showPrompt) {
    return null;
  }

  // Show iOS-specific instructions
  if (isIOSDevice) {
    return <IOSInstallGuide onDismiss={dismissPrompt} />;
  }

  // Show Android/Desktop install prompt
  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="mx-auto max-w-md rounded-lg border-2 border-primary bg-background p-4 shadow-float">
        {/* Close button */}
        <button
          onClick={dismissPrompt}
          aria-label="Dismiss install prompt"
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-foreground/60" />
        </button>

        <div className="flex items-start gap-3 pr-8">
          {/* Icon */}
          <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10">
            <Download className="w-6 h-6 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-bold text-foreground mb-1">Install Bible Steps</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Install our app for quick access, offline support, and a better experience.
            </p>

            {/* Features */}
            <ul className="text-xs text-foreground/60 space-y-1 mb-4">
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Works offline with cached devotions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Faster load times</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Home screen shortcut</span>
              </li>
            </ul>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={promptToInstall}
                className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white font-semibold text-sm transition-transform active:scale-95"
              >
                Install Now
              </button>
              <button
                onClick={dismissPrompt}
                className="px-4 py-2.5 rounded-lg border-2 border-muted text-foreground font-semibold text-sm transition-transform active:scale-95"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

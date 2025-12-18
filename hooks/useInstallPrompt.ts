'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BeforeInstallPromptEvent,
  shouldShowInstallPrompt,
  markInstallPromptDismissed,
  isRunningAsPWA,
  isIOSSafari,
} from '@/lib/pwa-utils';

/**
 * Hook to manage PWA install prompt
 * Handles both iOS (manual instructions) and Android/Desktop (native prompt)
 */
export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Don't show if already installed
    if (isRunningAsPWA()) {
      return;
    }

    // Check if we should show the prompt
    if (!shouldShowInstallPrompt()) {
      return;
    }

    // iOS Safari - show manual instructions after user engagement
    if (isIOSSafari()) {
      // Wait for user to engage with the app before showing
      const timer = setTimeout(() => {
        setShowIOSInstructions(true);
      }, 10000); // Show after 10 seconds of usage

      return () => clearTimeout(timer);
    }

    // Android/Desktop - listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default mini-infobar
      e.preventDefault();

      // Store the event for later use
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Show our custom prompt after a delay (don't show immediately)
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000); // Show after 5 seconds of usage
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  /**
   * Trigger the native install prompt (Android/Desktop)
   */
  const promptToInstall = useCallback(async () => {
    if (!deferredPrompt) {
      return false;
    }

    try {
      // Show the native prompt
      await deferredPrompt.prompt();

      // Wait for user choice
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setShowPrompt(false);
        setDeferredPrompt(null);
        return true;
      } else {
        console.log('User dismissed the install prompt');
        dismissPrompt();
        return false;
      }
    } catch (error) {
      console.error('Error showing install prompt:', error);
      return false;
    }
  }, [deferredPrompt]);

  /**
   * Dismiss the install prompt
   */
  const dismissPrompt = useCallback(() => {
    setShowPrompt(false);
    setShowIOSInstructions(false);
    markInstallPromptDismissed();
  }, []);

  /**
   * Show the prompt manually (for testing or user-initiated)
   */
  const showPromptManually = useCallback(() => {
    if (isIOSSafari()) {
      setShowIOSInstructions(true);
    } else if (deferredPrompt) {
      setShowPrompt(true);
    }
  }, [deferredPrompt]);

  return {
    // State
    canInstall: !!deferredPrompt || isIOSSafari(),
    showPrompt: showPrompt || showIOSInstructions,
    isIOSDevice: isIOSSafari(),

    // Actions
    promptToInstall,
    dismissPrompt,
    showPromptManually,
  };
}

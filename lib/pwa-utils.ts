'use client';

/**
 * PWA Detection and Installation Utilities
 */

// Storage keys
const INSTALL_PROMPT_DISMISSED_KEY = 'bible-steps-install-dismissed';
const INSTALL_PROMPT_LAST_SHOWN_KEY = 'bible-steps-install-last-shown';

/**
 * Check if the app is currently running as an installed PWA
 */
export function isRunningAsPWA(): boolean {
  if (typeof window === 'undefined') return false;

  // Check if running in standalone mode
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

  // Check iOS standalone
  const isIOSStandalone = (window.navigator as any).standalone === true;

  return isStandalone || isIOSStandalone;
}

/**
 * Detect if the user is on iOS
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
}

/**
 * Detect if the user is on iOS Safari (not Chrome or other browsers)
 */
export function isIOSSafari(): boolean {
  if (!isIOS()) return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  // iOS Safari doesn't have "crios" (Chrome) or "fxios" (Firefox)
  return !userAgent.includes('crios') && !userAgent.includes('fxios');
}

/**
 * Detect if the user is on Android
 */
export function isAndroid(): boolean {
  if (typeof window === 'undefined') return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  return /android/.test(userAgent);
}

/**
 * Check if the browser supports the beforeinstallprompt event
 */
export function supportsBeforeInstallPrompt(): boolean {
  if (typeof window === 'undefined') return false;

  return 'BeforeInstallPromptEvent' in window;
}

/**
 * Check if user has previously dismissed the install prompt
 */
export function hasUserDismissedInstallPrompt(): boolean {
  if (typeof window === 'undefined') return false;

  const dismissed = localStorage.getItem(INSTALL_PROMPT_DISMISSED_KEY);
  return dismissed === 'true';
}

/**
 * Mark install prompt as dismissed
 */
export function markInstallPromptDismissed(): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(INSTALL_PROMPT_DISMISSED_KEY, 'true');
  localStorage.setItem(INSTALL_PROMPT_LAST_SHOWN_KEY, Date.now().toString());
}

/**
 * Clear install prompt dismissal (for testing)
 */
export function clearInstallPromptDismissal(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(INSTALL_PROMPT_DISMISSED_KEY);
  localStorage.removeItem(INSTALL_PROMPT_LAST_SHOWN_KEY);
}

/**
 * Check if enough time has passed since last showing the prompt
 * @param daysToWait Number of days to wait before showing again (default: 7)
 */
export function shouldShowInstallPrompt(daysToWait: number = 7): boolean {
  if (typeof window === 'undefined') return false;

  // Don't show if already installed
  if (isRunningAsPWA()) return false;

  // Don't show if user dismissed it
  if (hasUserDismissedInstallPrompt()) {
    const lastShown = localStorage.getItem(INSTALL_PROMPT_LAST_SHOWN_KEY);
    if (lastShown) {
      const daysSinceLastShown = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      // Show again after daysToWait days
      return daysSinceLastShown >= daysToWait;
    }
    return false;
  }

  return true;
}

/**
 * Get the device type for display purposes
 */
export function getDeviceType(): 'ios' | 'android' | 'desktop' {
  if (isIOS()) return 'ios';
  if (isAndroid()) return 'android';
  return 'desktop';
}

/**
 * Check if the app can be installed
 */
export function canInstallPWA(): boolean {
  if (typeof window === 'undefined') return false;

  // Can't install if already installed
  if (isRunningAsPWA()) return false;

  // iOS Safari can always "install" via Add to Home Screen
  if (isIOSSafari()) return true;

  // Android/Desktop need beforeinstallprompt support
  return supportsBeforeInstallPrompt();
}

/**
 * Get install instructions based on platform
 */
export function getInstallInstructions(): string {
  const deviceType = getDeviceType();

  switch (deviceType) {
    case 'ios':
      return 'Tap the Share button, then "Add to Home Screen"';
    case 'android':
      return 'Tap the menu (⋮) and select "Add to Home screen" or "Install app"';
    default:
      return 'Click the install button in your browser\'s address bar';
  }
}

/**
 * Platform-specific interface for BeforeInstallPromptEvent
 */
export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

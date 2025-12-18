'use client';

/**
 * Service Worker Registration Utility
 * Handles registration, updates, and lifecycle management
 */

export interface ServiceWorkerUpdateCallback {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
}

/**
 * Register service worker with lifecycle callbacks
 */
export async function registerServiceWorker(
  callbacks?: ServiceWorkerUpdateCallback
): Promise<ServiceWorkerRegistration | null> {
  // Check if service workers are supported
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Workers not supported in this browser');
    return null;
  }

  // Don't register in development mode
  if (process.env.NODE_ENV === 'development') {
    console.log('Service Worker registration skipped in development');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('Service Worker registered successfully:', registration.scope);

    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;

      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New service worker available
          console.log('New service worker available');
          callbacks?.onUpdate?.(registration);
        }
      });
    });

    // Check if there's a waiting worker
    if (registration.waiting) {
      callbacks?.onUpdate?.(registration);
    }

    // Check for updates periodically
    setInterval(() => {
      registration.update();
    }, 60000); // Check every minute

    callbacks?.onSuccess?.(registration);

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    callbacks?.onError?.(error as Error);
    return null;
  }
}

/**
 * Unregister all service workers
 */
export async function unregisterServiceWorker(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((reg) => reg.unregister()));
    console.log('All service workers unregistered');
    return true;
  } catch (error) {
    console.error('Failed to unregister service workers:', error);
    return false;
  }
}

/**
 * Skip waiting and activate new service worker
 */
export function skipWaitingAndReload(registration: ServiceWorkerRegistration) {
  const waiting = registration.waiting;

  if (!waiting) return;

  // Send message to service worker to skip waiting
  waiting.postMessage({ type: 'SKIP_WAITING' });

  // Reload page when new service worker takes control
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}

/**
 * Get current service worker version
 */
export async function getServiceWorkerVersion(): Promise<string | null> {
  if (typeof window === 'undefined' || !navigator.serviceWorker.controller) {
    return null;
  }

  return new Promise((resolve) => {
    const messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = (event) => {
      resolve(event.data?.version || null);
    };

    navigator.serviceWorker.controller.postMessage(
      { type: 'GET_VERSION' },
      [messageChannel.port2]
    );

    // Timeout after 1 second
    setTimeout(() => resolve(null), 1000);
  });
}

/**
 * Check if app is currently offline
 */
export function isOffline(): boolean {
  return typeof window !== 'undefined' && !navigator.onLine;
}

/**
 * Add online/offline event listeners
 */
export function addNetworkListeners(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
}

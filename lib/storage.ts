'use client';

import type { UserProfile, AppSettings, NotificationPreferences } from '@/types';

/**
 * Local Storage Utilities for Bible Steps
 * Handles persistence of user progress, streaks, and devotion completion
 */

const STORAGE_KEYS = {
  USER_PROGRESS: 'bible-steps-user-progress',
  COMPLETED_DEVOTIONS: 'bible-steps-completed-devotions',
  STREAK_DATA: 'bible-steps-streak-data',
  LAST_VISIT: 'bible-steps-last-visit',
  USER_DEVOTIONS: 'bible-steps-user-devotions',
  USER_PROFILE: 'bible-steps-user-profile',
  APP_SETTINGS: 'bible-steps-app-settings',
  NOTIFICATION_PREFS: 'bible-steps-notification-prefs',
} as const;

// Types
export interface UserProgress {
  currentStreak: number;
  longestStreak: number;
  totalDevotionsCompleted: number;
  lastCompletedDate: string | null;
  gracePeriodActive: boolean;
  gracePeriodEndsAt: string | null;
}

export interface CompletedDevotion {
  devotionId: string;
  completedAt: string;
  date: string; // YYYY-MM-DD format
}

/**
 * Get user progress from local storage
 */
export function getUserProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return getDefaultProgress();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    if (!stored) return getDefaultProgress();

    const progress = JSON.parse(stored) as UserProgress;

    // Check if grace period has expired
    if (progress.gracePeriodActive && progress.gracePeriodEndsAt) {
      const now = new Date();
      const gracePeriodEnd = new Date(progress.gracePeriodEndsAt);

      if (now > gracePeriodEnd) {
        // Grace period expired, reset streak
        progress.currentStreak = 0;
        progress.gracePeriodActive = false;
        progress.gracePeriodEndsAt = null;
        saveUserProgress(progress);
      }
    }

    return progress;
  } catch (error) {
    console.error('Failed to load user progress:', error);
    return getDefaultProgress();
  }
}

/**
 * Save user progress to local storage
 */
export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save user progress:', error);
  }
}

/**
 * Get default user progress
 */
function getDefaultProgress(): UserProgress {
  return {
    currentStreak: 0,
    longestStreak: 0,
    totalDevotionsCompleted: 0,
    lastCompletedDate: null,
    gracePeriodActive: false,
    gracePeriodEndsAt: null,
  };
}

/**
 * Get completed devotions
 */
export function getCompletedDevotions(): CompletedDevotion[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.COMPLETED_DEVOTIONS);
    if (!stored) return [];
    return JSON.parse(stored) as CompletedDevotion[];
  } catch (error) {
    console.error('Failed to load completed devotions:', error);
    return [];
  }
}

/**
 * Save completed devotions
 */
export function saveCompletedDevotions(devotions: CompletedDevotion[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_DEVOTIONS, JSON.stringify(devotions));
  } catch (error) {
    console.error('Failed to save completed devotions:', error);
  }
}

/**
 * Check if a devotion is completed for a specific date
 */
export function isDevotionCompletedForDate(devotionId: string, date: Date): boolean {
  const completed = getCompletedDevotions();
  const dateStr = formatDate(date);

  return completed.some(
    (c) => c.devotionId === devotionId && c.date === dateStr
  );
}

/**
 * Check if user has completed any devotion today
 */
export function hasCompletedTodaysDevotion(): boolean {
  const completed = getCompletedDevotions();
  const today = formatDate(new Date());

  return completed.some((c) => c.date === today);
}

/**
 * Mark a devotion as completed
 */
export function markDevotionComplete(devotionId: string): void {
  const now = new Date();
  const today = formatDate(now);

  // Check if already completed today
  if (hasCompletedTodaysDevotion()) {
    console.log('Already completed a devotion today');
    return;
  }

  // Add to completed devotions
  const completed = getCompletedDevotions();
  const newCompletion: CompletedDevotion = {
    devotionId,
    completedAt: now.toISOString(),
    date: today,
  };
  completed.push(newCompletion);
  saveCompletedDevotions(completed);

  // Update streak
  updateStreak();
}

/**
 * Update streak based on completion
 */
function updateStreak(): void {
  const progress = getUserProgress();
  const now = new Date();
  const today = formatDate(now);
  const yesterday = formatDate(new Date(now.getTime() - 24 * 60 * 60 * 1000));

  // If no last completion, start streak at 1
  if (!progress.lastCompletedDate) {
    progress.currentStreak = 1;
    progress.longestStreak = Math.max(1, progress.longestStreak);
    progress.lastCompletedDate = today;
    progress.totalDevotionsCompleted = 1;
    progress.gracePeriodActive = false;
    progress.gracePeriodEndsAt = null;
    saveUserProgress(progress);
    return;
  }

  // If completed yesterday, increment streak
  if (progress.lastCompletedDate === yesterday) {
    progress.currentStreak += 1;
    progress.longestStreak = Math.max(progress.currentStreak, progress.longestStreak);
    progress.lastCompletedDate = today;
    progress.totalDevotionsCompleted += 1;
    progress.gracePeriodActive = false;
    progress.gracePeriodEndsAt = null;
    saveUserProgress(progress);
    return;
  }

  // If completed today (already), don't change streak
  if (progress.lastCompletedDate === today) {
    progress.totalDevotionsCompleted += 1;
    saveUserProgress(progress);
    return;
  }

  // If in grace period, save the streak
  if (progress.gracePeriodActive) {
    progress.currentStreak += 1;
    progress.longestStreak = Math.max(progress.currentStreak, progress.longestStreak);
    progress.lastCompletedDate = today;
    progress.totalDevotionsCompleted += 1;
    progress.gracePeriodActive = false;
    progress.gracePeriodEndsAt = null;
    saveUserProgress(progress);
    return;
  }

  // Otherwise, streak is broken, start fresh
  progress.currentStreak = 1;
  progress.longestStreak = Math.max(progress.currentStreak, progress.longestStreak);
  progress.lastCompletedDate = today;
  progress.totalDevotionsCompleted += 1;
  progress.gracePeriodActive = false;
  progress.gracePeriodEndsAt = null;
  saveUserProgress(progress);
}

/**
 * Check streak status and activate grace period if needed
 */
export function checkStreakStatus(): void {
  const progress = getUserProgress();

  if (!progress.lastCompletedDate) return;

  const now = new Date();
  const today = formatDate(now);
  const yesterday = formatDate(new Date(now.getTime() - 24 * 60 * 60 * 1000));
  const twoDaysAgo = formatDate(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000));

  // If completed today, all good
  if (progress.lastCompletedDate === today || progress.lastCompletedDate === yesterday) {
    return;
  }

  // If last completion was 2 days ago and not in grace period, activate it
  if (progress.lastCompletedDate === twoDaysAgo && !progress.gracePeriodActive) {
    progress.gracePeriodActive = true;
    progress.gracePeriodEndsAt = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    saveUserProgress(progress);
    return;
  }

  // If grace period expired, reset streak
  if (progress.gracePeriodActive && progress.gracePeriodEndsAt) {
    const gracePeriodEnd = new Date(progress.gracePeriodEndsAt);
    if (now > gracePeriodEnd) {
      progress.currentStreak = 0;
      progress.gracePeriodActive = false;
      progress.gracePeriodEndsAt = null;
      saveUserProgress(progress);
    }
  }
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Get today's date string
 */
export function getTodayDateString(): string {
  return formatDate(new Date());
}

/**
 * Reset all user data (for testing or account deletion)
 */
export function resetAllData(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_DEVOTIONS);
    localStorage.removeItem(STORAGE_KEYS.STREAK_DATA);
    localStorage.removeItem(STORAGE_KEYS.LAST_VISIT);
    localStorage.removeItem(STORAGE_KEYS.USER_DEVOTIONS);
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.APP_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATION_PREFS);
    console.log('All user data reset');
  } catch (error) {
    console.error('Failed to reset user data:', error);
  }
}

/**
 * Export all user data (for backup/portability)
 */
export function exportUserData(): string {
  const data = {
    progress: getUserProgress(),
    completedDevotions: getCompletedDevotions(),
    userDevotions: getUserDevotions(),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
}

/**
 * Import user data (from backup)
 */
export function importUserData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);

    if (data.progress) {
      saveUserProgress(data.progress);
    }

    if (data.completedDevotions) {
      saveCompletedDevotions(data.completedDevotions);
    }

    if (data.userDevotions) {
      saveUserDevotions(data.userDevotions);
    }

    console.log('User data imported successfully');
    return true;
  } catch (error) {
    console.error('Failed to import user data:', error);
    return false;
  }
}

/**
 * Get user's custom devotions (sorted by scheduled date)
 */
export function getUserDevotions(): any[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_DEVOTIONS);
    if (!stored) return [];
    const devotions = JSON.parse(stored);

    // Sort by scheduled date (earliest first), unscheduled at the end
    return devotions.sort((a: any, b: any) => {
      const dateA = a.scheduledDate ? new Date(a.scheduledDate).getTime() : Infinity;
      const dateB = b.scheduledDate ? new Date(b.scheduledDate).getTime() : Infinity;
      return dateA - dateB;
    });
  } catch (error) {
    console.error('Failed to load user devotions:', error);
    return [];
  }
}

/**
 * Save user's devotions
 */
export function saveUserDevotions(devotions: any[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.USER_DEVOTIONS, JSON.stringify(devotions));
  } catch (error) {
    console.error('Failed to save user devotions:', error);
  }
}

/**
 * Add a new devotion
 */
export function addDevotion(devotion: any): void {
  const devotions = getUserDevotions();
  devotions.push(devotion);
  saveUserDevotions(devotions);
}

/**
 * Update an existing devotion
 */
export function updateDevotion(devotionId: string, updates: Partial<any>): void {
  const devotions = getUserDevotions();
  const index = devotions.findIndex(d => d.id === devotionId);

  if (index !== -1) {
    devotions[index] = { ...devotions[index], ...updates };
    saveUserDevotions(devotions);
  }
}

/**
 * Delete a devotion
 */
export function deleteDevotion(devotionId: string): void {
  const devotions = getUserDevotions();
  const filtered = devotions.filter(d => d.id !== devotionId);
  saveUserDevotions(filtered);
}

/**
 * Get a single devotion by ID
 */
export function getDevotionById(devotionId: string): any | null {
  const devotions = getUserDevotions();
  return devotions.find(d => d.id === devotionId) || null;
}

/**
 * Get today's devotion based on scheduled date
 */
export function getTodaysDevotion(): any | null {
  const devotions = getUserDevotions();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find the first devotion scheduled for today or earlier that hasn't been completed
  for (const devotion of devotions) {
    if (devotion.scheduledDate) {
      const scheduledDate = new Date(devotion.scheduledDate);
      scheduledDate.setHours(0, 0, 0, 0);

      if (scheduledDate <= today) {
        return devotion;
      }
    }
  }

  // If no scheduled devotions, return the first one
  return devotions.length > 0 ? devotions[0] : null;
}

/**
 * Get upcoming devotions (scheduled for future dates)
 */
export function getUpcomingDevotions(limit: number = 3): any[] {
  const devotions = getUserDevotions();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return devotions
    .filter((d: any) => {
      if (!d.scheduledDate) return false;
      const scheduledDate = new Date(d.scheduledDate);
      scheduledDate.setHours(0, 0, 0, 0);
      return scheduledDate > today;
    })
    .slice(0, limit);
}

/**
 * Reschedule a devotion to a new date
 */
export function rescheduleDevotion(devotionId: string, newDate: Date): void {
  updateDevotion(devotionId, { scheduledDate: newDate });
}

// ============================================================
// User Profile Functions
// ============================================================

/**
 * Get default user profile
 */
function getDefaultUserProfile(): UserProfile {
  const firstCompletion = getCompletedDevotions()[0];
  const joinDate = firstCompletion?.completedAt || new Date().toISOString();

  return {
    displayName: 'User',
    email: undefined,
    avatar: undefined,
    joinDate,
  };
}

/**
 * Get user profile from local storage
 */
export function getUserProfile(): UserProfile {
  if (typeof window === 'undefined') {
    return getDefaultUserProfile();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!stored) return getDefaultUserProfile();
    return JSON.parse(stored) as UserProfile;
  } catch (error) {
    console.error('Failed to load user profile:', error);
    return getDefaultUserProfile();
  }
}

/**
 * Save user profile to local storage
 */
export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error('Failed to save user profile:', error);
  }
}

// ============================================================
// App Settings Functions
// ============================================================

/**
 * Get default app settings
 */
function getDefaultAppSettings(): AppSettings {
  return {
    theme: 'system',
    defaultTranslation: 'NIV',
    readingTimeGoal: 10,
    sabbathMode: false,
    sabbathDay: 0, // Sunday
    autoAdvance: true,
    favoriteCategories: [],
    hideCompleted: false,
    upcomingCount: 3,
  };
}

/**
 * Get app settings from local storage
 */
export function getAppSettings(): AppSettings {
  if (typeof window === 'undefined') {
    return getDefaultAppSettings();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.APP_SETTINGS);
    if (!stored) return getDefaultAppSettings();
    return JSON.parse(stored) as AppSettings;
  } catch (error) {
    console.error('Failed to load app settings:', error);
    return getDefaultAppSettings();
  }
}

/**
 * Save app settings to local storage
 */
export function saveAppSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.APP_SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save app settings:', error);
  }
}

// ============================================================
// Notification Preferences Functions
// ============================================================

/**
 * Get default notification preferences
 */
function getDefaultNotificationPreferences(): NotificationPreferences {
  return {
    enabled: false,
    time: '09:00',
    graceBased: true,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
    },
    mentalHealthMode: false,
  };
}

/**
 * Get notification preferences from local storage
 */
export function getNotificationPreferences(): NotificationPreferences {
  if (typeof window === 'undefined') {
    return getDefaultNotificationPreferences();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATION_PREFS);
    if (!stored) return getDefaultNotificationPreferences();
    return JSON.parse(stored) as NotificationPreferences;
  } catch (error) {
    console.error('Failed to load notification preferences:', error);
    return getDefaultNotificationPreferences();
  }
}

/**
 * Save notification preferences to local storage
 */
export function saveNotificationPreferences(prefs: NotificationPreferences): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATION_PREFS, JSON.stringify(prefs));
  } catch (error) {
    console.error('Failed to save notification preferences:', error);
  }
}

// ============================================================
// Data Export/Import Functions
// ============================================================

/**
 * Download backup as JSON file
 */
export function downloadBackup(): void {
  const data = {
    profile: getUserProfile(),
    settings: getAppSettings(),
    notificationPrefs: getNotificationPreferences(),
    progress: getUserProgress(),
    completedDevotions: getCompletedDevotions(),
    userDevotions: getUserDevotions(),
    exportedAt: new Date().toISOString(),
    version: '1.0',
  };

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `bible-steps-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Upload and restore backup from file
 */
export function uploadBackup(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const data = JSON.parse(jsonData);

        // Restore all data
        if (data.profile) saveUserProfile(data.profile);
        if (data.settings) saveAppSettings(data.settings);
        if (data.notificationPrefs) saveNotificationPreferences(data.notificationPrefs);
        if (data.progress) saveUserProgress(data.progress);
        if (data.completedDevotions) saveCompletedDevotions(data.completedDevotions);
        if (data.userDevotions) saveUserDevotions(data.userDevotions);

        console.log('Backup restored successfully');
        resolve(true);
      } catch (error) {
        console.error('Failed to restore backup:', error);
        resolve(false);
      }
    };

    reader.onerror = () => {
      console.error('Failed to read backup file');
      resolve(false);
    };

    reader.readAsText(file);
  });
}

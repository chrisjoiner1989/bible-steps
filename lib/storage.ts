'use client';

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

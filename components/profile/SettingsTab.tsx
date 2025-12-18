'use client';

import { Bell, Moon, Book, Clock, Heart, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAppSettings, saveAppSettings, getNotificationPreferences, saveNotificationPreferences } from '@/lib/storage';
import { useTheme } from '@/contexts/ThemeContext';
import type { AppSettings, NotificationPreferences, BibleTranslation, DevotionCategory } from '@/types';

export default function SettingsTab() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [notifPrefs, setNotifPrefs] = useState<NotificationPreferences | null>(null);

  useEffect(() => {
    setSettings(getAppSettings());
    setNotifPrefs(getNotificationPreferences());
  }, []);

  const handleSettingsChange = (updates: Partial<AppSettings>) => {
    if (!settings) return;
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    saveAppSettings(newSettings);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    handleSettingsChange({ theme: newTheme });
  };

  const handleNotifChange = (updates: Partial<NotificationPreferences>) => {
    if (!notifPrefs) return;
    const newPrefs = { ...notifPrefs, ...updates };
    setNotifPrefs(newPrefs);
    saveNotificationPreferences(newPrefs);
  };

  const handleQuietHoursChange = (updates: Partial<NotificationPreferences['quietHours']>) => {
    if (!notifPrefs) return;
    handleNotifChange({
      quietHours: { ...notifPrefs.quietHours, ...updates }
    });
  };

  if (!settings || !notifPrefs) {
    return <div className="p-4">Loading...</div>;
  }

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="pb-20 px-4 pt-6 space-y-6">
      {/* Notification Settings */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Notifications</h2>
        </div>

        <div className="space-y-3">
          {/* Daily Reminder Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
            <div>
              <div className="font-medium text-foreground">Daily Reminder</div>
              <div className="text-xs text-foreground/60">Get notified each day</div>
            </div>
            <button
              onClick={() => handleNotifChange({ enabled: !notifPrefs.enabled })}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                notifPrefs.enabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  notifPrefs.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reminder Time */}
          {notifPrefs.enabled && (
            <div className="p-4 rounded-lg bg-card border border-border">
              <label className="block text-sm font-medium text-foreground mb-2">
                Reminder Time
              </label>
              <input
                type="time"
                value={notifPrefs.time}
                onChange={(e) => handleNotifChange({ time: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
              />
            </div>
          )}

          {/* Quiet Hours */}
          <div className="p-4 rounded-lg bg-card border border-border space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Quiet Hours</div>
                <div className="text-xs text-foreground/60">No notifications during this time</div>
              </div>
              <button
                onClick={() => handleQuietHoursChange({ enabled: !notifPrefs.quietHours.enabled })}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notifPrefs.quietHours.enabled ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                    notifPrefs.quietHours.enabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {notifPrefs.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-foreground/60 mb-1">Start</label>
                  <input
                    type="time"
                    value={notifPrefs.quietHours.start}
                    onChange={(e) => handleQuietHoursChange({ start: e.target.value })}
                    className="w-full px-2 py-1.5 text-sm rounded-md border border-border bg-background text-foreground focus:outline-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-foreground/60 mb-1">End</label>
                  <input
                    type="time"
                    value={notifPrefs.quietHours.end}
                    onChange={(e) => handleQuietHoursChange({ end: e.target.value })}
                    className="w-full px-2 py-1.5 text-sm rounded-md border border-border bg-background text-foreground focus:outline-primary"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Grace-Based Notifications */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
            <div>
              <div className="font-medium text-foreground">Grace-Based</div>
              <div className="text-xs text-foreground/60">Gentle, encouraging tone</div>
            </div>
            <button
              onClick={() => handleNotifChange({ graceBased: !notifPrefs.graceBased })}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                notifPrefs.graceBased ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  notifPrefs.graceBased ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Mental Health Mode */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
            <div>
              <div className="font-medium text-foreground">Mental Health Mode</div>
              <div className="text-xs text-foreground/60">Extra gentle notifications</div>
            </div>
            <button
              onClick={() => handleNotifChange({ mentalHealthMode: !notifPrefs.mentalHealthMode })}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                notifPrefs.mentalHealthMode ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  notifPrefs.mentalHealthMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* App Preferences */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Moon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">App Preferences</h2>
        </div>

        <div className="space-y-3">
          {/* Theme */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <label className="block text-sm font-medium text-foreground mb-2">
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark' | 'system')}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
            <p className="text-xs text-foreground/60 mt-2">
              {theme === 'system' ? 'Following your device settings' : `Using ${theme} mode`}
            </p>
          </div>

          {/* Bible Translation */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <label className="block text-sm font-medium text-foreground mb-2">
              Default Bible Translation
            </label>
            <select
              value={settings.defaultTranslation}
              onChange={(e) => handleSettingsChange({ defaultTranslation: e.target.value as BibleTranslation })}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
            >
              <option value="NIV">NIV</option>
              <option value="ESV">ESV</option>
              <option value="NLT">NLT</option>
              <option value="KJV">KJV</option>
              <option value="NKJV">NKJV</option>
              <option value="CSB">CSB</option>
              <option value="MSG">MSG</option>
              <option value="NRSV">NRSV</option>
            </select>
          </div>

          {/* Reading Time Goal */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <label className="block text-sm font-medium text-foreground mb-2">
              Reading Time Goal
            </label>
            <select
              value={settings.readingTimeGoal}
              onChange={(e) => handleSettingsChange({ readingTimeGoal: Number(e.target.value) as 5 | 10 | 15 })}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
            >
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
            </select>
          </div>

          {/* Sabbath Mode */}
          <div className="p-4 rounded-lg bg-card border border-border space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Sabbath Mode</div>
                <div className="text-xs text-foreground/60">Take a day of rest</div>
              </div>
              <button
                onClick={() => handleSettingsChange({ sabbathMode: !settings.sabbathMode })}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  settings.sabbathMode ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                    settings.sabbathMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {settings.sabbathMode && (
              <div>
                <label className="block text-xs text-foreground/60 mb-1">Sabbath Day</label>
                <select
                  value={settings.sabbathDay}
                  onChange={(e) => handleSettingsChange({ sabbathDay: Number(e.target.value) as AppSettings['sabbathDay'] })}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
                >
                  {dayNames.map((day, index) => (
                    <option key={index} value={index}>{day}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Auto Advance */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
            <div>
              <div className="font-medium text-foreground">Auto-Advance</div>
              <div className="text-xs text-foreground/60">Move to next devotion automatically</div>
            </div>
            <button
              onClick={() => handleSettingsChange({ autoAdvance: !settings.autoAdvance })}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                settings.autoAdvance ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  settings.autoAdvance ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Devotion Preferences */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Devotion Preferences</h2>
        </div>

        <div className="space-y-3">
          {/* Hide Completed */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
            <div>
              <div className="font-medium text-foreground">Hide Completed</div>
              <div className="text-xs text-foreground/60">Hide completed devotions from view</div>
            </div>
            <button
              onClick={() => handleSettingsChange({ hideCompleted: !settings.hideCompleted })}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                settings.hideCompleted ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  settings.hideCompleted ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Upcoming Count */}
          <div className="p-4 rounded-lg bg-card border border-border">
            <label className="block text-sm font-medium text-foreground mb-2">
              Show Upcoming Count
            </label>
            <select
              value={settings.upcomingCount}
              onChange={(e) => handleSettingsChange({ upcomingCount: Number(e.target.value) as 3 | 5 | 7 })}
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-primary"
            >
              <option value="3">3 devotions</option>
              <option value="5">5 devotions</option>
              <option value="7">7 devotions</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}

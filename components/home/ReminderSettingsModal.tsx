'use client';

import { X, Bell, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ReminderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReminderSettings {
  enabled: boolean;
  time: string; // HH:MM format
}

const STORAGE_KEY = 'bible-steps-reminder-settings';

export default function ReminderSettingsModal({ isOpen, onClose }: ReminderSettingsModalProps) {
  const [settings, setSettings] = useState<ReminderSettings>({
    enabled: false,
    time: '09:00',
  });

  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen]);

  const loadSettings = () => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings(parsed);
      }
    } catch (error) {
      console.error('Failed to load reminder settings:', error);
    }
  };

  const saveSettings = () => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      onClose();
    } catch (error) {
      console.error('Failed to save reminder settings:', error);
    }
  };

  const handleToggle = () => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, time: e.target.value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-background w-full sm:max-w-md sm:rounded-lg rounded-t-2xl">
        <div className="sticky top-0 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Daily Reminder</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted active:scale-95 transition-transform"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Info Message */}
          <div className="flex gap-3 p-4 rounded-lg bg-primary/10">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80 leading-relaxed">
              Set a daily reminder to help build your devotional habit. Note: Browser notifications require permission.
            </p>
          </div>

          {/* Enable Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">Enable Reminder</div>
                <div className="text-xs text-foreground/60">Daily notification</div>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                settings.enabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                  settings.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Time Picker */}
          {settings.enabled && (
            <div className="space-y-2">
              <label htmlFor="reminder-time" className="block text-sm font-medium text-foreground">
                Reminder Time
              </label>
              <input
                type="time"
                id="reminder-time"
                value={settings.time}
                onChange={handleTimeChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-primary text-lg"
              />
              <p className="text-xs text-foreground/60">
                You'll receive a reminder at {settings.time} each day
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-md border border-border text-foreground font-medium active:scale-95 transition-transform"
            >
              Cancel
            </button>
            <button
              onClick={saveSettings}
              className="flex-1 px-4 py-3 rounded-md bg-primary text-primary-foreground font-medium active:scale-95 transition-transform"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

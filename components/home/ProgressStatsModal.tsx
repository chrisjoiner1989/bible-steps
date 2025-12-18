'use client';

import { X, TrendingUp, Calendar, CheckCircle2, Flame, Target } from 'lucide-react';
import { getUserProgress, getCompletedDevotions } from '@/lib/storage';
import { useEffect, useState } from 'react';

interface ProgressStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgressStatsModal({ isOpen, onClose }: ProgressStatsModalProps) {
  const [stats, setStats] = useState({
    totalCompleted: 0,
    currentMonthCompleted: 0,
    currentMonthTotal: 0,
    completionPercentage: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageStreak: 0,
  });

  useEffect(() => {
    if (isOpen) {
      calculateStats();
    }
  }, [isOpen]);

  const calculateStats = () => {
    const progress = getUserProgress();
    const completed = getCompletedDevotions();

    // Current month stats
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const currentMonthCompleted = completed.filter(d => {
      const completedDate = new Date(d.date);
      return completedDate.getMonth() === currentMonth &&
             completedDate.getFullYear() === currentYear;
    }).length;

    const completionPercentage = progress.totalDevotionsCompleted > 0
      ? Math.round((currentMonthCompleted / daysInMonth) * 100)
      : 0;

    // Calculate average streak (simplified)
    const averageStreak = progress.longestStreak > 0
      ? Math.round((progress.currentStreak + progress.longestStreak) / 2)
      : 0;

    setStats({
      totalCompleted: progress.totalDevotionsCompleted,
      currentMonthCompleted,
      currentMonthTotal: daysInMonth,
      completionPercentage,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
      averageStreak,
    });
  };

  if (!isOpen) return null;

  const statCards = [
    {
      icon: CheckCircle2,
      label: 'Total Completed',
      value: stats.totalCompleted,
      suffix: 'devotions',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: Calendar,
      label: 'This Month',
      value: `${stats.currentMonthCompleted}/${stats.currentMonthTotal}`,
      suffix: 'days',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: stats.completionPercentage,
      suffix: '%',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: stats.currentStreak,
      suffix: 'days',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Target,
      label: 'Longest Streak',
      value: stats.longestStreak,
      suffix: 'days',
      color: 'text-foreground',
      bgColor: 'bg-muted',
    },
    {
      icon: TrendingUp,
      label: 'Average Streak',
      value: stats.averageStreak,
      suffix: 'days',
      color: 'text-foreground/70',
      bgColor: 'bg-muted',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-background w-full sm:max-w-lg sm:rounded-lg max-h-[85vh] overflow-y-auto rounded-t-2xl">
        <div className="sticky top-0 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Progress Stats</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted active:scale-95 transition-transform"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-card border border-border"
                >
                  <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-foreground/60">
                    {stat.label}
                  </div>
                  {stat.suffix && (
                    <div className="text-xs text-foreground/40 mt-0.5">
                      {stat.suffix}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Encouragement Message */}
          <div className="p-4 rounded-lg bg-grace/20">
            <p className="text-sm text-foreground leading-relaxed">
              {stats.currentStreak >= 7
                ? "Amazing! You're building a consistent habit. Keep it up!"
                : stats.totalCompleted >= 10
                ? "Great progress! Consistency is key to spiritual growth."
                : stats.totalCompleted > 0
                ? "You've started your journey. Every step counts!"
                : "Begin your devotional journey today!"}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-3 rounded-md bg-primary text-primary-foreground font-medium active:scale-95 transition-transform"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

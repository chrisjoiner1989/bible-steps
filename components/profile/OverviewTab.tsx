'use client';

import { TrendingUp, Calendar, CheckCircle2, Flame, Target, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getUserProgress, getCompletedDevotions } from '@/lib/storage';
import type { UserProfile } from '@/types';
import ProfileHeader from './ProfileHeader';

interface OverviewTabProps {
  profile: UserProfile;
  onEditProfile: () => void;
  onShowFullStats: () => void;
}

export default function OverviewTab({
  profile,
  onEditProfile,
  onShowFullStats,
}: OverviewTabProps) {
  const [stats, setStats] = useState({
    totalCompleted: 0,
    currentMonthCompleted: 0,
    currentMonthTotal: 0,
    completionPercentage: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  useEffect(() => {
    calculateStats();
  }, []);

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

    setStats({
      totalCompleted: progress.totalDevotionsCompleted,
      currentMonthCompleted,
      currentMonthTotal: daysInMonth,
      completionPercentage,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
    });
  };

  const statCards = [
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
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
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
      color: 'text-foreground',
      bgColor: 'bg-muted',
    },
  ];

  return (
    <div className="pb-20">
      {/* Profile Header */}
      <ProfileHeader profile={profile} onEdit={onEditProfile} />

      {/* Stats Dashboard */}
      <div className="p-4 space-y-6">
        {/* Hero Stat - Current Streak */}
        <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground/70">Current Streak</span>
            <Flame className="w-6 h-6 text-primary" />
          </div>
          <div className="text-4xl font-bold text-primary mb-1">
            {stats.currentStreak}
          </div>
          <div className="text-sm text-foreground/60">
            {stats.currentStreak === 1 ? 'day' : 'days'} in a row
          </div>
        </div>

        {/* Stats Grid */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3">Progress Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            {statCards.slice(1).map((stat, index) => {
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
        </div>

        {/* Monthly Progress Bar */}
        <div className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Monthly Progress</span>
            <span className="text-sm font-bold text-primary">{stats.completionPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${stats.completionPercentage}%` }}
            />
          </div>
          <div className="text-xs text-foreground/60 mt-1">
            {stats.currentMonthCompleted} of {stats.currentMonthTotal} days this month
          </div>
        </div>

        {/* View Full Stats Button */}
        <button
          onClick={onShowFullStats}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-primary text-primary-foreground font-medium active:scale-95 transition-transform"
        >
          <BarChart3 className="w-5 h-5" />
          View Full Stats
        </button>
      </div>
    </div>
  );
}

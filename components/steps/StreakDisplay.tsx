'use client';

import { memo } from 'react';
import { Flame, Heart, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  gracePeriodActive?: boolean;
  className?: string;
}

function StreakDisplay({
  currentStreak,
  longestStreak,
  gracePeriodActive = false,
  className,
}: StreakDisplayProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Current Streak - HERO TREATMENT */}
      <div className="relative overflow-hidden rounded-md bg-gradient-to-br from-primary/10 to-accent/15 border-2 border-primary/20 p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
              Current Streak
            </p>
            <p className="text-7xl font-black text-primary tracking-tighter leading-none mb-2">
              {currentStreak}
            </p>
            <p className="text-xl font-medium text-primary/80">
              {currentStreak === 1 ? 'day' : 'days'}
            </p>
          </div>
          <div className="relative">
            <Flame
              className={cn(
                'w-14 h-14 transition-all duration-300',
                currentStreak > 0
                  ? 'text-primary drop-shadow-lg'
                  : 'text-foreground/30'
              )}
            />
            {gracePeriodActive && (
              <Heart className="absolute -top-1 -right-1 w-6 h-6 text-grace fill-grace animate-pulse drop-shadow-md" />
            )}
          </div>
        </div>

        {/* Grace Period Indicator */}
        {gracePeriodActive && (
          <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-md bg-grace/30 border border-grace/40">
            <Heart className="w-5 h-5 fill-grace" />
            <span className="font-semibold text-sm text-foreground">Grace period active - you&apos;ve got this</span>
          </div>
        )}

        {/* Encouragement message */}
        {currentStreak === 0 && !gracePeriodActive && (
          <p className="mt-4 text-sm font-medium text-foreground/80 px-3 py-2 rounded-md bg-background/50">
            Start your journey today - every step counts
          </p>
        )}
        {currentStreak > 0 && currentStreak < 7 && (
          <p className="mt-4 text-sm font-medium text-foreground/80 px-3 py-2 rounded-md bg-background/50">
            Building consistency - keep going!
          </p>
        )}
        {currentStreak >= 7 && currentStreak < 30 && (
          <p className="mt-4 text-sm font-medium text-foreground/80 px-3 py-2 rounded-md bg-background/50">
            Great momentum - you&apos;re forming a habit
          </p>
        )}
        {currentStreak >= 30 && (
          <p className="mt-4 text-sm font-medium text-foreground/80 px-3 py-2 rounded-md bg-background/50">
            Incredible dedication - this is transformative
          </p>
        )}
      </div>

      {/* Longest Streak - Secondary Display */}
      <div className="flex items-center justify-between px-6 py-5 rounded-md bg-card-bg border-2 border-muted">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-md bg-accent/10">
            <Trophy className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wide mb-1">
              Best Streak
            </p>
            <p className="text-3xl font-bold text-foreground tracking-tight">
              {longestStreak} <span className="text-lg font-medium text-foreground/70">days</span>
            </p>
          </div>
        </div>
        {currentStreak === longestStreak && currentStreak > 0 && (
          <div className="px-3 py-1.5 rounded-md bg-success/20 border border-success/30">
            <span className="text-success text-xs font-bold uppercase tracking-wide">Best!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(StreakDisplay);

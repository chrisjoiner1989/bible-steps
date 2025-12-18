'use client';

import { useState, useCallback, useEffect } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import StreakDisplay from '@/components/steps/StreakDisplay';
import DevotionCard from '@/components/devotions/DevotionCard';
import { sampleDevotions } from '@/lib/data/sample-devotions';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import {
  getUserProgress,
  hasCompletedTodaysDevotion,
  markDevotionComplete,
  checkStreakStatus,
  getTodayDateString,
} from '@/lib/storage';

export default function HomePage() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [gracePeriodActive, setGracePeriodActive] = useState(false);
  const [completedToday, setCompletedToday] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user progress from local storage
  useEffect(() => {
    // Check streak status on mount
    checkStreakStatus();

    // Load progress
    const progress = getUserProgress();
    setCurrentStreak(progress.currentStreak);
    setLongestStreak(progress.longestStreak);
    setGracePeriodActive(progress.gracePeriodActive);

    // Check if completed today
    const completedToday = hasCompletedTodaysDevotion();
    setCompletedToday(completedToday);

    setIsLoading(false);
  }, []);

  // Get today's devotion based on date
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const devotionIndex = dayOfYear % sampleDevotions.length;
  const todaysDevotion = sampleDevotions[devotionIndex];
  const upcomingDevotions = [
    sampleDevotions[(devotionIndex + 1) % sampleDevotions.length],
    sampleDevotions[(devotionIndex + 2) % sampleDevotions.length],
    sampleDevotions[(devotionIndex + 3) % sampleDevotions.length],
  ];

  const handleStartDevotion = useCallback(() => {
    if (completedToday) {
      console.log('Already completed today');
      return;
    }

    // Mark as completed
    markDevotionComplete(todaysDevotion.id);

    // Update local state
    const newProgress = getUserProgress();
    setCurrentStreak(newProgress.currentStreak);
    setLongestStreak(newProgress.longestStreak);
    setGracePeriodActive(newProgress.gracePeriodActive);
    setCompletedToday(true);
  }, [completedToday, todaysDevotion.id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader title="Bible Steps" />
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-foreground/60">Loading your progress...</p>
        </div>
      </div>
    );
  }

  // Check if we have devotions available
  if (!todaysDevotion) {
    return (
      <div className="min-h-screen bg-background">
        <MobileHeader title="Bible Steps" />
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            No devotion available
          </h2>
          <p className="text-foreground/60">
            Please check back later for today&apos;s step
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader
        title="Bible Steps"
        rightAction={
          <button
            aria-label="Open calendar"
            className="p-2 -mr-2 rounded-full active:scale-95 transition-transform"
          >
            <Calendar className="w-5 h-5" />
          </button>
        }
      />

      <ErrorBoundary>
        <main className="px-4 pt-8 pb-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
            Welcome back
          </h2>
          <p className="text-base text-foreground/60 leading-snug">
            {completedToday
              ? "You&apos;ve completed today&apos;s step"
              : "Ready for today&apos;s 5-minute step?"}
          </p>
        </div>

        {/* Streak Display - Hero treatment */}
        <div className="mb-16">
          <StreakDisplay
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            gracePeriodActive={gracePeriodActive}
          />
        </div>

        {/* Today's Devotion - Primary CTA */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground tracking-tight">
              Today's Step
            </h3>
          </div>
          <DevotionCard
            devotion={todaysDevotion}
            isCompleted={completedToday}
            onStart={handleStartDevotion}
          />
        </section>

        {/* Upcoming Steps - HORIZONTAL SCROLLING */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 tracking-tight">
            Coming Up
          </h3>
          <div
            role="region"
            aria-label="Upcoming devotions"
            tabIndex={0}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide focus:outline-primary"
          >
            {upcomingDevotions.map((devotion) => (
              <div
                key={devotion.id}
                className="flex-none w-[280px] snap-start p-4 rounded-md bg-muted"
              >
                <p className="text-xs font-normal text-foreground/60 uppercase tracking-wide mb-2">
                  {devotion.category.replace('-', ' & ')}
                </p>
                <h4 className="font-bold text-foreground text-lg mb-2 tracking-tight">
                  {devotion.title}
                </h4>
                <p className="text-sm text-foreground/70">
                  {devotion.scripture.book} {devotion.scripture.chapter}:
                  {devotion.scripture.verseStart}
                  {devotion.scripture.verseEnd && `-${devotion.scripture.verseEnd}`}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Grace-based encouragement */}
        <div className="p-6 rounded-md bg-grace/20">
          <p className="text-base text-foreground leading-relaxed">
            <span className="font-bold text-foreground">Remember:</span> Missing a day
            doesn&apos;t mean failure. Life happens. Your worth isn&apos;t measured by
            streaks—progress, not perfection.
          </p>
        </div>
      </main>
      </ErrorBoundary>

      <Footer />
    </div>
  );
}

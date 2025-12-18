'use client';

import { useState, useCallback, useEffect } from 'react';
import { Calendar, Sparkles, Plus, Quote } from 'lucide-react';
import MobileHeader from '@/components/layout/MobileHeader';
import Footer from '@/components/layout/Footer';
import StreakDisplay from '@/components/steps/StreakDisplay';
import DevotionCard from '@/components/devotions/DevotionCard';
import AddDevotionForm from '@/components/devotions/AddDevotionForm';
import WeeklyCalendar from '@/components/home/WeeklyCalendar';
import QuickActions from '@/components/home/QuickActions';
import ProgressStatsModal from '@/components/home/ProgressStatsModal';
import ReminderSettingsModal from '@/components/home/ReminderSettingsModal';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { getVerseOfTheDay } from '@/lib/data/motivational-verses';
import {
  getUserProgress,
  hasCompletedTodaysDevotion,
  markDevotionComplete,
  checkStreakStatus,
  getUserDevotions,
  getTodaysDevotion,
  getUpcomingDevotions,
  getCompletedDevotions,
} from '@/lib/storage';

function HomePageContent() {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [gracePeriodActive, setGracePeriodActive] = useState(false);
  const [completedToday, setCompletedToday] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [todaysDevotion, setTodaysDevotion] = useState<any>(null);
  const [upcomingDevotions, setUpcomingDevotions] = useState<any[]>([]);
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);

  // Load user progress and devotions from local storage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
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

    // Load today's and upcoming devotions based on scheduled dates
    const todayDevotion = getTodaysDevotion();
    const upcoming = getUpcomingDevotions(3);

    setTodaysDevotion(todayDevotion);
    setUpcomingDevotions(upcoming);

    // Load completed dates for weekly calendar
    const completed = getCompletedDevotions();
    const dates = completed.map(d => d.date);
    setCompletedDates(dates);

    setIsLoading(false);
  };

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
  }, [completedToday, todaysDevotion?.id]);

  const handleDevotionAdded = useCallback(() => {
    // Reload all data
    loadData();
  }, []);

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

        <main className="px-4 pt-8 pb-20">
          {/* Motivational Verse - Show even in empty state */}
          <div className="mb-8">
            <div className="p-4 rounded-lg bg-muted border-l-4 border-primary">
              <div className="flex items-start gap-3">
                <Quote className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-foreground italic leading-relaxed mb-2">
                    &quot;{getVerseOfTheDay().text}&quot;
                  </p>
                  <p className="text-sm font-medium text-primary">
                    — {getVerseOfTheDay().reference}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <div className="mb-4">
              <Sparkles className="w-16 h-16 text-primary/40 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              No devotions yet
            </h2>
            <p className="text-foreground/60 max-w-sm mb-6">
              Your daily devotions will appear here. Add your first devotion to get started on your spiritual journey.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium active:scale-95 transition-transform flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Your First Devotion
            </button>
          </div>
        </main>

        <Footer />

        {/* Add Devotion Form Modal */}
        {showAddForm && (
          <AddDevotionForm
            onClose={() => setShowAddForm(false)}
            onSuccess={handleDevotionAdded}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader
        title="Bible Steps"
        rightAction={
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowAddForm(true)}
              aria-label="Add devotion"
              className="p-2 rounded-full active:scale-95 transition-transform"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              aria-label="Open calendar"
              className="p-2 -mr-2 rounded-full active:scale-95 transition-transform"
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
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

        {/* Motivational Verse of the Day */}
        <div className="mb-8">
          <div className="p-4 rounded-lg bg-muted border-l-4 border-primary">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-foreground italic leading-relaxed mb-2">
                  &quot;{getVerseOfTheDay().text}&quot;
                </p>
                <p className="text-sm font-medium text-primary">
                  — {getVerseOfTheDay().reference}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Streak Display - Hero treatment */}
        <div className="mb-12">
          <StreakDisplay
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            gracePeriodActive={gracePeriodActive}
          />
        </div>

        {/* Weekly Calendar */}
        <WeeklyCalendar completedDates={completedDates} />

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

        {/* Quick Actions */}
        <QuickActions
          onAddDevotion={() => setShowAddForm(true)}
          onShowStats={() => setShowStatsModal(true)}
          onShowReminder={() => setShowReminderModal(true)}
        />

        {/* Upcoming Steps - HORIZONTAL SCROLLING */}
        {upcomingDevotions.length > 0 && (
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
        )}

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

      {/* Add Devotion Form Modal */}
      {showAddForm && (
        <AddDevotionForm
          onClose={() => setShowAddForm(false)}
          onSuccess={handleDevotionAdded}
        />
      )}

      {/* Progress Stats Modal */}
      {showStatsModal && (
        <ProgressStatsModal
          isOpen={showStatsModal}
          onClose={() => setShowStatsModal(false)}
        />
      )}

      {/* Reminder Settings Modal */}
      {showReminderModal && (
        <ReminderSettingsModal
          isOpen={showReminderModal}
          onClose={() => setShowReminderModal(false)}
        />
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <ProtectedRoute>
      <HomePageContent />
    </ProtectedRoute>
  );
}

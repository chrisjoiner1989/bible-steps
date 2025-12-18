'use client';

import { Check, X } from 'lucide-react';

interface WeeklyCalendarProps {
  completedDates: string[]; // Array of YYYY-MM-DD strings
}

export default function WeeklyCalendar({ completedDates }: WeeklyCalendarProps) {
  const getDaysOfWeek = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Calculate Monday of current week
    const monday = new Date(today);
    const diff = currentDay === 0 ? -6 : 1 - currentDay; // If Sunday, go back 6 days
    monday.setDate(today.getDate() + diff);
    monday.setHours(0, 0, 0, 0);

    // Generate array of 7 days starting from Monday
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      week.push(day);
    }

    return week;
  };

  const formatDateString = (date: Date): string => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const isCompleted = (date: Date): boolean => {
    const dateStr = formatDateString(date);
    return completedDates.includes(dateStr);
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isFuture = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const weekDays = getDaysOfWeek();

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-foreground/60 mb-3">This Week</h3>
      <div className="flex justify-between gap-2">
        {weekDays.map((day, index) => {
          const completed = isCompleted(day);
          const today = isToday(day);
          const future = isFuture(day);

          return (
            <div
              key={index}
              className={`flex-1 flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                today
                  ? 'bg-primary/10 border-2 border-primary'
                  : completed
                  ? 'bg-success/10 border border-success/30'
                  : future
                  ? 'bg-muted border border-border'
                  : 'bg-muted border border-border opacity-70'
              }`}
            >
              {/* Day letter */}
              <span className={`text-xs font-medium ${
                today
                  ? 'text-primary'
                  : completed
                  ? 'text-success'
                  : 'text-foreground/60'
              }`}>
                {dayLetters[index]}
              </span>

              {/* Date number */}
              <span className={`text-sm font-bold ${
                today
                  ? 'text-primary'
                  : completed
                  ? 'text-foreground'
                  : 'text-foreground/60'
              }`}>
                {day.getDate()}
              </span>

              {/* Completion indicator */}
              <div className="w-5 h-5 flex items-center justify-center">
                {completed && !future && (
                  <Check className="w-4 h-4 text-success" strokeWidth={3} />
                )}
                {!completed && !future && !today && (
                  <X className="w-3 h-3 text-foreground/30" strokeWidth={2} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

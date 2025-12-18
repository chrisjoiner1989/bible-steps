'use client';

import { Plus, BookOpen, TrendingUp, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuickActionsProps {
  onAddDevotion: () => void;
  onShowStats: () => void;
  onShowReminder: () => void;
}

export default function QuickActions({
  onAddDevotion,
  onShowStats,
  onShowReminder,
}: QuickActionsProps) {
  const router = useRouter();

  const actions = [
    {
      icon: Plus,
      label: 'Add Devotion',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      onClick: onAddDevotion,
    },
    {
      icon: BookOpen,
      label: 'View All',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      onClick: () => router.push('/devotions'),
    },
    {
      icon: TrendingUp,
      label: 'Progress',
      color: 'text-success',
      bgColor: 'bg-success/10',
      onClick: onShowStats,
    },
    {
      icon: Bell,
      label: 'Reminder',
      color: 'text-foreground/70',
      bgColor: 'bg-muted',
      onClick: onShowReminder,
    },
  ];

  return (
    <section className="mb-12">
      <h3 className="text-2xl font-bold text-foreground mb-6 tracking-tight">
        Quick Actions
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="flex-none w-[140px] flex flex-col items-center gap-3 p-4 rounded-lg bg-card border border-border hover:shadow-md active:scale-95 transition-all"
            >
              <div className={`w-12 h-12 rounded-full ${action.bgColor} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${action.color}`} />
              </div>
              <span className="text-sm font-medium text-foreground">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

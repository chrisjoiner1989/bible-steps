'use client';

import { User, Settings, Database, Info } from 'lucide-react';

export type ProfileTab = 'overview' | 'settings' | 'data' | 'about';

interface TabNavigationProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    {
      id: 'overview' as ProfileTab,
      label: 'Overview',
      icon: User,
    },
    {
      id: 'settings' as ProfileTab,
      label: 'Settings',
      icon: Settings,
    },
    {
      id: 'data' as ProfileTab,
      label: 'Data',
      icon: Database,
    },
    {
      id: 'about' as ProfileTab,
      label: 'About',
      icon: Info,
    },
  ];

  return (
    <div className="sticky top-0 bg-background border-b border-border z-10">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 min-w-[80px] flex flex-col items-center gap-1.5 px-4 py-3 transition-colors relative ${
                isActive
                  ? 'text-primary'
                  : 'text-foreground/60 hover:text-foreground/80'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

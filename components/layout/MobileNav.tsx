'use client';

import { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Users, Moon, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/devotions', icon: BookOpen, label: 'Devotions' },
  { href: '/community', icon: Users, label: 'Community' },
  { href: '/sabbath', icon: Moon, label: 'Sabbath' },
  { href: '/profile', icon: User, label: 'Profile' },
];

function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl shadow-float">
      {/* Safe area padding for devices with home indicator */}
      <div className="pb-safe">
        <div className="flex items-center justify-around px-4 py-4">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-label={`Navigate to ${label}`}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-1.5 px-4 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-foreground/50 hover:text-foreground/70'
                )}
              >
                <Icon
                  className={cn(
                    'w-6 h-6',
                    isActive && 'scale-105'
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={cn(
                  'text-xs tracking-tight',
                  isActive && 'font-bold'
                )}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default memo(MobileNav);

'use client';

import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  rightAction?: ReactNode;
  className?: string;
}

export default function MobileHeader({
  title,
  showBack = false,
  rightAction,
  className,
}: MobileHeaderProps) {
  const router = useRouter();

  return (
    <header className={cn(
      'sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl shadow-float',
      className
    )}>
      {/* Safe area padding for notched devices */}
      <div className="pt-safe">
        <div className="flex items-center justify-between px-4 py-4 min-h-[60px]">
          {/* Left side - Back button or empty space */}
          <div className="w-10">
            {showBack && (
              <button
                onClick={() => router.back()}
                className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Center - Title */}
          {title && (
            <h1 className="text-xl font-bold text-center flex-1 mx-4 truncate tracking-tight">
              {title}
            </h1>
          )}

          {/* Right side - Action button or empty space */}
          <div className="w-10 flex justify-end">
            {rightAction}
          </div>
        </div>
      </div>
    </header>
  );
}

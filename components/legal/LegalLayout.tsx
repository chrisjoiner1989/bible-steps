'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-muted">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Go back to home"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Bible Steps</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <article className="prose prose-lg max-w-none">
          {/* Title */}
          <h1 className="text-4xl font-black text-foreground tracking-tight mb-2">
            {title}
          </h1>

          {/* Last Updated */}
          <p className="text-sm text-foreground/60 mb-8">
            Last updated: {lastUpdated}
          </p>

          {/* Legal Content */}
          <div className="space-y-6 text-foreground/80">
            {children}
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-muted mt-16 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-foreground/60">
            <p>&copy; {new Date().getFullYear()} Bible Steps. All rights reserved.</p>
            <nav className="flex gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="hover:text-foreground transition-colors">
                Support
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

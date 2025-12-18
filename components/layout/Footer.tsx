import Link from 'next/link';
import { memo } from 'react';

function Footer() {
  return (
    <footer className="border-t border-muted mt-16 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Bible Steps. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/support"
              className="hover:text-foreground transition-colors"
            >
              Support
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);

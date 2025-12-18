'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Something went wrong
          </h2>
          <p className="text-foreground/60 mb-4">
            We&apos;re having trouble loading this content
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-6 py-3 rounded-lg bg-primary text-white font-bold"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

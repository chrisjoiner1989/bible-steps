'use client';

import { Heart, HelpCircle, Mail, Bug, FileText, Shield, Scale, ExternalLink } from 'lucide-react';

export default function AboutTab() {
  const appVersion = '0.1.0'; // From package.json

  const getStorageSize = () => {
    if (typeof window === 'undefined') return '0 KB';

    let total = 0;
    for (const key in localStorage) {
      if (key.startsWith('bible-steps-')) {
        total += localStorage[key].length;
      }
    }
    return `${(total / 1024).toFixed(2)} KB`;
  };

  return (
    <div className="pb-20 px-4 pt-6 space-y-6">
      {/* App Information */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">App Information</h2>
        <div className="p-4 rounded-lg bg-card border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/60">Version</span>
            <span className="text-sm font-medium text-foreground">{appVersion}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground/60">Storage Used</span>
            <span className="text-sm font-medium text-foreground">{getStorageSize()}</span>
          </div>
        </div>
      </section>

      {/* About Bible Steps */}
      <section className="p-4 rounded-lg bg-grace/20">
        <div className="flex items-start gap-3">
          <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground mb-2">About Bible Steps</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Bible Steps helps you build a consistent devotional habit with daily scripture readings,
              reflections, and actionable steps. Track your progress, maintain streaks, and grow in
              your faith journey.
            </p>
          </div>
        </div>
      </section>

      {/* Support & Resources */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Support & Resources</h2>
        <div className="space-y-2">
          <a
            href="#"
            className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:bg-muted active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-foreground">Help & FAQ</div>
                <div className="text-xs text-foreground/60">Common questions and answers</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-foreground/40" />
          </a>

          <a
            href="mailto:support@biblesteps.com"
            className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:bg-muted active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-foreground">Contact Support</div>
                <div className="text-xs text-foreground/60">Get help from our team</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-foreground/40" />
          </a>

          <a
            href="#"
            className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:bg-muted active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <Bug className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-foreground">Report a Bug</div>
                <div className="text-xs text-foreground/60">Help us improve the app</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-foreground/40" />
          </a>
        </div>
      </section>

      {/* Legal */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Legal</h2>
        <div className="space-y-2">
          <a
            href="#"
            className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:bg-muted active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-foreground/60" />
              <span className="text-sm font-medium text-foreground">Privacy Policy</span>
            </div>
            <ExternalLink className="w-4 h-4 text-foreground/40" />
          </a>

          <a
            href="#"
            className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:bg-muted active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-foreground/60" />
              <span className="text-sm font-medium text-foreground">Terms of Service</span>
            </div>
            <ExternalLink className="w-4 h-4 text-foreground/40" />
          </a>

          <a
            href="#"
            className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:bg-muted active:scale-98 transition-all"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-foreground/60" />
              <span className="text-sm font-medium text-foreground">Licenses</span>
            </div>
            <ExternalLink className="w-4 h-4 text-foreground/40" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center text-xs text-foreground/40 pt-4">
        Made with <Heart className="w-3 h-3 inline text-primary" /> for daily devotions
      </div>
    </div>
  );
}

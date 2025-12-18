import LegalLayout from '@/components/legal/LegalLayout';
import { Metadata } from 'next';
import { Mail, MessageCircle, Book, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support - Bible Steps',
  description: 'Get help with Bible Steps. Contact us with questions, feedback, or technical issues.',
};

export default function SupportPage() {
  return (
    <LegalLayout title="Support & Contact" lastUpdated="December 17, 2025">
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How Can We Help?</h2>
        <p>
          We&apos;re here to support you on your spiritual journey. Whether you have questions,
          feedback, or need technical assistance, we&apos;d love to hear from you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="p-6 rounded-lg border-2 border-muted bg-card-bg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-md bg-primary/10">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Email Support</h3>
            </div>
            <p className="text-foreground/80 mb-4">
              Send us an email and we&apos;ll get back to you within 24-48 hours.
            </p>
            <a
              href="mailto:support@biblesteps.com"
              className="text-primary font-semibold hover:underline inline-block"
            >
              support@biblesteps.com
            </a>
          </div>

          <div className="p-6 rounded-lg border-2 border-muted bg-card-bg">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-md bg-accent/10">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Feedback</h3>
            </div>
            <p className="text-foreground/80 mb-4">
              We value your input. Share your ideas, suggestions, or concerns.
            </p>
            <a
              href="mailto:feedback@biblesteps.com"
              className="text-primary font-semibold hover:underline inline-block"
            >
              feedback@biblesteps.com
            </a>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div className="p-6 rounded-lg border-2 border-muted bg-background">
            <div className="flex items-start gap-3 mb-2">
              <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                How do streaks work in Bible Steps?
              </h3>
            </div>
            <p className="text-foreground/80 ml-8">
              Your streak increases by 1 each day you complete a devotion. If you miss a day, you
              enter a 24-hour grace period where your streak is protected. Complete a devotion
              during the grace period to keep your streak alive. Miss the grace period, and your
              streak resets to 0.
            </p>
          </div>

          <div className="p-6 rounded-lg border-2 border-muted bg-background">
            <div className="flex items-start gap-3 mb-2">
              <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                Can I use Bible Steps offline?
              </h3>
            </div>
            <p className="text-foreground/80 ml-8">
              Yes! Once you&apos;ve loaded the app, previously viewed devotions are cached and
              available offline. New content requires an internet connection to download.
            </p>
          </div>

          <div className="p-6 rounded-lg border-2 border-muted bg-background">
            <div className="flex items-start gap-3 mb-2">
              <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                How do I enable push notifications?
              </h3>
            </div>
            <p className="text-foreground/80 ml-8">
              Navigate to Settings and enable &quot;Daily Reminders.&quot; You&apos;ll be prompted
              to allow notifications from your browser or device. You can customize the time of day
              you&apos;d like to receive reminders.
            </p>
          </div>

          <div className="p-6 rounded-lg border-2 border-muted bg-background">
            <div className="flex items-start gap-3 mb-2">
              <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                Is Bible Steps free to use?
              </h3>
            </div>
            <p className="text-foreground/80 ml-8">
              Yes, Bible Steps is completely free with no ads or in-app purchases. Our mission is
              to make daily devotions accessible to everyone.
            </p>
          </div>

          <div className="p-6 rounded-lg border-2 border-muted bg-background">
            <div className="flex items-start gap-3 mb-2">
              <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                How do I install Bible Steps on my phone?
              </h3>
            </div>
            <p className="text-foreground/80 ml-8">
              <strong>iPhone/iPad:</strong> Open biblesteps.com in Safari, tap the Share button,
              then &quot;Add to Home Screen.&quot;
              <br />
              <strong>Android:</strong> Open biblesteps.com in Chrome, tap the menu (3 dots), then
              &quot;Add to Home screen&quot; or look for the install prompt.
            </p>
          </div>

          <div className="p-6 rounded-lg border-2 border-muted bg-background">
            <div className="flex items-start gap-3 mb-2">
              <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                Can I delete my account and data?
              </h3>
            </div>
            <p className="text-foreground/80 ml-8">
              Yes. Contact us at{' '}
              <a
                href="mailto:privacy@biblesteps.com"
                className="text-primary font-semibold hover:underline"
              >
                privacy@biblesteps.com
              </a>{' '}
              to request account deletion. We&apos;ll permanently delete your data within 30 days.
              You can also clear local data by clearing your browser storage.
            </p>
          </div>

          <div className="p-6 rounded-lg border-2 border-muted bg-background">
            <div className="flex items-start gap-3 mb-2">
              <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                What Bible translation do you use?
              </h3>
            </div>
            <p className="text-foreground/80 ml-8">
              Our devotions use contemporary language accessible to young adults. We draw from
              multiple translations including NIV, ESV, and NLT. Specific translations are cited
              in each devotion.
            </p>
          </div>

          <div className="p-6 rounded-lg border-2 border-muted bg-background">
            <div className="flex items-start gap-3 mb-2">
              <HelpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <h3 className="text-lg font-bold text-foreground">
                I found a bug. How do I report it?
              </h3>
            </div>
            <p className="text-foreground/80 ml-8">
              Email us at{' '}
              <a
                href="mailto:support@biblesteps.com"
                className="text-primary font-semibold hover:underline"
              >
                support@biblesteps.com
              </a>{' '}
              with a description of the issue, what device/browser you&apos;re using, and steps to
              reproduce the problem. Screenshots are helpful too!
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Technical Support</h2>
        <p className="mb-4">
          If you&apos;re experiencing technical issues, here are some quick troubleshooting steps:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>App not loading:</strong> Check your internet connection and try refreshing the
            page. Clear your browser cache if issues persist.
          </li>
          <li>
            <strong>Streak not updating:</strong> Ensure you&apos;ve completed the full devotion
            (read and mark as complete). Check your timezone settings.
          </li>
          <li>
            <strong>Notifications not working:</strong> Verify notification permissions are enabled
            in your device settings and within the Bible Steps app settings.
          </li>
          <li>
            <strong>Can&apos;t install app:</strong> Ensure you&apos;re using a supported browser
            (Chrome, Safari, Edge, Firefox). Some older browsers may not support PWA installation.
          </li>
          <li>
            <strong>Lost progress:</strong> If you cleared browser data, local progress may be lost.
            Cloud sync (coming soon) will prevent this issue.
          </li>
        </ul>
        <p className="mt-4">
          Still having trouble? Contact{' '}
          <a
            href="mailto:support@biblesteps.com"
            className="text-primary font-semibold hover:underline"
          >
            support@biblesteps.com
          </a>{' '}
          and we&apos;ll help you out.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Resources</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="/privacy"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-muted bg-background hover:border-primary transition-colors"
          >
            <div className="p-2 rounded-md bg-primary/10">
              <Book className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-foreground">Privacy Policy</p>
              <p className="text-sm text-foreground/60">How we protect your data</p>
            </div>
          </a>

          <a
            href="/terms"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-muted bg-background hover:border-primary transition-colors"
          >
            <div className="p-2 rounded-md bg-accent/10">
              <Book className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-bold text-foreground">Terms of Service</p>
              <p className="text-sm text-foreground/60">Our terms and conditions</p>
            </div>
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Stay Connected</h2>
        <p>
          We&apos;re building a community of young Christians supporting each other in faith. Have
          ideas for new features? Want to see specific devotion topics? We&apos;d love to hear from you.
        </p>
        <p className="mt-4">
          <strong>General inquiries:</strong>{' '}
          <a
            href="mailto:hello@biblesteps.com"
            className="text-primary font-semibold hover:underline"
          >
            hello@biblesteps.com
          </a>
        </p>
      </section>
    </LegalLayout>
  );
}

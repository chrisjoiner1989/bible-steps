import LegalLayout from '@/components/legal/LegalLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Bible Steps',
  description: 'Learn how Bible Steps collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="December 17, 2025">
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
        <p>
          Welcome to Bible Steps. We are committed to protecting your privacy and ensuring you have a
          positive experience while using our app. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you use our mobile application and related
          services.
        </p>
        <p>
          Please read this Privacy Policy carefully. By using Bible Steps, you agree to the collection
          and use of information in accordance with this policy.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>

        <h3 className="text-xl font-semibold text-foreground mb-3">Information You Provide</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Account Information:</strong> When you create an account, we may collect your name,
            email address, and password.
          </li>
          <li>
            <strong>Profile Information:</strong> Optional information you choose to provide, such as
            profile picture and personal preferences.
          </li>
          <li>
            <strong>User Content:</strong> Notes, reflections, or comments you create within the app.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
          Information Collected Automatically
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Usage Data:</strong> Information about how you use the app, including devotions
            completed, streak data, and feature interactions.
          </li>
          <li>
            <strong>Device Information:</strong> Device type, operating system, browser type, IP address,
            and unique device identifiers.
          </li>
          <li>
            <strong>Analytics Data:</strong> We use analytics tools to understand app performance and
            user behavior patterns.
          </li>
          <li>
            <strong>Cookies and Local Storage:</strong> We use browser storage to remember your
            preferences and maintain your session.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide, maintain, and improve our services</li>
          <li>Track your progress, including streak data and devotion completion</li>
          <li>Send you push notifications about daily devotions (if you opt in)</li>
          <li>Personalize your experience and deliver relevant content</li>
          <li>Respond to your comments, questions, and support requests</li>
          <li>Monitor and analyze usage patterns and trends</li>
          <li>Detect, prevent, and address technical issues or fraudulent activity</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Data Storage and Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect your
          personal information against unauthorized access, alteration, disclosure, or destruction.
          These measures include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Encryption of data in transit using HTTPS/TLS</li>
          <li>Secure authentication and password hashing</li>
          <li>Regular security assessments and updates</li>
          <li>Limited access to personal information by authorized personnel only</li>
        </ul>
        <p className="mt-4">
          Your data is stored locally on your device and, if you choose to enable cloud sync, on
          secure servers. However, no method of transmission over the internet or electronic storage
          is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
        <p>We may use third-party services that collect, monitor, and analyze data to improve our service:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Firebase (Google):</strong> For push notifications, authentication, and cloud storage
          </li>
          <li>
            <strong>Analytics Services:</strong> To understand how users interact with our app
          </li>
          <li>
            <strong>Hosting Providers:</strong> For secure data storage and app delivery
          </li>
        </ul>
        <p className="mt-4">
          These third parties have access to your personal information only to perform specific tasks
          on our behalf and are obligated not to disclose or use it for any other purpose. Their use
          of your data is governed by their respective privacy policies.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Your Data Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Access:</strong> Request a copy of the personal information we hold about you
          </li>
          <li>
            <strong>Correction:</strong> Request correction of inaccurate or incomplete information
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal information (right to be forgotten)
          </li>
          <li>
            <strong>Data Portability:</strong> Request transfer of your data to another service
          </li>
          <li>
            <strong>Opt-Out:</strong> Unsubscribe from marketing communications or disable push notifications
          </li>
          <li>
            <strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable
          </li>
        </ul>
        <p className="mt-4">
          To exercise any of these rights, please contact us at{' '}
          <a href="mailto:privacy@biblesteps.com" className="text-primary font-semibold hover:underline">
            privacy@biblesteps.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Children&apos;s Privacy</h2>
        <p>
          Bible Steps is designed for users of all ages, including children under 13. We do not
          knowingly collect personally identifiable information from children under 13 without
          verifiable parental consent. If you are a parent or guardian and believe your child has
          provided us with personal information without your consent, please contact us immediately.
        </p>
        <p className="mt-4">
          For users under 13, we implement additional safeguards including limited data collection,
          no third-party advertising, and no public profile features.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">International Data Transfers</h2>
        <p>
          Your information may be transferred to and maintained on computers located outside of your
          state, province, country, or other governmental jurisdiction where data protection laws may
          differ. By using Bible Steps, you consent to such transfers.
        </p>
        <p className="mt-4">
          We comply with applicable data protection regulations, including GDPR for European users and
          CCPA for California residents.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Data Retention</h2>
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes
          outlined in this Privacy Policy, unless a longer retention period is required or permitted
          by law. When you delete your account, we will delete or anonymize your personal information
          within 30 days, except where retention is required for legal compliance.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Push Notifications</h2>
        <p>
          With your consent, we may send you push notifications about daily devotions, streak
          milestones, and important updates. You can disable push notifications at any time through
          your device settings or within the app.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          Significant changes will be communicated via email or in-app notification.
        </p>
        <p className="mt-4">
          You are advised to review this Privacy Policy periodically for any changes. Changes are
          effective when posted on this page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our data practices, please contact us:
        </p>
        <ul className="list-none space-y-2 mt-4">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:privacy@biblesteps.com" className="text-primary font-semibold hover:underline">
              privacy@biblesteps.com
            </a>
          </li>
          <li>
            <strong>Support Page:</strong>{' '}
            <a href="/support" className="text-primary font-semibold hover:underline">
              biblesteps.com/support
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Regional Specific Information</h2>

        <h3 className="text-xl font-semibold text-foreground mb-3">For European Users (GDPR)</h3>
        <p>
          If you are located in the European Economic Area (EEA), you have certain rights under the
          General Data Protection Regulation (GDPR), including the right to access, rectification,
          erasure, restriction of processing, data portability, and the right to object. Our legal
          basis for processing your data includes consent, contractual necessity, and legitimate interests.
        </p>

        <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">For California Users (CCPA)</h3>
        <p>
          If you are a California resident, the California Consumer Privacy Act (CCPA) provides you
          with rights regarding your personal information, including the right to know what information
          is collected, the right to delete, and the right to opt-out of the sale of personal information.
          We do not sell your personal information.
        </p>
      </section>
    </LegalLayout>
  );
}

import LegalLayout from '@/components/legal/LegalLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Bible Steps',
  description: 'Read the terms and conditions for using Bible Steps app and services.',
};

export default function TermsOfServicePage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="December 17, 2025">
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Agreement to Terms</h2>
        <p>
          Welcome to Bible Steps. By accessing or using our mobile application and services
          (collectively, the &quot;Service&quot;), you agree to be bound by these Terms of Service
          (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Service.
        </p>
        <p className="mt-4">
          These Terms constitute a legally binding agreement between you and Bible Steps
          (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We reserve the right to update these
          Terms at any time, and continued use of the Service constitutes acceptance of any changes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Eligibility</h2>
        <p>
          The Service is available to users of all ages. If you are under 13 years of age, you must
          have parental or guardian consent to use the Service. By using Bible Steps, you represent
          that you have the authority to agree to these Terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Account Registration</h2>
        <p>
          To access certain features of the Service, you may be required to create an account. You agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate, current, and complete information during registration</li>
          <li>Maintain and update your information to keep it accurate and current</li>
          <li>Maintain the security of your account credentials</li>
          <li>Accept responsibility for all activities that occur under your account</li>
          <li>Notify us immediately of any unauthorized access or security breach</li>
        </ul>
        <p className="mt-4">
          You are responsible for safeguarding your password. We recommend using a strong, unique
          password and not sharing it with others.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Acceptable Use</h2>
        <p>You agree to use the Service only for lawful purposes. You may not:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on the intellectual property rights of others</li>
          <li>Transmit harmful, offensive, or inappropriate content</li>
          <li>Harass, threaten, or harm other users</li>
          <li>Attempt to gain unauthorized access to the Service or other users&apos; accounts</li>
          <li>Use automated systems (bots, scrapers) without permission</li>
          <li>Interfere with or disrupt the Service or servers</li>
          <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
          <li>Use the Service for commercial purposes without authorization</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">User Content</h2>
        <p>
          The Service may allow you to create, submit, or share content such as notes, reflections,
          or comments (&quot;User Content&quot;). You retain ownership of your User Content, but by
          submitting it, you grant us a worldwide, non-exclusive, royalty-free license to use,
          reproduce, modify, and distribute your User Content as necessary to provide the Service.
        </p>
        <p className="mt-4">You represent and warrant that your User Content:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Does not violate any third-party rights (copyright, trademark, privacy, etc.)</li>
          <li>Does not contain harmful, defamatory, or illegal material</li>
          <li>Complies with all applicable laws and regulations</li>
        </ul>
        <p className="mt-4">
          We reserve the right to remove any User Content that violates these Terms or is otherwise
          objectionable, at our sole discretion.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
        <p>
          The Service, including all content, features, functionality, software, and design, is owned
          by Bible Steps and is protected by international copyright, trademark, and other intellectual
          property laws.
        </p>
        <p className="mt-4">
          You are granted a limited, non-exclusive, non-transferable license to access and use the
          Service for personal, non-commercial purposes. This license does not include the right to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Reproduce, distribute, or publicly display any part of the Service</li>
          <li>Modify, create derivative works, or reverse engineer the Service</li>
          <li>Use the Bible Steps name, logo, or trademarks without permission</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Links and Services</h2>
        <p>
          The Service may contain links to third-party websites or services that are not owned or
          controlled by Bible Steps. We have no control over and assume no responsibility for the
          content, privacy policies, or practices of any third-party sites or services.
        </p>
        <p className="mt-4">
          You acknowledge and agree that Bible Steps shall not be responsible or liable for any damage
          or loss caused by your use of any third-party content, goods, or services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimers</h2>
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES
          OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
        </p>
        <p className="mt-4">
          Bible Steps does not warrant that:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The Service will be uninterrupted, secure, or error-free</li>
          <li>Defects will be corrected</li>
          <li>The Service is free of viruses or harmful components</li>
          <li>Results obtained from using the Service will be accurate or reliable</li>
        </ul>
        <p className="mt-4">
          <strong>Religious Content Disclaimer:</strong> Bible Steps provides devotional content for
          spiritual encouragement and growth. This content is not a substitute for professional
          religious counsel, therapy, or medical advice. We encourage users to seek guidance from
          qualified religious leaders, counselors, or healthcare professionals as needed.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, BIBLE STEPS SHALL NOT BE LIABLE FOR ANY INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS
          OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
        </p>
        <p className="mt-4">
          IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12)
          MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY, OR ONE HUNDRED DOLLARS ($100),
          WHICHEVER IS LESS.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless Bible Steps and its officers, directors,
          employees, and agents from any claims, liabilities, damages, losses, and expenses (including
          reasonable attorneys&apos; fees) arising out of or related to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your use of the Service</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any rights of another party</li>
          <li>Your User Content</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the Service at any time, with
          or without cause, and with or without notice. You may also terminate your account at any
          time by contacting us or using the account deletion feature in the app.
        </p>
        <p className="mt-4">
          Upon termination, your right to use the Service will immediately cease. All provisions of
          these Terms that by their nature should survive termination shall survive, including
          ownership provisions, warranty disclaimers, and limitations of liability.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Subscription and Payments</h2>
        <p>
          Bible Steps is currently offered free of charge. If we introduce paid features or
          subscriptions in the future, we will provide clear pricing information and obtain your
          consent before charging you.
        </p>
        <p className="mt-4">Any future paid features will be subject to additional terms, including:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Billing terms and auto-renewal policies</li>
          <li>Refund and cancellation policies</li>
          <li>Payment method requirements</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Dispute Resolution</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the United
          States, without regard to conflict of law principles.
        </p>
        <p className="mt-4">
          Any disputes arising out of or relating to these Terms or the Service shall be resolved
          through binding arbitration in accordance with the rules of the American Arbitration
          Association, except that either party may seek injunctive relief in court for intellectual
          property violations.
        </p>
        <p className="mt-4">
          <strong>Class Action Waiver:</strong> You agree to resolve disputes individually and waive
          your right to participate in class action lawsuits or class-wide arbitration.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will provide notice of material
          changes by posting the updated Terms on this page and updating the &quot;Last Updated&quot;
          date. For significant changes, we may also notify you via email or in-app notification.
        </p>
        <p className="mt-4">
          Your continued use of the Service after changes become effective constitutes your acceptance
          of the revised Terms. If you do not agree to the new Terms, you must stop using the Service.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Severability</h2>
        <p>
          If any provision of these Terms is found to be invalid, illegal, or unenforceable, the
          remaining provisions shall continue in full force and effect. The invalid provision shall
          be replaced with a valid provision that most closely matches the intent of the original.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Entire Agreement</h2>
        <p>
          These Terms, together with our Privacy Policy and any other legal notices published on the
          Service, constitute the entire agreement between you and Bible Steps regarding the Service
          and supersede all prior agreements and understandings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
        <p>
          If you have questions about these Terms, please contact us:
        </p>
        <ul className="list-none space-y-2 mt-4">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:legal@biblesteps.com" className="text-primary font-semibold hover:underline">
              legal@biblesteps.com
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
        <h2 className="text-2xl font-bold text-foreground mb-4">Acknowledgment</h2>
        <p>
          BY USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE
          TO BE BOUND BY THEM.
        </p>
      </section>
    </LegalLayout>
  );
}

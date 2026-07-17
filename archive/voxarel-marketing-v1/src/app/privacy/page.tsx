import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Voxarel",
  description: "How Voxarel collects, uses, and protects your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200 py-6 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">V</span>
            </div>
            <span className="font-semibold text-zinc-900">Voxarel</span>
          </Link>
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
            Back to home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="heading-serif text-4xl mb-2">Privacy Policy</h1>
        <p className="text-sm text-zinc-500 mb-12">Last updated: March 2026</p>

        <div className="space-y-8 text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              When you use our website or submit a contact form, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name and email address (when you contact us)</li>
              <li>Company name (optional, when you contact us)</li>
              <li>Usage data through Google Analytics (pages visited, time on site, device type)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To respond to your inquiries and provide product information</li>
              <li>To improve our website experience based on usage patterns</li>
              <li>To send relevant communications about our platform (only if you contact us first)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">3. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Google Analytics</strong> — to understand how visitors use our website. Google Analytics uses cookies to collect anonymous usage data. You can opt out by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-900">Google Analytics opt-out browser add-on</a>.</li>
              <li><strong>Formspree</strong> — to process contact form submissions. Your form data is transmitted securely and stored by Formspree. See <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-zinc-900">Formspree&apos;s privacy policy</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">4. Data Retention</h2>
            <p>
              Contact form submissions are retained for as long as necessary to respond to your inquiry
              and maintain our business relationship. Analytics data is retained according to Google
              Analytics&apos; default retention settings (14 months).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">5. Data Security</h2>
            <p>
              We take reasonable measures to protect your personal information. All form submissions
              are transmitted over HTTPS. We do not sell, rent, or share your personal information
              with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">6. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time
              by contacting us. If you are located in the UAE or GCC region, your data rights are
              governed by applicable local data protection regulations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">7. Contact</h2>
            <p>
              For privacy-related inquiries, please{" "}
              <Link href="/#contact" className="underline hover:text-zinc-900">contact us</Link> through
              our website.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

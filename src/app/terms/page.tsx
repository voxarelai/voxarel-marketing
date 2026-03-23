import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Voxarel",
  description: "Terms and conditions for using the Voxarel platform.",
};

export default function TermsOfService() {
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
        <h1 className="heading-serif text-4xl mb-2">Terms of Service</h1>
        <p className="text-sm text-zinc-500 mb-12">Last updated: March 2026</p>

        <div className="space-y-8 text-zinc-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">1. Service Description</h2>
            <p>
              Voxarel provides an AI-powered logistics management platform designed for freight
              forwarding operations in the GCC region. Our platform includes container optimization,
              shipment tracking, field agent management, and executive analytics capabilities.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">2. Account Terms</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the security of your account credentials</li>
              <li>You must be 18 years or older to use the platform</li>
              <li>One person or legal entity may maintain no more than one account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">3. Acceptable Use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the platform for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the platform</li>
              <li>Interfere with or disrupt the integrity or performance of the platform</li>
              <li>Reverse engineer, decompile, or disassemble any part of the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">4. Data and Privacy</h2>
            <p>
              Your use of the platform is also governed by our{" "}
              <Link href="/privacy" className="underline hover:text-zinc-900">Privacy Policy</Link>.
              You retain ownership of all data you input into the platform. We will not access your
              data except as necessary to provide the service or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">5. Intellectual Property</h2>
            <p>
              The Voxarel platform, including its design, features, and documentation, is the
              intellectual property of Voxarel. You may not copy, modify, or distribute any part
              of the platform without our written consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Voxarel shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, or any loss of profits
              or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill,
              or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">7. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. We will provide notice of
              material changes through the platform or via email. Your continued use of the platform
              after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">8. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the
              United Arab Emirates. Any disputes arising from these terms shall be subject to the
              exclusive jurisdiction of the courts of the UAE.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-900 mb-3">9. Contact</h2>
            <p>
              For questions about these terms, please{" "}
              <Link href="/#contact" className="underline hover:text-zinc-900">contact us</Link> through
              our website.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

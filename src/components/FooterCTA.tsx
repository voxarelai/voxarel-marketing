import { ContactForm } from "./ContactForm";
import { SIGNUP_URL } from "@/lib/config";

export function FooterCTA() {
  return (
    <section id="contact" className="py-24 bg-[#fafafa] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-200/30 to-transparent blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-2 h-2 bg-orange-500 rounded-full" />
          <span className="text-sm text-zinc-500 uppercase tracking-wider">
            Get in Touch
          </span>
        </div>

        <h2 className="heading-serif text-4xl md:text-6xl text-zinc-900 mb-6">
          Ready to connect
          <br />
          your entire operation?
        </h2>

        <p className="text-zinc-600 text-lg mb-4 max-w-2xl mx-auto">
          Tell us about your operation and we&apos;ll show you how Voxarel
          connects every person, package, and payment on one platform.
        </p>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-full border border-zinc-200 mb-10">
          <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
          <span className="text-sm text-zinc-600 font-medium">Currently in Beta</span>
        </div>

        <ContactForm />

        <p className="mt-6 text-sm text-zinc-400">
          Or{" "}
          <a
            href={SIGNUP_URL}
            className="text-zinc-600 underline hover:text-zinc-900 transition-colors"
          >
            sign up directly
          </a>{" "}
          to get started.
        </p>
      </div>
    </section>
  );
}

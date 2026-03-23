import { ContactForm } from "./ContactForm";

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
          Ready to eliminate
          <br />
          shipping delays?
        </h2>

        <p className="text-zinc-600 text-lg mb-10 max-w-2xl mx-auto">
          Tell us about your logistics operations and we&apos;ll show you how
          Voxarel can help maximize container utilization and streamline your
          freight forwarding workflow.
        </p>

        <ContactForm />

        <p className="mt-6 text-sm text-zinc-400">
          Or{" "}
          <a
            href="https://console.voxarel.com/sign-up"
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

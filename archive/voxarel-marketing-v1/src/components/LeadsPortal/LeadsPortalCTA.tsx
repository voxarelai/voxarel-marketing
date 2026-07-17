import { SIGNUP_URL } from "@/lib/config";

export function LeadsPortalCTA() {
  return (
    <section
      id="leads-cta"
      className="relative overflow-hidden bg-[#fafafa] py-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-orange-200/30 to-transparent blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="mb-6 inline-flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          <span className="text-sm uppercase tracking-wider text-zinc-500">
            Get started
          </span>
        </div>
        <h2 className="heading-serif mb-6 text-4xl text-zinc-900 md:text-6xl">
          Add the calculator to your site today
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-600">
          Set up your rates, grab your snippet, and start capturing leads in
          minutes.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Get started
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-8 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            Book a demo
          </a>
        </div>
      </div>
    </section>
  );
}

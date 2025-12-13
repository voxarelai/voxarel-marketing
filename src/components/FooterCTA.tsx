export function FooterCTA() {
  return (
    <section id="contact" className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-orange-500/10 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-2 h-2 bg-orange-500 rounded-full" />
          <span className="text-sm text-zinc-400 uppercase tracking-wider">
            Get a Personalized Demo
          </span>
        </div>

        <h2 className="heading-serif text-4xl md:text-6xl text-white mb-6">
          Ready to eliminate
          <br />
          shipping delays?
        </h2>

        <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
          Voxarel&apos;s AI-powered platform handles complex logistics at scale, from predictive
          container optimization to real-time customer tracking, while maintaining 95%+ utilization
          rates.
        </p>

        <a
          href="#"
          className="inline-flex items-center px-8 py-4 bg-white text-zinc-900 rounded-full font-medium text-lg hover:bg-zinc-200 transition-colors"
        >
          Book a Demo
        </a>
      </div>
    </section>
  );
}

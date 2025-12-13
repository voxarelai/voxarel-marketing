export function ProductDemo() {
  return (
    <section id="how-it-works" className="py-24 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-sm text-zinc-400 uppercase tracking-wider">How It Works</span>
            </div>
            <h2 className="heading-serif text-4xl md:text-5xl text-white mb-6">
              From chaos to clarity
              <br />
              in days, not months
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              Voxarel transforms your reactive logistics operation into a predictive, data-driven
              system. No more overflow delays. No more guessing when to book containers.
            </p>

            {/* Steps */}
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Connect your operation",
                  description:
                    "Onboard your branches, set up field agents, configure your pricing.",
                },
                {
                  step: "02",
                  title: "Capture packages in real-time",
                  description:
                    "Field agents use the smart cart to capture dimensions, weights, and customer info.",
                },
                {
                  step: "03",
                  title: "Let AI optimize",
                  description:
                    "Our algorithms predict container fill rates and recommend proactive bookings.",
                },
                {
                  step: "04",
                  title: "Ship with confidence",
                  description:
                    "95%+ utilization, zero overflow delays, complete customer visibility.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="text-orange-500 font-mono text-sm">{item.step}</div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    <p className="text-zinc-500 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Screenshot Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
              {/* Placeholder for product screenshot/video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-zinc-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-zinc-600 text-sm">Product Demo Video</p>
                  <p className="text-zinc-700 text-xs mt-1">
                    Replace with actual screenshot or video
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-orange-500/5 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

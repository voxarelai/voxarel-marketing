export function Testimonial() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-serif text-4xl md:text-5xl text-zinc-900">
            See how companies scaled
            <br />
            their operations with Voxarel
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Company Visual */}
            <div className="aspect-square bg-zinc-50 rounded-2xl overflow-hidden flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-zinc-900 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">ST</span>
                </div>
                <p className="text-zinc-900 font-semibold text-lg">ST Courier</p>
                <p className="text-zinc-500 text-sm mt-1">stcourier.ae</p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-zinc-900">95%</p>
                    <p className="text-xs text-zinc-500">Utilization</p>
                  </div>
                  <div className="w-px h-8 bg-zinc-200" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-zinc-900">3x</p>
                    <p className="text-xs text-zinc-500">Faster</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div>
              {/* Company Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">ST</span>
                </div>
                <span className="text-zinc-900 font-semibold">ST Courier</span>
              </div>

              <h3 className="text-2xl font-semibold text-zinc-900 mb-4">
                How ST Courier eliminated delays and doubled their container utilization
              </h3>

              <a
                href="https://stcourier.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors mb-8"
              >
                Visit ST Courier
              </a>

              {/* Quote */}
              <div className="border-t border-zinc-200 pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="text-zinc-600 font-semibold text-sm">AK</span>
                  </div>
                  <div>
                    <p className="text-zinc-900 font-medium">Ahmed Khan</p>
                    <p className="text-zinc-500 text-sm">Operations Director at ST Courier</p>
                  </div>
                </div>
                <blockquote className="mt-4 text-zinc-600 italic">
                  &ldquo;Before Voxarel, we were losing 20% of container space to manual packing
                  inefficiencies. Within the first month, our utilization jumped to 95% and our
                  field agents could process three times more packages daily. The predictive
                  container optimization alone saved us from booking unnecessary overflow
                  shipments.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

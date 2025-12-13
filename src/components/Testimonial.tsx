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
            {/* Image Placeholder */}
            <div className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-zinc-200 rounded-full mx-auto mb-4" />
                  <p className="text-zinc-400 text-sm">Client Photo</p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div>
              {/* Company Logo Placeholder */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-zinc-200 rounded" />
                <span className="text-zinc-900 font-semibold">Company Name</span>
              </div>

              <h3 className="text-2xl font-semibold text-zinc-900 mb-4">
                How [Company] eliminated delays and scaled operations
              </h3>

              <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors mb-8"
              >
                Learn more
              </a>

              {/* Quote */}
              <div className="border-t border-zinc-200 pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex-shrink-0" />
                  <div>
                    <p className="text-zinc-900 font-medium">[Client Name]</p>
                    <p className="text-zinc-500 text-sm">[Title] at [Company]</p>
                  </div>
                </div>
                <blockquote className="mt-4 text-zinc-600 italic">
                  &ldquo;[Placeholder testimonial quote about how Voxarel transformed their
                  logistics operations, eliminated delays, and improved container utilization.
                  Replace with actual customer feedback.]&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

export function Testimonial() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-serif text-4xl md:text-5xl text-zinc-900">
            Built from real operations
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Company Visual */}
            <div className="aspect-square bg-zinc-50 rounded-2xl overflow-hidden flex items-center justify-center p-12">
              <div className="text-center">
                <div className="mb-6">
                  <Image
                    src="/st-courier-logo.svg"
                    alt="ST Courier"
                    width={180}
                    height={60}
                    className="mx-auto"
                  />
                </div>
                <p className="text-zinc-500 text-sm mt-1">stcourier.ae</p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-zinc-900">12+</p>
                    <p className="text-xs text-zinc-500">Branches</p>
                  </div>
                  <div className="w-px h-8 bg-zinc-200" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-zinc-900">200+</p>
                    <p className="text-xs text-zinc-500">Field Agents</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div>
              {/* Company Badge */}
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/st-courier-logo.svg"
                  alt="ST Courier"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>

              <h3 className="text-2xl font-semibold text-zinc-900 mb-4">
                How ST Courier connected their field agents, branches, and head office on one platform
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
                  &ldquo;With over 200 field agents collecting packages across the UAE and 12 branches
                  feeding into our head office, coordination was a nightmare. Voxarel gave every
                  field agent a mobile workflow, every branch manager real-time visibility, and
                  our head office a single dashboard to track it all. We went from chasing
                  spreadsheets to running a connected operation overnight.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

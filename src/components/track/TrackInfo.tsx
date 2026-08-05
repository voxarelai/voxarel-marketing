import { Reveal } from "@/components/Reveal";
import { Search, Lock } from "@/components/icons";

export const trackFaqs: { q: string; a: string }[] = [
  {
    q: "What is an AWB number?",
    a: "The AWB (air waybill) number is the tracking number printed on your shipment's label and receipt. Enter it above to see the shipment's current status.",
  },
  {
    q: "Why do I need a one-time code?",
    a: "Private details like addresses, documents and proof of delivery are only shown to the sender or receiver. To confirm it is you, Voxarel sends a one-time code to the phone or email already on the booking.",
  },
  {
    q: "My tracking has not updated. What does that mean?",
    a: "Between milestones a shipment can sit in transit for a while with no new scan. If it has been unusually long, the carrier is alerted automatically. For more detail, contact the company you shipped with.",
  },
];

export function TrackInfo() {
  return (
    <section className="border-t border-hair bg-tint/40 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display text-center text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.2rem]">
            How tracking works.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-hair bg-white p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-petrol">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="font-display text-[17px] font-bold text-ink">See the latest status</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Enter your tracking number to see where your shipment is and when it last moved,
                straight from the carrier that operates it.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-2xl border border-hair bg-white p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-petrol">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-display text-[17px] font-bold text-ink">Unlock full details</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Verify with a one-time code sent to the contact on the booking to see addresses,
                documents and proof of delivery. Access expires automatically.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 space-y-4">
          {trackFaqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 3) * 70}>
              <div className="rounded-2xl border border-hair bg-white p-6">
                <h3 className="font-display text-[16px] font-bold text-ink">{f.q}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

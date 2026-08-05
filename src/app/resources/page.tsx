import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { articles, formatDate } from "@/content/resources";

export const metadata: Metadata = {
  alternates: { canonical: "/resources" },
  title: "Resources | Voxarel",
  description:
    "Practical guides for running a courier or cargo operation: cash on delivery reconciliation, cargo consolidation, and choosing logistics software.",
  openGraph: {
    title: "Resources | Voxarel",
    description:
      "Practical guides for running a courier or cargo operation: cash on delivery, cargo consolidation, and choosing logistics software.",
    type: "website",
    url: "/resources",
    siteName: "Voxarel",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Voxarel resources" }],
  },
};

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="relative overflow-hidden pb-8 pt-36 sm:pt-44">
          <div
            aria-hidden
            className="absolute -top-48 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full hidden"
          />
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <Reveal eager>
              <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
                Resources
              </p>
            </Reveal>
            <Reveal eager delay={80}>
              <h1 className="font-display mt-5 text-balance text-[2.5rem] font-medium leading-[1.08] tracking-tight text-petrol-deep sm:text-6xl">
                Guides for running a logistics operation.
              </h1>
            </Reveal>
            <Reveal eager delay={160}>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
                Practical, no fluff guides on the parts of courier and cargo work that actually cost
                you money.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <div className="space-y-4">
              {articles.map((a, i) => (
                <Reveal key={a.slug} delay={(i % 3) * 70}>
                  <a
                    href={`/resources/${a.slug}`}
                    className="group block rounded-2xl border border-hair bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/60 hover:shadow-[0_16px_40px_-16px_rgba(16,64,80,0.25)]"
                  >
                    <p className="text-[13px] font-bold text-faint">
                      {formatDate(a.date)} · {a.readMins} min read
                    </p>
                    <h2 className="font-display mt-2 text-xl font-bold text-ink transition-colors group-hover:text-petrol">
                      {a.title}
                    </h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-bold text-petrol">
                      Read
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

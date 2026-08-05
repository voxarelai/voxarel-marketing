import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Check } from "@/components/icons";
import { articles, getArticle, formatDate, type Block } from "@/content/resources";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = `/resources/${a.slug}`;
  return {
    title: `${a.title} | Voxarel`,
    description: a.description,
    alternates: { canonical: url },
    openGraph: {
      title: a.title,
      description: a.description,
      type: "article",
      url,
      siteName: "Voxarel",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Voxarel" }],
    },
  };
}

function renderBlock(b: Block, i: number) {
  if (b.type === "h2") {
    return (
      <h2
        key={i}
        className="font-display pt-3 text-2xl font-medium tracking-tight text-petrol-deep sm:text-[1.7rem]"
      >
        {b.text}
      </h2>
    );
  }
  if (b.type === "ul") {
    return (
      <ul key={i} className="space-y-2.5">
        {b.items.map((it) => (
          <li key={it} className="flex gap-2.5 text-[16.5px] leading-relaxed text-muted">
            <Check className="mt-[6px] h-4 w-4 shrink-0 text-mint-deep" strokeWidth={2.6} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <p key={i} className="text-pretty text-[16.5px] leading-relaxed text-muted">
      {b.text}
    </p>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const url = `${SITE_URL}/resources/${a.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    mainEntityOfPage: url,
    image: `${SITE_URL}/og.png`,
    author: { "@type": "Organization", name: "Voxarel", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Voxarel",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/voxarel-logo.png` },
    },
  };

  return (
    <>
      <Navigation />
      <main>
        <article className="relative overflow-hidden pb-8 pt-36 sm:pt-44">
          <div
            aria-hidden
            className="absolute -top-48 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full hidden"
          />
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Reveal eager>
              <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
                Resources
              </p>
            </Reveal>
            <Reveal eager delay={80}>
              <h1 className="font-display mt-4 text-balance text-[2.1rem] font-medium leading-[1.14] tracking-tight text-petrol-deep sm:text-[2.9rem]">
                {a.title}
              </h1>
            </Reveal>
            <Reveal eager delay={140}>
              <p className="mt-4 text-[14px] font-bold text-faint">
                {formatDate(a.date)} · {a.readMins} min read
              </p>
            </Reveal>

            <div className="mt-10 space-y-5">{a.body.map((b, i) => renderBlock(b, i))}</div>

            <div className="mt-12 border-t border-hair pt-8">
              <p className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-faint">
                Keep reading
              </p>
              <ul className="mt-4 space-y-2.5">
                {a.related.map((r) => (
                  <li key={r.href}>
                    <a
                      href={r.href}
                      className="group inline-flex items-center gap-1.5 text-[15.5px] font-bold text-petrol transition-colors hover:text-petrol-deep"
                    >
                      {r.label}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </main>
      <CtaBand />
      <Footer />
      <JsonLd data={schema} />
    </>
  );
}

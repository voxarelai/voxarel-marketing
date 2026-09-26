import Link from "next/link";
import { lanesByOrigin } from "@/lib/lanes";

/**
 * Server-rendered index of every lane, grouped by origin. The interactive
 * directory above it paginates in React state, so without this block the
 * HTML would only ever expose the first page of lanes to crawlers.
 * prefetch={false} matters: 500 viewport-triggered prefetches would otherwise
 * fire as the reader scrolls.
 */
export function CorridorIndex() {
  const groups = lanesByOrigin();
  const perOrigin = groups[0]?.lanes.length ?? 0;
  return (
    <section
      id="all-corridors"
      aria-labelledby="all-corridors-heading"
      className="border-t border-hair py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2
          id="all-corridors-heading"
          className="font-display text-3xl font-medium tracking-tight text-petrol-deep sm:text-[2.2rem]"
        >
          All corridors by origin
        </h2>
        <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-muted">
          Every UAE to India lane Voxarel runs: {groups.length} origins, {perOrigin} destinations
          each. Open a lane for transit times, rates, customs and tracking.
        </p>
        {groups.map((g) => (
          <div key={g.code} className="mt-10">
            <h3 className="font-display text-[15px] font-medium uppercase tracking-[0.12em] text-faint">
              From {g.origin}{" "}
              <span className="font-mono normal-case tracking-normal">({g.code})</span>
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-[14px] sm:grid-cols-3 lg:grid-cols-4 [&_a]:inline-block [&_a]:py-0.5 [&_a]:text-muted [&_a:hover]:text-petrol">
              {g.lanes.map((l) => (
                <li key={l.slug}>
                  <Link href={`/shipping/${l.slug}`} prefetch={false}>
                    {l.origin} to {l.destination}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

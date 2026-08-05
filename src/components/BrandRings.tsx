/**
 * Voxarel signature device: concentric mint rings (radar / reach motif).
 * Mirrors public/elements/rings.svg. Used as low-opacity line art in
 * negative space (hero, dark bands): a branded moment, not a glow blob.
 */
export function BrandRings({
  className = "",
  opacity = [0.16, 0.1, 0.06],
}: {
  className?: string;
  opacity?: [number, number, number];
}) {
  return (
    <svg aria-hidden className={className} viewBox="0 0 1000 1000" fill="none">
      <g stroke="#5FB5A2" strokeWidth={2}>
        <circle cx="700" cy="620" r="440" strokeOpacity={opacity[0]} />
        <circle cx="700" cy="620" r="320" strokeOpacity={opacity[1]} />
        <circle cx="700" cy="620" r="200" strokeOpacity={opacity[2]} />
      </g>
    </svg>
  );
}

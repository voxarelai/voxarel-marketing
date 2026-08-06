// Corridor (lane) data powering the programmatic /shipping/[lane] pages.
// Each lane carries genuinely unique data (transit, distance, ports, commodities,
// blurb) so the templated pages clear Google's helpful-content bar. Figures are
// industry-typical ranges and great-circle distances; review before scaling wider.

export type Lane = {
  slug: string;
  origin: string;
  originCode: string;
  destination: string;
  destCode: string;
  seaTransit: string;
  airTransit: string;
  distanceKm: number;
  originPort: string;
  destPort: string;
  commodities: string[];
  blurb: string;
};

export const lanes: Lane[] = [
  {
    slug: "dubai-to-chennai",
    origin: "Dubai",
    originCode: "DXB",
    destination: "Chennai",
    destCode: "MAA",
    seaTransit: "7-12 days",
    airTransit: "1-3 days",
    distanceKm: 2900,
    originPort: "Jebel Ali (JEA)",
    destPort: "Chennai Port / Ennore",
    commodities: ["FMCG", "garments", "electronics", "machine spares"],
    blurb:
      "One of the busiest Gulf to South India lanes. High volumes of consolidated LCL cargo and time-critical air freight move Dubai to Chennai every week.",
  },
  {
    slug: "dubai-to-cochin",
    origin: "Dubai",
    originCode: "DXB",
    destination: "Cochin",
    destCode: "COK",
    seaTransit: "6-10 days",
    airTransit: "1-3 days",
    distanceKm: 2200,
    originPort: "Jebel Ali (JEA)",
    destPort: "Cochin Port (Vallarpadam)",
    commodities: ["foodstuff", "building material", "personal effects", "spare parts"],
    blurb:
      "A short, high-frequency Gulf to Kerala lane with heavy personal-effects and foodstuff traffic alongside commercial cargo.",
  },
  {
    slug: "dubai-to-mumbai",
    origin: "Dubai",
    originCode: "DXB",
    destination: "Mumbai",
    destCode: "BOM",
    seaTransit: "5-9 days",
    airTransit: "1-2 days",
    distanceKm: 1930,
    originPort: "Jebel Ali (JEA)",
    destPort: "Nhava Sheva (JNPT)",
    commodities: ["electronics", "textiles", "chemicals", "machinery"],
    blurb:
      "The shortest sea leg from Dubai to India's commercial capital, with fast turnarounds through Nhava Sheva and daily air options.",
  },
  {
    slug: "dubai-to-delhi",
    origin: "Dubai",
    originCode: "DXB",
    destination: "Delhi",
    destCode: "DEL",
    seaTransit: "12-18 days",
    airTransit: "1-2 days",
    distanceKm: 2190,
    originPort: "Jebel Ali (JEA)",
    destPort: "ICD Tughlakabad (inland)",
    commodities: ["electronics", "auto parts", "apparel", "cosmetics"],
    blurb:
      "A Gulf to North India lane where sea cargo moves inland to Delhi's ICDs, so customs and door delivery timing matter as much as ocean transit.",
  },
  {
    slug: "dubai-to-bengaluru",
    origin: "Dubai",
    originCode: "DXB",
    destination: "Bengaluru",
    destCode: "BLR",
    seaTransit: "10-15 days",
    airTransit: "1-3 days",
    distanceKm: 2600,
    originPort: "Jebel Ali (JEA)",
    destPort: "Chennai + inland to Bengaluru",
    commodities: ["electronics", "IT hardware", "aerospace spares", "apparel"],
    blurb:
      "Cargo for India's tech hub typically routes through Chennai then inland, so this lane rewards tight tracking across the sea and road legs.",
  },
  {
    slug: "dubai-to-hyderabad",
    origin: "Dubai",
    originCode: "DXB",
    destination: "Hyderabad",
    destCode: "HYD",
    seaTransit: "10-15 days",
    airTransit: "1-3 days",
    distanceKm: 2470,
    originPort: "Jebel Ali (JEA)",
    destPort: "Chennai + inland to Hyderabad",
    commodities: ["pharmaceuticals", "electronics", "machinery", "apparel"],
    blurb:
      "A pharma-heavy Gulf to South-Central India lane where temperature-sensitive and high-value air cargo sits alongside consolidated sea freight.",
  },
  {
    slug: "dubai-to-kolkata",
    origin: "Dubai",
    originCode: "DXB",
    destination: "Kolkata",
    destCode: "CCU",
    seaTransit: "14-20 days",
    airTransit: "2-4 days",
    distanceKm: 3450,
    originPort: "Jebel Ali (JEA)",
    destPort: "Kolkata / Haldia",
    commodities: ["machinery", "chemicals", "foodstuff", "textiles"],
    blurb:
      "The longest of the core Gulf to India lanes, serving East India through Kolkata and Haldia with longer sea transits to plan around.",
  },
  {
    slug: "dubai-to-ahmedabad",
    origin: "Dubai",
    originCode: "DXB",
    destination: "Ahmedabad",
    destCode: "AMD",
    seaTransit: "6-10 days",
    airTransit: "1-2 days",
    distanceKm: 1650,
    originPort: "Jebel Ali (JEA)",
    destPort: "Mundra / Pipavav",
    commodities: ["textiles", "chemicals", "pharmaceuticals", "machinery"],
    blurb:
      "A short Gulf to Gujarat lane feeding one of India's largest export-manufacturing belts through Mundra and Pipavav.",
  },
  {
    slug: "sharjah-to-mumbai",
    origin: "Sharjah",
    originCode: "SHJ",
    destination: "Mumbai",
    destCode: "BOM",
    seaTransit: "5-9 days",
    airTransit: "1-2 days",
    distanceKm: 1950,
    originPort: "Khorfakkan / Jebel Ali",
    destPort: "Nhava Sheva (JNPT)",
    commodities: ["electronics", "textiles", "consumer goods", "machinery"],
    blurb:
      "Sharjah's courier and consolidation traffic to Mumbai runs on a short, fast sea leg with strong daily air-cargo capacity.",
  },
  {
    slug: "sharjah-to-chennai",
    origin: "Sharjah",
    originCode: "SHJ",
    destination: "Chennai",
    destCode: "MAA",
    seaTransit: "7-12 days",
    airTransit: "1-3 days",
    distanceKm: 2900,
    originPort: "Khorfakkan / Jebel Ali",
    destPort: "Chennai Port / Ennore",
    commodities: ["FMCG", "garments", "electronics", "personal effects"],
    blurb:
      "A high-volume Sharjah to South India lane with heavy courier and personal-effects traffic alongside commercial consolidations.",
  },
  {
    slug: "abu-dhabi-to-cochin",
    origin: "Abu Dhabi",
    originCode: "AUH",
    destination: "Cochin",
    destCode: "COK",
    seaTransit: "6-11 days",
    airTransit: "1-3 days",
    distanceKm: 2050,
    originPort: "Khalifa Port",
    destPort: "Cochin Port (Vallarpadam)",
    commodities: ["foodstuff", "building material", "personal effects", "machinery"],
    blurb:
      "Abu Dhabi to Kerala traffic moves through Khalifa Port, with strong personal-effects and foodstuff volumes on a short sea route.",
  },
  {
    slug: "jebel-ali-to-nhava-sheva",
    origin: "Jebel Ali",
    originCode: "JEA",
    destination: "Nhava Sheva",
    destCode: "INNSA",
    seaTransit: "5-8 days",
    airTransit: "n/a",
    distanceKm: 1930,
    originPort: "Jebel Ali (JEA)",
    destPort: "Nhava Sheva (JNPT)",
    commodities: ["FCL containers", "chemicals", "machinery", "consolidations"],
    blurb:
      "The core port-to-port ocean lane behind most Dubai to Mumbai movements, carrying FCL and heavy consolidated LCL between the two largest terminals.",
  },
];

export function getLane(slug: string): Lane | undefined {
  return lanes.find((l) => l.slug === slug);
}

export function laneTitle(l: Lane): string {
  return `${l.origin} to ${l.destination}`;
}

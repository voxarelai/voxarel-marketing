// Corridor (lane) data powering the programmatic /shipping/[lane] pages.
// Lanes are GENERATED from a matrix of UAE origins x India destinations so the
// set scales without hand-authoring each one. Every lane still carries genuinely
// distinct data (haversine distance, distance-derived transit, region commodities,
// gateway ports, a varied blurb) so pages clear the helpful-content bar. All
// origins are UAE, so the India-UAE CEPA / AED content stays accurate.
// NOTE: figures are industry-typical estimates; review before relying on them.

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

type Origin = { name: string; code: string; lat: number; lng: number; port: string };
type Region = "South" | "West" | "North" | "East" | "Central" | "Northeast";
type Dest = {
  name: string;
  code: string;
  lat: number;
  lng: number;
  region: Region;
  port: string;
  coastal: boolean;
};

const origins: Origin[] = [
  { name: "Dubai", code: "DXB", lat: 25.2, lng: 55.27, port: "Jebel Ali (JEA)" },
  { name: "Sharjah", code: "SHJ", lat: 25.35, lng: 55.39, port: "Port Khalid / Khorfakkan" },
  { name: "Abu Dhabi", code: "AUH", lat: 24.45, lng: 54.38, port: "Khalifa Port" },
  { name: "Ajman", code: "AJM", lat: 25.41, lng: 55.44, port: "Ajman Port" },
  { name: "Ras Al Khaimah", code: "RKT", lat: 25.79, lng: 55.94, port: "Saqr Port" },
  { name: "Fujairah", code: "FJR", lat: 25.12, lng: 56.34, port: "Port of Fujairah" },
  { name: "Al Ain", code: "AAN", lat: 24.21, lng: 55.75, port: "inland to Jebel Ali" },
  { name: "Umm Al Quwain", code: "UAQ", lat: 25.56, lng: 55.55, port: "Umm Al Quwain Port" },
  { name: "Jebel Ali", code: "JEA", lat: 25.01, lng: 55.06, port: "Jebel Ali (JEA)" },
  { name: "Khorfakkan", code: "KLF", lat: 25.34, lng: 56.36, port: "Khorfakkan Terminal" },
];

const destinations: Dest[] = [
  { name: "Chennai", code: "MAA", lat: 13.08, lng: 80.27, region: "South", port: "Chennai Port", coastal: true },
  { name: "Mumbai", code: "BOM", lat: 19.07, lng: 72.87, region: "West", port: "Nhava Sheva (JNPT)", coastal: true },
  { name: "Delhi", code: "DEL", lat: 28.61, lng: 77.21, region: "North", port: "ICD Tughlakabad", coastal: false },
  { name: "Bengaluru", code: "BLR", lat: 12.97, lng: 77.59, region: "South", port: "via Chennai / Mangaluru", coastal: false },
  { name: "Hyderabad", code: "HYD", lat: 17.38, lng: 78.49, region: "South", port: "via Chennai / Krishnapatnam", coastal: false },
  { name: "Kolkata", code: "CCU", lat: 22.57, lng: 88.36, region: "East", port: "Kolkata / Haldia", coastal: true },
  { name: "Kochi", code: "COK", lat: 9.93, lng: 76.26, region: "South", port: "Cochin Port", coastal: true },
  { name: "Ahmedabad", code: "AMD", lat: 23.02, lng: 72.57, region: "West", port: "Mundra / Pipavav", coastal: false },
  { name: "Pune", code: "PNQ", lat: 18.52, lng: 73.86, region: "West", port: "Nhava Sheva (JNPT)", coastal: false },
  { name: "Coimbatore", code: "CJB", lat: 11.02, lng: 76.96, region: "South", port: "Tuticorin / Cochin", coastal: false },
  { name: "Kozhikode", code: "CCJ", lat: 11.25, lng: 75.78, region: "South", port: "Cochin / Beypore", coastal: true },
  { name: "Thiruvananthapuram", code: "TRV", lat: 8.52, lng: 76.94, region: "South", port: "Vizhinjam / Cochin", coastal: true },
  { name: "Mangaluru", code: "IXE", lat: 12.91, lng: 74.86, region: "South", port: "New Mangalore Port", coastal: true },
  { name: "Visakhapatnam", code: "VTZ", lat: 17.69, lng: 83.22, region: "East", port: "Visakhapatnam Port", coastal: true },
  { name: "Goa", code: "GOI", lat: 15.5, lng: 73.83, region: "West", port: "Mormugao Port", coastal: true },
  { name: "Jaipur", code: "JAI", lat: 26.91, lng: 75.79, region: "North", port: "ICD Jaipur / Mundra", coastal: false },
  { name: "Lucknow", code: "LKO", lat: 26.85, lng: 80.95, region: "North", port: "ICD via Kanpur", coastal: false },
  { name: "Kanpur", code: "KNU", lat: 26.45, lng: 80.33, region: "North", port: "ICD Kanpur", coastal: false },
  { name: "Surat", code: "STV", lat: 21.17, lng: 72.83, region: "West", port: "Hazira / Mundra", coastal: true },
  { name: "Nagpur", code: "NAG", lat: 21.15, lng: 79.09, region: "Central", port: "ICD Nagpur", coastal: false },
  { name: "Indore", code: "IDR", lat: 22.72, lng: 75.86, region: "Central", port: "ICD Pithampur", coastal: false },
  { name: "Chandigarh", code: "IXC", lat: 30.73, lng: 76.78, region: "North", port: "ICD via Delhi", coastal: false },
  { name: "Vijayawada", code: "VGA", lat: 16.51, lng: 80.65, region: "South", port: "Krishnapatnam / Machilipatnam", coastal: false },
  { name: "Madurai", code: "IXM", lat: 9.93, lng: 78.12, region: "South", port: "Tuticorin", coastal: false },
  { name: "Tiruchirappalli", code: "TRZ", lat: 10.79, lng: 78.7, region: "South", port: "Tuticorin / Chennai", coastal: false },
  { name: "Salem", code: "SXV", lat: 11.66, lng: 78.15, region: "South", port: "Chennai / Tuticorin", coastal: false },
  { name: "Kannur", code: "CNN", lat: 11.87, lng: 75.37, region: "South", port: "Cochin / Mangaluru", coastal: true },
  { name: "Thrissur", code: "TCR", lat: 10.53, lng: 76.21, region: "South", port: "Cochin", coastal: false },
  { name: "Kollam", code: "QLM", lat: 8.89, lng: 76.61, region: "South", port: "Cochin / Vizhinjam", coastal: true },
  { name: "Nashik", code: "ISK", lat: 19.99, lng: 73.79, region: "West", port: "Nhava Sheva (JNPT)", coastal: false },
  { name: "Vadodara", code: "BDQ", lat: 22.31, lng: 73.18, region: "West", port: "Mundra / Hazira", coastal: false },
  { name: "Rajkot", code: "RAJ", lat: 22.3, lng: 70.8, region: "West", port: "Mundra / Pipavav", coastal: false },
  { name: "Bhopal", code: "BHO", lat: 23.26, lng: 77.41, region: "Central", port: "ICD Mandideep", coastal: false },
  { name: "Patna", code: "PAT", lat: 25.59, lng: 85.14, region: "East", port: "Kolkata / Haldia", coastal: false },
  { name: "Ranchi", code: "IXR", lat: 23.34, lng: 85.31, region: "East", port: "Kolkata / Haldia", coastal: false },
  { name: "Bhubaneswar", code: "BBI", lat: 20.3, lng: 85.82, region: "East", port: "Paradip / Kolkata", coastal: false },
  { name: "Guwahati", code: "GAU", lat: 26.14, lng: 91.74, region: "Northeast", port: "Kolkata / Haldia", coastal: false },
  { name: "Amritsar", code: "ATQ", lat: 31.63, lng: 74.87, region: "North", port: "ICD via Delhi", coastal: false },
  { name: "Ludhiana", code: "LUH", lat: 30.9, lng: 75.86, region: "North", port: "ICD Ludhiana", coastal: false },
  { name: "Jodhpur", code: "JDH", lat: 26.24, lng: 73.02, region: "North", port: "ICD Jodhpur / Mundra", coastal: false },
  { name: "Udaipur", code: "UDR", lat: 24.58, lng: 73.68, region: "North", port: "Mundra", coastal: false },
  { name: "Agra", code: "AGR", lat: 27.18, lng: 78.01, region: "North", port: "ICD via Delhi", coastal: false },
  { name: "Varanasi", code: "VNS", lat: 25.32, lng: 82.97, region: "North", port: "Kolkata / ICD", coastal: false },
  { name: "Jalandhar", code: "JLR", lat: 31.33, lng: 75.58, region: "North", port: "ICD via Delhi", coastal: false },
  { name: "Guntur", code: "GNT", lat: 16.31, lng: 80.44, region: "South", port: "Krishnapatnam", coastal: false },
  { name: "Warangal", code: "WGC", lat: 17.97, lng: 79.59, region: "South", port: "via Chennai / Hyderabad", coastal: false },
  { name: "Tirupati", code: "TIR", lat: 13.63, lng: 79.42, region: "South", port: "Chennai / Krishnapatnam", coastal: false },
  { name: "Hubli", code: "HBX", lat: 15.36, lng: 75.12, region: "South", port: "Mormugao / New Mangalore", coastal: false },
  { name: "Aurangabad", code: "IXU", lat: 19.88, lng: 75.34, region: "West", port: "Nhava Sheva (JNPT)", coastal: false },
  { name: "Thoothukudi", code: "TUT", lat: 8.76, lng: 78.13, region: "South", port: "Tuticorin (V.O.C Port)", coastal: true },
];

const regionCommodities: Record<Region, string[]> = {
  South: ["garments", "electronics", "foodstuff", "machine spares"],
  West: ["chemicals", "textiles", "pharmaceuticals", "machinery"],
  North: ["auto parts", "apparel", "handicrafts", "electronics"],
  East: ["machinery", "chemicals", "foodstuff", "tea and jute"],
  Central: ["pharmaceuticals", "auto parts", "FMCG", "machinery"],
  Northeast: ["tea", "foodstuff", "consumer goods", "machinery"],
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function haversine(a: Origin, b: Dest): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return Math.round((2 * R * Math.asin(Math.sqrt(h))) / 10) * 10;
}

const seaBands = ["5 to 10 days", "7 to 12 days", "10 to 16 days", "14 to 20 days"];
function seaTransit(km: number, coastal: boolean): string {
  let band = km < 2000 ? 0 : km < 3000 ? 1 : km < 3800 ? 2 : 3;
  if (!coastal) band = Math.min(band + 1, 3); // inland adds transit
  return seaBands[band];
}
function airTransit(km: number): string {
  return km < 2800 ? "1 to 3 days" : "2 to 4 days";
}

// Deterministic small hash for varying blurb template per lane (no randomness).
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function blurbFor(o: Origin, d: Dest, km: number, sea: string): string {
  const haul = km < 2000 ? "short-haul" : km < 3000 ? "mid-haul" : "long-haul";
  const routing = d.coastal ? `direct to ${d.port}` : `to a gateway port and inland to ${d.name}`;
  const templates = [
    `A ${haul} UAE to ${d.region} India lane. ${o.name} cargo reaches ${d.name} ${routing}, moving in roughly ${sea} by sea.`,
    `${o.name} to ${d.name} is a ${haul} corridor into ${d.region} India, handled through ${d.port}, with strong demand for ${regionCommodities[d.region][0]} and ${regionCommodities[d.region][1]}.`,
    `Freight from ${o.name} to ${d.name} clears through ${o.port} and routes via ${d.port}. A ${haul} ${d.region} India lane where sea and air both run regularly.`,
  ];
  return templates[hash(o.code + d.code) % templates.length];
}

function makeLane(o: Origin, d: Dest): Lane {
  const km = haversine(o, d);
  const sea = seaTransit(km, d.coastal);
  return {
    slug: `${slugify(o.name)}-to-${slugify(d.name)}`,
    origin: o.name,
    originCode: o.code,
    destination: d.name,
    destCode: d.code,
    seaTransit: sea,
    airTransit: airTransit(km),
    distanceKm: km,
    originPort: o.port,
    destPort: d.port,
    commodities: regionCommodities[d.region],
    blurb: blurbFor(o, d, km, sea),
  };
}

// Curated, hand-written blurbs for flagship lanes (override the generated one).
const curatedBlurbs: Record<string, string> = {
  "dubai-to-chennai":
    "One of the busiest Gulf to South India lanes. High volumes of consolidated LCL cargo and time-critical air freight move Dubai to Chennai every week.",
  "dubai-to-mumbai":
    "The shortest sea leg from Dubai to India's commercial capital, with fast turnarounds through Nhava Sheva and daily air options.",
  "dubai-to-kochi":
    "A short, high-frequency Gulf to Kerala lane with heavy personal-effects and foodstuff traffic alongside commercial cargo.",
  "sharjah-to-mumbai":
    "Sharjah's courier and consolidation traffic to Mumbai runs on a short, fast sea leg with strong daily air-cargo capacity.",
};

export const lanes: Lane[] = origins
  .flatMap((o) => destinations.map((d) => makeLane(o, d)))
  .map((l) => (curatedBlurbs[l.slug] ? { ...l, blurb: curatedBlurbs[l.slug] } : l));

export const originNames = origins.map((o) => o.name);

export function getLane(slug: string): Lane | undefined {
  return lanes.find((l) => l.slug === slug);
}

export function laneTitle(l: Lane): string {
  return `${l.origin} to ${l.destination}`;
}

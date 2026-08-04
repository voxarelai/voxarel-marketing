import { CONTACT_EMAIL, LINKEDIN_URL, SITE_URL } from "@/lib/site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const APP_ID = `${SITE_URL}/#software`;
export const SITE_ID = `${SITE_URL}/#website`;

// The Gulf-to-India corridor Voxarel serves today: the GCC on the Middle East side
// and India on the South Asia side. Widen this as new markets go live.
const CORRIDOR_AREA_SERVED = [
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "Saudi Arabia" },
  { "@type": "Country", name: "Oman" },
  { "@type": "Country", name: "Qatar" },
  { "@type": "Country", name: "Kuwait" },
  { "@type": "Country", name: "Bahrain" },
  { "@type": "Country", name: "India" },
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Voxarel",
  // O-05 resolved 2026-08-02: the operating entity is Azraq Ventures LLC (an
  // investor entity Voxarel may use). Its office address and licence number are
  // deliberately not published; location is stated as Dubai only.
  legalName: "Azraq Ventures LLC",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/voxarel-logo.png`,
    width: 382,
    height: 77,
  },
  email: CONTACT_EMAIL,
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    contactType: "sales",
    availableLanguage: ["English"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: CORRIDOR_AREA_SERVED,
  sameAs: [LINKEDIN_URL],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  name: "Voxarel",
  url: SITE_URL,
  publisher: { "@id": ORG_ID },
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": APP_ID,
  name: "Voxarel",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Logistics and transport management software",
  operatingSystem: "Web",
  provider: { "@id": ORG_ID },
  description:
    "Logistics operations software for cargo and courier companies on the Gulf-to-India corridor. Bookings, warehouse stock, invoicing, VAT, COD settlement and agent commissions across every branch.",
  featureList: [
    "Shipping: quotes, bookings, corridor rates, invoices and proof of delivery",
    "Warehouse: barcode scan in and out, bin locations, expiry flags, variance checks",
    "Finance: invoice to payment to reconciliation, audit-ready records",
    "Inventory: live stock levels across every branch",
    "Field operations: collections, routes and cash settlement on a phone",
    "Pulse, built-in AI: ask about shipments, stock or approvals in plain language",
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Cargo companies, courier companies, cargo consolidators and freight forwarders",
  },
  // No public price to state; the Offer records that the product is available
  // and points to the demo request rather than inventing a price.
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/demo`,
    availability: "https://schema.org/InStock",
    seller: { "@id": ORG_ID },
  },
  areaServed: CORRIDOR_AREA_SERVED,
};

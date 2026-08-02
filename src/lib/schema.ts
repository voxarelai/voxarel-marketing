import { CONTACT_EMAIL, LINKEDIN_URL, SITE_URL } from "@/lib/site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const APP_ID = `${SITE_URL}/#software`;

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
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: [{ "@type": "Country", name: "United Arab Emirates" }],
  sameAs: [LINKEDIN_URL],
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
    "One platform for logistics operations. Bookings, warehouse stock, invoicing, VAT, COD settlement and agent commissions across every branch.",
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
    audienceType: "Courier companies, cargo consolidators and freight forwarders",
  },
  areaServed: [{ "@type": "Country", name: "United Arab Emirates" }],
};

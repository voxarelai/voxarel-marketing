/**
 * DESIGN PROTOTYPE DATA
 * ---------------------
 * This page is a working design for the tracking experience. Everything below
 * is mock data; the real page swaps this module for calls to the console's
 * public tracking API (see docs/TRACKING_PLAN.md).
 *
 * Demo AWBs: S-DXB-00224 (delivered, email on file)
 *           S-DXB-00226 (customs hold, email on file)
 *           S-DXB-00228 (out for delivery, phone only → WhatsApp verify)
 *           S-DXB-00231 (in transit, no contact on file → claim flow)
 * Demo OTP: 246810
 */

export const DEMO_OTP = "246810";

export type TrackEvent = {
  title: string;
  location: string;
  time: string;
  state: "done" | "current" | "pending";
  note?: string;
};

export type ContactOnFile =
  | { kind: "email"; masked: string }
  | { kind: "phone"; masked: string }
  | { kind: "none" };

export type ShipmentDetails = {
  sender: { name: string; city: string };
  receiver: { name: string; address: string };
  pieces: string;
  weight: string;
  service: string;
  documents: { label: string; ref: string }[];
  pod?: { receivedBy: string; time: string };
};

export type Shipment = {
  awb: string;
  status: string;
  tone: "petrol" | "mint" | "deep" | "hold";
  carrier: string;
  service: string;
  origin: string;
  destination: string;
  etaLine: string;
  /** 0 Collected · 1 In transit · 2 Out for delivery · 3 Delivered */
  progress: 0 | 1 | 2 | 3;
  events: TrackEvent[];
  contact: ContactOnFile;
  details: ShipmentDetails;
};

const SHIPMENTS: Record<string, Shipment> = {
  "S-DXB-00224": {
    awb: "S-DXB-00224",
    status: "Delivered",
    tone: "deep",
    carrier: "ST Courier",
    service: "Air cargo",
    origin: "Dubai, AE",
    destination: "Hyderabad, IN",
    etaLine: "Delivered on Tue 14 Jul, 11:20",
    progress: 3,
    events: [
      { title: "Delivered", location: "Hyderabad — Ameerpet", time: "Tue 14 Jul, 11:20", state: "done", note: "Received at the door" },
      { title: "Out for delivery", location: "Hyderabad hub", time: "Tue 14 Jul, 08:05", state: "done" },
      { title: "Arrived at destination hub", location: "Hyderabad, IN", time: "Mon 13 Jul, 21:40", state: "done" },
      { title: "Customs cleared", location: "Hyderabad Airport", time: "Mon 13 Jul, 16:15", state: "done" },
      { title: "Departed origin", location: "Dubai, AE", time: "Sun 12 Jul, 23:55", state: "done" },
      { title: "Collected", location: "Dubai — Deira branch", time: "Sat 11 Jul, 17:30", state: "done" },
    ],
    contact: { kind: "email", masked: "r•••••a@g•••••.com" },
    details: {
      sender: { name: "Mohammed R.", city: "Dubai, AE" },
      receiver: { name: "Ravi Kumar A.", address: "12-4-88, Ameerpet Main Rd, Hyderabad 500016, IN" },
      pieces: "2 boxes",
      weight: "9.4 kg chargeable (8.7 actual · 9.4 volumetric)",
      service: "Air cargo · Dubai → Hyderabad",
      documents: [
        { label: "Commercial invoice", ref: "INV-2026-01184" },
        { label: "Receipt", ref: "RCT-2026-00931" },
      ],
      pod: { receivedBy: "Ravi Kumar A. (signature on file)", time: "Tue 14 Jul, 11:20" },
    },
  },

  "S-DXB-00226": {
    awb: "S-DXB-00226",
    status: "Customs hold",
    tone: "hold",
    carrier: "ST Courier",
    service: "Air cargo",
    origin: "Dubai, AE",
    destination: "Bengaluru, IN",
    etaLine: "Estimated Sat 18 Jul — pending customs",
    progress: 1,
    events: [
      { title: "Customs hold", location: "Bengaluru Airport", time: "Wed 15 Jul, 10:12", state: "current", note: "Additional documentation requested — the carrier is on it" },
      { title: "Arrived at destination airport", location: "Bengaluru, IN", time: "Wed 15 Jul, 04:30", state: "done" },
      { title: "Departed origin", location: "Dubai, AE", time: "Tue 14 Jul, 22:10", state: "done" },
      { title: "Collected", location: "Dubai — Karama branch", time: "Mon 13 Jul, 15:45", state: "done" },
    ],
    contact: { kind: "email", masked: "s•••••n@o•••••.com" },
    details: {
      sender: { name: "Suresh N.", city: "Dubai, AE" },
      receiver: { name: "Lakshmi D.", address: "48, 5th Cross, Jayanagar 4th Block, Bengaluru 560011, IN" },
      pieces: "1 box + 1 carton",
      weight: "76.2 kg chargeable",
      service: "Air cargo · Dubai → Bengaluru",
      documents: [{ label: "Commercial invoice", ref: "INV-2026-01190" }],
    },
  },

  "S-DXB-00228": {
    awb: "S-DXB-00228",
    status: "Out for delivery",
    tone: "mint",
    carrier: "ST Courier",
    service: "Air cargo",
    origin: "Dubai, AE",
    destination: "Kochi, IN",
    etaLine: "Arriving today before 18:00",
    progress: 2,
    events: [
      { title: "Out for delivery", location: "Kochi — Ernakulam hub", time: "Thu 16 Jul, 08:40", state: "current" },
      { title: "Arrived at destination hub", location: "Kochi, IN", time: "Wed 15 Jul, 19:22", state: "done" },
      { title: "Customs cleared", location: "Cochin Airport", time: "Wed 15 Jul, 14:05", state: "done" },
      { title: "Departed origin", location: "Dubai, AE", time: "Tue 14 Jul, 23:40", state: "done" },
      { title: "Collected", location: "Dubai — Deira branch", time: "Tue 14 Jul, 11:15", state: "done" },
    ],
    contact: { kind: "phone", masked: "+91 ••••• ••482" },
    details: {
      sender: { name: "Abdul K.", city: "Dubai, AE" },
      receiver: { name: "Fathima S.", address: "Marine Drive, Ernakulam, Kochi 682031, IN" },
      pieces: "1 box",
      weight: "18.0 kg chargeable",
      service: "Air cargo · Dubai → Kochi",
      documents: [{ label: "Commercial invoice", ref: "INV-2026-01196" }],
    },
  },

  "S-DXB-00231": {
    awb: "S-DXB-00231",
    status: "In transit",
    tone: "petrol",
    carrier: "ST Courier",
    service: "Air cargo",
    origin: "Dubai, AE",
    destination: "Chennai, IN",
    etaLine: "Estimated Sat 18 Jul",
    progress: 1,
    events: [
      { title: "In transit", location: "Departed Dubai, AE", time: "Thu 16 Jul, 01:20", state: "current" },
      { title: "Processed at origin facility", location: "Dubai, AE", time: "Wed 15 Jul, 20:05", state: "done" },
      { title: "Collected", location: "Dubai — Bur Dubai branch", time: "Wed 15 Jul, 13:50", state: "done" },
    ],
    contact: { kind: "none" },
    details: {
      sender: { name: "Rahim P.", city: "Dubai, AE" },
      receiver: { name: "Meena V.", address: "T. Nagar, Chennai 600017, IN" },
      pieces: "3 boxes",
      weight: "42.5 kg chargeable",
      service: "Air cargo · Dubai → Chennai",
      documents: [{ label: "Commercial invoice", ref: "INV-2026-01201" }],
    },
  },
};

export const DEMO_AWBS = Object.keys(SHIPMENTS);

export function lookupShipment(awb: string): Shipment | null {
  return SHIPMENTS[awb.trim().toUpperCase()] ?? null;
}

export const PROGRESS_STEPS = ["Collected", "In transit", "Out for delivery", "Delivered"];

export const pillTone: Record<Shipment["tone"], string> = {
  petrol: "bg-petrol/10 text-petrol",
  mint: "bg-mint/20 text-mint-deep",
  deep: "bg-mint-deep/10 text-mint-deep",
  hold: "bg-hair text-muted",
};

import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalLayout";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy — Voxarel",
  description: "How Voxarel handles your data — in plain words.",
};

const sections: LegalSection[] = [
  {
    title: "Who we are",
    paragraphs: [
      <>
        Voxarel is operated by Azraq Ventures LLC, registered at Shams, Sharjah Media City,
        United Arab Emirates (Licence No. 2433833.01). For anything in this policy, write to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-mint-deep hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </>,
    ],
  },
  {
    title: "What we collect on this site",
    paragraphs: [
      "We collect only what each feature needs to work:",
    ],
    bullets: [
      <>
        <b className="text-ink">Demo requests</b> — your name, work email, company, and anything
        you choose to add (phone, branch count, notes). We use it to arrange and run your demo.
        No mailing lists, no drip campaigns.
      </>,
      <>
        <b className="text-ink">Shipment tracking</b> — the tracking number you enter. If you
        unlock full details, we process the one-time code exchange and keep a log of lookups and
        verifications to keep the service safe (rate limiting and abuse prevention).
      </>,
      <>
        <b className="text-ink">Shipment claims</b> — if a booking has no contact on file and you
        submit a claim, we pass the name, email, and phone you provide to the carrier that owns
        the booking so they can confirm the shipment is yours.
      </>,
      <>
        <b className="text-ink">Technical basics</b> — standard server logs (IP address, browser
        type, pages requested) kept for security. The site uses no advertising trackers. If we
        add product analytics later, we will update this policy first.
      </>,
    ],
  },
  {
    title: "Shipment data belongs to the carrier",
    paragraphs: [
      "The shipments you can track here are operated by logistics companies that run on Voxarel — they are the controllers of that data. Voxarel processes it on their behalf to run their operation and to show you tracking. If you want shipment information corrected or removed, the fastest route is the carrier you shipped with; write to us instead and we will route your request to them.",
    ],
  },
  {
    title: "How verification works",
    paragraphs: [
      "To show the private details of a shipment (names, addresses, documents, proof of delivery), we first verify that you are its sender or receiver. We send a one-time code to the email or phone number already on the booking. Contact details are always shown masked and are used for nothing other than sending that code. Verification gives your browser access to that one shipment for a short period, after which it expires.",
    ],
  },
  {
    title: "Who we share data with",
    paragraphs: [
      "We do not sell personal data, full stop. We share it only with:",
    ],
    bullets: [
      "The carrier that owns the booking (for tracking claims and shipment questions).",
      "Service providers that help us run the site — hosting and email delivery — under agreements that limit what they may do with it.",
      "Authorities, where the law requires it.",
    ],
  },
  {
    title: "How long we keep things",
    paragraphs: [
      "Demo requests: for as long as the conversation is live, and a reasonable period after. Security and verification logs: long enough to investigate abuse and meet audit needs. Shipment data: governed by our agreement with the carrier that owns it.",
    ],
  },
  {
    title: "Your rights",
    paragraphs: [
      <>
        You can ask what we hold about you, ask us to correct it, or ask us to delete it — write
        to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-mint-deep hover:underline">
          {CONTACT_EMAIL}
        </a>{" "}
        and we will respond promptly. We handle personal data in line with the UAE Personal Data
        Protection Law, and we are mindful of the data-protection laws of the countries our
        clients&apos; shipments touch, including India.
      </>,
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "If we change this policy, we will update this page and its effective date. Meaningful changes will be called out plainly, not buried.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Privacy"
      title="Privacy policy."
      intro="In plain words: we collect what the site needs to work, we don't sell it, and shipment data belongs to the carrier you shipped with."
      effective="16 July 2026"
      sections={sections}
    />
  );
}

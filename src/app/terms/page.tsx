import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalLayout";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use — Voxarel",
  description: "The terms for using voxarel.com — in plain words.",
};

const sections: LegalSection[] = [
  {
    title: "Who provides this site",
    paragraphs: [
      <>
        voxarel.com is provided by Azraq Ventures LLC, Shams, Sharjah Media City, United Arab
        Emirates (Licence No. 2433833.01). Questions:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-mint-deep hover:underline">
          {CONTACT_EMAIL}
        </a>
        .
      </>,
    ],
  },
  {
    title: "Using the site",
    paragraphs: [
      "Use the site normally — to learn about Voxarel, request a demo, and track shipments you are involved with. Don't do the obvious bad things:",
    ],
    bullets: [
      "No automated scraping, bulk querying, or probing of the tracking service without our written permission. We rate-limit and block abuse.",
      "No attempts to access shipments that aren't yours, guess tracking numbers at scale, or defeat the verification step.",
      "No false claims. When you claim a shipment, you confirm the details you submit are true and about you.",
      "Nothing that breaks the law, or the site.",
    ],
  },
  {
    title: "Tracking information",
    paragraphs: [
      "Tracking data comes live from the systems of the carrier that operates your shipment. We show it as it is given to us. Statuses and arrival estimates are operational information, not promises — the carrier's contract with you governs the actual service. Private shipment details are only shown after verification, and access expires automatically.",
    ],
  },
  {
    title: "The Voxarel platform is separate",
    paragraphs: [
      "These terms cover this website only. Use of the Voxarel platform itself — by logistics companies and their teams — is governed by separate agreements between Azraq Ventures LLC and each client organization.",
    ],
  },
  {
    title: "Our content",
    paragraphs: [
      "The Voxarel name, logo, and everything on this site — text, design, illustrations — belong to Azraq Ventures LLC. Don't reuse them without permission, except as the law allows.",
    ],
  },
  {
    title: "What we're responsible for",
    paragraphs: [
      "The site is provided as-is. We work to keep it accurate and available, but we don't guarantee it will be uninterrupted or error-free. To the fullest extent the law allows, Azraq Ventures LLC is not liable for indirect or consequential losses arising from use of this website. Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    title: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of the United Arab Emirates, and disputes belong to the courts of the Emirate of Sharjah.",
    ],
  },
  {
    title: "Changes",
    paragraphs: [
      "If we change these terms, we will update this page and its effective date. Continued use of the site after a change means you accept the updated terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Terms"
      title="Terms of use."
      intro="The short version: use the site honestly, don't abuse the tracking service, and don't claim shipments that aren't yours."
      effective="16 July 2026"
      sections={sections}
    />
  );
}

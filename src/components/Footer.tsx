"use client";

import Image from "next/image";
import { CONTACT_EMAIL, DEMO_URL, LEGAL_LINE, SIGN_IN_URL, TRACK_URL } from "@/lib/site";
import { track, type VoxarelEvent } from "@/lib/analytics";

type FooterLink = { label: string; href: string; ev?: VoxarelEvent };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Resources", href: "/resources" },
      { label: "Roles", href: "/#roles" },
      { label: "Pulse", href: "/#pulse" },
      { label: "Track a shipment", href: TRACK_URL, ev: "cta_track_click" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Cargo software", href: "/cargo-management-software" },
      { label: "Courier software", href: "/courier-management-software" },
      { label: "Freight forwarding software", href: "/freight-forwarding-software" },
      { label: "3PL software", href: "/3pl-software" },
      { label: "Gulf to India cargo", href: "/gulf-to-india-cargo" },
      { label: "Logistics software UAE", href: "/logistics-software-uae" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Book a demo", href: DEMO_URL, ev: "cta_demo_click" },
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, ev: "contact_email_click" },
      { label: "Sign in", href: SIGN_IN_URL, ev: "cta_signin_click" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-hair bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-xs">
            <Image
              src="/voxarel-logo.png"
              alt="Voxarel"
              width={382}
              height={77}
              className="h-6 w-auto"
            />
            <p className="mt-4 text-[14px] italic leading-relaxed text-muted">
              Connect every person, package and payment.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:flex sm:gap-14 lg:gap-20">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-faint">
                  {col.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        onClick={() => l.ev && track(l.ev, { placement: "footer" })}
                        className="text-[14.5px] font-bold text-muted transition-colors hover:text-petrol"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-hair pt-6 text-[12.5px] leading-relaxed text-faint sm:flex-row">
          <span>
            © {new Date().getFullYear()} Voxarel · {LEGAL_LINE}
          </span>
          <span className="flex shrink-0 gap-5">
            <a href="/privacy" className="font-bold transition-colors hover:text-petrol">
              Privacy
            </a>
            <a href="/terms" className="font-bold transition-colors hover:text-petrol">
              Terms
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

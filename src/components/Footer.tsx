"use client";

import Image from "next/image";
import { Instagram, Linkedin, WhatsApp } from "@/components/icons";
import {
  CONTACT_EMAIL,
  DEMO_URL,
  INSTAGRAM_URL,
  LEGAL_LINE,
  LINKEDIN_URL,
  SIGN_IN_URL,
  TRACK_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/site";
import { track, type VoxarelEvent } from "@/lib/analytics";

type FooterLink = { label: string; href: string; ev?: VoxarelEvent; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Shipping corridors", href: "/shipping" },
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
      {
        label: `WhatsApp ${WHATSAPP_DISPLAY}`,
        href: WHATSAPP_URL,
        ev: "contact_whatsapp_click",
        external: true,
      },
      { label: "Sign in", href: SIGN_IN_URL, ev: "cta_signin_click" },
    ],
  },
];

const socials: { label: string; href: string; ev: VoxarelEvent; Icon: typeof Linkedin }[] = [
  { label: "Voxarel on LinkedIn", href: LINKEDIN_URL, ev: "social_linkedin_click", Icon: Linkedin },
  { label: "Voxarel on Instagram", href: INSTAGRAM_URL, ev: "social_instagram_click", Icon: Instagram },
  { label: "Message Voxarel on WhatsApp", href: WHATSAPP_URL, ev: "contact_whatsapp_click", Icon: WhatsApp },
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
              sizes="120px"
              className="h-6 w-auto"
            />
            <p className="mt-4 text-[14px] italic leading-relaxed text-muted">
              Connect every person, package and payment.
            </p>
            <ul className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    onClick={() => track(s.ev, { placement: "footer_social" })}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-hair text-muted transition-colors hover:border-mint hover:text-petrol"
                  >
                    <s.Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:flex sm:gap-14 lg:gap-20">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="font-display text-[11.5px] font-medium uppercase tracking-[0.13em] text-faint">
                  {col.title}
                </div>
                <ul className="mt-3 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target={l.external ? "_blank" : undefined}
                        rel={l.external ? "noopener noreferrer" : undefined}
                        onClick={() => l.ev && track(l.ev, { placement: "footer" })}
                        className="inline-block py-1 font-display text-[14px] font-medium text-muted transition-colors hover:text-petrol"
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
            <a href="/privacy" className="inline-block py-1 font-display font-medium transition-colors hover:text-petrol">
              Privacy
            </a>
            <a href="/terms" className="inline-block py-1 font-display font-medium transition-colors hover:text-petrol">
              Terms
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

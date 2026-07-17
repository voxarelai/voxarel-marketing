import Image from "next/image";
import { CONTACT_EMAIL, DEMO_URL, LEGAL_LINE, SIGN_IN_URL, TRACK_URL } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "/#platform" },
      { label: "Roles", href: "/#roles" },
      { label: "Pulse", href: "/#pulse" },
      { label: "Track a shipment", href: TRACK_URL },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Book a demo", href: DEMO_URL },
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { label: "Sign in", href: SIGN_IN_URL },
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
          <div className="flex gap-16 sm:gap-24">
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

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Close } from "@/components/icons";
import { DEMO_URL, SIGN_IN_URL } from "@/lib/site";

const links = [
  { label: "Platform", href: "/#platform" },
  { label: "Roles", href: "/#roles" },
  { label: "Pulse", href: "/#pulse" },
  { label: "Track", href: "/track" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-hair bg-white/90 backdrop-blur-md"
          : "border-b border-transparent bg-white/0"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center" aria-label="Voxarel home">
          <Image
            src="/voxarel-logo.png"
            alt="Voxarel"
            width={382}
            height={77}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-[15px] font-bold text-muted transition-colors hover:text-petrol"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={SIGN_IN_URL}
            className="rounded-lg px-4 py-2 text-[15px] font-bold text-petrol transition-colors hover:bg-tint"
          >
            Sign in
          </a>
          <a
            href={DEMO_URL}
            className="rounded-lg bg-petrol px-5 py-2.5 text-[15px] font-bold text-white shadow-sm transition-colors hover:bg-petrol-deep"
          >
            Book a demo
          </a>
        </div>

        <button
          className="p-2 text-petrol md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-hair bg-white px-5 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-hair py-3.5 text-[15px] font-bold text-ink"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-5 flex flex-col gap-3">
            <a
              href={SIGN_IN_URL}
              className="rounded-lg border border-hair px-4 py-3 text-center text-[15px] font-bold text-petrol"
            >
              Sign in
            </a>
            <a
              href={DEMO_URL}
              className="rounded-lg bg-petrol px-4 py-3 text-center text-[15px] font-bold text-white"
            >
              Book a demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

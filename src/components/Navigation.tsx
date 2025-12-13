"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isOverLight, setIsOverLight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show glass effect when scrolled
      setScrolled(window.scrollY > 50);

      // Check if nav is over the white testimonials section
      const testimonialsSection = document.getElementById("testimonials");
      if (testimonialsSection) {
        const rect = testimonialsSection.getBoundingClientRect();
        // Nav is over light section if testimonials top is above 60px (nav height)
        setIsOverLight(rect.top < 60 && rect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-2 left-0 right-0 z-50 px-5 py-3">
      <div className="w-full flex items-center justify-between">
        {/* Left Pill - Logo + Nav */}
        <div
          className={`flex items-center gap-6 px-6 h-12 rounded-lg transition-all duration-300 border ${
            scrolled ? "nav-pill-scrolled" : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src={isOverLight ? "/logo-black.png" : "/logo-white.png"}
              alt="Voxarel"
              width={140}
              height={32}
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="#features"
              className={`flex items-center gap-1 transition-colors text-sm px-3 py-1.5 ${
                isOverLight ? "text-zinc-700 hover:text-zinc-900" : "text-white hover:text-white"
              }`}
            >
              Product
              <svg
                className="w-3 h-3 opacity-70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
            <a
              href="#testimonials"
              className={`flex items-center gap-1 transition-colors text-sm px-3 py-1.5 ${
                isOverLight ? "text-zinc-700 hover:text-zinc-900" : "text-white hover:text-white"
              }`}
            >
              Company
              <svg
                className="w-3 h-3 opacity-70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Pill - CTA Buttons */}
        <div
          className={`hidden md:flex items-center gap-4 px-5 h-12 rounded-lg transition-all duration-300 border ${
            scrolled ? "nav-pill-scrolled" : "bg-transparent border-transparent"
          }`}
        >
          <a
            href="#"
            className={`transition-colors text-sm px-2 ${
              isOverLight ? "text-zinc-700 hover:text-zinc-900" : "text-white hover:text-white"
            }`}
          >
            Sign in
          </a>
          <a
            href="#contact"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              isOverLight
                ? "bg-zinc-900 text-white hover:bg-zinc-800"
                : "bg-white text-zinc-900 hover:bg-zinc-100"
            }`}
          >
            Talk to us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 p-4 rounded-2xl nav-pill-scrolled">
          <div className="space-y-4">
            <a
              href="#features"
              className="block text-zinc-300 hover:text-white transition-colors text-sm"
            >
              Product
            </a>
            <a
              href="#testimonials"
              className="block text-zinc-300 hover:text-white transition-colors text-sm"
            >
              Company
            </a>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a href="#" className="text-zinc-300 hover:text-white text-sm">
                Sign in
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 border border-white/20 text-white rounded-full text-sm text-center hover:bg-white/10"
              >
                Talk to us
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

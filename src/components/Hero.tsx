"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CalculatorWidget } from "./CalculatorWidget";
import { SIGNUP_URL } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.webp"
          alt="Port with container ships and cranes"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Vertical gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/40 to-[#09090b]" />
        {/* Extra left-side darkening so copy reads on large screens */}
        <div className="absolute inset-0 z-[1] hidden bg-gradient-to-r from-black/50 to-transparent lg:block" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-32 lg:pt-36">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left column — pitch */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="text-sm font-medium tracking-wide text-white">
                Now in Beta
              </span>
              <span className="text-xs text-white/60">→</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-serif mb-5 text-4xl leading-[1.1] text-white md:text-5xl"
            >
              Instant freight quotes on your website. Every visitor, a lead.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mx-auto mb-8 max-w-xl text-sm text-white/90 md:text-base lg:mx-0"
            >
              Add your rates, drop in one line of code, and turn the visitors on
              your freight site into qualified leads — with your branding, your
              pricing, your customers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center gap-3 sm:flex-row lg:items-center lg:justify-start"
            >
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
              >
                Get started
              </a>
              <Link
                href="/leads-portal"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                See how it works
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-xs text-white/50"
            >
              Already shipping with us?{" "}
              <a href="/#contact" className="text-white/80 underline-offset-4 hover:underline">
                Book a demo
              </a>
            </motion.p>
          </div>

          {/* Right column — live calculator demo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="ambient-glow mx-auto w-full max-w-md lg:mr-0 lg:ml-auto"
          >
            <CalculatorWidget variant="panel" />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] h-40 bg-gradient-to-t from-[#09090b] to-transparent" />
    </section>
  );
}

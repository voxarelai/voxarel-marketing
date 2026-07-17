"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SIGNUP_URL } from "@/lib/config";

export function LeadsPortalHero() {
  return (
    <section className="gradient-mesh relative overflow-hidden px-6 pb-20 pt-36">
      <div className="gradient-orb gradient-orb-orange absolute -right-10 -top-10 h-[360px] w-[360px]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          <span className="text-xs font-medium uppercase tracking-wider text-orange-300">
            Leads Portal · New
          </span>
        </div>
        <h1 className="heading-serif text-4xl text-white md:text-6xl">
          Your rate calculator, embedded anywhere
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-zinc-300 md:text-lg">
          Let any visitor on your freight website get an instant quote — and turn
          them into a lead in your inbox. Your rates, your branding, one line of
          code.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Get started
          </a>
          <Link
            href="#how-it-works"
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            See how it works
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

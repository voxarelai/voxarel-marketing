"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthModals } from "@/components/auth/AuthModals";
import { UnlockModal } from "@/components/track/UnlockModal";
import {
  getTier1,
  getDetails,
  isValidAwb,
  type Tier1,
  type Tier1Event,
  type UnlockedDetails,
} from "@/lib/tracking";
import {
  Search,
  ArrowRight,
  Check,
  Lock,
  Shield,
  MapPin,
  FileText,
  Archive,
  Clock,
} from "@/components/icons";
import { track } from "@/lib/analytics";

type View = "idle" | "loading" | "notfound" | "error" | "found";
type DetailsState =
  | "locked"
  | "noContact"
  | "skeleton"
  | "unlocked"
  | "expired90"
  | "reverify";

const PROGRESS = ["Collected", "In transit", "Out for delivery", "Delivered"];

function fmt(iso: string) {
  const d = new Date(iso);
  if (isNaN(+d)) return iso;
  return d.toLocaleString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TrackExperience() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [tier1, setTier1] = useState<Tier1 | null>(null);
  const [details, setDetails] = useState<DetailsState>("locked");
  const [unlocked, setUnlocked] = useState<UnlockedDetails | null>(null);
  const [unlockOpen, setUnlockOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const search = async (raw: string) => {
    const awb = raw.trim().toUpperCase();
    if (!awb) return;
    track("track_search_submit", { source: "track_page" });
    if (!isValidAwb(awb)) {
      setView("error");
      setErrorMsg("That doesn't look like a tracking number. Check and try again.");
      return;
    }
    setView("loading");
    setUnlocked(null);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    const res = await getTier1(awb);
    if (res.ok) {
      setTier1(res.data);
      setDetails(res.data.contactHint === "none" ? "noContact" : "locked");
      setView("found");
    } else if (res.status === 404) {
      setTier1(null);
      setView("notfound");
    } else {
      setErrorMsg(res.error);
      setView("error");
    }
  };

  // deep link: /track?awb=XXXX
  useEffect(() => {
    const awb = new URLSearchParams(window.location.search).get("awb");
    if (awb) {
      setQuery(awb.toUpperCase());
      search(awb);
    }
  }, []);

  const openUnlock = () => {
    setUnlockOpen(true);
    setDetails("skeleton");
  };
  const cancelUnlock = () => {
    setUnlockOpen(false);
    if (!unlocked) setDetails(tier1?.contactHint === "none" ? "noContact" : "locked");
  };
  const onUnlocked = async (token: string) => {
    if (!tier1) return;
    setUnlockOpen(false);
    setDetails("skeleton");
    const res = await getDetails(tier1.awb, token);
    if (res.ok) {
      if ("locked" in res.data && res.data.locked) setDetails("expired90");
      else {
        setUnlocked(res.data as UnlockedDetails);
        setDetails("unlocked");
        setTimeout(
          () => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
          60
        );
      }
    } else if (res.status === 401) {
      setDetails("reverify");
    } else {
      setDetails("reverify");
    }
  };

  return (
    <section className="relative pb-24 pt-28 sm:pt-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[420px]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(230,237,235,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(230,237,235,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 55% at 50% 0%, black 30%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {/* search */}
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-[12px] font-semibold uppercase tracking-[0.24em] text-mint-deep">
            Tracking
          </p>
          <h1 className="font-display mt-4 text-[2.4rem] font-semibold leading-[1.05] tracking-tight text-petrol-deep sm:text-5xl">
            Track your shipment.
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            Live status for any shipment moving on Voxarel. No login needed.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && search(query)}
              placeholder="Enter tracking number"
              aria-label="Tracking number"
              className="h-[52px] flex-1 rounded-xl border border-hair bg-white px-5 text-[16px] tracking-wide shadow-sm focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/12"
            />
            <button
              onClick={() => search(query)}
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-petrol px-8 text-[16px] font-semibold text-white transition-colors hover:bg-petrol-deep"
            >
              <Search className="h-[18px] w-[18px]" /> Track
            </button>
          </div>
        </div>

        <div ref={resultRef} className="scroll-mt-28">
          {view === "loading" && <LoadingCard />}
          {view === "notfound" && <NotFound awb={query} />}
          {view === "error" && <ErrorCard message={errorMsg} />}
          {view === "found" && tier1 && (
            <div className="mt-12 space-y-4">
              <HeaderCard t={tier1} />
              <Timeline events={tier1.events} />
              <DetailsPanel
                state={details}
                unlocked={unlocked}
                onUnlock={openUnlock}
              />
            </div>
          )}
        </div>
      </div>

      {tier1 && (
        <UnlockModal
          open={unlockOpen}
          awb={tier1.awb}
          onClose={cancelUnlock}
          onUnlocked={onUnlocked}
        />
      )}
    </section>
  );
}

/* ------------------------------- header ------------------------------- */

function HeaderCard({ t }: { t: Tier1 }) {
  const hold = t.statusCategory === "hold";
  return (
    <div className="card rounded-2xl border border-hair bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
            Tracking number
          </div>
          <div className="font-display mt-1 text-[26px] font-semibold tracking-tight tabular-nums text-petrol-deep">
            {t.awb}
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold ${
            hold
              ? "border-amber-200 bg-amber-50 text-amber-700"
              : "border-mint/30 bg-mint/[0.07] text-mint-deep"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${hold ? "bg-amber-500" : "bg-mint-deep"}`} />
          {t.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px] text-muted">
        {t.origin && <span className="font-bold text-ink">{t.origin}</span>}
        {t.origin && <ArrowRight className="h-4 w-4 text-mint-deep" />}
        <span className="font-bold text-ink">{t.destination}</span>
        {t.service && <span className="text-faint">· {t.service}</span>}
        {t.carrier && <span className="text-faint">· Shipped with {t.carrier}</span>}
      </div>
      {t.etaLine && (
        <div className="mt-1.5 text-[14.5px] font-semibold text-mint-deep">{t.etaLine}</div>
      )}

      <div className="mt-6">
        <div className="flex gap-1.5">
          {PROGRESS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${i <= t.progressStep ? "bg-mint" : "bg-hair"}`}
            />
          ))}
        </div>
        <div className="mt-2 hidden justify-between text-[10.5px] font-semibold uppercase tracking-wide sm:flex">
          {PROGRESS.map((s, i) => (
            <span key={s} className={i <= t.progressStep ? "text-mint-deep" : "text-faint"}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ timeline ------------------------------ */

function Timeline({ events }: { events: Tier1Event[] }) {
  return (
    <div className="card rounded-2xl border border-hair bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-[15px] font-semibold text-ink">Journey</h2>
        <span className="flex items-center gap-1.5 text-[12px] font-semibold text-faint">
          <Lock className="h-3.5 w-3.5" /> Locations unlock with verification
        </span>
      </div>
      <ol className="mt-6">
        {events.map((e, i) => {
          const last = i === events.length - 1;
          return (
            <li key={`${e.title}-${e.time}`} className={`relative pl-8 ${last ? "" : "pb-6"}`}>
              {!last && <span className="absolute left-[8px] top-[22px] h-full w-[1.5px] bg-hair" />}
              {e.state === "current" ? (
                <span className="absolute left-0 top-0.5 flex h-[17px] w-[17px]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint/40" />
                  <span className="relative inline-flex h-[17px] w-[17px] rounded-full border-[3px] border-mint bg-white" />
                </span>
              ) : (
                <span
                  className={`absolute left-0 top-0.5 flex h-[17px] w-[17px] items-center justify-center rounded-full ${
                    e.state === "done" ? "bg-mint" : "border-2 border-hair bg-white"
                  }`}
                >
                  {e.state === "done" && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                </span>
              )}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <span
                  className={`text-[15px] font-bold ${e.state === "pending" ? "text-faint" : "text-ink"}`}
                >
                  {e.title}
                </span>
                <span className="text-[12.5px] tabular-nums text-faint">{fmt(e.time)}</span>
              </div>
              {e.note && <div className="mt-1 text-[13px] italic text-mint-deep">{e.note}</div>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* --------------------------- details panels --------------------------- */

const LOCKED_ROWS = [
  "Sender & receiver",
  "Delivery address",
  "Pieces & exact weights",
  "Checkpoint locations",
  "Invoice & documents",
];

function DetailsPanel({
  state,
  unlocked,
  onUnlock,
}: {
  state: DetailsState;
  unlocked: UnlockedDetails | null;
  onUnlock: () => void;
}) {
  const auth = useAuthModals();

  if (state === "skeleton") {
    return (
      <div className="card overflow-hidden rounded-2xl border border-hair bg-white">
        <div className="flex items-center justify-between border-b border-hair px-6 py-4 sm:px-8">
          <div className="h-4 w-44 animate-pulse rounded bg-tint-2" />
          <div className="h-3 w-12 animate-pulse rounded bg-tint-2" />
        </div>
        <div className="space-y-4 px-6 py-6 sm:px-8">
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded bg-tint-2" />
            ))}
          </div>
          <div className="h-10 w-2/3 animate-pulse rounded bg-tint-2" />
        </div>
      </div>
    );
  }

  if (state === "unlocked" && unlocked) {
    return (
      <div className="card overflow-hidden rounded-2xl border border-mint/40 bg-white">
        <div className="flex items-center gap-2.5 border-b border-hair bg-mint/[0.08] px-6 py-4 sm:px-8">
          <Shield className="h-4 w-4 text-mint-deep" />
          <span className="text-[13.5px] font-semibold text-mint-deep">
            Verified — full details unlocked for this session
          </span>
        </div>
        <div className="grid gap-px bg-hair sm:grid-cols-2">
          <Field label="Sender" value={unlocked.sender.name} sub={unlocked.sender.city} />
          <Field label="Receiver" value={unlocked.receiver.name} sub={unlocked.receiver.address} />
          <Field label="Pieces" value={`${unlocked.pieces}`} />
          <Field label="Weight" value={unlocked.weight} />
        </div>
        {unlocked.events.length > 0 && (
          <div className="border-t border-hair px-6 py-5 sm:px-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
              Checkpoint locations
            </div>
            {unlocked.events.map((e, i) => (
              <div
                key={`${e.title}-${i}`}
                className="mt-2.5 flex items-center gap-2 text-[13.5px] text-muted"
              >
                <MapPin className="h-3.5 w-3.5 text-faint" /> {e.title} · {e.location} ·{" "}
                {fmt(e.time)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (state === "expired90") {
    return (
      <div className="card overflow-hidden rounded-2xl border border-hair bg-white">
        <PanelHead icon={<Archive className="h-4 w-4 text-faint" />} tag="Archived" />
        <div className="px-6 py-8 text-center sm:px-8">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-tint text-petrol ring-1 ring-hair">
            <Archive className="h-5 w-5" />
          </span>
          <div className="font-display mt-3.5 text-[15.5px] font-semibold text-petrol-deep">
            These details are now private
          </div>
          <p className="mx-auto mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-muted">
            This shipment was delivered over 90 days ago. To protect the people on it, the
            private details are locked. Its status and journey stay available above.
          </p>
        </div>
      </div>
    );
  }

  if (state === "reverify") {
    return (
      <div className="card overflow-hidden rounded-2xl border border-amber-200 bg-white">
        <div className="flex items-center gap-2.5 border-b border-hair bg-amber-50/70 px-6 py-4 sm:px-8">
          <Clock className="h-4 w-4 text-amber-600" />
          <span className="text-[13.5px] font-semibold text-amber-700">
            Your unlock has expired
          </span>
        </div>
        <div className="px-6 py-6 sm:px-8">
          <p className="text-[14px] leading-relaxed text-muted">
            For security, an unlock only lasts 30 minutes. Verify again to view the full
            details.
          </p>
          <button
            onClick={onUnlock}
            className="mt-4 inline-flex h-[44px] items-center gap-2 rounded-xl bg-petrol px-6 text-[14px] font-semibold text-white transition-colors hover:bg-petrol-deep"
          >
            <Shield className="h-4 w-4" /> Verify again
          </button>
        </div>
      </div>
    );
  }

  if (state === "noContact") {
    return (
      <div className="card overflow-hidden rounded-2xl border border-hair bg-white">
        <PanelHead icon={<Lock className="h-4 w-4 text-faint" />} tag="Private" />
        <div className="px-6 py-6 sm:px-8">
          <p className="text-[14px] leading-relaxed text-muted">
            This booking has no contact on file, so we can&apos;t verify you against it online.
            For the sender/receiver details, please contact the carrier who booked the
            shipment.
          </p>
          <div className="mt-5 rounded-xl border border-hair bg-tint/60 p-5">
            <div className="font-display text-[14.5px] font-semibold text-petrol-deep">
              Want updates on this parcel?
            </div>
            <p className="mt-1 text-[13px] text-muted">
              Register with Voxarel and we&apos;ll notify you as its status changes.
            </p>
            <button
              onClick={() => auth.openSignUp("customer")}
              className="mt-3.5 inline-flex h-[42px] items-center gap-2 rounded-xl bg-petrol px-5 text-[14px] font-semibold text-white transition-colors hover:bg-petrol-deep"
            >
              Keep me updated <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // locked (default)
  return (
    <div className="card overflow-hidden rounded-2xl border border-hair bg-white">
      <PanelHead icon={<Lock className="h-4 w-4 text-faint" />} tag="Private" />
      <ul className="px-6 sm:px-8">
        {LOCKED_ROWS.map((row, i) => (
          <li
            key={row}
            className={`flex items-center justify-between py-3.5 ${i ? "border-t border-hair" : ""}`}
          >
            <span className="text-[14.5px] text-muted">{row}</span>
            <span className="tracking-[0.3em] text-faint">••••</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-hair bg-tint/70 px-6 py-5 sm:px-8">
        <p className="text-[14px] leading-relaxed text-muted">
          Only this shipment&apos;s sender or receiver can see these. Register with Voxarel and
          we&apos;ll confirm it&apos;s you.
        </p>
        <button
          onClick={onUnlock}
          className="mt-4 inline-flex h-[46px] items-center gap-2 rounded-xl bg-petrol px-6 text-[15px] font-semibold text-white transition-colors hover:bg-petrol-deep"
        >
          <Shield className="h-[18px] w-[18px]" /> Unlock full details
        </button>
      </div>
    </div>
  );
}

function PanelHead({ icon, tag }: { icon: React.ReactNode; tag: string }) {
  return (
    <div className="flex items-center justify-between border-b border-hair px-6 py-4 sm:px-8">
      <h2 className="font-display flex items-center gap-2 text-[15px] font-semibold text-ink">
        {icon} Full shipment details
      </h2>
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint">{tag}</span>
    </div>
  );
}

function Field({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white px-6 py-[18px] sm:px-8">
      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint">{label}</div>
      <div className="mt-1 text-[15px] font-bold text-ink">{value}</div>
      {sub && <div className="text-[13.5px] text-muted">{sub}</div>}
    </div>
  );
}

/* ------------------------------- states ------------------------------- */

function LoadingCard() {
  return (
    <div className="mt-12 flex items-center justify-center gap-3 rounded-2xl border border-hair bg-white py-12 text-[14px] font-semibold text-muted">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-hair border-t-mint" />
      Looking up your shipment…
    </div>
  );
}

function NotFound({ awb }: { awb: string }) {
  return (
    <div className="card mx-auto mt-12 max-w-xl rounded-2xl border border-hair bg-white p-9 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tint text-petrol ring-1 ring-hair">
        <Search className="h-5 w-5" />
      </span>
      <div className="font-display mt-4 text-[17px] font-semibold text-ink">
        We couldn&apos;t find <span className="tabular-nums text-petrol">{awb}</span>
      </div>
      <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-muted">
        Check the number for typos — a new booking can take a few minutes to appear. If it
        still doesn&apos;t show, contact the carrier who booked your shipment.
      </p>
    </div>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="card mx-auto mt-12 max-w-xl rounded-2xl border border-hair bg-white p-8 text-center">
      <div className="font-display text-[16px] font-semibold text-ink">Something went wrong</div>
      <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-muted">{message}</p>
    </div>
  );
}

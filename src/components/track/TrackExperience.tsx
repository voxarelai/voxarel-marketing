"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import {
  Search,
  Lock,
  Mail,
  Phone,
  FileText,
  Shield,
  MapPin,
  Check,
  ArrowRight,
} from "@/components/icons";
import {
  DEMO_AWBS,
  DEMO_OTP,
  PROGRESS_STEPS,
  lookupShipment,
  pillTone,
  type Shipment,
} from "@/components/track/mock";

type View = "idle" | "notfound" | "found";
type Access = "locked" | "otpSend" | "otpCode" | "unlocked" | "claim" | "claimSent";

export function TrackExperience() {
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [view, setView] = useState<View>("idle");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [access, setAccess] = useState<Access>("locked");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [claimRole, setClaimRole] = useState<"sender" | "receiver">("receiver");
  const resultRef = useRef<HTMLDivElement>(null);

  const search = (raw: string, captureSearch = true) => {
    const v = raw.trim().toUpperCase();
    if (!v) return;
    const s = lookupShipment(v);
    if (captureSearch) {
      posthog.capture("shipment_tracking_search", {
        result: s ? "found" : "not_found",
      });
    }
    setLastQuery(v);
    setShipment(s);
    setView(s ? "found" : "notfound");
    setAccess("locked");
    setOtp("");
    setOtpError(false);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  // Support /track?awb=S-DXB-00224 deep links (e.g. from the homepage input)
  useEffect(() => {
    const awb = new URLSearchParams(window.location.search).get("awb");
    if (awb) {
      setQuery(awb.toUpperCase());
      search(awb, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resend countdown
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const startUnlock = () => {
    if (!shipment) return;
    posthog.capture("shipment_details_unlock_started", {
      verification_method: shipment.contact.kind === "none" ? "claim" : shipment.contact.kind,
    });
    setAccess(shipment.contact.kind === "none" ? "claim" : "otpSend");
    setOtp("");
    setOtpError(false);
  };

  const sendCode = () => {
    if (!shipment) return;
    posthog.capture("shipment_verification_code_requested", {
      delivery_method: shipment.contact.kind,
    });
    setAccess("otpCode");
    setResendIn(45);
  };

  const verify = () => {
    if (otp === DEMO_OTP) {
      posthog.capture("shipment_details_unlocked");
      setAccess("unlocked");
      setOtpError(false);
    } else {
      setOtpError(true);
    }
  };

  return (
    <section className="relative overflow-hidden pb-24 pt-36 sm:pt-40">
      {/* Background, same language as the homepage hero */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(226,236,233,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,236,233,0.7) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 55% at 50% 0%, black 30%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Search */}
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
            Tracking
          </p>
          <div className="mx-auto mt-3.5 h-[6px] w-[86px] rounded-[3px] bg-mint" />
          <h1 className="font-display mt-5 text-balance text-4xl font-extrabold tracking-tight text-petrol-deep sm:text-5xl">
            Track your shipment.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
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
              className="h-[52px] flex-1 rounded-xl border border-hair bg-white px-5 text-[16px] tracking-wide text-ink placeholder:text-faint focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/15"
            />
            <button
              onClick={() => search(query)}
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-petrol px-8 text-[16px] font-bold text-white transition-colors hover:bg-petrol-deep"
            >
              <Search className="h-4.5 w-4.5" />
              Track
            </button>
          </div>

          {/* Demo chips — removed when the live API is wired */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[12px] text-faint">Demo:</span>
            {DEMO_AWBS.map((a) => (
              <button
                key={a}
                onClick={() => {
                  setQuery(a);
                  search(a);
                }}
                className="rounded-full border border-hair bg-white px-3 py-1 text-[12px] font-bold tabular-nums text-muted transition-colors hover:border-mint/60 hover:text-petrol"
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div ref={resultRef} className="scroll-mt-24">
          {view === "notfound" && <NotFound awb={lastQuery} />}
          {view === "found" && shipment && (
            <div className="mx-auto mt-12 max-w-3xl space-y-5">
              <HeaderCard s={shipment} />
              <TimelineCard s={shipment} showLocations={access === "unlocked"} />
              {access === "unlocked" ? (
                <UnlockedDetails s={shipment} />
              ) : (
                <LockedPanel
                  s={shipment}
                  access={access}
                  otp={otp}
                  otpError={otpError}
                  resendIn={resendIn}
                  claimRole={claimRole}
                  setClaimRole={setClaimRole}
                  setOtp={(v) => {
                    setOtp(v);
                    setOtpError(false);
                  }}
                  onUnlock={startUnlock}
                  onSend={sendCode}
                  onVerify={verify}
                  onBack={() => setAccess("locked")}
                  onClaimSubmit={() => {
                    posthog.capture("shipment_claim_submitted", {
                      claimant_role: claimRole,
                    });
                    setAccess("claimSent");
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- cards ---------------------------------- */

function HeaderCard({ s }: { s: Shipment }) {
  return (
    <div className="rounded-2xl border border-hair bg-white p-6 shadow-[0_16px_48px_-24px_rgba(16,64,80,0.25)] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-[12px] font-bold uppercase tracking-wider text-faint">
            Tracking number
          </div>
          <div className="font-display mt-1 text-2xl font-extrabold tabular-nums tracking-tight text-petrol-deep">
            {s.awb}
          </div>
        </div>
        <span className={`rounded-full px-3.5 py-1.5 text-[13px] font-bold ${pillTone[s.tone]}`}>
          {s.status}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-muted">
        <span className="font-bold text-ink">{s.origin}</span>
        <ArrowRight className="h-4 w-4 text-mint-deep" />
        <span className="font-bold text-ink">{s.destination}</span>
        <span className="text-faint">· {s.service}</span>
        <span className="text-faint">· Shipped with {s.carrier}</span>
      </div>

      <div className="mt-2 text-[15px] font-bold text-mint-deep">{s.etaLine}</div>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex gap-1.5">
          {PROGRESS_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i <= s.progress ? "bg-mint" : "bg-hair"}`}
            />
          ))}
        </div>
        <div className="mt-2 hidden justify-between sm:flex">
          {PROGRESS_STEPS.map((step, i) => (
            <span
              key={step}
              className={`text-[11px] font-bold uppercase tracking-wide ${
                i <= s.progress ? "text-mint-deep" : "text-faint"
              }`}
            >
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineCard({ s, showLocations }: { s: Shipment; showLocations: boolean }) {
  return (
    <div className="rounded-2xl border border-hair bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-[15px] font-bold text-ink">Journey</h2>
        {!showLocations && (
          <span className="flex items-center gap-1.5 text-[12px] font-bold text-faint">
            <Lock className="h-3.5 w-3.5" />
            Locations unlock with verification
          </span>
        )}
      </div>
      <ol className="mt-5">
        {s.events.map((e, i) => {
          const last = i === s.events.length - 1;
          return (
            <li key={`${e.title}-${e.time}`} className="relative pl-8 pb-6 last:pb-0">
              {!last && <span className="absolute left-[7px] top-5 h-full w-px bg-hair" />}
              {e.state === "current" ? (
                <span className="absolute left-0 top-1 flex h-[15px] w-[15px]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                  <span className="relative inline-flex h-[15px] w-[15px] rounded-full border-[3px] border-mint bg-white" />
                </span>
              ) : (
                <span
                  className={`absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full ${
                    e.state === "done" ? "bg-mint" : "border-2 border-hair bg-white"
                  }`}
                >
                  {e.state === "done" && (
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.2} />
                  )}
                </span>
              )}
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <span
                  className={`text-[15px] font-bold ${
                    e.state === "pending" ? "text-faint" : "text-ink"
                  }`}
                >
                  {e.title}
                </span>
                <span className="text-[12.5px] tabular-nums text-faint">{e.time}</span>
              </div>
              {showLocations && (
                <div className="mt-0.5 flex items-center gap-1.5 text-[13.5px] text-muted">
                  <MapPin className="h-3.5 w-3.5 text-faint" />
                  {e.location}
                </div>
              )}
              {e.note && <div className="mt-1 text-[13px] italic text-mint-deep">{e.note}</div>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------ locked / OTP ------------------------------ */

const LOCKED_ROWS = [
  "Checkpoint locations",
  "Sender & receiver details",
  "Delivery address",
  "Pieces & exact weights",
  "Invoice & documents",
  "Proof of delivery",
];

function LockedPanel(props: {
  s: Shipment;
  access: Access;
  otp: string;
  otpError: boolean;
  resendIn: number;
  claimRole: "sender" | "receiver";
  setClaimRole: (r: "sender" | "receiver") => void;
  setOtp: (v: string) => void;
  onUnlock: () => void;
  onSend: () => void;
  onVerify: () => void;
  onBack: () => void;
  onClaimSubmit: () => void;
}) {
  const { s, access } = props;

  return (
    <div className="overflow-hidden rounded-2xl border border-hair bg-white">
      <div className="flex items-center justify-between border-b border-hair px-6 py-4 sm:px-8">
        <h2 className="font-display flex items-center gap-2 text-[15px] font-bold text-ink">
          <Lock className="h-4 w-4 text-faint" />
          Full shipment details
        </h2>
        <span className="text-[12px] font-bold uppercase tracking-wide text-faint">
          Private
        </span>
      </div>

      {access === "locked" && (
        <div>
          <ul className="px-6 sm:px-8">
            {LOCKED_ROWS.map((row, i) => (
              <li
                key={row}
                className={`flex items-center justify-between py-3.5 ${
                  i !== 0 ? "border-t border-hair/70" : ""
                }`}
              >
                <span className="text-[14.5px] text-muted">{row}</span>
                <span className="select-none text-[14px] tracking-widest text-faint">••••••</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-hair bg-tint/60 px-6 py-5 sm:px-8">
            <p className="text-[14px] leading-relaxed text-muted">
              Only this shipment&apos;s sender or receiver can see these — we verify with a
              one-time code first.
            </p>
            <button
              onClick={props.onUnlock}
              className="mt-3.5 inline-flex h-[46px] items-center gap-2 rounded-xl bg-petrol px-6 text-[15px] font-bold text-white transition-colors hover:bg-petrol-deep"
            >
              <Shield className="h-4.5 w-4.5" />
              Unlock full details
            </button>
          </div>
        </div>
      )}

      {access === "otpSend" && s.contact.kind !== "none" && (
        <div className="px-6 py-7 sm:px-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint text-petrol">
              {s.contact.kind === "email" ? (
                <Mail className="h-5.5 w-5.5" />
              ) : (
                <Phone className="h-5.5 w-5.5" />
              )}
            </span>
            <div>
              <div className="text-[15.5px] font-bold text-ink">
                {s.contact.kind === "email"
                  ? "We'll email a 6-digit code to the address on this booking"
                  : "No email on this booking — we'll send the code by WhatsApp instead"}
              </div>
              <div className="mt-1 font-display text-[17px] font-bold tabular-nums text-petrol">
                {s.contact.masked}
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                The code expires in 10 minutes. If this contact is no longer yours, ask{" "}
                {s.carrier} to update the booking.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={props.onSend}
              className="inline-flex h-[46px] items-center gap-2 rounded-xl bg-petrol px-6 text-[15px] font-bold text-white transition-colors hover:bg-petrol-deep"
            >
              Send code
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={props.onBack}
              className="text-[14px] font-bold text-muted hover:text-petrol"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {access === "otpCode" && s.contact.kind !== "none" && (
        <div className="px-6 py-7 sm:px-8">
          <div className="text-[15.5px] font-bold text-ink">Enter the 6-digit code</div>
          <p className="mt-1 text-[13.5px] text-muted">
            Sent {s.contact.kind === "email" ? "by email to" : "by WhatsApp to"}{" "}
            <b className="tabular-nums">{s.contact.masked}</b>
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={props.otp}
              onChange={(e) => props.setOtp(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && props.onVerify()}
              placeholder="••••••"
              aria-label="One-time code"
              className={`h-[52px] w-48 rounded-xl border bg-white text-center font-display text-xl font-bold tabular-nums tracking-[0.4em] text-petrol-deep placeholder:text-faint focus:outline-none focus:ring-4 ${
                props.otpError
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-hair focus:border-mint focus:ring-mint/15"
              }`}
            />
            <button
              onClick={props.onVerify}
              className="inline-flex h-[52px] items-center rounded-xl bg-petrol px-7 text-[15px] font-bold text-white transition-colors hover:bg-petrol-deep"
            >
              Verify
            </button>
          </div>
          {props.otpError && (
            <p className="mt-2.5 text-[13.5px] font-bold text-red-500">
              That code isn&apos;t right — check and try again.
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px] text-faint">
            {props.resendIn > 0 ? (
              <span>
                Resend available in <b className="tabular-nums">{props.resendIn}s</b>
              </span>
            ) : (
              <button className="font-bold text-mint-deep hover:underline">Resend code</button>
            )}
            <span className="rounded-full bg-tint px-2.5 py-0.5 font-bold text-mint-deep">
              Demo code: {DEMO_OTP}
            </span>
          </div>
        </div>
      )}

      {access === "claim" && (
        <ClaimForm
          s={s}
          claimRole={props.claimRole}
          setClaimRole={props.setClaimRole}
          onSubmit={props.onClaimSubmit}
          onBack={props.onBack}
        />
      )}

      {access === "claimSent" && (
        <div className="px-6 py-8 text-center sm:px-8">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint/20">
            <Check className="h-5.5 w-5.5 text-mint-deep" strokeWidth={2.6} />
          </span>
          <div className="font-display mt-4 text-[17px] font-bold text-ink">
            Claim sent to {s.carrier}
          </div>
          <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-muted">
            The carrier will confirm this shipment is yours and attach your email to the booking.
            You&apos;ll get an email the moment it&apos;s approved — then you can unlock details
            here with a code.
          </p>
        </div>
      )}
    </div>
  );
}

function ClaimForm(props: {
  s: Shipment;
  claimRole: "sender" | "receiver";
  setClaimRole: (r: "sender" | "receiver") => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div className="px-6 py-7 sm:px-8">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint text-petrol">
          <Shield className="h-5.5 w-5.5" />
        </span>
        <div>
          <div className="text-[15.5px] font-bold text-ink">
            This booking has no email or phone on file
          </div>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
            Tell us who you are and {props.s.carrier} will confirm the shipment is yours, then
            attach your email to it. An email alone can&apos;t unlock a shipment — the carrier
            approves it first, so strangers can&apos;t claim your parcel.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3.5">
        <div className="flex gap-2">
          {(["receiver", "sender"] as const).map((r) => (
            <button
              key={r}
              onClick={() => props.setClaimRole(r)}
              className={`h-[42px] flex-1 rounded-xl border text-[14px] font-bold transition-colors ${
                props.claimRole === r
                  ? "border-petrol bg-petrol text-white"
                  : "border-hair bg-white text-muted hover:text-petrol"
              }`}
            >
              I&apos;m the {r}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Your full name (as on the booking)"
          className="h-[48px] w-full rounded-xl border border-hair bg-white px-4 text-[15px] text-ink placeholder:text-faint focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/15"
        />
        <input
          type="email"
          placeholder="Your email"
          className="h-[48px] w-full rounded-xl border border-hair bg-white px-4 text-[15px] text-ink placeholder:text-faint focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/15"
        />
        <input
          type="tel"
          placeholder="Phone used on the booking (helps the carrier match you)"
          className="h-[48px] w-full rounded-xl border border-hair bg-white px-4 text-[15px] text-ink placeholder:text-faint focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/15"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          onClick={props.onSubmit}
          className="inline-flex h-[46px] items-center gap-2 rounded-xl bg-petrol px-6 text-[15px] font-bold text-white transition-colors hover:bg-petrol-deep"
        >
          Send claim to {props.s.carrier}
        </button>
        <button onClick={props.onBack} className="text-[14px] font-bold text-muted hover:text-petrol">
          Cancel
        </button>
      </div>
    </div>
  );
}

/* -------------------------------- unlocked -------------------------------- */

function UnlockedDetails({ s }: { s: Shipment }) {
  const d = s.details;
  return (
    <div className="overflow-hidden rounded-2xl border border-mint/50 bg-white">
      <div className="flex items-center gap-2.5 border-b border-hair bg-mint/10 px-6 py-4 sm:px-8">
        <Shield className="h-4.5 w-4.5 text-mint-deep" />
        <span className="text-[14px] font-bold text-mint-deep">
          Verified — full details unlocked for this session
        </span>
      </div>

      <div className="grid gap-px bg-hair sm:grid-cols-2">
        <Detail label="Sender" value={d.sender.name} sub={d.sender.city} />
        <Detail label="Receiver" value={d.receiver.name} sub={d.receiver.address} />
        <Detail label="Pieces" value={d.pieces} />
        <Detail label="Weight" value={d.weight} />
        <Detail label="Service" value={d.service} />
        {d.pod ? (
          <Detail label="Proof of delivery" value={d.pod.receivedBy} sub={d.pod.time} />
        ) : (
          <Detail label="Proof of delivery" value="Available after delivery" faint />
        )}
      </div>

      <div className="border-t border-hair px-6 py-5 sm:px-8">
        <div className="text-[12px] font-bold uppercase tracking-wider text-faint">Documents</div>
        <ul className="mt-3 space-y-2.5">
          {d.documents.map((doc) => (
            <li key={doc.ref} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5 text-[14.5px] font-bold text-ink">
                <FileText className="h-4.5 w-4.5 text-petrol" />
                {doc.label}
              </span>
              <span className="text-[13px] tabular-nums text-faint">{doc.ref}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  sub,
  faint,
}: {
  label: string;
  value: string;
  sub?: string;
  faint?: boolean;
}) {
  return (
    <div className="bg-white px-6 py-4.5 sm:px-8">
      <div className="text-[12px] font-bold uppercase tracking-wider text-faint">{label}</div>
      <div className={`mt-1 text-[15px] font-bold ${faint ? "text-faint" : "text-ink"}`}>
        {value}
      </div>
      {sub && <div className="mt-0.5 text-[13.5px] leading-snug text-muted">{sub}</div>}
    </div>
  );
}

/* -------------------------------- not found ------------------------------- */

function NotFound({ awb }: { awb: string }) {
  return (
    <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-hair bg-white p-8 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tint text-petrol">
        <Search className="h-5.5 w-5.5" />
      </span>
      <div className="font-display mt-4 text-[17px] font-bold text-ink">
        We couldn&apos;t find <span className="tabular-nums text-petrol">{awb}</span>
      </div>
      <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-muted">
        Check the number for typos — and note a new booking can take a few minutes to appear. If
        it still doesn&apos;t show, contact the carrier who booked your shipment.
      </p>
    </div>
  );
}

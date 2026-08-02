"use client";

import { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useAuthModals } from "@/components/auth/AuthModals";
import { requestOtp, verifyOtp } from "@/lib/tracking";
import { ArrowRight, ChevronLeft, Check, Clock, AlertTriangle } from "@/components/icons";

type Step = "form" | "code" | "verified" | "ratelimited";

const input =
  "h-[46px] w-full rounded-xl border border-hair px-4 text-[15px] focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/12";
const primary =
  "inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-petrol text-[15px] font-semibold text-white transition-colors hover:bg-petrol-deep disabled:cursor-not-allowed disabled:opacity-60";

export function UnlockModal({
  open,
  awb,
  onClose,
  onUnlocked,
}: {
  open: boolean;
  awb: string;
  onClose: () => void;
  onUnlocked: (token: string) => void;
}) {
  const auth = useAuthModals();
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const tokenRef = useRef("");

  // reset each time the modal opens
  useEffect(() => {
    if (open) {
      setStep("form");
      setCode("");
      setError("");
      setBusy(false);
    }
  }, [open]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  const sendCode = async () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError("Enter a valid email.");
    if (phone.trim().length < 6) return setError("Enter the phone number on this booking.");
    setError("");
    setBusy(true);
    const res = await requestOtp(awb, email);
    setBusy(false);
    if (!res.ok && res.status === 429) return setStep("ratelimited");
    if (!res.ok) return setError(res.error);
    setResendIn(res.data.resendInSec || 60);
    setStep("code");
  };

  const verify = async () => {
    setError("");
    setBusy(true);
    const res = await verifyOtp({ awb, email, code, phone });
    setBusy(false);
    if (res.ok) {
      tokenRef.current = res.data.trackingToken;
      setStep("verified");
    } else if (res.status === 429) {
      setStep("ratelimited");
    } else {
      setError(res.error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} eyebrow={`Shipment ${awb}`} title="See your full details">
      {step === "form" && (
        <div className="px-6 py-6">
          <p className="text-[13.5px] leading-relaxed text-muted">
            Register with Voxarel — we confirm it&apos;s really you, then keep you posted
            on this parcel.
          </p>
          <label className="mt-5 block text-[12.5px] font-bold text-ink">Your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`mt-1.5 ${input}`}
          />
          <label className="mt-4 block text-[12.5px] font-bold text-ink">
            Phone on this booking
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+971 50 000 0000"
            className={`mt-1.5 ${input}`}
          />
          <p className="mt-1.5 text-[12.5px] text-faint">
            Must match the sender or receiver on file.
          </p>
          <p className="mt-5 rounded-xl bg-tint px-4 py-3 text-[12px] leading-relaxed text-muted">
            By continuing you create your Voxarel contact and agree to our{" "}
            <a href="/terms" className="font-semibold text-petrol">
              Terms
            </a>
            . Shipment and product updates — unsubscribe anytime.
          </p>
          {error && <p className="mt-2 text-[13px] font-semibold text-red-500">{error}</p>}
          <button onClick={sendCode} disabled={busy} className={`mt-5 ${primary}`}>
            {busy ? "Sending…" : "Send code"}
            {!busy && <ArrowRight className="h-[18px] w-[18px]" />}
          </button>
          <button
            onClick={() => {
              onClose();
              auth.openSignUp("business");
            }}
            className="mt-3 block w-full text-center text-[12.5px] font-semibold text-muted hover:text-petrol"
          >
            Actually, I run a business
          </button>
        </div>
      )}

      {step === "code" && (
        <div className="px-6 py-6">
          <h3 className="font-display text-[16px] font-semibold text-petrol-deep">
            Enter the 6-digit code
          </h3>
          <p className="mt-1 text-[13px] text-muted">
            Sent by email to <b>{maskEmail(email)}</b>
          </p>
          <input
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, ""));
              setError("");
            }}
            placeholder="000000"
            className="mt-4 h-[52px] w-full rounded-xl border border-hair text-center font-display text-2xl font-semibold tracking-[0.4em] text-petrol-deep placeholder:text-hair focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/12"
          />
          {error && (
            <div className="mt-3 flex items-start gap-2 text-[13.5px] font-semibold text-red-500">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <button
            onClick={verify}
            disabled={busy || code.length < 6}
            className={`mt-4 ${primary}`}
          >
            {busy ? "Verifying…" : "Verify"}
          </button>
          <div className="mt-3.5 flex items-center justify-between text-[12.5px]">
            {resendIn > 0 ? (
              <span className="text-faint">
                Resend available in <b className="tabular-nums">{resendIn}s</b>
              </span>
            ) : (
              <button onClick={sendCode} className="font-semibold text-mint-deep hover:underline">
                Resend code
              </button>
            )}
            <button
              onClick={() => setStep("form")}
              className="inline-flex items-center gap-1 font-semibold text-muted hover:text-petrol"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Back
            </button>
          </div>
        </div>
      )}

      {step === "verified" && (
        <div className="px-6 py-10 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint/[0.12] ring-1 ring-mint/30">
            <Check className="h-6 w-6 text-mint-deep" />
          </span>
          <h3 className="font-display mt-4 text-[18px] font-semibold text-petrol-deep">
            You&apos;re verified
          </h3>
          <p className="mx-auto mt-1.5 max-w-xs text-[13.5px] text-muted">
            Opening your shipment details…
          </p>
          <button
            onClick={() => onUnlocked(tokenRef.current)}
            className="mt-5 inline-flex h-[44px] items-center gap-2 rounded-xl bg-petrol px-6 text-[14px] font-semibold text-white transition-colors hover:bg-petrol-deep"
          >
            See my details <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === "ratelimited" && (
        <div className="px-6 py-10 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 ring-1 ring-amber-200">
            <Clock className="h-6 w-6 text-amber-600" />
          </span>
          <h3 className="font-display mt-4 text-[17px] font-semibold text-petrol-deep">
            Too many attempts
          </h3>
          <p className="mx-auto mt-1.5 max-w-xs text-[13.5px] leading-relaxed text-muted">
            For everyone&apos;s safety we&apos;ve paused this for a little while. Please try
            again shortly.
          </p>
          <button
            onClick={onClose}
            className="mt-5 inline-flex h-[44px] items-center gap-2 rounded-xl border border-hair px-6 text-[14px] font-semibold text-muted transition-colors hover:text-petrol"
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  );
}

function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!domain) return email;
  return `${user.slice(0, 1)}•••@${domain}`;
}

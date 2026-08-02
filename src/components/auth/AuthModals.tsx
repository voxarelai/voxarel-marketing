"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Modal } from "@/components/ui/Modal";
import { register } from "@/lib/tracking";
import {
  ArrowRight,
  ChevronLeft,
  Check,
  Package,
  Warehouse,
} from "@/components/icons";

type SignUpMode = "choose" | "customer" | "business";

type AuthCtx = { openSignUp: (mode?: SignUpMode) => void };
const Ctx = createContext<AuthCtx | null>(null);

export function useAuthModals() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuthModals must be used within <AuthProvider>");
  return ctx;
}

const input =
  "h-[46px] w-full rounded-xl border border-hair px-4 text-[15px] focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/12";
const primaryBtn =
  "mt-5 inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-petrol text-[15px] font-semibold text-white transition-colors hover:bg-petrol-deep disabled:cursor-not-allowed disabled:opacity-60";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<SignUpMode>("choose");

  const openSignUp = useCallback((m: SignUpMode = "choose") => {
    setMode(m);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openSignUp }), [openSignUp]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <SignUpModal
        open={open}
        mode={mode}
        setMode={setMode}
        onClose={() => setOpen(false)}
      />
    </Ctx.Provider>
  );
}

function SignUpModal({
  open,
  mode,
  setMode,
  onClose,
}: {
  open: boolean;
  mode: SignUpMode;
  setMode: (m: SignUpMode) => void;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Sign up for Voxarel">
      {mode === "choose" && <Chooser onPick={setMode} />}
      {mode === "customer" && (
        <CustomerForm onBack={() => setMode("choose")} onDone={onClose} />
      )}
      {mode === "business" && (
        <BusinessForm onBack={() => setMode("choose")} onDone={onClose} />
      )}
    </Modal>
  );
}

function Chooser({ onPick }: { onPick: (m: SignUpMode) => void }) {
  return (
    <div className="px-6 py-6">
      <p className="text-[13.5px] text-muted">First, which one are you?</p>
      <button
        onClick={() => onPick("customer")}
        className="mt-4 flex w-full items-center gap-4 rounded-xl border border-hair p-4 text-left transition-colors hover:border-mint hover:bg-tint/50"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint text-petrol ring-1 ring-hair">
          <Package className="h-5 w-5" />
        </span>
        <span>
          <span className="font-display block text-[15px] font-semibold text-petrol-deep">
            I&apos;m a customer
          </span>
          <span className="text-[13px] text-muted">
            Tracking a shipment, see details &amp; get updates.
          </span>
        </span>
      </button>
      <button
        onClick={() => onPick("business")}
        className="mt-3 flex w-full items-center gap-4 rounded-xl border border-hair p-4 text-left transition-colors hover:border-mint hover:bg-tint/50"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-tint text-petrol ring-1 ring-hair">
          <Warehouse className="h-5 w-5" />
        </span>
        <span>
          <span className="font-display block text-[15px] font-semibold text-petrol-deep">
            I run a logistics business
          </span>
          <span className="text-[13px] text-muted">
            See how Voxarel can run your whole operation.
          </span>
        </span>
      </button>
    </div>
  );
}

function BackLink({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="mb-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-muted hover:text-petrol"
    >
      <ChevronLeft className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

function Success({ title, body }: { title: string; body: string }) {
  return (
    <div className="px-6 py-10 text-center">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint/[0.12] ring-1 ring-mint/30">
        <Check className="h-6 w-6 text-mint-deep" />
      </span>
      <h3 className="font-display mt-4 text-[18px] font-semibold text-petrol-deep">
        {title}
      </h3>
      <p className="mx-auto mt-1.5 max-w-xs text-[13.5px] text-muted">{body}</p>
    </div>
  );
}

function CustomerForm({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const submit = async () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Enter a valid email.");
      return;
    }
    setError("");
    setState("loading");
    const res = await register({ email, phone: phone || undefined });
    if (res.ok) setState("done");
    else {
      setState("idle");
      setError(res.error);
    }
  };

  if (state === "done") {
    return (
      <>
        <Success
          title="You're all set"
          body="Your Voxarel contact is created. Track a shipment any time. We'll keep you posted."
        />
        <div className="px-6 pb-6">
          <button onClick={onDone} className={primaryBtn.replace("mt-5 ", "")}>
            Done
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="px-6 py-6">
      <BackLink onClick={onBack} label="Customer or business" />
      <label className="block text-[12.5px] font-bold text-ink">Your email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className={`mt-1.5 ${input}`}
      />
      <label className="mt-4 block text-[12.5px] font-bold text-ink">
        Your phone <span className="font-normal text-faint">(optional)</span>
      </label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+971 50 000 0000"
        className={`mt-1.5 ${input}`}
      />
      <p className="mt-5 rounded-xl bg-tint px-4 py-3 text-[12px] leading-relaxed text-muted">
        By registering you agree to Voxarel&apos;s{" "}
        <a href="/terms" className="font-semibold text-petrol">
          Terms
        </a>{" "}
        and to receive shipment and product updates. Unsubscribe anytime.
      </p>
      {error && <p className="mt-2 text-[13px] font-semibold text-red-500">{error}</p>}
      <button onClick={submit} disabled={state === "loading"} className={primaryBtn}>
        {state === "loading" ? "Creating…" : "Create my contact"}
        {state !== "loading" && <ArrowRight className="h-[18px] w-[18px]" />}
      </button>
    </div>
  );
}

function BusinessForm({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <>
        <Success
          title="Request received"
          body="Our team will reach out to schedule your demo."
        />
        <div className="px-6 pb-6">
          <button onClick={onDone} className={primaryBtn.replace("mt-5 ", "")}>
            Done
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="px-6 py-6">
      <BackLink onClick={onBack} label="Customer or business" />
      <div className="inline-flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/[0.06] px-3 py-1 text-[11px] font-semibold text-mint-deep">
        Guided demo workflow, coming soon
      </div>
      <h3 className="font-display mt-4 text-[16px] font-semibold text-petrol-deep">
        See Voxarel for your business
      </h3>
      <p className="mt-1 text-[13.5px] text-muted">
        Tell us a bit and we&apos;ll set up a tailored demo of the platform for your
        operation.
      </p>
      <input placeholder="Your name" className={`mt-4 ${input}`} />
      <input placeholder="Company / courier name" className={`mt-3 ${input}`} />
      <input type="email" placeholder="Work email" className={`mt-3 ${input}`} />
      <button onClick={() => setDone(true)} className={primaryBtn}>
        Request a demo <ArrowRight className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

"use client";

import { type FormEvent, useRef, useState } from "react";
import { ArrowRight, Check, Mail } from "@/components/icons";
import { CONTACT_EMAIL } from "@/lib/site";
import { track, identifyLead } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
import { getLeadId } from "@/lib/lead-id";
import { BRANCH_OPTIONS } from "@/lib/leads/branch-options";

/** The tour ticket turns this into a prop so the tour-end form sends "tour_end". */
const PLACEMENT = "demo_page" as const;

const EXPECT = [
  "We walk your actual flow — collection to delivery to reconciliation, on your services and corridors",
  "Your questions answered by the people who built it, not a sales script",
  "A clear answer by the end — if Voxarel isn't the right fit, we'll tell you",
];

type Fields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  branches: string;
  message: string;
};

const EMPTY: Fields = { name: "", email: "", company: "", phone: "", branches: "", message: "" };

export function DemoExperience() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [hp, setHp] = useState(""); // honeypot
  const startedAt = useRef<number>(Date.now());
  const touched = useRef(false);

  const onFieldChange = (k: keyof Fields) => (v: string) => {
    if (!touched.current) {
      touched.current = true;
      startedAt.current = Date.now();
      track("demo_form_start", { placement: PLACEMENT });
    }
    setF((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (!f.name.trim()) e.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
      e.email = "That email doesn't look right.";
    if (!f.company.trim()) e.company = "Please add your company.";
    setErrors(e);
    for (const [field, reason] of Object.entries(e)) {
      track("demo_form_error", { field, reason });
    }
    return Object.keys(e).length === 0;
  };

  const mailtoFallback = () => {
    const subject = `Demo request: ${f.company.trim()}`;
    const body = [
      `Name: ${f.name.trim()}`,
      `Company: ${f.company.trim()}`,
      `Email: ${f.email.trim()}`,
      f.phone.trim() && `Phone / WhatsApp: ${f.phone.trim()}`,
      f.branches && `Branches: ${f.branches}`,
      f.message.trim() && `\n${f.message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (pending) return; // double-submit guard
    if (!validate()) return;

    setPending(true);
    const leadId = getLeadId();

    track("demo_form_submit", {
      branches: f.branches || "not_given",
      has_phone: Boolean(f.phone.trim()),
      has_message: Boolean(f.message.trim()),
    });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          lead_id: leadId,
          name: f.name.trim(),
          email: f.email.trim(),
          company: f.company.trim(),
          phone: f.phone.trim(),
          branches: f.branches,
          message: f.message.trim(),
          placement: PLACEMENT,
          company_website: hp,
          started_at: startedAt.current,
          attr: readAttribution(),
        }),
      });
      if (!res.ok) throw new Error(`status_${res.status}`);

      identifyLead(leadId, {
        email: f.email.trim(),
        company: f.company.trim(),
        branches: f.branches,
      });
      setSent(true);
    } catch (err) {
      // Last resort only. Our own route was unreachable.
      track("lead_fallback_mailto", {
        reason: err instanceof Error ? err.message : "unknown",
      });
      mailtoFallback();
      setFallback(true);
      setSent(true);
    } finally {
      setPending(false);
    }
  };

  return (
    <section className="relative overflow-hidden pb-24 pt-36 sm:pt-44">
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
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Left — the pitch */}
          <div>
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.22em] text-mint-deep">
              Book a demo
            </p>
            <div className="mt-3.5 h-[6px] w-[86px] rounded-[3px] bg-mint" />
            <h1 className="font-display mt-5 text-balance text-4xl font-extrabold tracking-tight text-petrol-deep sm:text-5xl sm:leading-[1.1]">
              See your operation in Voxarel.
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted">
              Thirty minutes, on your own workflow. Bring the WhatsApp groups and the Excel
              sheets — we&apos;ll show you what they look like as one system.
            </p>

            <ul className="mt-9 max-w-lg space-y-4">
              {EXPECT.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/20">
                    <Check className="h-3 w-3 text-mint-deep" strokeWidth={2.6} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-hair pt-6">
              <p className="text-[14.5px] font-bold text-muted">
                Live in production at ST&nbsp;Courier. Real branches, real shipments, every day.
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => track("contact_email_click", { placement: "demo_page" })}
                className="mt-3 inline-flex items-center gap-2 text-[14.5px] font-bold text-mint-deep hover:underline"
              >
                <Mail className="h-4 w-4" />
                Prefer email? {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Right — the form */}
          <div>
            {sent ? (
              <div className="rounded-2xl border border-mint/50 bg-white p-8 text-center shadow-[0_24px_64px_-24px_rgba(16,64,80,0.3)]">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint/20">
                  <Check className="h-5.5 w-5.5 text-mint-deep" strokeWidth={2.6} />
                </span>
                <div className="font-display mt-4 text-[18px] font-bold text-ink">
                  {fallback ? "Almost there — hit send" : "Request received"}
                </div>
                <p className="mx-auto mt-2 max-w-sm text-[14.5px] leading-relaxed text-muted">
                  {fallback
                    ? "Your email app just opened with everything filled in — send it and we'll come back within one business day."
                    : "We have your details. Someone will reply within one business day, and you will get a confirmation email in the next few minutes."}
                </p>
                <p className="mx-auto mt-4 max-w-sm text-[13px] leading-relaxed text-faint">
                  {fallback ? "Nothing opened? " : "Nothing arrived? "}
                  Write to us directly at{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    onClick={() => track("contact_email_click", { placement: "demo_page" })}
                    className="font-bold text-mint-deep"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="relative rounded-2xl border border-hair bg-white p-6 shadow-[0_24px_64px_-24px_rgba(16,64,80,0.3)] sm:p-8"
              >
                <div className="space-y-4">
                  <Field
                    id="lead-name"
                    name="name"
                    label="Full name"
                    required
                    autoComplete="name"
                    value={f.name}
                    onChange={onFieldChange("name")}
                    placeholder="Your name"
                    error={errors.name}
                  />
                  <Field
                    id="lead-email"
                    name="email"
                    label="Work email"
                    required
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={f.email}
                    onChange={onFieldChange("email")}
                    placeholder="you@company.com"
                    error={errors.email}
                  />
                  <Field
                    id="lead-company"
                    name="company"
                    label="Company"
                    required
                    autoComplete="organization"
                    value={f.company}
                    onChange={onFieldChange("company")}
                    placeholder="Company name"
                    error={errors.company}
                  />
                  <Field
                    id="lead-phone"
                    name="phone"
                    label="Phone / WhatsApp"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={f.phone}
                    onChange={onFieldChange("phone")}
                    placeholder="+971 ..."
                    hint="Optional. WhatsApp works well for scheduling."
                  />

                  <fieldset className="border-0 p-0">
                    <legend className="text-[13px] font-bold uppercase tracking-wide text-muted">
                      How many branches?
                    </legend>
                    <div className="mt-1.5 grid grid-cols-2 gap-2">
                      {BRANCH_OPTIONS.map((b) => (
                        <label
                          key={b}
                          className={`flex h-[42px] cursor-pointer items-center justify-center rounded-xl border text-[14px] font-bold transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-mint/15 ${
                            f.branches === b
                              ? "border-petrol bg-petrol text-white"
                              : "border-hair bg-white text-muted hover:text-petrol"
                          }`}
                        >
                          <input
                            type="radio"
                            name="branches"
                            value={b}
                            checked={f.branches === b}
                            onChange={() => onFieldChange("branches")(b)}
                            className="sr-only"
                          />
                          {b}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <FieldLabel htmlFor="lead-message" label="Anything specific you want to see?" />
                    <textarea
                      id="lead-message"
                      name="message"
                      rows={3}
                      value={f.message}
                      onChange={(e) => onFieldChange("message")(e.target.value)}
                      placeholder="e.g. corridor pricing, warehouse scanning, driver app"
                      className="mt-1.5 w-full rounded-xl border border-hair bg-white px-4 py-3 text-[15px] leading-relaxed text-ink placeholder:text-faint focus:border-mint focus:outline-none focus:ring-4 focus:ring-mint/15"
                    />
                  </div>
                </div>

                {/* Honeypot. Hidden from people, visible to bots. */}
                <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="company_website">Company website</label>
                  <input
                    id="company_website"
                    name="company_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  aria-busy={pending}
                  className="group mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-petrol text-[16px] font-bold text-white shadow-[0_8px_24px_-8px_rgba(16,64,80,0.5)] transition-colors hover:bg-petrol-deep disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pending ? "Sending your request" : "Request a demo"}
                  {!pending && (
                    <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
                <p className="mt-3 text-center text-[12.5px] text-faint">
                  We only use this to arrange your demo. No mailing lists.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[13px] font-bold uppercase tracking-wide text-muted"
    >
      {label}
      {required && (
        <span className="text-mint-deep" aria-hidden="true">
          {" *"}
        </span>
      )}
      {required && <span className="sr-only"> (required)</span>}
    </label>
  );
}

function Field(props: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  required?: boolean;
  hint?: string;
  error?: string;
}) {
  const errorId = `${props.id}-error`;
  const hintId = `${props.id}-hint`;
  const describedBy = props.error ? errorId : props.hint ? hintId : undefined;

  return (
    <div>
      <FieldLabel htmlFor={props.id} label={props.label} required={props.required} />
      <input
        id={props.id}
        name={props.name}
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        inputMode={props.inputMode}
        required={props.required}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={describedBy}
        className={`mt-1.5 h-[48px] w-full rounded-xl border bg-white px-4 text-[15px] text-ink placeholder:text-faint focus:outline-none focus:ring-4 ${
          props.error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-hair focus:border-mint focus:ring-mint/15"
        }`}
      />
      {props.error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-[13px] font-bold text-red-500">
          {props.error}
        </p>
      ) : props.hint ? (
        <p id={hintId} className="mt-1.5 text-[12.5px] text-faint">
          {props.hint}
        </p>
      ) : null}
    </div>
  );
}

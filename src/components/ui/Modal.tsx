"use client";

import { useEffect } from "react";
import { Close } from "@/components/icons";

export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-petrol-deep/50 px-4 py-10 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(16,64,80,0.05),0_24px_60px_-28px_rgba(11,44,54,0.32)]"
      >
        <div className="flex items-center justify-between border-b border-hair px-6 py-[18px]">
          <div>
            {eyebrow && (
              <div className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-mint-deep">
                {eyebrow}
              </div>
            )}
            <h2 className="font-display mt-0.5 text-[17px] font-semibold tracking-tight text-petrol-deep">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-faint transition-colors hover:bg-tint hover:text-petrol"
          >
            <Close className="h-[18px] w-[18px]" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

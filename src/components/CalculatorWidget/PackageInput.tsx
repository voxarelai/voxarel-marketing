"use client";

import { useState } from "react";
import { Ruler, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PackageItem } from "@/lib/calculator";

interface PackageInputProps {
  value: PackageItem;
  onChange: (next: PackageItem) => void;
  onRemove?: () => void;
  index: number;
  disabled?: boolean;
}

const fieldCls =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-50";

export function PackageInput({
  value,
  onChange,
  onRemove,
  index,
  disabled,
}: PackageInputProps) {
  const [showDims, setShowDims] = useState(
    Boolean(value.lengthCm || value.widthCm || value.heightCm),
  );

  const toNum = (v: string) => (v === "" ? undefined : Math.max(0, Number(v)));

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-white/50">#{index + 1}</span>
        <div className="relative flex-1">
          <input
            type="number"
            min={0}
            inputMode="decimal"
            disabled={disabled}
            value={value.weightKg || ""}
            onChange={(e) =>
              onChange({ ...value, weightKg: Number(e.target.value) || 0 })
            }
            placeholder="Weight"
            className={cn(fieldCls, "pr-10")}
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">
            kg
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowDims((s) => !s)}
          className={cn(
            "rounded-lg border border-white/10 p-2.5 text-white/60 transition-colors hover:bg-white/5 hover:text-white",
            showDims && "bg-orange-500/15 text-orange-300",
          )}
          aria-label="Toggle dimensions"
          title="Add dimensions"
        >
          <Ruler className="h-4 w-4" />
        </button>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-lg border border-white/10 p-2.5 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Remove package"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {showDims && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(["lengthCm", "widthCm", "heightCm"] as const).map((k, i) => (
            <input
              key={k}
              type="number"
              min={0}
              disabled={disabled}
              value={value[k] ?? ""}
              onChange={(e) => onChange({ ...value, [k]: toNum(e.target.value) })}
              placeholder={`${["L", "W", "H"][i]} cm`}
              className={fieldCls}
            />
          ))}
        </div>
      )}
    </div>
  );
}

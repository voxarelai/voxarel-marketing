import { z } from "zod";
import { BRANCH_OPTIONS } from "./branch-options";

// Re-exported so server-side consumers can keep importing it from schema.
export { BRANCH_OPTIONS };

export const leadSchema = z.object({
  lead_id: z.string().min(8).max(64),
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().min(1).max(200),
  phone: z.string().trim().max(40).default(""),
  branches: z.union([z.enum(BRANCH_OPTIONS), z.literal("")]).default(""),
  message: z.string().trim().max(2000).default(""),
  placement: z.enum(["demo_page", "tour_end"]).default("demo_page"),

  // Anti-spam. Both are rejected in the route, not here.
  company_website: z.string().max(200).default(""),
  started_at: z.number().int().nonnegative(),

  attr: z
    .object({
      utm_source: z.string().max(120).optional(),
      utm_medium: z.string().max(120).optional(),
      utm_campaign: z.string().max(120).optional(),
      utm_content: z.string().max(120).optional(),
      referrer: z.string().max(500).optional(),
      landing_path: z.string().max(200).optional(),
    })
    .default({}),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type TargetName = "hubspot" | "email_internal" | "email_visitor" | "console";

export type TargetResult = { ok: boolean; error?: string; at: number };

export type LeadRecord = LeadInput & {
  received_at: number;
  ip_hash: string;
  user_agent: string;
  targets: Partial<Record<TargetName, TargetResult>>;
  alarmed?: boolean;
};
